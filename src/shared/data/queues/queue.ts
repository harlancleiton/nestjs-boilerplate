import { Job } from './job';
import { JobOptions } from './job-options';

export interface Queue<T = any> {
  name: string;

  add(data: T, opts?: JobOptions): Promise<Job<T>>;
  add(name: string, data: T, opts?: JobOptions): Promise<Job<T>>;

  addBulk(
    jobs: Array<{ name?: string; data: T; opts?: JobOptions }>
  ): Promise<Array<Job<T>>>;
}
