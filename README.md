# hpmtest
prerequisite: node.js, mysql, postman(optional),visual studio code(optional)


-   Clone repository with "git clone https://github.com/samuel9914/hpmtest"
-   install dependencies by runing "npm install"
-   add file named .env to set session secret
    example: "SESSION_SECRET=secret123123"
-   setting your local credential for mysql in .\credential\database\mysql.js
-   add new schema in your local database named "hpm"
-   run the app by running "node server.js" or "nodemon server.js"
-   before you hit the API you need to add basic authentication for each endpoint
    username = admin
    password = sangataman


