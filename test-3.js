const FileReader = require('filereader');
const http = require('https');
var path = "/home/tanishq/Pictures/minion_wallpaper.jpg";
var uri = "https://graph.microsoft.com/v1.0/me/drive/root:"+"/ABC.txt"+":/content";
const access_token = "EwB4A8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAZXXReog+d6VZjwgrVSywazYv0MoH3Aou/JqQEt93y7m1WZrXRsNURoQ+4FqIlOVBXHtxQ0e+Mn8DPs0D0ADtzyWzPBX7Oq4+IaAk8RWWJ6fD3j0RRL9JJjaQtMv4Ts8mF10beBkcQN8xFr2V4EXAXC1UIYBV8gk7UfhXWuZhQLq/uQoBWzuHKTdNcRm7H4P8gHFYrdaGURjpNN0LONV09o8Zammmu7Psjm5S8hbhFOSxyBbrttlX/wwMyseYAHucgl+DTKf6kUrNGT7RjZx3qOCpbtkfe3y5cCdE6pPliIbikb41yjU/uNpfHiGG04CqQYFuillvIzcbZ2x7cKqJEoDZgAACCdxrLt21mpZSAIEMFzApRyY1JhOaVYBdD4t4VigtbLh4LG/DOFhPdnATkOut3MZ8P9Qf/xPq0JqCXPcQ90KWPCfiHylbcfRwmNEhqh/Op+1sdKJpQYBs61mHwPwMIO15N9v23olBa5T/yr92f5H8bHX98gjVOGxzwkG/VDpWVwZHZFsjUp3lHJh2gRGuVXl+he4aq+sOPIzVquGu6Slwa7B5veIHz8b7ZswTKaNVfgtpedFyKAQNTCqjEEq4a3PmwxzukiMZLWNxuWP+n8d5dU2i9E4c2l/pGdwcDyL2b8u4N9dwzBHyMEuhmXvUu04efIwL2tdBGWo4YSTP3gEXe3PGP1JF3/KtLvSFEDkZrbSCO9WIzfJM3wQSrfF5GgsyD8bBqXx9sgahh86zkbjFtCG9/S9Cgvrma8D7R4NYOgu7DWpk3VkpMkFVe7PfNi21haX1pl5+LbqeBO/DzTtqaRf6EYXBPuJZSvV60gpHRvgDvqbxofv5R14l54Tl6mjulu0FGgY7R9GSruXk6zNXfuqqTfcxk35tPBHfwx48idzXNBea0zqJUPmXWWswVfk1CL3fHvT97fNz3amM691LCpEXkZn7AWXc+CX5hjQLfMGCyPI/yU+rU8TXG9CYyrk/366kLhhbKFvYi9O5Z+5LpAjw2EUxfqoIJZmY08XB9DV7t+ScgdCrkY+eiAAYohJHqp+qTs8ffsuyOC/oyeXmw7Ld/Dzn7KxrupKIuIg7lTJvWufby9UXMtY6dGkMBFRIRPXLryZx0r0kj8QYoncWPoI/ooC";


(async function main() {
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
            console.log('Error:- ', err);
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
})();

async function getBinaryStream(path) {
    return new Promise((resolve, reject) => {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            resolve(fileReader.result);
        }
        fileReader.readAsBinaryString(path);
    });
}