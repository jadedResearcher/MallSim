


//stores various variables about the game

class GameSummary {
    //DON'T WANT THESE CONSTANTS TO POLLUTE THE GLOBAL NAME SPACE
    SEED = "Session Seed:"

    //add these to the constructor and finalize a swell

    NUMBER_INITIAL_PLAYERS = "# Initial Players:"
    NUMBER_ENDING_PLAYERS = "# Ending Players:"
    NUMBER_FLED_PLAYERS = "# Presumed Fled Players:"
    AVERAGE_MIND = "Average Mind"
    AVERAGE_EYES = "Average Eyes"
    AVERAGE_TONGUE = "Average Tongue"
    AVERAGE_ARMS = "Average Arms"
    AVERAGE_LEGS = "Average Legs"
    MALL_SIZE = "Mall Size"
    NUMBER_STORES = "# Shops"
    NUMBER_DEAD_PLAYERS = "# Dead Players"
    NUMBER_CORRUPT_PLAYERS = "# Corrupt Players"
    NUMBER_LOOPING_PLAYERS = "# Looping Players"
    NUMBER_NAMELESS_PLAYERS = "# Nameless Players"
    TIMES_HYDRATED = "Times Hydrated:"

    EVERYONE_DIED = "Everyone Died?"
    EVERYONE_LOOPING = "Everyone Looped?"
    EVERYONE_CORRUPTED = "Everyone Corrupted?";
    ENDING_GOT = "ENDING NAME:";

    SCENE_LIST = "Events Triggered:";
    MIND_MVP = "Mind MVP: "
    EYES_MVP = "Eyes MVP: "
    TONGUE_MVP = "Tongue MVP: "
    ARMS_MVP = "Arms MVP: "
    LEGS_MVP = "Legs MVP: "



    numberStats = {}
    booleanStats = {}
    stringStats = {}

    constructor() {
        this.numberStats[this.SEED] = 0;
        this.numberStats[this.NUMBER_INITIAL_PLAYERS] = 0;
        this.numberStats[this.NUMBER_ENDING_PLAYERS] = 0;
        this.numberStats[this.NUMBER_FLED_PLAYERS] = 0;
        this.numberStats[this.MALL_SIZE] = 0;
        this.numberStats[this.NUMBER_STORES] = 0;


        this.numberStats[this.NUMBER_DEAD_PLAYERS] = 0;
        this.numberStats[this.NUMBER_CORRUPT_PLAYERS] = 0;
        this.numberStats[this.NUMBER_LOOPING_PLAYERS] = 0;
        this.numberStats[this.NUMBER_NAMELESS_PLAYERS] = 0;
        this.numberStats[this.TIMES_HYDRATED] = 0;



        this.booleanStats[this.EVERYONE_DIED] = false;
        this.booleanStats[this.EVERYONE_LOOPING] = false;
        this.booleanStats[this.EVERYONE_CORRUPTED] = false;

        this.stringStats[this.ENDING_GOT] = "ENDLESS";//this should only happen for ab, she only has 200 ticks of patience right now, no infinite loops for my dear sweet precious sweet sweet robotic doppelganger
        this.stringStats[this.MIND_MVP] = "No one :("
        this.stringStats[this.EYES_MVP] = "No one :("
        this.stringStats[this.TONGUE_MVP] = "No one :("
        this.stringStats[this.ARMS_MVP] = "No one :("
        this.stringStats[this.LEGS_MVP] = "No one :("
        this.stringStats[this.SCENE_LIST] = "None :("



    }

    setEnding = (ending_name) => {
        this.stringStats[this.ENDING_GOT] = ending_name;
    }

    hasEnding = () => {
        return this.stringStats[this.ENDING_GOT] != "ENDLESS"
    }

