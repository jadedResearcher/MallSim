let ele;

let how_long_well_let_them_explore = 500;

/*
the mall is afraid of fridays
black friday
it doesn't know whats special about that
something about fridays makes people rip and tear into each other
just for things
any other day they simply use little bits of paper and metal
but fridays
something goes wrong
the rest of zampanio warns you off on friday
but mall sim shows you why
*/
const isItFriday = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const friday = urlParams.get('friday'); //you can escape friday if you say its not friday
  if (((new Date().getDay() === 5 && friday !== "false") || friday === "true")) {
    return true;
  }
  return false;

}

const isItFridayOrMidnight = () => {
  //midnight and fridays are wungle time
  const date = new Date();
  if (date.getHours() == 0 || date.getDay() === 5) { //unlike regular friday chec, this can't be escaped with params by wastes
    return true;
  }
  return false;
}

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));


const calculatePerformanceInSeconds = (startTime, endTime) => {
  return Math.round((endTime - startTime) / 1000);
}

const calculatePerformanceInMilliSeconds = (startTime, endTime) => {
  return (endTime - startTime);
}



/*
taking in a content ele is a pattern i learned from work, feels weird using it in vanilla
*/
const popup = (title, contentEle) => {
  const popupEle = createElementWithClassAndParent("div", document.querySelector("body"), "popup");

  popupEle.focus();
  const titleSection = createElementWithClassAndParent("div", popupEle, "popup-title-container");
  const titleEle = createElementWithClassAndParent("div", titleSection, "popup-title");
  titleEle.innerText = title;

  const closeButton = createElementWithClassAndParent("button", titleSection, "popup-button");
  closeButton.innerText = "X";

  const popupbody = createElementWithClassAndParent("div", popupEle, "popup-body");
  popupbody.append(contentEle);

  closeButton.onclick = () => {
    popupEle.remove();
    //just in case somehow theres multiple
    document.querySelectorAll(".popup").forEach((x) => x.remove());
  }

  return popupEle;
}


//from view-source:https://www.yyyyyyy.info/
function animateTitle(i) {
  var message = [
    '▁▂▃▄▅▆▇ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▂▁▂▃▄▅▆` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▃▂▁▂▃▄▅ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓',
    '▄▃▂▁▂▃▄` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓',
    '▅▄▃▂▁▂▃ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▆▅▄▃▂▁▂` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▇▆▅▄▃▂▁ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓',
    '▆▇▆▅▄▃▂` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓',
    '▅▆▇▆▅▄▃ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▄▅▆▇▆▅▄` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓',
    '▃▄▅▆▇▆▅ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓',
    '▂▃▄▅▆▇▆` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓'
  ]

  i >= message.length - 1 ? (i = 0) : i++,
    (document.title = message[i]),
    setTimeout(() => { animateTitle(i + 1) }, 200)
}


const fuckShitUPAnimation = (ele) => {
  const mildAmount = getRandomNumberBetween(1, 15 * 5);
  const extremeAmount = getRandomNumberBetween(1, 5);
  const normalWidth = parseInt(ele.style.width);
  const normalHeight = parseInt(ele.style.height);
  const extremeOptions = [`background-position-y: ${getRandomNumberBetween(0, normalHeight)}`,
  `background-position-x: ${getRandomNumberBetween(0, normalWidth)}`,
  `transform: rotate(${Math.random()}turn);`,
  `opacity: ${0.5 + Math.random() * 2}`,
    `filter: grayscale(1);`,
    `filter: sepia(0.2);`,
  `filter: blur(${getRandomNumberBetween(1, 3)}px);`,
  `filter: blur(${getRandomNumberBetween(1, 3)}px);`,

    `filter: brightness(.75);`, `filter: brightness(1.15);`,
    `filter: hue-rotate(180);`, `width: ${normalWidth + mildAmount}px;`,
  `height: ${normalHeight + mildAmount}px;`,
  `height: ${normalHeight - mildAmount}px;`,
  `width: ${normalHeight - mildAmount}px;`,
  `translate(${mildAmount}px, ${mildAmount}px);`,
  `translate(${mildAmount}px);`, `translate(0px, ${mildAmount}px);`];
  const options = extremeOptions;
  const animation_name = "no" + getRandomNumberBetween(0, 999999);
  const inadvisable_hacked_css_keyframe = `
 @keyframes ${animation_name} {
  0% { ${pickFrom(options)} }
  50% { ${pickFrom(options)} }
  100% { ${pickFrom(options)} }

 `
  ele.innerHTML = "";
  const absolute_bullshit = createElementWithClassAndParent("style", ele);
  absolute_bullshit.textContent = inadvisable_hacked_css_keyframe;
  const timing_functions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end"];
  const animation = `${animation_name} ${getRandomNumberBetween(1, 10) * Math.random()}s ${pickFrom(timing_functions)} ${Math.random() * getRandomNumberBetween(1, 10)}s infinite`;
  ele.style.animation = animation;
}

