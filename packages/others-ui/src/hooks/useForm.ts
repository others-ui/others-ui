import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit'
import { ContextConsumer, Context} from '@lit-labs/context'
import { FormContext, FormContextValue } from '../context/FormContext'

export interface CommomProps {
  name?: string
  value?: undefined
}

export class FormController implements ReactiveController {

  formContext: ContextConsumer<Context<'form-context', FormContextValue>, ReactiveElement>
  constructor(
    public host: ReactiveControllerHost & CommomProps, 
  ) { 
    this.host.addController(this)
    this.formContext = new ContextConsumer(host as ReactiveElement, { context: FormContext })    
  }
  hostConnected() {
    if (this.host.name) {
      console.log('formContext', this.formContext.value)
      
      this.formContext.value?.init(this.host.name, this.host.value)
    }
  }

  hostUpdate() {
    
  }

  setValue(name?: string, value?: string) {
    if (name) {
      this.formContext.value?.setValue(name, value)
    }
  }
}

export const useForm = (host: ReactiveControllerHost) => {
  return new FormController(host)
}