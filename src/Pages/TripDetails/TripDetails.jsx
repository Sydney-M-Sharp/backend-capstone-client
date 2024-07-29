import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventsByTripID, deleteEventByID } from '../../data/events.js';
import { useAppContext } from '../../context/state';
import { convertTo12HourFormat } from '../../Components/Time.jsx';
import {formatDate} from '../../Components/FormatDate.jsx';

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
                    // Convert dates to comparable values
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    
                    if (dateA.getTime() === dateB.getTime()) {
                        // If dates are the same, sort by time
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

    const handleEditClick = (eventId) => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleCreateEventClick = () => {
        navigate(`/create-event/${tripId}`); // Adjust the path as needed
    };

    const handleDeleteClick = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEventByID(eventId, token);
                // Filter out the deleted event from the state
                setTripEvents(tripEvents.filter(event => event.id !== eventId));
                setError(null); // Clear the error if deletion is successful
            } catch (error) {
                setError('Failed to delete the event'); // Set error if deletion fails
            }
        }
    };
    
    

    return (
        <div>
            <h1>Trip Details</h1>
            <button onClick={handleCreateEventClick}>Create New Event</button>
            {tripEvents.length > 0 ? (
                <ul>
                    {tripEvents.map(event => (
                        <li key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Location: {event.location}</p>
                            <p>Date: {formatDate(event.date)}</p> {/* Format the date */}
                            <p>Time: {convertTo12HourFormat(event.time)}</p>
                            <p>Link: {event.link}</p>
                            <p>Event created by: {event.user.first_name}</p>
                            
                            {parseInt(event.user.id) === parseInt(userId) && (
                                <>
                                    <button onClick={() => handleEditClick(event.id)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(event.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found for this trip.</p>
            )}
        </div>
    );
};

export default TripDetails;
