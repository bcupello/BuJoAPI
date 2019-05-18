const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Email: {
      type: DataTypes.STRING,
      unique: false,
    },
    Pass_hash: {
      type: DataTypes.STRING,
      unique: false,
    },
    Access_token: {
      type: DataTypes.STRING,
      unique: false,
    },
    Token_expiry_date: {
      type: DataTypes.DATE,
      unique: false,
    },
    Name: {
      type: DataTypes.STRING,
      unique: false,
    },
    Surname: {
      type: DataTypes.STRING,
      unique: false,
    }
  },
  {
    timestamps: false
  });

  User.findByAccessToken = async accessToken => {
    if (accessToken == '') {
      // Não há Access Token, então retorna id zero
      return 0;
    } else {
      // Procura o id do usuário pelo Access Token
      let user = await User.findOne({
        where: { Access_token: accessToken }
      });

      if(!user) {
        // Não encontrou usuário
        return 0;
      } else {
        return user.Id;
      }
    }
  }

  return User;
};

export default user;