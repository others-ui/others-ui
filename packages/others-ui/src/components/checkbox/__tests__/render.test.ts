import { expect, fixture, html } from '@open-wc/testing'
import { Checkbox, CheckboxGroup } from '../../../../'

Checkbox.register()
CheckboxGroup.register()

describe('render checkbox', () => {
  it('should render', async () => {
    const el = await fixture<Checkbox<string>>(html`<ot-checkbox>checkbox</ot-checkbox>`)
    expect(el).dom.to.equalSnapshot()
    expect(el.innerHTML).to.contain('checkbox')
  })
})
