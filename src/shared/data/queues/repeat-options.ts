export interface RepeatOptions {
  tz?: string;

  endDate?: Date | string | number;

  limit?: number;
}

export interface CronRepeatOptions extends RepeatOptions {
  cron: string;

  startDate?: Date | string | number;
}

export interface EveryRepeatOptions extends RepeatOptions {
  every: number;
}
