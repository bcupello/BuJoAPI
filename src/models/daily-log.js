const dailyLog = (sequelize, DataTypes) => {
  const DailyLog = sequelize.define('Daily_Log', {
    key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    signifier: {
      type: DataTypes.STRING,
      unique: false,
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
    },
    text: {
      type: DataTypes.STRING,
      unique: false,
    },
    status: {
      type: DataTypes.STRING,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: false,
    }
  });

  return DailyLog;
};

export default dailyLog;