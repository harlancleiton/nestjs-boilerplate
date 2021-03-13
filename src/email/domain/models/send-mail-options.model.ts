export interface Address {
  name: string;
  address: string;
}

export interface AttachmentLikeObject {
  path: string;
}

export interface SendMailOptionsModel {
  to?: string | Address | Array<string | Address>;
  cc?: string | Address | Array<string | Address>;
  bcc?: string | Address | Array<string | Address>;
  replyTo?: string | Address;
  inReplyTo?: string | Address;
  from?: string | Address;
  subject?: string;
  text?: string | Buffer | AttachmentLikeObject;
  html?: string | Buffer;
  sender?: string | Address;
  raw?: string | Buffer;
  context?: {
    [name: string]: any;
  };
  template?: string;
  attachments?: {
    filename: string;
    content?: any;
    path?: string;
    contentType?: string;
    cid?: string;
  }[];
}
