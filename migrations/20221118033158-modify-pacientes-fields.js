'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      enrevision: {
        type: Sequelize.BOOLEAN,
      },
      fechaingreso: {
        type: Sequelize.DATE,
        field: 'fechaingreso',
        defaultValue: Sequelize.NOW
      },
      medicacion: {
        type: Sequelize.STRING,
        field: 'medicacion',
        references: {
          model: 'medicamentos',
          key: 'name'
        }
      },
      dealta: {
        type: Sequelize.BOOLEAN,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pacientes');
  },
};
