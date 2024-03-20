import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import { Switch } from '../../../..'

Switch.register()

describe('test switch', () => {
  let el: Switch

  beforeEach(async () => {
    el = await fixture<Switch>(html`<ot-switch />`)
  })

  it('should active', async () => {
    const listener = oneEvent(el, 'change')
    el.shadowRoot?.querySelector('label')?.click()
    const events = (await listener) as CustomEvent<boolean>
    expect(events.detail).to.be.true
  })
})
