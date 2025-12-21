/*i think originally i had the idea that i'd use the remote utils from eydlr and anything new i needed would be here
cuz i like chaos
but while thats fine and good for a mini sim
it was REALLY hard for something bigger wher ei had to keep checking the file
so
whoops
single function file
probably should move it back to the utils file but like
i kinda like the history of it
*/



//each aspect and class has a list of themes that maps to them directly
const aspect_mapping = {}
const class_mapping = {}


/*
waste,technology,art,space,time,flesh,buried,stealing,freedom,
fire,lonely,ocean,science,math,twisting,death,apocalypse,service,
family,magic,angels,light,hunting,clowns,plants,decay,choices,zap,
love,soul,anger,web,royalty,endings,knowing,guiding,crafting,addiction,
spying,healing,dolls,obfuscation,censorship,darkness,killing,music,defense,
questing,bugs,language'

*/
aspect_mapping["blood"] = ["family", "killing", "service"]
aspect_mapping["breath"] = ["freedom", "questing", "music"]
aspect_mapping["buried"] = ["buried", "math", "technology"]
aspect_mapping["corruption"] = ["decay", "bugs", "waste"]
aspect_mapping["desolation"] = ["fire", "waste", "killing"]
aspect_mapping["doom"] = ["apocalypse", "waste", "endings"]
aspect_mapping["end"] = ["death", "endings", "killing"]
aspect_mapping["eye"] = ["knowing", "spying", "language"]
aspect_mapping["flesh"] = ["flesh", "crafting", "art"]
aspect_mapping["heart"] = ["love", "soul", "clowns"]
aspect_mapping["hope"] = ["magic", "angels", "addiction"]
aspect_mapping["hunt"] = ["hunting", "killing", "spying"]
aspect_mapping["life"] = ["plants", "healing", "family"]
aspect_mapping["light"] = ["light", "knowing", "language"]
aspect_mapping["lonely"] = ["lonely", "ocean", "obfuscation"]
aspect_mapping["mind"] = ["choices", "zap", "questing"]
aspect_mapping["rage"] = ["anger", "killing", "decay"]
aspect_mapping["slaughter"] = ["killing", "hunting", "lonely"]
aspect_mapping["space"] = ["space", "freedom", "choices"]
aspect_mapping["spiral"] = ["twisting", "waste", "obfuscation"]
aspect_mapping["stranger"] = ["clowns", "dolls", "obfuscation"]
aspect_mapping["time"] = ["time"] //zampanio notably lacks time, it SHOULD be rare
aspect_mapping["void"] = ["obfuscation", "censorship", "darkness"]
aspect_mapping["web"] = ["web", "addiction", "guiding"]


class_mapping["lord"] = ["royalty", "waste", "addiction"]
class_mapping["muse"] = ["art", "music", "language"]
class_mapping["bard"] = ["art", "clowns", "music"]
class_mapping["prince"] = ["royalty", "endings", "anger"]
class_mapping["knight"] = ["defense", "questing", "obfuscation"]
class_mapping["page"] = ["lonely", "bugs", "soul"]
class_mapping["rogue"] = ["stealing", "defense", "questing"]
class_mapping["thief"] = ["stealing", "kiling", "spying"]
class_mapping["mage"] = ["technology", "math", "knowing"]
class_mapping["seer"] = ["guiding", "magic", "knowing"]
class_mapping["witch"] = ["magic", "crafting", "science"]
class_mapping["sylph"] = ["ocean", "freedom", "healing"]
class_mapping["heir"] = ["family", "choices", "guiding"]
class_mapping["maid"] = ["service", "dolls", "angels"]



//intentionally NOT related to the classpect system needed to use the Guide's sprites
//zampanio is, among many other things, about layers
//the TRUTH is layered
//the X of Y does not work to summarize a person
//any attempt to pretend it does is necessarily a Lie
const classpectFromThemeList = (rand, themes) => {
    const name = pickARandomThemeFromListAndGrabKey(rand, themes, PERSON, true);
    const personal_adj = pickARandomThemeFromListAndGrabKey(rand, themes, ADJ, true);
    const object = pickARandomThemeFromListAndGrabKey(rand, themes, OBJECT, true);
    const location = pickARandomThemeFromListAndGrabKey(rand, themes, LOCATION, true);
    const compliemnt = pickARandomThemeFromListAndGrabKey(rand, themes, COMPLIMENT, true);
    const insult = pickARandomThemeFromListAndGrabKey(rand, themes, INSULT, true);

    const templates = [`${personal_adj} ${name}`,
    `${compliemnt} ${name}`,
    `${insult} ${name}`,
    `${name} of the ${location}`,
    `${name} of ${object}`,
    `${object} ${name}`,
    `${location} ${name}`,
    `${personal_adj} ${object} ${name}`,
    `${personal_adj} ${location} ${name}`]

    return "The " + rand.pickFrom(templates);
}

