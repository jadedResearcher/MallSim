



class CollatedSummary {
    //NOTE if this starts dragging down time
    //instead of recalculating summaries over and over
    //store their stats and just a count
    summaries = [];
    constructor() {

    }

    AVERAGE_TICKS = "Average Ticks Till End:";
    AVERAGE_PLAYERS = "Average Initial Players:";
    AVERAGE_FLED = "Average Fled Players:";
    AVERAGE_DEAD = "Average Dead Players:";
    AVERAGE_READY_TO_KILL = "Average Prepared To Kill Players:";

    AVERAGE_CORRUPT = "Average Corrupt Players:";
    AVERAGE_LOOPING = "Average Looping Players:";
    AVERAGE_MUSIC = "Average Musical Players:";
    AVERAGE_CENSORED = "Average Censored Players:";
    AVERAGE_MONSTER_RATING = "Average Monster Rating:";
    AVERAGE_MIND_RATING = "Average Mind:";
    AVERAGE_EYES_RATING = "Average Eyes:";
    AVERAGE_TONGUE_RATING = "Average Tongue:";
    AVERAGE_ARMS_RATING = "Average Arms:";
    AVERAGE_LEGS_RATING = "Average Legss:";


    AVERAGE_NAMELESS = "Average Nameless Players:";
    AVERAGE_TIME = "Average Time In Millis:";

    //note , by definition this won't get any events that NEVER hit
    //ab could, for gigglesnort reasons, and i might upgrade this eventually to do so
    //but not in Version 1
    EVENT_STATS = "Event Stats:";


