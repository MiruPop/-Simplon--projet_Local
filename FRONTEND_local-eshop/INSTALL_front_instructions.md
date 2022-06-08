# Install on local machine

Run _npm install_ to install node modules

For API to properly run, you will need a **Okta and Stripe free developer accounts**.<br/>
_Please note that credentials in _auth-config.ts_ and _environment.ts_ are test ones and have been changed since._<br/>

**Stripe install**<br/>
Install Stripe dependencies using command<br/>
_$ npm install stripe_

Okta: signup at https://developer.okta.com/, go to Embed Auth Into Your App :<br/>
- Create a Web application (Java) for the back-end, with https://localhost:8443/login/oauth2/code/okta as Sign-in redirect URIs<br/>
- Create a Single-Page App (Angular) for the front-end, with https://localhost:4200/login/callback as Sign-in redirect URIs and 
https://localhost:4200 as Sign-out redirect URIs<br/>

**Okta install & config**<br/>
Install Okta dependencies using commands<br/>
_$ npm install @okta/okta-signin-widget<br/>
$ npm install @okta/okta-angular_<br/>

In _auth-config.ts_ file you need to change clientId, issuer and redirectUri with your own.<br/>
<br/>

**Self-signed certificate and key**<br/>
You will also need to generate self-signed certificate and key using **OpenSSL tool** (to install on your machine visit https://slproweb.com/products/Win32OpenSSL.html)<br/>
In the _localhost.conf_, edit DN values with your own (same as back-end ones)<br/>
<br/>
From terminal opened in Angular project:<br/>
_$ mkdir ssl-localhost_<br/>
_$ openssl req -x509 -out ssl-localhost\localhost.crt -keyout ssl-localhost\localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf_<br/>
<br/>
View contents of certificate :<br/>
_$ openssl x509 -noout -text -in ssl-localhost/localhost.crt_<br/>

# Run application
Run with _npm start_
Access on https://localhost:4220
