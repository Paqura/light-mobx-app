import React from 'react';
import { Table } from './components/Table';
import { Search } from './components/Search';
import { Container, Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotificationStore } from './stores/rootStore';
import { observer } from 'mobx-react';

const App: React.FC = () => {
  const { error } = useNotificationStore();

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Search />
      <Table />
    </Container>
  );
}

const Observer = observer(App);

export default Observer;
