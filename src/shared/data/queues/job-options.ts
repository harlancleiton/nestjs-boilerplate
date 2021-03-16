import { CronRepeatOptions, EveryRepeatOptions } from './repeat-options';

export interface JobOptions {
  priority?: number;

  delay?: number;

  attempts?: number;

  repeat?: CronRepeatOptions | EveryRepeatOptions;

  lifo?: boolean;

  timeout?: number;

  jobId?: string | number;

  removeOnComplete?: boolean | number;

  removeOnFail?: boolean | number;
}
