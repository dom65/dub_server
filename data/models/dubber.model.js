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
    eta: {
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
    }
  }, {
    timestamps: false,
    tableName: 'dubbers'
  });

  Dubber.associate = (models) => {
    Dubber.hasMany(models.dubbernotes, {foreignKey: "id_dubber"});
    Dubber.hasMany(models.dubberfiles, {foreignKey: "id_dubber"});
  };
}
