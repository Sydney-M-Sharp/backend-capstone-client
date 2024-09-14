import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTripForm from './CreateTripForm';
import { createTrip } from '../../data/trips.js';
import { useAppContext } from '../../context/state';
import './createtrip.css'; // Import the CSS file

const CreateTrip = () => {
    const { token } = useAppContext(); // Get the token from context
    const navigate = useNavigate(); // To programmatically navigate after saving
    const [error, setError] = useState(null); // Add an error state

    const handleSubmit = async (tripDetails) => {
        try {
            await createTrip(tripDetails, token);
            navigate('/my-trips'); // Redirect to 'My Trips' page after saving
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <header className='page-header'> <h1 className='page-header-title'>Create New Trip</h1> </header>
            <div className='page-container'>
            <div className="create-trip-section-container">
                <CreateTripForm onSubmit={handleSubmit} error={error} />
            </div>
            </div>
        </div>
    );
};

export default CreateTrip;
