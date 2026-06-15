//every single person joining the loop is a duplicate
//not a replacement
//its why theres two closers and two eye killers (well, one innocent/camellia) and both wodin and wanda (till wodin dies)
//but if you're not FROM the echidna theres only ever one of you
//so. if someone joins the loop
//their original self is still therein new loops
//but so is their wasted form
//and yes, that does mean, they can be added again and again and again if you're not careful
//whoops
//maybe i should have a peewee screen where he eats some of them
//and everyone wonders why training was trying to contain this
const SAVE_KEY = 'ECHIDNA_MEMORY_LEAK_CULTISTS'

//up to what uses this to define this
//https://catalystsbathroomlibrary.neocities.org/
let globalDataObject = {
    highestStoryIndexUnlocked: 0,//for the radio
    achievementsUnlocked: [],
    fallenIntoRabbitHole: false, //theres always consequences to digging deeper (technically this could get covered by the passwords found now that it exists but i like how ominous it sounds its not leaving i love it)
    passwordsDugInto: [],//if you haven't seen the password for a given achievement, i'll mark it as 'new'
    loopingCultists: [] //an array, not a map, so that yes, you can end up with a dozen copies of the same person all with the same title. the echidna is an INCREDIBLY stupid, ineffiicent memory leak and its all of our problem (hopefully i'll remember to have a mode where peewee can eat excess cultists for you)
}


const deleteSave = () => {
    localStorage.removeItem(SAVE_KEY);
}

//http://www.purplefrog.com/~thoth/ruby/nobody-knows-shoes.pdf

//up to what uses this to decide how often to save
const save = () => {
    globalDataObject.lastSaveTimeCode = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(globalDataObject));
    const saveNoise = new Audio("http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/single_heart.mp3");
    saveNoise.play();
}


//if theres any fancy stuff you need to do to save
//like turn hash maps into objects
//you gotta add code here
const load = () => {
    let data = localStorage.getItem(SAVE_KEY);
    if (data) {
        globalDataObject = JSON.parse(data);
        globalDataObject.lastLoadTimeCode = Date.now();
        if (!globalDataObject.achievementsUnlocked) {
            globalDataObject.achievementsUnlocked = [];
        }
        /*
          only objects that need to respond to functions have to be separately parsed as json
          if they just store data (like facts) its fine to leave them as parsed json
        */
    }

}


