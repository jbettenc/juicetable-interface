import { Form } from 'antd'
import { useWatch } from 'antd/lib/form/Form'
import { AllocationSplit } from 'components/v2v3/shared/Allocation'
import { ONE_MILLION } from 'constants/numbers'
import { ProjectTokensSelection } from 'models/projectTokenSelection'
import { useDebugValue, useEffect, useMemo } from 'react'
import { useAppDispatch } from 'redux/hooks/useAppDispatch'
import { useAppSelector } from 'redux/hooks/useAppSelector'
import { useEditingDistributionLimit } from 'redux/hooks/useEditingDistributionLimit'
import { useEditingReservedTokensSplits } from 'redux/hooks/useEditingReservedTokensSplits'
import { editingV2ProjectActions } from 'redux/slices/editingV2Project'
import { allocationToSplit, splitToAllocation } from 'utils/splitToAllocation'
import {
  MAX_DISTRIBUTION_LIMIT,
  discountRateFrom,
  formatDiscountRate,
  formatIssuanceRate,
  formatRedemptionRate,
  formatReservedRate,
  issuanceRateFrom,
  redemptionRateFrom,
  reservedRateFrom,
} from 'utils/v2v3/math'
import { useFormDispatchWatch } from '../../hooks'

export type ProjectTokensFormProps = Partial<{
  selection: ProjectTokensSelection
  initialMintRate: string | undefined
  reservedTokensPercentage: number | undefined
  reservedTokenAllocation: AllocationSplit[] | undefined
  discountRate: number | undefined
  redemptionRate: number | undefined
  tokenMinting: boolean | undefined
  pauseTransfers: boolean | undefined
  tokenUnlockingSchedules: any[] | undefined
  tokenName: string | undefined
  tokenSymbol: string | undefined
}>

export const DefaultSettings: Required<
  Omit<ProjectTokensFormProps, 'selection'>
> = {
  initialMintRate: ONE_MILLION.toString(),
  reservedTokensPercentage: 0,
  reservedTokenAllocation: [],
  discountRate: 0,
  redemptionRate: 100,
  tokenMinting: false,
  pauseTransfers: false,
  tokenUnlockingSchedules: [],
  tokenName: '',
  tokenSymbol: '',
}

export const DefaultEthSignSettings: Required<
  Omit<ProjectTokensFormProps, 'selection'>
> = {
  initialMintRate: ONE_MILLION.toString(),
  reservedTokensPercentage: 100,
  reservedTokenAllocation: [
    {
      id: '0',
      beneficiary: 'EthSign Smart Contract',
      percent: 100,
      preferClaimed: false,
      lockedUntil: 0,
      projectId: undefined,
      allocator: undefined,
    },
  ],
  discountRate: 0,
  redemptionRate: 100,
  tokenMinting: false,
  pauseTransfers: false,
  tokenUnlockingSchedules: [],
  tokenName: '',
  tokenSymbol: '',
}

/**
 * There is a lot of witchcraft going on here. Maintainers beware.
 */
