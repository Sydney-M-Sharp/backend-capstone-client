import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/state';
import { getTrips } from '../../data/trips.js';
import { Link } from 'react-router-dom';

const MyTrips = () => {
    const { userId, token } = useAppContext();
    const [trips, setTrips] = useState([]);

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
            {trips.length > 0 ? (
                <ul>
                    {trips.map(trip => (
                        <li key={trip.id}>
                            <Link to={`/trip-details/${trip.trip.id}`}>{trip.trip.location}</Link>
                            <ul>
                                <li>Start Date: {trip.trip.start_date}</li>
                                <li>End Date: {trip.trip.end_date}</li>
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
