import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface IProps {
  data: number[];
}

const Chart: React.FC<IProps> = ({ data }) => {
  const getOption = () => {
    return {
      xAxis: {
          id: 'mainLine',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        { id: 'line', type: 'line', data },
      ],
    }
  };

  return (
    <ReactEcharts option={getOption()} />
  );
}

export default Chart;