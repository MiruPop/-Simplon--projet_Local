# Install on local machine

Run _npm install_ to install node modules

For API to properly run, you will need a **Okta and Stripe free developer accounts**.
_Please note that credentials in _auth-config.ts_ and _environment.ts_ are test ones and have been changed since._

**Stripe install**
Install Stripe dependencies using command
_$ npm install stripe_

Okta: signup at https://developer.okta.com/, go to Embed Auth Into Your App :
- Create a Web application (Java) for the back-end, with https://localhost:8443/login/oauth2/code/okta as Sign-in redirect URIs
- Create a Single-Page App (Angular) for the front-end, with https://localhost:4200/login/callback as Sign-in redirect URIs and
https://localhost:4200 as Sign-out redirect URIs

**Okta install & config**
Install Okta dependencies using commands
_$ npm install @okta/okta-signin-widget
$ npm install @okta/okta-angular_

In _auth-config.ts_ file you need to change clientId, issuer and redirectUri with your own.


**Self-signed certificate and key**
You will also need to generate self-signed certificate and key using **OpenSSL tool** (to install on your machine visit https://slproweb.com/products/Win32OpenSSL.html)
In the _localhost.conf_, edit DN values with your own (same as back-end ones):

From terminal opened in Angular project:
_$ mkdir ssl-localhost_
_$ openssl req -x509 -out ssl-localhost\localhost.crt -keyout ssl-localhost\localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf_

View contents of certificate :
_$ openssl x509 -noout -text -in ssl-localhost/localhost.crt_

# Run application
Run with _npm start_
Access on https://localhost:4220
