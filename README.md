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
Use ```.json``` files for different environments ```dev.json production.json stg.json``` etc in config folder in the root 
.env 
```
{
    "HOST_URL": "http://localhost:9090",
    "SHOW_BROWSER":"true",
    "WEBLOADER_URL":"<url>",
    "PARTICIPANT_URL":"<url>",
    "ENVIRONMENT_ID":"<env_id>",
    "UID":"<uid>"
}
```
