import { useState, useEffect } from 'react'

export default function OneQuestion (props)
{
    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])
    const [index, setIndex] = useState(0)

    const firstQuestion = props.question
    console.log(props)
    console.log(firstQuestion)

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setAnswered(true)
        setUserAnswerBank(temporaryBank)
    }

return(
    <div> 
    {firstQuestion && 
        <div>
            {firstQuestion.question}
            <div>
            <div className ="buttons" key ={firstQuestion.correct_answer}>
        <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={firstQuestion.correct_answer}>{firstQuestion.correct_answer}</button>
        {firstQuestion.incorrect_answers.map((answer) => (
            <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>
            </div>
        </div>}

    <h1> one question</h1>

    </div>
)

}