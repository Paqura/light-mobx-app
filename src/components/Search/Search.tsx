import React, { SyntheticEvent, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useTableStore } from '../../stores';
import { coronaService } from '../../services/Corona.service';
import { useNotificationStore } from '../../stores/rootStore';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setData } = useTableStore();
  const { setError, dropError } = useNotificationStore();

  const getCavidData = async (value: string) => {
    try {
      const data = await coronaService.getCountry(value);
      setData([data]);
      dropError();
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmit = async (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = inputRef.current!.value;

    if (!value) {
      const data = await coronaService.getCountries();
      setData(data);
      dropError();
      return;
    }

    getCavidData(value);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Country" ref={inputRef} />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Search
