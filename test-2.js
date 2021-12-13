const oneDriveAPI = require('onedrive-api');
const fs = require('fs');

const config = {
    client: {
        id: '',
        secret: ''
    },
    auth: {
        tokenHost: 'https://api.oauth.com'
    }
};
   
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

async function run() {
    const client = new AuthorizationCode(config);
   
    const authorizationUri = client.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'api://c4c9ef4a-65f5-4991-9e24-95d710620cac/Files.ReadWriteAll',
        //state: '<state>'
    });
   
    // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
    res.redirect(authorizationUri);
   
    const tokenParams = {
        //code: '<code>',
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'api://c4c9ef4a-65f5-4991-9e24-95d710620cac/Files.ReadWriteAll',
    };
   
    try {
        const accessToken = await client.getToken(tokenParams);
        const path = "/home/tanishq/Pictures/minion_wallpaper.jpg";
        const filename = "image.jpg";

        oneDriveAPI.items.uploadSimple({
            accessToken: accessToken,
            filename: filename,
            readableStream: fs.createReadStream(path)
        }).then((item) => {
            console.log(item);
            // returns body of https://dev.onedrive.com/items/upload_put.htm#response
        }).catch((error) => {
            console.log(error);
        });
    } catch (error) {
        console.log('Access Token Error', error.message);
    }
}
   
run();