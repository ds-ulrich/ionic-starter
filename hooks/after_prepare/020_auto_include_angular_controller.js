#!/usr/bin/env node

// Auto Include Angular Controller
// v1.0
// Automatically adds the platform class to the head tag
// before the `prepare` command. By placing the platform CSS classes
// directly in the HTML built for the platform, it speeds up
// rendering the correct layout/style for the specific platform
// instead of waiting for the JS to figure out the correct classes.

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];


function autoIncludeAngularController(indexPath, platform){
  var controllerList = ["<!-- auto generated Controllers List -->"];
  var angAppFolder = '';
  if(platform == 'android') {
    appFolder = path.join('platforms', platform, 'assets', 'www');
  } else {
    appFolder = path.join('platforms', platform, 'www');
  }


  try{
      var recursive = require('recursive-readdir');
      // Ignore files named 'foo.cs' and descendants of directories named test
      recursive(appFolder+'/app', ['!*Controller.js*'], function (err, files) {
        for (var i=0; i<files.length; i++) {
            controllerList.push('<script type="text/javascript" src="'+files[i].replace(appFolder+'/', '')+'"></script>');
        }

        var html = fs.readFileSync(indexPath, 'utf8');
        var headTag = findHeadTag(html);
        if(!headTag) return; // no opening head tag, something's wrong

        html = html.replace(/(<!--controllerList-->)/, controllerList.join("\n\t\t"));
        fs.writeFileSync(indexPath, html, 'utf8');

        console.log(controllerList);  
      });
      // fs.readdir(angAppFolder, function(err, items) {
          
      // }); 
      
  }catch(e){
      process.stdout.write(e);
  }
}

function findHeadTag(html) {
  // get the body tag
  try{
    return html.match(/<head[^>]*>[\s\S]*<\/head>/gi)[0];
  }catch(e){}
}

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath;

      if(platform == 'android') {
        indexPath = path.join('platforms', platform, 'assets', 'www', 'index.html');
      } else {
        indexPath = path.join('platforms', platform, 'www', 'index.html');
      }

      if(fs.existsSync(indexPath)) {
        autoIncludeAngularController(indexPath, platform);
      }

    } catch(e) {
      process.stdout.write(e);
    }
  }

}
