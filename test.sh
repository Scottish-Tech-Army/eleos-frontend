if [ -z "$jwtSecret" ]
then
    echo "jwtSecret is not defined"
else 
    echo "jwtSecret is defined"
fi

if [ -z "$DEFAULT_ADMIN_PASSWORD" ]
then
    echo "DEFAULT_ADMIN_PASSWORD is not defined"
else 
    echo "DEFAULT_ADMIN_PASSWORD is defined"
fi

if [ -z "$MPWD" ]
then
    echo "MPWD is not defined"
else 
    echo "MPWD is defined"
fi
