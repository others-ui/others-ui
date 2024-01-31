import { LitElement } from '@others-ui/common'
import { consume } from '@others-ui/common'
import { property } from '@others-ui/common'
import { FormItemContextValue, getFormItemContext } from '../context/FormItemContext'
import { Constructor } from '../types'

abstract class FormItemMixinClassImpl<T>  {
  public formItemContext?: FormItemContextValue<T>
  formItemValue?: T
}


export function FormItemMixin<T extends typeof LitElement, C>(SuperClass: T): Constructor<FormItemMixinClassImpl<C>> & T {
  // @ts-ignore
  class FormItemMixinClass extends SuperClass {
    @consume({context: getFormItemContext<C>(), subscribe: true})
    @property({attribute: false})
    public formItemContext?: FormItemContextValue<C>

    public get formItemValue(): C {
      return this.formItemContext?.value as C
    }

    public set formItemValue(value: C) {
      this.formItemContext?.setValue(value)
    }
  }

  return FormItemMixinClass
}




