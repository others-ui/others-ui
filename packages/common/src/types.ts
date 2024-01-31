export type EventAgent<T> = Partial<Record<keyof HTMLElementEventMap, ((this: T, e: any) => boolean) | boolean>>
