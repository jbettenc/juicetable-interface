import { StopOutlined } from '@ant-design/icons'
import { Trans, t } from '@lingui/macro'
import { Divider, Form } from 'antd'
import TooltipLabel from 'components/TooltipLabel'
import { DeleteConfirmationModal } from 'components/modals/DeleteConfirmationModal'
import { FEES_EXPLANATION } from 'components/strings'
import { BigNumber } from 'ethers'
import { useModal } from 'hooks/useModal'
import { PayoutsSelection } from 'models/payoutsSelection'
import { TreasurySelection } from 'models/treasurySelection'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from 'redux/hooks/useAppDispatch'
import { useAppSelector } from 'redux/hooks/useAppSelector'
import { useSetCreateFurthestPageReached } from 'redux/hooks/useEditingCreateFurthestPageReached'
import {
  ReduxDistributionLimit,
  useEditingDistributionLimit,
} from 'redux/hooks/useEditingDistributionLimit'
import { useEditingPayoutSplits } from 'redux/hooks/useEditingPayoutSplits'
import { editingV2ProjectActions } from 'redux/slices/editingV2Project'
import { allocationTotalPercentDoNotExceedTotalRule } from 'utils/antdRules'
import { V2V3_CURRENCY_ETH } from 'utils/v2v3/currency'
import { MAX_DISTRIBUTION_LIMIT } from 'utils/v2v3/math'
import { Selection } from '../../Selection'
import { Wizard } from '../../Wizard'
import { PageContext } from '../../Wizard/contexts/PageContext'
import { ConvertAmountsModal } from './components'
import { PayoutsList } from './components/PayoutsList'
import { usePayoutsForm } from './hooks'
import { useFundingTarget } from './hooks/useFundingTarget'

export const PayoutsPage = () => {
  useSetCreateFurthestPageReached('payouts')
  const { goToNextPage } = useContext(PageContext)
  const { form, initialValues } = usePayoutsForm()
  const fundingTarget = useFundingTarget()
  const [splits, setSplits] = useEditingPayoutSplits()
  const [distributionLimit, setDistributionLimit] =
    useEditingDistributionLimit()
  const switchingToAmountsModal = useModal()
  const switchingToZeroAmountsModal = useModal()
  const dispatch = useAppDispatch()
  const initialTreasurySelection = useAppSelector(
    state => state.editingV2Project.treasurySelection,
  )

  const [treasuryOption, setTreasuryOption] = useState<TreasurySelection>(
    initialTreasurySelection ?? 'zero',
  )

  const payoutsSelection: PayoutsSelection | undefined = useMemo(() => {
    switch (treasuryOption) {
      case 'amount':
        return 'amounts'
      case 'unlimited':
        return 'percentages'
      default:
        return undefined
    }
  }, [treasuryOption])

  const hasAllocations = useMemo(
    () =>
      !!splits.length ||
      (distributionLimit?.amount.gt(0) &&
        distributionLimit.amount.lt(MAX_DISTRIBUTION_LIMIT)),
    [distributionLimit?.amount, splits.length],
  )

  const conditionsToProceedMet = useMemo(() => {
    switch (treasuryOption) {
      case 'amount':
        return hasAllocations
      default:
        return true
    }
  }, [hasAllocations, treasuryOption])

  const switchToAmountsPayoutSelection = useCallback(
    (newDistributionLimit: ReduxDistributionLimit) => {
      setDistributionLimit(newDistributionLimit)
      setTreasuryOption('amount')
      switchingToAmountsModal.close()
    },
    [setDistributionLimit, switchingToAmountsModal],
  )
  const switchToZeroPayoutSelection = useCallback(() => {
    setSplits([])
    setDistributionLimit({
      amount: BigNumber.from(0),
      currency: distributionLimit?.currency ?? V2V3_CURRENCY_ETH,
    })
    form.setFieldValue('payoutsList', [])
    setTreasuryOption('zero')
    switchingToZeroAmountsModal.close()
  }, [
    distributionLimit?.currency,
    form,
    setDistributionLimit,
    setSplits,
    switchingToZeroAmountsModal,
  ])

  // Initial load
  useEffect(() => {
    if (initialTreasurySelection === undefined) {
      dispatch(editingV2ProjectActions.setDistributionLimit('0'))
    }
  })

  useEffect(() => {
    dispatch(editingV2ProjectActions.setTreasurySelection(treasuryOption))
  }, [dispatch, treasuryOption])

  const showPayouts =
    treasuryOption === 'amount' || treasuryOption === 'unlimited'

  const isNextEnabled = !!treasuryOption && conditionsToProceedMet

  return (
    <>
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={() => {
          goToNextPage?.()
        }}
      >
        <div className="flex flex-col gap-6">
          <Form.Item noStyle name="selection">
            <Selection
              className="w-full"
              value={treasuryOption}
              defocusOnSelect
            >
              <Selection.Card
                name="zero"
                title={
                  <div className="flex items-center gap-3">
                    <Trans>None</Trans>
                  </div>
                }
                icon={<StopOutlined />}
                description={
                  <Trans>
                    None of your project's ETH can be paid out. All ETH will
                    stay in your project for token redemptions or use in future
                    cycles.
                  </Trans>
                }
              ></Selection.Card>
            </Selection>
          </Form.Item>
        </div>

        {showPayouts && (
          <Form.Item
            label={
              <TooltipLabel
                className="text-lg font-medium text-black dark:text-grey-200"
                label={<Trans>Payout Recipients</Trans>}
                tip={
                  <Trans>
                    Your project will pay out ETH to these addresses and
                    Juicebox projects.
                  </Trans>
                }
              />
            }
          >
            <div className="mb-4">
              <Trans>
                Add wallet addresses or Juicebox projects to receive payouts.
              </Trans>
            </div>
            {payoutsSelection && (
              <Form.Item
                shouldUpdate
                name="payoutsList"
                rules={[allocationTotalPercentDoNotExceedTotalRule()]}
              >
                <PayoutsList payoutsSelection={payoutsSelection} />
              </Form.Item>
            )}
          </Form.Item>
        )}
        {treasuryOption !== 'zero' && (
          <>
            {hasAllocations && (
              <>
                <Divider className="mt-4 mb-5" />
                <div className="flex items-center">
                  <span className="font-medium">
                    <Trans>Payouts: {fundingTarget}</Trans>
                  </span>
                </div>
                <Divider className="my-5" />
              </>
            )}
            <span className="text-grey-500 dark:text-slate-200">
              {hasAllocations && treasuryOption === 'amount' ? (
                <Trans>
                  If redemptions are enabled, supporters can burn their tokens
                  to reclaim some of the ETH not needed for payouts (any ETH
                  exceeding the amount above). You can turn off redemptions in
                  the Token settings.
                </Trans>
              ) : (
                ''
              )}
              {FEES_EXPLANATION}
            </span>
          </>
        )}
        <Wizard.Page.ButtonControl isNextEnabled={isNextEnabled} />
      </Form>

      <DeleteConfirmationModal
        body={t`Choosing 'None' will clear your payout recipients and reset other payout options.`}
        open={switchingToZeroAmountsModal.visible}
        onOk={switchToZeroPayoutSelection}
        onCancel={switchingToZeroAmountsModal.close}
      />
      <ConvertAmountsModal
        open={switchingToAmountsModal.visible}
        onOk={switchToAmountsPayoutSelection}
        onCancel={switchingToAmountsModal.close}
      />
    </>
  )
}
