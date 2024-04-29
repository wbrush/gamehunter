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

var basepath = "http://localhost/api/v1/db"
var sports_mgr_hostname = "https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app"

function listData() {
    console.log("sending request to gh-sport-mgr")
    try {
        fetch('https://gh-sport-mgr-rz6q3h2zna-uc.a.run.app/api/v1/db', {
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
    console.log(data)
    const container = document.querySelector('.data-container')
    container.innerHTML = ''
    
    data.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('container')
        const h2 = document.createElement('h2')
        h2.classList.add('container-title')
        h2.innerHTML = element.sport + ' Signup for '
        const content = renderData(element)

        div.appendChild(h2)
        div.appendChild(content)

        container.appendChild(div)
    })
}

function renderData(element) {
    const div = document.createElement('div')
    div.classList.add('content')

    const p = document.createElement('p')
    p.innerHTML = 'Location: ' + element.location

    div.appendChild(p)

    return div
}
