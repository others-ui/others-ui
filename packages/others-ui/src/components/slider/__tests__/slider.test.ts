import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import { Slider } from '../../../..'

Slider.register()

describe('Slider', () => {
  it('snapshot', async () => {
    const el = await fixture<Slider>(html` <ot-slider value="50"></ot-slider> `)
    expect(el).dom.to.equalSnapshot()
  })

  it('test value change', async () => {
    const el = await fixture<Slider>(html` <ot-slider value="50"></ot-slider> `)
    const listener = oneEvent(el, 'change')
    el.value = 60
    const { detail } = await listener
    expect(detail.value).to.equal(60)
  })

  // todo: fix this test, mock click / mousedown event to trigger afterChange
  it.skip('test afterChange', async () => {
    const el = await fixture<Slider>(html` <ot-slider value="50"></ot-slider> `)
    const listener = oneEvent(el, 'afterChange')
    el.value = 60
    const { detail } = await listener
    expect(detail.value).to.equal(60)
  })

  it('test max and min value', async () => {
    const el = await fixture<Slider>(html` <ot-slider value="50" max="60" min="0"></ot-slider> `)
    const listener = oneEvent(el, 'change')
    el.value = 70
    const { detail } = await listener
    expect(detail.value).to.equal(60)
  })
})
