import DataTypes from 'sequelize';

export default function (sequelize) {
  const Titlenote = sequelize.define('titlenotes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_title: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'titles',
        key: 'id'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    stagione: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    episodio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    personaggio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fotop: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attore: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doppiatore: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_dubber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dubbers',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'titlenotes'
  });

  Titlenote.associate = (models) => {
    Titlenote.belongsTo(models.users, {foreignKey: "id_user"});
    Titlenote.belongsTo(models.titles, {foreignKey: "id_title"});
    Titlenote.belongsTo(models.dubbers, {foreignKey: "id_dubber"});
  };

}
