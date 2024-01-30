
export type Constructor<T> = new (...ages: any[]) => T
export type EventAgent<T> = Partial<Record<keyof HTMLElementEventMap, ((this: T, e: any) => boolean) | boolean>>
