'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Formularios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tarefa: {
        type: Sequelize.STRING
      },
      horaInicial: {
        type: Sequelize.TIME
      },
      horaFinal: {
        type: Sequelize.TIME
      },
      difHora: {
        type: Sequelize.TIME
      },
      peso: {
        type: Sequelize.FLOAT
      },
      material: {
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Formularios');
  }
};