import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventsByTripID, deleteEventByID } from '../../data/events.js';
import { useAppContext } from '../../context/state';
import { convertTo12HourFormat } from '../../Components/Time.jsx';
import { formatDate } from '../../Components/FormatDate.jsx';
import './tripdetails.css'; // Import the CSS file

const TripDetails = () => {
    const { tripId } = useParams(); // Get the tripId from the URL
    const { token, userId } = useAppContext(); // Get the token and userId from context
    const navigate = useNavigate(); // Use navigate for programmatic navigation
    const [tripEvents, setTripEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEventsByTripID(tripId, token);

                // Sort events by date first, then by time
                const sortedEvents = data.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    
                    if (dateA.getTime() === dateB.getTime()) {
                        const [aHour, aMinute] = a.time.split(':').map(Number);
                        const [bHour, bMinute] = b.time.split(':').map(Number);
                        
                        if (aHour === bHour) {
                            return aMinute - bMinute;
                        }
                        return aHour - bHour;
                    }
                    
                    return dateA - dateB;
                });

                setTripEvents(sortedEvents);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [tripId, token]);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error}</p>;

    // Group events by date
    const groupedEvents = tripEvents.reduce((acc, event) => {
        const date = formatDate(event.date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {});

    const handleEditClick = (eventId) => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleDeleteClick = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEventByID(eventId, token);
                setTripEvents(tripEvents.filter(event => event.id !== eventId));
                setError(null);
            } catch (error) {
                setError('Failed to delete the event');
            }
        }
    };

    return (
        <div className="page-container">
            <header className='page-header'>
                <h1>Trip Details</h1>
            </header>
            {Object.keys(groupedEvents).length > 0 ? (
                <ul className="events-list">
                    {Object.keys(groupedEvents).map(date => (
                        <li key={date} className="date-item">
                            <div className="date-box">
                                <h2>{date}</h2>
                                {groupedEvents[date].map(event => (
                                    <div key={event.id} className="event-box">
                                        <h3>{event.title}</h3>
                                        <p className='description'>{event.description}</p>
                                        <p>Time: {convertTo12HourFormat(event.time)}</p>
                                        <p>Location: {event.location}</p>
                                        <p>Link: {event.link}</p>
                                        <p>Event created by: {event.user.first_name}</p>

                                        {/* Only show the edit and delete buttons if the event was created by the current user */}
                                        {parseInt(event.user.id) === parseInt(userId) && (
                                            <div className="event-actions">
                                                <button onClick={() => handleEditClick(event.id)} className="edit-button">Edit</button>
                                                <button onClick={() => handleDeleteClick(event.id)} className="delete-button">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='no-event'>No events found for this trip</p>
            )}
        </div>
    );
};

export default TripDetails;
