import React, { useState } from 'react';

import './css/Login.css';
import Google from '../../shared/assets/svg/google.svg';

import { loginFunc, registerFunc, anonymousLoginFunc, googleLoginFunc } from "../../api/login.api";


function Login() {
    const [register, setRegister] = useState(false);
    const [anonymous, setAnonymous] = useState(true);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('testuser');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const loginButton = React.createRef();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        registerFunc(email, username, password)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        
        console.log('Registering...');
    }

    const handleLogin = () => {
        loginFunc(email, password)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        console.log('Logging in...');
    };


    const handleAnonymousLogin = () => {
        buttonLoading();
        anonymousLoginFunc(username, keepSignedIn)
            .then(data => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = '/c';
            })
            .catch(error => {
                console.error(error);
            });
            
        console.log('Logging in anonymously...');
    };

    const handleGoogleLogin = () => {
        googleLoginFunc()
        console.log('Logging in with Google...');
    };

    const buttonLoading = () => {
        const spinnerSpan = document.createElement('span');
        spinnerSpan.classList.add('buttonSpinner');

        const currentText = loginButton.current.innerText;

        loginButton.current.innerText = 'Loading';
        loginButton.current.disabled = true;
        loginButton.current.classList.add('buttonLoading');
        loginButton.current.appendChild(spinnerSpan);

        setTimeout(() => {
            loginButton.current.innerText = currentText;
            loginButton.current.disabled = false;
            loginButton.current.classList.remove('buttonLoading');
        }, 5000);
    }

    return (
        <div className='login-page'>
            <div className='login-form-container'>
                <h1>{register ? 'Register' : 'Login'}</h1>
                {(register && !anonymous) && (
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                )}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {(!anonymous) && (
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}
                {register && (
                <input type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                )}
                <button ref={loginButton} onClick={(!anonymous ? register ? handleRegister : handleLogin : handleAnonymousLogin)}>
                    {register ? 'Register' : 'Login'}
                </button>
                <div className='keep-me-signed-in'>
                    <input
                        type='checkbox'
                        checked={keepSignedIn}
                        onChange={() => setKeepSignedIn(!keepSignedIn)}
                    />
                    <p>Keep me signed in</p>
                </div>
            </div>
            <div className='register-prompt'>
                <div className='register-button'>
                    <p>{register ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                    <button onClick={() => {setRegister(!register); setAnonymous(false)}}>
                        {register ? 'Login' : 'Register'}
                    </button>
                </div>
            </div>
            <div className="login-alternatives-container">
                <div className='anonymous-login'>
                    <p>Or login as:</p>
                    <button onClick={() => {setAnonymous(true);setRegister(false);}}>
                        Anonymous
                    </button>
                </div>
                <span className='divider'></span>
                <div className='login-alternatives'>
                    <p>Or login with:</p>
                    <div className='login-alternatives-icons'>
                        <img src={Google} alt='Google' onClick={() => handleGoogleLogin()}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;