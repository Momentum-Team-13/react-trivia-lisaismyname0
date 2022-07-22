import { useState, useEffect } from 'react'

export default function OneQuestion ({index, questions, correctAnswerBank, setIndex})
{
    console.log(index, questions)
    let currentQuestion= questions[index]
    console.log(currentQuestion)

    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [shuffled, setShuffled] = useState(false)

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setUserAnswerBank(temporaryBank)
        seeIfCorrect(userAnswer)
    }

    const handleNext = () => {
        console.log(correctAnswerBank.length)
        setCorrect(false)
        setIncorrect(false)
        setIndex()
    }

    const seeIfCorrect=(userAnswer)=>{
        if(userAnswer === currentQuestion.correct_answer){
            setCorrect(true)
        } else {
            setIncorrect(true)
        }
    }

    const shuffleButtons = () => {
    let buttons = document.getElementsByClassName('answerButton')
    for (let i = 0; i < buttons.length; i++){
        let target = Math.floor(Math.random() * buttons.length -1) + 1;
        let target2 = Math.floor(Math.random() * buttons.length -1) +1;
        buttons[target].before(buttons[target2]);
    }}

    shuffleButtons()

return(
    <div> 
    <br/>
    {currentQuestion && 
        <div className="question" key = {currentQuestion.question}>
            {currentQuestion.question}
        <div>
        <br/>
        {!answered ? (""): (
            <div className ="buttons" key ={currentQuestion.correct_answer}>
        <div className="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={currentQuestion.correct_answer}>{currentQuestion.correct_answer}</div>
        {currentQuestion.incorrect_answers.map((answer) => (
            <div className="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </div>
        ))}</div>)}
            </div>
        </div>}

    <div>{correct ? ("You chose the correct answer!"):("")}</div>

    {incorrect ? (<div>
Sorry the correct answer was: {currentQuestion.correct_answer} 
    </div>): ("")}
    <br/>
    <br/>
    <div className="nextButton">
    <QuestionCount questionCount={index+1} correctAnswerBank={correctAnswerBank}/>
    <button onClick={()=>handleNext()}> Next question </button>
    </div>
    </div>    
)

}

const QuestionCount = ({questionCount, correctAnswerBank}) => {
    let totalQuestions = correctAnswerBank.length
    return (
        <div> Question {questionCount} out of {totalQuestions}</div>
    )
}
