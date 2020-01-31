# Joocy File Share
## Intro
This service tries to expose files from a host computer to another computer connected to the same network.

## How to set up
- Ensure you have __node__ set up on your system. 
- use `git clone https://github.com/sloppie/file-share-service.git` to clone the repository into your system
- `cd` into the root folder of the repository.
- run `npm i` to install all the dependencies listed in the package.json file
- on the terminal, run the command `node index` to get the server started.
- on startup, the terminal will show you the ip address of your workstation.
- copy this ip address and on the other computer fire up a browser and write the address in the format below: `relevant_ip:3000`
- By now you should see the home folder of the host computer on the other computers that access this website.
- avigate to the relevant folders and use the press the download button on the files section in any page to download any file

enjoy :)

sloppie