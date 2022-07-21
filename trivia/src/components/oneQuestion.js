import { useState } from 'react'

export default function OneQuestion (props)
{
    const firstQuestion = props.question
    console.log(firstQuestion)
return(
    <div> 
    {firstQuestion && 
        <div>
            {firstQuestion.question}
            <div>
            <button></button>
            <button></button>
            <button></button>

            </div>
        </div>}

    <h1> one question</h1>

    </div>
)

}