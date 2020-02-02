export interface Writeable<T> {
  setProperty<P extends keyof T>(propertyNames: P, value: T[P]): void;
}