    renderSelf = (parent) => {


        const makePair = (left, right) => {
            const pair = createElementWithClassAndParent("div", parent, "collated-stat-pair");
            const leftEle = createElementWithClassAndParent("div", pair, "collated-stat-left");
            leftEle.innerHTML = left;
            const rightEle = createElementWithClassAndParent("div", pair, "collated-stat-right");
            rightEle.innerHTML = right;
        }
        makePair("Sessions Simulated: ", this.summaries.length);

        //strings for left and right
        const average_pairs = {};
        let event_stats = {};
        let ending_stats = {};


        for (let summary of this.summaries) {
            //JR NOTE on friday at almost midnight, i do not like this, this seems hard to maintain
            //but im tired and i want to at least see one working before i go to bed
            average_pairs[this.AVERAGE_TICKS] = this.sumValue(average_pairs[this.AVERAGE_TICKS], summary.numberStats[summary.NUMBER_TICKETS_TILL_END]);
            average_pairs[this.AVERAGE_TIME] = this.sumValue(average_pairs[this.AVERAGE_TIME], summary.numberStats[summary.TIME_TAKEN_IN_MS])

            average_pairs[this.AVERAGE_PLAYERS] = this.sumValue(average_pairs[this.AVERAGE_PLAYERS], summary.numberStats[summary.NUMBER_INITIAL_PLAYERS])
            average_pairs[this.AVERAGE_FLED] = this.sumValue(average_pairs[this.AVERAGE_FLED], summary.numberStats[summary.NUMBER_FLED_PLAYERS])
            average_pairs[this.AVERAGE_DEAD] = this.sumValue(average_pairs[this.AVERAGE_DEAD], summary.numberStats[summary.NUMBER_DEAD_PLAYERS])
            average_pairs[this.AVERAGE_READY_TO_KILL] = this.sumValue(average_pairs[this.AVERAGE_READY_TO_KILL], summary.numberStats[summary.NUMBER_READY_TO_KILL])

            average_pairs[this.AVERAGE_CORRUPT] = this.sumValue(average_pairs[this.AVERAGE_CORRUPT], summary.numberStats[summary.NUMBER_CORRUPT_PLAYERS])
            average_pairs[this.AVERAGE_LOOPING] = this.sumValue(average_pairs[this.AVERAGE_LOOPING], summary.numberStats[summary.NUMBER_LOOPING_PLAYERS])
            average_pairs[this.AVERAGE_CENSORED] = this.sumValue(average_pairs[this.AVERAGE_CENSORED], summary.numberStats[summary.NUMBER_CENSORED_PLAYERS])
            average_pairs[this.AVERAGE_MUSIC] = this.sumValue(average_pairs[this.AVERAGE_MUSIC], summary.numberStats[summary.NUMBER_MUSIC_PLAYERS])

            average_pairs[this.AVERAGE_MONSTER_RATING] = this.sumValue(average_pairs[this.AVERAGE_MONSTER_RATING], summary.numberStats[summary.AVERAGE_MONSTER])
            average_pairs[this.AVERAGE_MIND_RATING] = this.sumValue(average_pairs[this.AVERAGE_MIND_RATING], summary.numberStats[summary.AVERAGE_MIND])
            average_pairs[this.AVERAGE_EYES_RATING] = this.sumValue(average_pairs[this.AVERAGE_EYES_RATING], summary.numberStats[summary.AVERAGE_EYES])
            average_pairs[this.AVERAGE_TONGUE_RATING] = this.sumValue(average_pairs[this.AVERAGE_TONGUE_RATING], summary.numberStats[summary.AVERAGE_TONGUE])
            average_pairs[this.AVERAGE_ARMS_RATING] = this.sumValue(average_pairs[this.AVERAGE_ARMS_RATING], summary.numberStats[summary.AVERAGE_ARMS])
            average_pairs[this.AVERAGE_LEGS_RATING] = this.sumValue(average_pairs[this.AVERAGE_LEGS_RATING], summary.numberStats[summary.AVERAGE_LEGS])

            average_pairs[this.AVERAGE_NAMELESS] = this.sumValue(average_pairs[this.AVERAGE_NAMELESS], summary.numberStats[summary.NUMBER_NAMELESS_PLAYERS])
            event_stats = this.eventsValue(event_stats, JSON.parse(summary.stringStats[summary.SCENE_LIST]));
            ending_stats = this.endingsValue(ending_stats, summary.stringStats[summary.ENDING_GOT]);

        }


        for (let [key, value] of Object.entries(ending_stats)) {
            makePair(key, value + ` (${(100 * (value / this.summaries.length)).toFixed(2)}%)`);
        }


        for (let [key, value] of Object.entries(event_stats)) {
            makePair("Event " + key, value + ` (${(100 * (value / this.summaries.length)).toFixed(2)}%)`);
        }

        //wanna see both average and total
        for (let [key, value] of Object.entries(average_pairs)) {
            makePair(key.replaceAll("Average", "Total"), value.toFixed(2));
        }


        for (let [key, value] of Object.entries(average_pairs)) {
            makePair(key, (value / this.summaries.length).toFixed(2));
        }


        //i am very tired today. i am not a fan of the holidays
        //i get a whole week off soon and i might make a shit ton of events during that
        //but for now im being gentle with myself
        //zampanio is a marathon, not a sprint
        //i gotta remind myself
        //taking breaks is part of the process
        //i say, like i didn't spend a chunk of a Forbidden Friday
        //coding ab
        //i just
        //get so excited to find out the things she can guide me to
    }

    //endings are just a string in new value
    //i wanna add them up 
    endingsValue = (current_value, new_value) => {
        if (!current_value) {
            current_value = {};
        }
        if (!current_value[new_value]) {
            current_value[new_value] = 0;
        }
        current_value[new_value] += 1;

        return current_value;
    }


    //events are a json object of string/number pairs
    //just wanna sum up the numbers while keeping the strings
    eventsValue = (current_value, new_value) => {
        if (!current_value) {
            current_value = {};
        }
        for (let [key, value] of Object.entries(new_value)) {
            if (!current_value[key]) {
                current_value[key] = 0;
            }
            current_value[key] += value;
        }
        return current_value;
    }

    //handles initailizing it
    sumValue = (current_value, new_value) => {
        if (!current_value) {
            return new_value;
        }
        return current_value + new_value;
    }



    addSummary = (summary) => {
        this.summaries.push(summary);
    }
}


//stores various variables about the game
class GameSummary {
    //DON'T WANT THESE CONSTANTS TO POLLUTE THE GLOBAL NAME SPACE
    //except that makes collation hard and its midnight so im gonna start sinning :) :) :)
    SEED = "Session Seed:"

    //add these to the constructor and finalize a swell
    NUMBER_TICKETS_TILL_END = "# Ticks Till Ending:"

