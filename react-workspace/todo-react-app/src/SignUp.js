import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { signup } from './service/ApiService'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const username = data.get('username')
    const password = data.get('password')
    signup({ username, password }).then((response) => {
      window.location.href = '/login'
    })
  }

  return (
    <Container component='main' maxWidth='xs' style={{ marginTop: '8%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5'>
            계정 생성
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {' '}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='username'
              label='아이디'
              name='username'
              autoComplete='username'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='password'
              label='패스워드'
              name='password'
              autoComplete='current-password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link to='/login' variant='body2'>
              이미 계정이 있습니까? 로그인하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default SignUp
