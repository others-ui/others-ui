export type EventAgent<T> = Partial<Record<string, ((this: T, e: any) => boolean) | boolean>>
