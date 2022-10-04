Extension for rxjs library

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Methods](#methods)
* [Operators](#operators)

## Installation

First you need to install the npm module:

```sh
npm install async-await-rx --save
```

In plain rxjs we have a lot of operators and we can do the same actions in different ways.
Often we do repeatable actions such as fetching data parallely, one by one etc. and every time we have to build it with many operators. This extension can simplify code by introducing only few operators for repeatable actions. Thanks to this extension code is more clear and we can focus on action to do, not which operator we should choose.

This extension can be useful when: 
- you need data from each actions,
- you want to call actions parallely or one by one and you want to wait on result - awaitAll
- you want to define dynamic actions - asyncPipeFrom


## Usage

Comparizon with plain rxjs

code with async pipe extension

```ts
asyncPipe(
  awaitAction(() => action1()),
  awaitAll(() => [action2_1(), action2_2(), action2_3(), action2_4()]),
  awaitAction(() => action3()),
  action((value, index, [_, items]) =>
    console.log({ value, items /* data[1] */ }) // { 'action3', ['action2_1', 'action2_2', 'action2_3', 'action2_4']}
  ),
  awaitAction((value) => action4(value))
)
  .pipe(
    takeUntil(cancel$),
    finalize(() => (isLoading = false))
  )
  // Async pipe return value from last action and data from each action. It is array.
  // we can use destructurization for example: [value, [action1Val, action2Val, action3Val]]
  // first item is value from last action and the second is data from all actions
  .subscribe(([value, [val1, val2, val3]]) => {
    console.log(val1); // Display value from 1st action
    console.log(val2); // Display items from 2nd action
    console.log(val3); // Display items from 3rd action
  });
```

code without extension (in plain rxjs)

```ts
action1()
  .pipe(
    switchMap((data) =>
      combineLatest([action2_1(), action2_2(), action2_3(), action2_4()]).pipe(
        map((items) => [data, items])
      )
    ),
    switchMap((data) => action3().pipe(map((value) => [...data, value]))),
    tap(([_, items, value]) => console.log({ value, items })),
    switchMap((data) =>
      action4(data[2]).pipe(map((value) => [...data, value]))
    ),
    takeUntil(cancel$),
    finalize(() => (isLoading = false))
  )
  .subscribe(([val1, val2, val3]) => {
    console.log(val1); // Display value from 1st action
    console.log(val2); // Display items from 2nd action
    console.log(val3); // Display items from 3rd action
  });
```

## Methods
* asyncPipe

It takes list of operators as params and return Observable.
asyncPipe return array where first item is value from last action and the second is data from all actions.
It is array to handle data in easier way (we can use destructurization for example: [value, [action1Val, action2Val, action3Val]])

Example

```ts
asyncPipe(
  awaitAction(() => action1()),
  awaitAction(() => action2()),
  awaitAction(() => action3())
)
  .pipe(
    finalize(() => (console.log('finalize')))
  )
  .subscribe(([value, [val1, val2, val3]]) => {
    console.log(val1); // action1
  });
```

* asyncPipeFrom (factory)

It takes list of functions as params (it convert each function to awaitAction) and return Observable

Example 1

```ts
    const something = 5;
    const actions: any[] = [() => action1()];

    if (something === 1) {
      actions.push((value: string) => action2(value));
    } else {
      actions.push((value: string) => action3(value));
    }

    asyncPipeFrom(actions).subscribe(([_, data]) => { console.log(data) }); // [action1, action3]
```

Example 2

```ts
asyncPipe(
  awaitAction(() => asyncPipeFrom(actions)),
  awaitAction(() => action2())
)
  .pipe(
    finalize(() => (console.log('finalize')))
  )
  .subscribe(([value, [val1, val2]]) => {
    console.log(val1);
  });
```

* omit

It takes Observable and condition as inputs. Condition determine that observable should be subscribed or should be omited.
When we will use omit in awaitAction and condition is met then action will be omitted (it won't be put in the asyncPipe result)

Example 

```ts
const something = 5;

asyncPipe(
    awaitAll(() => [
        omit(action1(), something == 5), // this action will be omitted, because condition is met
        action2(),
    ]),
    awaitAction(() => omit(action3(), something == 5)), // this action will be omitted, because condition is met
    action((value) => console.log(value)), // [action2]
    awaitAction(() => action4())
).subscribe(([_, data]) => console.log(data)); // [[action2], action4]
```

### Operators
Each operator takes project method as input with structure
(value, index, data) => type
value - value from previous action
index - value index
data - array with values from each action
type - returned type

* action - (value, index, data) => void
This acton has no impact on asyncPipe result. Used to perform side-effects.

* awaitAction - (value, index, data) => Observable<any>
Action will be completed when observable have fulfilled.

* awaitAll - (value, index, data) => Observable<any>[], strategy: AwaitAllStrategy
Action will be completed when all of the observables have fulfilled. 
It breaks immediately upon any of the observables throwing an error.

As second param it determine execution strategy: 
AwaitAllStrategy:
 * parallel (default) - actions are processing parallel
 * oneByOne - actions are processing one by one