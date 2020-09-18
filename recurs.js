var info = "sad";

// var testObject = {
//   keykeyFunc: function() {
//     let WTF = "sadlkfng;kdsfn;gslfdkn";
//     console.log(WTF);
//   }
// }
// testArray.forEach((customProp) => {
//   // Filter false results
//   if (!window[customProp]) return;
//   scanObject(window[customProp], `${customProp}`, info);
// });


// Get list of non-standart objects
var notDefaultArray = findCustomProperties();

// Recursively scan object for info
notDefaultArray.forEach((customProp) => {
  // Filter false results
  if (!window[customProp]) return;
  scanObject(window[customProp], `${customProp}`, info);
});


//* В var info = "searchString" не должно быть кавычек.
// Uncaught InternalError: too much recursion — посмотреть, на чем именно вспотыкается — завернуть в try {} catch мб
// Результирующие локации собирать вместе?
// вывести под общий знаменатель value.toLowerCase() & value.toString()?????
// разбить под билдер
// ебануть gulp


function scanObject(target, path, info) {
  //console.log(`Path is: ${path}`);
  let lowerInfo = info.toLowerCase();

  // We loop through an object
  for (const [key, value] of Object.entries(target)) {
    // We check keys of an object
    if (key.toLowerCase().includes(lowerInfo)) {
      console.log(`Found "${key}" as a key of ${path}!`);
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
      case "function": { // DONE
        let funcString = value.toString().toLowerCase();
        if (funcString.includes(lowerInfo)) {
          console.log(`Found "${info}" inside a function at ${path}.${key}!`);
        }
        break;
      }
      case "string": // DONE
        if (value.toLowerCase().includes(lowerInfo)) {
          console.log(`Found "${info}" as a string value at ${path}.${key}!`);
        }
        break;
      case "number": // DONE
        if (isNaN(value) && info == "NaN") {
          console.log(`Found "${info}" as value of ${path}.${key}!`);
          break;
        }
        if (value.toString().includes(lowerInfo)) {
          console.log(`Found "${info}" as a number value at ${path}.${key}!`);
          break;
        }
      case "undefined": // DONE
				if (lowerInfo == "undefined") {
          console.log(`Found an undefined value at ${path}.${key}!`);
        }
        break;
      case "boolean": // DONE
				if (value.toString() == lowerInfo) {
          console.log(`Found boolean ${info} value at ${path}.${key}!`);
        }
        break;
      default:
        break;
    }
  }
}

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