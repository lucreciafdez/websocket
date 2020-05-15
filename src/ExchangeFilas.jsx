import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
//import TimeAgo from 'react-timeago'

class ExchangeFilas extends React.Component {

  render() {
    return (
      <tr >
        <td className='exchange-ticker'>
          {this.props.exchange_data.exchange_ticker}
        </td>

        <td className='name'>
          {this.props.exchange_data.name}
        </td>
        <td className='cantidad'>
          {this.props.exchange_data.cantidad}
        </td>
        <td className='buy'>
          {this.props.exchange_data.buy}
        </td>

        <td className='sell'>
          {this.props.exchange_data.sell}
        </td>

        <td className='volume'>
          {this.props.exchange_data.volume}
        </td>

        <td className='participacion'>
          {this.props.exchange_data.participacion.toFixed(2)}
        </td>
      </tr>
    );
  }
}

export default ExchangeFilas;
