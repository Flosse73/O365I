import logging
import azure.functions as func
import requests

#prettier GET request function
def GET(headers, uri):
    return requests.get(uri, headers=headers)

#prettier POST request function
def POST(headers, uri, cookies):
    return requests.request("POST", uri, headers=headers, cookies=cookies)

# the logic for the activity to be performed
def callback(ObjectID, get_uri, post_uri, basic_auth):
    #get request

    get_response = GET(headers={'Authorization': basic_auth,
                                'x-csrf-token': 'fetch'},
                       uri=get_uri)

    # check if the status code is valid
    if (get_response.status_code >= 200 and get_response.status_code < 400):
        logging.info("----------------------GET   SUCCESSFULL-----------------------")

        # append the ObjectID to the url
        completed_post_uri = post_uri + "?ObjectID='" + ObjectID + "'&$format=json"

        # post request
        post_response = POST(headers={'Authorization': basic_auth,
                                      'x-csrf-token': get_response.headers['x-csrf-token']},
                             uri=completed_post_uri,
                             cookies=get_response.cookies)

        # check if the status code is valid
        if (post_response.status_code >= 200 and post_response.status_code < 400):
            logging.info("----------------------POST  SUCCESSFULL-----------------------")
            logging.info("----------------------POST REQ RESPONSE-----------------------")
            # log the content of the response to the POST request
            logging.info(post_response.json()['d'])            
            logging.info('--------------------------------------------------------------')
            return True
        else:
            logging.error("Error with POST Request! Status Code: " + str(post_response.status_code))
            return False
    else:
        logging.error("Error with GET Request! Status Code: " + str(get_response.status_code))
        return False


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('--------------------------------------------------------------')
    logging.info('Python HTTP trigger function processed a request.')

    # get the the body of the http request
    req_body = req.get_json()

    # get the variables needed from the body
    ID = req_body.get('ObjectID')
    basic_auth = req_body.get('BasicAuth')
    get_uri = req_body.get('GetURI')
    post_uri = req_body.get('PostURI')

    # the basic auth string with only the first fes char's of the secret to 
    # not display the whole string in the azure log stream portal
    basic_auth_censored = basic_auth[0:12]

    # log the info for the current run
    logging.info('--------------------------RUN INFO----------------------------')
    logging.info('ObjectID:  ' + str(ID))
    logging.info('BasicAuth: ' + str(basic_auth_censored) + '*******censored*******')
    logging.info('GetURI:    ' + str(get_uri))
    logging.info('PostURI:   ' + str(post_uri))
    logging.info('--------------------------------------------------------------')

    # call the function performing the logic
    ret_val = callback(ID, get_uri, post_uri, basic_auth)

    # log the return value from the callback function
    if ret_val:
        logging.info('return value of the callback function: ' + str(ret_val))
    else:
        logging.error('return value of the callback function: ' + str(ret_val))

    # return the return value of the callback function to the logic app
    return func.HttpResponse(str(ret_val))