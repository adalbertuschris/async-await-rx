import { concat, forkJoin, Observable, reduce } from 'rxjs';
import { Action, ObservableTuple, Operation } from '../internal/types';
import { filterOmits } from '../internal/utils/filter-omits';

export enum AwaitAllStrategy {
  parallel,
  oneByOne,
}

export function awaitAll<T, R extends readonly unknown[]>(
  project: (
    value: T,
    index: number,
    data: any[],
    actionIndex: number
  ) => [...ObservableTuple<R>],
  strategy?: AwaitAllStrategy
): Action<T, R>;

export function awaitAll(
  project: (
    value: any,
    index: number,
    data: any[],
    actionIndex: number
  ) => Observable<any>[],
  strategy: AwaitAllStrategy = AwaitAllStrategy.parallel
): Action<any, any> {
  if (strategy === AwaitAllStrategy.oneByOne) {
    return new Action(awaitAllOneByOne(project));
  } else {
    return new Action(awaitAllParallel(project));
  }
}

function awaitAllOneByOne<T>(
  project: Operation<T, Observable<any>[]>
): Operation<T, Observable<any[]>> {
  return (value, index, data, actionIndex) => {
    const inputs = project(value, index, data, actionIndex);

    return concat(...filterOmits(inputs)).pipe(reduce((acc, val) => acc.concat(val), []));
  };
}

function awaitAllParallel<T>(
  project: Operation<T, Observable<any>[]>
): Operation<T, Observable<any[]>> {
  return (value, index, data, actionIndex) => {
    const inputs = project(value, index, data, actionIndex);

    return forkJoin(filterOmits(inputs));
  };
}
