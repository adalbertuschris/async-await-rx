import { Observable } from 'rxjs';
import { asyncPipeInternal } from '../internal/async-pipe-internal';
import { awaitAction } from '../operators/await-action';

export function asyncPipeFrom(
  actionFactories: ((
    value: any,
    index: number,
    data: any[],
    actionIndex: number
  ) => Observable<any>)[]
): Observable<[any, any[]]> {
  const actions = actionFactories.map((fn) => awaitAction(fn));

  return asyncPipeInternal(actions);
}
