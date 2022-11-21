import request from 'supertest'
import app from '../app.js'

before (async () => {
  const payload ={
    'name': 'test',
    'email': 'test1@gmail.com',
    'password': '123456789'
  }

  await request(app).post('/auth/register').send(payload)
})