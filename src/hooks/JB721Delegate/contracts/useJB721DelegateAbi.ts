import { ContractInterface } from 'ethers'
import { ContractJson } from 'models/contracts'
import { JB721DelegateVersion } from 'models/nftRewards'
import { useEffect, useState } from 'react'

type JB721DelegateContractName =
  | 'EthSign'
  | 'JB721TieredGovernance'
  | 'IJBTiered721DelegateStore'
  | 'IJBTiered721Delegate'
  | 'IJBTiered721DelegateProjectDeployer'

export async function loadJB721DelegateJson(
  contractName: JB721DelegateContractName,
  version: JB721DelegateVersion,
): Promise<ContractJson | undefined> {
  console.info('Loading JB721Delegate contract json', version, contractName)

  if (contractName === 'EthSign') {
    return {
      _format: 'hh-sol-artifact-1',
      contractName: 'MyDelegateProjectDeployer',
      sourceName: 'contracts/MyDelegateProjectDeployer.sol',
      abi: [
        {
          inputs: [
            {
              internalType: 'contract MyDelegateDeployer',
              name: '_delegateDeployer',
              type: 'address',
            },
            {
              internalType: 'contract IJBOperatorStore',
              name: '_operatorStore',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          inputs: [],
          name: 'UNAUTHORIZED',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'projectId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'contract IJBToken',
              name: 'token',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'contract TokenTableUnlockerV2',
              name: 'unlocker',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'contract TTFutureTokenV2',
              name: 'futureToken',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'contract TTTrackerTokenV2',
              name: 'trackerToken',
              type: 'address',
            },
          ],
          name: 'CustomEthSignProjectLaunched',
          type: 'event',
        },
        {
          inputs: [],
          name: 'delegateDeployer',
          outputs: [
            {
              internalType: 'contract MyDelegateDeployer',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_projectId',
              type: 'uint256',
            },
            {
              components: [
                {
                  internalType: 'address[]',
                  name: 'allowList',
                  type: 'address[]',
                },
              ],
              internalType: 'struct DeployMyDelegateData',
              name: '_deployMyDelegateData',
              type: 'tuple',
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'duration',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'weight',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'discountRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'contract IJBFundingCycleBallot',
                      name: 'ballot',
                      type: 'address',
                    },
                  ],
                  internalType: 'struct JBFundingCycleData',
                  name: 'data',
                  type: 'tuple',
                },
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'allowSetTerminals',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'allowSetController',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'pauseTransfers',
                          type: 'bool',
                        },
                      ],
                      internalType: 'struct JBGlobalFundingCycleMetadata',
                      name: 'global',
                      type: 'tuple',
                    },
                    {
                      internalType: 'uint256',
                      name: 'reservedRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'redemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'ballotRedemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bool',
                      name: 'pausePay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseDistributions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseBurn',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowMinting',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowTerminalMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowControllerMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'holdFees',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'preferClaimedTokenOverride',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useTotalOverflowForRedemptions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForPay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'address',
                      name: 'dataSource',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'metadata',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundingCycleMetadata',
                  name: 'metadata',
                  type: 'tuple',
                },
                {
                  internalType: 'uint256',
                  name: 'mustStartAtOrAfter',
                  type: 'uint256',
                },
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'group',
                      type: 'uint256',
                    },
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'preferClaimed',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'preferAddToBalance',
                          type: 'bool',
                        },
                        {
                          internalType: 'uint256',
                          name: 'percent',
                          type: 'uint256',
                        },
                        {
                          internalType: 'uint256',
                          name: 'projectId',
                          type: 'uint256',
                        },
                        {
                          internalType: 'address payable',
                          name: 'beneficiary',
                          type: 'address',
                        },
                        {
                          internalType: 'uint256',
                          name: 'lockedUntil',
                          type: 'uint256',
                        },
                        {
                          internalType: 'contract IJBSplitAllocator',
                          name: 'allocator',
                          type: 'address',
                        },
                      ],
                      internalType: 'struct JBSplit[]',
                      name: 'splits',
                      type: 'tuple[]',
                    },
                  ],
                  internalType: 'struct JBGroupedSplits[]',
                  name: 'groupedSplits',
                  type: 'tuple[]',
                },
                {
                  components: [
                    {
                      internalType: 'contract IJBPaymentTerminal',
                      name: 'terminal',
                      type: 'address',
                    },
                    {
                      internalType: 'address',
                      name: 'token',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimit',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimitCurrency',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowance',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowanceCurrency',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundAccessConstraints[]',
                  name: 'fundAccessConstraints',
                  type: 'tuple[]',
                },
                {
                  internalType: 'contract IJBPaymentTerminal[]',
                  name: 'terminals',
                  type: 'address[]',
                },
                {
                  internalType: 'string',
                  name: 'memo',
                  type: 'string',
                },
              ],
              internalType: 'struct LaunchFundingCyclesData',
              name: '_launchFundingCyclesData',
              type: 'tuple',
            },
            {
              internalType: 'contract IJBController3_1',
              name: '_controller',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'uint256[]',
                  name: 'linearStartTimestampsRelative',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256',
                  name: 'linearEndTimestampRelative',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256[]',
                  name: 'linearBips',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256[]',
                  name: 'numOfUnlocksForEachLinear',
                  type: 'uint256[]',
                },
              ],
              internalType: 'struct UnlockingSchedulePreset',
              name: '_preset',
              type: 'tuple',
            },
          ],
          name: 'launchFundingCyclesFor',
          outputs: [
            {
              internalType: 'uint256',
              name: 'configuration',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_owner',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'address[]',
                  name: 'allowList',
                  type: 'address[]',
                },
              ],
              internalType: 'struct DeployMyDelegateData',
              name: '_deployMyDelegateData',
              type: 'tuple',
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: 'string',
                      name: 'content',
                      type: 'string',
                    },
                    {
                      internalType: 'uint256',
                      name: 'domain',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBProjectMetadata',
                  name: 'projectMetadata',
                  type: 'tuple',
                },
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'duration',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'weight',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'discountRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'contract IJBFundingCycleBallot',
                      name: 'ballot',
                      type: 'address',
                    },
                  ],
                  internalType: 'struct JBFundingCycleData',
                  name: 'data',
                  type: 'tuple',
                },
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'allowSetTerminals',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'allowSetController',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'pauseTransfers',
                          type: 'bool',
                        },
                      ],
                      internalType: 'struct JBGlobalFundingCycleMetadata',
                      name: 'global',
                      type: 'tuple',
                    },
                    {
                      internalType: 'uint256',
                      name: 'reservedRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'redemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'ballotRedemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bool',
                      name: 'pausePay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseDistributions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseBurn',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowMinting',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowTerminalMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowControllerMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'holdFees',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'preferClaimedTokenOverride',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useTotalOverflowForRedemptions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForPay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'address',
                      name: 'dataSource',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'metadata',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundingCycleMetadata',
                  name: 'metadata',
                  type: 'tuple',
                },
                {
                  internalType: 'uint256',
                  name: 'mustStartAtOrAfter',
                  type: 'uint256',
                },
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'group',
                      type: 'uint256',
                    },
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'preferClaimed',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'preferAddToBalance',
                          type: 'bool',
                        },
                        {
                          internalType: 'uint256',
                          name: 'percent',
                          type: 'uint256',
                        },
                        {
                          internalType: 'uint256',
                          name: 'projectId',
                          type: 'uint256',
                        },
                        {
                          internalType: 'address payable',
                          name: 'beneficiary',
                          type: 'address',
                        },
                        {
                          internalType: 'uint256',
                          name: 'lockedUntil',
                          type: 'uint256',
                        },
                        {
                          internalType: 'contract IJBSplitAllocator',
                          name: 'allocator',
                          type: 'address',
                        },
                      ],
                      internalType: 'struct JBSplit[]',
                      name: 'splits',
                      type: 'tuple[]',
                    },
                  ],
                  internalType: 'struct JBGroupedSplits[]',
                  name: 'groupedSplits',
                  type: 'tuple[]',
                },
                {
                  components: [
                    {
                      internalType: 'contract IJBPaymentTerminal',
                      name: 'terminal',
                      type: 'address',
                    },
                    {
                      internalType: 'address',
                      name: 'token',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimit',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimitCurrency',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowance',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowanceCurrency',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundAccessConstraints[]',
                  name: 'fundAccessConstraints',
                  type: 'tuple[]',
                },
                {
                  internalType: 'contract IJBPaymentTerminal[]',
                  name: 'terminals',
                  type: 'address[]',
                },
                {
                  internalType: 'string',
                  name: 'memo',
                  type: 'string',
                },
              ],
              internalType: 'struct LaunchProjectData',
              name: '_launchProjectData',
              type: 'tuple',
            },
            {
              internalType: 'contract IJBController3_1',
              name: '_controller',
              type: 'address',
            },
            {
              internalType: 'contract ITTUDeployer',
              name: 'ttuDeployer',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'uint256[]',
                  name: 'linearStartTimestampsRelative',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256',
                  name: 'linearEndTimestampRelative',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256[]',
                  name: 'linearBips',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256[]',
                  name: 'numOfUnlocksForEachLinear',
                  type: 'uint256[]',
                },
              ],
              internalType: 'struct UnlockingSchedulePreset',
              name: '_preset',
              type: 'tuple',
            },
            {
              internalType: 'string',
              name: '_tokenName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_tokenSymbol',
              type: 'string',
            },
          ],
          name: 'launchProjectFor',
          outputs: [
            {
              internalType: 'uint256',
              name: 'projectId',
              type: 'uint256',
            },
            {
              internalType: 'contract IJBToken',
              name: 'token',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'operatorStore',
          outputs: [
            {
              internalType: 'contract IJBOperatorStore',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_projectId',
              type: 'uint256',
            },
            {
              components: [
                {
                  internalType: 'address[]',
                  name: 'allowList',
                  type: 'address[]',
                },
              ],
              internalType: 'struct DeployMyDelegateData',
              name: '_deployMyDelegateData',
              type: 'tuple',
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'duration',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'weight',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'discountRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'contract IJBFundingCycleBallot',
                      name: 'ballot',
                      type: 'address',
                    },
                  ],
                  internalType: 'struct JBFundingCycleData',
                  name: 'data',
                  type: 'tuple',
                },
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'allowSetTerminals',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'allowSetController',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'pauseTransfers',
                          type: 'bool',
                        },
                      ],
                      internalType: 'struct JBGlobalFundingCycleMetadata',
                      name: 'global',
                      type: 'tuple',
                    },
                    {
                      internalType: 'uint256',
                      name: 'reservedRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'redemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'ballotRedemptionRate',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bool',
                      name: 'pausePay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseDistributions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'pauseBurn',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowMinting',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowTerminalMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'allowControllerMigration',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'holdFees',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'preferClaimedTokenOverride',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useTotalOverflowForRedemptions',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForPay',
                      type: 'bool',
                    },
                    {
                      internalType: 'bool',
                      name: 'useDataSourceForRedeem',
                      type: 'bool',
                    },
                    {
                      internalType: 'address',
                      name: 'dataSource',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'metadata',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundingCycleMetadata',
                  name: 'metadata',
                  type: 'tuple',
                },
                {
                  internalType: 'uint256',
                  name: 'mustStartAtOrAfter',
                  type: 'uint256',
                },
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'group',
                      type: 'uint256',
                    },
                    {
                      components: [
                        {
                          internalType: 'bool',
                          name: 'preferClaimed',
                          type: 'bool',
                        },
                        {
                          internalType: 'bool',
                          name: 'preferAddToBalance',
                          type: 'bool',
                        },
                        {
                          internalType: 'uint256',
                          name: 'percent',
                          type: 'uint256',
                        },
                        {
                          internalType: 'uint256',
                          name: 'projectId',
                          type: 'uint256',
                        },
                        {
                          internalType: 'address payable',
                          name: 'beneficiary',
                          type: 'address',
                        },
                        {
                          internalType: 'uint256',
                          name: 'lockedUntil',
                          type: 'uint256',
                        },
                        {
                          internalType: 'contract IJBSplitAllocator',
                          name: 'allocator',
                          type: 'address',
                        },
                      ],
                      internalType: 'struct JBSplit[]',
                      name: 'splits',
                      type: 'tuple[]',
                    },
                  ],
                  internalType: 'struct JBGroupedSplits[]',
                  name: 'groupedSplits',
                  type: 'tuple[]',
                },
                {
                  components: [
                    {
                      internalType: 'contract IJBPaymentTerminal',
                      name: 'terminal',
                      type: 'address',
                    },
                    {
                      internalType: 'address',
                      name: 'token',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimit',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'distributionLimitCurrency',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowance',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'overflowAllowanceCurrency',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct JBFundAccessConstraints[]',
                  name: 'fundAccessConstraints',
                  type: 'tuple[]',
                },
                {
                  internalType: 'string',
                  name: 'memo',
                  type: 'string',
                },
              ],
              internalType: 'struct ReconfigureFundingCyclesData',
              name: '_reconfigureFundingCyclesData',
              type: 'tuple',
            },
            {
              internalType: 'contract IJBController3_1',
              name: '_controller',
              type: 'address',
            },
            {
              components: [
                {
                  internalType: 'uint256[]',
                  name: 'linearStartTimestampsRelative',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256',
                  name: 'linearEndTimestampRelative',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256[]',
                  name: 'linearBips',
                  type: 'uint256[]',
                },
                {
                  internalType: 'uint256[]',
                  name: 'numOfUnlocksForEachLinear',
                  type: 'uint256[]',
                },
              ],
              internalType: 'struct UnlockingSchedulePreset',
              name: '_preset',
              type: 'tuple',
            },
          ],
          name: 'reconfigureFundingCyclesOf',
          outputs: [
            {
              internalType: 'uint256',
              name: 'configuration',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      bytecode:
        '0x60c060405234801562000010575f80fd5b506040516200285238038062002852833981016040819052620000339162000063565b6001600160a01b039081166080521660a052620000a0565b6001600160a01b038116811462000060575f80fd5b50565b5f806040838503121562000075575f80fd5b825162000082816200004b565b602084015190925062000095816200004b565b809150509250929050565b60805160a05161275a620000f85f395f818160b40152818161021b01528181610316015281816106380152818161071701528181610a990152610b9401525f818160f301528181610cd60152610d7a015261275a5ff3fe608060405234801561000f575f80fd5b5060043610610055575f3560e01c80633599df6714610059578063383be4251461007f5780638f3d964b146100af578063ad007d63146100ee578063f05df89a14610115575b5f80fd5b61006c610067366004611b22565b610128565b6040519081526020015b60405180910390f35b61009261008d366004611dde565b610420565b604080519283526001600160a01b03909116602083015201610076565b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610076565b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b61006c610123366004611ed7565b6109a6565b5f826001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610165573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101899190611fe8565b6001600160a01b0316636352211e876040518263ffffffff1660e01b81526004016101b691815260200190565b602060405180830381865afa1580156101d1573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101f59190611fe8565b866001610203838383610c8f565b604051632296923360e11b8152600481018a90525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063452d246690602401606060405180830381865afa158015610268573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061028c919061200a565b50509050806001600160a01b03166328e4b424426040516020016102b291815260200190565b60405160208183030381529060405280519060200120886040518363ffffffff1660e01b81526004016102e692919061208d565b5f604051808303815f87803b1580156102fd575f80fd5b505af115801561030f573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be8c8c8b6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610381573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103a59190611fe8565b6040518463ffffffff1660e01b81526004016103c3939291906120fe565b6020604051808303815f875af11580156103df573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104039190611fe8565b90506104118b8a838b610e08565b9b9a5050505050505050505050565b5f80866001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561045e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104829190611fe8565b6001600160a01b03166306661abd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104e19190612174565b6104ec90600161218b565b91505f805f886001600160a01b031663c8a7071e5f808d896040516020016105299291906001600160a01b03929092168252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b8152600401610556939291906121f3565b6060604051808303815f875af1158015610572573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610596919061200a565b925092509250826001600160a01b031663f2fde38b8e6040518263ffffffff1660e01b81526004016105d791906001600160a01b0391909116815260200190565b5f604051808303815f87803b1580156105ee575f80fd5b505af1158015610600573d5f803e3d5ffd5b50506040516386a2444960e01b8152600481018890526001600160a01b038681166024830152858116604483015284811660648301527f00000000000000000000000000000000000000000000000000000000000000001692506386a2444991506084015f604051808303815f87803b15801561067b575f80fd5b505af115801561068d573d5f803e3d5ffd5b50505050826001600160a01b03166328e4b424426040516020016106b391815260200190565b604051602081830303815290604052805190602001208a6040518363ffffffff1660e01b81526004016106e792919061208d565b5f604051808303815f87803b1580156106fe575f80fd5b505af1158015610710573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be878f8e6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610782573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906107a69190611fe8565b6040518463ffffffff1660e01b81526004016107c4939291906120fe565b6020604051808303815f875af11580156107e0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108049190611fe8565b90506108128e8d838e610fc9565b8a6001600160a01b031663619306306040518163ffffffff1660e01b8152600401602060405180830381865afa15801561084e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108729190611fe8565b6001600160a01b031663a7f2a70b878a8a6040518463ffffffff1660e01b81526004016108a19392919061221e565b6020604051808303815f875af11580156108bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108e19190611fe8565b604051630e185b6360e21b81526001600160a01b038083166004830152919650908516906338616d8c906024015f604051808303815f87803b158015610925575f80fd5b505af1158015610937573d5f803e3d5ffd5b5050604080518981526001600160a01b0389811660208301528881168284015287811660608301528616608082015290517f4721e67ac72a73acc32af5991bac7e3dc1e3a20275c825f026b92636c5d54fc793509081900360a0019150a1505050509850989650505050505050565b5f826001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109e3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a079190611fe8565b6001600160a01b0316636352211e876040518263ffffffff1660e01b8152600401610a3491815260200190565b602060405180830381865afa158015610a4f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a739190611fe8565b866001610a81838383610c8f565b604051632296923360e11b8152600481018a90525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063452d246690602401606060405180830381865afa158015610ae6573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b0a919061200a565b50509050806001600160a01b03166328e4b42442604051602001610b3091815260200190565b60405160208183030381529060405280519060200120886040518363ffffffff1660e01b8152600401610b6492919061208d565b5f604051808303815f87803b158015610b7b575f80fd5b505af1158015610b8d573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be8c8c8b6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bff573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c239190611fe8565b6040518463ffffffff1660e01b8152600401610c41939291906120fe565b6020604051808303815f875af1158015610c5d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c819190611fe8565b90506104118b8a838b61115d565b336001600160a01b03841614801590610d41575060405163c161c93f60e01b81523360048201526001600160a01b03848116602483015260448201849052606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f90608401602060405180830381865afa158015610d1b573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d3f9190612248565b155b8015610de5575060405163c161c93f60e01b81523360048201526001600160a01b0384811660248301525f6044830152606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f90608401602060405180830381865afa158015610dbf573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610de39190612248565b155b15610e035760405163075fd2b160e01b815260040160405180910390fd5b505050565b5f816001600160a01b031663111d861b86865f015160405180610240016040528089602001515f0151815260200189602001516020015181526020018960200151604001518152602001896020015160600151815260200189602001516080015115158152602001896020015160a0015115158152602001896020015160c0015115158152602001896020015160e00151151581526020018960200151610100015115158152602001896020015161012001511515815260200189602001516101400151151581526020018960200151610160015115158152602001896020015161018001511515815260200189602001516101a001511515815260200189602001516101c001511515815260200189602001516101e0015115158152602001886001600160a01b0316815260200189602001516102200151815250886040015189606001518a608001518b60a001518c60c001516040518963ffffffff1660e01b8152600401610f80989796959493929190612577565b6020604051808303815f875af1158015610f9c573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610fc09190612174565b95945050505050565b8251602080850151604080516102408101825281880180515182528051850151948201949094528351820151818301528351606090810151818301528451608090810151151581840152855160a090810151151581850152865160c090810151151581860152875160e09081015115158187015288516101009081015115159087015288516101209081015115159087015288516101409081015115159087015288516101609081015115159087015288516101809081015115159087015288516101a09081015115159087015288516101c09081015115159087015288516101e0908101511515908701526001600160a01b038c811661020088015298516102209081015190870152938c0151928c0151918c0151908c0151938c0151955163b3c5267360e01b8152978a169863b3c5267398611116988f9892979096909594939290916004016125f1565b6020604051808303815f875af1158015611132573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111569190612174565b5050505050565b5f816001600160a01b031663badbdf2886865f015160405180610240016040528089602001515f0151815260200189602001516020015181526020018960200151604001518152602001896020015160600151815260200189602001516080015115158152602001896020015160a0015115158152602001896020015160c0015115158152602001896020015160e00151151581526020018960200151610100015115158152602001896020015161012001511515815260200189602001516101400151151581526020018960200151610160015115158152602001896020015161018001511515815260200189602001516101a001511515815260200189602001516101c001511515815260200189602001516101e0015115158152602001886001600160a01b0316815260200189602001516102200151815250886040015189606001518a608001518b60a001516040518863ffffffff1660e01b8152600401610f8097969594939291906126b1565b634e487b7160e01b5f52604160045260245ffd5b604051602081016001600160401b0381118282101715611305576113056112cf565b60405290565b604051608081016001600160401b0381118282101715611305576113056112cf565b60405161024081016001600160401b0381118282101715611305576113056112cf565b604080519081016001600160401b0381118282101715611305576113056112cf565b60405160e081016001600160401b0381118282101715611305576113056112cf565b60405160c081016001600160401b0381118282101715611305576113056112cf565b60405161010081016001600160401b0381118282101715611305576113056112cf565b604051601f8201601f191681016001600160401b0381118282101715611401576114016112cf565b604052919050565b5f6001600160401b03821115611421576114216112cf565b5060051b60200190565b6001600160a01b038116811461143f575f80fd5b50565b803561144d8161142b565b919050565b5f6020808385031215611463575f80fd5b61146b6112e3565b915082356001600160401b03811115611482575f80fd5b8301601f81018513611492575f80fd5b80356114a56114a082611409565b6113d9565b81815260059190911b820183019083810190878311156114c3575f80fd5b928401925b828410156114ea5783356114db8161142b565b825292840192908401906114c8565b8552509295945050505050565b5f60808284031215611507575f80fd5b61150f61130b565b905081358152602082013560208201526040820135604082015260608201356115378161142b565b606082015292915050565b801515811461143f575f80fd5b803561144d81611542565b5f6060828403121561156a575f80fd5b604051606081018181106001600160401b038211171561158c5761158c6112cf565b604052905080823561159d81611542565b815260208301356115ad81611542565b602082015260408301356115c081611542565b6040919091015292915050565b5f61028082840312156115de575f80fd5b6115e661132d565b90506115f2838361155a565b8152606082013560208201526080820135604082015260a0820135606082015261161e60c0830161154f565b608082015261162f60e0830161154f565b60a082015261010061164281840161154f565b60c083015261012061165581850161154f565b60e084015261014061166881860161154f565b83850152610160925061167c83860161154f565b82850152610180915061169082860161154f565b908401526101a06116a285820161154f565b838501526101c092506116b683860161154f565b828501526101e091506116ca82860161154f565b908401526102006116dc85820161154f565b8385015261022092506116f083860161154f565b828501526117016102408601611442565b818501525050610260830135818301525092915050565b5f82601f830112611727575f80fd5b813560206117376114a083611409565b82815260059290921b84018101918181019086841115611755575f80fd5b8286015b8481101561189b5780356001600160401b0380821115611777575f80fd5b908801906040828b03601f190181131561178f575f80fd5b611797611350565b87840135815281840135838111156117ad575f80fd5b8085019450508b603f8501126117c1575f80fd5b8784013592506117d36114a084611409565b83815260e09093028401820192888101908d8511156117f0575f80fd5b948301945b848610156118865760e0868f03121561180c575f80fd5b611814611372565b863561181f81611542565b8152868b013561182e81611542565b818c015286850135858201526060808801359082015260808701356118528161142b565b608082015260a0878101359082015260c087013561186f8161142b565b60c0820152825260e09590950194908901906117f5565b828a0152508652505050918301918301611759565b509695505050505050565b5f82601f8301126118b5575f80fd5b813560206118c56114a083611409565b82815260c092830285018201928282019190878511156118e3575f80fd5b8387015b858110156119595781818a0312156118fe575f8081fd5b611906611394565b81356119118161142b565b8152818601356119208161142b565b8187015260408281013590820152606080830135908201526080808301359082015260a0808301359082015284529284019281016118e7565b5090979650505050505050565b5f82601f830112611975575f80fd5b813560206119856114a083611409565b82815260059290921b840181019181810190868411156119a3575f80fd5b8286015b8481101561189b5780356119ba8161142b565b83529183019183016119a7565b5f82601f8301126119d6575f80fd5b81356001600160401b038111156119ef576119ef6112cf565b611a02601f8201601f19166020016113d9565b818152846020838601011115611a16575f80fd5b816020850160208301375f918101602001919091529392505050565b5f82601f830112611a41575f80fd5b81356020611a516114a083611409565b82815260059290921b84018101918181019086841115611a6f575f80fd5b8286015b8481101561189b5780358352918301918301611a73565b5f60808284031215611a9a575f80fd5b611aa261130b565b905081356001600160401b0380821115611aba575f80fd5b611ac685838601611a32565b8352602084013560208401526040840135915080821115611ae5575f80fd5b611af185838601611a32565b60408401526060840135915080821115611b09575f80fd5b50611b1684828501611a32565b60608301525092915050565b5f805f805f60a08688031215611b36575f80fd5b8535945060208601356001600160401b0380821115611b53575f80fd5b611b5f89838a01611452565b95506040880135915080821115611b74575f80fd5b908701906103a0828a031215611b88575f80fd5b611b90611372565b611b9a8a846114f7565b8152611ba98a608085016115cd565b6020820152610300830135604082015261032083013582811115611bcb575f80fd5b611bd78b828601611718565b60608301525061034083013582811115611bef575f80fd5b611bfb8b8286016118a6565b60808301525061036083013582811115611c13575f80fd5b611c1f8b828601611966565b60a08301525061038083013582811115611c37575f80fd5b611c438b8286016119c7565b60c0830152509450611c5760608901611442565b93506080880135915080821115611c6c575f80fd5b50611c7988828901611a8a565b9150509295509295909350565b5f60408284031215611c96575f80fd5b611c9e611350565b905081356001600160401b03811115611cb5575f80fd5b611cc1848285016119c7565b8252506020820135602082015292915050565b5f6103c08284031215611ce5575f80fd5b611ced6113b6565b905081356001600160401b0380821115611d05575f80fd5b611d1185838601611c86565b8352611d2085602086016114f7565b6020840152611d328560a086016115cd565b60408401526103208401356060840152610340840135915080821115611d56575f80fd5b611d6285838601611718565b6080840152610360840135915080821115611d7b575f80fd5b611d87858386016118a6565b60a0840152610380840135915080821115611da0575f80fd5b611dac85838601611966565b60c08401526103a0840135915080821115611dc5575f80fd5b50611dd2848285016119c7565b60e08301525092915050565b5f805f805f805f80610100898b031215611df6575f80fd5b611dff89611442565b975060208901356001600160401b0380821115611e1a575f80fd5b611e268c838d01611452565b985060408b0135915080821115611e3b575f80fd5b611e478c838d01611cd4565b9750611e5560608c01611442565b9650611e6360808c01611442565b955060a08b0135915080821115611e78575f80fd5b611e848c838d01611a8a565b945060c08b0135915080821115611e99575f80fd5b611ea58c838d016119c7565b935060e08b0135915080821115611eba575f80fd5b50611ec78b828c016119c7565b9150509295985092959890939650565b5f805f805f60a08688031215611eeb575f80fd5b8535945060208601356001600160401b0380821115611f08575f80fd5b611f1489838a01611452565b95506040880135915080821115611f29575f80fd5b90870190610380828a031215611f3d575f80fd5b611f45611394565b611f4f8a846114f7565b8152611f5e8a608085016115cd565b6020820152610300830135604082015261032083013582811115611f80575f80fd5b611f8c8b828601611718565b60608301525061034083013582811115611fa4575f80fd5b611fb08b8286016118a6565b60808301525061036083013582811115611fc8575f80fd5b611fd48b8286016119c7565b60a0830152509450611c5760608901611442565b5f60208284031215611ff8575f80fd5b81516120038161142b565b9392505050565b5f805f6060848603121561201c575f80fd5b83516120278161142b565b60208501519093506120388161142b565b60408501519092506120498161142b565b809150509250925092565b5f8151808452602080850194508084015f5b8381101561208257815187529582019590820190600101612066565b509495945050505050565b828152604060208201525f8251608060408401526120ae60c0840182612054565b9050602084015160608401526040840151603f19808584030160808601526120d68383612054565b925060608601519150808584030160a0860152506120f48282612054565b9695505050505050565b8381526060602080830182905284519183018190528151608084018190525f92820190839060a08601905b808310156121525783516001600160a01b03168252928401926001929092019190840190612129565b506001600160a01b039690961660409590950194909452509295945050505050565b5f60208284031215612184575f80fd5b5051919050565b808201808211156121aa57634e487b7160e01b5f52601160045260245ffd5b92915050565b5f81518084525f5b818110156121d4576020818501810151868301820152016121b8565b505f602082860101526020601f19601f83011685010191505092915050565b6001600160a01b038481168252831660208201526060604082018190525f90610fc0908301846121b0565b838152606060208201525f61223660608301856121b0565b82810360408401526120f481856121b0565b5f60208284031215612258575f80fd5b815161200381611542565b8051825260208082015190830152604080820151908301526060908101516001600160a01b0316910152565b6122b48282518051151582526020808201511515908301526040908101511515910152565b6020810151606083015260408101516080830152606081015160a083015260808101516122e560c084018215159052565b5060a081015180151560e08401525060c08101516101006123098185018315159052565b60e083015191506101206123208186018415159052565b908301519150610140906123378583018415159052565b830151915061016061234c8582018415159052565b908301519150610180906123638583018415159052565b83015191506101a06123788582018415159052565b9083015191506101c09061238f8583018415159052565b83015191506101e06123a48582018415159052565b908301519150610200906123bb8583018415159052565b83015191506102206123d08582018415159052565b908301516001600160a01b0316610240850152909101516102609092019190915250565b5f81518084526020808501808196508360051b810191508286015f805b868110156124c4578385038a52825180518652860151604087870181905281518188018190529188019160609081890190865b818110156124ad5785518051151584528c81015115158d850152858101518685015284810151858501526080808201516001600160a01b039081169186019190915260a0808301519086015260c0918201511690840152948b019460e090920191600101612444565b50509c89019c975050509286019250600101612411565b509298975050505050505050565b5f8151808452602080850194508084015f5b8381101561208257815180516001600160a01b03908116895284820151168489015260408082015190890152606080820151908901526080808201519089015260a0908101519088015260c090960195908201906001016124e4565b5f8151808452602080850194508084015f5b838110156120825781516001600160a01b031687529582019590820190600101612552565b5f6103c08a835261258b602084018b612263565b61259860a084018a61228f565b87610320840152806103408401526125b2818401886123f4565b90508281036103608401526125c781876124d2565b90508281036103808401526125dc8186612540565b90508281036103a084015261041181856121b0565b6001600160a01b038a1681526103e06020820181905289516040838301525f91906126206104208501826121b0565b91505060208b015161040084015261263b604084018b612263565b61264860c084018a61228f565b8761034084015282810361036084015261266281886123f4565b905082810361038084015261267781876124d2565b90508281036103a084015261268c8186612540565b90508281036103c08401526126a181856121b0565b9c9b505050505050505050505050565b5f6103a08983526126c5602084018a612263565b6126d260a084018961228f565b86610320840152806103408401526126ec818401876123f4565b905082810361036084015261270181866124d2565b905082810361038084015261271681856121b0565b9a995050505050505050505056fea2646970667358221220692be9b7321a0a608f168c642267c868300331959394005be610d388551f281064736f6c63430008140033',
      deployedBytecode:
        '0x608060405234801561000f575f80fd5b5060043610610055575f3560e01c80633599df6714610059578063383be4251461007f5780638f3d964b146100af578063ad007d63146100ee578063f05df89a14610115575b5f80fd5b61006c610067366004611b22565b610128565b6040519081526020015b60405180910390f35b61009261008d366004611dde565b610420565b604080519283526001600160a01b03909116602083015201610076565b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610076565b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b61006c610123366004611ed7565b6109a6565b5f826001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610165573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101899190611fe8565b6001600160a01b0316636352211e876040518263ffffffff1660e01b81526004016101b691815260200190565b602060405180830381865afa1580156101d1573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101f59190611fe8565b866001610203838383610c8f565b604051632296923360e11b8152600481018a90525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063452d246690602401606060405180830381865afa158015610268573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061028c919061200a565b50509050806001600160a01b03166328e4b424426040516020016102b291815260200190565b60405160208183030381529060405280519060200120886040518363ffffffff1660e01b81526004016102e692919061208d565b5f604051808303815f87803b1580156102fd575f80fd5b505af115801561030f573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be8c8c8b6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610381573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103a59190611fe8565b6040518463ffffffff1660e01b81526004016103c3939291906120fe565b6020604051808303815f875af11580156103df573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104039190611fe8565b90506104118b8a838b610e08565b9b9a5050505050505050505050565b5f80866001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561045e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104829190611fe8565b6001600160a01b03166306661abd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104e19190612174565b6104ec90600161218b565b91505f805f886001600160a01b031663c8a7071e5f808d896040516020016105299291906001600160a01b03929092168252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b8152600401610556939291906121f3565b6060604051808303815f875af1158015610572573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610596919061200a565b925092509250826001600160a01b031663f2fde38b8e6040518263ffffffff1660e01b81526004016105d791906001600160a01b0391909116815260200190565b5f604051808303815f87803b1580156105ee575f80fd5b505af1158015610600573d5f803e3d5ffd5b50506040516386a2444960e01b8152600481018890526001600160a01b038681166024830152858116604483015284811660648301527f00000000000000000000000000000000000000000000000000000000000000001692506386a2444991506084015f604051808303815f87803b15801561067b575f80fd5b505af115801561068d573d5f803e3d5ffd5b50505050826001600160a01b03166328e4b424426040516020016106b391815260200190565b604051602081830303815290604052805190602001208a6040518363ffffffff1660e01b81526004016106e792919061208d565b5f604051808303815f87803b1580156106fe575f80fd5b505af1158015610710573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be878f8e6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610782573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906107a69190611fe8565b6040518463ffffffff1660e01b81526004016107c4939291906120fe565b6020604051808303815f875af11580156107e0573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108049190611fe8565b90506108128e8d838e610fc9565b8a6001600160a01b031663619306306040518163ffffffff1660e01b8152600401602060405180830381865afa15801561084e573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108729190611fe8565b6001600160a01b031663a7f2a70b878a8a6040518463ffffffff1660e01b81526004016108a19392919061221e565b6020604051808303815f875af11580156108bd573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108e19190611fe8565b604051630e185b6360e21b81526001600160a01b038083166004830152919650908516906338616d8c906024015f604051808303815f87803b158015610925575f80fd5b505af1158015610937573d5f803e3d5ffd5b5050604080518981526001600160a01b0389811660208301528881168284015287811660608301528616608082015290517f4721e67ac72a73acc32af5991bac7e3dc1e3a20275c825f026b92636c5d54fc793509081900360a0019150a1505050509850989650505050505050565b5f826001600160a01b0316638b79543c6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109e3573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a079190611fe8565b6001600160a01b0316636352211e876040518263ffffffff1660e01b8152600401610a3491815260200190565b602060405180830381865afa158015610a4f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a739190611fe8565b866001610a81838383610c8f565b604051632296923360e11b8152600481018a90525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063452d246690602401606060405180830381865afa158015610ae6573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b0a919061200a565b50509050806001600160a01b03166328e4b42442604051602001610b3091815260200190565b60405160208183030381529060405280519060200120886040518363ffffffff1660e01b8152600401610b6492919061208d565b5f604051808303815f87803b158015610b7b575f80fd5b505af1158015610b8d573d5f803e3d5ffd5b505050505f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a25f53be8c8c8b6001600160a01b031663c41c2f246040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bff573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c239190611fe8565b6040518463ffffffff1660e01b8152600401610c41939291906120fe565b6020604051808303815f875af1158015610c5d573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610c819190611fe8565b90506104118b8a838b61115d565b336001600160a01b03841614801590610d41575060405163c161c93f60e01b81523360048201526001600160a01b03848116602483015260448201849052606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f90608401602060405180830381865afa158015610d1b573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d3f9190612248565b155b8015610de5575060405163c161c93f60e01b81523360048201526001600160a01b0384811660248301525f6044830152606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f90608401602060405180830381865afa158015610dbf573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610de39190612248565b155b15610e035760405163075fd2b160e01b815260040160405180910390fd5b505050565b5f816001600160a01b031663111d861b86865f015160405180610240016040528089602001515f0151815260200189602001516020015181526020018960200151604001518152602001896020015160600151815260200189602001516080015115158152602001896020015160a0015115158152602001896020015160c0015115158152602001896020015160e00151151581526020018960200151610100015115158152602001896020015161012001511515815260200189602001516101400151151581526020018960200151610160015115158152602001896020015161018001511515815260200189602001516101a001511515815260200189602001516101c001511515815260200189602001516101e0015115158152602001886001600160a01b0316815260200189602001516102200151815250886040015189606001518a608001518b60a001518c60c001516040518963ffffffff1660e01b8152600401610f80989796959493929190612577565b6020604051808303815f875af1158015610f9c573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610fc09190612174565b95945050505050565b8251602080850151604080516102408101825281880180515182528051850151948201949094528351820151818301528351606090810151818301528451608090810151151581840152855160a090810151151581850152865160c090810151151581860152875160e09081015115158187015288516101009081015115159087015288516101209081015115159087015288516101409081015115159087015288516101609081015115159087015288516101809081015115159087015288516101a09081015115159087015288516101c09081015115159087015288516101e0908101511515908701526001600160a01b038c811661020088015298516102209081015190870152938c0151928c0151918c0151908c0151938c0151955163b3c5267360e01b8152978a169863b3c5267398611116988f9892979096909594939290916004016125f1565b6020604051808303815f875af1158015611132573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906111569190612174565b5050505050565b5f816001600160a01b031663badbdf2886865f015160405180610240016040528089602001515f0151815260200189602001516020015181526020018960200151604001518152602001896020015160600151815260200189602001516080015115158152602001896020015160a0015115158152602001896020015160c0015115158152602001896020015160e00151151581526020018960200151610100015115158152602001896020015161012001511515815260200189602001516101400151151581526020018960200151610160015115158152602001896020015161018001511515815260200189602001516101a001511515815260200189602001516101c001511515815260200189602001516101e0015115158152602001886001600160a01b0316815260200189602001516102200151815250886040015189606001518a608001518b60a001516040518863ffffffff1660e01b8152600401610f8097969594939291906126b1565b634e487b7160e01b5f52604160045260245ffd5b604051602081016001600160401b0381118282101715611305576113056112cf565b60405290565b604051608081016001600160401b0381118282101715611305576113056112cf565b60405161024081016001600160401b0381118282101715611305576113056112cf565b604080519081016001600160401b0381118282101715611305576113056112cf565b60405160e081016001600160401b0381118282101715611305576113056112cf565b60405160c081016001600160401b0381118282101715611305576113056112cf565b60405161010081016001600160401b0381118282101715611305576113056112cf565b604051601f8201601f191681016001600160401b0381118282101715611401576114016112cf565b604052919050565b5f6001600160401b03821115611421576114216112cf565b5060051b60200190565b6001600160a01b038116811461143f575f80fd5b50565b803561144d8161142b565b919050565b5f6020808385031215611463575f80fd5b61146b6112e3565b915082356001600160401b03811115611482575f80fd5b8301601f81018513611492575f80fd5b80356114a56114a082611409565b6113d9565b81815260059190911b820183019083810190878311156114c3575f80fd5b928401925b828410156114ea5783356114db8161142b565b825292840192908401906114c8565b8552509295945050505050565b5f60808284031215611507575f80fd5b61150f61130b565b905081358152602082013560208201526040820135604082015260608201356115378161142b565b606082015292915050565b801515811461143f575f80fd5b803561144d81611542565b5f6060828403121561156a575f80fd5b604051606081018181106001600160401b038211171561158c5761158c6112cf565b604052905080823561159d81611542565b815260208301356115ad81611542565b602082015260408301356115c081611542565b6040919091015292915050565b5f61028082840312156115de575f80fd5b6115e661132d565b90506115f2838361155a565b8152606082013560208201526080820135604082015260a0820135606082015261161e60c0830161154f565b608082015261162f60e0830161154f565b60a082015261010061164281840161154f565b60c083015261012061165581850161154f565b60e084015261014061166881860161154f565b83850152610160925061167c83860161154f565b82850152610180915061169082860161154f565b908401526101a06116a285820161154f565b838501526101c092506116b683860161154f565b828501526101e091506116ca82860161154f565b908401526102006116dc85820161154f565b8385015261022092506116f083860161154f565b828501526117016102408601611442565b818501525050610260830135818301525092915050565b5f82601f830112611727575f80fd5b813560206117376114a083611409565b82815260059290921b84018101918181019086841115611755575f80fd5b8286015b8481101561189b5780356001600160401b0380821115611777575f80fd5b908801906040828b03601f190181131561178f575f80fd5b611797611350565b87840135815281840135838111156117ad575f80fd5b8085019450508b603f8501126117c1575f80fd5b8784013592506117d36114a084611409565b83815260e09093028401820192888101908d8511156117f0575f80fd5b948301945b848610156118865760e0868f03121561180c575f80fd5b611814611372565b863561181f81611542565b8152868b013561182e81611542565b818c015286850135858201526060808801359082015260808701356118528161142b565b608082015260a0878101359082015260c087013561186f8161142b565b60c0820152825260e09590950194908901906117f5565b828a0152508652505050918301918301611759565b509695505050505050565b5f82601f8301126118b5575f80fd5b813560206118c56114a083611409565b82815260c092830285018201928282019190878511156118e3575f80fd5b8387015b858110156119595781818a0312156118fe575f8081fd5b611906611394565b81356119118161142b565b8152818601356119208161142b565b8187015260408281013590820152606080830135908201526080808301359082015260a0808301359082015284529284019281016118e7565b5090979650505050505050565b5f82601f830112611975575f80fd5b813560206119856114a083611409565b82815260059290921b840181019181810190868411156119a3575f80fd5b8286015b8481101561189b5780356119ba8161142b565b83529183019183016119a7565b5f82601f8301126119d6575f80fd5b81356001600160401b038111156119ef576119ef6112cf565b611a02601f8201601f19166020016113d9565b818152846020838601011115611a16575f80fd5b816020850160208301375f918101602001919091529392505050565b5f82601f830112611a41575f80fd5b81356020611a516114a083611409565b82815260059290921b84018101918181019086841115611a6f575f80fd5b8286015b8481101561189b5780358352918301918301611a73565b5f60808284031215611a9a575f80fd5b611aa261130b565b905081356001600160401b0380821115611aba575f80fd5b611ac685838601611a32565b8352602084013560208401526040840135915080821115611ae5575f80fd5b611af185838601611a32565b60408401526060840135915080821115611b09575f80fd5b50611b1684828501611a32565b60608301525092915050565b5f805f805f60a08688031215611b36575f80fd5b8535945060208601356001600160401b0380821115611b53575f80fd5b611b5f89838a01611452565b95506040880135915080821115611b74575f80fd5b908701906103a0828a031215611b88575f80fd5b611b90611372565b611b9a8a846114f7565b8152611ba98a608085016115cd565b6020820152610300830135604082015261032083013582811115611bcb575f80fd5b611bd78b828601611718565b60608301525061034083013582811115611bef575f80fd5b611bfb8b8286016118a6565b60808301525061036083013582811115611c13575f80fd5b611c1f8b828601611966565b60a08301525061038083013582811115611c37575f80fd5b611c438b8286016119c7565b60c0830152509450611c5760608901611442565b93506080880135915080821115611c6c575f80fd5b50611c7988828901611a8a565b9150509295509295909350565b5f60408284031215611c96575f80fd5b611c9e611350565b905081356001600160401b03811115611cb5575f80fd5b611cc1848285016119c7565b8252506020820135602082015292915050565b5f6103c08284031215611ce5575f80fd5b611ced6113b6565b905081356001600160401b0380821115611d05575f80fd5b611d1185838601611c86565b8352611d2085602086016114f7565b6020840152611d328560a086016115cd565b60408401526103208401356060840152610340840135915080821115611d56575f80fd5b611d6285838601611718565b6080840152610360840135915080821115611d7b575f80fd5b611d87858386016118a6565b60a0840152610380840135915080821115611da0575f80fd5b611dac85838601611966565b60c08401526103a0840135915080821115611dc5575f80fd5b50611dd2848285016119c7565b60e08301525092915050565b5f805f805f805f80610100898b031215611df6575f80fd5b611dff89611442565b975060208901356001600160401b0380821115611e1a575f80fd5b611e268c838d01611452565b985060408b0135915080821115611e3b575f80fd5b611e478c838d01611cd4565b9750611e5560608c01611442565b9650611e6360808c01611442565b955060a08b0135915080821115611e78575f80fd5b611e848c838d01611a8a565b945060c08b0135915080821115611e99575f80fd5b611ea58c838d016119c7565b935060e08b0135915080821115611eba575f80fd5b50611ec78b828c016119c7565b9150509295985092959890939650565b5f805f805f60a08688031215611eeb575f80fd5b8535945060208601356001600160401b0380821115611f08575f80fd5b611f1489838a01611452565b95506040880135915080821115611f29575f80fd5b90870190610380828a031215611f3d575f80fd5b611f45611394565b611f4f8a846114f7565b8152611f5e8a608085016115cd565b6020820152610300830135604082015261032083013582811115611f80575f80fd5b611f8c8b828601611718565b60608301525061034083013582811115611fa4575f80fd5b611fb08b8286016118a6565b60808301525061036083013582811115611fc8575f80fd5b611fd48b8286016119c7565b60a0830152509450611c5760608901611442565b5f60208284031215611ff8575f80fd5b81516120038161142b565b9392505050565b5f805f6060848603121561201c575f80fd5b83516120278161142b565b60208501519093506120388161142b565b60408501519092506120498161142b565b809150509250925092565b5f8151808452602080850194508084015f5b8381101561208257815187529582019590820190600101612066565b509495945050505050565b828152604060208201525f8251608060408401526120ae60c0840182612054565b9050602084015160608401526040840151603f19808584030160808601526120d68383612054565b925060608601519150808584030160a0860152506120f48282612054565b9695505050505050565b8381526060602080830182905284519183018190528151608084018190525f92820190839060a08601905b808310156121525783516001600160a01b03168252928401926001929092019190840190612129565b506001600160a01b039690961660409590950194909452509295945050505050565b5f60208284031215612184575f80fd5b5051919050565b808201808211156121aa57634e487b7160e01b5f52601160045260245ffd5b92915050565b5f81518084525f5b818110156121d4576020818501810151868301820152016121b8565b505f602082860101526020601f19601f83011685010191505092915050565b6001600160a01b038481168252831660208201526060604082018190525f90610fc0908301846121b0565b838152606060208201525f61223660608301856121b0565b82810360408401526120f481856121b0565b5f60208284031215612258575f80fd5b815161200381611542565b8051825260208082015190830152604080820151908301526060908101516001600160a01b0316910152565b6122b48282518051151582526020808201511515908301526040908101511515910152565b6020810151606083015260408101516080830152606081015160a083015260808101516122e560c084018215159052565b5060a081015180151560e08401525060c08101516101006123098185018315159052565b60e083015191506101206123208186018415159052565b908301519150610140906123378583018415159052565b830151915061016061234c8582018415159052565b908301519150610180906123638583018415159052565b83015191506101a06123788582018415159052565b9083015191506101c09061238f8583018415159052565b83015191506101e06123a48582018415159052565b908301519150610200906123bb8583018415159052565b83015191506102206123d08582018415159052565b908301516001600160a01b0316610240850152909101516102609092019190915250565b5f81518084526020808501808196508360051b810191508286015f805b868110156124c4578385038a52825180518652860151604087870181905281518188018190529188019160609081890190865b818110156124ad5785518051151584528c81015115158d850152858101518685015284810151858501526080808201516001600160a01b039081169186019190915260a0808301519086015260c0918201511690840152948b019460e090920191600101612444565b50509c89019c975050509286019250600101612411565b509298975050505050505050565b5f8151808452602080850194508084015f5b8381101561208257815180516001600160a01b03908116895284820151168489015260408082015190890152606080820151908901526080808201519089015260a0908101519088015260c090960195908201906001016124e4565b5f8151808452602080850194508084015f5b838110156120825781516001600160a01b031687529582019590820190600101612552565b5f6103c08a835261258b602084018b612263565b61259860a084018a61228f565b87610320840152806103408401526125b2818401886123f4565b90508281036103608401526125c781876124d2565b90508281036103808401526125dc8186612540565b90508281036103a084015261041181856121b0565b6001600160a01b038a1681526103e06020820181905289516040838301525f91906126206104208501826121b0565b91505060208b015161040084015261263b604084018b612263565b61264860c084018a61228f565b8761034084015282810361036084015261266281886123f4565b905082810361038084015261267781876124d2565b90508281036103a084015261268c8186612540565b90508281036103c08401526126a181856121b0565b9c9b505050505050505050505050565b5f6103a08983526126c5602084018a612263565b6126d260a084018961228f565b86610320840152806103408401526126ec818401876123f4565b905082810361036084015261270181866124d2565b905082810361038084015261271681856121b0565b9a995050505050505050505056fea2646970667358221220692be9b7321a0a608f168c642267c868300331959394005be610d388551f281064736f6c63430008140033',
      linkReferences: {},
      deployedLinkReferences: {},
    }
  }

  // NOTE: imports are specified explicitly to avoid Webpack causing V8 to run out of memory and crash during compilation.
  if (contractName === 'JB721TieredGovernance') {
    return await import(
      `@jbx-protocol/juice-721-delegate-v${version}/out/JB721TieredGovernance.sol/JB721TieredGovernance.json`
    )
  }

  if (contractName === 'IJBTiered721DelegateStore') {
    return await import(
      `@jbx-protocol/juice-721-delegate-v${version}/out/IJBTiered721DelegateStore.sol/IJBTiered721DelegateStore.json`
    )
  }

  if (contractName === 'IJBTiered721Delegate') {
    return await import(
      `@jbx-protocol/juice-721-delegate-v${version}/out/IJBTiered721Delegate.sol/IJBTiered721Delegate.json`
    )
  }

  if (contractName === 'IJBTiered721DelegateProjectDeployer') {
    return await import(
      `@jbx-protocol/juice-721-delegate-v${version}/out/IJBTiered721DelegateProjectDeployer.sol/IJBTiered721DelegateProjectDeployer.json`
    )
  }
}

export function useJB721DelegateAbi(
  contractName: JB721DelegateContractName,
  version: JB721DelegateVersion | undefined,
) {
  const [abi, setAbi] = useState<ContractInterface | undefined>(undefined)

  useEffect(() => {
    if (!version) return

    loadJB721DelegateJson(contractName, version).then(json => setAbi(json?.abi))
  }, [version, contractName])

  return abi
}
