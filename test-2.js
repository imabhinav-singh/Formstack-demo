const oneDriveAPI = require('onedrive-api');
const fs = require('fs');

const config = {
    client: {
        id: 'c4c9ef4a-65f5-4991-9e24-95d710620cac',
        secret: '73d363b5-23fc-4d81-8a7c-a5b6efc77229'
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

// const accessToken = "EwB4A8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAQtkZRHhLF78Wv6UdLnj1EH7wDlaIkRuJMrIKba5yqbQU4PJiH4FEc1onXrAVXF3g0W4or9TMzHa979wvfK9N0UPjWhrGScULOsnCWnZmgqwk+Ln1Rexb0iljoc5wRzXEK/m/3iNLlvqb7/jEuTfHPw6ky58FcrcKeTVxod4pZzebxhbY5lC1Nr/ILr165uR84sdDWQapC1fCZjwWU0kJ5bvH+axZFy6cbkD/2Yijd9LE79fvMzw0/fzLHldFz3W4nwelvOJHxAHoc584Wv7Q5Gc8eMBfknrJ/9ljHpYGoSgcoHV+CAQ9uveSLFXQZVc11tDOjQ77YiCxh62z1Rsch4DZgAACDKpvrHFziTbSAKyNv6lGxHDjS4VrZK6X1f/tRB2Qb9O0/ZIAMUWUPT2MnSkZ50/dTTsQ9fa4Do4XbpzaG/+jjkKgaOrmrGcMN4GwEox8lByufhdYpDITkNyAwkvyo8daMbaSXvMIvE9E/CB4kzYi/+NMVTEh5WkWlmpbICNpt1Z63iF+gfDyYWAY4ZXHc3azBgJ5AThztQ2bn/SIIF8LuiIdzDGser9Ryi2aB2Pjxh7kbMNSdO76TzfnGjSJurUCdGiNTjoahvNA1FW1o28WUgcI5RIRcMBDmpl/dcmy5yLdkB/QsC8S/SXj5727YEx9APXMey0hrTxT+7kxhj930lYJAtUy3zVYBZ6PXf6T0cujR58q941AP+P0tjFtLUK0X03QtzAM/xVXXJwp0wG3p0dCA6MBeHMDzl+Qm27pSGsB54buM+hEnc5V7Tw5RVHpjT5DCv/CVW4o/jKHpoMLEOKMiQ+PwfZ8scfMMidpRObdbrldIKxS/LFEFzTrhHtLljueZ6Y1L8Q7UxBQ/DY2ry5TUSMyf3hwsAZBX5hDB/ZWsy0G4YeOEjGCJ1Z7fT4/cGMbuiRkCrZN6vfvPHZZjOnrEJgYi1tPhiWEXfKjbI5J6W9/qLVor7nmwfg65YpEuHuuTqLnNxw+o1PgNbtXJIrrSsXGqp4MeiFAOa3Z18JfWQ+lKNSK2/QCFR++Vbu3vPlNhDoelxzemKOLgmp2oemQ6HHvnr0o1n9+ZPNnXXgvBsq2JP8coQwjIP0Tjvf65xtCQRXzyL/8fjWymtpMxCT8YoC";
