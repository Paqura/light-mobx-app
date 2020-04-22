import React from 'react';
import { useTableStore } from '../../stores';
import { observer } from 'mobx-react';


const Table = () => {
  const { data, setSort, dir } = useTableStore();

  const sortIcon = dir === 'up' ? '^' : dir === 'down' ? '_' : '-';

  return (
    <table className="blueTable">
      <thead>
        <tr>
          <td>#</td>
          <td>Name</td>
          <td onClick={setSort}>
            Age {sortIcon}
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((user, idx) => (
          <tr>
            <td>{idx}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const TableObserver = observer(Table);

export default TableObserver;