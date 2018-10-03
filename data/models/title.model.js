import DataTypes from 'sequelize';

export default function (sequelize) {
  const Title = sequelize.define('titles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titolo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    originale: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    anno: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    direttore: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    assistente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dialoghi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    studio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'titles'
  });

  Title.associate = (models) => {
    Title.hasMany(models.casts, {foreignKey: "id_title"});
  };
}
