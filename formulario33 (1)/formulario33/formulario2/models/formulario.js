'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formulario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Formulario.init({
    tarefa: DataTypes.STRING,
    horaInicial: DataTypes.TIME,
    horaFinal: DataTypes.TIME,
    difHora: DataTypes.TIME,
    peso: DataTypes.FLOAT,
    material: DataTypes.STRING,
    observacao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Formulario',
  });
  return Formulario;
};