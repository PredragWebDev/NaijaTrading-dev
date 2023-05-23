from datetime import datetime

from apps import db


class Data(db.Model):

    __tablename__ = 'data'

    id = db.Column(db.Integer, primary_key=True)

    type = db.Column(db.String(64))
    name = db.Column(db.String(64))
    value = db.Column(db.Integer)
    ts = db.Column(db.DateTime, default=datetime.utcnow())

    def __repr__(self):
        return str(self.id)
