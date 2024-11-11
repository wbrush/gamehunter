import { useState, useEffect, useRef } from 'react';
import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import Carousel from '../components/carousel/carousel';
import { filterData } from '../utils/functions';

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
    const api = await fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    const apijson = await api.json()
    
    setDataReturned(apijson)
  }

  return (
    <div>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      <Carousel events={dataReturned} />
    </div>
  )
}

export default Home
