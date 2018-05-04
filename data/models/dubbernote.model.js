import DataTypes from 'sequelize';

export default function (sequelize) {
  const Dubbernote = sequelize.define('dubbernotes', {
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
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'dubbernotes'
  });

  Dubbernote.associate = (models) => {
    Dubbernote.belongsTo(models.users, {foreignKey: "id_user"});
    Dubbernote.belongsTo(models.dubbers, {foreignKey: "id_dubber"});
  };

}
