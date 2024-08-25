# scheduler-registry

> Scheduler registry for my projects

## Install

```sh
yarn add https://github.com/Sadzurami/scheduler-registry --dev
```

## Usage

`main.ts`

```ts
import { SchedulerRegistry } from '@sadzurami/scheduler-registry';

const registry = new SchedulerRegistry();

const timeout = setTimeout(() => {}, 1000);
registry.addTimeout('timeout-name', timeout);
```
