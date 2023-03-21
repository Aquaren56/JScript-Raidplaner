import './styling/header.css';

import Header from './components/Header';
import IconBar from './components/IconBar';
import Steps from './components/Steps';
import PropertyDisplay from './components/PropertyDisplay';
import PlanningCanvas from './components/PlanningCanvas';

function App() {
  return (
    <div className="App">
      <Header />
      <Steps />
      <IconBar />
      <PlanningCanvas />
      <PropertyDisplay />
    </div>
  );
}

export default App;
