import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Todo from './Todo'
import {
  Container,
  List,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
} from '@mui/material'
import AddTodo from './AddTodo'
import { call, signout } from './service/ApiService'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    call('/todo', 'GET').then((response) => setItems(response.data))
  }, [])

  const addItem = (item) => {
    call('/todo', 'POST', item).then((response) => setItems(response.data))
  }
  const deleteItem = (item) => {
    call('/todo', 'DELETE', item).then((response) => setItems(response.data))
  }
  const editItem = (item) => {
    call('/todo', 'PUT', item).then((response) => setItems(response.data))
  }
  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent='space-between' container>
          <Grid item>
            <Typography variant='h6'>오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color='inherit' onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
      </List>
    </Paper>
  )
  return (
    <div className='App'>
      {navigationBar}
      <Container maxWidth='md'>
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  )
}

export default App
