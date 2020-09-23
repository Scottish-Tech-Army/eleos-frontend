## About

> This is the repository for the Eleos front-end, it consists of two React applications. Material-UI as visual framework and Material Table for the database table in the admin section.

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

#### Credentials

>Elastic Beanstalk -> Configuration -> Database
```
export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12

# Amazon Relational Database Service (Amazon RDS)
# database: 'ebdb',
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='U5xD2BQqP-ayh&nq'
export setenv RDS_HOSTNAME=aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com
export setenv RDS_PORT=5432 
```

### Testing

`npm test` Launches the test runner in the interactive watch mode.<br /> 

Run this in the `eleos-frontend-api` folder

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deploying


- server --> eleos-api: ec2-user@35.178.210.66
- client --> `npm run build` builds the app for production to the `build` folder --> deployed on EB

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Access

**Accessing the S3 instance**
```
➜  aws s3 ls
2020-09-15 09:25:10 elasticbeanstalk-eu-west-1-677304537696
2020-08-30 19:28:39 elasticbeanstalk-eu-west-2-677304537696
2020-08-11 06:23:44 eleosfrontend
```

#### Accessing Electric Beanstalk

**Region**
```
➜  eb init -i

Select a default region
...
16) eu-west-2 : EU (London)
...
(default is 3): 16
```

This must be set to **(16) eu-west-2 : EU (London)**
**Application**
```
Select an application to use
1) eleos-api
2) eleos-frontend-api
3) [ Create new Application ]
(default is 3): 1
```

**Platform setup**
```
Select a platform.
1) .NET Core on Linux
2) .NET on Windows Server
3) Docker
4) GlassFish
5) Go
6) Java
7) Node.js
8) PHP
9) Packer
10) Python
11) Ruby
12) Tomcat
(make a selection): 7

Select a platform branch.
1) Node.js 12 running on 64bit Amazon Linux 2
2) Node.js 10 running on 64bit Amazon Linux 2
3) Node.js running on 64bit Amazon Linux
(default is 1): 1

Cannot setup CodeCommit because there is no Source Control setup, 
continuing with initialization
Do you want to set up SSH for your instances?
(Y/n): Y
```
   - **SSH**
```
Select a keypair.
1) aws-eb
2) eleos-frontend
4) ODOODEVTEST
5) [ Create new KeyPair ]
(default is 4): 2
```

```
➜  eb ssh

Select an instance to ssh into
1) i-0044ac97063c10394
2) i-0c477c9a18bde7459
(default is 1): 1

INFO: Running ssh -i /Users/pseudo/.ssh/mark-keypair ec2-user@35.178.210.66
The authenticity of host '35.178.210.66 (35.178.210.66)' can't be established.
ECDSA key fingerprint is SHA256:wYymmAjKKMKcrZ+AnuYiBQPaNSSFIG2d2pz5muFO1/I.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '35.178.210.66' (ECDSA) to the list of known hosts.
  _____ _           _   _      ____                       _        _ _
 | ____| | __   ___| |_(_) ___| __ )  ___  __ _ _ __  ___| |_ __ _| | | __
 |  _| | |/ _ \/ __| __| |/ __|  _ \ / _ \/ _\ | '_ \/ __| __/ _\ | | |/ /
 | |___| | (_| \__ \ |_| | (__| |_) |  __/ (_| | | | \__ \ || (_| | |   <
 |_____|_|\__,_|___/\__|_|\___|____/ \___|\__,_|_| |_|___/\__\__,_|_|_|\_\

 Amazon Linux 2 AMI

 This EC2 instance is managed by AWS Elastic Beanstalk. Changes made via SSH
 WILL BE LOST if the instance is replaced by auto-scaling. For more information
 on customizing your Elastic Beanstalk environment, see our documentation here:
 http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html
[ec2-user@ip-172-31-22-231 ~]$ pwd
/home/ec2-user
```





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



