import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTripByID } from '../../data/trips.js';
import { useAppContext } from '../../context/state.jsx';
import { getUsers } from '../../data/users.js';
import { getTripByID}from '../../data/trips.js';
import '../CreateTrip/createtrip.css'


const EditTripForm = ({ onSubmit, error }) => {
    const { tripId } = useParams(); // Get the tripid from the URL
    const { token } = useAppContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Add a loading state
    const [users, setUsers] = useState([]);
    const [tripDetails, setTripDetails] = useState({
        location: '',
        start_date: '',
        end_date: '',
        invited_users: []
    });
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getUsers(token);
                setUsers(allUsers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const data = await getTripByID(tripId, token);
                const invitedUserIds = data.invited_users.map(invite => invite.user.id);
                setTripDetails({
                    location: data.trip.location,
                    start_date: data.trip.start_date,
                    end_date: data.trip.end_date,
                    invited_users: invitedUserIds,
                    
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setTripDetails(prevDetails => {
            const invited_users = checked
                ? [...new Set([...prevDetails.invited_users, parseInt(value)])]
                : prevDetails.invited_users.filter(id => id !== parseInt(value));
            return { ...prevDetails, invited_users };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTripByID(tripId,tripDetails, token);
            navigate(`/my-trips`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancel = () => {
        navigate(`/my-trips`);
    };

    return (
        <div className='new-trip-page-container'>
            <header className='page-header'> <h1>Edit Trip</h1> </header>
            
        <div className='edit-trip-section-container'>
        <div className="create-trip-form">
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={tripDetails.location} onChange={handleChange} />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" name="start_date" value={tripDetails.start_date} onChange={handleChange} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" name="end_date" value={tripDetails.end_date} onChange={handleChange} />
                </div>


                <h3>Invited Users:</h3>
                <div className='lower-form'>
                    <div className='invite-users-checkbox-section'>
                        {users.map(user => (
                            <div key={user.id} className='invite-users-checkbox'>
                                <span>{user.first_name} {user.last_name}</span>
                                <input
                                    className='invite-user-checkboxes'
                                    type="checkbox"
                                    value={user.id}
                                    checked={tripDetails.invited_users.includes(user.id)}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='trip-button-section'>
                        <button type="submit" className='create-trip-button'>Save Trip</button>
                        <button type="button" className='cancel-trip-create-button' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default EditTripForm;
