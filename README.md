## About

> This is the repository for the Eleos front-end, it consists of two React applications. Material-UI as visual framework and Material Table for the database table in the admin section. [YouTube : STA Front End/DB Walk Through](https://www.youtube.com/watch?v=6pwdsKymUD4&feature=youtu.be)

* a `client` app (`eleos-frontend`) which is built and deployed statically
* a `server` app (`eleos-api`) which is deployed on Electric Beanstalk

### 📌 Bookmarks
* EC2 (Odoo back-end): [dev ec2](http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/)
* eleos-api (EB + S3): [eleos-api.scottishtecharmy.com/](https://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com) 
* eleos-frontend (static S3): [eleos.scottishtecharmy.org](https://eleos.scottishtecharmy.org), [S3: eleosfrontend.s3](eleosfrontend.s3-website.eu-north-1.amazonaws.com/) 
* [AWS Secret Manager](https://eu-west-2.console.aws.amazon.com/secretsmanager/home?region=eu-west-2#/listSecrets)

**TODO**
- [x] Build and push changes to both frontend and api to test
- [x] Centralised key-share?
- [ ] Test database
- [ ] dbfilter_from_header
- [ ] target config

## Getting Started

### Prereq
>These should all be relatively self explanatory to install but will depend on platform. The only options that need entered are your personal security tokens from [AWS](https://scottishtecharmy.awsapps.com/start/).

* aws
* npm
* eb
* s3cmd

### 🔐 Credentials

The credentials for the database can be retrieved from [AWS Secret Manager](https://eu-west-2.console.aws.amazon.com/secretsmanager/home?region=eu-west-2#/listSecrets)

#### Amazon Relational Database Service (Amazon RDS)
**Static**

> The databases for Eleos are configured within the AWS Management console at `Elastic Beanstalk -> Configuration -> Database`

```
# database: 'ebdb'
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='' 
export setenv RDS_HOSTNAME=''
export setenv RDS_PORT=5432
npm start
```

**Dynamic**
> The credentials expire for AWS every 12 hours and must be constantly reset. 

Environmental variables may be saved in the following locations and need updated
```
rm ~/.aws/credentials
rm ~/.s3cfg
aws configure
s3cmd --configure
echo $AWS_ACCESS_KEY_ID 
echo $AWS_SECRET_ACCESS_KEY 
echo $AWS_SESSION_TOKEN
```

## 🕵️‍♂️ Testing
 * [test ec2](http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/), [test ec2 db manager](http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/web/database/manager),

```
cd eleos-frontend-api
npm test
```

## 🚀 Deploying
- cd eleos-frontend --> `npm run build` builds the app for production to the `build` folder --> deployed on S3
- cd eleos-api --> eb deploy --> eleos-api: ec2-user@35.178.210.66

**eleos-frontend**
>[https://eleos.scottishtecharmy.org](eleos.scottishtecharmy.org)

```
# Pushing the static files to s3://eleosfrontend
brew install s3cmd  # Enter AWS credentials, use default settings for host / bucket.
rm ~/.s3cfg
s3cmd --configure
cd eleos-api-frontend
npm run deploy # which runs npm run build && s3cmd sync build/* s3://eleosfrontend
```

**eleos-api**
```
cd eleos-api
eb deploy
```

## 🚪 Direct Access

**Accessing E2**
>ODOO.pem RSA stored on [AWS Secret Manager](https://eu-west-2.console.aws.amazon.com/secretsmanager/home?region=eu-west-2#/listSecrets)

```
# Odoo-dev
ssh -i ODOO.pem ubuntu@ec2-35-178-199-156.eu-west-2.compute.amazonaws.com
# Odoo-test
ssh -i ODOO.pem ubuntu@ec2-3-10-212-243.eu-west-2.compute.amazonaws.com
```

**Accessing the S3 bucket**
>[S3: eleosfrontend.s3](eleosfrontend.s3-website.eu-north-1.amazonaws.com/) 
```
➜  aws s3 ls
2020-09-15 09:25:10 elasticbeanstalk-eu-west-1-677304537696
2020-08-11 06:23:44 eleosfrontend
```

#### Accessing Electric Beanstalk
> ec2-user@35.177.42.131

```
cd eleos-frontend-api
eb status
eb ssh
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

* `node seed:admin` runs `node src/tasks/createAdminUser.js`
* `INSERT INTO target_config (target_id, description) VALUES (1,'test');`
* `npm i --s concurrently`
* `npm install cors --save`

If you need to use `eb init`, the following settings must be selected
- (16) **eu-west-2** : EU (London)
- Node.js 12 running on 64bit Amazon Linux 2