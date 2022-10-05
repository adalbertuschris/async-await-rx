import { Action } from '../internal/types';
import { OMIT } from '../observables/omit';

export function action<T>(
  project: (value: T, index: number, data: any[], actionIndex: number) => void
): Action<T, T> {
  return new Action((value, index, data, actionIndex) => {
    try {
      project(value, index, data, actionIndex);
    } finally {
      return OMIT;
    }
  });
}
