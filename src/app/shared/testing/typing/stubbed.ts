import { Spied } from './spied';
import { Writeable } from './writeable';

export type Stubbed<T> = Spied<T> & Writeable<T> & Partial<T>;
