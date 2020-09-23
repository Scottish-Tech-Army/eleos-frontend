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

```
eugene.nazarovs@gmail.com
passwordpassword
```

The page will reload if you make edits. You will also see any lint errors in the console.

#### Credentials

> The databases for Eleos are configured within the AWS Management console at `Elastic Beanstalk -> Configuration -> Database`
```
export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12

# Amazon Relational Database Service (Amazon RDS)
# database: 'ebdb'
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='U5xD2BQqP-ayh&nq'
export setenv RDS_HOSTNAME='aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com'
export setenv RDS_PORT=5432
npm start
```

http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/web/database/manager

### Testing

`npm test` Launches the test runner in the interactive watch mode.<br /> 

Run this in the `eleos-frontend-api` folder

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### 🚀 Deploying
- eleos-frontend --> `npm run build` builds the app for production to the `build` folder --> deployed on S3
- eleos-api --> eleos-api: ec2-user@35.178.210.66

**eleos-frontend**
Pushing the static files to the s3://eleosfrontend
```
brew install s3cmd  # Enter AWS credentials, use default settings for host / bucket.
s3cmd --configure
cd eleos-api-frontend
npm run deploy # which runs npm run build && s3cmd sync build/* s3://eleosfrontend
```

**eleos-api**

### Access

**Accessing E2**

```
ssh -i ODOO.pem ubuntu@ec2-3-10-212-243.eu-west-2.compute.amazonaws.com
```

**Accessing the S3 instance**
```
➜  aws s3 ls
2020-09-15 09:25:10 elasticbeanstalk-eu-west-1-677304537696
2020-08-30 19:28:39 elasticbeanstalk-eu-west-2-677304537696
2020-08-11 06:23:44 eleosfrontend
```

#### Accessing Electric Beanstalk
> ec2-user@35.177.42.131

**Set your AWS environmental variables** available at [https://scottishtecharmy.awsapps.com/start#/](scottishtecharmy.awsapps.com/start)
```
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""
```

This needs to be repeated every 12 hours as the keys are refreshed. 

```
cd eleos-frontend-api
eb init -i
```

**Platform**
- **(16) eu-west-2 : EU (London)**
- Node.js 12 running on 64bit Amazon Linux 2


This must be set to 

**Application**
```
Select an application to use
1) eleos-api
2) eleos-frontend-api
3) [ Create new Application ]
(default is 3): 1
```

[ ] TODO: Centralised key-share? 
# SSH

```
➜  eb ssh
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

