import React, { useEffect } from 'react';
import { useTableStore } from '../../stores';
import { observer } from 'mobx-react';

const request = async () => {
  return await fetch('https://corona.lmao.ninja/v2/countries').then(r => r.json())
};

const Table = () => {
  const { data, setSort, dir, setData } = useTableStore();

  const sortIcon = dir === 'up' ? '^' : dir === 'down' ? '_' : '*';

  useEffect(() => {
    const getData = async () => {
      const data = await request()
      setData(data)
    }

    getData();
  }, [setData]);

  return (
    <table className="blueTable">
      <thead>
        <tr>
          <td>№</td>
          <td>Country</td>
          <td onClick={setSort}>
            Cases
            <span style={{ position: 'absolute' }}>{sortIcon}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((user, idx) => (
          <tr key={user.country}>
            <td>{idx}</td>
            <td>{user.country}</td>
            <td>{user.cases}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const TableObserver = observer(Table);

export default TableObserver;