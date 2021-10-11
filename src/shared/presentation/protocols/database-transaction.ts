export interface DatabaseTransaction {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  closeTransaction(): Promise<void>;
}
