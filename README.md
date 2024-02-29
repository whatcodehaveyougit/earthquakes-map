# continuum-task

This project was created use the Vue Cli

The site can be found here: https://main--earthquake-map-project.netlify.app/

### Running Site locally

This can be done using docker. Simply run the commands:

- `docker build -t {your_name/your_app_name} .`
- `docker run -it -p 8080:8080 --rm --name {your_name/your_app_name}`

You will then be able to access the site on: http://localhost:8080/

### E2E Tests

This application has cypress e2e tests. After you have the site running localhost:8080 you just need to simply run the command:

- `npx cypress open`

## Project setup

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
