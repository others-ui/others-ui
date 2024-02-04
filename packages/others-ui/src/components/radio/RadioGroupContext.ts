import { Context, createContext } from '@lit/context'

export interface  RadioGroupContextValue<T = unknown> {
  value?: T
  setValue(value: T): void
}

export const RadioGroupContext = createContext<RadioGroupContextValue>('radio-group-context')
export type RadioGroupContextType<T> = Context<unknown, RadioGroupContextValue<T>>
export const getRadioGroupContext = <T>() => createContext<T>('radio-group-context')
