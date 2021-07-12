import React from 'react';
import UsersInfo from "./components/UsersInfo/UsersInfo";
import { base } from './base';

const App = () => {
  const fireBase = base;
  console.log(fireBase);
  return (
    <div className="App">
      <UsersInfo />
    </div>
  );
}

export default App;
