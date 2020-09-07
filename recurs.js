// Turn script timout off
// Mozilla: about:config, dom.max_script_run_time = 0

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
  keyNaN: NaN,
  keyBool: true,
  keyObj: {type: "hi"},
  keyArray: [],
  keySymbol: Symbol('wtf'),
  keyFunc: function() {let hi = "hi"},
  keyNull: null, // Add 
  keyUndef: undefined
}
var testArr = ["testObject"];

testArr.forEach((customProp) => {
  scanObject(window[customProp], `${customProp}`, "One")
});

function scanObject(target, path, info) {
  console.log(path)
  // We loop through an object
	for (const [key, value] of Object.entries(target)) {
    // We check keys of an object
    if (key.includes(info)) {
      console.log(`Found "${info}" in a key of ${path}`);
    }

    // We check for each possible type of value
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          //console.log(`Value is an ARRAY at ${path}.${key}!`);
          break;
        }
        //console.log(`Value is an OBJECT at ${path}.${key}!`);
        break;
      case 'function': {
        //console.log(`Value is a FUNCTION at ${path}.${key}!`);
        break;
      }
      case 'undefined': {
        //console.log(`Value is UNDEFINED at ${path}.${key}!`);
        break;
      }
      case 'string':
      	//console.log(`Value is a STRING at ${path}.${key}!`);
        break;
      case 'number':
        console.log(`Value is a NUMBER or NaN!! at ${path}.${key}!`);
        break;
      case 'boolean':
        //console.log(`Value is a BOOLEAN at ${path}.${key}!`);
        break;
      default:
        console.log(`What the fuck is that value? ${typeof value} at ${path}.${key}`);
    }
  }
}