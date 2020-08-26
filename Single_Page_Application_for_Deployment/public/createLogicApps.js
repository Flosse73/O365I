// parse the first and last name of the person
function parseEmail(emailAddress) {
    // parse the first name of the person
    var firstName = emailAddress.split('.')[0];
    console.log("FirstName = " + firstName);
    
    // the rest of the email address to parse the last name
    var restOfEmailAddress = emailAddress.split('.')[1];

    // parse the last name of the person
    var lastName = restOfEmailAddress.split('@')[0];
    console.log("LastName = " + lastName);

    // return the first and last name as an array
    return [firstName, lastName];
}

// make the http request to trigger the logic app
function httpRequest(name) {
    var request =  new XMLHttpRequest();
    // the URI might look weird, this is due to the fact, that it is automatically created by logic apps
    request.open('POST', 'https://prod-42.westeurope.logic.azure.com:443/workflows/a4517cd74e5845a29b4471b205b0b9c0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Sc5cUCZY1y87GoIxQNexahVJyCBcgTv8bySmK3dr1pQ');

    // the body for the http request
    var body = '{' +
               '"FamilyName": "' + name[1] + '",' + 
               '"Name": "' + name[0] + '"' +
               '}';
    request.send(body);
    
    let responseHeader = document.getElementById("response_header");
    let responseText = document.getElementById("response");

    request.onload = function() {
        if(request.status < 400) {
            console.log("Response: " + request.status);
            // display the Success of the request with additional info in the html page
            responseHeader.style.color = 'green';
            responseHeader.textContent = 'SUCCESS';
            responseText.innerHTML = 'StatusCode: ' + request.status + 
                                     '<br>Check the Azure Portal for the ResourceGroup <strong>O365I-' + 
                                     name[0] + '-' + name[1] + '</strong>';
        }
        else {
            console.error("Response: " + request.status);
            // display "Error" with additional info in the html page
            responseHeader.style.color = 'red';
            responseHeader.textContent = 'ERROR';
            responseText.innerHTML = 'StatusCode: ' + request.status + 
                                     '<br>Try the <strong>Alternative Method</strong> in the Documentation';
        }
    }
}
