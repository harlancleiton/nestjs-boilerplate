import { JobOptions } from './job-options';
import { Queue } from './queue';

export interface Job<T = any> {
  id: string | number;

  data: T;

  opts: JobOptions;

  processedOn?: number;

  finishedOn?: number;

  queue: Queue<T>;

  timestamp: number;

  name: string;

  update(data: T): Promise<void>;

  remove(): Promise<void>;

  retry(): Promise<void>;

  discard(): Promise<void>;

  finished(): Promise<any>;
}
