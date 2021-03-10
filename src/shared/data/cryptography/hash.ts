export interface Hash {
  make(plaintext: string): Promise<string>;

  compare(plaintext: string, hash: string): Promise<boolean>;
}
