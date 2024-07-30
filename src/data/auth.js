// data/auth.js
export const login = async (user) => {

  try {
    const response = await fetch('http://localhost:8000/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { valid: false };
  }
};

export const register = async (user) => {

  try {
    const response = await fetch('http://localhost:8000/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { valid: false };
  }
}