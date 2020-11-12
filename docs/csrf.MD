
# Database
> Retrieving the database name by mimicing the Odoo login process from STA’s front end 



## Database Connection

* Dashboard.js - 'Proceed to instance' button
1. Get `database` name
   * Match email with the name of the `database` via eleos-api
2. Get `csrf_token`
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

The Odoo core files are located at `/usr/lib/python3/dist-packages/odoo`, I think the most likely place we should be looking at is `http.py`

```bash
root@ip-10-1-0-114:/usr/lib/python3/dist-packages/odoo# grep -rnw '.' -e '@route'
./addons/base_gengo/controller/main.py:11:    @route('/website/gengo_callback', type='http', auth='public', csrf=False)
./addons/odoo_referral/controllers/referral.py:9:    @route(['/odoo_referral/go'], type='json', auth='user', method='POST', website=True)
./addons/base_import_module/controllers/main.py:27:    @route(
./addons/base/controllers/rpc.py:52:    @route("/xmlrpc/<service>", auth="none", methods=["POST"], csrf=False, save_session=False)
./addons/base/controllers/rpc.py:65:    @route("/xmlrpc/2/<service>", auth="none", methods=["POST"], csrf=False, save_session=False)
./addons/base/controllers/rpc.py:74:    @route('/jsonrpc', type='json', auth="none", save_session=False)
./addons/mail/controllers/bus.py:37:    @route('/mail/chat_post', type="json", auth="public", cors="*")
./addons/mail/controllers/bus.py:59:    @route(['/mail/chat_history'], type="json", auth="public", cors="*")
./addons/digest/controllers/portal.py:9:    @route('/digest/<int:digest_id>/unsubscribe', type='http', website=True, auth='user')
./addons/sale_stock/controllers/portal.py:23:    @route(['/my/picking/pdf/<int:picking_id>'], type='http', auth="public", website=True)
./addons/event/controllers/main.py:11:    @route(['''/event/<model("event.event", "[('state', 'in', ('confirm', 'done'))]"):event>/ics'''], type='http', auth="public")
./addons/website_mass_mailing/controllers/main.py:11:    @route('/website_mass_mailing/is_subscriber', type='json', website=True, auth="public")
./addons/website_mass_mailing/controllers/main.py:26:    @route('/website_mass_mailing/subscribe', type='json', website=True, auth="public")
./addons/website_mass_mailing/controllers/main.py:46:    @route(['/website_mass_mailing/get_content'], type='json', website=True, auth="public")
./addons/website_mass_mailing/controllers/main.py:58:    @route(['/website_mass_mailing/set_content'], type='json', website=True, auth="user")
./addons/hr_presence/controllers/bus_controller.py:12:    @route('/longpolling/poll', type="json", auth="public")
./addons/portal/controllers/portal.py:156:    @route(['/my', '/my/home'], type='http', auth="user", website=True)
./addons/portal/controllers/portal.py:161:    @route(['/my/account'], type='http', auth='user', website=True)
./addons/board/controllers/main.py:11:    @route('/board/add_to_dashboard', type='json', auth='user')
./addons/test_assetsbundle/controllers/main.py:8:    @route('/test_assetsbundle/js', type='http', auth='user')
./addons/bus/controllers/main.py:15:    @route('/longpolling/send', type="json", auth="public")
./addons/bus/controllers/main.py:30:    @route('/longpolling/poll', type="json", auth="public", cors="*")
./addons/bus/controllers/main.py:42:    @route('/longpolling/im_status', type="json", auth="user")
./addons/account_payment/controllers/payment.py:14:    @route('/invoice/pay/<int:invoice_id>/form_tx', type='json', auth="public", website=True)
./addons/hr_fleet/controllers/main.py:16:    @route(["/fleet/print_claim_report/<int:employee_id>"], type='http', auth='user')
root@ip-10-1-0-114:/usr/lib/python3/dist-packages/odoo# sudo vi /usr/lib/python3/dist-packages/odoo/http.py
```

On the development server I've changed `False` to `True` here to temporarily circumcent the CSRF on the development server

```python
 396     def validate_csrf(self, csrf):
 397         if not csrf:
 398             return True
```

