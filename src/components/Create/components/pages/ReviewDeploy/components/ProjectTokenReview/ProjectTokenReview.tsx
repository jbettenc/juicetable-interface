import { t } from '@lingui/macro'
import { Divider } from 'antd'
import TooltipLabel from 'components/TooltipLabel'
import {
  DISCOUNT_RATE_EXPLANATION,
  MINT_RATE_EXPLANATION,
  OWNER_MINTING_EXPLANATION,
  REDEMPTION_RATE_EXPLANATION,
  RESERVED_RATE_EXPLANATION,
} from 'components/strings'
import uniqueId from 'lodash/uniqueId'
import { ReactNode, useMemo } from 'react'
import { formatAmount } from 'utils/format/formatAmount'
import {
  formatDiscountRate,
  formatIssuanceRate,
  formatRedemptionRate,
  formatReservedRate,
} from 'utils/v2v3/math'
import { ReservedTokensList } from '../../../ProjectToken/components/CustomTokenSettings/components'
import * as ProjectTokenForm from '../../../ProjectToken/hooks/useProjectTokenForm'
import { ReviewDescription } from '../ReviewDescription'
import { useProjectTokenReview } from './hooks/useProjectTokenReview'

export const ProjectTokenReview = () => {
  const {
    allocationSplits,
    allowTokenMinting,
    pauseTransfers,
    discountRate,
    redemptionRate,
    reservedRate,
    setAllocationSplits,
    weight,
    tokenUnlockingSchedules,
    tokenName,
    tokenSymbol,
  } = useProjectTokenReview()

  const discrete = useMemo(() => {
    try {
      return (
        JSON.parse(tokenUnlockingSchedules ?? '[]')?.filter(
          (item: any) => item.type === 'discrete',
        ) ?? []
      )
    } catch (err) {
      return []
    }
  }, [tokenUnlockingSchedules])
  const linear = useMemo(() => {
    try {
      return (
        JSON.parse(tokenUnlockingSchedules ?? '[]')?.filter(
          (item: any) => item.type === 'linear',
        ) ?? []
      )
    } catch (err) {
      return []
    }
  }, [tokenUnlockingSchedules])

  const data: Record<string, { data: string; tooltip: ReactNode }> = useMemo(
    () => ({
      [t`Token Name`]: {
        data: `${
          tokenName && tokenName.trim().length === 0 ? 'My Token' : tokenName
        }`,
        tooltip: 'The name that will be given to your token.',
      },
      [t`Token symbol`]: {
        data: `${
          tokenSymbol && tokenSymbol.trim().length === 0 ? 'TOKN' : tokenSymbol
        }`,
        tooltip: 'The symbol that will be given to your token.',
      },
      [t`Total issuance rate`]: {
        data: `${formatAmount(
          ProjectTokenForm.DefaultEthSignSettings.initialMintRate,
        )} tokens / ETH`,
        tooltip: MINT_RATE_EXPLANATION,
      },
      [t`Reserved rate`]: {
        data: `${ProjectTokenForm.DefaultEthSignSettings.reservedTokensPercentage}%`,
        tooltip: RESERVED_RATE_EXPLANATION,
      },
      [t`Issuance reduction rate`]: {
        data: `${ProjectTokenForm.DefaultEthSignSettings.discountRate}%`,
        tooltip: DISCOUNT_RATE_EXPLANATION,
      },
      [t`Redemption rate`]: {
        data: `${ProjectTokenForm.DefaultEthSignSettings.redemptionRate}%`,
        tooltip: REDEMPTION_RATE_EXPLANATION,
      },
      [t`Reserved token recipient`]: {
        data: `EthSign Smart Contract`,
        tooltip: OWNER_MINTING_EXPLANATION,
      },
    }),
    [tokenName, tokenSymbol],
  )

  // TODO: Actually track if EthSign's custom tokens are selected
  if (1 === 1) {
    return (
      <div className="flex flex-col">
        <div className="font-medium">Token Unlock provided by EthSign</div>
        <span>
          Preset rules provided by EthSign. Project Creators are able to create
          a token unlocking schedule for each funding round.
        </span>
        {Object.entries(data).map(([key, { data: text, tooltip }], i) => (
          <div key={key}>
            {i === 0 && <Divider className="m-0 my-4" />}
            <div className="flex justify-between">
              <TooltipLabel label={key} tip={tooltip} />
              <span>{text}</span>
            </div>
            <Divider className="my-4" />
          </div>
        ))}
        <div>
          <div className="flex justify-between">
            <TooltipLabel
              label={'Unlocking Schedule'}
              tip={
                'Token unlocking schedule for this project, broken up into discrete and linear unlock groups.'
              }
            />
            <div className="text-right">
              {discrete.map((discrete: any) => (
                <div key={`summary-discrete-${uniqueId()}`}>
                  {!discrete.moment || discrete.moment === 0 ? (
                    <>
                      <span className="font-semibold">
                        {discrete.percentage}%
                      </span>{' '}
                      token discrete release at{' '}
                      <span className="font-semibold">TGE</span>.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">{discrete.moment}</span>{' '}
                      month cliff,{' '}
                      <span className="font-semibold">
                        {discrete.percentage}%
                      </span>{' '}
                      released after cliff.
                    </>
                  )}
                </div>
              ))}
              {linear.map((linear: any) => (
                <div key={`summary-linear-${uniqueId()}`}>
                  <span className="font-semibold">
                    {linear.frequency.label}
                  </span>{' '}
                  linear unlocking,{' '}
                  <span className="font-semibold">{linear.percentage}%</span>{' '}
                  release over{' '}
                  <span className="font-semibold">{linear.unlockingTime}</span>{' '}
                  month
                  {linear.unlockingTime === 1 ? '' : 's'}.
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-10 pt-5 pb-12 md:grid md:grid-cols-4">
      <ReviewDescription
        title={t`Total issuance rate`}
        desc={
          <div className="text-base font-medium">
            {formatAmount(
              weight
                ? formatIssuanceRate(weight)
                : ProjectTokenForm.DefaultSettings.initialMintRate,
            )}
          </div>
        }
      />
      <ReviewDescription
        title={t`Reserved rate`}
        desc={
          <div className="text-base font-medium">
            {formatReservedRate(
              reservedRate
                ? reservedRate
                : ProjectTokenForm.DefaultSettings.reservedTokensPercentage.toString(),
            ) + '%'}
          </div>
        }
      />
      <ReviewDescription
        className="col-span-2"
        title={t`Reserved token recipients`}
        desc={
          <ReservedTokensList
            isEditable={false}
            value={allocationSplits}
            onChange={setAllocationSplits}
          />
        }
      />
      <ReviewDescription
        title={t`Issuance reduction rate`}
        desc={
          <div className="text-base font-medium">
            {formatDiscountRate(
              discountRate
                ? discountRate
                : ProjectTokenForm.DefaultSettings.discountRate.toString(),
            ) + '%'}
          </div>
        }
      />
      <ReviewDescription
        title={t`Redemption rate`}
        desc={
          <div className="text-base font-medium">
            {formatRedemptionRate(
              redemptionRate
                ? redemptionRate
                : ProjectTokenForm.DefaultSettings.redemptionRate.toString(),
            ) + '%'}
          </div>
        }
      />
      <ReviewDescription
        title={t`Owner token minting`}
        desc={<div className="text-base font-medium">{allowTokenMinting}</div>}
      />

      <ReviewDescription
        title={t`Token transfers`}
        desc={<div className="text-base font-medium">{pauseTransfers}</div>}
      />
    </div>
  )
}
