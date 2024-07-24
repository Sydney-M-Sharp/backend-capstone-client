import { useState } from 'react'
import './App.css'

// notes:
// side goal set up sub-routes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar setCurrentUser={setCurrentUser}/>
      <Routes> 
      
        <Route path="create-event" element={<MyCloset currentUser={currentUser}/>} />
        <Route path="create-trip" element={<Upload currentUser={currentUser} />} />
        <Route path="edit-event" element={<MyOutfit currentUser={currentUser}/>} />
        <Route path="my-trips" element={<MyProfile currentUser={currentUser} />} />
        <Route path="trip-details" element={ <EditProfile currentUser={currentUser}  />} />
        < Route path="/" element={<Welcome currentUser={currentUser}/>} />

      </Routes>
    </>
  )
}

export default App
