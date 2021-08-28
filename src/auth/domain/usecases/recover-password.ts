export interface RecoverPassword {
  execute(email: string): Promise<void>;
}
