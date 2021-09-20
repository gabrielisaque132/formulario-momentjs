'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resgistroHoraImprodutiva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  resgistroHoraImprodutiva.init({
    codHoraImprodutiva: DataTypes.STRING,
    horainicial: DataTypes.TIME,
    horafinal: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'resgistroHoraImprodutiva',
  });
  return resgistroHoraImprodutiva;
};