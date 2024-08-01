import CreateEventForm from './CreateEventForm.jsx';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent } from '../../data/events.js';
import { useAppContext } from '../../context/state';
import './createevent.css';

const CreateEvent = () => {
    const { tripId } = useParams(); // Get the tripId from the URL
    const { token } = useAppContext(); // Get the token from context
    const navigate = useNavigate(); // To programmatically navigate after saving
    const [error, setError] = useState(null); // Add an error state

    const handleSubmit = async (eventDetails) => {
        try {
            eventDetails.trip = tripId; // Ensure the trip ID is set for the new event
            await createEvent(eventDetails, token);
            navigate(`/trip-details/${tripId}`); // Redirect to trip details page after saving
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page-container" >
            <header className='page-header'>
            <h1>Create New Event</h1>
            </header>
            
            <CreateEventForm onSubmit={handleSubmit} error={error} />
        </div>
    );
};

export default CreateEvent;