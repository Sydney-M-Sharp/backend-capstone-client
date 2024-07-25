import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome.jsx'; 
import CreateEvent from './Pages/CreateEvent/CreateEvent.jsx';


function App() {
  return (
    <>
    
      <Routes> 
      
        <Route path="/" element={<Welcome />} /> 
        <Route path="create-event" element={<CreateEvent />} /> 
        

      </Routes>
    </>
  )
}

export default App;