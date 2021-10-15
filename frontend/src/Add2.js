import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'

// DEBUG (should refer to app_server host)
let endPoint = "http://app_servver:5000/";

console.log("connecting...")
let socket = io.connect(`${endPoint}`);
var session_id = uuidv4();


const Add2 = () => {
    const [data, setData] = useState('')

    async function requestSum() {
        const response = await fetch("/app/add2", {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            credntials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'session_id': session_id,
                'lhs': document.getElementById('lhs').value,
                'rhs': document.getElementById('rhs').value
            })
        })
            .then(response => response.json()
                .then(result => {
                    console.log("sending session ID...")
                    document.getElementById('session_id').value = result['session_id']
                    socket.emit("message", JSON.stringify({"session_id":session_id, "lhs":result['lhs'], "rhs":result['rhs']}));
                })
            )
    }
    useEffect(() => {
        getMessages();
    }, [data.length]);

    const getMessages = () => {
        socket.on("message", function(msg) {
           document.getElementById('output_data').innerHTML += msg+'\n';
        });
    };

    socket.on("disconnect", function() {
        socket.disconnect(`${endPoint}`);
    });
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
            </div>
            <br />
            < button onClick={requestSum}> Request Sum </button>
            <br />
            <pre id="output_data">{data}</pre>
        </div >
    )
}

export default Add2
