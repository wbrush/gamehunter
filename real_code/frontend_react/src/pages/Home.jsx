import { useState, useEffect, useRef } from 'react';
import Header from '../components/header/header'
import Modal from '../components/modal/modal'
import Carousel from '../components/carousel/carousel';

const Home = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const initialMount = useRef(true)
  const [sports, setSports] = useState([
    {
        id: 'volleyball',
        title: 'Volleyball',
        events: []
    },
    {
        id: 'basketball',
        title: 'Basketball',
        events: []
    },
    {
        id: 'pickleball',
        title: 'Pickleball',
        events: []
    },
    {
        id: 'tennis',
        title: 'Tennis',
        events: []
    }
])

  useEffect(() => {
    if (initialMount.current) {
      try {
        fetch ('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((data) => {
          filterData(data)
        })
      } catch (error) {
        console.error(error)
      }

      initialMount.current = false
    }
  }, [])
    
  const filterData = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const tempDateArray = []

    data.forEach(element => {
      const elementDate = new Date(element.date).valueOf()

      element.date = element.date.split('T')

      if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])
        tempDateArray.push(element)

        setSports(sports.map(sport => {
          if (element.sport.toLowerCase() == sport.id) {
            sport.events.push(element)
            return {...sport}
          } else {
            return sport
          }
        }))
      } //else {deleteQuery()} deletes past events
    })
  }

  const formatTime = (time) => {
    time = time.split(':')
    time.pop()

    if (time[0] > 12) {
      time[0] = Number(time[0]) - 12
      time[1] += ' PM'
    }else if (time[0] == 12 && time[1] > 0) {
      time[1] += ' PM'
    } else {
      time [1] += ' AM'
    }
    
    return time.join(':')
  }
  
  const formatDate = (date) => {
    date = date.split('-')
    date = date[1] + '/' + date[2]
    return date
  }

  return (
    <div>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      <Carousel sports={sports} />
    </div>
  )
}

export default Home
