import { MinusCircleOutlined } from '@ant-design/icons'
import { t } from '@lingui/macro'
import FormattedNumberInput from 'components/inputs/FormattedNumberInput'
import { JuiceInputNumber } from 'components/inputs/JuiceInputNumber'
import { JuiceListbox } from 'components/inputs/JuiceListbox'
import { uniqueId } from 'lodash'
import { FormItemInput } from 'models/formItemInput'
import { DurationUnitsOption } from 'models/time'
import { useMemo } from 'react'

export const UnlockingSchedules: React.FC<
  React.PropsWithChildren<FormItemInput<any[]> & { isEditable?: boolean }>
> = ({ isEditable, value, onChange }) => {
  const discrete = useMemo(() => {
    return value?.filter(item => item.type === 'discrete') ?? []
  }, [value])
  const linear = useMemo(() => {
    return value?.filter(item => item.type === 'linear') ?? []
  }, [value])
  return (
    <>
      <span>Discrete Release</span>
      {discrete.map((discrete, idx) => (
        <div className="mt-2 flex flex-row gap-2" key={`discrete-${idx}`}>
          <div className="flex flex-grow flex-col">
            <span>Release month after TGE</span>
            <JuiceInputNumber
              className="w-full"
              value={discrete.moment ?? 0}
              min={0}
              onChange={e => {
                const val = [...(value ?? [])]
                const idx = val.indexOf(discrete)
                val[idx] = {
                  ...val[idx],
                  moment: e?.valueOf(),
                }
                onChange && onChange(val)
              }}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <span>Release percentage</span>
            <FormattedNumberInput
              value={discrete.percentage}
              onChange={e => {
                const val = [...(value ?? [])]
                const idx = val.indexOf(discrete)
                val[idx] = {
                  ...val[idx],
                  percentage: e,
                }
                onChange && onChange(val)
              }}
              suffix="%"
              min={0}
              max={100}
            />
          </div>
          <MinusCircleOutlined
            className="my-auto cursor-pointer"
            onClick={e => {
              e.stopPropagation()
              const val = [...(value ?? [])]
              val.splice(val.indexOf(discrete), 1)
              onChange && onChange(val)
            }}
          />
        </div>
      ))}
      <div
        className="my-2 flex cursor-pointer font-semibold text-orange-500"
        onClick={() => {
          onChange &&
            onChange([
              ...(value ?? []),
              {
                type: 'discrete',
                moment: undefined,
                percentage: 0,
              },
            ])
        }}
      >
        <span>+ Add Discrete</span>
      </div>

      <span>Linear Release</span>
      {linear.map(linear => (
        <div className="mt-2 flex flex-row gap-2" key={`linear-${uniqueId()}`}>
          <div className="flex flex-grow flex-col">
            <span>Frequency</span>
            <JuiceListbox
              className="min-w-[6.75rem] flex-1"
              options={durationOptions()}
              value={linear.frequency ?? durationOptions()[0]}
              onChange={e => {
                const val = [...(value ?? [])]
                const idx = val.indexOf(linear)
                val[idx] = {
                  ...val[idx],
                  frequency: e,
                }
                onChange && onChange(val)
              }}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <span>Unlocking time</span>
            <FormattedNumberInput
              suffix="month(s)"
              min={1}
              value={linear.unlockingTime}
              onChange={e => {
                const val = [...(value ?? [])]
                const idx = val.indexOf(linear)
                val[idx] = {
                  ...val[idx],
                  unlockingTime: e,
                }
                onChange && onChange(val)
              }}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <span>Total percentage</span>
            <FormattedNumberInput
              value={linear.percentage}
              onChange={e => {
                const val = [...(value ?? [])]
                const idx = val.indexOf(linear)
                val[idx] = {
                  ...val[idx],
                  percentage: e,
                }
                onChange && onChange(val)
              }}
              suffix="%"
              min={0}
              max={100}
            />
          </div>
          <MinusCircleOutlined
            className="my-auto cursor-pointer"
            onClick={e => {
              e.stopPropagation()
              const val = [...(value ?? [])]
              val.splice(val.indexOf(linear), 1)
              onChange && onChange(val)
            }}
          />
        </div>
      ))}
      <div
        className="my-2 flex cursor-pointer font-semibold text-orange-500"
        onClick={() => {
          onChange &&
            onChange([
              ...(value ?? []),
              {
                type: 'linear',
                frequency: durationOptions()[0], // Weekly, Bi-Weekly, Monthly
                unlockingTime: 1,
                percentage: 0,
              },
            ])
        }}
      >
        <span>+ Add Linear</span>
      </div>
      <div className="rounded-md bg-orange-500/10 py-2 px-4">
        {discrete.map(discrete => (
          <div key={`summary-discrete-${uniqueId()}`}>
            {!discrete.moment || discrete.moment === 0 ? (
              <>
                <span className="font-semibold">{discrete.percentage}%</span>{' '}
                token discrete release at{' '}
                <span className="font-semibold">TGE</span>.
              </>
            ) : (
              <>
                <span className="font-semibold">{discrete.moment}</span> month
                cliff,{' '}
                <span className="font-semibold">{discrete.percentage}%</span>{' '}
                released after cliff.
              </>
            )}
          </div>
        ))}
        {linear.map(linear => (
          <div key={`summary-linear-${uniqueId()}`}>
            <span className="font-semibold">{linear.frequency.label}</span>{' '}
            linear unlocking,{' '}
            <span className="font-semibold">{linear.percentage}%</span> release
            over <span className="font-semibold">{linear.unlockingTime}</span>{' '}
            month
            {linear.unlockingTime === 1 ? '' : 's'}.
          </div>
        ))}
      </div>
    </>
  )
}

interface DurationOption {
  label: string
  value: DurationUnitsOption
}

export const durationOptions = (): DurationOption[] => [
  { label: t`Weekly`, value: 'weeks' },
  { label: t`Monthly`, value: 'months' },
]
