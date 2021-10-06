import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Add2 = () => {
    const [data, setData] = useState('')
    async function requestSum() {
        const response = await fetch("/app/add2", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'session_id': uuidv4(),
                'lhs': document.getElementById('lhs').value,
                'rhs': document.getElementById('rhs').value
            })
        })
            .then(response => response.json()
                .then(data => {
                    document.getElementById('session_id').value = data['session_id']
                    var intervalId = window.setInterval(function(){
                        requestUpdate();
                    }, 5000);
                    document.getElementById('interval_id').value = intervalId
                })
            )
    }
    async function requestUpdate() {
        const response = await fetch("/app/command_status", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'session_id': document.getElementById('session_id').value,
            })
        })
            .then(response => response.json()
                .then(data => {
                    if( data['output'] === ''){
                        // window.clearInterval(document.getElementById('interval_id').value)
                    }
                    else {
                        setData(data['output'])
                    }
                })
            )
    }
    return (
        <div>
            <h2> Add 2 Numbers </h2>
            <div>
                <input
                    type="number"
                    name="lhs"
                    id="lhs"
                    maxLength='4'
                    size='4'
                />
                +
                <input
                    type="number"
                    name="rhs"
                    id="rhs"
                    maxLength='4'
                    size='4'
                />
                <input
                    type="hidden"
                    name="session_id"
                    id="session_id"
                />
                <input
                    type="hidden"
                    name="interval_id"
                    id="interval_id"
                />
            </div>
            <br />
            < button onClick={requestSum}> Request Sum </button>
            <div className='dataOutput'>
                <pre > {data} </pre>
            </div>

            {/* < pre >
                {JSON.stringify(inputList, null, 2)}
            </pre> */}
        </div >
    )
}

export default Add2
