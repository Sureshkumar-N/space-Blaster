import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Playground from './components/Playground';
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/game' element={<Playground/>}/>
    </Routes>
    </div>
  );
}

export default App;
