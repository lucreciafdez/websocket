import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import TimeAgo from 'react-timeago'

class StockFilas extends React.Component {

  getStockValueColor = (stock) =>{
    if(stock.current_value < stock.history.slice(-2)[0].value){
      return 'red';
    }
    else if(stock.current_value > stock.history.slice(-2)[0].value){
      return 'green';
    }
    else{
      return null;
    }
  }

  render() {
    let history = this.props.stock_data.history;
    return (
      <tr className={ this.props.stock_data.is_selected ? 'selected' : null } id={this.props.stock_name} onClick={this.props.toggleStockSelection.bind(this, this.props.stock_name)} >
        <td>{this.props.stock_name.toUpperCase()}</td>
        <td className='name'>
          {this.props.stock_data.company_name}
        </td>
        <td className='country'>
          {this.props.stock_data.country}
        </td>
        <td className={this.getStockValueColor(this.props.stock_data)}>
          {this.props.stock_data.current_value.toFixed(2)}
        </td>
        <td className='porcentaje'>
          {this.props.stock_data.porcentaje.toFixed(2)}
        </td>
        <td className='maximo'>
          {this.props.stock_data.maximo.toFixed(2)}
        </td>
        <td className='minimo'>
          {this.props.stock_data.minimo.toFixed(2)}
        </td>
        <td className='volume'>
          {this.props.stock_data.volume}
        </td>
      </tr>
    );
  }
}

export default StockFilas;
