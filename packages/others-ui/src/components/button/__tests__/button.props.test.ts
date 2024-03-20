import { expect, fixture, html } from '@open-wc/testing'
import { sleep } from '../../../utils/test'
import { Button } from '../../../..'

Button.register()

describe('test button props', () => {
  let el: Button

  beforeEach(async () => {
    el = await fixture<Button>(html`<ot-button>按钮</ot-button>`)
  })

  it('should reactive loading', async () => {
    expect(el.shadowRoot?.querySelector('svg')).to.be.null
    el.loading = true
    await sleep()
    expect(el.shadowRoot?.querySelector('svg')).not.to.be.null
  })

  it('should reactive block', async () => {
    let styles = getComputedStyle(el)
    expect(styles.display).to.equal('inline-block')
    el.block = true
    await sleep()
    styles = getComputedStyle(el)
    expect(styles.display).to.equal('block')
  })
})
