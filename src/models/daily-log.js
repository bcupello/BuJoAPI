const dailyLog = (sequelize, DataTypes) => {
  const DailyLog = sequelize.define('Daily_Log', {
    Key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Signifier: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      unique: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      unique: false,
    }
  });

  return DailyLog;
};

export default dailyLog;