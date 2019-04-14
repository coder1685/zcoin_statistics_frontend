#/bin/bash
#upload files
aws s3 cp C:/ankita/zcoin/zcoin-frontend/dist s3://zcoin-frontend --recursive --acl public-read
