import { useState, useEffect, useRef } from 'react';

import Header from '../components/header/header';
import Modal from '../components/userModal/modal';
import Hero from '../components/hero/hero';
import Calendar from '../components/calendar/calendar';

import { filterData, getFetchRequest } from '../utils/functions';

import '../pagescss/home.css'

const Home = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  const initialMount = useRef(true)
  const [dataReturned, setDataReturned ] = useState(null);

  useEffect(() => {
    if (initialMount.current) {
      fetchRequest()

      initialMount.current = false
    } else {
      filterData(dataReturned)
    }
  }, [dataReturned])

  const fetchRequest = async () => {
    const response = await getFetchRequest('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport')
    setDataReturned(response)
  }

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
