import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
