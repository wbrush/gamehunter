import { useState, useEffect, useRef } from 'react';

import Header from '../components/header/header'
import Modal from '../components/userModal/modal'
import Carousel from '../components/carousel/carousel';

import { filterData, getFetchRequest } from '../utils/functions';

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
    <div>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      <Carousel events={dataReturned} />
    </div>
  )
}

export default Home
