import md5 from 'md5';
import uuid from 'uuid';

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
  };

  User.findByEmailAndPassword = async (email, password) => {
    if (email == '' || password == '') {
      // Não há email ou senha
      return undefined;
    } else {
      // Procura o id do usuário pelo Access Token
      let user = await User.findOne({
        where: { Email: email, Pass_hash: md5(password) }
      });

      if(!user) {
        // Não encontrou usuário
        return undefined;
      } else {
        return user;
      }
    }
  };

  User.refreshAccessTokenById = async id => {
    if (!id) {
      // Não há id, retorna AccessToken vazio
      return '';
    } else {
      // Atualiza o AccessToken do usuário pelo id
      const newAccessToken = uuid.v4();
      let updateAnswer = await User.update(
        {
          Access_token: newAccessToken
        },
        {
          where: { Id: id }
        }
      );
      
      if(!updateAnswer) {
        return '';
      } else {
        return newAccessToken;
      }
    }
  };

  return User;
};

export default user;