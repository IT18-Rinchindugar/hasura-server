import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { MailTransportType } from '../types/constants';
import { EmailObject, EmailParams } from '../types/email';

dotenv.config();

const { MAIL_SENDER } = process.env;

const mailTransport = (type: MailTransportType) => {
  switch (type) {
    case 'MAILDEV':
      return {
        host: 'maildev',
        port: 25,
        ignoreTLS: true,
      };
    default:
      return {
        host: 'localhost',
        port: 25,
        ignoreTLS: true,
      };
  }
};

const sendEmail = (emailObject: EmailObject) => {
  let from = `"Firebase Function" <${MAIL_SENDER}>`;

  if (emailObject.from) {
    from = emailObject.from;
  }

  const { recipient } = emailObject;

  const transport = mailTransport('MAILDEV');
  const transporter = nodemailer.createTransport(transport);

  const params: EmailParams = {
    from: from,
    to: recipient,
    subject: emailObject.subject,
    text: emailObject.bodyText,
    html: emailObject.bodyHTML,
  };

  if (Object.prototype.hasOwnProperty.call(emailObject, 'ccAddress')) {
    params.cc = emailObject.ccAddress && [emailObject.ccAddress];
  }

  transporter.sendMail(params, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log('Email sent! Message ID', data.MessageId);
    }
  });
};

// const sendRawEmail = async (emailObject) => {

// }

export { sendEmail };