    finalize = (game) => {
        this.numberStats[this.SEED] = game.rand.initial_seed;
        this.numberStats[this.NUMBER_INITIAL_PLAYERS] = game.initial_player_count;
        this.numberStats[this.NUMBER_ENDING_PLAYERS] = game.players.length;
        this.numberStats[this.NUMBER_FLED_PLAYERS] = game.initial_player_count - game.players.length;

        const locations = game.getLocations();

        this.numberStats[this.MALL_SIZE] = locations.length;
        this.numberStats[this.NUMBER_STORES] = locations.filter((i) => i.name !== CORRIDOR_NAME).length;


        this.numberStats[this.NUMBER_DEAD_PLAYERS] = game.players.filter((i) => i.dead).length;
        this.numberStats[this.NUMBER_CORRUPT_PLAYERS] = game.players.filter((i) => i.corrupted).length;
        this.numberStats[this.NUMBER_LOOPING_PLAYERS] = game.players.filter((i) => i.wasted).length;;
        this.numberStats[this.NUMBER_NAMELESS_PLAYERS] = game.players.filter((i) => i.stolen_name).length;;

        this.booleanStats[this.EVERYONE_DIED] = this.numberStats[this.NUMBER_DEAD_PLAYERS] === game.players.length;
        this.booleanStats[this.EVERYONE_LOOPING] = this.numberStats[this.NUMBER_LOOPING_PLAYERS] === game.players.length;
        this.booleanStats[this.EVERYONE_CORRUPTED] = this.numberStats[this.NUMBER_CORRUPT_PLAYERS] === game.players.length;


        const mind = getPartyHighestMind(game.players);
        const eyes = getPartyHighestEyes(game.players);
        const tongue = getPartyHighestTongue(game.players);
        const arms = getPartyHighestArms(game.players);
        const legs = getPartyHighestLegs(game.players);
        console.log("JR NOTE: mvps are: ", { mind, eyes, tongue, arms, legs, players: game.players })

        if (mind) {
            this.stringStats[this.MIND_MVP] = mind.nameHTML() + `(${mind.stats[MIND_METAL_STAT]})`;
        }

        if (eyes) {
            this.stringStats[this.EYES_MVP] = eyes.nameHTML() + `(${eyes.stats[EYES_METAL_STAT]})`;
        }

        if (tongue) {
            this.stringStats[this.TONGUE_MVP] = tongue.nameHTML() + `(${tongue.stats[TONGUE_METAL_STAT]})`;
        }

        if (arms) {
            this.stringStats[this.ARMS_MVP] = arms.nameHTML() + `(${arms.stats[ARMS_METAL_STAT]})`;
        }

        if (legs) {
            this.stringStats[this.LEGS_MVP] = legs.nameHTML() + `(${legs.stats[LEGS_METAL_STAT]})`;
        }

        const scene_stats = {};
        for (let event of game.event_list) {
            if (scene_stats[event]) {
                scene_stats[event]++;
            } else {
                scene_stats[event] = 1;
            }
        }

        this.stringStats[this.SCENE_LIST] = JSON.stringify(scene_stats);

    }

    renderSelf = (parent, ab_time) => {
        const ele = createElementWithClassAndParent("div", parent, "player-epilogue-wrapper");
        ele.style.marginTop = "31px"
        const h3 = createElementWithClassAndParent("h3", ele);
        h3.innerHTML = `Mall Expedition: #<a target='_blank' href ='${window.location.pathname}?seed=${this.numberStats[this.SEED]}'>${this.numberStats[this.SEED]}</a>`;
        if (ab_time) {
            h3.innerHTML += `<div style='font-family:Courier New; color: red;'> (${ab_time} to simulate 200 ticks)</div>`
        }
        const makePair = (left, right) => {
            const pair = createElementWithClassAndParent("div", ele, "summary-stat-pair");
            const leftEle = createElementWithClassAndParent("div", pair, "summary-stat-left");
            leftEle.innerHTML = left;
            const rightEle = createElementWithClassAndParent("div", pair, "summary-stat-right");
            rightEle.innerHTML = right;
        }



        for (let [key, value] of Object.entries(this.numberStats)) {
            makePair(key, value);
        }

        for (let [key, value] of Object.entries(this.booleanStats)) {
            makePair(key, value);
        }

        for (let [key, value] of Object.entries(this.stringStats)) {
            makePair(key, value);
        }
    }

}