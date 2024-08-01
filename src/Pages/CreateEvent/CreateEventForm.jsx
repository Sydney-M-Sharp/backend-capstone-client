import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createEvent } from '../../data/events.js';
import { useAppContext } from '../../context/state.jsx';

const CreateEventForm = () => {
    const { tripId } = useParams(); // Get the tripId from the URL
    const { token } = useAppContext(); // Get the token from context
    const navigate = useNavigate(); // To programmatically navigate after saving

    const [eventDetails, setEventDetails] = useState({
        title: '',
        location: '',
        date: '',
        time: '',
        description: '',
        link: '',
        trip: tripId // Initialize with the trip ID
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(eventDetails, token);
            navigate(`/trip-details/${tripId}`); // Redirect to trip details page after saving
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate(`/trip-details/${tripId}`); // Redirect to trip details page without saving
    };

    return (
        <div className='create-event-container'>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: *</label>
                    <input type="text" required name="title" value={eventDetails.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Location: *</label>
                    <input type="text" required name="location" value={eventDetails.location} onChange={handleChange} />
                </div>
                <div>
                    <label>Date: *</label>
                    <input type="date" required name="date" value={eventDetails.date} onChange={handleChange} />
                </div>
                <div>
                    <label>Time: *</label>
                    <input type="time" required name="time" value={eventDetails.time} onChange={handleChange} />
                </div>
                <div>
                    <label>Description: *</label>
                    <textarea name="description" required value={eventDetails.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Link:</label>
                    <input type="text" name="link" value={eventDetails.link} onChange={handleChange} />
                </div>
                <button type="submit">Create Event</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateEventForm;

