"use strict";
window.addEventListener("load", function() {
  var log = function(text) {
    console.log(text);
    document.body.appendChild(document.createTextNode(text));
    document.body.appendChild(document.createElement('br'));
  };
  log("Hello World!");
  window.setInterval(function() {
    document.getElementsByTagName('h1')[0].textContent = (new Date()).toString();
  }, 1000);
  (function () {
    if (typeof(navigator.getDeviceStorage) == 'undefined') {
      log('no device storage');
    }
    var sdcard = navigator.getDeviceStorage("sdcard");
    var file = new Blob(["This is a text file."], {type: "text/plain"});

    var request = sdcard.addNamed(file, "myFile.txt");

    request.onsuccess = function () {
      var name = this.result.name;
      log('File "' + name + '" successfully wrote on the sdcard storage area');
    };

    request.onerror = function () {
      log('Unable to write the file: ' + this.error.name);
    };
  })();
  
  var manifest_url = location.href.replace(/index\.html$/, '') + 'manifest.webapp';
  log(manifest_url);
  (function () {
    var installCheck = navigator.mozApps.checkInstalled(manifest_url);

    var button = document.getElementById('install-btn');
    
    installCheck.onsuccess = function() {
      if (installCheck.result) {
        log('installed');
        button.style.display = "none";
      } else {
        log('not-installed')
        button.addEventListener('click', function (ev) {
          ev.preventDefault();
          var request = window.navigator.mozApps.install(manifest_url);
          request.onsuccess = function () {
            // Save the App object that is returned
            var appRecord = this.result;
            log('Installation successful!');
          };
          request.onerror = function () {
            // Display the error information from the DOMError object
            log('Install failed, error: ' + this.error.name);
          };
        }, false);
      };
    };
  })();
  
});
