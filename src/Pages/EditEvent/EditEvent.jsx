import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventByID, updateEventByID } from '../../data/events.js'; 
import { useAppContext } from '../../context/state';
import './editevent.css'; 

const EditEvent = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const { token } = useAppContext(); // Get the token from context
    const navigate = useNavigate(); // To programmatically navigate after saving
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventByID(eventId, token);
                setEventDetails({
                    title: data.title,
                    location: data.location,
                    date: data.date,
                    time: data.time,
                    description: data.description,
                    link: data.link,
                    trip: data.trip.id // Include trip ID in case it’s needed for reference
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId, token]);

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
            const { title, location, date, time, description, link, trip } = eventDetails;
            await updateEventByID(eventId, { title, location, date, time, description, link, trip }, token);
            navigate(`/trip-details/${trip}`); // Redirect to trip details page after saving
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>Error loading event details: {error}</p>;

    return (
        <div className="page-container">
            <header className='page-header'>
                <h1>Edit Event</h1>
            </header>

            <div className="section-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={eventDetails.title || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input type="text" name="location" value={eventDetails.location || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" name="date" value={eventDetails.date || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Time:</label>
                        <input type="time" name="time" value={eventDetails.time || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={eventDetails.description || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Link:</label>
                        <input type="text" name="link" value={eventDetails.link || ''} onChange={handleChange} />
                    </div>
                    <button type="submit" className="save-button">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
