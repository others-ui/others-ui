import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import * as sinon from 'sinon'
import { Button } from '../../../../'

Button.register()

describe('Test Button', () => {
  it('should render', async () => {
    const el = await fixture<Button>(html`<ot-button disabled>按钮</ot-button>`)
    expect(el).dom.to.equalSnapshot()
    expect(el.innerHTML).to.contain('按钮')
  })

  it('should has event', async () => {
    const el = await fixture<Button>(html`<ot-button type="primary">按钮</ot-button>`)
    const listener = oneEvent(el, 'click')
    el.click()
    const { detail } = await listener
    console.log('detail', detail)
    expect(detail).to.equal(0)
  })

  it('should not has event', async () => {
    const fn = sinon.stub()
    const el = await fixture<Button>(html`<ot-button disabled>按钮</ot-button>`)
    el.addEventListener('click', fn)
    el.click()
    expect(fn).not.to.have.callCount(1)
  })
})
