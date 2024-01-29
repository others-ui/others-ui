import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import { sleep } from '../../../utils/test'
import { Switch } from '../../../..'

Switch.register()

describe('test switch', () => {

  let el: Switch

  beforeEach(async () => {
    el = await fixture<Switch>(html`<ot-switch />`)
  })

  it('should reactive', async () => {
    const listener = oneEvent(el, 'change')
    el.value = true
    await sleep()
    el.shadowRoot?.querySelector('label')?.click()
    const events = (await listener) as CustomEvent<boolean>
    expect(events.detail).to.be.false
    el.value = false
    await sleep()
    el.value = true
    await sleep()
    expect(el.shadowRoot?.querySelector('input')?.checked).to.be.true
  })
})
