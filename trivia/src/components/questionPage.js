import { useState } from 'react'
import OneQuestion from './oneQuestion'
import NextQuestion from './nextQuestion'

export default function QuestionPage ({triviaQuestions, correctAnswerBank}){

    const [start, setStart] = useState(true)
    const [index, setIndex] = useState(0)
    const [nextQuestion, setNextQuestion]= useState(false)


    const oneQuestion = () =>{
        setStart(triviaQuestions[{index}])
        }

    const handleNext = () => {
        console.log(`index is ${index}`)
        let nextIndex = index+1
        console.log(`next index is ${nextIndex}`)
        setIndex({nextIndex})
        setNextQuestion(true)
    }

return(

    <div>
    { start ? (<div>
        <OneQuestion index={index} questions ={triviaQuestions}/>
    </div>) : ("Goodbye") }

    {nextQuestion ? (<div>
        <NextQuestion question ={triviaQuestions[+1]}/>
    </div>):("")}

    <button onClick={()=>handleNext()}> Next question </button>
    {/* <button onClick={() => shuffleButtons()}> shuffle buttons</button>
    <div key = {triviaQuestions.id}>
    {triviaQuestions.map ((question)=> (
        <div key ={question.question}>
        <p key={question.question}> {question.question}</p>
    {answered ? <>
        <div className ="buttons" key ={question.correct_answer}>
        <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={question.correct_answer}>{question.correct_answer}</button>
        {question.incorrect_answers.map((answer) => (
            <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>
    </> :('')}
        </div>
    ))}
    </div> */}

    </div>
)
}