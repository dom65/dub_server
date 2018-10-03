import DataTypes from 'sequelize';

export default function (sequelize) {
  const Cast = sequelize.define('casts', {
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
    id_dubber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dubbers',
        key: 'id'
      }
    },
    attore: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    personaggio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doppiatore: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'casts'
  });

  Cast.associate = (models) => {
    Cast.belongsTo(models.titles, {foreignKey: "id_title"});
    Cast.belongsTo(models.dubbers, {foreignKey: "id_dubber"});
  };

}
