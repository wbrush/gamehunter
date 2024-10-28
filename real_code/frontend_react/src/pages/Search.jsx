import { useState } from 'react';
import Header from '../components/header/header'
import Modal from '../components/modal/modal'

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
    })
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
    </div>
  )
}

export default Search
