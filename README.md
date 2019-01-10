# SharePointNodeJS
This is a simple, command-line app to upload files to SharePoint using Node.JS and PNPJS
The source and most code comes from here 
https://github.com/pnp/pnpjs Source SDK for this app
https://pnp.github.io/pnpjs/
Some example apps on their website did not compile out of box for me
I need just a utility to upload files to SharePoint from a command line
curl -ntlm does not work because of authentication anymore, probably starting from SharePoint 2016

To Run, follow these steps
npm install
tsc
node index.js "/full/path/to/the/file"  desiredfilename.zip "/relative/path/on/SharePoint/"

To generate client ID and secrets
https://pnp.github.io/pnpjs/nodejs/docs/sp-fetch-client/
https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/development-experience-tenant-apponly-permissions-in-sharepoint-online


Useful links
https://github.com/s-KaiNet/node-pnpjs-sample 
