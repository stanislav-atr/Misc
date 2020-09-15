var info = "block";

// Get list of non-standart objects
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
  
  // Remove root frames
  let re = /^[0-9]$/
  customProps = customProps.filter((elem) => !elem.match(re))
  
  return customProps;
}
var notDefaultArray = findCustomProperties();

// Recursively scan object for info
notDefaultArray.forEach((customProp) => {
  // Filter false results
  if (!window[customProp]) return;
  scanObject(window[customProp], `${customProp}`, info);
});


// every info to string and to lower case?
// 


function scanObject(target, path, info) {
  //console.log(`Path is: ${path}`);
  let lowerInfo;

  if (typeof info == "string" || typeof info == "number") lowerInfo = info.tostring().toLowerCase();
  console.log(`LOWER INFO IS ${lowerInfo}`)
  // We loop through an object
  for (const [key, value] of Object.entries(target)) {
    // We check keys of an object
    if (key.toLowerCase().includes(lowerInfo)) {
      console.log(`Found "${key}" as a key of ${path}`);
    }
    // We check for each possible type of value
    switch (typeof value) {
      case "object":
        if (Array.isArray(value)) {
          scanObject(value, path.concat(`.${key}`), info);
          break;
        }
        // Diff null from [object Object] here
        if (value) {
          scanObject(value, path.concat(`.${key}`), info);
          break;
        }
        //console.log(`drop|null`);
        break;
      case "function": {
        //let funcString = value.toString().toLowerCase();
        //let lowerinfo = info.toLowerCase();
        if (funcString.includes(lowerinfo)) {
          console.log(`Found "${info}" inside a function at ${path}.${key}!`);
        }
        break;
      }
      case "string":
        //let lowerValue = value.toLowerCase();
        //let lowerInfo = info.toLowerCase();
        if (lowerValue.includes(lowerInfo)) {
          console.log(`Found "${info}" as a string value at ${path}.${key}!`);
        }
        break;
      case "number":
        if (isNaN(value)) {
          //console.log(`drop|NaN`);
          break;
        }
        //let unifiedValue = value.toString().toLowerCase();
        //let unifiedInfo = info.toString().toLowerCase();
        if (unifiedValue.includes(unifiedInfo)) {
          console.log(`Found "${info}" as a number value at ${path}.${key}!`);
          break;
        }
      case "undefined":
				if (info == "undefined") {
          console.log(`Found an undefined value at ${path}.${key}!`);
        }
        break;
      case "boolean":
				if (value == info) {
          console.log(`Found boolean ${info} value at ${path}.${key}!`);
        }
        break;
      default:
        break;
    }
  }
}