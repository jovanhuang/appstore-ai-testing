# generate a token from frontend public client
TOKEN_FRONTEND=$(curl -k -L -X POST \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H 'Accept: application/json' \
    --data-urlencode 'client_id=ai-appstore-frontend' \
    --data-urlencode 'grant_type=password' \
    --data-urlencode 'username=user' \
    --data-urlencode 'password=password' \
    'https://keycloak.apps-crc.testing/realms/CommonServices/protocol/openid-connect/token' \
    | jq -r '.access_token')

echo $TOKEN_FRONTEND

# call a backend api with this token; the token contains audience aud based on backend client
# you will get a html page regardless. there is no authorization check for api /models
# curl -X GET \
#     -H "Authorization: Bearer ${TOKEN_FRONTEND}" \
#     "http://appstore.apps-crc.testing/models"

# call a backend api with this token; the token contains audience aud based on backend client
# POST /engines to create a model
curl -k -X POST \
    -H "Authorization: Bearer ${TOKEN_FRONTEND}" \
    -H "Accept: application/json" \
    -H "Content-type: application/json" \
    --data '{"modelId":"test-keycloak-model","imageUri":"docker.io/okydocker/mnist:1.0.0","env":{},"numGpus":0}' \
    "https://aas-backend.apps-crc.testing/engines/"



# cat << EOF


# "You should get a http return something like that ................"
# {"modelId":"test_keycloak_model","imageUri":"docker.io/okydocker/mnist:1.0.0","containerPort":null,"env":{},"numGpus":0.0,"_id":"6576a98a845ff620659d3eb2","inferenceUrl":"https://appstore-model.apps-crc.testing/okaiyong-testkeycloakmodel-c71e/","ownerId":"okaiyong","serviceName":"okaiyong-testkeycloakmodel-c71e","created":"2023-12-11T06:17:46.326703","lastModified":"2023-12-11T06:17:46.326709","host":"https://appstore-model.apps-crc.testing","path":"okaiyong-testkeycloakmodel-c71e","protocol":"http","backend":"emissary"}
# EOF