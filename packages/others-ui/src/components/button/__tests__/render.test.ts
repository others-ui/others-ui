import { expect, fixture, html } from '@open-wc/testing'
import { Button } from '../../../..'

Button.register()

describe('test button', () => {
  it('should render', async () => {
    const el = await fixture<Button>(html`<ot-button disabled>按钮</ot-button>`)
    expect(el).dom.to.equalSnapshot()
    expect(el.innerHTML).to.contain('按钮')
  })
})
