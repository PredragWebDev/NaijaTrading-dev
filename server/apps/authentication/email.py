from flask_mailman import EmailMessage
from apps.config import Config

from flask import current_app


def send_email(subject, body, send_to):

    try:

        msg = EmailMessage(
            subject,
            body,
            Config.MAIL_USERNAME,
            [send_to]
        )
        msg.content_subtype = "html"
        msg.send()

        return True

    except:
        current_app.logger.info(
            'ERR - Cannot send email, please check MAIL settings')
        current_app.logger.info('    -> MAIL Subject: ' + subject)
        current_app.logger.info('    -> MAIL Body: ' + body)
        return False