export const useProjectTokensForm = () => {
  const [form] = Form.useForm<ProjectTokensFormProps>()
  const { fundingCycleMetadata, fundingCycleData, projectTokensSelection } =
    useAppSelector(state => state.editingV2Project)
  const [tokenSplits] = useEditingReservedTokensSplits()
  useDebugValue(form.getFieldsValue())
  const [distributionLimit] = useEditingDistributionLimit()

  const redemptionRateDisabled =
    !distributionLimit || distributionLimit.amount.eq(MAX_DISTRIBUTION_LIMIT)
  const discountRateDisabled = !parseInt(fundingCycleData.duration)

  const initialValues: ProjectTokensFormProps | undefined = useMemo(() => {
    const selection = projectTokensSelection
    const initialMintRate = fundingCycleData?.weight
      ? formatIssuanceRate(fundingCycleData.weight)
      : DefaultSettings.initialMintRate
    const reservedTokensPercentage = fundingCycleMetadata.reservedRate
      ? parseFloat(formatReservedRate(fundingCycleMetadata.reservedRate))
      : DefaultSettings.reservedTokensPercentage
    const reservedTokenAllocation: AllocationSplit[] =
      tokenSplits.map(splitToAllocation)
    const discountRate =
      !discountRateDisabled && fundingCycleData.discountRate
        ? parseFloat(formatDiscountRate(fundingCycleData.discountRate))
        : DefaultSettings.discountRate
    const redemptionRate =
      !redemptionRateDisabled && fundingCycleMetadata.redemptionRate
        ? parseFloat(formatRedemptionRate(fundingCycleMetadata.redemptionRate))
        : DefaultSettings.redemptionRate
    const tokenMinting =
      fundingCycleMetadata.allowMinting !== undefined
        ? fundingCycleMetadata.allowMinting
        : DefaultSettings.tokenMinting
    const pauseTransfers =
      fundingCycleMetadata.global.pauseTransfers !== undefined
        ? fundingCycleMetadata.global.pauseTransfers
        : DefaultSettings.pauseTransfers
    const unlockingSchedules = fundingCycleMetadata.tokenUnlockingSchedules
      ? JSON.parse(fundingCycleMetadata.tokenUnlockingSchedules ?? '[]')
      : DefaultSettings.tokenUnlockingSchedules
    const tokenName = fundingCycleMetadata.tokenName ?? ''
    const tokenSymbol = fundingCycleMetadata.tokenSymbol ?? ''

    return {
      selection,
      initialMintRate,
      reservedTokensPercentage,
      reservedTokenAllocation,
      discountRate,
      redemptionRate,
      tokenMinting,
      pauseTransfers,
      tokenUnlockingSchedules: unlockingSchedules,
      tokenName,
      tokenSymbol,
    }
  }, [
    projectTokensSelection,
    fundingCycleData.weight,
    fundingCycleData.discountRate,
    fundingCycleMetadata.reservedRate,
    fundingCycleMetadata.redemptionRate,
    fundingCycleMetadata.allowMinting,
    fundingCycleMetadata.global.pauseTransfers,
    fundingCycleMetadata.tokenUnlockingSchedules,
    fundingCycleMetadata.tokenName,
    fundingCycleMetadata.tokenSymbol,
    tokenSplits,
    discountRateDisabled,
    redemptionRateDisabled,
  ])

  const dispatch = useAppDispatch()
  const selection = useWatch('selection', form)

  useEffect(() => {
    // We only want to update changes when selection is set
    if (selection === undefined) return
    dispatch(editingV2ProjectActions.setProjectTokensSelection(selection))

    if (selection === 'default') {
      form.setFieldsValue({ ...DefaultSettings })
      dispatch(editingV2ProjectActions.setTokenSettings(DefaultSettings))
      return
    }
    dispatch(
      editingV2ProjectActions.setTokenSettings({
        ...DefaultSettings,
        ...form.getFieldsValue(),
      }),
    )
  }, [dispatch, form, selection])

  useFormDispatchWatch({
    form,
    fieldName: 'initialMintRate',
    dispatchFunction: editingV2ProjectActions.setWeight,
    formatter: v => {
      if (v === undefined || typeof v !== 'string')
        return issuanceRateFrom(DefaultSettings.initialMintRate)
      return issuanceRateFrom(v)
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'reservedTokensPercentage',
    dispatchFunction: editingV2ProjectActions.setReservedRate,
    formatter: v => {
      if (v === undefined || typeof v !== 'number')
        return reservedRateFrom(
          DefaultSettings.reservedTokensPercentage,
        ).toHexString()
      return reservedRateFrom(v).toHexString()
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'reservedTokenAllocation',
    ignoreUndefined: true, // Needed to stop an infinite loop
    currentValue: tokenSplits, // Needed to stop an infinite loop
    dispatchFunction: editingV2ProjectActions.setReservedTokensSplits,
    formatter: v => {
      if (v === undefined || typeof v !== 'object') return []
      return v.map(allocationToSplit)
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'discountRate',
    dispatchFunction: editingV2ProjectActions.setDiscountRate,
    formatter: v => {
      if (v === undefined || typeof v !== 'number')
        return discountRateFrom(DefaultSettings.discountRate).toHexString()
      return discountRateFrom(v).toHexString()
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'redemptionRate',
    dispatchFunction: editingV2ProjectActions.setRedemptionRate,
    formatter: v => {
      if (v === undefined || typeof v !== 'number')
        return redemptionRateFrom(DefaultSettings.redemptionRate).toHexString()
      return redemptionRateFrom(v).toHexString()
    },
  })
  useFormDispatchWatch({
    form,
    fieldName: 'redemptionRate',
    dispatchFunction: editingV2ProjectActions.setBallotRedemptionRate,
    formatter: v => {
      if (v === undefined || typeof v !== 'number')
        return redemptionRateFrom(DefaultSettings.redemptionRate).toHexString()
      return redemptionRateFrom(v).toHexString()
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'tokenMinting',
    dispatchFunction: editingV2ProjectActions.setAllowMinting,
    formatter: v => {
      if (typeof v !== 'boolean') return false
      return v
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'pauseTransfers',
    dispatchFunction: editingV2ProjectActions.setPauseTransfers,
    ignoreUndefined: true,
    formatter: v => {
      if (typeof v !== 'boolean') return false
      return v
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'tokenUnlockingSchedules',
    dispatchFunction: editingV2ProjectActions.setTokenUnlockingSchedule,
    ignoreUndefined: true,
    formatter: v => {
      if (v === undefined || typeof v !== 'object') return []
      return v
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'tokenName',
    dispatchFunction: editingV2ProjectActions.setTokenName,
    ignoreUndefined: true,
    formatter: v => {
      if (typeof v !== 'string') return ''
      return v
    },
  })

  useFormDispatchWatch({
    form,
    fieldName: 'tokenSymbol',
    dispatchFunction: editingV2ProjectActions.setTokenSymbol,
    ignoreUndefined: true,
    formatter: v => {
      if (typeof v !== 'string') return ''
      return v
    },
  })

  return { form, initialValues }
}
