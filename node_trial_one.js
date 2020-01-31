const http = require('http');
const os = require('os');
const fs = require('fs');
const path = require('path');
const url = require('url');

let WIRELESS_IP = null;
const HOME_DIR = os.homedir();

const setIp = () => {
    let networkInterfaces = os.networkInterfaces();
    for (let i in networkInterfaces) {
        let regEx = /wlp/gi;
        if (regEx.test(i)) {
            networkInterfaces[i].forEach(ip => {
                if (ip.family === "IPv4") {
                    WIRELESS_IP = ip.address;
                }
            });
        }
    } 
}


http.createServer((request, response) => {
    const route = request.url;
    console.log(route);
    let css_ext = /css/gi;
    let js_ext = /js/gi;
    let jpg_ext = /jpg/gi;
    let png_ext = /png/gi;

    let newRoute = path.join(__dirname, "public", route.replace(/\W/, ""));
    // static files
    if(css_ext.test(route)) {
        response.writeHead(200, {
            "Content-Type": "text/css",
        });
        console.log(newRoute);
        fs.readFile(newRoute, "utf8", (err, data) => {
            if(data)
                response.end(data, "utf8");
        })
    } else if(js_ext.test(route)) {
        response.writeHead(200, {
            "Content-Type": "text/js",
        });
        console.log(newRoute);
        fs.readFile(newRoute, "utf8", (err, data) => {
            if(data)
                response.end(data, "utf8");
        })
    } else if(jpg_ext.test(route) || png_ext.test(route)) {
        
    }
    
    // home route
    if(route === "/") {
        if(WIRELESS_IP === null) {
            setIp();
        }
        fs.readFile(path.join(__dirname, "public", "html", "index.html"), "utf8" , (err, data) => {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            if(err) {
                response.end(`<h1>404</h1>`);
            } else {
                response.end(data);
            }
        });
    }

}).listen(5000);
