import datetime
from apps.simulator import blueprint
import re
import time
from apps import db
from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
import investpy as inv
import pandas as pd
from apps.authentication.models import Users
from apps.simulator.models import Portfolio, PortfolioChart, Game_Users, Game_PortfolioChart, Game_Portfolio
from flask_login import (
    current_user
)
from flask_cors import CORS
from flask import jsonify

import requests
import cryptocompare
import json

CORS(blueprint)


stockprice, stockprice24Hago, stockImageURL,companyNames = {},{}, {}, {} 
returnVal = {}
data = pd.read_csv("Crypto_info.csv")
stocks = data['Ticker']
stocksName = data['Name']
symbol_list, symbolsName = [], []



def stockPriceUpdate():

    symbol_list.clear()
    symbolsName.clear()
    api_key = '63ca8e86d9768225a7ce0bf118db6096698b410a9ec0624688f8c986f3de502d'

    index = 0
    for symbol in stocks:
        symbol_list.insert(index, symbol)
        index += 1
    index = 0
    for name in stocksName:
        symbolsName.insert(index, name)
        index += 1
            
    symbol_str = ','.join(symbol_list)
    
    url = f'https://min-api.cryptocompare.com/data/pricemultifull?fsyms={symbol_str}&tsyms=USD&api_key={api_key}'    

    try:
        # Send GET request to API endpoint
        response = requests.get(url)

        # Raise exception for status codes other than 200
        response.raise_for_status()

        # Get JSON data from response
        data = response.json()
         
        for symbol in symbol_list:
            stockprice[symbol] = data["RAW"][symbol]["USD"]["PRICE"]
            stockprice24Hago[symbol] = data["RAW"][symbol]["USD"]['OPENDAY']
            stockImageURL[symbol] = data["RAW"][symbol]["USD"]['IMAGEURL']
        # Return prices as JSON object

    except requests.exceptions.HTTPError as error:
        # Return error message if there is an issue with the API request

        print("data>>>>>>>>>", error)
    

def chartDataUpdate(username, mode):
    # username = str(current_user)
    if mode == "normal":
        user = Users.query.filter_by(username=username).first()
        portfolio = Portfolio.query.filter_by(username=username)
    else:
        user = Game_Users.query.filter_by(username=username).first()
        if user:
            portfolio = Game_Portfolio.query.filter_by(username=username)
        else:
            return

    account_balance = user.cash

    for item in portfolio:
        item.current_price = stockprice[item.symbol]
        account_balance += item.current_price * item.qty
        
    if mode == "normal":
        values = PortfolioChart(
            username=username, account_balance=account_balance, date=datetime.datetime.now())
    else:
        values = Game_PortfolioChart(
            username=username, account_balance=account_balance, date=datetime.datetime.now())

    db.session.add(values)
    db.session.commit()

@blueprint.route('get_coin_price', methods=['GET', 'POST'])
def get_price():
    
    # price before 24 Hs
    stockPriceUpdate()
    
    return {
        "symbol":symbol_list, 
        "symbolName":symbolsName, 
        "imgURL":stockImageURL, 
        "price":stockprice, 
        "priceAgo":stockprice24Hago}

@blueprint.route('/game_user_register', methods=['GET','POST'])
def register():
    # create_account_form = CreateAccountForm(request.form)
    # if 'register' in request.form:

        data = request.json
        username = data['username']
        
        # Check usename exists
        user = Game_Users.query.filter_by(username=username).first()
        if user:
            return {"state":False, "smg":'Username already registered'}

        user = Game_Users(username = username)
        db.session.add(user)
        db.session.commit()

        return {"state":True, "smg":"User created successfully!"}

    # else:
    #     return render_template('accounts/register.html', form=create_account_form)


@blueprint.route('/game_userdata', methods=['GET', 'POST'])
# @login_required
def game_userData():
    
    stockPriceUpdate()
    data = request.json
    
    username = data['username']
    mode = data['mode']
    
    chartDataUpdate(username=username, mode = mode)
    
    users = Game_Users.query.all()
    for user in users:
        portfolio = Game_Portfolio.query.filter_by(username=user.username).all()
        
        if portfolio:
            account_balance = user.cash
            inv_amount = user.invested_amount
            cash = user.cash

            portfolios = []
            for item in portfolio:
                item.current_price = stockprice[item.symbol]
                
                db.session.add(item)
                db.session.commit()
                account_balance += item.current_price * item.qty
                
            user = Game_Users.query.filter_by(username=user.username).first()

            user.account_balance = account_balance
            db.session.add(user)
            db.session.commit()

    users = Game_Users.query.order_by(Game_Users.account_balance.desc()).all()
    userRanking1_5 = []
    userRaining_around_me = []
    
    mylanking = next((i for i, user in enumerate(users) if user.username == username), None)
    
    ranking = 1
    for user in users:
        user.past_ranking = user.cur_ranking
        user.cur_ranking = ranking
        
        newItem = {}
        newItem['username'] = user.username
        newItem['account_value'] = user.account_balance
        if user.past_ranking == 0:
            newItem['ranking'] = 0
        else:
            newItem['ranking'] = user.past_ranking - user.cur_ranking
        if ranking <= 5:
            userRanking1_5.append(newItem)
        
        if ranking - mylanking >= -5 & ranking - mylanking <= 5:
            userRaining_around_me.append(newItem)

        ranking += 1
        db.session.add(user)
        db.session.commit()

    return {
            "userRanking":userRanking1_5, 
            "userRankingAroundMe":userRaining_around_me
            }



