
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import {List} from '@mui/material'
import AddRecipe from './AddRecipe.js'


function RecipeList() {
  const [recipeList, setRecipeList] = useState([])

  const refreshRecipeList = () => {
    let data;
    axios.get('http://localhost:8000/recipes/')
    .then(res => {
      data = res.data;
      console.log(data)
      setRecipeList(data)
    })
    .catch(err => { })
  };

  useEffect(() => {
    refreshRecipeList()
  }, []);

  return (
    <div>
      {recipeList.map((output, id) => (
        <div key={id}>
          <div>
            <Typography variant="h3">{output.name}</Typography>
            <Typography variant="h6">{output.description}</Typography>
          </div>
        </div>
      ))}
      <AddRecipe onRecipeListChange={refreshRecipeList} trigger={true}>
          <Typography variant="h4">Add Recipe</Typography>
      </AddRecipe>
    </div>
  )
}

export default RecipeList;
