import Sequelize from 'sequelize';

import User from './user.model';
import Dubber from './dubber.model';
import Dubbernote from './dubbernote.model';
import Dubberfile from './dubberfile.model';
import Title from './title.model';
import Cast from './cast.model';

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: '../dubbers.db',
  operatorsAliases: false,
  logging: console.log
});

User(sequelize);
Dubber(sequelize);
Dubbernote(sequelize);
Dubberfile(sequelize);
Title(sequelize);
Cast(sequelize);

const models = sequelize.models;

// Set up data relationships
Object.keys(models).forEach(name => {
  if ('associate' in models[name]) {
    models[name].associate(models);
  }
});

//sequelize.sync();

export default sequelize;
