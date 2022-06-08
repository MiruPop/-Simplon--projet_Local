# Install on local machine
For API to properly run, you will need a **Okta and Stripe free developer accounts**.<br/>
Okta: signup at https://developer.okta.com/, go to Embed Auth Into Your App :<br/>
- Create a Web application (Java) for the back-end, with https://localhost:8443/login/oauth2/code/okta as Sign-in redirect URIs<br/>
- Create a Single-Page App (Angular) for the front-end, with https://localhost:4200/login/callback as Sign-in redirect URIs and
https://localhost:4200 as Sign-out redirect URIs<br/>
<br/>
You will also need to generate self-signed certificate and key using Java keytool from command line (replace values in braces with your own.<br/>
You can choose whatever values for the -dname - same for back and front):<br/>
_$ keytool -genkeypair -alias {chooseAlias} -keystore src/main/resources/{chooseFileName}.p12 -keypass {chooseKeypassPassword} -storeType PKCS12
-storepass {chooseStorepassPassword} -keyalg RSA -keysize 2048 -validity 365
-dname "C=FR, ST=Seine-Saint-Denis, L=Saint-Denis, O=simplon, OU=DWWM Backend, CN=localhost" -ext "SAN=dns:localhost"_<br/>
<br/>
To view content of generated certificate:<br/>
_keytool -list -v -alias {yourAlias} -keystore src/main/resources/{yourFileName}-keystore.p12 -storepass {yourStorepassPassword}_<br/>
<br/>
**application.properties**<br/>
Define your Environement variables in Run Configurations for BackendLocalEshopApplication.java:<br/>
- define own values for DB_URL, DB_USERNAME, DB_PASSWORD<br/>
- define own values for OKTA_ISSUER_URI, OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, STRIPE_KEY<br/>
- define own values for KEYSTORE_TYPE (=PKCS12), and KEYSTORE_PWD<br/>
<br/>
**application-test.properties**<br/>
Define your variables in Run Configurations >> JUnit >> Edit configuration templates >> Environement variables :<br/>
- define values for OKTA_ISSUER_URI, OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, STRIPE_KEY (same as above)<br/>
- define values for KEYSTORE_TYPE (=PKCS12), and KEYSTORE_PWD (same as above)<br/>
<br/>
# Run application
Access on https://localhost:8443/api
