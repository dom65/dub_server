import sequelize from './models';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

import findPosterUrl from './connectors/omdb_connector';
import {findFotoAttore, findDescAttore, findPosterTitolo, findDescTitolo} from './connectors/tmdb_connector';

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
        console.log(args.tags);
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            if (args.where && args.where.deno && args.where.deno != '') {
              args.where[Op.or] = [
                { nome:    { [Op.like]: `%${args.where.deno}%` }},
                { cognome: { [Op.like]: `%${args.where.deno}%` }}
              ];
              delete(args.where.deno);
            } else {
              delete(args.where.deno);
            }

            if (args.where && args.where.sesso && args.where.sesso != '') {
              args.where['sesso'] = { [Op.like]: `%${args.where.sesso}%` };
            } else {
              delete(args.where.sesso);
            }

            if (args.where && args.where.anno && args.where.anno != 0) {
              var selectedYearRange = args.where.anno;
              var currentYear = (new Date()).getFullYear();
              delete(args.where.anno);
              args.where[Op.and] = [
                { anno: { [Op.gte]: currentYear - selectedYearRange }},
                { anno: { [Op.lte]: currentYear - selectedYearRange + 15 }},
                { anno: { [Op.ne]: null }},
                { anno: { [Op.ne]: '' }}
              ];
            } else {
              delete(args.where.anno);
            }

            if (args.where && args.where.cat && args.where.cat != '') {
              args.where['cat'] = { [Op.like]: `%${args.where.cat}%` };
            } else {
              delete(args.where.cat);
            }

            if (args.where && args.where.user && args.where.user != 0) {
              var whereTags = {id_user: user.id};
              if (args.tags.voce && args.tags.voce != '') {
                whereTags.voce = args.tags.voce;
              }
              if (args.tags.ruolo && args.tags.ruolo != '') {
                whereTags.ruolo = args.tags.ruolo;
              }
              if (args.tags.etavoce && args.tags.etavoce != '') {
                whereTags.etavoce = args.tags.etavoce;
              }
              if (args.tags.cartoni && args.tags.cartoni == 1) {
                whereTags.cartoni = args.tags.cartoni;
              }
              if (args.tags.canta && args.tags.canta == 1) {
                whereTags.canta = args.tags.canta;
              }
              if (args.tags.piuvoci && args.tags.piuvoci == 1) {
                whereTags.piuvoci = args.tags.piuvoci;
              }
              if (args.tags.teatro && args.tags.teatro == 1) {
                whereTags.teatro = args.tags.teatro;
              }
              args['include'] = [{ model: models.dubbernotes,
                                   where: whereTags,
                                   required: true,
                                }];
              delete(args.where.user);
            } else {
              delete(args.where.user);
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
            //if (args.where && args.where.user && args.where.user != 0) {
            //  args.where.id_user = user.id;
            //} else {
            //  args.where[Op.or] = [
            //    { id_user: user.id},
            //    { id_user: null}
            //  ];
            //}
            if (args.where && args.where.titolo) {
              args.where['titolo'] = { [Op.like]: `%${args.where.titolo}%` };
            }
            if (args.where && args.where.tipo && args.where.tipo == '') {
              delete(args.where.tipo);
            }
            if (args.where && args.where.direttore) {
              args.where['direttore'] = { [Op.like]: `%${args.where.direttore}%` };
            }
            if (args.where && args.where.assistente) {
              args.where['assistente'] = { [Op.like]: `%${args.where.assistente}%` };
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
            if (args.where && args.where.attore) {
              args['include'] = [{ model: models.casts,
                                   where: { attore:    { [Op.like]: `%${args.where.attore}%` }},
                                   required: true,
                                }];
              delete(args.where.attore);
            }
            if (args.where && args.where.user && args.where.user != 0) {
              var whereTags = {id_user: user.id};
              args['include'] = [{ model: models.titlenotes,
                                   where: whereTags,
                                   required: true,
                                }];
              delete(args.where.user);
            } else {
              delete(args.where.user);
            }

            return models.titles.findAll(args, context);
          }
        });
      },

      titlenote (root, {id}, context) {
        return models.titlenotes.findById(id, context);
      },

      cast (root, {id}, context) {
        return models.casts.findById(id, context);
      },
      casts (root, args, context) {
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            var tit = args.where && args.where.titolo || "";
            args['include'] = [{model: models.titles,
                                where: { titolo:  { [Op.like]: `%${tit}%` },
                                         [Op.or]: [{ id_user: user.id}, { id_user: null}],
                                },
                                required: true,
                              }];
            delete(args.where.titolo);

            if (args.where && args.where.doppiatore) {
              args['include'] = [{ model: models.dubbers,
                                   where: { [Op.or]: [{ nome:    { [Op.like]: `%${args.where.doppiatore}%` }},
                                                      { cognome: { [Op.like]: `%${args.where.doppiatore}%` }}]
                                          },
                                   required: true,
                                }];
              delete(args.where.doppiatore);
            }
            if (args.where && args.where.attore) {
              args.where['attore'] = { [Op.like]: `%${args.where.attore}%` };
            }

            return models.casts.findAll(args, context);
          }
        });
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

      createTitlenote(root, {input}, context) {
        return models.titlenotes.create(input, context);
      },
      updateTitlenote(root, {id, input}, context) {
        return models.titlenotes.update(input, {limit: 1, where: {id: id}}, context);
      },
      deleteTitlenote(root, args, context) {
        return models.titlenotes.destroy({limit: 1, where: args}, context);
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
      dubbernotes (dubber, args, context) {
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            return dubber.getDubbernotes().filter(value => {
              return value.id_user == user.id;
            })
          }
        });
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
        return findPosterTitolo(title.titolo, title.originale);
        //return findPosterUrl(title.titolo, title.originale);
        //return 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTIyNTY0NzE2Nl5BMl5BanBnXkFtZTcwNTg4MzE2MQ@@._V1_SX300.jpg';
      },
      descrizione (title) {
        return findDescTitolo(title.titolo, title.originale);
        //return 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTIyNTY0NzE2Nl5BMl5BanBnXkFtZTcwNTg4MzE2MQ@@._V1_SX300.jpg';
      },
      titlenotes (title, args, context) {
        return context.user.then(user => {
          if (!user) {
            throw new Error("Authentication required");
          } else {
            return title.getTitlenotes().filter(value => {
              return value.id_user == user.id;
            })
          }
        });
      },
      casts (title) {
        return title.getCasts();
      }
    },

    Titlenote: {
      foto (titlenote) {
        return findFotoAttore(titlenote.attore);
      },
      descrizione (titlenote) {
        return findDescAttore(titlenote.attore);
      },
      title (titlenote) {
        return titlenote.getTitle();
      },
      user (titlenote) {
        return titlenote.getUser();
      },
      dubber (titlenote) {
        return titlenote.getDubber();
      }
    },

    Cast: {
      foto (cast) {
        return findFotoAttore(cast.attore);
      },
      descrizione (cast) {
        return findDescAttore(cast.attore);
      },
      title (cast) {
        return cast.getTitle();
      },
      dubber (cast) {
        return cast.getDubber();
      }
    },

  };

export default Resolvers;