//from info token reader!
const getBullshitCSS = (allowFilters) => {
  let css = "";
  const filters = ["contrast(2)", "contrast(1.5)", "hue-rotate(45deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "blur(1px)", "blur(5px)", "blur(10px)", "blur(15px)", "blur(25px)", "blur(20px)", "blur(30px)", "blur(35px)", "blur(40px)"];

  for (let i = 0; i < 13; i++) {
    filters.push(`contrast(${i / 5})`);
    filters.push(`hue-rotate(${i * 10}deg)`);

  }

  var terribleCSSOptions = [["text-align", "center"], ["text-align", "right"], ["text-align", "left"], ["text-align", "justify"], ["position: ", "fixed"], ["float: ", "left"], ["float: ", "right"], ["width: ", "????"], ["height: ", "????"]];
  var reallyRand = getRandomNumberBetween(1, 10);
  const chosenFilters = [];
  for (var i = 0; i < reallyRand; i++) {
    var indexOfTerribleCSS = getRandomNumberBetween(0, terribleCSSOptions.length - 1)
    if (Math.random() > 0.5) {
      allowFilters && chosenFilters.push(pickFrom(filters));
    }
    var tin = terribleCSSOptions[indexOfTerribleCSS]
    if (tin[1] == "????") {
      tin[1] = getRandomNumberBetween(1, 100) + "%";
    }
    css += tin[0] + tin[1] + ";";
  }
  css += "min-width: 60px; min-height:60px; font-size: " + getRandomNumberBetween(10, 28) + "px;";
  css += `position: absolute; bottom: ${getRandomNumberBetween(1, 100)}vh; right: ${getRandomNumberBetween(1, 100)}vw;`;

  if (chosenFilters.length) {
    css += `filter: ${chosenFilters.join(" ")};`
  } else {
    if (Math.random() > 0.75) {
      css += `background-color: rgb(${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)});color:rgb( ${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)})`;
    } else {
      css += "background: none";
    }
  }
  return css;
}

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

}

const titleCase = (input) => {
  const pieces = input.split(" ");
  const ret = [];
  for (let piece of pieces) {
    if (piece[0]) {
      ret.push(replaceStringAt(piece, 0, piece[0].toUpperCase()));
    }
  }
  return ret.join(" ");
}

//googled this
function arrayToHumanSentence(arr) {
  if (arr.length === 0) {
    return "";
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    const firstElements = arr.slice(0, arr.length - 1);
    const lastElement = arr[arr.length - 1];
    return firstElements.join(", ") + " and " + lastElement;
  }
}

function replaceStringAt(str, index, character) {
  return str.substr(0, index) + character + str.substr(index + character.length);
}

const sentenceCase = (input) => {
  if (!input.length) {
    return input;
  }
  return replaceStringAt(input, 0, input[0].toUpperCase());
};

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pickFrom = (array) => {
  return array[getRandomNumberBetween(0, array.length - 1)];
}


const createTextInputWithLabel = (parent, id, labelText, initialValue) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");

  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;

  const input = createElementWithClassAndParent("input", container)
  input.type = "text";
  input.id = id;
  input.name = id;
  input.value = initialValue;




  return { container, input, label };
}

