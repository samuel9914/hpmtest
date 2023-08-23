//model data user

module.exports = (sequilize, DataTypes) => {
  // you might want to consider making certain fields unique or notNull. For example, usernames are typically
  // unique, and you probably want to ensure the username and password fields cannot be null.
  const User = sequilize.define(
    "user",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
