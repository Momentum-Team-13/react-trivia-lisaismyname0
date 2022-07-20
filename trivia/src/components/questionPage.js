import { useState } from 'react'

export default function QuestionPage ({triviaQuestions, correctAnswerBank}){
    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setAnswered(false)
        setUserAnswerBank(temporaryBank)
    }

    console.log(correctAnswerBank)

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
    <button onClick={() => shuffleButtons()}> shuffle buttons</button>
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
    </div>

    </div>
)
}