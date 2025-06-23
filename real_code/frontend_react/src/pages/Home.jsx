import { useState, useEffect } from 'react';
import { filterData, getFetchRequest } from '../utils/functions';

import Header from '../components/header/header';
import Modal from '../components/userModal/modal';
import Hero from '../components/hero/hero';
import Calendar from '../components/calendar/calendar';
import EventList from '../components/eventList/list';
import Footer from '../components/footer/footer';

import '../pagescss/home.css'
import Form from '../components/createForm/form';

const Home = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  
  const [calendarVisibility, setCalendarVisibility ] = useState(false);
  const [events, setEvents] = useState();
  const [eventsLength, setEventsLength] = useState(4);

  const [createFormVisibility, setCreateFormVisibility] = useState(false)

  useEffect(() => {
    fetchRequest()
  }, [])

  const fetchRequest = async () => {
    const response = await getFetchRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/events/')
    const filtered = filterData(response)
    
    setEvents(filtered)
  }

  return (
    <div className='homepage'>
      <Header modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} setModalDisplay={setModalDisplay} />
      <Modal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      
      <div className='homepage-content'>
        <Hero formVisibility={createFormVisibility} setFormVisibility={setCreateFormVisibility} />

        <div className="create-event">
          {createFormVisibility ? (
            <>
              <Form form='open' />
              <div id="divider" />
              <Form form='reserve' />
            </>
          ) : null}
        </div>

        <div className='upcoming-event-section'>
          <div className="section-header">
            <h1>Upcoming Events</h1>
          </div>

          <EventList eventList={events} length={eventsLength} />

          <div className="upcoming-cta-buttons">
            <button onClick={() => setEventsLength(eventsLength + 4)}>See more events</button>
            {calendarVisibility ? <button onClick={() => setCalendarVisibility(!calendarVisibility)}>Hide full calendar</button> : <button onClick={() => setCalendarVisibility(!calendarVisibility)}>See full calendar</button>}
          </div>
        </div>

        {calendarVisibility ? <Calendar eventList={events} /> : null}

        <div className='about-section'>
          <div className="section-header">
            <h1>About Us</h1>
          </div>

          <p><span id='whitespace'>span</span>At GameHunter, we believe that sports and fitness have the power to transform lives. Since 2025, we've been dedicated to creating dynamic, inclusive, and high-performance environments where athletes of all levels can train, compete, and thrive.</p>
          <p><span id='whitespace'>span</span>Whether you're a professional athlete, a weekend warrior, or just starting your fitness journey, our state-of-the-art facilities and expert staff are here to support your goals. With both indoor/outdoor courts and youth programs, we offer everything you need to perform at your best.</p>
        </div>

        <Footer />

      </div>
    </div>
  )
}

export default Home