const createTextAreaInputWithLabel = (parent, id, labelText, initialValue, rows = 8) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");


  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;


  const input = createElementWithClassAndParent("textarea", container)
  input.type = "text";
  input.id = id;
  input.name = id;
  input.value = initialValue;
  input.rows = "" + rows;
  input.cols = "81";



  return { container, input, label };
}

const createNumberInputWithLabel = (parent, id, labelText, initialValue, max = 113, min = -113) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");

  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;

  const input = createElementWithClassAndParent("input", container)
  input.type = "number";
  input.id = id;
  input.min = min;
  input.max = max;
  input.name = id;
  input.value = initialValue;




  return { container, input, label };
}

//if you pass me html this might break the html
//oh well
const censorRandomWords = (text) => {
  const split = text.split(" ");
  let split2 = [];
  for (let word of split) {
    split2.push(Math.random() > 0.5 ? word : word.replaceAll(/./g, "█"))
  }
  return split2.join(" ");
}


const createRangeInputWithLabel = (parent, initialValue, max = 113, min = -113) => {
  const container1 = createElementWithClassAndParent("div", parent, "slider-form-container-outer");
  const container = createElementWithClassAndParent("div", container1, "slider-form-container-inner");
  const grooves = createElementWithClassAndParent("div", container, "slider-form-groove-container");
  for (let i = min; i < max; i += 0.5) {
    if (i % 2 === 0) {
      const majorTick = createElementWithClassAndParent("div", grooves, "slider-form-groove-major-tick");
      majorTick.innerText = i;
    } else {
      const minorTick = createElementWithClassAndParent("div", grooves, "slider-form-groove-minor-tick");

    }

  }


  const input = createElementWithClassAndParent("input", container)
  input.type = "range";
  input.className = "custom-range"
  input.min = min;
  input.max = max;
  input.value = initialValue;




  return { container, input };
}

//options is array of label,value pairs
const createSelectInputWithLabel = (parent, id, labelText, options, selected_option) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");

  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;

  const input = createElementWithClassAndParent("select", container);
  for (let option of options) {
    const o = createElementWithClassAndParent("option", input);
    o.value = option.value;
    o.innerText = option.label;
    if (o.value === selected_option) {
      o.selected = true;
    }

  }

  return { container, input, label };
}

//options is array of label,value pairs
const createMultiSelectInputWithLabel = (parent, id, labelText, options, selected_options) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");

  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;

  const input = createElementWithClassAndParent("select", container);
  input.multiple = true;
  for (let option of options) {
    const o = createElementWithClassAndParent("option", input);
    o.value = option.value;
    o.innerText = option.label;
    if (selected_options.includes(o.value)) {
      o.selected = true;
    }

  }

  return { container, input, label };
}

const createCheckboxInputWithLabel = (parent, id, labelText, initialValue) => {
  const container = createElementWithClassAndParent("div", parent, "form-container");

  const label = createElementWithClassAndParent("label", container)
  label.for = id;
  label.innerText = labelText;

  const input = createElementWithClassAndParent("input", container)
  input.type = "checkbox";
  input.checked = initialValue;




  return { container, input, label };
}

