import { t } from '@lingui/macro'
import { Divider, Form } from 'antd'
import TooltipLabel from 'components/TooltipLabel'
import FormattedNumberInput from 'components/inputs/FormattedNumberInput'
import { JuiceInput } from 'components/inputs/JuiceTextInput'
import {
  DISCOUNT_RATE_EXPLANATION,
  MINT_RATE_EXPLANATION,
  OWNER_MINTING_EXPLANATION,
  REDEMPTION_RATE_EXPLANATION,
  RESERVED_RATE_EXPLANATION,
} from 'components/strings'
import { ReactNode, useMemo } from 'react'
import { formatAmount } from 'utils/format/formatAmount'
import * as ProjectTokenForm from '../../hooks/useProjectTokenForm'
import { UnlockingSchedules } from './components/UnlockingSchedules.tsx'

export const CustomTokenSettings = () => {
  const data: Record<string, { data: string; tooltip: ReactNode }> = useMemo(
    () => ({
      [t`Reserved rate`]: {
        data: `${formatAmount(
          ProjectTokenForm.DefaultEthSignSettings.reservedTokensPercentage,
        )}%`,
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
    [],
  )
  return (
    <>
      <h4>Token Rules</h4>
      <Form.Item noStyle>
        <div>
          <div className="flex flex-col justify-between">
            <TooltipLabel
              label={'Token name'}
              tip={'The name that will be given to your token.'}
            />
            <div className="mt-2 flex flex-row">
              <Form.Item noStyle name="tokenName" required>
                <JuiceInput placeholder="My Token" className="flex-grow" />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form.Item>
      <Divider className="my-4" />
      <Form.Item noStyle>
        <div>
          <div className="flex flex-col justify-between">
            <TooltipLabel
              label={'Token symbol'}
              tip={'The symbol that will be given to your token.'}
            />
            <div className="mt-2 flex flex-row">
              <Form.Item noStyle name="tokenSymbol" required>
                <JuiceInput placeholder="TOKN" className="flex-grow" />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form.Item>
      <Divider className="my-4" />
      <Form.Item noStyle>
        <div>
          <div className="flex flex-col justify-between">
            <TooltipLabel
              label={'Token issuance rate'}
              tip={MINT_RATE_EXPLANATION}
            />
            <div className="mt-2 flex flex-row">
              <Form.Item noStyle name="initialMintRate">
                <FormattedNumberInput placeholder="14" className="flex-grow" />
              </Form.Item>
              {/* <JuiceInput placeholder="14" /> */}
              <span className="my-auto ml-2 flex-shrink-0">tokens / ETH</span>
            </div>
          </div>
        </div>
      </Form.Item>
      <Divider className="my-4" />
      {Object.entries(data).map(([key, { data: text, tooltip }], i) => (
        <div key={key}>
          <div className="flex justify-between">
            <TooltipLabel label={key} tip={tooltip} />
            <span>{text}</span>
          </div>
          {i < Object.entries(data).length - 1 && <Divider className="my-4" />}
        </div>
      ))}
      <Divider className="my-4" />
      <h4>Unlocking Schedules</h4>
      <Form.Item noStyle name="tokenUnlockingSchedules">
        <UnlockingSchedules />
      </Form.Item>
    </>
  )
}
