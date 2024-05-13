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

function listData(query) {
    let endpoint = '/api/v1/sport'
    
    if (query) {
        endpoint += query
    }
    
    console.log(`sending request to ${sports_mgr_hostname, endpoint}`)
    try {
        fetch(sports_mgr_hostname + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => renderListData(data))
    } catch (error) {
        console.log(error)
    }
}

function renderListData(data) {
    console.log('Returned data:', data)
    const container = document.querySelector('.data-container')
    container.innerHTML = ''
    
    data.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('container')
        const h2 = document.createElement('h2')
        h2.classList.add('container-title')
        h2.innerHTML = element.sport + ' Signup for ' + element.date
        
        const content = renderData(element)

        div.appendChild(h2)
        div.appendChild(content)

        container.appendChild(div)
    })
}

function renderData(element) {
    const div = document.createElement('div')
    div.classList.add('content')

    const location = document.createElement('p')
    location.innerHTML = 'Location: ' + element.location
    div.appendChild(location)
    
    const date = document.createElement('p')
    date.innerHTML = 'Time: ' + element.time
    div.appendChild(date)

    return div
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
