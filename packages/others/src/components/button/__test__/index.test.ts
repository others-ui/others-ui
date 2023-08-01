import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import Button from '../button'

describe('Test Button', () => {
  it('should render', async () => {
    const el = await fixture(html`<my-button>按钮</my-button>`) as Button
    expect(el).dom.to.equalSnapshot()
    expect(el.innerHTML).to.contain('按钮')
  })

  it('should has event', async () => {
    const el = await fixture(html`<my-button>按钮</my-button>`) as Button
    const listener = oneEvent(el, 'click')
    el.click()
    const { detail } = await listener
    console.log('detail', detail)
    expect(detail).to.equal(0)
  })
})