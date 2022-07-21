import { useState } from 'react'
import OneQuestion from './oneQuestion'

export default function QuestionPage ({triviaQuestions, correctAnswerBank}){

    const [start, setStart] = useState(true)
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)


    // const handleNext = () => {
    //     console.log(correctAnswerBank.length)
    //     setIndex(index + 1)
    //     setCorrect(false)
    //     setIncorrect(false)
    // }

return(

    <div>
    { start ? (<div>
        <Index index={index}/>
        <OneQuestion index={index} questions ={triviaQuestions} setIndex={() => setIndex(index+1)} correctAnswerBank={correctAnswerBank}/>
    </div>) : ("Goodbye") }

    {/* <button onClick={()=>handleNext()}> Next question </button> */}

    </div>
)
}

const Index = ({index}) => {
    return(
        <div>
            Index is currently {index}
        </div>
    )
}