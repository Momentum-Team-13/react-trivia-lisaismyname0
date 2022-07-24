import { useState } from 'react'
import OneQuestion from './oneQuestion'

export default function QuestionPage ({triviaQuestions, correctAnswerBank, shuffleButtons,}){


    const [start, setStart] = useState(true)
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    // const buildAnswerBank  = () =>{
    //     let currentQuestion = triviaQuestions[index]
    //     let correct = currentQuestion.correct_answer
    //     let incorrects = currentQuestion.incorrect_answers
    //     answerBank.concat(correct)
    //     answerBank.concat(incorrects)
    //     setAnswerBank(answerBank)
    // }

return(

    <div>
    { start ? (<div>
        <Index index={index}/>
        <OneQuestion index={index} questions ={triviaQuestions} setIndex={() => setIndex(index+1)} correctAnswerBank={correctAnswerBank} shuffleButtons={shuffleButtons}/>
    </div>) : ("Goodbye") }

    </div>
)
}

const Index = ({index}) => {
    return(
    <></>

    )
}