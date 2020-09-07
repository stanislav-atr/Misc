// Turn script timout off
// Mozilla: about:config, dom.max_script_run_time = 0

// Get list of non-standart objects
var notDefaultArray = findCustomProperties();

function findCustomProperties() {
  let customProps = [];

  let iframe = document.createElement("iframe");
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
// 3. Get functions as its string repr

var testObject = {
  //keyStr: "findSomething Here Please",
  //keyNum: 34,
  //keyObj: {type: "hi"},
  //keyArray: [],
  keyFunc: function () {
    let hi = "hi";
  },
  //keyBool: true,
  //keyNaN: NaN,
  //keySymbol: Symbol('wtf'),
  //keyNull: null,
  //keyUndef: undefined
};
var testArr = ["testObject"];

testArr.forEach((customProp) => {
  scanObject(window[customProp], `${customProp}`, "34");
});

function scanObject(target, path, info) {
  console.log(`Path is: ${path}`);
  // We loop through an object
  for (const [key, value] of Object.entries(target)) {
    // We check keys of an object
    if (key.includes(info)) {
      console.log(`Found "${info}" in a key of ${path}`);
    }

    // We check for each possible type of value
    switch (typeof value) {
      case "object":
        if (Array.isArray(value)) {
          console.log(`Value is an ARRAY at ${path}.${key}!`);
          break;
        }
        // Diff null from object Object here
        if (value) {
          console.log(`Value is an OBJECT at ${path}.${key}!`);
          break;
        }
        console.log(`drop|null`);
        break;
      case "function": {
        console.log(`Value is a FUNCTION at ${path}.${key}!`);
        break;
      }
      case "string":
        let lowerValue = value.toLowerCase();
        let lowerInfo = info.toLowerCase();
        if (lowerValue.includes(lowerInfo)) {
          console.log(`Found "${info}" as a string value at ${path}.${key}!`);
        }
        break;
      case "number":
        if (isNaN(value)) {
          console.log(`drop|NaN`);
          break;
        }
        let unifiedValue = value.toString().toLowerCase();
        let unifiedInfo = info.toString().toLowerCase();
        if (unifiedValue.includes(unifiedInfo)) {
          console.log(`Found "${info}" as a number value at ${path}.${key}!`);
          break;
        }
      case "undefined":
        console.log(`drop|undefined`);
        break;
      case "boolean":
        console.log(`drop|boolean`);
        break;
      default:
        console.log(`drop|BigInt,Symbol`);
    }
  }
}
