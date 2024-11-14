import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

function App() {
  const initialMount = useRef(true)
  const [filteredEvents, setFilteredEvents] = useState([])

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
    const tempArr = []

    data.forEach(element => {
      const elementDate = new Date(element.date).valueOf()
      element.date = element.date.split('T')

      
      if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])
        tempArr.push(element)
      } //else {deleteQuery()} deletes past events
    })
    setFilteredEvents(tempArr)
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
    <Outlet context={filteredEvents}/>
  );
}

export default App;
