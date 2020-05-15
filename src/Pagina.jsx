import React from 'react'
import * as bulma from "reactbulma";
import StockLista from "./StockLista.jsx";
import ExchangeLista from "./ExchangeLista.jsx";
import Grafico from "./Grafico.jsx";
import socketIOClient from "socket.io-client/dist/socket.io";

const stocksUrl = 'wss://le-18262636.bitzonte.com';

class Pagina extends React.Component {

  state = {
   stocks: {},
   def_stocks: {},
   exchanges: {},
   market_trend: undefined,
   connectionError: false,
   response: false,
   response2:false,
   response3:false
  }

  componentDidMount = () => {
    const socket = socketIOClient(stocksUrl, {path: "/stocks"});
    socket.emit("EXCHANGES", (data) => {});
    socket.on("EXCHANGES", (data) => {
      this.exchange(data);
    });
    socket.on("UPDATE", data => this.setState({ response: data }));
    socket.on("UPDATE", this.saveNewStockValues);
    socket.on("BUY", data => this.setState({ response2: data }));
    socket.on("BUY", this.buyStocks);
    socket.on("SELL", data => this.setState({ response3: data }));
    socket.on("SELL", this.sellStocks);
    socket.emit("STOCKS", (data) => {});
    socket.on("STOCKS", (data) => {
      this.stocksTotal(data);
    });
  }

  exchange = (data) => {
    //console.log(data)
    for (const key of Object.keys(data)){

      //console.log(data[key].name)
      if(this.state.exchanges[key]){
      this.state.exchanges[key].exchange_ticker = data[key].exchange_ticker
      this.state.exchanges[key].name = data[key].name
      this.state.exchanges[key].listed_companies = data[key].listed_companies
      this.state.exchanges[key].cantidad = Object(data[key].listed_companies).length
    }else{
      this.state.exchanges[key] = {name: data[key].name, exchange_ticker:
        data[key].exchange_ticker, listed_companies: data[key].listed_companies,
        cantidad: Object(data[key].listed_companies).length, buy: 0, volume: 0,
        sell: 0, participacion: 0}
    }
  }
    this.setState({exchanges: this.state.exchanges})
  }


  stocksTotal = (data) =>{
    for (const nombre of Object(data)){
      this.state.def_stocks[nombre.ticker] = {company_name:nombre.company_name, country: nombre.country}
  }
  this.setState({def_stocks: this.state.def_stocks})
  }

