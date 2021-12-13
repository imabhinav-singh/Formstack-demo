const https = require('https');
const FileReader = require('filereader');
const http = require('http');
var path = "/home/tanishq/Pictures/minion_wallpaper.jpg";
var uri = "https://graph.microsoft.com/v1.0/me/drive/root:"+"/ABC.txt"+":/content";
const access_token = "<access-token-here>";


const clientId = "<client-ID>"; // Client Id of the registered application
const callback = (errorDesc, token, error, tokenType) => {};
// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const options = {
	redirectUri: "http://localhost",
};
const graphScopes = ["user.read", "mail.send"]; // An array of graph scopes

// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#initialization-of-msal
const userAgentApplication = new Msal.UserAgentApplication(clientId, undefined, callback, options);
const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(userAgentApplication, graphScopes);

const options = {
	authProvider, // An instance created from previous step
};
const Client = MicrosoftGraph.Client;
const client = Client.initWithMiddleware(options);


(
    async function main() {
        // var fileStream = await getBinaryStream(path);
        var options = {
            method: 'PUT',
            uri: uri,
            headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "text/plain"
            },
            body: "This is a test file",
            json: true
        };

        var req = http.request(options, function(err, res, body) {
            if(err) {
                console.log('Error:- '+ err);
            } else {
                console.log(body);
            }
        });       
        
        req.end()

        // const req = https.request(options, res => {
        //     console.log(`statusCode: ${res.statusCode}`)
          
        //     res.on('data', d => {
        //         process.stdout.write(d)
        //     });
        // });
          
        // req.on('error', error => {
        //     console.error(error)
        // });
          
        // req.write(fileStream);
        // req.end();
    }
)();

async function getBinaryStream(path) {
    return new Promise((resolve, reject) => {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            resolve(fileReader.result);
        }
        fileReader.readAsBinaryString(path);
    });
}