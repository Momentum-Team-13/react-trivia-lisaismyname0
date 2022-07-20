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

return(
    <div>
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