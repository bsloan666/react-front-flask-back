import React, { useState } from 'react'
import Switch from "react-switch";

import NewEntryForm from '../Shared/NewEntryForm'
import './SingleYear.css'


const SingleYear = () => {
    const [year, setYear] = useState()
    const [inputList, setInputList] = useState([{
        parameterName: '',
        parameterVal: '',
        stackNumber: '',
    }])
    const [subsample, setSubsample] = useState(false)
    const [data, setData] = useState('')
    const [comboboxVal, setComboboxVal] = useState()

    const handleChange = (e, index) => {
        const { name, value } = e.target
        console.log('Name according to handle change: ', name)
        const list = [...inputList]
        list[index][name] = value;

        setInputList(list)
    }

    const changeHandlerAuto = (e, i) => {
        const value = e.target.textContent
        setComboboxVal(value)
        console.log('This is from the parent component, value: ', comboboxVal)

        const list = [...inputList]
        list[i]['parameterName'] = value;

        setInputList(list)
    }

    const handleAddInput = () => {
        setInputList([...inputList,
        {
            parameterName: '',
            parameterVal: '',
            stackNumber: ''
        }])
    }

    const handleRemoveInput = (index) => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }

    const handleYearChange = (e) => {
        setYear(e.target.value)
    }

    const handleSwitchChange = () => {
        const abc = !subsample
        setSubsample(abc)
        console.log(subsample)
    }

    async function runModel() {
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
                'args': inputList,
                'subsample': subsample,
                'year': year
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
            <h2> Single Year Model Run {year} </h2>
            {subsample === true && <h4> Running on PUF Subsample </h4>}
            {/* <p> <i> Simulation Year: {year} </i> </p> */}
            <div>
                <input
                    type="number"
                    placeholder="Simulation Year"
                    onChange={handleYearChange}
                    maxlength='4'
                    size='4'
                />
            </div>
            {inputList.map((item, i) => {
                return (
                    <div key={i} className='box'>
                        <NewEntryForm
                            type='text'
                            name='parameterName'
                            placeholder='Parameter Name'
                            className='spacing-mr'
                            value={item.parameterName}
                            // onChange={e => handleChange(e, i)}
                            changeHandlerAuto={e => changeHandlerAuto(e, i)}>
                        </NewEntryForm>
                        <input
                            type='number'
                            name='parameterVal'
                            placeholder='Parameter Value'
                            className='spacing-mr'
                            value={item.parameterVal}
                            onChange={e => handleChange(e, i)}
                        />
                        <input
                            name='stackNumber'
                            placeholder='Stack Number'
                            className='spacing-mr'
                            value={item.stackNumber}
                            maxlength='3'
                            size='4'
                            onChange={e => handleChange(e, i)}
                        />
                        {inputList.length !== 1 && <input
                            type='button'
                            value='Remove'
                            className='spacing-mr'
                            onClick={() => handleRemoveInput(i)}
                        />}
                        {inputList.length - 1 === i && <input
                            type='button'
                            value='Add'
                            className='spacing-mr'
                            onClick={handleAddInput}
                        />} <br />
                    </div>)
            })}
            <br />
            <Switch
                onChange={handleSwitchChange}
                checked={subsample}
                onColor='#0394FF'
            />
            <br />
            < button onClick={runModel}> Run Model </button>
            <div className='dataOutput'>
                <pre > {data} </pre>
            </div>

            {/* < pre >
                {JSON.stringify(inputList, null, 2)}
            </pre> */}
        </div >
    )
}

export default SingleYear
