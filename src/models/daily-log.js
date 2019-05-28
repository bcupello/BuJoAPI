import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const dailyLog = (sequelize, DataTypes) => {
  const DailyLog = sequelize.define('Daily_log', {
    Key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Signifier: {
      type: DataTypes.CHAR,
      unique: false,
    },
    Date: {
      type: DataTypes.DATE,
      unique: false,
    },
    Text: {
      type: DataTypes.STRING,
      unique: false,
    },
    Status: {
      type: DataTypes.CHAR,
      unique: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      unique: false,
    }
  },
  {
    timestamps: false
  });

  // Cria um Daily Log
  DailyLog.createDailyLog = async dailyLog => {
    return await DailyLog.create(
      {
        Signifier: dailyLog.signifier,
        Date: dailyLog.date,
        Text: dailyLog.text,
        Status: dailyLog.status,
        UserId: dailyLog.userId
      }
    );
  };

  // Busca um Daily Log por chave
  DailyLog.getDailyLogByKey = async (key, userId) => {
    return await DailyLog.findAll(
      {
        where: {
          Key: key,
          UserId: userId
        }
      }
    );
  };

  // Procura um Daily Log por um intervalo de datas
  DailyLog.searchDailyLogsByRange = async (startDate, endDate, userId) => {
    return await DailyLog.findAll(
      {
        where: {
          Date: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          },
          UserId: userId
        }
      }
    );
  };

  // Edita as informações principais de um Daily Logs
  DailyLog.editDailyLogInfo = async (key, signifier, text, userId) => {
    return await DailyLog.update(
      {
        Signifier: signifier,
        Text: text
      },
      {
        where: {
          Key: key,
          UserId: userId
        }
      }
    );
  };

  // Edita o status de um Daily Logs
  DailyLog.editDailyLogStatus = async (key, status, userId) => {
    return await DailyLog.update(
      {
        Status: status
      },
      {
        where: {
          Key: key,
          UserId: userId
        }
      }
    );
  };

  return DailyLog;
};

export default dailyLog;