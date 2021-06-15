# regression-tests

## Project setup
Install depedndencies 
```
npm install 
```
### runs specific test
```
npx codeceptjs run ./tests/<test_file_name>.js

npx codeceptjs run ./tests/css_check_test.js
```

### runs whole project
```
npx codeceptjs run 

npm test
```

### Configuration for project
.env
```
HOST_URL - url where project should run
SHOW_BROWSER - run in headless mode (`false` for headless mode)
```
