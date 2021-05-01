export interface Encrypter {
  encrypt(plaintext: string): string;

  decrypt(encrypted: string): string;
}
