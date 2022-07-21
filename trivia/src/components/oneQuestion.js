import { useState, useEffect } from 'react'

export default function OneQuestion ({index, questions})
{
    console.log(index, questions)
    let currentQuestion= questions[index]
    console.log(currentQuestion)
    // if(questions.question){
    // console.log(questions.question[{index}])}

    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])

    // const shuffleButtons = () => {
    //     let buttons = document.getElementsById=('answerButton')
    //     console.log(buttons)
    //     for (let i = 0; i < buttons.length; i++){
    //         let target = Math.floor(Math.random() * buttons.length -1) + 1;
    //         let target2 = Math.floor(Math.random() * buttons.length -1) +1;
    //         console.log(buttons[target])
    //         console.log(buttons[target2]);
    //     }}

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setAnswered(true)
        setUserAnswerBank(temporaryBank)
    }
    // shuffleButtons()
return(
    <div> 
    {currentQuestion && 
        <div>
            {currentQuestion.question}
        <div>
        {!answered ? (
""): (        <div className ="buttons" key ={currentQuestion.correct_answer}>
        <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={currentQuestion.correct_answer}>{currentQuestion.correct_answer}</button>
        {currentQuestion.incorrect_answers.map((answer) => (
            <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>)}
            </div>
        </div>}

    </div>
)

}