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
    <tr onClick={onChartOpen(data.country)}>
      <td>{idx}</td>
      <td>
        {data.country}
      </td>
      <td>
        <button data-id="cases">{formatCase(data.cases)}</button>
      </td>
      <td>
        <button data-id="deaths">{formatCase(data.deaths)}</button>
      </td>
      <td>
        <span>
          <img src={data.countryInfo.flag} alt={`Flag of ${data.country}`} width="32px" />
        </span>
      </td>
    </tr>
  )
}

export default TableRow
