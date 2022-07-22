import { useState, useEffect } from 'react'
import axios from 'axios'
import QuestionPage from './questionPage'

export default function Categories(){
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryURL, setCategoryURL] = useState(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)

    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [userAnswerBank, setUserAnswerBank] = useState([])
    const [correctAnswerBank, setCorrectAnswerBank] = useState([])
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)
    const [difficultyURL, setDifficultyURL] = useState(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}`)

    const handleSelectedCategory=(props)=>{
    // this creates the URL based off of the ID of the category
        let categoryID = props
        setSelectedCategory(categoryID)
        setCategoryURL(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
        return {categoryID}
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

    // const handleSelectedDifficulty = (props, categoryID) =>{
    //     let difficultyLevel = props
    //     setSelectedDifficulty(difficultyLevel)
    //     setDifficultyURL(`https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficultyLevel}`)
    //     console.log(difficultyURL)
    // }

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
        .then((res) => {
            setTriviaQuestions(res.data.results)
            makeCorrectAnswerBank(res.data.results)})
    },[categoryURL])

    useEffect(() => {
        // making an ajax call that uses the value of the selectedCategory as a part of the url
        axios
        .get(difficultyURL)
        .then((res) => {
            setTriviaQuestions(res.data.results)
            makeCorrectAnswerBank(res.data.results)})
    },[difficultyURL])

    return (
    <div className='container'>
    <div className="categories">

    {/* <p>Choose a difficulty:</p>
    <select onChange={(e) => handleSelectedDifficulty(e.target.value)}>
        <option value=" "> Choose Your Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
    </select> */}

 Choose a category: 
    <select onChange={(e)=> handleSelectedCategory(e.target.value)}>
    <option key="choose an option"> Select A Category</option>
    {categories.map((category) => (
        <option key= {category.id} value = {category.id} id={category.id}> {category.name}</option>
    ))}
    </select>

    </div>



    {/* { selectedCategory &&  selectedDifficulty ? */}
    { selectedCategory ?

    (<div>
        <QuestionPage correctAnswerBank={correctAnswerBank} triviaQuestions={triviaQuestions}/></div>) : ("")}

    </div>
    );

}