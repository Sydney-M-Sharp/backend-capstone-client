import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome.jsx'; 
import CreateEvent from './Pages/CreateEvent/CreateEvent.jsx';
import MyTrips from './Pages/MyTrips/MyTrips.jsx';
import TripDetails from './Pages/TripDetails/TripDetails.jsx';
import EditEventPage from './Pages/EditEvent/EditEvent.jsx';


function App() {
  return (
    <>
    
      <Routes> 
      
        <Route path="/" element={<Welcome />} /> 
        <Route path="create-event" element={<CreateEvent />} /> 
        <Route path="my-trips" element={<MyTrips />} /> 
        <Route path="trip-details/:tripId" element={<TripDetails />} />
        <Route path="edit-event/:eventId" element={<EditEventPage />} />
        

      </Routes>
    </>
  )
}

export default App;