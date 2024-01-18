import { createContext } from '@lit/context'


export interface FormItemContextValue<T = unknown> {
  value: T
  setValue(value: T): void
}

export const FormItemContext = createContext<FormItemContextValue>('form-item-context')

export function getFormItemContext<T = unknown>() {
  return createContext<FormItemContextValue<T>>('form-item-context')
}
