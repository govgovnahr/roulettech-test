import './App.css'
import axios from 'axios'
import React from 'react'
import Typography from '@mui/material/Typography';
import RecipeList from './components/RecipeList.js'
import ChatWindowComponent from './components/ChatWindowComponent.js';
function App() {
  
  return (
    <div>
      <div className='main-body'>
        <Typography variant="h2">Recipes</Typography>
        <hr></hr>
        <RecipeList/>
        <Typography variant="h4">KangaBot</Typography>
        <ChatWindowComponent/>
      </div>
    </div>
  )
}
export default App;
