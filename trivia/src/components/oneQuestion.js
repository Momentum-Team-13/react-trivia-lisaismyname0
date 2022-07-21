import { useState, useEffect } from 'react'

export default function OneQuestion (props)
{

    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])
    const [index, setIndex] = useState(0)

    const firstQuestion = props.question
    console.log(props)
    console.log(firstQuestion)

    const shuffleButtons = () => {
        let buttons = document.getElementsById=('answerButton')
        console.log(buttons)
        for (let i = 0; i < buttons.length; i++){
            let target = Math.floor(Math.random() * buttons.length -1) + 1;
            let target2 = Math.floor(Math.random() * buttons.length -1) +1;
            console.log(buttons[target])
            console.log(buttons[target2]);
        }}

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setAnswered(true)
        setUserAnswerBank(temporaryBank)
    }
    shuffleButtons()
return(
    <div> 
    {firstQuestion && 
        <div>
            {firstQuestion.question}
        <div>
        {!answered ? (
""): (        <div className ="buttons" key ={firstQuestion.correct_answer}>
        <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={firstQuestion.correct_answer}>{firstQuestion.correct_answer}</button>
        {firstQuestion.incorrect_answers.map((answer) => (
            <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>)}
            </div>
        </div>}

    </div>
)

}