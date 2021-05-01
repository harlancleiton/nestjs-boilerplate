export type event = symbol | string;
export type eventNS = string | event[];

export interface Event {
  emit(event: event | eventNS, ...values: any[]): boolean;

  emitAsync(event: event | eventNS, ...values: any[]): Promise<any[]>;
}
