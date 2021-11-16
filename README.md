# Personalizer-API
API component for personalization.

This is a NodeJS/expressJS application. It uses Azure Personalizer service in order to provide personalized recommendation to users when parameters provided. It also updates the recommendation rewards for a given user interaction. Please see swagger doc.

Step 1. Install npm dependencies
```bash 
$ npm install
```  

Step2. Run the application 
```bash
# run in dev environment
$ npm run dev
# run when deployed  
$ npm run start
```


## Other Commands

`npm run lint`: linting code 

`npm run test`: runs tests

## Environment Variables 
```PORT```:  port for running the server

```NODE_ENV```:  specify environment prod or test or dev

```ACCESS_TOKEN_SECRET```:  generated token secret for now

```PERSONALIZER_SERVICE_KEY```:  This key is provided by Azure personalizer

```PERSONALIZER_BASE_URL```:  This URL provided by Azure personalizer

 
## Swagger 
Swagger is available `<URL>/api-docs`. 

