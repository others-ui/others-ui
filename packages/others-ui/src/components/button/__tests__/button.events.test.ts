import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import * as sinon from 'sinon'
import { Button } from '../../../..'

Button.register()

describe('test button', () => {
  it('should has event', async () => {
    const el = await fixture<Button>(html`<ot-button type="primary">按钮</ot-button>`)
    const listener = oneEvent(el, 'click')
    el.click()
    const { detail } = await listener
    expect(detail).to.equal(0)
  })

  it('should called', async () => {
    const fn = sinon.stub()
    const el = await fixture<Button>(html`<ot-button type="primary">按钮</ot-button>`)
    el.addEventListener('click', fn)
    el.onclick = fn
    el.click()
    expect(fn).to.be.callCount(2)
  })

  it('should not has event(addEventListener)', async () => {
    const fn = sinon.stub()
    const el = await fixture<Button>(html`<ot-button disabled>按钮</ot-button>`)
    el.addEventListener('click', fn)
    el.click()
    expect(fn).not.to.have.called
  })

  it('should not has event(onclick)', async () => {
    const fn = sinon.stub()
    const el = await fixture<Button>(html`<ot-button disabled>按钮</ot-button>`)
    el.onclick = fn
    el.click()
    expect(fn).not.to.have.called
  })
})
