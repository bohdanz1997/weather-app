import { FC, useMemo } from 'react';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

type LineChartProps = {
  data: {
    time: string[]
    tMax: number[]
    tMin: number[]
  }
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  const options: Highcharts.Options = useMemo(() => ({
    chart: {
      type: 'spline',
      zoomType: 'x',
      panning: {
        enabled: true,
        type: 'x',
      },
      panKey: 'shift',
    },
    title: {
      text: 'Tel Aviv weather',
    },
    plotOptions: {
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter: function () {
        return this.points?.reduce(
          function (text, point) {
            return `${text} <br/>${point.series.name}: ${point.y}°`
          },
          `<b>${this.x}</b>`,
        ) ?? '';
      },
    },
    yAxis: {
      labels: {
        format: '{value}°'
      },
      title: {
        text: null,
      },
    },
    xAxis: {
      categories: data.time.map(date => dayjs(date).format('D MMM')),
      tickInterval: 3,
      labels: {
        enabled: true,
      },
    },
    series: [
      {
        type: 'line',
        name: 'Min temp',
        data: data.tMin.map(num => Number(num.toFixed(1))),
        color: 'rgb(140 205 235)',
        marker: {
          symbol: 'circle',
          fillColor: 'rgb(140 205 235)',
        },
      },
      {
        type: 'line',
        name: 'Max temp',
        color: 'rgb(245 125 70)',
        data: data.tMax.map(num => Number(num.toFixed(1))),
        marker: {
          symbol: 'circle',
          fillColor: 'rgb(245 125 70)',
        },
      },
    ]
  }), [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}
