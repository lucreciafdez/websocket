import React from 'react'
import {Line} from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
import { graficoConf, chartColors, chartDataset } from './css_grafico.js'

class Grafico extends React.Component {

  updateChart = () => {
    let chart = this.refs.chart.chartInstance;

    if(Object.keys(this.props.stocks).length === 0)
    {
      chart.data.datasets = [];
      return chart.update();
    }

    Object.keys(this.props.stocks).map((stock_name, index) =>
    {
      let current_stock = this.props.stocks[stock_name];
      let chart_dataset = chart.data.datasets.find((dataset) => {
        return dataset.label === stock_name.toUpperCase()
      });

      if(current_stock.is_selected)
      {
        let current_stock = this.props.stocks[stock_name];
        if(chart_dataset)
        {
          chart_dataset.data = this.getStockValues(current_stock);
        }
        else
        {
          if(current_stock)
          {
            chart.data.datasets = chart.data.datasets.concat(
              [
                chartDataset(stock_name, chartColors[index], this.getStockValues(current_stock))
              ]
            )
          }
        }
      }
      else
      {
        if(chart_dataset)
        {
          // remove the dataset from graph
          chart.data.datasets.splice(chart.data.datasets.indexOf(chart_dataset), 1);
        }
      }
      chart.update();
    })
  }

  componentDidUpdate = () => {
    this.updateChart();
  }

  getStockValues = (stock) =>{
    return stock.history.map((history) => {
      return {t: new Date(history.time), y: history.value};
    })
  }

  resetZoom = () => {
    this.refs.chart.chartInstance.resetZoom();
  }

  render() {
    return (
      <div className={'card column'} >
        <div className='card-header'>
          <div className='card-header-title'>
            Gráfico Stocks
          </div>
        </div>
        <div className='card-header-texto'>
        <div className='card-header-title-texto'>
        Puede hacer zoom al gráfico y resetearlo con el botón a continuación
        </div>
        <button className="boton-r is-small " onClick={this.resetZoom}>REINICIAR ZOOM</button>

        </div>
        <div className='card-content'>
          <Line
            data={{datasets: []}}
            options={graficoConf}
            ref='chart'
          />
        </div>
      </div>
    );
  }
}

export default Grafico;
