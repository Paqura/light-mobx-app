import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';
import { Search } from './components/Search';

const App: React.FC = () => {
  return (
    <div>
      <Search />
      <Table />
    </div>
  );
}

export default App;
