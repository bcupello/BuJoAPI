const futureLog = (sequelize, DataTypes) => {
  const FutureLog = sequelize.define('Future_Log', {
    key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      unique: false,
    },
    month_year: {
      type: DataTypes.DATE,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: false,
    }
  });

  return FutureLog;
};

export default futureLog;