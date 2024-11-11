import { useState } from 'react';
import Auth from '../../utils/auth'
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
        console.log(userState);
        
        if (modalDisplay === 'Login') {
            try {
                const login = await fetchRequest('login')

                if (login.result) {
                    Auth.login('banana');
                } else {
                    console.log('error')
                }
            } catch (e) {
                console.error(e);
                alert("Invalid Username or Password, Please Try Again.")
            }
        } else if (modalDisplay === 'Signup') {
            try {
                const signup = await fetchRequest('signup')
                console.log(signup)
        
                Auth.login('banana');
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

    const fetchRequest = async (method) => {
        const api = await fetch ('https://gh-user-mgr-462896897923.us-central1.run.app/api/v1/' + method, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': `${userState.name}`,
                'email': `${userState.email}`,
                'password': `${userState.password}`
            })
        })
        
        const apiJson = await api.json()
        return apiJson
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
