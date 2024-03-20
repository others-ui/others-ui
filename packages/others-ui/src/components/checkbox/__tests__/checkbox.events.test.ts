import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import { Checkbox } from '../../../..'

Checkbox.register()

describe('test checkbox events', () => {
  let el: Checkbox

  beforeEach(async () => {
    el = await fixture<Checkbox>(html` <ot-checkbox>checkbox</ot-checkbox> `)
  })

  it('should reactive', async () => {
    const listener = oneEvent(el, 'change')
    el.shadowRoot?.querySelector('label')?.click()
    const event = (await listener) as CustomEvent
    expect(event.detail).to.be.true

    const listener2 = oneEvent(el, 'change')
    el.shadowRoot?.querySelector('label')?.click()
    const event2 = (await listener2) as CustomEvent
    expect(event2.detail).to.be.false
  })
})
