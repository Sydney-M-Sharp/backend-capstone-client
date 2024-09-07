import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/state';
import { getTrips, deleteTripByID } from '../../data/trips.js';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Components/FormatDate.jsx';

import './mytrips.css'; // Import the CSS file

const MyTrips = () => {
    const { userId, token } = useAppContext();
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            if (userId && token) {
                const data = await getTrips(userId, token);
                setTrips(data);
            }
        };

        fetchTrips();
    }, [userId, token]);

    const handleDeleteClick = async (tripId) => {
        console.log("Attempting to delete trip with ID:", tripId);
        if (window.confirm("Are you sure you want to delete this trip?")) {
            try {
                await deleteTripByID(tripId, token);
                setTrips(trips.filter(trip => trip.trip.id !== tripId));
                setError(null);
            } catch (error) {
                console.error("Failed to delete the trip:", error);
                setError('Failed to delete the trip');
            }
        }
    };

    const handleEditClick= async (tripId) => {
        console.log("Attempting to edit trip with ID:", tripId)
        navigate(`/edit-trip/${tripId}`);
    };

    return (
        <div className="page-container">
            <header className='page-header'>
                <h1>My Trips</h1>
            </header>
            
            {trips.length > 0 ? (
                <ul className="trips-list">
                    {trips.map(trip => (
                        <li key={trip.trip.id} className="trip-item">
                            <div className="trip-box">
                                <Link to={`/trip-details/${trip.trip.id}`} className="trip-link">
                                    {trip.trip.location}
                                    {console.log("this is the person who made the trip", trip.trip.user, "and this is the current user", userId)}
                                </Link>
                                <ul className="trip-details">
                                    <li>Start Date: {formatDate(trip.trip.start_date)}</li>
                                    <li>End Date: {formatDate(trip.trip.end_date)}</li>
                                    </ul>
                                    {parseInt(trip.trip.user) === parseInt(userId) && (
                                        <div className="my-trip-button-section">
                                            <button onClick={() => handleEditClick(trip.trip.id)} className='edit-button>'>Edit</button>
                                            <button onClick={() => handleDeleteClick(trip.trip.id)} className="delete-button">Delete</button>
                                        </div>
                                    )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='no-trips-found'>No trips found</p>
            )}
        </div>
    );
};

export default MyTrips;
