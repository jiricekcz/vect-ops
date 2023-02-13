export type ArrayLength<T extends any[]> = T['length'];
export type ComposeArray<A extends any[], B extends any[]> = [...A, ...B];
export type Push<T, A extends T[], V extends T> = [...A, V];

export type FixedLengthArray<T, L extends number, P extends T[] = []> = number extends L ? T[] : L extends P["length"] ? P : FixedLengthArray<T, L, Push<T, P, T>>;
