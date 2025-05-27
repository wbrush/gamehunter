import { useState, useEffect } from 'react';

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import Form from '../components/createForm/form';

import Auth from '../utils/auth'

import '../pagescss/create.css'

const Create = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn())

  useEffect(() => {
    setLoggedIn(Auth.loggedIn())
  }, [modalVisibility])

  return (
    <>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='create-page'>
        {loggedIn ? null : <h4 id='login-text'>Please login to create an event.</h4>}

        <div className="create-page-content">
          <Form form='open' />

          <div className='divider'>
            <div id='divider'></div>
            <h1>OR</h1>
          </div>

          <Form form='reserve' />
        </div>
      </div>
    </>
  )
}

export default Create
