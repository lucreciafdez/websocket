import React from 'react'
import { Detector } from "react-detect-offline";
import StockFilas from './StockFilas.jsx'

const StockLista = (props) => {
  return (
    <div className='card column' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Stocks
          &nbsp;
          &nbsp;
        </div>
      </div>
      <div className='card-header-texto'>
      <div className='card-header-title-texto'>
      A continuacion se muestran los stocks en el mercado, seleccione uno en la tabla para desplegarlo en el gráfico.
      </div>
      </div>
      <div className='card-content'>
        { props.areStocksLoaded() ? <p className='is-size-7'></p> : null }
        <table style={{ position: "relative", margin: "auto",width: "50vw" }} className='table is-bordered'>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Nombre Empresa</th>
              <th>Pais Origen</th>

              <th>
                Ultimo precio
              </th>
              <th>Variacion Porcentual</th>
              <th>Alto Historico</th>
              <th>Bajo Historico</th>
              <th>Volumen Total Transado</th>


            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>
              {
                let current_stock = props.stocks[stock_name];
                return (
                  <StockFilas
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    toggleStockSelection={props.toggleStockSelection}
                  />
                )
              }
            )}
            { props.areStocksLoaded() ? null : <tr><td colSpan='4'>No se han cargado stocks</td></tr> }
          </tbody>
        </table>
       </div>
    </div>

  );
}

export default StockLista;
