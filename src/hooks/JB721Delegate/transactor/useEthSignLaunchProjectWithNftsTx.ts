import { t } from '@lingui/macro'
import {
  JB721_DELEGATE_V3,
  JB721_DELEGATE_V3_1,
  JB721_DELEGATE_V3_2,
  JB721_DELEGATE_V3_3,
} from 'constants/delegateVersions'
import { JUICEBOX_MONEY_PROJECT_METADATA_DOMAIN } from 'constants/metadataDomain'
import { DEFAULT_MEMO } from 'constants/transactionDefaults'
import { TransactionContext } from 'contexts/Transaction/TransactionContext'
import { V2V3ContractsContext } from 'contexts/v2v3/Contracts/V2V3ContractsContext'
import { getAddress } from 'ethers/lib/utils'
import { useJBPrices } from 'hooks/JBPrices'
import { useWallet } from 'hooks/Wallet'
import { DEFAULT_JB_721_DELEGATE_VERSION } from 'hooks/defaultContracts/useDefaultJB721Delegate'
import { useDefaultJBController } from 'hooks/defaultContracts/useDefaultJBController'
import { useDefaultJBETHPaymentTerminal } from 'hooks/defaultContracts/useDefaultJBETHPaymentTerminal'
import { TransactorInstance } from 'hooks/useTransactor'
import { LaunchProjectData } from 'hooks/v2v3/transactor/useLaunchProjectTx'
import { cloneDeep } from 'lodash'
import omit from 'lodash/omit'
import {
  JB721DelegateVersion,
  JB721GovernanceType,
  JB721TierParams,
  JBDeployTiered721DelegateData,
  JBTiered721Flags,
  JB_721_TIER_PARAMS_V3_1,
  JB_721_TIER_PARAMS_V3_2,
  JB_DEPLOY_TIERED_721_DELEGATE_DATA_V3_1,
} from 'models/nftRewards'
import { JBPayDataSourceFundingCycleMetadata } from 'models/v2v3/fundingCycle'
import moment from 'moment'
import { useContext } from 'react'
import { DEFAULT_MUST_START_AT_OR_AFTER } from 'redux/slices/editingV2Project'
import { buildDeployTiered721DelegateData } from 'utils/nftRewards'
import {
  getTerminalsFromFundAccessConstraints,
  isValidMustStartAtOrAfter,
} from 'utils/v2v3/fundingCycle'
import { useV2ProjectTitle } from '../../v2v3/useProjectTitle'
import { useJB721DelegateContractAddress } from '../contracts/useJB721DelegateContractAddress'
import { useJBTiered721DelegateProjectDeployer } from '../contracts/useJBTiered721DelegateProjectDeployer'
import { JB721DelegateLaunchFundingCycleData } from './useLaunchFundingCyclesWithNftsTx'

interface DeployTiered721DelegateData {
  collectionUri: string
  collectionName: string
  collectionSymbol: string
  governanceType: JB721GovernanceType
  tiers: (JB721TierParams | JB_721_TIER_PARAMS_V3_1 | JB_721_TIER_PARAMS_V3_2)[]
  flags: JBTiered721Flags
}

interface LaunchProjectWithNftsTxArgs {
  tiered721DelegateData: DeployTiered721DelegateData
  projectData: LaunchProjectData
}

type JB721DelegateLaunchProjectData = JB721DelegateLaunchFundingCycleData & {
  projectMetadata: {
    domain: number
    content: string
  }
}

