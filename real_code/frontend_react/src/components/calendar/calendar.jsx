import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

import UserModal from '../userModal/modal';
import CalendarModal from './calendarModal/modal';

import { filterData, getFetchRequest } from '../../utils/functions';

import './calendar.css';

const Calendar = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('Login');
  const [calendarModalVisibility, setCalendarModalVisibility ] = useState(false);
  const [clickedEventInfo, setClickedEventInfo] = useState({});
  const [events, setEvents] = useState()

  const calendarRef = useRef(null)

  const tempData = [
    {
      title: 'Open Gym',
      start: '2025-05-30T07:00:00',
      end: '2025-05-30T11:00:00',
      extendedProps: {
        players: 10,
        title: 'Open Gym',
        startDate: '2025-05-15',
        endDate: '2025-05-15',
        startTime: '18:00:00',
        endTime: '21:00:00'
      }
    },
    {
      title: 'Reserved Court',
      start: '2025-05-27T18:00:00',
      end: '2025-05-27T21:00:00',
      extendedProps: {
        players: 8,
        title: 'Reserved Court',
        startDate: '2025-05-15',
        endDate: '2025-05-15',
        startTime: '18:00:00',
        endTime: '21:00:00'
      }
    },
  ]
  
  useEffect(() => {
    fetchRequest()
  }, [])

  const fetchRequest = async () => {
    const response = await getFetchRequest('https://gh-event-mgr-462896897923.us-central1.run.app/api/v1/events/')
    
    const temp = [
      {
        eventType: 'Open',
        startDate: new Date('2025-05-27T18:00:00'),
        endDate: new Date('2025-05-27T21:00:00')
      },
      {
        eventType: 'Reserve',
        startDate: new Date('2025-05-30T07:00:00'),
        endDate: new Date('2025-05-30T11:00:00')
      },
      {
        eventType: 'Open',
        startDate: new Date('2025-05-28T11:00:00'),
        endDate: new Date('2025-05-28T15:00:00')
      }
    ]
    const filtered = filterData(temp)
    console.log(filtered)
    
    // const filtered = filterData(response)
    // setEvents(filtered)
  }

  const handleEventClick = (info) => {
    window.scrollTo({top:0})
    setCalendarModalVisibility(true)
    setClickedEventInfo(info._def.extendedProps)
  }

  return (
    <>
      <UserModal modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />

      <div className='calendar'>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          headerToolbar={{
            start: 'dayGridMonth timeGridWeek',
            center: 'title',
            end: 'today prev next'
          }}
          views={['dayGridMonth', 'timeGridWeek']}
          initialView='dayGridMonth'
          firstDay={1}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric'
          }}
          slotDuration={'01:00'}
          contentHeight='auto'
          events={tempData}
          // events={events}
          eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
          ref={calendarRef}
        />
      </div>

      <CalendarModal modalVisibility={calendarModalVisibility} setModalVisibility={setCalendarModalVisibility} info={clickedEventInfo} />
    </>
  )
}

export default Calendar
