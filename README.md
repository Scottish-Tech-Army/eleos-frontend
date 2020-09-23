## About

> This is the repository for the Eleos front-end, it consists of two React applications. Material-UI as visual framework and Material Table for the database table in the admin section.

* a `client` app (`eleos-frontend`) which is built and deployed statically
  * http://eleosfrontend.s3-website.eu-north-1.amazonaws.com/ (eugene.nazarovs@gmail.com : passwordpassword)
* a `server` app (`eleos-api`) which is deployed on Electric Beanstalk
  * http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/

- [ ] TODO: Centralised key-share? 

## Getting Started

### Prereq
* aws
* npm
* eb
* s3cmd

### Credentials
**Static**

> The databases for Eleos are configured within the AWS Management console at `Elastic Beanstalk -> Configuration -> Database`

[EC2 Database manager (243)](http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/web/database/manager)

```
# Amazon Relational Database Service (Amazon RDS)
# database: 'ebdb'
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='U5xD2BQqP-ayh&nq'
export setenv RDS_HOSTNAME='aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com'
export setenv RDS_PORT=5432
npm start
```

**Dynamic**
> The credentials expire for AWS every 12 hours and must be constantly reset. 


Environmental variables may be saved in the following locations and need updated
```
aws configure
vi ~/.s3cfg
echo $AWS_ACCESS_KEY_ID 
echo $AWS_SECRET_ACCESS_KEY 
echo $AWS_SESSION_TOKEN
```

### Testing
```
cd eleos-frontend-api
npm test
```

## 🚀 Deploying
- cd eleos-frontend --> `npm run build` builds the app for production to the `build` folder --> deployed on S3
- cd eleos-api --> eb deploy --> eleos-api: ec2-user@35.178.210.66

**eleos-frontend**
Pushing the static files to the s3://eleosfrontend
```
brew install s3cmd  # Enter AWS credentials, use default settings for host / bucket.
s3cmd --configure
cd eleos-api-frontend
npm run deploy # which runs npm run build && s3cmd sync build/* s3://eleosfrontend
```

**eleos-api**
```
cd eleos-api
eb deploy
```

## Access

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
```
cd eleos-frontend-api
eb status
```

**Platform**
- **(16) eu-west-2 : EU (London)**
- Node.js 12 running on 64bit Amazon Linux 2


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

## :open_file_folder: File Structure

- **eleos-api**
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

- **eleos-frontend**
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


# 📝 Notes

`node seed:admin` runs `node src/tasks/createAdminUser.js`
`INSERT INTO target_config (target_id, description) VALUES (1,'test');`
`npm i --s concurrently`
`npm install cors --save`

