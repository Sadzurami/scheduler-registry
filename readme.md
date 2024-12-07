# scheduler-registry

> Simple registry for timeouts and intervals.

Allows to keep timeouts and intervals in one place and manage them.

Like [@nestjs/schedule](https://github.com/nestjs/schedule), but without the additional boilerplate of NestJS.

## Install

```sh
npm install @sadzurami/scheduler-registry
```

## Usage

```ts
import { SchedulerRegistry } from '@sadzurami/scheduler-registry';

const registry = new SchedulerRegistry();

// Add a timeout
const timeout = setTimeout(() => console.log('Timeout triggered'), 1000);
registry.addTimeout('timeout-1', timeout);

// Add an interval
const interval = setInterval(() => console.log('Interval triggered'), 1000);
registry.addInterval('interval-1', interval);

// Check existences
console.log(registry.hasTimeout('timeout-1')); // true
console.log(registry.hasInterval('interval-1')); // true

// Clear all
setTimeout(() => registry.clearAll(), 5000);
```

## API

### instance

#### `.addTimeout(name: string, timeout: NodeJS.Timeout, options?: AddTimeoutOptions): void`

Add a timeout to the registry.

- `name` (string) - Name of timeout.
- `timeout` (NodeJS.Timeout) - Timeout instance.
- `options.override` (boolean) - Clear and override timeout with the same name.

#### `.addInterval(name: string, interval: NodeJS.Timeout, options?: AddIntervalOptions): void`

Add an interval to the registry.

- `name` (string) - Name of interval.
- `interval` (NodeJS.Timeout) - Interval instance.
- `options.override` (boolean) - Clear and override interval with the same name.

#### `.getTimeout(name: string): NodeJS.Timeout`

Get a timeout by name.

- `name` (string) - Name of timeout.

#### `.getInterval(name: string): NodeJS.Timeout`

Get an interval by name.

- `name` (string) - Name of interval.

#### `.getTimeouts(): NodeJS.Timeout[]`

Get all registered timeouts.

#### `.getIntervals(): NodeJS.Timeout[]`

Get all registered intervals.

#### `.getTimeoutNames(): string[]`

Get all timeout names.

#### `.getIntervalNames(): string[]`

Get all interval names.

#### `.hasTimeout(name: string): boolean`

Check if a timeout exists.

- `name` (string) - Name of timeout.

#### `.hasInterval(name: string): boolean`

Check if an interval exists.

- `name` (string) - Name of interval.

#### `.clearAll(): void`

Clear all registered timeouts and intervals.

#### `.clearTimeout(name: string): void`

Clear a specific timeout.

- `name` (string) - Name of timeout.

#### `.clearInterval(name: string): void`

Clear a specific interval.

- `name` (string) - Name of interval.

#### `.clearTimeouts(): void`

Clear all registered timeouts.

#### `.clearIntervals(): void`

Clear all registered intervals.

## Related

- [@nestjs/schedule](https://github.com/nestjs/schedule) - Schedule module for Nest based on the cron package.
