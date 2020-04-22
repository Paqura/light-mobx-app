import React from 'react';
import { observer } from 'mobx-react';
import { useCounterStore } from './stores';

const Counter = observer(() => {
  const { count, increment } = useCounterStore();

  return (
    <>
      {count}
      <button onClick={increment}>Incr</button>
    </>
  )
})

const App: React.FC = () => {
  console.log('rerender')
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
