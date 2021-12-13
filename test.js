// import * as Msal from "msal";
// import * as Graph from "@microsoft/microsoft-graph-client";

const Msal = require('msal');
const Graph = require('@microsoft/microsoft-graph-client')
// import { ImplicitMSALAuthenticationProvider } from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
// import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';

// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const msalConfig = {
	auth: {
		clientId: "<client-ID>", // Client Id of the registered application
		redirectUri: "http://localhost",
	},
	cache: {
		cacheLocation:  "localStorage",
		storeAuthStateInCookie: true
	}
};
const graphScopes = ["user.read", "mail.send"]; // An array of graph scopes

// Important Note: This library implements loginPopup and acquireTokenPopup flow, remember this while initializing the msal
// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js#1-instantiate-the-useragentapplication
const msalApplication = new Msal.UserAgentApplication(msalConfig);
const options = new Graph.MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new Graph.ImplicitMSALAuthenticationProvider(msalApplication, options);

const requestOptions = {
	authProvider, // An instance created from previous step
};
const client = Graph.Client.initWithMiddleware(requestOptions);

(async function main() {
	try {
		let userDetails = await client.api("/me/drive/root:/ABC.txt:/content").put(content="This is a test file");
		console.log(userDetails);
	} catch (error) {
		throw error;
	}
})();