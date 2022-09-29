import { Observable } from 'rxjs';

export class Omit extends Observable<never> {}

export interface Operation<T, R> {
  (value: T, index: number, data: any[], actionIndex: number): R;
}

export class Action<T, R> {
  constructor(public exec: Operation<T, Observable<R>>) {}
}

export type ObservableTuple<T> = {
  [K in keyof T]: Observable<T[K]>;
};

