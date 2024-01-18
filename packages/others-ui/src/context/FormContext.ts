import { createContext } from '@lit/context'


export interface FormContextValue<T extends Record<string, unknown> = Record<string, unknown>> {
  initialValues?: T
  values: T
  setValue(name: string, value: unknown): void
}

export const FormContext = createContext<FormContextValue>('form-context')
