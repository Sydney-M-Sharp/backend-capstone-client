import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/state';
import { getTrips } from '../../data/trips.js';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Components/FormatDate.jsx';
import './mytrips.css'; // Import the CSS file

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
        <div className="page-container">
            <header className='page-header'>
                <h1>My Trips</h1>
            </header>
            
            {trips.length > 0 ? (
                <ul className="trips-list">
                    
                    {trips.map(trip => (
                        <li key={trip.id} className="trip-item">
                            <div className="trip-box">
                                <Link to={`/trip-details/${trip.trip.id}`} className="trip-link">
                                    {trip.trip.location}
                                </Link>
                                <ul className="trip-details">
                                    <li>Start Date: {formatDate(trip.trip.start_date)}</li>
                                    <li>End Date: {formatDate(trip.trip.end_date)}</li>
                                </ul>
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




