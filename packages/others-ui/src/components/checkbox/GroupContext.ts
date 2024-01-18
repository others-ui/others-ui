import { Context, createContext } from '@lit/context'

export interface  CheckboxGroupContextValue<T = unknown> {
  value?: T[]
  setValue(value: T[]): void
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>('checkbox-group-context')
export type CheckboxGroupContextType<T> = Context<unknown, CheckboxGroupContextValue<T>>
export const getCheckboxGroupContext = <T>() => createContext<T>('checkbox-group-context')
