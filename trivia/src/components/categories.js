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
    const [answered, setAnswered] = useState(true)

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
        setAnswered(true)
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
        .then((res) => {
            setTriviaQuestions(res.data.results)
            makeCorrectAnswerBank(res.data.results)})
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

    { selectedCategory? 

    
    (<QuestionPage correctAnswerBank={correctAnswerBank} triviaQuestions={triviaQuestions}/>) : ("")}


    </>
    );

}
