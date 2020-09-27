getting all the required data, 
putting it in the format that Odoo expects (FormData), 
hitting the required route

## Retrieving CSRF

* Match email with the name of the database in the backend 
* GET http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=data
* parse response as .text() to get raw html

the crsf_token is included in the raw :
```
<script type=“text/javascript”>
                    var odoo = {
                        csrf_token: “28a965d362bb45b0a3c789ab352a3183f39bf21do”,
                        debug: “”,
```

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

# Database
> Retrieving the database name by mimicing the Odoo login process from STA’s front end 


* send a post request to log in providing form details as per their requirements:


* so form input will include csrf_token, login, and password and ‘db’
