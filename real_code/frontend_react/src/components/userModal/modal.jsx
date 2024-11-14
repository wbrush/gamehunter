import { useState } from 'react';

import Auth from '../../utils/auth'
import { postFetchRequest } from '../../utils/functions';

import './modal.css';

const Modal = ({ modalVisibility, setModalVisibility, modalDisplay, setModalDisplay }) => {
    const [userState, setUserState] = useState({ name: '', email: '', password: '' });

    const toggleModal = (event) => {
        if (event.target.className === 'user-modal') {
            setModalVisibility(!modalVisibility)
        }
    }

    const changeModal = () => {
        if (modalDisplay === 'Signup') {
            setModalDisplay('Login');
        } else if (modalDisplay === 'Login') {
            setModalDisplay('Signup');
        };
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUserState({
            ...userState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (modalDisplay === 'Login') {
            try {
                const result = await postFetchRequest('https://gh-user-mgr-462896897923.us-central1.run.app/api/v1/login', userState)

                if (result.data) {
                    Auth.login(result.data);
                } else {
                    console.log('error')
                }
            } catch (e) {
                console.error(e);
                alert("Invalid Username or Password, Please Try Again.")
            }
        } else if (modalDisplay === 'Signup') {
            try {
                const result = await postFetchRequest('https://gh-user-mgr-462896897923.us-central1.run.app/api/v1/signup', userState)

                if (result.data) {
                    Auth.login(result.data);
                } else {
                    console.log('error')
                }
            } catch (e) {
                console.error(e);
                alert("Invalid Username or Password, Please Try Again.")
            }
        }

        // clear form values
        setUserState({
            name: '',
            email: '',
            password: '',
        });

        setModalVisibility(!modalVisibility)
    };

    return modalVisibility ? 
        (
            <div className="user-modal" onClick={toggleModal}>
                <form onSubmit={handleSubmit}>
                    <h2>{modalDisplay}</h2>

                    {modalDisplay === 'Signup' ? (
                        <>
                            <p className="label">Name</p>
                            <input id="signup-name" 
                                name='name'
                                value={userState.name}
                                onChange={handleChange}
                            />
                        </>
                        ) : (<></>)}

                    <p className="label">Email</p>
                    <input id="login-email" 
                        name='email'
                        value={userState.email}
                        onChange={handleChange}
                    />

                    <p className="label">Password</p>
                    <input id="login-password" type="password" 
                        name='password'
                        value={userState.password}
                        onChange={handleChange}
                    />

                    <p className="login-error" id="hidden">Incorrect username/password</p>
                    <p className="form-error" id="hidden">Please fill out the empty field(s)</p>
                    <p className="signup-error" id="hidden">Email already exists, please login</p>

                    <button type='submit'>{modalDisplay}</button>

                    <p onClick={changeModal} id="modal-switch">{modalDisplay === 'Login' ? 'Signup' : 'Login'}</p>
                </form>
            </div>
        ) : null
}

export default Modal
