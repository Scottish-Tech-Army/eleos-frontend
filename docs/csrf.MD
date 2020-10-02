
# Database
> Retrieving the database name by mimicing the Odoo login process from STA’s front end 



## Database Connection

* Dashboard.js - 'Proceed to instance' button
1. Get `database` name
   * Match email with the name of the `database` via eleos-api
2. Get `csrf_token`
   * GET http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=`database`
   * parse response as .text() to get raw html
3. Redirect
   * send a post request to log in providing form details as per Odoo FormData (csrf_token, login, and password and ‘db’)

### 1
Database is pulling and displaying via console.log

Set up a `const db` variable (ln31) to store the database value, this is empty until the user hits 'Proceed to instance' - it will then call `getUserDetails()` via an async function `getToken()` and populate that variable.

I've done this in eleos-static/Dashboard.js, which I think is the most appropriate place - however once the code is figured out this could be replicated in login/register in order to give a smoother transition. 


### 2
the crsf_token is included in the body when we GET ?db='database-name'

document.getElementById("myLink").innerHTML=csrf_token;

```
<script type=“text/javascript”>
                    var odoo = {
                        csrf_token: “28a965d362bb45b0a3c789ab352a3183f39bf21do”,
                        debug: “”,
```

Next step is to parse and store this variable. This is probably best done
from the eleos-api, that way the api server calls it and prevents a CORS error. 

This then needs to be bundled with 
* the database name as a Odoo filter
* username/password
* CSRF token

I believe rendering the DOM would be the best method of displaying
the Odoo page to the user; but I'm inexperienced in this area so unsure. 


Full response
```
<form class="oe_login_form" role="form" method="post" onsubmit="this.action = this.action + location.hash" action="/web/login">
                <input type=“hidden” name=“csrf_token” value=“145657b3f7664b2077c0850d720be648cd3b1120o1601206292"/>
                <div class=“form-group field-db”>
                    <label for=“db” class=“col-form-label”>Database</label>
                    <div class=“input-group “>
                        <input type=“text” name=“db” id=“db” required=“required” readonly=“readonly” value=“Dev3" class=“form-control “/>
                        <span class=“input-group-append”>
                            <a role=“button” href=“/web/database/selector” class=“btn btn-secondary”>Select <i class=“fa fa-database” role=“img” aria-label=“Database” title=“Database”></i></a>
                        </span>
                    </div>
                </div>
                <div class=“form-group field-login”>
                    <label for=“login”>E-mail</label>
                    <input type=“text” placeholder=“E-mail” name=“login” id=“login” required=“required” autofocus=“autofocus” autocapitalize=“off” class=“form-control “/>
                </div>
                <div class=“form-group field-password”>
                    <label for=“password”>Password</label>
                    <input type=“password” placeholder=“Password” name=“password” id=“password” required=“required” autocomplete=“current-password” maxlength=“4096” class=“form-control “/>
                </div>
```

