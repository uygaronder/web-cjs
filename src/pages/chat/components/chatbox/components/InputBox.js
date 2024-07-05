import React, { useState } from 'react';

const InputBox = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
        console.log('Submitted:', inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default InputBox;