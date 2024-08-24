import React, {useState} from 'react'
import axios from 'axios';
import {
    TextField,
    Button,
    InputBase,
    IconButton,
    Paper,
    Input,
    Typography
} from '@mui/material'

import {
    Send
} from '@mui/icons-material'

function AddRecipe({onRecipeListChange}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleSend = async () => {
        axios.post('http://localhost:8000/recipes/', {
            name: name,
            description: description
        })
        .then (res => {
            console.log(res)
            onRecipeListChange()
        })
        .catch((error)=>console.log(error));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSend()
        setName('')
        setDescription('')
    }

    const handleKeyPressName = (event) => {
        console.log(event.target.value)
        setName(event.target.value)
        console.log(name)
    }

    const handleKeyPressDesc = (event) => {
        console.log(event.target.value)
        setDescription(event.target.value)
        console.log(description)
    }

    return (
        <div className="add-recipe">
            <Typography variant="h5">Add New Recipe:</Typography>
            <div className='inputRecipe'>
            <Input onChange={handleKeyPressName} placeholder="Recipe Name"/>
            <Input onChange={handleKeyPressDesc} placeholder="Recipe Description"/>
            <IconButton onClick={handleSubmit} aria-label='Send'><Send/></IconButton>
            </div>
        </div>
    );

}
export default AddRecipe