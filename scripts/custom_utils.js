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
    for (let player of party) {
        console.log("JR NOTE: please actually do this")
        player.sprite_index = rand.getRandomNumberBetween(0, 15);
    }
}

const debugRenderSpriteForEntitty = () => {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const base_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/GuideOfHuntersAndHuntedGodtierSprites/"

    const rawList = `blood,breath,buried,corruption,desolation,doom,end,eye,flesh,heart,hope,hunt,life,light,lonely,mind,rage,slaughter,space,spiral,stranger,time,void,web`;
    const list = rawList.split(",");

    console.log("JR NOTE: list is", list)
    for (let i = 0; i <= 15; i++) {
        const parent = createElementWithClassAndParent("div", body);
        parent.style.cssText = `display: flex; flex-wrap: wrap; gap: 3px;`;

        for (let item of list) {
            const sprite = renderSpriteForEntity(parent, { sprite_url: base_url + item + ".png", sprite_index: i })
            sprite.title = i;
            sprite.style.border = "1px solid black";
        }
    }
}


const renderSpriteForEntity = (parent, entity) => {
    console.log("JR NOTE: rendering", entity)
    const sprite = createElementWithClassAndParent("div", parent, "entity-sprite");
    sprite.style.backgroundImage = `url(${entity.sprite_url})`;
    //entity.sprite_index
    //feeling lazy, just gonna map index to x,y coordinates till i discover a pattern
    const hopefully_temporary_mapping = {}
    hopefully_temporary_mapping[0] = [-19, 0]//good
    hopefully_temporary_mapping[1] = [-81, 0] ///good
    hopefully_temporary_mapping[2] = [-160, 0] //good
    hopefully_temporary_mapping[3] = [-218, 0] //good
    hopefully_temporary_mapping[4] = [-16, -137] //good
    hopefully_temporary_mapping[5] = [-85, -144] //good
    hopefully_temporary_mapping[6] = [-155, -145] //good
    hopefully_temporary_mapping[7] = [-225, -137] //good
    hopefully_temporary_mapping[8] = [-7, -280]//good
    hopefully_temporary_mapping[9] = [-81, -280] //good
    hopefully_temporary_mapping[10] = [-155, -280]//good
    hopefully_temporary_mapping[11] = [-226, -280]//good
    hopefully_temporary_mapping[12] = [-19, -416] //good
    hopefully_temporary_mapping[13] = [-88, -416] //good
    hopefully_temporary_mapping[14] = [-154, -416] //good
    hopefully_temporary_mapping[15] = [-227, -416] //good

    sprite.style.backgroundPositionX = hopefully_temporary_mapping[entity.sprite_index][0] + "px"
    sprite.style.backgroundPositionY = hopefully_temporary_mapping[entity.sprite_index][1] + "px"
    return sprite;

}

