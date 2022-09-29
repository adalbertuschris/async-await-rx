import { Observable } from 'rxjs';
import { asyncPipeInternal } from '../internal/async-pipe-internal';
import { Action } from '../internal/types';

export function asyncPipe<A>(a1: Action<unknown, A>): Observable<[A, [A]]>;
export function asyncPipe<A, B>(
  a1: Action<unknown, A>,
  a2: Action<A, B>
): Observable<[B, [A, B]]>;
export function asyncPipe<A, B, C>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>
): Observable<[C, [A, B, C]]>;
export function asyncPipe<A, B, C, D>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>
): Observable<[D, [A, B, C, D]]>;
export function asyncPipe<A, B, C, D, E>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>
): Observable<[E, [A, B, C, D, E]]>;
export function asyncPipe<A, B, C, D, E, F>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>
): Observable<[F, [A, B, C, D, E, F]]>;
export function asyncPipe<A, B, C, D, E, F, G>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>
): Observable<[G, [A, B, C, D, E, F, G]]>;
export function asyncPipe<A, B, C, D, E, F, G, H>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>,
  a8: Action<G, H>
): Observable<[H, [A, B, C, D, E, F, G, H]]>;
export function asyncPipe<A, B, C, D, E, F, G, H, I>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>,
  a8: Action<G, H>,
  a9: Action<H, I>
): Observable<[I, [A, B, C, D, E, F, G, H, I]]>;
export function asyncPipe<A, B, C, D, E, F, G, H, I, J>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>,
  a8: Action<G, H>,
  a9: Action<H, I>,
  a10: Action<I, J>
): Observable<[J, [A, B, C, D, E, F, G, H, I, J]]>;
export function asyncPipe<A, B, C, D, E, F, G, H, I, J, K>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>,
  a8: Action<G, H>,
  a9: Action<H, I>,
  a10: Action<I, J>,
  a11: Action<J, K>,
): Observable<[K, [A, B, C, D, E, F, G, H, I, J, K]]>;
export function asyncPipe<A, B, C, D, E, F, G, H, I, J, K>(
  a1: Action<unknown, A>,
  a2: Action<A, B>,
  a3: Action<B, C>,
  a4: Action<C, D>,
  a5: Action<D, E>,
  a6: Action<E, F>,
  a7: Action<F, G>,
  a8: Action<G, H>,
  a9: Action<H, I>,
  a10: Action<I, J>,
  a11: Action<J, K>,
  ...actions: Action<any, any>[]
): Observable<[any, any]>;

export function asyncPipe(
  ...actions: Action<any, any>[]
): Observable<[any, any[]]> {
  return asyncPipeInternal(actions);
}