  sellStocks = (event) => {
    this.props.hideSpinner();
    const { response3 } = this.state;
    let result = this.state.response3;
    let new_stocks = this.state.stocks
    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].volume += result.volume
      new_stocks[result.ticker].sell += result.volume
      this.setState({stocks: new_stocks})
    }

    var total = 0;
    for (const llave of Object.keys(this.state.exchanges)){
      total += this.state.exchanges[llave].volume
    }

    for (const key_s of Object.keys(this.state.def_stocks)){
      for (const key_e of Object.keys(this.state.exchanges)){
        for (const nombre of Object(this.state.exchanges[key_e].listed_companies))
      if(this.state.def_stocks[key_s].company_name == nombre){
        this.state.exchanges[key_e].sell += result.volume
        this.state.exchanges[key_e].volume += result.volume
        this.state.exchanges[key_e].participacion = this.state.exchanges[key_e].volume/ total
      }}
    }

    this.setState({exchanges: this.state.exchanges})
  }

  buyStocks = (event) => {
    this.props.hideSpinner();
    const { response2 } = this.state;
    let result = this.state.response2;
    let new_stocks = this.state.stocks
    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].volume += result.volume
      new_stocks[result.ticker].buy += result.volume
      this.setState({stocks: new_stocks})
    }

    var total = 0;
    for (const llave of Object.keys(this.state.exchanges)){
      total += this.state.exchanges[llave].volume
    }

    for (const key_s of Object.keys(this.state.def_stocks)){
      for (const key_e of Object.keys(this.state.exchanges)){
        for (const nombre of Object(this.state.exchanges[key_e].listed_companies))
      if(this.state.def_stocks[key_s].company_name == nombre){
        this.state.exchanges[key_e].buy += result.volume
        this.state.exchanges[key_e].volume += result.volume
        this.state.exchanges[key_e].participacion = this.state.exchanges[key_e].volume/ total

      }}
    }
    this.setState({exchanges: this.state.exchanges})
  }

  saveNewStockValues = (event) => {
    this.props.hideSpinner();
    const { response } = this.state;
    let result = this.state.response;
    let [up_values_count, down_values_count] = [0, 0];
    let new_stocks = this.state.stocks

    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].current_value > Number(result.value) ? up_values_count++ : down_values_count++;
      new_stocks[result.ticker].porcentaje = ((Number(result.value) - new_stocks[result.ticker].current_value) / new_stocks[result.ticker].current_value ) * 100
      new_stocks[result.ticker].current_value = Number(result.value)
      if (new_stocks[result.ticker].maximo < Number(result.value) ){
        new_stocks[result.ticker].maximo = Number(result.value)
      }
      if (new_stocks[result.ticker].minimo > Number(result.value) ){
        new_stocks[result.ticker].minimo = Number(result.value)
      }
      new_stocks[result.ticker].history.push({time: result.time, value: Number(result.value)})
    }
    else
    {
      new_stocks[result.ticker] = {ticker: result.ticker, current_value: result.value,
        history: [{time: result.time, value: Number(result.value)}],
        porcentaje: ((Number(result.value) - result.current_value) /
        result.current_value ) * 100,  maximo: result.value,
        minimo: result.value, volume:0, sell: 0, buy:0, company_name:'', country: '' ,is_selected: false }
    }
    for (var key of Object.keys(this.state.def_stocks)){
      if(key = result.ticker){
        new_stocks[result.ticker].company_name = this.state.def_stocks[key].company_name
        new_stocks[result.ticker].country = this.state.def_stocks[key].country
      }
    }
    this.setState({stocks: new_stocks, market_trend: this.newMarketTrend(up_values_count, down_values_count)})
  }

  newMarketTrend = (up_count, down_count) => {
    if(up_count === down_count) return undefined;
    return up_count > down_count ? 'up' : 'down'
  }

  toggleStockSelection = (stock_name) => {
    let new_stocks = this.state.stocks;
    new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected
    this.setState({ stocks: new_stocks })
  }

  resetData = () => {
    let new_stocks = this.state.stocks;
    Object.keys(this.state.stocks).map((stock_name, index) =>
    {
      new_stocks[stock_name].history = [new_stocks[stock_name].history.pop()];
    });
    this.setState({ stocks: new_stocks });
  }

  areStocksLoaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  }

  toggleStockSelection_exchange = (exchange_name) => {
    let new_exchanges = this.state.exchanges;
    new_exchanges[exchange_name].is_selected = !new_exchanges[exchange_name].is_selected
    this.setState({ exchanges: new_exchanges })
  }

  resetData_exchange = () => {
    let new_exchanges = this.state.exchanges;
    this.setState({ exchanges: new_exchanges });
  }

  areStocksLoaded_exchange = () => {
    return Object.keys(this.state.exchanges).length > 0;
  }

  render() {
    return (
      <div className='container'>
        <div className='rows'>
        <div className='columns'>
          <StockLista
            stocks={this.state.stocks}
            toggleStockSelection={this.toggleStockSelection}
            resetData={this.resetData}
            market_trend={this.state.market_trend}
            areStocksLoaded={this.areStocksLoaded}
          />
        <Grafico stocks={this.state.stocks} />
        </div>

        <ExchangeLista
          exchanges={this.state.exchanges}
          toggleStockSelection_exchange={this.toggleStockSelection_exchange}
          resetData_exchange={this.resetData_exchange}
          areStocksLoaded_exchange={this.areStocksLoaded_exchange}
        />
        </div>


        <div className={ this.props.showSpinner ? 'modal is-active' : 'modal' }>
          <div className="modal-background"></div>
        </div>
      </div>
    );
  }
}

export default Pagina;
