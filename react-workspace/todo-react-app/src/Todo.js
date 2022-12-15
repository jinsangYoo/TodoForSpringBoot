import React, { useState } from 'react'
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'

const Todo = (props) => {
  const [item, setItem] = useState(props.item)
  const [readOnly, setReadOnly] = useState(true)
  const editItem = props.editItem
  const deleteItem = props.deleteItem
  const deleteEventHandler = () => {
    deleteItem(item)
  }
  const turnOnReadOnly = (e) => {
    if (e.key === 'Enter' && readOnly === false) {
      setReadOnly(true)
      editItem(item)
    }
  }
  const turnOffReadOnly = () => {
    setReadOnly(false)
  }
  const editEventHandler = (e) => {
    setItem({ ...item, title: e.target.value })
  }
  const checkboxEventHandler = (e) => {
    item.done = e.target.checked
    editItem(item)
  }

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ 'aria-label': 'naked', readOnly: readOnly }}
          type='text'
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label='Delete Todo' onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Todo
