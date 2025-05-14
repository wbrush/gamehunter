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

  const calendarRef = useRef(null)

  const tempData = [
    {
      title: 'Open Gym',
      start: '2025-05-15T18:00:00',
      end: '2025-05-15T21:00:00',
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
      start: '2025-05-18T18:00:00',
      end: '2025-05-18T21:00:00',
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
    const response = await getFetchRequest('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/sport')
    const filtered = filterData(response)
    // console.log(filtered)
  }

  const handleEventClick = (info) => {
    window.scrollTo({top:0})
    setCalendarModalVisibility(true)
    setClickedEventInfo(info._def.extendedProps)
  }

  // const handleViewChange = (method) => {
  //   if (method === 'week') {
  //     calendarRef.current.getApi().changeView('timeGridWeek')
  //   } else {
  //     calendarRef.current.getApi().changeView('dayGridMonth')
  //   }
  // }

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
          // customButtons={{
          //   monthly: {
          //     text: 'month',
          //     click: () => handleViewChange('month')
          //   },
          //   weekly: {
          //     text: 'week',
          //     click: () => handleViewChange('week')
          //   }
          // }}
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
          eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
          ref={calendarRef}
        />
      </div>

      <CalendarModal modalVisibility={calendarModalVisibility} setModalVisibility={setCalendarModalVisibility} info={clickedEventInfo} />
    </>
  )
}

export default Calendar
