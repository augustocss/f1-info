import './App.css';
import Drivers from './components/Drivers/Drivers';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Drivers />
      </div>
    </div>
  );
}

export default App;
