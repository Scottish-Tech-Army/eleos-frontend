The dbfilter is set in `odoo.conf`

This uses a shortcode/regex to tell Odoo it needs to grab the desired database from the subdomain passed through

```
sudo vi /etc/odoo/odoo.conf
```

```bash
 14 dbfilter = ^%d$
 15 list_db = True
 ```

 `A` record for `*.eleos.scottishtecharmy` => `35.178.199.156`

 I've set up a new bucket `eleos.scottishtecharmy.org` and there's `CNAME` record =>  `http://eleos.scottishtecharmy.org.s3-website.eu-west-2.amazonaws.com`

 This naming convention is required by AWS S3