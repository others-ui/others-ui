import { LitElement, css, html, unsafeCSS } from 'lit'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { ContextConsumer } from '@lit-labs/context'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles.scss'
import { prefix } from '../../common'
import { FormContext, FormContextValue } from '../../context/FormContext'


export interface InputProps {
 name?: string
 value?: string
}

@customElement(`${prefix}-input`)
export class Input extends LitElement implements InputProps {

  form = new ContextConsumer(this, { context: FormContext, callback: (value) => this.onFormChange(value), subscribe: true })  
  inputRef: Ref<HTMLInputElement> = createRef<HTMLInputElement>()

  @property({type: String}) name?: string
  @property({type: String}) value?: string

  constructor() {
    super()
  }

  onFormChange(value: FormContextValue) {
    console.log('onFormChange', value)
    if (this.inputRef.value && this.name) {
      this.inputRef.value.value = (value.initValues[this.name] || '')  as string
    }
  }

  connectedCallback() {
    super.connectedCallback()
  }

  onChange(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value
    if (this.name) {
      this.form.value?.setValue(this.name, value)
    }
    this.dispatchEvent(new CustomEvent('change', { detail: event.detail }))
  }

  onInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value
    if (this.name) {
      this.form.value?.setValue(this.name, value)
    }
    this.dispatchEvent(new CustomEvent('input', { detail: event.detail }))
  }
  

  protected firstUpdated(): void {
    this.name && this.form.value?.init(this.name, this.value)
    this.inputRef.value!.value = this.value || ''
  }

  static styles = css`${unsafeCSS(styles)}`
  render() {  
    return html`
     <input 
      ${ref(this.inputRef)}
      @change=${(e: InputEvent) => this.onChange(e)}
      @input=${(e: InputEvent) => this.onInput(e)}
    />
    `
  }
}