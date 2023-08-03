import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import * as sinon from 'sinon'
import type Button from '../index'
import '../../../../dist/others.esm'

describe('Test Button', () => {
  it('should render', async () => {
    const el = await fixture(html`<ot-button ?disabled=${true}>按钮</ot-button>`) as Button
    expect(el).dom.to.equalSnapshot()
    expect(el.innerHTML).to.contain('按钮')
  })

  it('should has event', async () => {
    const el = await fixture(html`<ot-button type="primary">按钮</ot-button>`) as Button
    const listener = oneEvent(el, 'click')
    ;(el.shadowRoot?.querySelector('button') as HTMLElement).click()
    const { detail } = await listener
    console.log('detail', detail)
    expect(detail).to.equal(0)
  })

  it('should not has event', async () => {
    const fn = sinon.stub()
    const el = await fixture(html`<ot-button disabled>按钮</ot-button>`) as Button
    el.addEventListener('click', fn)
    ;(el.shadowRoot?.querySelector('button') as HTMLElement).click()
    expect(fn).not.to.have.callCount(1)
  })
})