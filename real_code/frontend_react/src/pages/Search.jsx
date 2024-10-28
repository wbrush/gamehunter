import { useState } from 'react';
import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Hero from '../components/hero/hero'
import { Outlet } from 'react-router-dom'

const Search = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');

  try {
    fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        filterData(data)
    })
  } catch (error) {
    console.error(error)
  }

  const filterData = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const filteredEvents = []

    data.forEach(element => {
        const elementDate = new Date(element.date).valueOf()

        if (currentTimestamp < elementDate) {
          filteredEvents.push(element)
        } //else {deleteQuery()}
    })

    console.log(filteredEvents)
  }

  return (
    <div>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <Hero />

      <div className='search-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default Search
