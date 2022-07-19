import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
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
    <select>
    {categories.map((category) => (
        <option key= {category.id} value ={category.name}> {category.name}</option>
    ))}
    </select>
  </>);
}

export default App;
