import { Contract } from 'ethers'
import { useLoadContractFromAddress } from 'hooks/useLoadContractFromAddress'
import { JB721DelegateVersion } from 'models/nftRewards'
import { useJB721DelegateAbi } from './useJB721DelegateAbi'

export function useJBTiered721DelegateProjectDeployer({
  version,
}: {
  version: JB721DelegateVersion | undefined
}): Contract | undefined {
  // const JBTiered721DelegateProjectDeployerJson = useJB721DelegateAbi(
  //   'IJBTiered721DelegateProjectDeployer',
  //   version,
  // )

  // const address = useJB721DelegateContractAddress({
  //   contractName: 'JBTiered721DelegateProjectDeployer',
  //   version,
  // })

  const JBTiered721DelegateProjectDeployerJson = useJB721DelegateAbi(
    'EthSign',
    version,
  )

  const address = '0x2961121f816Ca5FC921Dd2Ff563345765845C3b8'

  return useLoadContractFromAddress({
    address,
    abi: JBTiered721DelegateProjectDeployerJson,
  })
}
