import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome/Welcome.jsx'; 
import CreateEvent from './Pages/CreateEvent/CreateEvent.jsx';
import MyTrips from './Pages/MyTrips/MyTrips.jsx';
import TripDetails from './Pages/TripDetails/TripDetails.jsx';
import EditEventPage from './Pages/EditEvent/EditEvent.jsx';
import CreateTrip from './Pages/CreateTrip/CreateTrip.jsx'
import Navbar from './Components/Navbar/NavBar.jsx';

function App() {
  return (
    <>
    
      <Routes> 
      
        <Route path="/" element={<Welcome />} /> 

        <Route path="my-trips" element={<MyTrips />} /> 
        <Route path="trip-details/:tripId" element={<TripDetails />} />
        <Route path="edit-event/:eventId" element={<EditEventPage />} />
        <Route path="/create-event/:tripId" element={<CreateEvent />} />
        <Route path="/create-trip" element={<CreateTrip />} />

      </Routes>
      {/* <Navbar element={<Navbar />}/> */}
    </>
  )
}

export default App;