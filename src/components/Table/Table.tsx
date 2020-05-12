import React, { useEffect, useState, MouseEvent } from 'react';
import { useTableStore } from '../../stores';
import { observer } from 'mobx-react';
import { Table as RTable, Modal, Spinner } from 'react-bootstrap';
import { coronaService } from '../../services/Corona.service';
import { Chart } from '../Chart';
import TableRow from './TableRow';

const getSortIcon = (direction: string) =>
  direction === 'up' ? '^' : direction === 'down' ? '_' : '*';

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [chartData, setChartData] = useState<{ [key: string]: number }>({});
  const { data, setSort, direction, setData } = useTableStore();

  const sortIcon = getSortIcon(direction);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const data = await coronaService.getCountries();
      setData(data)

      setIsLoading(false);
    }

    getData();
  }, [setData]);

  const onChartOpen = (country: string) => async (evt: MouseEvent) => {
    const preparedCountry = country.toLowerCase();

    const dataId = (evt.target as HTMLElement).dataset.id as 'cases' | 'deaths' | undefined;

    if (!dataId) return;

    try {
      const { timeline } = await coronaService.getChartData(preparedCountry);

      setChartData(timeline[dataId]);

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
      <Modal
        size="xl"
        onHide={closeModal}
        show={isModalShown}
        animation={false}
      >
        <Chart data={chartData} />
      </Modal>

      <RTable striped bordered>
        <thead>
          <tr>
            <td>№</td>
            <td>Country</td>
            <td onClick={setSort}>
              Cases
              <span style={{ position: 'absolute' }}>{sortIcon}</span>
            </td>
            <td>Deaths</td>
            <td>Flag</td>
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 && data.map((item, idx) => (
            <TableRow key={item.country}
              idx={idx}
              data={item}
              onChartOpen={onChartOpen}
            />
          ))}
        </tbody>
      </RTable>
    </>
  )
}

const TableObserver = observer(Table);

export default TableObserver;