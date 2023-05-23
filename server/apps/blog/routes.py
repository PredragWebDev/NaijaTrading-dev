from apps.blog import blueprint
from flask import render_template, request
from flask_login import login_required


@blueprint.route('/naira')
@login_required
def naira():

    return render_template('blog/naira.html', segment="naira")


@blueprint.route('/eca')
@login_required
def eca():

    return render_template('blog/eca.html', segment="eca")


@blueprint.route('/dangote')
@login_required
def dangote():

    return render_template('blog/dangote.html', segment="dangote")


@blueprint.route('/investing_in_ngn_stocks')
@login_required
def investing_in_ngn_stocks():

    return render_template('blog/investing_in_nigerian_stocks.html', segment="ngn_stocks")


@blueprint.route('/monetary-fiscal')
@login_required
def monetary_fiscal():

    return render_template('blog/monetary_fiscal.html', segment="fiscal")


@blueprint.route('/smart-investments')
@login_required
def smart_investments():

    return render_template('blog/making_smart_investments.html', segment="smart_investments")


@blueprint.route('/six_sigma_in_small_business')
@login_required
def six_sigma_in_small_business():

    return render_template('blog/sigma_in_small_business.html', segment="six_sigma")


@blueprint.route('/market_always_right')
@login_required
def market_always_right():

    return render_template('blog/market_always_right.html', segment="market")


@blueprint.route('/deadly_sins')
@login_required
def deadly_sins():

    return render_template('blog/deadly_sins_of_trading.html', segment="deadly_sins")


@blueprint.route('/nigerian_nps')
@login_required
def nigerian_nps():

    return render_template('blog/nigerian_pension_system.html', segment="nps")
