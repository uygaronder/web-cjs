// user.api.js
const API_URL = process.env.REACT_APP_API_URL;

export async function fetchUserData(userId) {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user data');
    return response.json();
}