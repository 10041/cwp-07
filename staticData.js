const fs = require('fs');
const path = require('path');
const _url = require('url');

const pathFromUrl = {
    '/': '/public/index.html',
    '/index.html': '/public/index.html',
    '/form.html': '/public/form.html',
    '/app.js': '/public/app.js',
    '/form.js': '/public/form.js',
    '/site.css': '/public/site.css',
    '/jquery-3.2.1.min.js': '/public/jquery-3.2.1.min.js'
}

contentTypes = {
    'html'  : 'text/html',
    'js'    : 'text/javascript',
    'json'  : 'application/json',
    'css'   : 'text/css',
    'text'  : 'text/plain',
};

module.exports = class staticData {
    static getFile(req, resp, payload, cb, url){
        //console.log(url);
        let path = `.${pathFromUrl[_url.parse(req.url, true).pathname]}`;
        let type = getType(path);
        resp.writeHead(200, {"Content-Type":`${contentTypes[type]}`});
        fs.createReadStream(path).pipe(resp);
    }
}
function getType(path){
    let obj = path.split('.');
    return obj[obj.length - 1];
}