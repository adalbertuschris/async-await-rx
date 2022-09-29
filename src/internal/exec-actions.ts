import { Subscriber } from 'rxjs';
import { Action } from './types';

export function execActions<R>(
  subscriber: Subscriber<R>,
  actions: Action<any, any>[]
) {
  const queue: Action<any, any>[] = [...actions];
  const data: any[] = [];
  let actionIndex = 0;

  const execAction = <AT, AR>(action: Action<AT, AR>) => {
    const prevActionValueIndex = (
      data.length > 0 ? data.length - 1 : undefined
    ) as number;
    const prevActionValue: AT =
      prevActionValueIndex != null ? data[prevActionValueIndex] : undefined;

    action
      .exec(prevActionValue, prevActionValueIndex, data, actionIndex++)
      .subscribe(
        new ActionSubscriber(
          subscriber,
          (value: AR) => data.push(value),
          () => {
            if (queue.length) {
              const nextAction = queue.shift()!;

              execAction(nextAction);
            } else {
              subscriber.next([data && data[data.length - 1], data] as any);
              subscriber.complete();
            }
          }
        )
      );
  };

  execAction(queue.shift()!);

  return () => {};
}

// To change for rxjs v8
export class ActionSubscriber<T> extends Subscriber<T> {
  constructor(
    destination: Subscriber<any>,
    private onNext: (value: T) => void,
    private onFinalize: () => void
  ) {
    super(destination);
  }

  protected override _next(value: T): void {
    try {
        this.onNext(value);
        this.complete();
      } catch (err) {
        this.destination.error(err);
      }
  }

  protected override _complete(): void {
    try {
        const { closed } = this;
        this.unsubscribe();
        !closed && this.onFinalize();
      } catch (err) {
        this.destination.error(err);
      }
  }
}