//default zoom of 1.0 make ssense
const addMapControls = (default_zoom, zoom_controls_parent, ele_to_zoom) => {
  let zoomLevel = default_zoom;
  let panPositionX = 0; //negative moves the map to the left which moves the view to the right
  let panPositionY = 0;
  const zoomIn = createElementWithClassAndParent("button", zoom_controls_parent);
  zoomIn.innerText = "Zoom In";
  ele_to_zoom.style.transformOrigin = "0px 0px";

  const syncZoom = () => {
    panPositionX = 0;
    panPositionY = 0;
    syncPan();
    ele_to_zoom.style.transform = `scale(${zoomLevel})`;
  }

  const syncPan = () => {
    ele_to_zoom.style.transformOrigin = `${panPositionX}px ${panPositionY}px`;
  }


  zoomIn.onclick = () => {
    zoomLevel += 0.1;
    syncZoom();
  }

  const zoomOut = createElementWithClassAndParent("button", zoom_controls_parent);
  zoomOut.innerText = "Zoom Out"

  zoomOut.onclick = () => {
    zoomLevel += -0.1;
    syncZoom();
  }


  const panLeft = createElementWithClassAndParent("button", zoom_controls_parent);
  panLeft.innerText = "Pan Left"

  panLeft.onclick = () => {
    panPositionX += 300;
    syncPan();
  }

  const panRight = createElementWithClassAndParent("button", zoom_controls_parent);
  panRight.innerText = "Pan Right"

  panRight.onclick = () => {
    panPositionX += -300;
    syncPan();
  }

  const panUp = createElementWithClassAndParent("button", zoom_controls_parent);
  panUp.innerText = "Pan Up"

  panUp.onclick = () => {
    panPositionY += 300;
    syncPan();
  }

  const panDown = createElementWithClassAndParent("button", zoom_controls_parent);
  panDown.innerText = "Pan Down"

  panDown.onclick = () => {
    panPositionY += -300;
    syncPan();
  }

  syncZoom();
  syncPan();
}


const createElementWithClassAndParent = (eleName, parent, className) => {
  const ele = createElementWithClass(eleName, className);
  parent.append(ele);
  return ele;
}

//can take in an int or  a string and figure out how to make a seed int from that
function stringtoseed(seed) {
  const parsedInt = parseInt(seed);
  if (!Number.isNaN(parseInt(parsedInt))) {
    return parsedInt;
  }
  var output = 0;
  for (var i = 0, len = seed.length; i < len; i++) {
    output += seed[i].charCodeAt(0)
  }
  return output
}
/*
everyone leaves but i remain

theres something ironic that when i went to record this thought, i was here
right above remove item once. 

every fan of zampanio i see has such passion but such a short spark


that's not true of course. the Lonely whispers to me as it ever does


but i hope

i hope more people ready for the marathon

can be found

the sprint

seems so draining
*/
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const uniq = (a) => { return a.filter(onlyUnique) };

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//HELLO WORLD trimmed to four would give you ORLD (useful for running text that can't get bigger than a certai size)
const trimToLengthReverse = (string, length) => {
  return string.split("").reverse().join('').slice(0, length).split("").reverse().join("")
}

const incrementLocalStorageByOne = (KEY) => {
  let current = localStorage.getItem(KEY);
  if (!current) {
    current = 0;
  }

  localStorage.setItem(KEY, parseInt(current) + 1)

}


//if you give it new values for existing params it layers them on
const updateURLParams = (params) => {

  //if we're not overwriting we want it to handle 
  const queryString = window.location.search;
  const currentParams = new URLSearchParams(queryString);
  const newParams = new URLSearchParams(params);

  //overwrites original, adds new
  for (let [key, value] of newParams) {
    currentParams.set(key, value);
  }

  //params += `&${urlParams.toString()}`;
  var pageUrl = '?' + `${currentParams.toString()}`;
  window.history.pushState('', '', pageUrl);
}

//key, value status
const cachedImages = {}
//key, value status
const cachedAudio = {}

const imageExtendsions = [
  "png",
  "PNG",
  "gif",
  "jpg",
  "jpeg"
];
const filePattern = new RegExp('<a href="([^?]*?)">', 'g');

const extensionPattern = new RegExp(`\\\.(${imageExtendsions.join("|")})\$`);

const audioExtensions = [
  "wav",
];
const filePatternAudio = new RegExp('<a href="([^?]*?)">', 'g');

const extensionPatternAudio = new RegExp(`\\\.(${audioExtensions.join("|")})\$`);

function getTimeString(date) {
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  return h + ":" + m + ":" + s;
}

//https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const addImageProcess = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const getAudio = async (url) => {
  if (cachedAudio[url]) {
    return cachedAudio[url];
  }

  let promise = new Promise(async (resolve, reject) => {
    try {
      const rawText = await httpGetAsync(url);

      let files = [];
      const match = rawText.matchAll(filePatternAudio);
      const matches = Array.from(match, (res) => res);
      for (let m of matches) {
        const item = m[1];
        if (item.match(extensionPatternAudio)) {
          files.push(item);
        }
      }
      cachedAudio[url] = files;
      //console.log("JR NOTE: returned from network for", url)
      resolve(files);
    } catch (e) {
      console.log("JR NOTE: error", e)
      reject();
      return [];
    }
  })
  cachedAudio[url] = promise;
  return promise;
}

