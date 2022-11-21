import request from 'supertest'
import chai from 'chai'
import app from '../app.js' 
import User from '../models/user.js'

const { expect } = chai

describe('Test the auth endpoints', () => {

  it('Creación de usuario', async () => {
    const payload = {
      'name': 'teast',
      'email': 'test@gmail.com',
      'password': '12345678'
    }
    const { body, status } = await request(app).post('/auth/register').send(payload)
    expect(status).to.equal(201)

    expect(body).to.have.property('userId')
    const userId = body.userId
    const user = await User.findByPk(userId)
    expect(body.message).contains('User Created')
    expect(user.name).to.equal(payload.name)
  })

  it('Retorna 400 si los datos están incompletos', async () => {
    const payload = {
      'name': 'tesyt',
      'email': 'test@gmail.com',
      'password': '123456'
    }

    const { body, status } = await request(app).post('/auth/register').send(payload)
    expect(status).to.equal(400)
    expect(body.message).contains('La contraseña debe tener mínimo 8 carácteres')
  })

  it('Retorna 400 si email no tiene @', async () => {
    const payload = {
      'name': 'tesyt',
      'email': 'gmail.com',
      'password': '12345678'
    }

    const { body, status } = await request(app).post('/auth/register').send(payload)
    expect(status).to.equal(400)
    expect(body.message).contains('Email debe contener @')
  })

  /* ********* LOGIN TEST ********* */

  it('Inicio correcto de sesion', async () => {
    const payload = {
      'email': 'test1@gmail.com',
      'password': '123456789'
    }

    const { body, status } = await request(app).post('/auth/login').type('json').send(payload)

    expect(status).to.equal(200)
    expect(body.message).contains('Login successfull')
  })

  it('Email no encontrado', async () => {
    const payload = {
      'email': '00000@gmail.com',
      'password': '12345678'
    }

    const { body, status } = await request(app).post('/auth/login').type('json').send(payload)
    
    expect(status).to.equal(404)
  })

  it('Contraseña incorrecta', async () => {
    const payload = {
      'email': 'test@gmail.com',
      'password': '0000000000'
    }

    const { body, status } = await request(app).post('/auth/login').type('json').send(payload)
    
    expect(status).to.equal(401)
    expect(body.message).contains('Invalid Password')
  })
})