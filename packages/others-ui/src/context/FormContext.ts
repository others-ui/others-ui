import { createContext } from '@lit-labs/context'

export interface FormContextValue {
  reset(): void
  submit(): void
  setName(name: string, oldName: string): void
  setValue(name: string, value: unknown): void
  init(name: string, initValue: unknown): void
  initValues: Record<string, unknown>
}

export const FormContext = createContext<FormContextValue, 'form-context'>('form-context')
