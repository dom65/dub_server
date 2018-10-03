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
    voce: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ruolo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    etavoce: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cartoni: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    canta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    piuvoci: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teatro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sync: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    giudizio: {
      type: DataTypes.INTEGER,
      allowNull: true
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
