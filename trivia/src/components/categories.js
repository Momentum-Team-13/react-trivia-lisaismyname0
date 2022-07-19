import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Categories(){
    const [categories, setCategories] = useState([])
    useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then((res) => setCategories(res.data.trivia_categories))
    console.log(categories)
    },[])
    return (
    <>
    <p>Choose a Category:</p>
    <select onChange={(e)=> console.log(e.target.value)}>
    {categories.map((category) => (
        <option key= {category.id} value = {category.name}> {category.name}</option>
    ))}
    </select>
    </>);
}
