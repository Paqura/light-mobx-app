import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { EChartOption } from 'echarts';
import { TimeLine } from '../../services/Corona.service';

interface IProps {
  data: TimeLine | null
}

const Chart: React.FC<IProps> = ({ data }) => {
  if (!data) {
    return null
  }

  const keys = Object.keys(data) as (keyof TimeLine)[];
  console.log(data);

  const getOption = (): EChartOption => {
    return {
      grid: [
        { id: 'casesGrid', bottom: '50%' },
        { id: 'deathsGrid', top: '50%',  },
      ],
      xAxis: [
        { id: 'casesX', data: Object.keys(data['cases']), gridIndex: 0 },
        { id: 'deathsX', data: Object.keys(data['deaths']), gridIndex: 1 },
      ],

      yAxis: [
        { id: 'casesY', gridIndex: 0 },
        { id: 'deathsY', gridIndex: 1 },
      ],

      series: [
        { id: 'casesLine', type: 'line', data: Object.values(data['cases']), xAxisIndex: 0, yAxisIndex: 0 },
        { id: 'deathsLine', type: 'line', data: Object.values(data['deaths']), xAxisIndex: 1, yAxisIndex: 1 },
      ],
    }
  };

  return (
    <ReactEcharts option={getOption()} opts={{ height: 800, width: 1200 }} />
  );
}

export default Chart;