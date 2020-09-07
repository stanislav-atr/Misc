// Turn script timout off
// Mozilla: about:config, dom.max_script_run_time = 0

//
/*
(function printWindowProperties() {
  try {
      let iframe = document.createElement('iframe');
      document.body.appendChild(iframe);

      let standardWindow = iframe.contentWindow;
      for (let key in window) {
          if (typeof standardWindow[key] !== 'undefined') {
              // Ignore, this is a standard property
          } else {
              console.log(key);
          }
      }
  } catch (ex) {
      document.body.removeChild(iframe);
  }
})();
*/

// Get list of non-standart objects
var notDefaultArray = findCustomProperties();

function findCustomProperties() {
  let customProps = [];
  
  let iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  
  let cleanWindow = iframe.contentWindow;
  for (let key in window) {
		if (typeof cleanWindow[key] == "undefined") {
      customProps.push(key);
    }
  }
  document.body.removeChild(iframe);
  return customProps;
}


// Testing
// 0. Paste big array instead
// 1. Concat label and parent for next recursive calls
// 2. Check for all cases of values: Number, String, Array of [all cases\mixed], Objects etc
// 3. 

var testObject = {
  keyStr: "string",
  keyNum: 34,
  keyBool: true,
  keyObj: {},
  keyArray: [],
  keySymbol: Symbol('wtf'),
  keyFunc: function() {let hi = "hi"},
  keyNull: null, // Add 
  keyNaN: Nan, // these
  keyUndef: undefined // types
}
var testArr = ["testObject"];

testArr.forEach((customProp) => {
  scanObject(window[customProp], `${customProp}`, "One")
});

function scanObject(target, path, info) {
  console.log(path)
  // We loop through an object
	for (const [key, value] of Object.entries(target)) {
    // We check keys 
    if (key.includes(info)) {
      console.log(`Found "${info}" in a key of ${path}`);
    }
    // We check for each possible
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          console.log(`Value is an ARRAY at ${path}.${key}!`);
          break;
        }
        console.log(`Value is an OBJECT at ${path}.${key}!`);
        break;
      case 'function': {
        console.log(`Value is a FUNCTION at ${path}.${key}!`);
      }
      case 'string':
      	console.log(`Value is a STRING at ${path}.${key}!`);
        break;
      case 'number':
        console.log(`Value is a NUMBER at ${path}.${key}!`);
        break;
      case 'boolean':
        console.log(`Value is a BOOLEAN at ${path}.${key}!`);
        break;
      default:
        console.log(`What the fuck is that value? ${typeof value} at ${path}.${key}`);
    }
  }
}