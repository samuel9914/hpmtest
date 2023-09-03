# hpmtest
prerequisite: node.js, mysql, postman(optional),visual studio code(optional)


-   Clone repository with "git clone https://github.com/samuel9914/hpmtest"
-   install dependencies by runing "npm install"
-   add file named .env to set session secret
    example: "SESSION_SECRET=mysecret444"

-   add new schema in your local database named "hpm"
-   run the app by running "node server.js" or "nodemon server.js"
-   before you hit the API you need to add basic authentication for each endpoint.
    set the value for  basicAuthPassword in your .env file

-   Configure your DB by setting up these variable in .env file. these variable will be used in "credential\database\mysql.js"
    dbHOST 
    dbUSER
    dbPASSWORD 
    dbDATABASE 
    dbDIALECT

-   use or create ssl certificate and name it server.key and server.cert (will be used in server.js file)

-   refer to this link for further details 
    https://documenter.getpostman.com/view/9559377/2s946h7s4s

