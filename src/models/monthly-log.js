const monthlyLog = (sequelize, DataTypes) => {
  const MonthlyLog = sequelize.define('Monthly_log', {
    key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
    },
    text: {
      type: DataTypes.STRING,
      unique: false,
    },
    isAlloted: {
      type: DataTypes.BOOLEAN,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: false,
    }
  });

  return MonthlyLog;
};

export default monthlyLog;