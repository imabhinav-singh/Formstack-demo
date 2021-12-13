const https = require('https');
const FileReader = require('filereader');
const http = require('http');
var path = "/home/tanishq/Pictures/minion_wallpaper.jpg";
var uri = "https://graph.microsoft.com/v1.0/me/drive/root:"+"/ABC.txt"+":/content";
const access_token = "EwB4A8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAQtkZRHhLF78Wv6UdLnj1EH7wDlaIkRuJMrIKba5yqbQU4PJiH4FEc1onXrAVXF3g0W4or9TMzHa979wvfK9N0UPjWhrGScULOsnCWnZmgqwk+Ln1Rexb0iljoc5wRzXEK/m/3iNLlvqb7/jEuTfHPw6ky58FcrcKeTVxod4pZzebxhbY5lC1Nr/ILr165uR84sdDWQapC1fCZjwWU0kJ5bvH+axZFy6cbkD/2Yijd9LE79fvMzw0/fzLHldFz3W4nwelvOJHxAHoc584Wv7Q5Gc8eMBfknrJ/9ljHpYGoSgcoHV+CAQ9uveSLFXQZVc11tDOjQ77YiCxh62z1Rsch4DZgAACDKpvrHFziTbSAKyNv6lGxHDjS4VrZK6X1f/tRB2Qb9O0/ZIAMUWUPT2MnSkZ50/dTTsQ9fa4Do4XbpzaG/+jjkKgaOrmrGcMN4GwEox8lByufhdYpDITkNyAwkvyo8daMbaSXvMIvE9E/CB4kzYi/+NMVTEh5WkWlmpbICNpt1Z63iF+gfDyYWAY4ZXHc3azBgJ5AThztQ2bn/SIIF8LuiIdzDGser9Ryi2aB2Pjxh7kbMNSdO76TzfnGjSJurUCdGiNTjoahvNA1FW1o28WUgcI5RIRcMBDmpl/dcmy5yLdkB/QsC8S/SXj5727YEx9APXMey0hrTxT+7kxhj930lYJAtUy3zVYBZ6PXf6T0cujR58q941AP+P0tjFtLUK0X03QtzAM/xVXXJwp0wG3p0dCA6MBeHMDzl+Qm27pSGsB54buM+hEnc5V7Tw5RVHpjT5DCv/CVW4o/jKHpoMLEOKMiQ+PwfZ8scfMMidpRObdbrldIKxS/LFEFzTrhHtLljueZ6Y1L8Q7UxBQ/DY2ry5TUSMyf3hwsAZBX5hDB/ZWsy0G4YeOEjGCJ1Z7fT4/cGMbuiRkCrZN6vfvPHZZjOnrEJgYi1tPhiWEXfKjbI5J6W9/qLVor7nmwfg65YpEuHuuTqLnNxw+o1PgNbtXJIrrSsXGqp4MeiFAOa3Z18JfWQ+lKNSK2/QCFR++Vbu3vPlNhDoelxzemKOLgmp2oemQ6HHvnr0o1n9+ZPNnXXgvBsq2JP8coQwjIP0Tjvf65xtCQRXzyL/8fjWymtpMxCT8YoC";


const clientId = "c4c9ef4a-65f5-4991-9e24-95d710620cac"; // Client Id of the registered application
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