from datetime import date

from apps import db


class Portfolio(db.Model):

    __tablename__ = 'portfolio'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(64))
    desc = db.Column(db.String(64))
    current_price = db.Column(db.Float)  # we're using prev close
    purchase_price = db.Column(db.Float)
    qty = db.Column(db.Integer)
    date = db.Column(db.Date, default=date.today())
    username = db.Column(db.String(64))

    def __repr__(self):
        return str(self.symbol)

class Game_Portfolio(db.Model):
    
    __tablename__ = 'game_portfolio'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(64))
    desc = db.Column(db.String(64))
    current_price = db.Column(db.Float)  # we're using prev close
    purchase_price = db.Column(db.Float)
    qty = db.Column(db.Integer)
    date = db.Column(db.Date, default=date.today())
    username = db.Column(db.String(64))

    def __repr__(self):
        return str(self.symbol)


class PortfolioChart(db.Model):

    __tablename__ = 'portfoliochart'

    id = db.Column(db.Integer, primary_key=True)
    account_balance = db.Column(db.Float)  # we'll use prev close
    date = db.Column(db.Date, default=date.today())
    username = db.Column(db.String(64))

    def __repr__(self):
        return str(self.symbol)
    
class Game_PortfolioChart(db.Model):

    __tablename__ = 'game_portfoliochart'

    id = db.Column(db.Integer, primary_key=True)
    account_balance = db.Column(db.Float)  # we'll use prev close
    date = db.Column(db.Date, default=date.today())
    username = db.Column(db.String(64))

    def __repr__(self):
        return str(self.symbol)

class Game_Users(db.Model):

    __tablename__ = 'game_users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    account_balance = db.Column(db.Float, default=100000)
    cash = db.Column(db.Float, default=100000)
    invested_amount = db.Column(db.Float, default=0)
    past_ranking = db.Column(db.Integer, default=0)
    cur_ranking = db.Column(db.Integer, default=0)

    def __repr__(self):
        return str(self.username)