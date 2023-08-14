declare module 'really-relaxed-json' {
  export function toJson(rjsonString: string, compact?: boolean): string;
}

declare module 'sort-by' {
  export function sortBy<T>(...args: string[]): T;
}