    NUMBER_INITIAL_PLAYERS = "# Initial Players:"
    NUMBER_ENDING_PLAYERS = "# Ending Players:"
    NUMBER_FLED_PLAYERS = "# Presumed Fled Players:"
    AVERAGE_MIND = "Average Mind"
    AVERAGE_EYES = "Average Eyes"
    AVERAGE_TONGUE = "Average Tongue"
    AVERAGE_ARMS = "Average Arms"
    AVERAGE_LEGS = "Average Legs"
    AVERAGE_MONSTER = "Average Monstrousness"

    MALL_SIZE = "Mall Size"
    NUMBER_STORES = "# Shops"
    NUMBER_DEAD_PLAYERS = "# Dead Players"
    NUMBER_CORRUPT_PLAYERS = "# Corrupt Players"
    NUMBER_LOOPING_PLAYERS = "# Looping Players"
    NUMBER_CENSORED_PLAYERS = "# Censored Players"
    NUMBER_MUSIC_PLAYERS = "# Musical Players"
    NUMBER_READY_TO_KILL = "# Players Prepared to Kill"


    NUMBER_NAMELESS_PLAYERS = "# Nameless Players"
    TIMES_HYDRATED = "Times Hydrated:"

    EVERYONE_DIED = "Everyone Died?"
    EVERYONE_LOOPING = "Everyone Looped?"
    EVERYONE_CORRUPTED = "Everyone Corrupted?";
    ENDING_GOT = "ENDING NAME:";
    THEME_LIST = "THEME LIST:";

    SCENE_LIST = "Events Triggered:";
    MIND_MVP = "Mind MVP: "
    EYES_MVP = "Eyes MVP: "
    TONGUE_MVP = "Tongue MVP: "
    ARMS_MVP = "Arms MVP: "
    LEGS_MVP = "Legs MVP: "
    TIME_TAKEN_IN_MS = "Time Taken:"


    numberStats = {}
    booleanStats = {}
    stringStats = {}

    constructor() {
        this.numberStats[this.SEED] = 0;
        this.numberStats[this.NUMBER_TICKETS_TILL_END] = 0;
        this.numberStats[this.NUMBER_INITIAL_PLAYERS] = 0;
        this.numberStats[this.NUMBER_ENDING_PLAYERS] = 0;
        this.numberStats[this.NUMBER_FLED_PLAYERS] = 0;
        this.numberStats[this.MALL_SIZE] = 0;
        this.numberStats[this.NUMBER_STORES] = 0;
        this.numberStats[this.AVERAGE_MIND] = 0;
        this.numberStats[this.AVERAGE_EYES] = 0;
        this.numberStats[this.AVERAGE_TONGUE] = 0;
        this.numberStats[this.AVERAGE_ARMS] = 0;
        this.numberStats[this.AVERAGE_LEGS] = 0;
        this.numberStats[this.AVERAGE_MONSTER] = 0;



        this.numberStats[this.NUMBER_DEAD_PLAYERS] = 0;
        this.numberStats[this.NUMBER_READY_TO_KILL] = 0;

        this.numberStats[this.NUMBER_CORRUPT_PLAYERS] = 0;
        this.numberStats[this.NUMBER_LOOPING_PLAYERS] = 0;
        this.numberStats[this.NUMBER_CENSORED_PLAYERS] = 0;
        this.numberStats[this.NUMBER_MUSIC_PLAYERS] = 0;

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
        this.stringStats[this.SCENE_LIST] = "[]"
        this.stringStats[this.THEME_LIST] = "[]"
        this.numberStats[this.TIME_TAKEN_IN_MS] = "Time Is Fake :)" //only AB has time, as a superior robot


    }



    setEnding = (ending_name, tick_count) => {
        this.stringStats[this.ENDING_GOT] = ending_name;
        this.numberStats[this.NUMBER_TICKETS_TILL_END] = tick_count;
    }

    hasEnding = () => {
        return this.stringStats[this.ENDING_GOT] != "ENDLESS"
    }

