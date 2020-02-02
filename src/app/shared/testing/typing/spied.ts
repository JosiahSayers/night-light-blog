import { Observer } from 'rxjs';

export type AugmentedSpy = jasmine.Spy & { observer?: Observer<any>, observers?: Observer<any>[] };

export type Spied<T> = {
  [Method in keyof T]: AugmentedSpy;
};
