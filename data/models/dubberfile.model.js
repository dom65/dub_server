import DataTypes from 'sequelize';

export default function (sequelize) {
  const Dubberfile = sequelize.define('dubberfiles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_dubber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dubbers',
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
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'dubberfiles'
  });

  Dubberfile.associate = (models) => {
    Dubberfile.belongsTo(models.users, {foreignKey: "id_user"});
    Dubberfile.belongsTo(models.dubbers, {foreignKey: "id_dubber"});
  };

}
