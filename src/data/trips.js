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