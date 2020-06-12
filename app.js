var http = require('http');
var express = require("express");
var RED = require("node-red");


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
	
	adminAuth: {
	    //node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here
	    type: "credentials",
	    users: [
          {
	        username: "admin",
	        password: "$2a$08$xHpiNLr5Jc57xT8H12Zlvuv3on37q7pPk4p8FsPuKOhcqlgFzGdPu",
	        permissions: "*"
	        },
          {
            
            username: "hedera_judge",
            password: "$2a$08$l2nPilGFGftCooW2IgVsfutLJi8jYTIjTRrKEgXHJ4lYFP2IY7VQm",
            permissions: "read" }]
	    },
  flowFile: "/app/flows.json",
	nodesDir: "/Users/hash-sdk/node-red/app/nodes",
    	httpAdminRoot:"/",
    	httpNodeRoot: "/hash",
    	uiPort: 8080,
    	functionGlobalContext: { },
  editorTheme: {
    page: {
        title: "Hashgraph World - Build apps using Low Code",
        favicon: "/absolute/path/to/theme/icon",
        css: "/absolute/path/to/custom/css/file",
        scripts: [ "/absolute/path/to/custom/script/file", "/another/script/file"]
    },
    header: {
        title: "Hashgraph World",
        image: "/absolute/path/to/header/image", // or null to remove image
        url: "https://hashgraph.world" // optional url to make the header text/image a link to this url
    },
    deployButton: {
        type:"simple",
        label:"Save & Deploy",
        icon: "/absolute/path/to/deploy/button/image" // or null to remove image
    },
    menu: { // Hide unwanted menu items by id. see packages/node_modules/@node-red/editor-client/src/js/red.js:loadEditor for complete list
        "menu-item-import-library": false,
        "menu-item-export-library": false,
        "menu-item-keyboard-shortcuts": false
    },
    userMenu: false, // Hide the user-menu even if adminAuth is enabled
    login: {
        image: "/absolute/path/to/login/page/big/image" // a 256x256 image
    },
    
    logout: {
        redirect: "https://hashgraph.world"
    },
    palette: {
        editable: true, // Enable/disable the Palette Manager
        catalogues: [   // Alternative palette manager catalogues
            'https://catalogue.nodered.org/catalogue.json'
        ],
        theme: [ // Override node colours - rules test against category/type by RegExp.
            { category: ".*", type: ".*", color: "#ffff" }
        ]
    },
    projects: {
        enabled: false // Enable the projects feature
    }
},
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

app.all('*', ensureSecure); // at top of routing calls

app.enable('trust proxy');

function ensureSecure(req, res, next){
 // console.log(req.protocol)
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://hashgraph.world' + req.url); // express 4.x
}

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8080);

// Start the runtime
RED.start();