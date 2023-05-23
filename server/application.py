from apps.simulator.routes import stockPriceUpdate, chartDataUpdate
from flask_apscheduler import APScheduler

from flask_migrate import Migrate
from sys import exit
from decouple import config

import csv
from sqlalchemy.orm.mapper import configure_mappers

from apps.home.models import Data
from apps.config import config_dict
from apps import create_app, db


# WARNING: Don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

# The configuration
get_config_mode = 'Debug' if DEBUG else 'Production'

try:

    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production] ')

app = create_app(app_config)
Migrate(app, db)
scheduler = APScheduler()

if DEBUG:
    app.logger.info('DEBUG       = ' + str(DEBUG))
    app.logger.info('Environment = ' + get_config_mode)
    app.logger.info('DBMS        = ' + app_config.SQLALCHEMY_DATABASE_URI)


@app.cli.command("reset_datatables")
def reset_datatables():
    """
       Reset and Init database with new sample
       from 'media/transactions_data.csv' file in 'Data' model.
    """

    db.drop_all()
    configure_mappers()
    db.create_all()

    with open('media/transactions_data.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        for row in csvreader:
            _data = Data(type=row[2], name=row[0], value=row[1])
            db.session.add(_data)

        db.session.commit()


if __name__ == "__main__":
    scheduler.add_job(id='update stock price', func=stockPriceUpdate,
                      trigger="interval", seconds=10)
    # scheduler.add_job(id='update chart data', func=chartDataUpdate,
    #                   trigger="interval", seconds=60)
    scheduler.start()
    app.run()
