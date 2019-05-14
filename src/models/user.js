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

  User.findByAccessToken = async accessToken => {
    if (accessToken == '') {
      // Não há Access Token, então retorna id zero
      return 0;
    } else {
      // Procura o id do usuário pelo Access Token
      let user = await User.findOne({
        where: { access_token: accessToken }
      });

      if(!user) {
        // Não encontrou usuário
        return 0;
      } else {
        return user.id;
      }
    }
  }

  return User;
};

export default user;