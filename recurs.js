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

var testObject = {
  //keyStr: "findSomething Here Please",
  //keyNum: 34,
  // keyObj: {
  //   type: {
  //     fuckYou: function () {
  //       let yanex = "jopa";
  //     },
  //   },
  // },
  keyArray: [
    "string of array meow",
    true,
    undefined,
    1324,
    {
      anotherObjKey: "hallo",
    },
    ["heey"],
  ],
  // keyFunc: function () {
  //   let hi = "hi";
  // },
  //keyBool: true,
  //keyNaN: NaN,
  //keySymbol: Symbol('wtf'),
  //keyNull: null,
  //keyUndef: undefined
};
var testArr = ["testObject"];

testArr.forEach((customProp) => {
  scanObject(window[customProp], `${customProp}`, "eey");
});

function scanObject(target, path, info) {
  //console.log(`Path is: ${path}`);
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
          scanObject(value, path.concat(`.${key}`), info);
          break;
        }
        // Diff null from object Object here
        if (value) {
          scanObject(value, path.concat(`.${key}`), info);
          break;
        }
        console.log(`drop|null`);
        break;
      case "function": {
        if (value.toString().includes(info)) {
          console.log(`Found "${info}" inside a function at ${path}.${key}!`);
        }
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
