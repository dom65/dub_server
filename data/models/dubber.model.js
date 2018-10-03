import DataTypes from 'sequelize';

export default function (sequelize) {
  const Dubber = sequelize.define('dubbers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cognome: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sesso: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    giudizio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    audio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    anno: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    luogo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    madrelingua: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accentistranieri: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accentiregionali: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'dubbers'
  });

  Dubber.associate = (models) => {
    Dubber.hasMany(models.dubbernotes, {foreignKey: "id_dubber"});
    Dubber.hasMany(models.dubberfiles, {foreignKey: "id_dubber"});
    Dubber.hasMany(models.casts, {foreignKey: "id_dubber"});
  };
}
