//model data userProfile

module.exports = (sequilize, DataTypes) =>{
    const UserProfiles = sequilize.define(  'userProfile',
                                    {   name:DataTypes.STRING,
                                        username: DataTypes.STRING,
                                        email: DataTypes.STRING,
                                        gender: DataTypes.STRING
                                    },
                                    {
                                        freezeTableName: true
                                    })

    return UserProfiles;
};