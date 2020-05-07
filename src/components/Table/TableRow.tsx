import React, { MouseEvent } from 'react'

const formatCase = new Intl.NumberFormat().format;

interface Props {
  idx: number;

  data: {
    country: string;
    cases: number;
    countryInfo: { flag: string };
  }

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
      <td>
        <span>
          <img src={data.countryInfo.flag} alt={`Flag of ${data.country}`} width="32px" />
        </span>
      </td>
    </tr>
  )
}

export default TableRow
