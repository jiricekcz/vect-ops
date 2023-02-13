export type ArrayLength<T extends any[]> = T['length'];
export type ComposeArray<A extends any[], B extends any[]> = [...A, ...B];
export type Push<T, A extends T[], V extends T> = [...A, V];

export type FixedLengthArray<T, L extends number, P extends T[] = []> = number extends L ? T[] : L extends P["length"] ? P : FixedLengthArray<T, L, Push<T, P, T>>;


export type CanTwoTypesEqual<T1, T2, E, N> =
    T1 extends T2 ? // If T1 is assignable to T2
    T2 extends T1 ? // and T2 is assignable to T1
    E : // Both are asignable to eachother, then they are equal
    E : // one is assignable to the other, but not vice versa - can be equal
    T2 extends T1 ? // If T2 is assignable to T1
    E : // T2 is assignable to T1, but not vice versa - can be equal
    N; // Both are not assignable to eachother - can't be equal
