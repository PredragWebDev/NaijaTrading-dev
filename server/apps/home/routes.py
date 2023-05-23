from apps.home import blueprint
from flask import redirect, render_template, request, url_for
from flask_login import login_required
from jinja2 import TemplateNotFound
import investpy as inv
import pandas as pd
from datetime import date

ticker = ' '
blank = "yes"
companyDesc, companyName, sector = " ", "  ", " "
sectors, companyInfo = {}, {}
StocklInfo = [[' '], [], [' '], [], [], [],
              [], [], [], [], [], [], [], [], [], []]


@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')


@blueprint.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    global ticker, StocklInfo, companyDesc, blank, companyName, sector
    blank = "yes"
    listData = []
    dates = []
    if request.method == "POST":
        blank = "no"
        data = pd.read_csv("companyInfo.csv")
        for i in range(len(data)):
            sectors[data['Ticker'][i]] = data['Sector'][i]
            companyInfo[data['Ticker'][i]] = data['Description'][i]
        # print(sectors)
        search_input = request.form['searchinput'].split("-")
        ticker = search_input[1].replace(" ", "")
        companyName = search_input[0]
        # print(search_input, ticker)

        search_result = inv.search_quotes(
            text=ticker, products=['stocks'], countries=['Nigeria'], n_results=1)
        data = search_result.retrieve_historical_data(
            from_date='01/01/2014', to_date=str(date.today().strftime('%d/%m/%Y')))
        StocklInfo = search_result.retrieve_information()
        listData = data['Open'].values.tolist()
        dates = data.index.strftime("%Y-%m-%d %H:%M:%S").tolist()
        companyDesc = companyInfo[ticker]
        sector = sectors[ticker]

        # print(type(StocklInfo))
        # print(StocklInfo)

    return render_template('home/dashboard.html', companyName=companyName, companyDesc=companyDesc, segment='dashboard', sector=sector, dates=dates, listData=listData, ticker=ticker, StocklInfo=StocklInfo, blank=blank)


@blueprint.route('/growthchart', methods=['GET', 'POST'])
@login_required
def growthchart():
    chart_ticker = ticker.lower()
    print(ticker)
    return render_template('home/growthchart.html', segment='growthchart', chart_ticker=chart_ticker)


@blueprint.route('/technical', methods=['GET', 'POST'])
@login_required
def technical():
    global ticker, StocklInfo
    if ticker == " ":
        return redirect(url_for('home_blueprint.dashboard'))

    search_result = inv.search_quotes(text=ticker, products=['stocks'],
                                      countries=['Nigeria'], n_results=1)
    technical_indicators = search_result.retrieve_technical_indicators(
        interval="daily").transpose().values.tolist()
    print(technical_indicators)
    if request.method == "POST":
        search_input = request.form['searchinput'].split("-")
        ticker = search_input[1].replace(" ", "")
        # print(search_input, ticker)
        StocklInfo = search_result.retrieve_information()

        return render_template('home/dashboard.html', segment='dashboard', ticker=ticker, StocklInfo=StocklInfo)

    return render_template('home/technical-analysis.html', segment='technical', companyName=companyName, sector=sector, ticker=ticker, StocklInfo=StocklInfo, technical_indicators=technical_indicators)


@blueprint.route('/educational', methods=['GET', 'POST'])
@login_required
def educational():
    chart_ticker = ticker.lower()
    print(ticker)
    return render_template('home/educational.html', segment='educational', chart_ticker=chart_ticker)


@blueprint.route('/privacy')
@login_required
def privacy():

    return render_template('home/privacy.html', segment='privacy')


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
