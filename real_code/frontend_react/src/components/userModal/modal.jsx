import { useState } from 'react';

import Auth from '../../utils/auth'
import { postFetchRequest, getEventRequest } from '../../utils/functions';

import './modal.css';

const Modal = ({ modalVisibility, setModalVisibility, modalDisplay, setModalDisplay }) => {
    const [userState, setUserState] = useState({ name: '', email: '', password: '' });
    const [toggleEmailError, setToggleEmailError] = useState(false)
    const [toggleLoginError, setToggleLoginError] = useState(false)

    const errorStyling = {
        'color': 'red',
        'margin': 0,
        'paddingTop': '5px',
        'fontSize': '14px'
    }

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
                
                if (result.success) {
                    setToggleLoginError(false)
                    Auth.login(result.message)

                    const userId = Auth.getUser().user.id
                    getUserEvents(userId)

                    // clear form values
                    setUserState({
                        name: '',
                        email: '',
                        password: '',
                    })

                    setModalVisibility(!modalVisibility)
                } else {
                    setToggleLoginError(true)
                }
            } catch (e) {
                console.error(e);
                alert("Invalid Username or Password, Please Try Again.")
            }
        } else if (modalDisplay === 'Signup') {
            try {
                const result = await postFetchRequest('https://gh-user-mgr-462896897923.us-central1.run.app/api/v1/signup', userState)

                if (Auth.getUser()) {
                    setToggleEmailError(false)
                    Auth.login(result.data)

                    const userId = Auth.getUser().user.id
                    getUserEvents(userId)

                    // clear form values
                    setUserState({
                        name: '',
                        email: '',
                        password: '',
                    })

                    setModalVisibility(!modalVisibility)
                } else {
                    setToggleEmailError(true)
                }
            } catch (e) {
                console.error(e);
                alert("Invalid Username or Password, Please Try Again.")
            }
        }
    };

    const getUserEvents = async (id) => {
        const response = await getEventRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/getUserEvents/' + `${id}`)

        if (response) {
            localStorage.setItem('user_events', response)
        }
    }

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

                    {toggleLoginError ? (<p id="login-error" style={errorStyling}>Incorrect username/password</p>) : null}
                    <p className="form-error" id="hidden">Please fill out the empty field(s)</p>
                    {toggleEmailError ? (<p id="signup-error" style={errorStyling}>Email already exists, please login</p>) : null}

                    <button type='submit'>{modalDisplay}</button>

                    <p onClick={changeModal} id="modal-switch">{modalDisplay === 'Login' ? 'Signup' : 'Login'}</p>
                </form>
            </div>
        ) : null
}

export default Modal
