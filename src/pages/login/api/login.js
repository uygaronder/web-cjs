const API_URL = process.env.REACT_APP_API_URL;

export const loginFunc = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return response.json();
}

export const registerFunc = async (email, username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            username,
            password,
        }),
    });

    return response.json();
}

export const anonymousLoginFunc = async (username, keepLoggedIn) => {
    const response = await fetch(`${API_URL}/auth/anonymous`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            keepLoggedIn,
        }),
    });

    return response.json();
}

export const googleLoginFunc = async () => {
    const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}