## About

This is the repository for the Eleos front-end, it consists of two React applications.

* a `server` app (`eleos-fronted-api` on AWS) which is built and deployed statically
* a `client` app which is deployed on Electric Beanstalk

### :open_file_folder: File Structure

- client
    - public (index.html, favicon, manifest.json, robots.txt, favicon)
    - src 
        - components
            - admin
            - customer
            - Header.js
        - images
        - styles
        - App (css/js)
        - index (css/js)
- src (server)
    - api
        - targetConfigs (loads the targetConfigs from local db)
        - user (user config, middleware, etc)
    - auth (api)
    - dashboard (api)
    - db (postgres connection with user / ppe_inventory. Called via api->users)
    - tasks (createAdminUser.js - admin:seed)
    - util (jwt (encryption) gen)
    - app.js
    - common.test.js
    - index.js

## Getting Started

### :link: Prerequisites

This project requires `npm`

### Running

> Both the server and client app must be running at the same time

Use `npm start` the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Testing

`npm test` Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deploying

`npm run build` builds the app for production to the `build` folder.<br />

This must then be deployed on EB

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Commands & Credentials

`node seed:admin` runs `node src/tasks/createAdminUser.js`
`INSERT INTO target_config (target_id, description) VALUES (1,'test');`
`npm i --s concurrently`
`npm install cors --save`

eugene.nazarovs@gmail.com
passwordpassword


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



