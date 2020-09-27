# 
ssh -i ODOO.pem ubuntu@ec2-35-178-199-156.eu-west-2.compute.amazonaws.com

* scp [source file] [username]@[destination server]:.
* scp -vvv -i ODOO.pem muk_dbfilter-13.0.1.0.0.zip ubuntu@ec2-35-178-199-156.eu-west-2.compute.amazonaws.com

* install `base_import_module`
* /web?debug=1
* `Import Module` 

`/var/lib/odoo/.local/share/Odoo/addons` as root

# Upload and installing a custom Odoo module
> Brian Jackson 17/9/2020
> These notes are for installing a custom module.  In this case for uploading multiple product images displayed in the Inventory Module and the Website Module.  Without this, each image has to be loaded one at a time. This process needs to be included in the setup scripts run after initial database creation for each customer. The module 'product_image_upload' has been purchased from www.appjetty.com


## Notes and outstanding issues:

“CSV Product Images Import” module is for Odoo 10, 11 and 12.  We currently use Odoo vn 13Is the version we have compatible with our version of Odoo?
It appears you have to load all the images onto the ODOO server before running the CSV import process.  Server access needed for this – not a process for customers to follow.
I’ve spoken to Kayleigh (AWS) on how to manage file transfer uploads to our Odoo servers and there may be a drag and drop file transfer solution yet to be set up.
It may be worth investigating including CSV Product Images Import module and a set of stock images as part of the initial database build to minimise on-boarding activities.
There is only a partial bank of product images available.  Further images were uploaded onto VSA solution and with permission could be harvested.


## Installation steps

* Download module onto local laptop (zip file)
* Go to the apps and install the module named Base import module (technical name: base_import_module) . After installing this module, you will have a new menu under the Apps menu , ie, import module menu , with that you can import the modules.
* Activate developer mode
* Click Apps
* Select menu bar option “Import Module”
* Select module package to import (.zip file) and tick Force init
* Click “Import App” and check message “Successfully imported module 'product_image_upload'”





Go to Inventory -> Products and switch to List View to upload the images via Importing the CSV.
See file “CSV_Product_Images_Import.pdf” for CSV format
