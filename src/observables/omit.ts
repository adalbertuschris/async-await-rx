import { Observable } from 'rxjs';
import { Omit } from '../internal/types';

export const OMIT = new Omit((subscriber) => subscriber.complete());

export function omit<T>(action: Observable<T>, condition: boolean): Observable<T> | Omit {
  return (condition ? OMIT : action) as Observable<T>;
}
