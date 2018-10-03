import DataTypes from 'sequelize';

export default function (sequelize) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isadmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.titles, {foreignKey: "id_user"});
    User.hasMany(models.dubbernotes, {foreignKey: "id_user"});
    User.hasMany(models.dubberfiles, {foreignKey: "id_user"});
  };
}
