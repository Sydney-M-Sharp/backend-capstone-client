import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/state';
import { getTrips } from '../../data/trips.js';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Components/FormatDate.jsx';

const MyTrips = () => {
    const { userId, token } = useAppContext();
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate(); // For programmatic navigation

    useEffect(() => {
        const fetchTrips = async () => {
            if (userId && token) {
                const data = await getTrips(userId, token);
                setTrips(data);
            }
        };

        fetchTrips();
    }, [userId, token]);

    

    return (
        <div>
            <h1>My Trips</h1>
            <button onClick={() => navigate('/create-trip')}>Create New Trip</button>
            {trips.length > 0 ? (
                <ul>
                    {trips.map(trip => (
                        <li key={trip.id}>
                            <Link to={`/trip-details/${trip.trip.id}`}>{trip.trip.location}</Link>
                            <ul>
                                <li>Start Date: {formatDate(trip.trip.start_date)}</li>
                                <li>End Date: {formatDate(trip.trip.end_date)}</li>
                                
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trips found.</p>
            )}
        </div>
    );
};

export default MyTrips;


