export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12
#!/bin/zsh

#export 'jwtSecret = aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35' >> ~/.zshenv
#export 'DEFAULT_ADMIN_PASSWORD=passwordpassword' >> ~/.zshenv
#export 'MPWD=Kaplan_12' >> ~/.zshenv
echo ""
echo "Environmental variables:"
echo "jwtSecret=" $jwtSecret
echo "DEFAULT_ADMIN_PASSWORD=" $DEFAULT_ADMIN_PASSWORD
echo "MPWD=" $MPWD
cd eleos
#node src/tasks/createAdminUser.js
#check for env here

# Not sure why I need to keep doing these
rm -rf node_modules/eslint
rm -rf node_modules/jest
npm i jspdf@2.1.0 --save
npm run dev