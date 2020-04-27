import React, { SyntheticEvent } from 'react';
import { Form, Button } from 'react-bootstrap';

const Search = () => {
  const onSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Search country</Form.Label>
        <Form.Control type="text" placeholder="Country" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default Search
