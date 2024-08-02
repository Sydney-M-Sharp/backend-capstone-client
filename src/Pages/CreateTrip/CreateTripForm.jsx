import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../../data/trips.js';
import { useAppContext } from '../../context/state';
import { getUsers } from '../../data/users.js';
import './createtrip.css';

const CreateTripForm = ({ onSubmit, error }) => {
    const { token } = useAppContext();
    const navigate = useNavigate();
    const [tripDetails, setTripDetails] = useState({
        location: '',
        start_date: '',
        end_date: '',
        invited_users: []
    });
    const [users, setUsers] = useState([]);

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
            await createTrip(tripDetails, token);
            navigate(`/my-trips`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancel = () => {
        navigate(`/my-trips`);
    };

    return (
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


                <h3>Invite Users:</h3>
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
                        <button type="submit" className='create-trip-button'>Create Trip</button>
                        <button type="button" className='cancel-trip-create-button' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTripForm;
