//model data user

module.exports = (sequilize, DataTypes) =>{
    const User = sequilize.define(  'user',
                                    {
                                        username: DataTypes.STRING,
                                        password: DataTypes.STRING
                                    },
                                    {
                                        freezeTableName: true
                                    })

    return User;
};