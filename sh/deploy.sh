./sh/check_credentials.sh
# API 
echo "Deploying API"
# cd ..
cd eleos-api

# Populates target_config if needed
# npm run seed:config
# npm test

export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='U5xD2BQqP-ayh&nq' 
export setenv RDS_HOSTNAME=aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com
export setenv RDS_PORT=5432

npm run deploy

# Static
echo "Building & deploying the static front-end"
cd ..
cd eleos-static

export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12
export setenv RDS_USERNAME=dbuser
export setenv RDS_PASSWORD='U5xD2BQqP-ayh&nq' 
export setenv RDS_HOSTNAME=aaharaujhpjxt7.cqrta6bb4sbn.eu-west-2.rds.amazonaws.com
export setenv RDS_PORT=5432

npm run deploy

