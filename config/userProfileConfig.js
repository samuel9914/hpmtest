//model data userProfile

module.exports = (sequilize, DataTypes) => {
  const UserProfiles = sequilize.define(
    "userProfile",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  // Here are some considerations regarding validations:
  // No validations are in place for the username, email, name, and gender.
  // It's a good idea to enforce rules (like minimum length, uniqueness, non-nullable, email format, etc.) at the model level.

  return UserProfiles;
};
