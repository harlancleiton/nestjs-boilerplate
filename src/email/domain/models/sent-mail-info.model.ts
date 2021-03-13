export interface SentMailInfoModel {
  accepted?: string[];
  rejected?: string[];
  envelopeTime?: number;
  messageTime?: number;
  messageSize?: number;
  response?: string;
  envelope?: { from?: string; to?: string[] };
  messageId?: string;
}
