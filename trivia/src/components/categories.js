import { useState, useEffect } from 'react'
import axios from 'axios'
import TriviaPage from './triviaPage'

export default function Categories(){
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryURL, setCategoryURL] = useState(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
    const [triviaQuestions, setTriviaQuestions] = useState([])

    const handleSelectedCategory=(props)=>{
    // this creates the URL based off of the ID of the category
        let categoryID = props
        setSelectedCategory(categoryID)
        setCategoryURL(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
    }


    useEffect(() => {
        // to make ajax call that will return list of trivia categories that i will then use to populate my dropdown menu
        axios
        .get('https://opentdb.com/api_category.php')
        .then((res) => setCategories(res.data.trivia_categories))
    },[])

    useEffect(() => {
        // attempting to make ajax call that uses the value of the selectedCategory as a part of the url
        axios
        .get(categoryURL)
        .then((res) => setTriviaQuestions(res.data.results))
    },[categoryURL])
    console.log(categoryURL)
    return (
    <>
    <p>Choose a Category:</p>
    <select onChange={(e)=> handleSelectedCategory(e.target.value)}>
    {categories.map((category) => (
        <option key= {category.id} value = {category.id} id={category.id}> {category.name}</option>
    ))}
    </select>

    {triviaQuestions ? 
    
    <div>
    {triviaQuestions.map ((question)=> (
        <li key={question.question}> {question.question}
        <ul key={question.correct_answer}>{question.correct_answer}</ul>
        {question.incorrect_answers.map((answer) => (
            <ul key={answer.incorrect_answers}>{answer} </ul>
        ))}
        </li>
    ))}
    </div>: ("")}
    </>
    );

}
