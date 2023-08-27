//model data user

module.exports = (sequilize, DataTypes) =>{
    const User = sequilize.define(  'user',
                                    {
                                        username:{
                                            type: DataTypes.STRING,
                                            allowNull: false,
                                            unique: true,
                                            validate:{
                                                notEmpty:{
                                                    arg:true,
                                                    msg:"username required"
                                                },
                                                len:{
                                                    args:[6,32],
                                                    msg: "Model level error: Username length must be between 6 to 32 character"
                                                }

                                            }
                                            
                                        },
                                        password: {
                                            
                                            type: DataTypes.STRING,
                                            allowNull: false,
                                            validate:{
                                                notEmpty:{
                                                    arg:true,
                                                    msg:"password required"
                                                },
                                                len:{
                                                    args:[8],
                                                    msg: "Model level error: password length must be greater than 8 character"
                                                }
                                            }

                                        },
                                        name:{
                                            type:DataTypes.STRING,
                                            allowNull: false,
                                            validate:{
                                                notEmpty:{
                                                    arg:true,
                                                    msg:"required"
                                                },
                                                len:{
                                                    args:[1,50],
                                                    msg: "Name length must be between 1 to 50 character"
                                                }
                                            }
                                        },
                                        email: {
                                            type: DataTypes.STRING,
                                            allowNull: false,
                                            unique: true,
                                            validate:{
                                                notEmpty:{
                                                    arg:true,
                                                    msg:"required"
                                                },
                                                len:{
                                                    args:[6,32],
                                                    msg: "Username length must be between 6 to 32 character"
                                                },
                                                is:{
                                                    args:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                                                    msg:"Does not match standard email format"
                                                }

                                            }
                                            
                                        },
                                        gender: {
                                            type:DataTypes.STRING,
                                            allowNull:false
                                        }
                                    },
                                    
                                    {
                                        freezeTableName: true
                                    })

    return User;
};