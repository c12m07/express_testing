import request from "supertest";
import chai from "chai";
import app from "../app.js";
import Medicamentos from "../models/medicamentos.js";
import { before } from "mocha";
import getToken from "./utils.js";

const { expect } = chai;

describe("Testear los métodos de medicamentos", () => {
  let token;
  let medi1;
  let medi2;

  before(async () => {
    token = await getToken();
    medi1 = await Medicamentos.create({
      name: "test",
      precio: "1000",
    });
    medi2 = await Medicamentos.create({
      name: "test1",
      precio: "2000",
    });
  });

  it('GetMedicamentos', async () => {
    const { body, status } = await request(app)
      .get('/medicamentos')
      .set('Authorization', `Bearer ${token}`) 
    
    expect(status).to.equal(200)
    expect(body).to.be.a(`array`)
    expect(body.length).to.equal(2)
  })

  it('Retorna Unauthorized para usuarios no logeados', async () => {
    const { status } = await request(app)
      .get('/medicamentos')
    
    expect(status).to.equal(403)
  })

  it('Retorna un medicamento por id', async () => {
    const { body, status } = await request(app)
      .get(`/medicamentos/${medi1.id}`)
      .set('Authorization', `Bearer ${token}`) 

    expect(status).to.equal(200)
    expect(body).to.be.a('object')

    const medicamento = await Medicamentos.findByPk(medi1.id)
    expect(medicamento.id).to.equal(medi1.id)
    expect(medicamento.name).to.equal(medi1.name)
  })

  it('Creat medicamento', async () => {
    const payload = {
      name: 'Medicamento prueba',
      precio: '100000'
    }
    const { body, status } = await request(app)
      .post('/medicamentos')
      .set('Authorization', `Bearer ${token}`) 
      .send(payload)

    expect(status).to.equal(200)
    expect(body).to.be.a('object')

    const medicamento = await Medicamentos.findByPk(medi1.id)
    expect(medicamento.id).to.equal(medi1.id)
    expect(medicamento.name).to.equal(medi1.name)
  })

  it('Eliminar medicamento', async () => {
    const mediAEliminar = await Medicamentos.create({
      name: 'Será eliminado',
      precio: '100000'
    })
    const { body, status } = await request(app)
      .delete(`/medicamentos/${mediAEliminar.id}`)
      .set('Authorization', `Bearer ${token}`) 

    expect(status).to.equal(200)
    expect(body).to.be.a('object')

    const medicamento = await Medicamentos.findByPk(mediAEliminar.id)
    expect(medicamento).to.equal(null)
  })
});
