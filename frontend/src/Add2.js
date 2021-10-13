import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'


let endPoint = "http://localhost:5000/";
let socket = io(`${endPoint}`,  { transports : ['websocket'] });


const Add2 = () => {
    const [data, setData] = useState('')
    async function requestSum() {
        // DEBUG
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
                .then(result => {
                    document.getElementById('session_id').value = result['session_id']
                })
            )
    }

    socket.on("message", msg => {
        setData(data + msg +'\n');
    });

    const doWebSock = () => {
      const  session_id= uuidv4()
      const lhs= document.getElementById('lhs').value
      const rhs= document.getElementById('rhs').value
      socket.emit("message", JSON.stringify({"lhs":lhs, "rhs":rhs, "session_id":session_id}));
    };

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
            < button onClick={doWebSock}> Web Socket </button>
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
