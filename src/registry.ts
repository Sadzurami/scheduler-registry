import { AddIntervalOptions } from './types/add-interval.options.type';
import { AddTimeoutOptions } from './types/add-timeout.options.type';

export class SchedulerRegistry {
  private readonly timeouts: Map<string, NodeJS.Timeout> = new Map();
  private readonly intervals: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Add a timeout to the registry.
   *
   * @param name Name of timeout.
   * @param timeout Timeout instance.
   * @param options Additional options.
   *
   * @throws Error if timeout with the same name already exists and `options.override` is `false`.
   */
  public addTimeout(name: string, timeout: NodeJS.Timeout, options?: AddTimeoutOptions) {
    options = { override: false, ...options };

    if (this.hasTimeout(name)) {
      if (options.override) this.clearTimeout(name);
      else throw new Error(`Timeout with name '${name}' already exists`);
    }

    this.timeouts.set(name, timeout);
  }

  /**
   * Add an interval to the registry.
   *
   * @param name Name of interval.
   * @param interval Interval instance.
   * @param options Additional options.
   *
   * @throws Error if interval with the same name already exists and `options.override` is `false`.
   */
  public addInterval(name: string, interval: NodeJS.Timeout, options?: AddIntervalOptions) {
    options = { override: false, ...options };

    if (this.hasInterval(name)) {
      if (options.override) this.clearInterval(name);
      else throw new Error(`Interval with name '${name}' already exists`);
    }

    this.intervals.set(name, interval);
  }

  /**
   * Get a timeout by name.
   *
   * @param name Name of timeout.
   * @returns Timeout instance.
   *
   * @throws Error if timeout with the given name does not exist.
   */
  public getTimeout(name: string) {
    const timeout = this.timeouts.get(name);

    if (typeof timeout === 'undefined') {
      throw new Error(`Timeout for '${name}' not found`);
    }

    return timeout;
  }

  /**
   * Get an interval by name.
   *
   * @param name Name of interval.
   * @returns Interval instance.
   *
   * @throws Error if interval with the given name does not exist.
   */
  public getInterval(name: string) {
    const interval = this.intervals.get(name);

    if (typeof interval === 'undefined') {
      throw new Error(`Interval for '${name}' not found`);
    }

    return interval;
  }

  /**
   * Get all registered timeouts.
   *
   * @returns Timeout instances.
   */
  public getAllTimeouts() {
    return [...this.timeouts.values()];
  }

  /**
   * Get all registered intervals.

   * @returns Interval instances.
   */
  public getAllIntervals() {
    return [...this.intervals.values()];
  }

  /**
   * Get all timeout names.
   *
   * @returns String array of timeout names.
   */
  public getAllTimeoutsNames() {
    return [...this.timeouts.keys()];
  }

  /**
   * Get all interval names.
   *
   * @returns String array of interval names.
   */
  public getAllIntervalsNames() {
    return [...this.intervals.keys()];
  }

  /**
   * Check if a timeout exists.
   *
   * @returns boolean indicating if timeout with the given name exists.
   */
  public hasTimeout(name: string) {
    return this.timeouts.has(name);
  }

  /**
   * Check if an interval exists.
   *
   * @returns boolean indicating if interval with the given name exists.
   */
  public hasInterval(name: string) {
    return this.intervals.has(name);
  }

  /**
   * Clear all registered timeouts and intervals.
   * This is an alias for `clearAll()`.
   */
  public clear() {
    this.clearAll();
  }

  /**
   * Clear all registered timeouts and intervals.
   */
  public clearAll() {
    this.clearAllTimeouts();
    this.clearAllIntervals();
  }

  /**
   * Clear a specific timeout.
   *
   * @param name Name of timeout.
   */
  public clearTimeout(name: string) {
    const timeout = this.getTimeout(name);

    clearTimeout(timeout);
    this.timeouts.delete(name);
  }

  /**
   * Clear a specific interval.
   *
   * @param name Name of interval.
   */
  public clearInterval(name: string) {
    const interval = this.getInterval(name);

    clearInterval(interval);
    this.intervals.delete(name);
  }

  /**
   * Clear all registered timeouts.
   */
  public clearAllTimeouts() {
    const names = this.getAllTimeoutsNames();
    for (const name of names) this.clearTimeout(name);
  }

  /**
   * Clear all registered intervals.
   */
  public clearAllIntervals() {
    const names = this.getAllIntervalsNames();
    for (const name of names) this.clearInterval(name);
  }
}
