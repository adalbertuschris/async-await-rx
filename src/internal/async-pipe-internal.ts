import { EMPTY, Observable } from 'rxjs';
import { execActions } from './exec-actions';
import { Action } from './types';

export function asyncPipeInternal(actions: Action<any, any>[]): Observable<[any, any[]]> {
  if (!actions?.length) {
    return EMPTY;
  }

  return new Observable<any>((subscriber) => execActions(subscriber, actions));
}
