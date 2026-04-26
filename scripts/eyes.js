/*
//needs utils
//handles fetching things from the eyes AND provides
theme based keywords to look for interesting things
(for example, i might never say desolation, but do say fire or whatever)
*/

const eyesURl = "http://farragofiction.com/ColonistsEyes5/";
let eyeImages = [];
let ominousCodeComments = [];
const ominousCodeCommentURLs = [
    "http://farragofiction.com/MallSim/scripts/event.js",
    "http://farragofiction.com/MallSim/scripts/game.js",
    "http://farragofiction.com/MallSim/scripts/truth.js",
    "http://farragofiction.com/MallSim/index.js",
    "http://farragofiction.com/MallSim/scripts/game_summary.js",
    "http://farragofiction.com/MallSim/scripts/location.js",
    "http://farragofiction.com/MallSim/scripts/entity.js",
    "http://farragofiction.com/MallSim/scripts/dev_log.js",
    "http://farragofiction.com/MallSim/scripts/save_engine.js",
    "http://farragofiction.com/MallSim/scripts/stories.js",
    "http://farragofiction.com/MallSim/scripts/author_bot.js",
    "http://farragofiction.com/MallSim/scripts/theme_locations.js",
    "http://farragofiction.com/MallSim/scripts/custom_utils.js"];

//wastes will interact with this
const grabEyes = async () => {
    eyeImages = await getImages(eyesURl)
    eyeImages = eyeImages.map((i) => eyesURl + i);
}

//and this
const grabCodeComments = async () => {
    for (let url of ominousCodeCommentURLs) {
        const text = await httpGetAsync(url);
        const fullComments = text.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
        ominousCodeComments = ominousCodeComments.concat(fullComments)
    }
}

//not all themes are called directly
//want to have a list of words that are likely to get hits in the eyes
const grabEyesForThemeKey = (theme_key) => {
    let words = [theme_key]; //obviously search for at LEAST the theme key
    const mapping = {};
    mapping[ART] = ["fanfic", "piper", "killer"];
    mapping[TECHNOLOGY] = ["personality", "stenographer", "pattern"];
    mapping[TIME] = ["camillia", "john", "killer", "piper"];
    mapping[SPACE] = ["wanda", "wodin"];
    mapping[OCEAN] = ["ink"];
    mapping[LONELY] = ["catalyst", "closer", "witherby"];
    mapping[FIRE] = ["horse", "ria"];
    mapping[FREEDOM] = ["breath", "twig"];
    mapping[STEALING] = ["thief", "parker", "khana"];
    mapping[BURIED] = ["avalanche", "survivor", "parker"];
    mapping[FLESH] = ["herald", "beef", "alt"];
    mapping[SCIENCE] = ["test", "professor"];
    mapping[MATH] = ["fractal", "recursion", "cfo", "flower"];
    mapping[TWISTING] = ["jr", 'historian', 'rested', 'watched', 'confused', 'cultist', 'narrator', "zampanio", "spiral"];
    mapping[DEATH] = ["lost", "puppeteer", "necromancer", "camille"];
    mapping[APOCALYPSE] = ["chick"];
    mapping[ANGELS] = ["witherby"];
    mapping[SERVICE] = ["vik"];
    mapping[FAMILY] = ["twins"];
    mapping[MAGIC] = [];
    mapping[LIGHT] = ["slaughter", "fiona"];
    mapping[HEALING] = ["doc"];
    mapping[PLANTS] = ["nidhogg"];
    mapping[HUNTING] = ["guide", "hunt", "piper", "killer"];
    mapping[DECAY] = ["anon", "corruption", "spores", "mushroom", "rot", "vik", "redacted"];
    mapping[CHOICES] = ["jaded", "yongki"];
    mapping[ZAP] = ["watt", "nam", "ronin"];
    mapping[LOVE] = ["captain"];
    mapping[SOUL] = ["captain", "yongki"];
    mapping[ANGER] = ["peewee"];
    mapping[WEB] = ["watcher", "threads", "medium", "spider", "puppet", "raconteur"];
    mapping[ROYALTY] = [];
    mapping[ENDINGS] = ["lost", "puppeteer", "necromancer", "camille"];
    mapping[KNOWING] = ["devona", "personality", "weaver", "drowned", "fiona", "witherby", "slaughter"];
    mapping[GUIDING] = ["author", "bot", "ab", "guide"];
    mapping[CRAFTING] = ["smith"];
    mapping[LANGUAGE] = ["fanfic", "wrote"];
    mapping[BUGS] = ["anon", "void", "spores"];
    mapping[ADDICTION] = ["ria", "obsession"];
    mapping[SPYING] = ["personality", "weaver", "drowned", "quotidian", "fiona", "slaughter"];
    mapping[CLOWNS] = ["taxonomist", "wisp", "illusionist", "friday", "neighbor"];
    mapping[DOLLS] = ["taxonomist", "wisp", "illusionist", "friday", "neighbor"];
    mapping[OBFUSCATION] = ["hidden", "mystery", "guy", "shadows", "neville"];
    mapping[CENSORSHIP] = ["vik"];

    mapping[DARKNESS] = ["void", "neville"];
    mapping[KILLING] = ["killer", "piper"];
    mapping[MUSIC] = ["ria", "leehunter"];
    mapping[DEFENSE] = ["shield"];
    mapping[QUESTING] = ["quest"];
    //green is not a creative color
    words = words.concat(mapping[theme_key]);
    words = words.concat(all_themes[theme_key].getPossibilitiesFor(OBJECT))


    return filterEyesForWordArrayOr(words)
}


const filterEyesForWordArrayOr = (wordArray) => {
    //console.log("JR NOTE: searching for words", wordArray)
    return eyeImages.filter((eye) => {
        for (let word of wordArray) {
            if (word && eye.toUpperCase().includes(word.toUpperCase())) {
                return true;
            }
        }
        return false;
    })

}

const filterEyesForWord = (word) => {
    return eyeImages.filter((eye) => eye.includes(word));
}