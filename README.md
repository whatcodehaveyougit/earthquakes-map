# continuum-task

This project was created use the Vue Cli

The site can be found here: https://main--earthquake-map-project.netlify.app/

### Create an ENV file

Create an `.env` file in root directory.
Create an account on mapbox to get an API Key: https://account.mapbox.com/auth/signup/
Paste the key into the .env file following the format below.

VUE_APP_MAP_KEY={paste_in_key_here}

### Running the site using Docker

```
docker build -t {your_name/your_app_name} .
```

```
docker run -it -p 8080:8080 --rm --name continuum-app {your_name/your_app_name}
```

You will be able to access the site on: http://localhost:8080/

### E2E Tests

This application has cypress e2e tests and using the Cucumber syntax.

After you have the site running on localhost:8080, run the command below to see the tests run

```
npx cypress open
```

## Project setup not using docker

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