const fetchText = async (url) => {
  const rawText = await httpGetAsync(url);
  return rawText;
}

//returns a promise which resolves with the content, prevents network spam
const getImages = async (url) => {
  if (cachedImages[url]) {
    return cachedImages[url];
  }

  let promise = new Promise(async (resolve, reject) => {
    try {
      const rawText = await httpGetAsync(url);

      let files = [];
      const match = rawText.matchAll(filePattern);
      const matches = Array.from(match, (res) => res);
      for (let m of matches) {
        const item = m[1];
        if (item.match(extensionPattern)) {
          files.push(item);
        }
      }
      cachedImages[url] = files;
      //console.log("JR NOTE: returned from network for", url)
      resolve(files);
    } catch (e) {
      console.log("JR NOTE: error", e)
      reject();
      return [];
    }
  })
  cachedImages[url] = promise;
  return promise;
}

const getImagesOld = async (url) => {
  console.log("JR NOTE: trying to get images: ", url);

  try {
    const rawText = await httpGetAsync(url);

    let files = [];
    const match = rawText.matchAll(filePattern);
    const matches = Array.from(match, (res) => res);
    for (let m of matches) {
      const item = m[1];
      if (item.match(extensionPattern)) {
        files.push(item);
      }
    }
    cachedImages[url] = files;
    console.log("JR NOTE: returned from network for", url)
    return files;
  } catch (e) {
    console.log("JR NOTE: error", e)
    return [];
  }
}

//async, you'll want to await this.
//since using this will mean you don't have anything on screen yet, you'll want some kinda placeholder
const httpGetAsync = async (theUrl) => {
  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    try {
      xhr.open("get", theUrl);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error("JR NOTE: found a caught error:" + e);
      //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
      return `[]`;
    }
  });
}




//https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use

//https://longesttextever.neocities.org/
class SeededRandom {
  internal_seed;
  initial_seed;

  constructor(seed) {
    this.initial_seed = seed;
    this.internal_seed = seed;
  }

  //default is zero and one, type is inferred to be a number from this
  nextDouble = (min = 0, max = 1) => {
    this.internal_seed = (this.internal_seed * 1664525 + 1013904223) % 4294967296;
    const rnd = this.internal_seed / 4294967296;
    return min + rnd * (max - min);
  }

  getRandomNumberBetween = (min, max) => {
    return Math.floor(this.nextDouble() * (max - min + 1)) + min;
  }

  pickFrom = (array) => {
    return array[this.getRandomNumberBetween(0, array.length - 1)];
  }

