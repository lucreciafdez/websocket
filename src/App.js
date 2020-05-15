import React, { Component } from 'react';
import './App.css';
import Pagina from './Pagina.jsx'

class App extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    hasError: false,
    showSpinner: true
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }

  handleClick() {
  this.setState(state => ({
    isToggleOn: !state.isToggleOn
    }));
  }

  render() {

    if(this.state.isToggleOn){
    return (
      <div style={{ textAlign: "center"}}>

      <div className="App">
      <div className='card-header-bienv'>
        <div className='card-header-title-bienv'>
          Bienvenido a Stocks y Exchange
        </div>
      </div>
      <button className="boton" onClick={this.handleClick} >
          {this.state.isToggleOn ? 'DESCONECTAR' : 'CONECTAR'}
        </button>
        <Pagina hideSpinner={this.hideSpinner} showSpinner={this.state.showSpinner} />
      </div>
      </div>

    );
  }else{
      return (
          <div style={{ textAlign: "center"}}>
          <p>Debe conectarse al socket</p>

          <button className="boton" onClick={this.handleClick} >
            {this.state.isToggleOn ? 'DESCONECTAR' : 'CONECTAR'}
          </button>
        </div>);
    }

  }
}

export default App;
