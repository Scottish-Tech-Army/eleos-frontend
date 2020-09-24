## About

> This is the repository for the Eleos front-end, it consists of two React applications. Material-UI as visual framework and Material Table for the database table in the admin section. [YouTube : STA Front End/DB Walk Through](https://www.youtube.com/watch?v=6pwdsKymUD4&feature=youtu.be)

* a `client` app (`eleos-frontend`) which is built and deployed statically
* a `server` app (`eleos-api`) which is deployed on Electric Beanstalk

### URLS
* EC2 (Odoo back-end)
  * **Test**  [ec2-3-10-212-243.eu-west-2.compute.amazonaws.com](http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/), [db manager](http://ec2-3-10-212-243.eu-west-2.compute.amazonaws.com/web/database/manager)
  * **Dev** [ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/](http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/)
* eleos-api EB + S3: 
  * [http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/](eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com) 
* eleos-frontend S3: 
  * [http://eleosfrontend.s3-website.eu-north-1.amazonaws.com/](eleosfrontend.s3-website.eu-north-1.amazonaws.com/) 
  * (eugene.nazarovs@gmail.com : passwordpassword)  
  * [https://eleos.scottishtecharmy.org](eleos.scottishtecharmy.org)



- [ ] TODO: Centralised key-share? 

## Getting Started

### Prereq
>These should all be relatively self explanatory to install but will depend on platform. The only options that need entered are your personal security tokens from [AWS](https://scottishtecharmy.awsapps.com/start/).

* aws
* npm
* eb
* s3cmd

If you need to use `eb init`, the following settings must be selected
- (16) **eu-west-2** : EU (London)
- Node.js 12 running on 64bit Amazon Linux 2

### Credentials
#### Amazon Relational Database Service (Amazon RDS)
**Static**

> The databases for Eleos are configured within the AWS Management console at `Elastic Beanstalk -> Configuration -> Database`

```
# database: 'ebdb'
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='pastecry.pt/4J3Lrq' @Mark Glasgow on STA slack for access
export setenv RDS_HOSTNAME='pastecry.pt/4J3Lrq' @Mark Glasgow on STA slack for access
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
>[https://eleos.scottishtecharmy.org](eleos.scottishtecharmy.org)

```
# Pushing the static files to s3://eleosfrontend
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
ssh -i ODOO.pem ubuntu@ec2-35-178-199-156.eu-west-2.compute.amazonaws.com
```
>ODOO.pem - https://pastecry.pt/mIvloO - @Mark Glasgow on STA slack for access

**Accessing the S3 instance**
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
```

# SSH

```
➜  eb ssh
  _____ _           _   _      ____                       _        _ _
 | ____| | __   ___| |_(_) ___| __ )  ___  __ _ _ __  ___| |_ __ _| | | __
 |  _| | |/ _ \/ __| __| |/ __|  _ \ / _ \/ _\ | '_ \/ __| __/ _\ | | |/ /
 | |___| | (_| \__ \ |_| | (__| |_) |  __/ (_| | | | \__ \ || (_| | |   <
 |_____|_|\__,_|___/\__|_|\___|____/ \___|\__,_|_| |_|___/\__\__,_|_|_|\_\

 Amazon Linux 2 AMI

 This EC2 instance...
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

