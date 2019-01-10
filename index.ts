// https://github.com/pnp/pnpjs Source SDK for this app
// https://pnp.github.io/pnpjs/

// Output from SharePoint authentication
// The app identifier has been successfully created.
// Client Id:  	ClientID
// Client Secret:  	ClientSecret
// Title:  	SharePoint Uploader
// App Domain:  	www.test123.com
// Redirect URI:  	https://www.test123.com

// Client ID and secret
export var clientID: string = "clientID";
export var clientSecret: string = "clientSecret";

declare var require: (s: string) => any;

import { sp } from "@pnp/sp";
import { SPFetchClient } from "@pnp/nodejs";

// Other imports if required for later
// import { getRandomString } from "@pnp/common";
// import {  Web, Folder, ContentType } from "@pnp/sp";
// import { Logger, LogLevel } from "@pnp/logging";
// import { ODataDefaultParser } from "@pnp/odata";
// import { ConsoleListener } from "@pnp/logging";
// import { JSONParser } from "@pnp/odata";

if (process.argv.length <= 4) {
    console.log("Usage: " + __filename + "node index.js zipFileToUpload desiredfilename folderRelativeLocation");
    console.log("Sample argument  \"node index.js \"/full/path/to/the/file\"  test.zip \"/Shared Documents/relative/path/on/SharePoint/\"");
    process.exit(-1);
}

var fs = require('fs');
 
var fileBuffer = fs.readFileSync(process.argv[2]);
// console.log(fileBuffer);

/* url to your web site */
export var siteUrlBase: string = 'https://domain.sharepoint.com';

(function() {
  sp.setup({
        sp: {
            fetchClientFactory: () => {
                return new SPFetchClient(siteUrlBase, clientID, clientSecret);
            },
        },
    });

    //////// Single small file upload, works fine
    console.log("Uploading " + process.argv[2] + " to SharePoint at " + process.argv[4] + " with file name " + process.argv[3]);
    console.log("Wait for the upload to finish...")
    sp.web.getFolderByServerRelativeUrl(process.argv[4]).files.add(process.argv[3], fileBuffer, true).then(_ => {
        console.log("\nfinished uploading file\n");
    }).catch(e => {
        console.log("\nError in file upload\n");
        console.error(e);
    });

    ////// Large file upload, still has errors
    // console.log("Uploading " + process.argv[2] + " to SharePoint at " + process.argv[4] + " with file name " + process.argv[3]);
    // console.log("Wait for the upload to finish...")
    // sp.web.getFolderByServerRelativeUrl(process.argv[4]).files.addChunked(process.argv[3], fileBuffer, data => {

    //     console.log( data, " progress" );

    // }, true).then(_ => {
    //     console.log("\nfinished uploading file\n");
    // }).catch(e => {
    //     console.log("\nError in file upload\n");
    //     console.error(e);
    // });

    // Code below to get a file from SharePoint and do a console.log for text data
    // sp.web.getFileByServerRelativeUrl((filePath)).getText().then((text: string) => {
    //     console.log("\n\n\n\nfinished getting file");
    //     console.log(text);
    // }).catch(e => {
    //     console.log("Error in files get");
    //     console.error(e);
    // });
})()