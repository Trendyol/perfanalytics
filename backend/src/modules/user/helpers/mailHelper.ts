import { mailinator, defaultLanguage } from '../constants';

export const renderMailContent = (name, url, language = defaultLanguage) => {
  return `<!DOCTYPE html>
		<html>
		<head>
				<title>${mailinator.mail.name[language]}</title>
		</head>
		<body>
				<div>
						<h3>${mailinator.mail.header[language]} ${name},</h3>
						<p>${mailinator.mail.paragraphPart1[language]} <a href=${url}>${mailinator.mail.paragraphPart2[language]}</a> ${mailinator.mail.paragraphPart3[language]}</p>
						<br>
						<p>${mailinator.mail.footer[language]}</p>
				</div>
		</body>
		</html>`;
};
