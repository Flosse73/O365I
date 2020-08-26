---
page_type: sample
languages:
- javascript <br/> html
products:
- microsoft-identity-platform <br/>azure-active-directory-v2<br/>Azure Logic Apps
description: "A simple JavaScript single-page application calling Azure Logic Apps using msal.js"
---

# MSAL JavaScript Single-page Application using Implicit Flow for creating an Azure Logic App

A simple vanilla JavaScript single-page application which demonstrates how to configure [MSAL.JS Core](https://www.npmjs.com/package/msal) to login, logout, acquire an access token and trigger a http trigger of an azure logic app.

**Note:** This sample is heavily edited. Only `authConfig.js, authPopup.js and index.html` are still somewhat the same

**Note:** A quickstart guide covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory/develop/quickstart-v2-javascript).

**Note:** A more detailed tutorial covering this sample can be found [here](https://docs.microsoft.com/azure/active-directory/develop/tutorial-v2-javascript-spa).

## Contents

| File/folder          | Description                                                |
|----------------------|------------------------------------------------------------|
| `JavaScriptSPA`      | Contains sample source files.                              |
| `authPopup.js`       | Main authentication logic resides here (using Popup flow). |
| `authConfig.js`      | Contains configuration parameters for the sample.          |
| `createLogicApp.js`  | Contains the setup process for the Logic App               |
| `index.html`         | Contains the UI of the sample.                             |
| `package.json`       | Package manifest for npm.                                  |
| `README.md`          | This README file.                                          |
| `server.js`          | Implements a simple Node server to serve index.html.       |

## Prerequisites

- [Node](https://nodejs.org/en/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.

## Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [implicit flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow).
2. Open the [/JavaScriptSPA/authConfig.js](./JavaScriptSPA/authConfig.js) file and provide the required configuration values.
3. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Running the sample

1. To start the sample application, run `npm start`.
2. Finally, open a browser to [http://localhost:3000](http://localhost:3000).

## Key points

This sample demonstrates the following MSAL workflows:

* How to configure application parameters.
* How to sign-in with popup and redirect methods.
* How to sign-out.
* How to get user consent incrementally.
* How to acquire an access token.
* How to issue a http request to a logic app
