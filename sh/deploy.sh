export setenv jwtSecret=aba318899cb6a81ff9698733c21d5e61406964272c5b7efe1fdfc55db410bf35
export setenv DEFAULT_ADMIN_PASSWORD=passwordpassword
export setenv MPWD=Kaplan_12
# API 
echo "Deploying API"
cd ..
cd eleos-api

# Populates target_config if needed
# npm run seed:config
# npm test
npm run deploy

# Static
echo "Building & deploying the static front-end"
cd ..
cd eleos-static
npm run deploy

