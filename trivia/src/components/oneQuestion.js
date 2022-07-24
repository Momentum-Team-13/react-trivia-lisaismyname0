import { useState, useEffect } from 'react'
import he from 'he'

export default function OneQuestion ({index, questions, correctAnswerBank, setIndex, shuffleButtons,})
{
    // console.log(index, questions)
    const currentQuestion= questions[index]
    
    const [answered, setAnswered] = useState(true)
    const [userAnswerBank, setUserAnswerBank]= useState([])
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [nextButton, setNextButton] = useState(true)
    const [shuffled, setShuffled] = useState(false)
    const [decoded, setDecoded] = useState(false)
    const [possibleAnswers, setPossibleAnswers] = useState([])

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setUserAnswerBank(temporaryBank)
        seeIfCorrect(userAnswer)
    }
    
    const handleNext = () => {
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

    shuffleButtons()
    
    const decodeHtml =()=>{
        const decodedQuestion = he.decode(currentQuestion.question)
        // const answers = currentQuestion.map((question))
        console.log(decodedQuestion)
        // const decodedAnswers = he.decode(currentQuestion)
        setDecoded(true)
    }
    
    
    return(
        <div className="card"> 
    <br/>
    {currentQuestion && 
        <div className="question" key = {currentQuestion.question}>
            {currentQuestion.question}
        <div>

        {possibleAnswers && !answered ? (""): (<div> <BuildAnswerBank currentQuestion={currentQuestion} handleUserAnswer = {handleUserAnswer} setPossibleAnswers={()=> setPossibleAnswers(possibleAnswers)} /> </div>)}
            </div>
        </div>}

    <div>{correct ? ("You chose the correct answer!"):("")}</div>


    {incorrect ? (<div>
Sorry the correct answer was: {currentQuestion.correct_answer} 
    </div>): ("")}
    <br/>
    <br/>
    <div className="nextButton">
    <QuestionCount questionCount={index+1} correctAnswerBank={correctAnswerBank} handleNext={handleNext} userAnswerBank={userAnswerBank}/>
    </div>
    </div>    
)
}

const QuestionCount = ({questionCount, correctAnswerBank, setNextButton, nextButton, handleNext, userAnswerBank}) => {
    let totalQuestions = correctAnswerBank.length

    if(userAnswerBank.length === totalQuestions){ return (
        <div>
            <FinalPage userAnswerBank={userAnswerBank} correctAnswerBank={correctAnswerBank}/>
        </div>
    )}

    if (questionCount === totalQuestions){
        return (<div> 
        Final Question</div>)
    } else {
    return (
        <div> Question {questionCount} out of {totalQuestions}
            { !nextButton ? (<button onClick={()=>handleNext()}> Next question </button>): ("final")}</div>
    )
}}

const FinalPage = ({userAnswerBank, correctAnswerBank}) => {
    return(
        <div>
        <div>
        <strong>These were your answers</strong> {userAnswerBank}</div>
        <div>
        <br/>
        <strong>These were the correct answers</strong> {correctAnswerBank}
        </div></div>
    )
}

const BuildAnswerBank  = ({currentQuestion, handleUserAnswer, possibleAnswers, setPossibleAnswers,}) =>{

    let correct = currentQuestion.correct_answer
    let incorrects = currentQuestion.incorrect_answers
    possibleAnswers = []
    possibleAnswers = possibleAnswers.concat(correct)
    possibleAnswers = possibleAnswers.concat(incorrects)
    setPossibleAnswers(possibleAnswers)
    return(
        <div>
    <div className ="buttons" key ={currentQuestion.correct_answer}>
    <div className="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={currentQuestion.correct_answer}>{currentQuestion.correct_answer}</div>
    {currentQuestion.incorrect_answers.map((answer) => (
        <div className="answerButton" onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </div>
    ))}

</div></div>
    )
}