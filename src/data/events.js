export const getEventsByTripID = async (tripId, token) => {
    try {
        const response = await fetch(`http://localhost:8000/events?trip_id=${tripId}`, {
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
export const getEventByID = async (eventId, token) => {
    try {
        const response = await fetch(`http://localhost:8000/events/${eventId}`, {
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

export const updateEventByID = async (eventId, eventData, token) => {
    try {
        const { trip, ...updateData } = eventData; // Exclude trip from the update data
        const response = await fetch(`http://localhost:8000/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(updateData) // Send only the event details
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};
