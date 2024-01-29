import { expect, fixture, html } from '@open-wc/testing'
import { Checkbox } from '../../../..'
import { sleep } from '../../../utils/test'

Checkbox.register()

describe('test checkbox props', () => {

  let el: Checkbox

  beforeEach(async () => {
    el = await fixture<Checkbox>(html`
      <ot-checkbox>checkbox</ot-checkbox>
    `)
  })


  it('should reactive', async () => {
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement
    expect(input.checked).to.be.false

    el.checked = true
    await sleep()
    expect(input.checked).to.be.true

    el.checked = false
    await sleep()
    expect(input.checked).to.be.false
  })
})


