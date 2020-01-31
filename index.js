const express = require('express');
const path = require('path'); 
const os = require('os');
const fs = require('fs');

let WIRELESS_IP;
let HOME_DIR = os.homedir();


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

setIp(); 

const app = new express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (request, response) => {
    response.render("index", {
        title: "This is not a test",
        children: getFolders(),
        WIRELESS_IP
    });
});

app.get("/:file", (request, response) => {
    let {file} = request.params;
    response.send(file);
});

app.get("/folder_view/:file", (request, response) => {
    let {file} = request.params;
    let folderDir = `${HOME_DIR}/${file.replace(/\|/g, "/")}`;
    let title = path.basename(folderDir);
    console.log(file); 
    response.render("folder_view", {
        WIRELESS_IP,
        title,
        children: getFolders(folderDir),
        parentFolders: folderDir.replace(`${HOME_DIR}/`, "").split("/"),
        route: file
    });
});

app.get("/download/:file", (request, response) => {
    let { file } = request.params;
    let fileDir = `${HOME_DIR}/${file.replace(/\|/g, "/")}`;

    response.download(fileDir, (err) => {
        if(err) response.send("File Not Found");
    });
});

app.listen(3000);


let getFolders = (dirname = null) => {
    let dir = dirname? dirname: HOME_DIR;
    let folders = [];
    let files = [];
    let children = fs.readdirSync(dir);

    children.forEach(file => {
        let formattedPath = `${dir}/${file}`.replace(`${HOME_DIR}/`, "").replace(/\//gi, "|");
        let stats = fs.statSync(`${dir}/${file}`);
        if(file.split("")[0] !== ".")
            stats.isDirectory() ? folders.push({ name: file, path: `${dir}/${file}`, formattedPath }) : files.push({ name: file, path: `${dir}/${file}`, formattedPath });
    });
    let child = {
        folders,
        files
    };

    return child;

}