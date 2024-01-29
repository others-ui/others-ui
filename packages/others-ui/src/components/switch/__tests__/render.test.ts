import { expect, fixture, html } from '@open-wc/testing'
import { Switch } from '../../../..'

Switch.register()

describe('test switch', () => {
  it('should render', async () => {
    const el = await fixture<Switch>(html`<ot-switch />`)
    expect(el).dom.to.equalSnapshot()
  })
})
