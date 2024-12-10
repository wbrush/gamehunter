import { useState, useEffect } from 'react';

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'

import '../pagescss/create.css'

const Create = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  return (
    <>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='create-page'>
        <p>Create an event</p>
      </div>
    </>
  )
}

export default Create