enum LinearReleaseFrequency {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

enum UnlockingScheduleVariant {
  LINEAR = 'Linear',
  CLIFF_LINEAR = 'Cliff + Linear',
  CLIFF = 'Cliff',
  CUSTOM = 'Custom',
}

type CustomizedRelease = {
  discreteReleases?: {
    releaseAfterMonths: number
    releasePercentage: number
  }[]
  linearReleases?: {
    releaseFrequency: LinearReleaseFrequency
    totalUnlockingTime: number
    releasePercentage: number
  }[]
}

type UnlockingSchedule = {
  id: string
  variant: UnlockingScheduleVariant
  customizedRelease?: CustomizedRelease
}

function buildArgs(
  version: JB721DelegateVersion,
  {
    owner,
    deployTiered721DelegateData,
    launchProjectData,
    JBControllerAddress,
    ttuDeployer,
    unlockingSchedulePreset,
    tokenName,
    tokenSymbol,
  }: {
    owner: string
    JBControllerAddress: string
    deployTiered721DelegateData:
      | JBDeployTiered721DelegateData
      | JB_DEPLOY_TIERED_721_DELEGATE_DATA_V3_1
    launchProjectData: JB721DelegateLaunchProjectData
    ttuDeployer: string
    unlockingSchedulePreset: {
      linearStartTimestampsRelative: number[]
      linearEndTimestampRelative: number
      linearBips: number[]
      numOfUnlocksForEachLinear: number[]
    }
    tokenName: string
    tokenSymbol: string
  },
) {
  const baseArgs = [
    owner,
    deployTiered721DelegateData, //_deployTiered721DelegateData
    launchProjectData, // _launchProjectData
    ttuDeployer,
    unlockingSchedulePreset,
    tokenName,
    tokenSymbol,
  ]

  if (version === JB721_DELEGATE_V3) {
    return baseArgs
  }
  if (
    version === JB721_DELEGATE_V3_1 ||
    version === JB721_DELEGATE_V3_2 ||
    version === JB721_DELEGATE_V3_3
  ) {
    return [...baseArgs, JBControllerAddress] // v1.1 requires us to pass the controller address in
  }
}

export function useEthSignLaunchProjectWithNftsTx(): TransactorInstance<LaunchProjectWithNftsTxArgs> {
  const { transactor } = useContext(TransactionContext)
  const { contracts } = useContext(V2V3ContractsContext)
  const defaultJBController = useDefaultJBController()

  const { userAddress } = useWallet()
  const projectTitle = useV2ProjectTitle()
  const defaultJBETHPaymentTerminal = useDefaultJBETHPaymentTerminal()
  const JBTiered721DelegateProjectDeployer =
    useJBTiered721DelegateProjectDeployer({
      version: DEFAULT_JB_721_DELEGATE_VERSION,
    })
  const JBTiered721DelegateStoreAddress = useJB721DelegateContractAddress({
    contractName: 'JBTiered721DelegateStore',
    version: DEFAULT_JB_721_DELEGATE_VERSION,
  })
  const JBPrices = useJBPrices()

  return async (
    {
      tiered721DelegateData: {
        collectionUri,
        collectionName,
        collectionSymbol,
        tiers,
        flags,
        governanceType,
      },
      projectData: {
        projectMetadataCID,
        fundingCycleData,
        fundingCycleMetadata,
        fundAccessConstraints,
        groupedSplits = [],
        mustStartAtOrAfter = DEFAULT_MUST_START_AT_OR_AFTER,
        owner,
      },
    },
    txOpts,
  ) => {
    if (
      !transactor ||
      !userAddress ||
      !contracts ||
      !defaultJBController ||
      !defaultJBETHPaymentTerminal ||
      !JBTiered721DelegateProjectDeployer ||
      !JBTiered721DelegateStoreAddress ||
      !JBPrices ||
      !isValidMustStartAtOrAfter(mustStartAtOrAfter, fundingCycleData.duration)
    ) {
      const missingParam = !transactor
        ? 'transactor'
        : !userAddress
        ? 'userAddress'
        : !contracts
        ? 'contracts'
        : !defaultJBController
        ? 'defaultJBController'
        : !JBTiered721DelegateStoreAddress
        ? 'JBTiered721DelegateStoreAddress'
        : !JBTiered721DelegateProjectDeployer
        ? 'JBTiered721DelegateProjectDeployer'
        : null

      txOpts?.onError?.(
        new DOMException(
          `Transaction failed, missing argument "${
            missingParam ?? '<unknown>'
          }".`,
        ),
      )

      return Promise.resolve(false)
    }
    const _owner = owner?.length ? owner : userAddress

    const deployTiered721DelegateData = buildDeployTiered721DelegateData(
      {
        collectionUri,
        collectionName,
        collectionSymbol,
        tiers,
        ownerAddress: _owner,
        governanceType,
        contractAddresses: {
          JBDirectoryAddress: getAddress(contracts.JBDirectory.address),
          JBFundingCycleStoreAddress: getAddress(
            contracts.JBFundingCycleStore.address,
          ),
          JBPricesAddress: getAddress(JBPrices.address),
          JBTiered721DelegateStoreAddress,
        },
        flags,
      },
      DEFAULT_JB_721_DELEGATE_VERSION,
    )

    // NFT launch tx does not accept `useDataSourceForPay` and `dataSource` (see contracts:`JBPayDataSourceFundingCycleMetadata`)
    const dataSourceFCMetadata: JBPayDataSourceFundingCycleMetadata = omit(
      fundingCycleMetadata,
      ['useDataSourceForPay', 'dataSource'],
    )

    const launchProjectData: JB721DelegateLaunchProjectData = {
      projectMetadata: {
        domain: JUICEBOX_MONEY_PROJECT_METADATA_DOMAIN,
        content: projectMetadataCID,
      },
      data: fundingCycleData,
      metadata: dataSourceFCMetadata,
      mustStartAtOrAfter,
      groupedSplits,
      fundAccessConstraints,
      terminals: getTerminalsFromFundAccessConstraints(
        fundAccessConstraints,
        defaultJBETHPaymentTerminal?.address,
      ),
      memo: DEFAULT_MEMO,
    } // _launchProjectData

    const generateUnlockingSchedulePresetData = (
      unlockingSchedule?: UnlockingSchedule,
    ): {
      linearStartTimestampsRelative: number[]
      linearEndTimestampRelative: number
      linearBips: number[]
      numOfUnlocksForEachLinear: number[]
    } => {
      if (!unlockingSchedule) {
        return {
          linearStartTimestampsRelative: [],
          linearEndTimestampRelative: 0,
          linearBips: [],
          numOfUnlocksForEachLinear: [],
        }
      }
      let linearStartTimestampsRelative: number[] = [0]
      let linearEndTimestampRelative = 0
      let linearBips: number[] = []
      let numOfUnlocksForEachLinear: number[] = []
      let currentBip = 0
      let currentTimestamp = 0
      let currentUnlocks = 0
      let remainingBips = 10000
      let newTimestamp = 0

      const { variant, customizedRelease } = unlockingSchedule
      const { discreteReleases, linearReleases } = customizedRelease || {}
      const totalBips = 10000
      const discreteReleaseAtTGECustom =
        unlockingSchedule.customizedRelease?.discreteReleases
          ?.filter(release => !release.releaseAfterMonths)
          .reduce((acc, release) => acc + release.releasePercentage || 0, 0) ||
        0
      const discreteReleasesCopy = cloneDeep(discreteReleases)
      const otherDiscreteReleases =
        discreteReleasesCopy
          ?.filter(release => !!release.releaseAfterMonths)
          .reduce((acc, release) => {
            const index = acc.findIndex(
              item => item.releaseAfterMonths === release.releaseAfterMonths,
            )
            if (index === -1) {
              acc.push(release)
            } else {
              acc[index].releasePercentage += release.releasePercentage
            }

            return acc
          }, [] as { releaseAfterMonths: number; releasePercentage: number }[])
          .sort((a, b) => a.releaseAfterMonths - b.releaseAfterMonths) || []

      if (discreteReleaseAtTGECustom) {
        currentBip = totalBips * (discreteReleaseAtTGECustom / 100)
        currentTimestamp = 1
        currentUnlocks = 1
        linearStartTimestampsRelative.push(currentTimestamp)
        linearBips.push(currentBip)
        numOfUnlocksForEachLinear.push(currentUnlocks)

        remainingBips -= currentBip
        newTimestamp += currentTimestamp
      }

      if (variant === UnlockingScheduleVariant.CUSTOM && remainingBips > 0) {
        otherDiscreteReleases?.forEach(release => {
          currentBip = totalBips * (release.releasePercentage / 100)
          currentTimestamp = moment(newTimestamp)
            .add(release.releaseAfterMonths, 'month')
            .unix()
          currentUnlocks = 1
          linearStartTimestampsRelative = linearStartTimestampsRelative.concat([
            currentTimestamp,
            currentTimestamp + 1,
          ])
          linearBips = linearBips.concat([0, currentBip])
          numOfUnlocksForEachLinear = numOfUnlocksForEachLinear.concat([
            1,
            currentUnlocks,
          ])

          remainingBips -= currentBip
          newTimestamp += currentTimestamp
        })

        linearReleases?.forEach(release => {
          let xInterval = 1

          if (release.releaseFrequency === LinearReleaseFrequency.WEEKLY) {
            xInterval = 0.25
          }

          currentBip = totalBips * (release.releasePercentage / 100)
          currentTimestamp = moment(newTimestamp)
            .add(release.totalUnlockingTime, 'month')
            .unix()
          currentUnlocks = 1 * (release.totalUnlockingTime / xInterval)
          linearStartTimestampsRelative = linearStartTimestampsRelative.concat([
            currentTimestamp,
            currentTimestamp + 1,
          ])
          linearBips = linearBips.concat([currentBip, 0])
          numOfUnlocksForEachLinear = numOfUnlocksForEachLinear.concat([
            currentUnlocks,
            1,
          ])

          remainingBips -= currentBip
          newTimestamp += currentTimestamp
        })
      }

      if (linearBips.length > 2 && linearBips[linearBips.length - 1] === 0) {
        linearStartTimestampsRelative = linearStartTimestampsRelative.slice(
          0,
          -1,
        )
        linearBips = linearBips.slice(0, -1)
        numOfUnlocksForEachLinear = numOfUnlocksForEachLinear.slice(0, -1)
      }

      linearEndTimestampRelative =
        linearStartTimestampsRelative[linearStartTimestampsRelative.length - 1]
      linearStartTimestampsRelative = linearStartTimestampsRelative.slice(0, -1)

      return {
        linearStartTimestampsRelative,
        linearEndTimestampRelative,
        linearBips,
        numOfUnlocksForEachLinear,
      }
    }

    const generateCompatibleUnlockingScheduleObject = () => {
      const linear = JSON.parse(
        fundingCycleData.tokenUnlockingSchedules,
      ).filter((item: any) => item.type === 'linear')
      const discrete = JSON.parse(
        fundingCycleData.tokenUnlockingSchedules,
      ).filter((item: any) => item.type === 'discrete')

      return {
        id: '',
        variant: UnlockingScheduleVariant.CUSTOM,
        customizedRelease: {
          discreteReleases: discrete.map((item: any) => ({
            releaseAfterMonths: item.moment,
            releasePercentage: item.percentage,
          })),
          linearReleases: linear.map((item: any) => ({
            releaseFrequency: item.frequency,
            releaseUnlockingTime: item.unlockingTime,
            releasePercentage: item.percentage,
          })),
        },
      } as UnlockingSchedule
    }

    // TODO: Might need to remove unlocking schedules from launchProjectData -> fundingCycleData
    // TODO: Need types
    // TODO: Follow useDeployNftProject to see where this will ultimately get called
    const args = buildArgs(DEFAULT_JB_721_DELEGATE_VERSION, {
      owner: _owner,
      deployTiered721DelegateData,
      launchProjectData,
      JBControllerAddress: defaultJBController.address,
      ttuDeployer: '0x6A7e336ce6B0591C52977BB3216FAEC36a1A7943', // ttuDeployer
      unlockingSchedulePreset: generateUnlockingSchedulePresetData(
        generateCompatibleUnlockingScheduleObject(),
      ), // unlockingSchedulePreset
      tokenName:
        fundingCycleMetadata.tokenName.trim() !== ''
          ? fundingCycleMetadata.tokenName
          : 'My Token',
      tokenSymbol:
        fundingCycleMetadata.tokenSymbol.trim() !== ''
          ? fundingCycleMetadata.tokenSymbol
          : 'TOKN',
    })

    if (!args) {
      txOpts?.onError?.(
        new DOMException(`Transaction failed, failed to build args`),
      )

      return Promise.resolve(false)
    }

    return transactor(
      JBTiered721DelegateProjectDeployer,
      'launchProjectFor',
      args,
      {
        ...txOpts,
        title: t`Launch ${projectTitle}`,
      },
    )
  }
}
