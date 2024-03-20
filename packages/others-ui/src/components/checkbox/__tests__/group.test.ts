import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import { Checkbox, CheckboxGroup } from '../../../..'
import { sleep } from '../../../utils/test'

Checkbox.register()
CheckboxGroup.register()

describe('render checkbox', () => {
  it('should reactive', async () => {
    const el = await fixture<CheckboxGroup<string>>(html`
      <ot-checkbox-group>
        <ot-checkbox value="1">做运动</ot-checkbox>
        <ot-checkbox value="2">看书</ot-checkbox>
        <ot-checkbox value="3">吃饭</ot-checkbox>
        <ot-checkbox value="4">睡觉</ot-checkbox>
      </ot-checkbox-group>
    `)

    const c1 = el.querySelector<Checkbox<string>>('ot-checkbox[value="1"]')
    const c3 = el.querySelector<Checkbox<string>>('ot-checkbox[value="3"]')

    c1?.shadowRoot?.querySelector('label')?.click()
    const listener = oneEvent(el, 'change')
    c3?.shadowRoot?.querySelector('label')?.click()

    const { detail } = await listener
    expect(detail).to.deep.equal(['1', '3'])
  })

  it('should reactive async', async () => {
    const el = await fixture<CheckboxGroup<string>>(html`
      <ot-checkbox-group>
        <ot-checkbox value="1">做运动</ot-checkbox>
        <ot-checkbox value="2">看书</ot-checkbox>
        <ot-checkbox value="3">吃饭</ot-checkbox>
        <ot-checkbox value="4">睡觉</ot-checkbox>
      </ot-checkbox-group>
    `)

    const c2 = el.querySelector<Checkbox<string>>('ot-checkbox[value="2"]')
    const c4 = el.querySelector<Checkbox<string>>('ot-checkbox[value="4"]')

    c2?.shadowRoot?.querySelector('label')?.click()
    // todo is not good!!!
    await sleep()
    const listener = oneEvent(el, 'change')
    c4?.shadowRoot?.querySelector('label')?.click()

    const { detail } = await listener
    expect(detail).to.deep.equal(['2', '4'])
  })
})
