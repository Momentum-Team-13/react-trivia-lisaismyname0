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

return(
    <div> 
    {currentQuestion && 
        <div>
            {currentQuestion.question}
        <div>
        {!answered ? (""): (
            <div className ="buttons" key ={currentQuestion.correct_answer}>
        <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={currentQuestion.correct_answer}>{currentQuestion.correct_answer}</button>
        {currentQuestion.incorrect_answers.map((answer) => (
            <button id="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>)}
            </div>
        </div>}

    <div>{correct ? ("You chose the correct answer!"):("")}</div>

    {incorrect ? (<div>
Sorry the correct answer was: {currentQuestion.correct_answer} 
    </div>): ("")}

    <button onClick={()=>handleNext()}> Next question </button>
    </div>    
)

}