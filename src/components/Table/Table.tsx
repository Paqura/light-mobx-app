import React, { useEffect } from 'react';
import { useTableStore } from '../../stores';
import { observer } from 'mobx-react';
import { Table as RTable } from 'react-bootstrap';
import { coronaService } from '../../services/Corona.service';

const formatCase = new Intl.NumberFormat().format;

const Table = () => {
  const { data, setSort, dir, setData } = useTableStore();

  const sortIcon = dir === 'up' ? '^' : dir === 'down' ? '_' : '*';

  useEffect(() => {
    const getData = async () => {
      const data = await coronaService.getCountries();
      setData(data)
    }

    getData();
  }, [setData]);

  return (
    <RTable striped bordered hover>
      <thead>
        <tr>
          <td>№</td>
          <td>Country</td>
          <td onClick={setSort}>
            Cases
            <span style={{ position: 'absolute' }}>{sortIcon}</span>
          </td>
          <td>Flag</td>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 && data.map((item, idx) => (
          <tr key={item.country}>
            <td>{idx}</td>
            <td>{item.country}</td>
            <td>{formatCase(item.cases)}</td>
            <td>
              <span>
                <img src={item.countryInfo.flag} alt={`Flag of ${item.country}`} width="32px" />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </RTable>
  )
}

const TableObserver = observer(Table);

export default TableObserver;