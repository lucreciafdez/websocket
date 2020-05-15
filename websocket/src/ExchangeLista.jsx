import React from 'react'
import { Detector } from "react-detect-offline";
import ExchangeFilas from './ExchangeFilas.jsx'

const ExchangeLista = (props) => {
  return (
    <div className='card column' id='exchange_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Exchanges
          &nbsp;
          &nbsp;
        </div>
      </div>
      <div className='card-header-texto'>
      <div className='card-header-title-texto'>
      A continuacion se muestran los exchanges, mostrando los valores totales hasta el momento.
      </div>
      </div>

      <div className='card-content'>
        { props.areStocksLoaded_exchange() ? <p className='is-size-7'></p> : null }
        <table className='table is-bordered'>
          <thead>
            <tr>
            <th>Exchange Tiker</th>
            <th>Nombre</th>
            <th>Cantidad de Acciones</th>
            <th>Volumen de Compra</th>
            <th>Volumen de Venta</th>
            <th>Volumen Total</th>
            <th>Participacion de Mercado</th>


            </tr>
          </thead>
          <tbody>
            {Object.keys(props.exchanges).map((exchange_name, index) =>
              {
                let current_exchange = props.exchanges[exchange_name];
                return (
                  <ExchangeFilas
                    key={index} exchange_name={exchange_name}
                    exchange_data={current_exchange}
                    toggleStockSelection_exchange={props.toggleStockSelection_exchange}
                  />
                )
              }
            )}
            { props.areStocksLoaded_exchange() ? null : <tr><td colSpan='4'>No se han cargado exchanges</td></tr> }
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default ExchangeLista;
