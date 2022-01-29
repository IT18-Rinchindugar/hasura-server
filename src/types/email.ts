export type EmailObject = {
  from?: string;
  recipient: string;
  subject: string;
  bodyText: string;
  bodyHTML?: string;
  attachments?: string;
  ccAddress?: string[];
};

export type EmailParams = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  cc?: string[];
};
