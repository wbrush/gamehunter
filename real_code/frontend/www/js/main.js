/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sports_mgr_hostname = "https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app"
const user_mgr_hostname = "https://gh-user-mgr-462896897923.us-central1.run.app"
const event_mgr_hostname = ''

let nextButton
let prevButton

function loadHomepage() {
    nextButton = document.getElementById('next')
    prevButton = document.getElementById('prev')
    
    nextButton.onclick = function() {
        showSlider('next')
    }

    prevButton.onclick = function() {
        showSlider('prev')
    }
}

const timeRunning = 3000
const timeAutoNext = 7000
let runTimeOut
let runAutoRun = setTimeout(() => {
    nextButton.click()
}, timeAutoNext)

function showSlider(type) {
    const carousel = document.querySelector('.carousel')
    const listItem = document.querySelector('.carousel .list')
    const thumbnail = document.querySelector('.carousel .thumbnail')

    let itemSlider = document.querySelectorAll('.carousel .list .item')
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item')

    if (type === 'next') {
        listItem.appendChild(itemSlider[0])
        thumbnail.appendChild(itemThumbnail[0])
        carousel.classList.add('next')
    } else {
        const positionLastItem = itemSlider.length - 1
        listItem.prepend(itemSlider[positionLastItem])
        thumbnail.prepend(itemThumbnail[positionLastItem])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)

    clearTimeout(runAutoRun)
    runAutoRun = setTimeout(() => {
        nextButton.click()
    }, timeAutoNext)
}

function listData(query) {
    let endpoint = '/api/v1/sport'
    
    if (query) {
        endpoint += query
    }
    
    console.log(`sending request to ${sports_mgr_hostname}`)
    try {
        fetch(sports_mgr_hostname + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            renderListData(data)
        })
    } catch (error) {
        console.log(error)
    }
}

function renderListData(data) {
    const volleyballEvents = []
    const basketballEvents = []
    const pickleballEvents = []
    const tennisEvents = []

    data.forEach(element => {
        if (element.sport === 'volleyball' && volleyballEvents.length <= 5) {
            volleyballEvents.push(element)
            renderData(volleyballEvents)
        } else if (element.sport === 'basketball' && basketballEvents.length <= 5) {
            basketballEvents.push(element)
            renderData(basketballEvents)
        } else if (element.sport === 'pickleball' && pickleballEvents.length <= 5) {
            pickleballEvents.push(element)
            renderData(pickleballEvents)
        } else if (element.sport === 'tennis' && tennisEvents.length <= 5){
            tennisEvents.push(element)
            renderData(tennisEvents)
        }
    })
}

function renderData(events) {
    const createItemDiv = document.createElement('div')
    createItemDiv.classList.add('item')

    events.forEach(event => {
        createItemDiv.innerHTML = ''
        const sliderList = document.querySelector(`.upcoming-events.${event.sport} .slider .list`)

        const dateElement = document.createElement('h1')
        const locationElement = document.createElement('p')
        const timeElement = document.createElement('p')

        let formatDate = event.date.split('T')[0].split('-')
        formatDate = formatDate[1] + '/' + formatDate[2]
        dateElement.innerHTML = `${formatDate}`
        createItemDiv.appendChild(dateElement)
        
        locationElement.innerHTML = event.location
        createItemDiv.appendChild(locationElement)

        let formatTime = event.date.split('T')[1].split(':')
        if (Number(formatTime[0]) > 12) {
            formatTime[0] = Number(formatTime[0]) - 12
            formatTime[2] = 'PM'
        } else {
            formatTime[2] = 'AM'
        }
        formatTime = formatTime[0] + ':' + formatTime[1] + ' ' + formatTime[2]
        timeElement.innerHTML = `${formatTime}`
        createItemDiv.appendChild(timeElement)

        sliderList.appendChild(createItemDiv)
    })
}

function search() {
    const date = $('#datepicker').val()
    const sport = $('#selection').val()
    const location = $('#location').val()
    let query = {}
    
    if (!date || !sport || !location) {
        alert('Please fill out all search parameters')
    } else {
        query = `?sport=${sport}&location=${location}&date=${date}`
    }
    
    listData(query)
}

async function signup() {
    name = document.getElementById('signup-name').value
    email = document.getElementById('signup-email').value
    password = document.getElementById('signup-password').value
    document.querySelector('.sform-error').id = 'hidden'
    document.querySelector('.signup-error').id = 'hidden'
    
    const endpoint = '/api/v1/signup'
    
    if (name && email && password) {
        console.log(`sending signup request to ${user_mgr_hostname}`)
        
        await fetch(user_mgr_hostname + endpoint, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.result) {
                // Clear form and hide modal on successful signup
                const form = document.querySelector('.signup')
                form.reset()
                document.querySelector('.user-modal').id = 'hidden'
            } else {
                document.querySelector('.signup-error').id = ''
            }
        })
    } else {
        document.querySelector('.sform-error').id = ''
    }
}

async function login() {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    document.querySelector('.lform-error').id = 'hidden'
    document.querySelector('.login-error').id = 'hidden'
    
    const endpoint = '/api/v1/login'
    
    if (email && password) {
        console.log(`sending login request to ${user_mgr_hostname}`)

        await fetch(user_mgr_hostname + endpoint, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.result) {
                // Clear form and hide modal on successful login
                const form = document.querySelector('.login')
                form.reset()
                document.querySelector('.user-modal').id = 'hidden'
            } else {
                document.querySelector('.login-error').id = ''
            }
        })
    } else {
        document.querySelector('.lform-error').id = ''
    }
}

function displayLogin() {
    // display modal
    document.querySelector(".user-modal").id = ""
    
    // display login info
    document.querySelector(".signup").id = "hidden"
    document.querySelector(".login").id = ""

    // disable scrolling when modal is open
    document.getElementById("scroll-body").style.overflow = "hidden"
}

function displaySignup() {
    // display modal
    document.querySelector(".user-modal").id = ""
    
    // display signup info
    document.querySelector(".signup").id = ""
    document.querySelector(".login").id = "hidden"
    
    // disable scrolling when modal is open
    document.getElementById("scroll-body").style.overflow = "hidden"
}

function formatDate(date) {
    const formattedDate = new Date(date).toLocaleString()
    return formattedDate
}

async function saveEvent(event, method) {
    const endpoint = `/api/v1/saveEvent`

    if (method == 'save') {
        console.log('save button', event.id, 'clicked')
        
        // change condition to is logged in when functional
        if (true) {
            console.log(`sending save request to ${event_mgr_hostname}`)
            
            // replace with session user id
            const user = 7

            await fetch(event_mgr_hostname + endpoint + '/save', {
                method: 'POST',
                body: JSON.stringify({ user_id: user, event_id: event.id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
        } else {
            alert('Please login to save events')
        }
    } else {
        console.log('signup button', e.id, 'clicked')
    }
}
