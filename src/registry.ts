import { AddIntervalOptions } from './types/add-interval.options.type';
import { AddTimeoutOptions } from './types/add-timeout.options.type';

export class SchedulerRegistry {
  private readonly timeouts: Map<string, NodeJS.Timeout> = new Map();
  private readonly intervals: Map<string, NodeJS.Timeout> = new Map();

  public addTimeout(name: string, timeout: NodeJS.Timeout, options?: AddTimeoutOptions) {
    options = { overwrite: false, ...options };

    if (this.hasTimeout(name)) {
      if (options.overwrite) this.clearTimeout(name);
      else throw new Error(`Timeout with name '${name}' already exists`);
    }

    this.timeouts.set(name, timeout);
  }

  public addInterval(name: string, interval: NodeJS.Timeout, options?: AddIntervalOptions) {
    options = { overwrite: false, ...options };

    if (this.hasInterval(name)) {
      if (options.overwrite) this.clearInterval(name);
      else throw new Error(`Interval with name '${name}' already exists`);
    }

    this.intervals.set(name, interval);
  }

  public getTimeout(name: string) {
    const timeout = this.timeouts.get(name);

    if (typeof timeout === 'undefined') {
      throw new Error(`Timeout for '${name}' not found`);
    }

    return timeout;
  }

  public getInterval(name: string) {
    const interval = this.intervals.get(name);

    if (typeof interval === 'undefined') {
      throw new Error(`Interval for '${name}' not found`);
    }

    return interval;
  }

  public getTimeouts() {
    return [...this.timeouts.values()];
  }

  public getIntervals() {
    return [...this.intervals.values()];
  }

  public getTimeoutsNames() {
    return [...this.timeouts.keys()];
  }

  public getIntervalsNames() {
    return [...this.intervals.keys()];
  }

  public hasTimeout(name: string) {
    return this.timeouts.has(name);
  }

  public hasInterval(name: string) {
    return this.intervals.has(name);
  }

  public clearAll() {
    this.clearTimeouts();
    this.clearIntervals();
  }

  public clearTimeout(name: string) {
    const timeout = this.getTimeout(name);

    clearTimeout(timeout);
    this.timeouts.delete(name);
  }

  public clearInterval(name: string) {
    const interval = this.getInterval(name);

    clearInterval(interval);
    this.intervals.delete(name);
  }

  public clearTimeouts() {
    const names = this.getTimeoutsNames();
    for (const name of names) this.clearTimeout(name);
  }

  public clearIntervals() {
    const names = this.getIntervalsNames();
    for (const name of names) this.clearInterval(name);
  }
}
