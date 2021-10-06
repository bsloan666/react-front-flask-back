import React, { useState } from 'react'
import Switch from "react-switch";


const Add2 = () => {
    async function requestSum() {
        const response = await new Promise(fetch("/tag/single_year", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                'lhs': document.getElementById('lhs').value,
                'rhs': document.getElementById('rhs').value
            })
        }))
            .then(response => response.json()
                .then(data => {
                    console.log('This is the data: ', data)
                    setData(data)
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
                    maxlength='4'
                    size='4'
                />
                +
                <input
                    type="number"
                    name="rhs"
                    id="rhs"
                    maxlength='4'
                    size='4'
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
