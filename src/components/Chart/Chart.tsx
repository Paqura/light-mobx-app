import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { EChartOption } from 'echarts';

interface IProps {
  data: {
    [key: string]: number;
  }
}

const Chart: React.FC<IProps> = ({ data }) => {
  const getOption = (): EChartOption => {
    return {
      xAxis: [
        {
          data: Object.keys(data),
        }
      ],

      yAxis: {
        type: 'value',
      },

      series: [
        { id: 'line', type: 'line', data: Object.values(data), xAxisIndex: 0 },
      ],
    }
  };

  return (
    <ReactEcharts option={getOption()} />
  );
}

export default Chart;