    finalize = (game) => {
        this.stringStats[this.THEME_LIST] = game.theme_keys.join(", ")
        this.numberStats[this.SEED] = game.rand.initial_seed;
        this.numberStats[this.NUMBER_INITIAL_PLAYERS] = game.initial_player_count;
        this.numberStats[this.NUMBER_ENDING_PLAYERS] = game.players.length;
        this.numberStats[this.NUMBER_FLED_PLAYERS] = game.initial_player_count - game.players.length;

        const locations = game.getLocations();

        this.numberStats[this.MALL_SIZE] = locations.length;
        this.numberStats[this.NUMBER_STORES] = locations.filter((i) => i.name !== CORRIDOR_NAME).length;


        this.numberStats[this.NUMBER_DEAD_PLAYERS] = game.players.filter((i) => i.dead).length;
        this.numberStats[this.NUMBER_READY_TO_KILL] = game.players.filter((i) => i.preparedToKill).length;

        this.numberStats[this.NUMBER_CORRUPT_PLAYERS] = game.players.filter((i) => i.corrupted).length;
        this.numberStats[this.NUMBER_LOOPING_PLAYERS] = game.players.filter((i) => i.wasted).length;;
        this.numberStats[this.NUMBER_CENSORED_PLAYERS] = game.players.filter((i) => i.censored).length;;
        this.numberStats[this.NUMBER_MUSIC_PLAYERS] = game.players.filter((i) => i.musical).length;;

        this.numberStats[this.AVERAGE_MONSTER] = game.players.reduce((accumulator, p) => {
            return accumulator + p.monster_rating;
        }, 0);

        this.numberStats[this.AVERAGE_MIND] = game.players.reduce((accumulator, p) => {
            return accumulator + p.stats[MIND_METAL_STAT];
        }, 0);

        this.numberStats[this.AVERAGE_EYES] = game.players.reduce((accumulator, p) => {
            return accumulator + p.stats[EYES_METAL_STAT];
        }, 0);

        this.numberStats[this.AVERAGE_TONGUE] = game.players.reduce((accumulator, p) => {
            return accumulator + p.stats[TONGUE_METAL_STAT];
        }, 0);

        this.numberStats[this.AVERAGE_ARMS] = game.players.reduce((accumulator, p) => {
            return accumulator + p.stats[ARMS_METAL_STAT];
        }, 0);

        this.numberStats[this.AVERAGE_LEGS] = game.players.reduce((accumulator, p) => {
            return accumulator + p.stats[LEGS_METAL_STAT];
        }, 0);



        this.numberStats[this.NUMBER_NAMELESS_PLAYERS] = game.players.filter((i) => i.stolen_name).length;;

        this.booleanStats[this.EVERYONE_DIED] = this.numberStats[this.NUMBER_DEAD_PLAYERS] === game.players.length;
        this.booleanStats[this.EVERYONE_LOOPING] = this.numberStats[this.NUMBER_LOOPING_PLAYERS] === game.players.length;
        this.booleanStats[this.EVERYONE_CORRUPTED] = this.numberStats[this.NUMBER_CORRUPT_PLAYERS] === game.players.length;


        const mind = getPartyHighestMind(game.players);
        const eyes = getPartyHighestEyes(game.players);
        const tongue = getPartyHighestTongue(game.players);
        const arms = getPartyHighestArms(game.players);
        const legs = getPartyHighestLegs(game.players);
        // console.log("JR NOTE: mvps are: ", { mind, eyes, tongue, arms, legs, players: game.players })

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
        if (ab_time) {
            this.numberStats[this.TIME_TAKEN_IN_MS] = ab_time
        }

        const ele = createElementWithClassAndParent("div", parent, "player-epilogue-wrapper");
        ele.style.marginTop = "31px"
        const h3 = createElementWithClassAndParent("h3", ele);


        const url = new URL(window.location.href);
        url.searchParams.set('seed', this.numberStats[this.SEED]);
        if (url.searchParams.get('custom')) {
            //custom overrides player
            url.searchParams.delete("name")
            url.searchParams.delete("themes")
        }

        h3.innerHTML = `Mall Expedition: #<a target='_blank' href ='${url.toString()}'>${this.numberStats[this.SEED]}</a>`;

        if (ab_time) {
            h3.innerHTML += `<div style='font-family:Courier New; color: red;'> (${ab_time} milliseconds)</div>`
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