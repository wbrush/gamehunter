const filterData = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()

    data.forEach(element => {
        const elementDate = new Date(element.date).valueOf()

        element.date = element.date.split('T')

        if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])
      } //else {deleteQuery()} deletes past events
    })

    return data
}

const filterUserEvents = (data) => {
    const currentTimestamp = new Date(Date.now()).valueOf()
    const events = {
        upcoming: [],
        past: []
    }

    data.forEach(element => {
        const elementDate = new Date(element.date).valueOf()

        element.date = element.date.split('T')

        if (currentTimestamp < elementDate) {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])

        events.upcoming.push(element)
        } else {
        element.sport = element.sport.charAt(0).toUpperCase() + element.sport.slice(1)
        element.time = formatTime(element.date[1])
        element.date = formatDate(element.date[0])

        events.past.push(element)
        }
    })

    return events
}

const formatTime = (time) => {
    time = time.split(':')
    time.pop()

    if (time[0] > 12) {
        time[0] = Number(time[0]) - 12
        time[1] += ' PM'
    } else if (time[0] == 12 && time[1] > 0) {
        time[1] += ' PM'
    } else {
        time [1] += ' AM'
    }
    
    return time.join(':')
}

const formatDate = (date) => {
    date = date.split('-')
    date = date[1] + '/' + date[2] + '/' + date[0]
    return date
}

// GET Request
const getFetchRequest = async (url) => {
    const api = await fetch (url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const apijson = await api.json()
    return apijson
}

// GET Request for user events
const getEventRequest = async (url) => {
    const api = await fetch (url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    const apijson = await api.json()
    return apijson
}

// User POST Request
const postFetchRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': `${data.name}`,
            'email': `${data.email}`,
            'password': `${data.password}`
        })
    })

    const apiJson = await api.json()
    return apiJson
}

// Save/Remove Event POST Request
const postEventRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'userId': `${data.user}`,
            'eventId': `${data.event}`,
        })
    })

    const apiJson = await api.json()
    return apiJson
}

// Create Event POST Request
const postCreateEventRequest = async (url, data) => {
    const api = await fetch (url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const apiJson = await api.json()
    return apiJson
}

export { filterData, getFetchRequest, getEventRequest, postFetchRequest, postEventRequest, postCreateEventRequest, filterUserEvents, formatTime, formatDate }
