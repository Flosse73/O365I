// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

// the function behind the "Sign In" Button
// starts the SSO process
function signIn() {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      // get the accesstoken for the user
      getTokenPopup(loginRequest);

    }).catch(error => {
      console.log(error);
    });
}

// the function behind the "Sign Out" Button
function signOut() {
  myMSALObj.logout();
}

// get the accessToken
function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .then(response => {
      console.log("Scope Token Request: " + tokenRequest.scopes);
      console.log("accessToken: " + response.accessToken);
      // start the process for creating the logic app
      createLogicApp(myMSALObj);
    })
    .catch(error => {
      console.log(error);
      console.log("silent token acquisition fails. acquiring token using popup");
          
      // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            createLogicApp(myMSALObj);
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
    });
}

function createLogicApp(MSALresponse) {
  // the user's email address
  let email = MSALresponse.getAccount().userName;
  // parse the first an last name from the email address
  let parsedName = parseEmail(email);
  // make the http request
  httpRequest(parsedName);
}