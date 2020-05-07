import React, { MouseEvent } from 'react'
import { TableItem } from '../../stores/tableStore';

const formatCase = new Intl.NumberFormat().format;

interface Props {
  idx: number;
  data: TableItem;
  onChartOpen: (country: string) => (evt: MouseEvent) => void;
}

const TableRow: React.FC<Props> = ({ data, idx, onChartOpen }) => {
  return (
    <tr>
      <td>{idx}</td>
      <td onClick={onChartOpen(data.country)}>
        <button>{data.country}</button>
      </td>
      <td>{formatCase(data.cases)}</td>
      <td>{formatCase(data.deaths)}</td>
      <td>
        <span>
          <img src={data.countryInfo.flag} alt={`Flag of ${data.country}`} width="32px" />
        </span>
      </td>
    </tr>
  )
}

export default TableRow
