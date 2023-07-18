import { SettingOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/macro'
import { Form } from 'antd'
import { useWatch } from 'antd/lib/form/Form'
import { CREATE_FLOW } from 'constants/fathomEvents'
import { trackFathomGoal } from 'lib/fathom'
import { useContext, useEffect } from 'react'
import { useSetCreateFurthestPageReached } from 'redux/hooks/useEditingCreateFurthestPageReached'
import { CreateBadge } from '../../CreateBadge'
import { Icons } from '../../Icons'
import { Selection } from '../../Selection'
import { Wizard } from '../../Wizard'
import { PageContext } from '../../Wizard/contexts/PageContext'
import { CustomTokenSettings, DefaultSettings } from './components'
import { useProjectTokensForm } from './hooks/useProjectTokenForm'

export const ProjectTokenPage: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  useSetCreateFurthestPageReached('projectToken')
  const { goToNextPage, lockPageProgress, unlockPageProgress } =
    useContext(PageContext)
  const { form, initialValues } = useProjectTokensForm()

  const selection = useWatch('selection', form)
  const isNextEnabled = !!selection

  // A bit of a workaround to soft lock the page when the user edits data.
  useEffect(() => {
    if (!selection) {
      lockPageProgress?.()
      return
    }
    if (selection === 'custom') {
      try {
        form.validateFields().catch(e => {
          lockPageProgress?.()
          throw e
        })
      } catch (e) {
        return
      }
    }
    unlockPageProgress?.()
  }, [form, lockPageProgress, selection, unlockPageProgress])

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="projectToken"
      colon={false}
      layout="vertical"
      onFinish={() => {
        goToNextPage?.()
        trackFathomGoal(CREATE_FLOW.TOKEN_NEXT_CTA)
      }}
      scrollToFirstError
    >
      <div className="flex flex-col gap-6">
        <Form.Item noStyle name="selection">
          <Selection className="w-full" defocusOnSelect>
            <Selection.Card
              name="custom"
              title={
                <div className="flex items-center gap-3">
                  <Trans>Token Unlock provided by EthSign</Trans>{' '}
                  <CreateBadge.Default />
                </div>
              }
              icon={<SettingOutlined />}
              description={
                <Trans>
                  Preset rules provided by EthSign. Project creators are able to
                  create a token unlocking schedule for each funding round.
                </Trans>
              }
            >
              <CustomTokenSettings />
            </Selection.Card>
            <Selection.Card
              name="default"
              title={
                <div className="flex items-center gap-3">
                  <Trans>Basic Token Rules</Trans>
                </div>
              }
              icon={<Icons.Tokens fill="#EF6820" />}
              description={
                <Trans>
                  Simple token rules that will work for most projects. You can
                  edit these rules in future cycles.
                </Trans>
              }
            >
              <DefaultSettings />
            </Selection.Card>
          </Selection>
        </Form.Item>
      </div>
      <Wizard.Page.ButtonControl isNextEnabled={isNextEnabled} />
    </Form>
  )
}
