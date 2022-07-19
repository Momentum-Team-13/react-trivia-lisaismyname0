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
    categories.map((category, index) => (
      <select>
        <option key= {category.name}>{category.id}: {category.name}</option>
      </select>
    ))
  );
}

export default App;
