const FileReader = require('filereader');
const http = require('https');
var path = "/home/tanishq/Pictures/minion_wallpaper.jpg";
var uri = "https://graph.microsoft.com/v1.0/me/drive/root:"+"/ABC.txt"+":/content";
const access_token = "";


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