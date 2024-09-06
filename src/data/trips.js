export const getTrips = async (userId, token) => {
    try {
        const response = await fetch(`http://localhost:8000/invites?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Include the token in the Authorization header
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting trips:', error);
        return [];
    }
};

export const getTripByID = async (tripId, token) => {
    try {
        const response = await fetch(`http://localhost:8000/trips/${tripId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Include the token in the Authorization header
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting trips:', error);
        return [];
    }
};

export const createTrip = async (tripData, token) => {
    try {
        const response = await fetch('http://localhost:8000/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(tripData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    }
};

// export const updateTripByID = async (tripId, tripData, token) => {
//     try {
//         const { trip, ...updateData } = eventData; // Exclude trip from the update data
//         const response = await fetch(`http://localhost:8000/trip/${tripId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${token}`
//             },
//             body: JSON.stringify(updateData) // Send only the event details
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error updating event:', error);
//         throw error;
//     }
// };

export const deleteTripByID = async (tripId, token) => {
    try {
        const response = await fetch(`http://localhost:8000/trips/${tripId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error; // Rethrow to be caught in handleDeleteClick
    }
};