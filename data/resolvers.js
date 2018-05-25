import sequelize from './models';
import Sequelize from 'Sequelize';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

import findPosterUrl from './connectors/omdb_connector';

const Op = Sequelize.Op;

const models = sequelize.models;

export const Resolvers = {

    Query: {
      user (root, {id}, context) {
        return models.users.findById(id, context);
      },
      currentuser (root, args, context) {
        return context.user;
      },
      users (root, args, context) {
        return models.users.findAll({}, context);
      },

      dubber (root, {id}, context) {
        return models.dubbers.findById(id, context);
      },
      dubbers (root, args, context) {
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            if (args.where && args.where.deno) {
              args.where = {
                [Op.or]: [{ nome:    { [Op.like]: `%${args.where.deno}%` }},
                          { cognome: { [Op.like]: `%${args.where.deno}%` }}]
              };
            }
            return models.dubbers.findAll(args, context);
          }
        });
      },

      dubbernote (root, {id}, context) {
        return models.dubbernotes.findById(id, context);
      },
      dubbernotes (root, args, context) {
        return models.dubbernotes.findAll({}, context);
      },

      dubberfile (root, {id}, context) {
        return models.dubberfiles.findById(id, context);
      },
      dubberfiles (root, args, context) {
        return models.dubberfiles.findAll({}, context);
      },

      title (root, {id}, context) {
        return models.titles.findById(id, context);
      },
      titles (root, args, context) {
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            if (args.where && args.where.titolo) {
              args.where['titolo'] = { [Op.like]: `%${args.where.titolo}%` };
            }
            if (args.where && args.where.direttore) {
              args.where['direttore'] = { [Op.like]: `%${args.where.direttore}%` };
            }
            if (args.where && args.where.doppiatore) {
              args['include'] = [{ model: models.casts,
                                   include: [{ model: models.dubbers,
                                               where: { [Op.or]: [{ nome:    { [Op.like]: `%${args.where.doppiatore}%` }},
                                                                  { cognome: { [Op.like]: `%${args.where.doppiatore}%` }}]
                                               } 
                                            }],
                                   required: true,
                                }];
              delete(args.where.doppiatore);
            } 
            return models.titles.findAll(args, context);
          }
        });
      },

      cast (root, {id}, context) {
        return models.casts.findById(id, context);
      },
      casts (root, args, context) {
        return models.casts.findAll(args, context);
      }
      
    },

    Mutation: {
      createUser(root, {input}, context) {
        return models.users.create(input, context);
      },
      updateUser(root, {id, input}, context) {
        return models.users.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteUser(root, args, context) {
        return models.users.destroy({limit: 1, where: args}, context);
      },
      login(root, {input}, context) {
        return models.users.findOne( {where: {email: input.email}} ).then(
        user => {
          if (!user) {
            return Promise.reject('email not found');
          }
          if (input.password != user.password) {
            return Promise.reject('password incorrect for user ' + user);
          } else {
            const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);
            user.token = token;
            context.user = Promise.resolve(user);
            console.log(user.email + ' Logged in!');
            return user; 
          }
        });
      },

      createDubber(root, {input}, context) {
        return models.dubbers.create(input, context);
      },
      updateDubber(root, {id, input}, context) {
        return models.dubbers.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteDubber(root, args, context) {
        return models.dubbers.destroy({limit: 1, where: args}, context);
      },

      createDubbernote(root, {input}, context) {
        return models.dubbernotes.create(input, context);
      },
      updateDubbernote(root, {id, input}, context) {
        return models.dubbernotes.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteDubbernote(root, args, context) {
        return models.dubbernotes.destroy({limit: 1, where: args}, context);
      },

      createDubberfile(root, {input}, context) {
        return models.dubberfiles.create(input, context);
      },
      updateDubberfile(root, {id, input}, context) {
        return models.dubberfiles.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteDubberfile(root, args, context) {
        return models.dubberfiles.destroy({limit: 1, where: args}, context);
      },

      createTitle(root, {input}, context) {
        return models.titles.create(input, context);
      },
      updateTitle(root, {id, input}, context) {
        return models.titles.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteTitle(root, args, context) {
        return models.titles.destroy({limit: 1, where: args}, context);
      },

      createCast(root, {input}, context) {
        return models.casts.create(input, context);
      },
      updateCast(root, {id, input}, context) {
        return models.casts.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteCast(root, args, context) {
        return models.casts.destroy({limit: 1, where: args}, context);
      }
    },

    Dubber: {
      dubbernotes (dubber) {
        return dubber.getDubbernotes();
      },
      dubberfiles (dubber) {
        return dubber.getDubberfiles();
      },
      casts (dubber) {
        return dubber.getCasts();
      }
    },

    User: {
      dubbernotes (user) {
        return user.getDubbernotes();
      },
      dubberfiles (user) {
        return user.getDubberfiles();
      }
    },

    Dubbernote: {
      user (dubbernote) {
        return dubbernote.getUser();
      },
      dubber (dubbernote) {
        return dubbernote.getDubber();
      }
    },

    Dubberfile: {
      user (dubberfile) {
        return dubberfile.getUser();
      },
      dubber (dubberfile) {
        return dubberfile.getDubber();
      }
    },

    Title: {
      poster (title) {
        return findPosterUrl(title.titolo);
        //return 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTIyNTY0NzE2Nl5BMl5BanBnXkFtZTcwNTg4MzE2MQ@@._V1_SX300.jpg';
      },
      casts (title) {
        return title.getCasts();
      }
    },

    Cast: {
      title (cast) {
        return cast.getTitle();
      },
      dubber (cast) {
        return cast.getDubber();
      }
    },

  };

export default Resolvers;
