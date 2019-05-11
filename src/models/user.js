const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
    },
    pass_hash: {
      type: DataTypes.STRING,
      unique: false,
    },
    access_token: {
      type: DataTypes.STRING,
      unique: false,
    },
    token_expiry_date: {
      type: DataTypes.DATE,
      unique: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      unique: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
    },
    surname: {
      type: DataTypes.STRING,
      unique: false,
    }
  });

  return User;
};

export default user;