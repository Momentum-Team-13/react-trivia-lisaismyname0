import { useState } from 'react'
import OneQuestion from './oneQuestion'

export default function QuestionPage ({triviaQuestions, correctAnswerBank}){
    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])
    const [singleQuestion, setSingleQuestion] = useState(0)
    const [start, setStart] = useState(true)

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setAnswered(false)
        setUserAnswerBank(temporaryBank)
    }

    const oneQuestion = () =>{
        let firstQuestion = triviaQuestions[0]
        setStart(firstQuestion)
    }


    const shuffleButtons = () => {
        let buttons = document.getElementsByClassName("buttons")
        console.log(buttons)
        for (let i = 0; i < buttons.length; i++){
            let target = Math.floor(Math.random() * buttons.length -1) + 1;
            let target2 = Math.floor(Math.random() * buttons.length -1) +1;
            buttons[target].before(buttons[target2]);
        }

    }

return(

    <div>
    { start ? (<div>
        <OneQuestion question ={triviaQuestions[0]}/>
    </div>) : ("Goodbye") }


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