  //if you have say, a string "hello world my name is"
  //and you have a chunk size of 3, you'd get something like
  //"worhel na islo " etc
  shuffleInChunks = (array, chunkSize) => {
    const chunks = chunkUpArray(array, chunkSize);
    this.shuffle(chunks);
    return chunks.flat();
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(this.nextDouble() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}



const isStringInLocalStorageArrayWithKey = (localStorageKey, targetString) => {
  console.log(`JR NOTE: isStringInLocalStorageArrayWithKey is ${targetString} inside the array stored in ${localStorageKey}`)
  const arr = keyToLocalStorageArray(localStorageKey);
  console.log("JR NOTE: isStringInLocalStorageArrayWithKey arr fetched is", arr)
  return arr.includes(targetString);
}

//i am so good at naming things
const addStringToArrayWithKeyUnlessItsAlreadyThere = (localStorageKey, targetString) => {
  console.log("JR NOTE: addStringToArrayWithKeyUnlessItsAlreadyThere", { localStorageKey, targetString })
  if (isStringInLocalStorageArrayWithKey(localStorageKey, targetString)) {
    console.log("JR NOTE: not going to add a duplicate key of ", localStorageKey)
    return;
  }
  const tmp = keyToLocalStorageArray(localStorageKey);
  tmp.push(targetString);
  localStorage[localStorageKey] = JSON.stringify(tmp);
}

const addStringToArrayWithKey = (localStorageKey, targetString) => {
  const tmp = keyToLocalStorageArray(localStorageKey);
  tmp.push(targetString);
  localStorage[localStorageKey] = JSON.stringify(tmp);
}

const addNumToArrayWithKey = (localStorageKey, targetString) => {
  const tmp = keyToLocalStorageArray(localStorageKey);
  tmp.push(targetString);
  localStorage[localStorageKey] = JSON.stringify(tmp);
}

const jrLog = (text) => {
  const jrCSSTitle = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;";
  const jrCSSBody = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;";
  console.log(`%c${"JR NOTE:"}%c  ${text}`, jrCSSTitle, jrCSSBody);

}

/*
i think its fun to make this
beacuse
instead of trying to capture theh mechanics of sburb
im trying to capture the mechanics of the blorbos
*/

const removeStringFromArrayWithKey = (localStorageKey, targetString) => {
  let tmp = keyToLocalStorageArray(localStorageKey);
  tmp = removeItemOnce(tmp, targetString);
  localStorage[localStorageKey] = JSON.stringify(tmp);
}

const initEmptyArrayAtKey = (key) => {
  console.log("JR NOTE: initEmptyArrayAtKey")
  const tmp = [];
  localStorage[key] = JSON.stringify(tmp);
  return tmp;
}

const keyToLocalStorageArray = (key) => {
  console.log('JR NOTE: keyToLocalStorageArray', key)
  if (localStorage[key]) {
    return JSON.parse(localStorage[key]);
  } else {
    return initEmptyArrayAtKey(key);
  }
}
//https://lostinzampanio.neocities.org/chronicle_of_the_marked
//https://archiveofourown.org/chapters/195222166?show_comments=true&view_full_work=false#comment_1047460766

//http://jsfiddle.net/JKirchartz/wwckP/    horrorterror html stuff
var Zalgo = {
  chars: {
    0: [ /* up */
      '\u030d', /*     ̍     */
      '\u030e', /*     ̎     */
      '\u0304', /*     ̄     */
      '\u0305', /*     ̅     */
      '\u033f', /*     ̿     */
      '\u0311', /*     ̑     */
      '\u0306', /*     ̆     */
      '\u0310', /*     ̐     */
      '\u0352', /*     ͒     */
      '\u0357', /*     ͗     */
      '\u0351', /*     ͑     */
      '\u0307', /*     ̇     */
      '\u0308', /*     ̈     */
      '\u030a', /*     ̊     */
      '\u0342', /*     ͂     */
      '\u0343', /*     ̓     */
      '\u0344', /*     ̈́     */
      '\u034a', /*     ͊     */
      '\u034b', /*     ͋     */
      '\u034c', /*     ͌     */
      '\u0303', /*     ̃     */
      '\u0302', /*     ̂     */
      '\u030c', /*     ̌     */
      '\u0350', /*     ͐     */
      '\u0300', /*     ̀     */
      '\u0301', /*     ́     */
      '\u030b', /*     ̋     */
      '\u030f', /*     ̏     */
      '\u0312', /*     ̒     */
      '\u0313', /*     ̓     */
      '\u0314', /*     ̔     */
      '\u033d', /*     ̽     */
      '\u0309', /*     ̉     */
      '\u0363', /*     ͣ     */
      '\u0364', /*     ͤ     */
      '\u0365', /*     ͥ     */
      '\u0366', /*     ͦ     */
      '\u0367', /*     ͧ     */
      '\u0368', /*     ͨ     */
      '\u0369', /*     ͩ     */
      '\u036a', /*     ͪ     */
      '\u036b', /*     ͫ     */
      '\u036c', /*     ͬ     */
      '\u036d', /*     ͭ     */
      '\u036e', /*     ͮ     */
      '\u036f', /*     ͯ     */
      '\u033e', /*     ̾     */
      '\u035b', /*     ͛     */
      '\u0346', /*     ͆     */
      '\u031a'  /*     ̚     */
    ],
    1: [ /* down */
      '\u0316', /*     ̖     */
      '\u0317', /*     ̗     */
      '\u0318', /*     ̘     */
      '\u0319', /*     ̙     */
      '\u031c', /*     ̜     */
      '\u031d', /*     ̝     */
      '\u031e', /*     ̞     */
      '\u031f', /*     ̟     */
      '\u0320', /*     ̠     */
      '\u0324', /*     ̤     */
      '\u0325', /*     ̥     */
      '\u0326', /*     ̦     */
      '\u0329', /*     ̩     */
      '\u032a', /*     ̪     */
      '\u032b', /*     ̫     */
      '\u032c', /*     ̬     */
      '\u032d', /*     ̭     */
      '\u032e', /*     ̮     */
      '\u032f', /*     ̯     */
      '\u0330', /*     ̰     */
      '\u0331', /*     ̱     */
      '\u0332', /*     ̲     */
      '\u0333', /*     ̳     */
      '\u0339', /*     ̹     */
      '\u033a', /*     ̺     */
      '\u033b', /*     ̻     */
      '\u033c', /*     ̼     */
      '\u0345', /*     ͅ     */
      '\u0347', /*     ͇     */
      '\u0348', /*     ͈     */
      '\u0349', /*     ͉     */
      '\u034d', /*     ͍     */
      '\u034e', /*     ͎     */
      '\u0353', /*     ͓     */
      '\u0354', /*     ͔     */
      '\u0355', /*     ͕     */
      '\u0356', /*     ͖     */
      '\u0359', /*     ͙     */
      '\u035a', /*     ͚     */
      '\u0323'  /*     ̣     */
    ],
    2: [ /* mid */
      '\u0315', /*     ̕     */
      '\u031b', /*     ̛     */
      '\u0340', /*     ̀     */
      '\u0341', /*     ́     */
      '\u0358', /*     ͘     */
      '\u0321', /*     ̡     */
      '\u0322', /*     ̢     */
      '\u0327', /*     ̧     */
      '\u0328', /*     ̨     */
      '\u0334', /*     ̴     */
      '\u0335', /*     ̵     */
      '\u0336', /*     ̶     */
      '\u034f', /*     ͏     */
      '\u035c', /*     ͜     */
      '\u035d', /*     ͝     */
      '\u035e', /*     ͞     */
      '\u035f', /*     ͟     */
      '\u0360', /*     ͠     */
      '\u0362', /*     ͢     */
      '\u0338', /*     ̸     */
      '\u0337', /*     ̷      */
      '\u0361', /*     ͡     */
      '\u0489' /*     ҉_     */
    ]

  },
  random: function (len) {
    if (len == 1) return 0;
    return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
  },
  generate: function (str) {
    var str_arr = str.split(''),
      output = str_arr.map(function (a) {
        if (a == " ") return a;
        for (var i = 0, l = Zalgo.random(16);
          i < l; i++) {
          var rand = Zalgo.random(3);
          a += Zalgo.chars[rand][
            Zalgo.random(Zalgo.chars[rand].length)
          ];
        }
        return a;
      });
    return output.join('');
  }
};




/*
it fascinates me that we don't really SEE peewee before the spiral sanded him smooth
theres a ruthless impotent anger at his core that he can only rarely let out
and you gotta wonder what that was when he really WAS just a gaming himbo

...

i kinda feel like he was a 'burn it all' as a regular gamer


...

the kinda person where if you cross him in a pvp he pulls out all the stops to just
ruin the fun for everyone
cuz rage isn't just about anger
its about breaking the story
showing it was all fake
kinda person to start driving backwards in a racing game

...

because its all fake, none of it matters but he's going to make sure you don't win

...

in fps he would absolutely spawn camp people who pissed him off till they get so pissed they stop playing
and its funny when he does it, his Chat laughs
but
kinda a dick
and the person he's bullying sure isn't laughing
that translates well to his first instinct being to kill the echidna when things don't go his way
*/