import { Observable } from 'rxjs';
import { Action } from '../internal/types';

export function awaitAction<T, R>(
  project: (value: T, index: number, data: any[], actionIndex: number) => Observable<R>
): Action<T, R> {
  return new Action(project);
}
