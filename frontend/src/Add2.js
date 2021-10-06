import React, { useState } from 'react'

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
                'lhs': document.getElementById('lhs').value,
                'rhs': document.getElementById('rhs').value
            })
        })
            .then(response => response.json()
                .then(data => {
                    console.log('This is the data: ', data)
                    setData(JSON.stringify(data))
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
