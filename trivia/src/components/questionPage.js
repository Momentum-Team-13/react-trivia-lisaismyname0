import { useState } from 'react'
import OneQuestion from './oneQuestion'

export default function QuestionPage ({triviaQuestions, correctAnswerBank}){

    const [start, setStart] = useState(true)
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

return(

    <div>
    { start ? (<div>
        <Index index={index}/>
        <OneQuestion index={index} questions ={triviaQuestions} setIndex={() => setIndex(index+1)} correctAnswerBank={correctAnswerBank}/>
    </div>) : ("Goodbye") }

    </div>
)
}

const Index = ({index}) => {
    return(
    <></>

    )
}