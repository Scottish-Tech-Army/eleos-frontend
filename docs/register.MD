
# New User

eleos-api/src/auth

* DEV DB : ec2-35-178-199-156
  - password: Kap* 
* TEST DB: ec2-3-10-212-243
  - password: starts S and ends $ 


user.controller.js
```
    await fetch(
      'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/database/drop',
      {
        method: 'POST',
        body: fd,
        headers: fd.getHeaders(),
      }
    );
```

auth.controller.js
```
const response = await fetch(
      'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/database/create',
      {
        method: 'POST',
        body: fd,
        headers: fd.getHeaders(),
      }
    );
```

- New user visits the site
- eleos-static is loaded
  - App.js sets the styles, checks for auth and routes as appropriate
    - This is checked via eleos-api/auth
  - `eleos-static/admin` and `eleos-static/customer` for registration/login
  - `index.js` rewrites the URL and renders the DOM

- `App.js` loads `eleos-static/src/components/customer/Register.js`

- `Register.js`
  - `target_config_id: '',`
  - `fetch('http://eleos-api.scottishtecharmy.org/auth/register'`
  - `fetch('/targetconfig`
  - `MenuItem key={index} value={config.target_id}> {config.description}`
  - `targetconfig` is required otherwise you get `422 Unprocessable Entity` - presumably due to schema mismatch

- `eleos-api/src/api/targetconfigs`
  - requires `express` `router` and `eleos-static/db/db.js`
    - `SELECT * FROM target_config`
  
- `db.js`
  - Loads database based on `RDS_` environmental variables

- API
  - http://eleos-api.scottishtecharmy.org/targetconfig
- app.use('/targetconfig', require('./api/targetConfigs/targetConfig.routes.js'));




# PSQL access
psql -h <host> -p <port> -U <username> -W <password> <database>
psql -h aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com -p 5432 -U dbuser -W <password> ebdb