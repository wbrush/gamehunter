import { useState } from 'react';

import Header from '../components/header/header';
import Modal from '../components/userModal/modal';
import Hero from '../components/hero/hero';
import Calendar from '../components/calendar/calendar';

import '../pagescss/home.css'

const Home = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  return (
    <div className='homepage'>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      
      <div className='homepage-content'>
        <Hero />
        <Calendar />
      </div>
    </div>
  )
}

export default Home
