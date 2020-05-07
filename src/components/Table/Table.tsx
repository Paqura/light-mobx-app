import React, { useEffect, useState } from 'react';
import { useTableStore } from '../../stores';
import { observer } from 'mobx-react';
import { Table as RTable, Modal, Spinner } from 'react-bootstrap';
import { coronaService } from '../../services/Corona.service';
import { Chart } from '../Chart';

const formatCase = new Intl.NumberFormat().format;

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const { data, setSort, direction, setData } = useTableStore();

  const sortIcon = direction === 'up' ? '^' : direction === 'down' ? '_' : '*';

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const data = await coronaService.getCountries();
      setData(data)

      setIsLoading(false);
    }

    getData();
  }, [setData]);

  const onChartOpen = (country: string) => async () => {
    const preparedCountry = country.toLowerCase();

    try {
      const { timeline } = await coronaService.getChartData(preparedCountry);
      const cases = Object.values(timeline.cases);
      setChartData(cases);

      setIsModalShown(true);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const closeModal = () => {
    setIsModalShown(false);
  }

  if (isLoading) {
    return <Spinner animation="border" />
  }

  return (
    <>
      <Modal onHide={closeModal} show={isModalShown} size="xl" animation={false}>
        <Chart data={chartData} />
      </Modal>
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
              <td onClick={onChartOpen(item.country)}>
                <button>{item.country}</button>
              </td>
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
    </>
  )
}

const TableObserver = observer(Table);

export default TableObserver;