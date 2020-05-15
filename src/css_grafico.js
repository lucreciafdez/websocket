export const graficoConf = {
  responsive: true,
  scales: {
    xAxes: [{
      type: 'time',
      distribution: 'linear',
      ticks: {
        source: 'auto'
      },
      time: {
        displayFormats: {second: 'h:mm:ss a'},
        unit: 'second'
      },
      scaleLabel: {
        display: true,
        labelString: 'Tiempo'
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        stepValue: 10,
        steps: 10
      },
      scaleLabel: {
        display: true,
        labelString: 'Valor'
      }
    }]
  },
  pan: {
    enabled: true,
    mode: 'x'
  },
  zoom: {
    enabled: true,
    drag: false,
    mode: 'x'
  }
};


export const chartColors = ["#ba55d3", "#9acd32", "#40e0d0", "#6495ed", "#f08080", "#ffa500", "#663399", "#b22222", "#5f9ea0", "#8b008b", "#8b4513", "#f4a460", "#2e8b57", "#dda0dd", "rgb(0, 150, 136)", "rgb(255, 193, 7)", "rgb(96, 125, 139)", "rgb(33, 33, 33)", "rgb(169, 4, 4)", "rgb(1, 74, 64)", "rgb(179, 3, 72)", "rgb(84, 58, 68)"];

export const chartDataset = (stock_name, color, stock_values) => {
  return {
    label: stock_name.toUpperCase(),
    fill: false,
    lineTension: 0,
    backgroundColor: color,
    borderColor: color,
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: color,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: color,
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    data: stock_values
  };
};
