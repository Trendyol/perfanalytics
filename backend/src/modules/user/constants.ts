import config from '@config';

export const mailinator = {
  sender: config.email.address,
  password: config.email.password,
  host: 'smtp.gmail.com',
  subject: {
    en: 'Password help is arrived!',
    tr: 'Şifre yardımı geldi!',
  },
  port: 587,
  secure: false,
  mail: {
    header: {
      tr: 'Şifre Sıfırlama Maili',
      en: 'Forget Password Email',
    },
    name: {
      tr: 'Sevgili',
      en: 'Dear',
    },
    paragraphPart1: {
      tr: 'Şifre sıfırlama talebinde bulundunuz.',
      en: 'You requested for a password reset, kindly use this',
    },
    paragraphPart2: {
      tr: 'Linke',
      en: 'link',
    },
    paragraphPart3: {
      tr: 'tıklayarak şifrenizi sıfırlayabilirsiniz.',
      en: 'to reset your password.',
    },
    footer: {
      tr: 'Hoşçakalın!',
      en: 'Cheers!',
    },
  },
};

export const defaultLanguage = 'en';
