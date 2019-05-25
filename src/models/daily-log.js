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

  return DailyLog;
};

export default dailyLog;