// urls like http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/GuideOfHuntersAndHuntedGodtierSprites/stranger.png
/*
    algorithm, for each person in the party, see if they just flat out have any of the themes
    associated with specific aspects
    pick one at random to be their "main" one, and one at random to be their "backup"
    if theres more than one of the same aspect in the party, try backups
    cool, now we know what sprite sheet we are using
    next we need to figure out which class they are
    there are LESS directly involved classes than aspects but do what we can
    try to have a good spread
    have a main and backup again
    trying for uniqueness but not the end of the world if we don't get it
*/
const setSpritesForParty = (rand, party) => {
    const base_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/GuideOfHuntersAndHuntedGodtierSprites/"

    //keyed by player title
    const ratings = {}
    //add up aspect and class values, pick your highest for each
    for (let player of party) {
        //player.sprite_index = rand.getRandomNumberBetween(0, 15);
    }
}

//figure out what key has the highest value, then return a list of all keys with that value
const pareDownRatingToJustBest = (rating) => {
    const ret = [];
    //JR NOTE: todo
    return ret;
}

const bestRatedAspectsForThemes = (theme_keys) => {
    return pareDownRatingToJustBest(calculateAspectRatingsForThemes(theme_keys))

}

const bestRatedClassesForThemes = (theme_keys) => {
    return pareDownRatingToJustBest(calculateClassRatingsForThemes(theme_keys))
}

const calculateAspectRatingsForThemes = (theme_keys) => {
    const ret = {};
    for (let [key, value] of Object.entries(aspect_mapping)) {
        ret[key] = 0;
        let index = 0;
        for (v of value) {
            if (theme_keys.includes(v)) {
                let amount = 1;
                if (index === 0) {
                    amount = 10; //heavily prioritize the main theme
                } else if (index === 1) {
                    amount = 2;
                }
                ret[key] += amount;
            }
            index++;
        }
    }
    return ret;
}

const calculateClassRatingsForThemes = (theme_keys) => {
    const ret = {}
    for (let [key, value] of Object.entries(class_mapping)) {
        ret[key] = 0;
        for (v of value) {
            if (theme_keys.includes(v)) {
                ret[key]++; //does NOT heavily prioritize the main themes, class is allowed to be more weird
            }
        }
    }
    return ret;

}



const debugRenderSpriteForEntitty = () => {
    const body = document.querySelector("body");
    body.innerHTML = "";

    const rawList = `blood,breath,buried,corruption,desolation,doom,end,eye,flesh,heart,hope,hunt,life,light,lonely,mind,rage,slaughter,space,spiral,stranger,time,void,web`;
    const list = rawList.split(",");

    for (let classname of Object.keys(class_mapping)) {
        const parent = createElementWithClassAndParent("div", body);
        parent.style.cssText = `display: flex; flex-wrap: wrap; gap: 3px;`;

        for (let item of list) {
            const sprite = renderSpriteForEntity(parent, { sprite_aspect: item, sprite_class: classname })
            sprite.title = classname;
            sprite.style.border = "1px solid black";
        }
    }
}


const renderSpriteForEntity = (parent, entity) => {
    console.log("JR NOTE: rendering", entity)
    const base_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/GuideOfHuntersAndHuntedGodtierSprites/"

    const sprite = createElementWithClassAndParent("div", parent, "entity-sprite");
    sprite.style.backgroundImage = `url(${base_url + entity.sprite_aspect}.png)`;
    //entity.sprite_index
    const class_array = Object.keys(class_mapping)
    //feeling lazy, just gonna map index to x,y coordinates till i discover a pattern
    const hopefully_temporary_mapping = {}
    hopefully_temporary_mapping[class_array[0]] = [-81, 0] ///good
    hopefully_temporary_mapping[class_array[1]] = [-160, 0] //good
    hopefully_temporary_mapping[class_array[2]] = [-16, -137] //good
    hopefully_temporary_mapping[class_array[3]] = [-85, -144] //good
    hopefully_temporary_mapping[class_array[4]] = [-155, -145] //good
    hopefully_temporary_mapping[class_array[5]] = [-225, -137] //good
    hopefully_temporary_mapping[class_array[6]] = [-7, -280]//good
    hopefully_temporary_mapping[class_array[7]] = [-81, -280] //good
    hopefully_temporary_mapping[class_array[8]] = [-155, -280]//good
    hopefully_temporary_mapping[class_array[9]] = [-226, -280]//good
    hopefully_temporary_mapping[class_array[10]] = [-19, -416] //good
    hopefully_temporary_mapping[class_array[11]] = [-88, -416] //good
    hopefully_temporary_mapping[class_array[12]] = [-154, -416] //good
    hopefully_temporary_mapping[class_array[13]] = [-227, -416] //good

    sprite.style.backgroundPositionX = hopefully_temporary_mapping[entity.sprite_class][0] + "px"
    sprite.style.backgroundPositionY = hopefully_temporary_mapping[entity.sprite_class][1] + "px"

    if (entity.wasted) {
        sprite.style.filter = "contrast(100.0)";//they look more real
    } else if (entity.dead) {
        sprite.style.filter = "brightness(0.0)"; //theres nothing inside
    } else if (entity.corrupted) {
        sprite.style.filter = "contrast(0.1) grayscale(1)"; //plastic
    }
    return sprite;

}

