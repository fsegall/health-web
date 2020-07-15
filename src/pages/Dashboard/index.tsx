import React, { useState } from 'react';
import { Header } from './styles';
const Dashboard: React.FC = () => {
  const [counter, setCounter] = useState(8);

  let listitems: number[] = [];

  for (let i = 1; i <= counter; i++) {
    listitems.push(i);
  }

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <ul>
        {listitems.map((item) => {
          return <li key={item + ' items'}>{item}</li>;
        })}
      </ul>
      <Header>Dashboard</Header>
    </div>
  );
};
export default Dashboard;
