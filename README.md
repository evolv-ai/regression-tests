# regression-tests

## Project setup
Install depedndencies 
```
npm install 
```

### Before Running tests browser-sync needs to be started:
```
"start:browser-sync:prod": "NODE_ENV=prod node bs-config.js"
"start:browser-sync:dev": "NODE_ENV=dev node bs-config.js"
"start:browser-sync:stg": "NODE_ENV=stg node bs-config.js"
```
### runs specific test
```
npx codeceptjs run ./tests/<test_file_name>.js

npx codeceptjs run ./tests/css_check_test.js
```

### To run on certain env use:
```
"test": "npx codeceptjs run",
"test:prod": "NODE_ENV=prod npx codeceptjs run",
"test:dev": "NODE_ENV=dev npx codeceptjs run",
"test:stg": "NODE_ENV=stg npx codeceptjs run"
```

### Configuration for project
create separate ```.env``` files for different environments ```.env.dev .env.prod .env.stg``` etc. 
.env 
```
HOST_URL
SHOW_BROWSER
WEBLOADER_URL
PARTICIPANT_URL
ENVIRONMENT_ID
UID
```
