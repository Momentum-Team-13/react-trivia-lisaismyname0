import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Categories(){
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryURL, setCategoryURL] = useState(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [userAnswerBank, setUserAnswerBank] = useState([])
    const [correctAnswerBank, setCorrectAnswerBank] = useState([])

    const handleSelectedCategory=(props)=>{
    // this creates the URL based off of the ID of the category
        let categoryID = props
        setSelectedCategory(categoryID)
        setCategoryURL(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
    }

    const makeCorrectAnswerBank = (props) =>{
        let triviaQuestions = props
        let correctAnswers = triviaQuestions.map ((question)=> (question.correct_answer
        ))
        setCorrectAnswerBank(correctAnswers)
    }

    const handleUserAnswer = (props) =>{
        let userAnswer = props
        let temporaryBank = userAnswerBank.concat(userAnswer)
        setUserAnswerBank(temporaryBank)
    }

    useEffect(() => {
        // to make ajax call that will return list of trivia categories that i will then use to populate my dropdown menu
        axios
        .get('https://opentdb.com/api_category.php')
        .then((res) => setCategories(res.data.trivia_categories))
    },[])

    useEffect(() => {
        // making an ajax call that uses the value of the selectedCategory as a part of the url
        axios
        .get(categoryURL)
        .then((res) => setTriviaQuestions(res.data.results))
    },[categoryURL])

    useEffect(() => {
    // making another ajax call to get the correct answers from the chosen category to make the correct answer array
    axios
    .get(categoryURL)
    .then((res) => makeCorrectAnswerBank(res.data.results))
    },[categoryURL])

    return (
    <>
    <p>Choose a Category:</p>
    <select onChange={(e)=> handleSelectedCategory(e.target.value)}>
    <option key="choose an option"> Select A Category</option>
    {categories.map((category) => (
        <option key= {category.id} value = {category.id} id={category.id}> {category.name}</option>
    ))}
    </select>

    {triviaQuestions ? 
    
    <div key = {triviaQuestions.id}>
    {triviaQuestions.map ((question)=> (
        <div key ={question.question}>
{/* 
        {correctAnswerBank.push(question.correct_answer)} */}

        <p key={question.question}> {question.question}</p>
        <div className ="buttons" key ={question.correct_answer}>
        <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={question.correct_answer}>{question.correct_answer}</button>
        {question.incorrect_answers.map((answer) => (
            <button onClick={(e)=> handleUserAnswer(e.target.textContent)} key={answer.incorrect_answers}>{answer} </button>
        ))}</div>
        </div>
    ))}
    </div>: ("")}
    </>
    );

}
