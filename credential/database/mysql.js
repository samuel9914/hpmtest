module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DATABASE: "HPM",
  DIALECT: "mysql",
};

/* 
  There are some considerations regarding sensitive data and environment management.

  Sensitive Information: 
  The USER and PASSWORD fields contain sensitive data. 
  It's not a good practice to hardcode sensitive information directly into your code, 
  especially if this code is stored in a public repository. Even if it's not public, it's still a security risk.

  Environment Variables: 
  A more secure way to handle sensitive data like this is to use environment variables. 
  This way, the actual sensitive data is not stored in the code at all. 
  Also, by using environment variables, you can easily change these settings without changing the code, 
  which is useful when deploying to different environments.

  Configuration per Environment: 
  Usually, you'll have different configurations for different environments (development, staging, production, etc.). 
  It's a good practice to manage these configurations in a central place 
  and load the appropriate one based on the current environment.

  */