@blueprint.route('/portfolio', methods=['GET', 'POST'])
# @login_required
def portfolio():
    
    stockPriceUpdate()
    data = request.json
    
    username = data['username']
    mode = data['mode']
    
    chartDataUpdate(username=username, mode = mode)
    if mode == "normal":
        user = Users.query.filter_by(username=username).first()
        portfolio = Portfolio.query.filter_by(username=username).all()  
    else:
        user = Game_Users.query.filter_by(username=username).first()
        portfolio = Game_Portfolio.query.filter_by(username=username).all()  
        
    account_balance = user.cash
    inv_amount = user.invested_amount
    cash = user.cash

    portfolios = []
    for item in portfolio:
        item.current_price = stockprice[item.symbol]
        
        db.session.add(item)
        db.session.commit()
        account_balance += item.current_price * item.qty
        
    if mode == "normal":
        user = Users.query.filter_by(username=username).first()
    else:
        user = Game_Users.query.filter_by(username=username).first()

    user.account_balance = account_balance
    db.session.add(user)
    db.session.commit()

    inv_profit = account_balance - user.cash - inv_amount
    try:
        percentage = (inv_profit / inv_amount)*100
    except:
        percentage = 0

    chartData = []
    chartDates = []
    if mode == "normal":
        chartByUser = PortfolioChart.query.filter_by(username=username)
    else:
        chartByUser = Game_PortfolioChart.query.filter_by(username=username)
        
    for chart in chartByUser:
        chartData.append(chart.account_balance)
        chartDates.append(chart.date)
    if mode == "normal":
        portfolio = Portfolio.query.filter_by(username=username).all()
    else:
        portfolio = Game_Portfolio.query.filter_by(username=username).all()
    
    for item in portfolio:
        newItem = {}
        newItem["current_price"] = item.current_price;
        newItem["symbol"] = item.symbol;
        newItem["desc"] = item.desc;
        newItem["purchase_price"] = item.purchase_price;
        newItem["qty"] = item.qty;
        newItem["date"] = item.date;
        newItem["username"] = item.username;
        portfolios.append(newItem);

    return {
            "chartData":chartData, 
            "chartDates":chartDates, 
            "account_balance":account_balance, 
            "inv_amount":inv_amount, 
            "profit":inv_profit, 
            "percentage":percentage, 
            "cash":cash, 
            "portfolios": portfolios,
            }

@blueprint.route('/trade', methods=['GET', 'POST'])
def trade():
    stockPriceUpdate()
    data = request.json

    username = data['username']
    mode = data['mode']
    if mode == "normal":
        user = Users.query.filter_by(username=username).first()
    else:
        user = Game_Users.query.filter_by(username=username).first()

    if request.method == 'POST':
        action = data['action']
        qty = float(data['qty'])
        symbol = data['symbol']
        
        if action == 'buy':
            
            if user.cash >= float(qty) * stockprice[symbol]:
                user.cash -= float(qty) * stockprice[symbol]
                user.invested_amount += float(qty) * stockprice[symbol]
                
                db.session.add(user)
                db.session.commit()
                
                if mode =="normal":
                    existingRecord = Portfolio.query.filter_by(
                    symbol=symbol, username=username).first()
                else:
                    existingRecord = Game_Portfolio.query.filter_by(
                    symbol=symbol, username=username).first()    
                
                if existingRecord:
                    existingRecord.qty += qty
                    existingRecord.purchase_price = (
                        existingRecord.purchase_price + stockprice[symbol])/2
                    db.session.add(existingRecord)
                    db.session.commit()

                else:
                    if mode == "normal":
                        portfolio = Portfolio(symbol=symbol, current_price=stockprice[symbol], qty=qty,
                                          username=username, purchase_price=stockprice[symbol])
                    else:
                        portfolio = Game_Portfolio(symbol=symbol, current_price=stockprice[symbol], qty=qty,
                                          username=username, purchase_price=stockprice[symbol])    
                    
                    db.session.add(portfolio)
                    db.session.commit()
                return {"state":True, "cash":user.cash}

            else:
                return {"state":False, "error":"Cash is not enough!"}

        if action == 'sell':
            if mode == "normal":
                portfolio = Portfolio.query.filter_by(
                symbol=symbol, username=username).first()
            else:
                portfolio = Game_Portfolio.query.filter_by(
                symbol=symbol, username=username).first()    
            
            if portfolio:
                if portfolio.qty > qty:
                    user.cash += float(qty) * stockprice[symbol]
                    user.invested_amount -= float(qty) * stockprice[symbol]
                    db.session.add(user)
                    db.session.commit()

                    portfolio.qty -= qty
                    db.session.add(portfolio)
                    db.session.commit()
                elif portfolio.qty == qty:
                    user.cash += float(qty) * stockprice[symbol]
                    user.invested_amount -= float(qty) * stockprice[symbol]
                    db.session.add(user)
                    db.session.commit()

                    db.session.delete(portfolio)
                    db.session.commit()
                else:
                    return {"state":False, "error":"Cash is not enough!"}
            else:
                return {"state":False, "error":"Coin don't exist!"}
            return {"state":True, "cash":user.cash}

@blueprint.route('/scoreboard', methods=['GET', 'POST'])
def scoreboard():
    users = Users.query.order_by(Users.account_balance).all()
    print(users)
    return {"state":True, "users":users}
