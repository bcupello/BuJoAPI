// import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'BulletJournal_Database',
  'postgres',
  'ocintnqmyo',
  {
  	host: 'localhost',
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  FutureLog: sequelize.import('./future-log'),
  MonthlyLog: sequelize.import('./monthly-log'),
  DailyLog: sequelize.import('./daily-log'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;