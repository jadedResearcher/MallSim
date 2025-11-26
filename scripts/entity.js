//keyed by title (names can be lost)
const all_entities = {};
let DEBUG_PLAYERS = false;
const FAMILY_LABEL = "family"
const PARTNER_LABEL = "partner"
const FRIEND_LABEL = "friend"
const RIVAL_LABEL = "rival"
const TEAM_LABEL = "team-mate"

/*
BASELINE_METAL_OBJECT[MIND_METAL_STAT] = MEDIUM_STAT_VALUE;
BASELINE_METAL_OBJECT[EYES_METAL_STAT] = MEDIUM_STAT_VALUE;
BASELINE_METAL_OBJECT[TONGUE_METAL_STAT] = MEDIUM_STAT_VALUE;
BASELINE_METAL_OBJECT[ARMS_METAL_STAT] = MEDIUM_STAT_VALUE;
BASELINE_METAL_OBJECT[LEGS_METAL_STAT] = MEDIUM_STAT_VALUE;
*/




const getPartyLowestMind = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[MIND_METAL_STAT] < ret.stats[MIND_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyLowestEyes = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[EYES_METAL_STAT] < ret.stats[EYES_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyLowestTongue = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[TONGUE_METAL_STAT] < ret.stats[TONGUE_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyLowestArms = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[ARMS_METAL_STAT] < ret.stats[ARMS_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyLowestLegs = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[LEGS_METAL_STAT] < ret.stats[LEGS_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}



const getPartyHighestMind = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[MIND_METAL_STAT] > ret.stats[MIND_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyHighestEyes = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[EYES_METAL_STAT] > ret.stats[EYES_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyHighestTongue = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[TONGUE_METAL_STAT] > ret.stats[TONGUE_METAL_STAT]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyHighestArms = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[ARMS_METAL_STAT > ret.stats[ARMS_METAL_STAT]]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getPartyHighestLegs = (party) => {
    let ret;
    for (let p of party) {
        if (!ret) {
            ret = p;
        } else if (p.stats[LEGS_METAL_STAT > ret.stats[LEGS_METAL_STAT]]) {//if equal pick the one who came first, prefers leader
            ret = p;
        }
    }
    return ret;
}

const getFamilyOfEntity = (person) => {
    const ret = [];
    for (let [key, value] of Object.entries(person.relationships)) {
        if (value.familial) {
            const person = all_entities[key];
            ret.push(person);
        }
    }
    return ret;
}

const getRomanticPartnersOfEntity = (person) => {
    const ret = [];
    for (let [key, value] of Object.entries(person.relationships)) {
        if (value.romantic) {
            const person = all_entities[key];
            ret.push(person);
        }
    }
    return ret;
}



const randomParty = (rand) => {
    //good enough party size for sburbsim but maybe a bit crowded for a mall expedition
    //"The others gawk at the insubordination. He's trying out six total this time. He thinks he almost has the dynamic perfected. "
    const party_size = rand.getRandomNumberBetween(2, 6);
    const ret = [];
    for (let i = 0; i < party_size; i++) {
        ret.push(randomEntity(rand));
    }
    initializeRelationshipsForParty(rand, ret);
    ret[0].leader = true;
    return ret;
}

const initializeRelationshipsForParty = (rand, party) => {
    for (let x of party) {
        for (let y of party) {
            const value = rand.getRandomNumberBetween(-113, 113);
            let romantic = false;
            let familial = false;
            const roll = rand.nextDouble();
            //if you feel strongly, equal odds of being familiy or partners
            //but still chance of not yet being partners
            if (Math.abs(value) > 50 && roll > 0.60) {
                familial = true;
            } else if (Math.abs(value) > 50 && roll > 0.4) {
                console.log("JR NOTE: it should be romantic", romantic)
                romantic = true;
            }
            x.relationships[y.title] = new Relationship(value, romantic, familial);
        }
        //don't have a relationship with yourself
        delete x.relationships[x.title];
    }
    //now that all are done, clean up romance and family to make them symmetrical
    //do family first so theres no glitches

    for (let person of party) {
        for (let relationship_key of Object.keys(person.relationships)) {
            const other_person = all_entities[relationship_key];
            other_person.relationships[person.title].syncFlagsToOtherRelationship(person.relationships[relationship_key])
        }
    }
}

const randomEntity = (rand) => {
    //sburbsim had class, aspect and two interests, this is basically that
    const no_food_themes = getAllThemeKeysMinusFood();
    const themes = [rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes),
    rand.pickFrom(no_food_themes)]
    return new Entity(themes, rand);

}

class Relationship {
    value = 0; //can  be negative
    romantic = false;
    familial = false; //if familial can not flip to romantic

    constructor(value, romantic, familial) {
        this.value = value;
        this.familial = familial;
        //so i can prevent both romance and family happening accidentally
        this.setRomance(romantic);
    }

    getLabel = () => {
        let relationship_label = TEAM_LABEL;
        if (this.romantic) {
            relationship_label = PARTNER_LABEL;
        } else if (this.familial) {
            relationship_label = FAMILY_LABEL;
        } else if (this.value > 30) {
            relationship_label = FRIEND_LABEL
        } else if (this.value < -30) {
            relationship_label = RIVAL_LABEL
        }
        return relationship_label;
    }

    //whatever direction it already is, keep going
    deepenRelationship = () => {
        //dividing it by itself gets it to be 1, then taking only one of the absolute values keeps the sign
        this.value = this.value / Math.abs(this.value) * 10;
    }

    //not value, just romance/family status
    syncFlagsToOtherRelationship = (other_relationship) => {
        if (other_relationship.familial) {
            this.familial = true;
        }
        this.setRomance(other_relationship.romantic);
    }

    setRomance = (value) => {
        if (this.familial) {
            this.romantic = false;//no matter what
        } else {
            console.log("JR NOTE: its okay to be romantic")
            this.romantic = value;
        }
    }
}


class Entity {
    name = "Jane Doe"; //JR will probably steal this though, especially if you Join The Loop
    theme_keys = [];
    dead = false;
    corrupted = false;
    fear = 0;
    mannequin_type = "wood"
    corruption = 0; //absorbs from exploring the maze
    stolen_name = false;
    current_location; //can be undefined, usually if glitch
    stats = {};
    state_of_corpse = "";
    title = "Null of Null";
    leader = false; //in sburbsim this decided ectobiology, who knows what this does, if anything, here
    //keyed by other persons title
    relationships = {};
    wasted = false; //same thing as Joining The Loop (because if you have wasted, why just passively let the end of the world end you? no, instead hook yourself up to Wanda's bullshit spiral and let yourself be dragged to the next universe, all fresh and pristine)
    //eventually things like inventory, relationships and stats
    //themes decide all that, themes decide everything
    //basically homestuck classpects

    constructor(themes, rand) {
        this.name = `${rand.pickFrom(first_names)} ${rand.pickFrom(last_names)}`;
        this.theme_keys = themes;
        this.title = classpectFromThemeList(rand, themes);
        all_entities[this.title] = this;
        this.stats = getStatsFromThemes(this.theme_keys);
        console.log(`JR NOTE: ${this.name} has stats`, { stats: this.stats })
    }

    //roll for mannequin type
    //location will call this in a regular 'blank' event
    //(the conceit is if something interesting is happening to you, you resist longer)
    becomeCorrupted = (rand) => {
        this.corrupted = true;
        const types = ["wood", "plaster", "porcelain", "ceramic", "wood", "plastic", "wood", "plastic", "plastic"];
        this.mannequin_type = rand.pickFrom(types);
    }

    kill = (state_of_corpse) => {
        this.dead = true;
        this.state_of_corpse = state_of_corpse;
    }

    //corpses and mannequins included
    interactWithPlayer = (all_players_in_location, ele) => {

        console.warn("JR NOTE: flesh out interaction later, use more stats.")
        const mindPlayer = getPartyHighestMind(game.players);
        const eyesPlayer = getPartyHighestEyes(game.players);
        const tonguePlayer = getPartyHighestTongue(game.players);
        const armPlayer = getPartyHighestArms(game.players);
        const legPlayer = getPartyHighestLegs(game.players);

        for (let player of all_players_in_location) {
            if (player === this) {
                break;
            }
            const relationship = this.relationships[player.title];
            console.log("JR NOTE: trying to get relationship", { relationship, them: player.title, me: this.title })
            relationship.deepenRelationship();
            const relationship_label = relationship.getLabel();

            //corpse party
            if (player.dead) {
                const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
                if (this.fear < 13) {
                    this.fear += 13; //congrats on your first corpse viewing
                    deadbeat.innerHTML = `${this.nameHTML()} can't believe their eyes. ${player.nameHTML()} is ${player.state_of_corpse}. ${relationship.familial ? " How are they going to tell the rest of the family?" : ""} ${relationship.romantic ? "They...they'll never kiss them again. Never hold them...Never..." : ""} They start screaming and they aren't sure if they'll stop...`;
                } else {
                    this.fear += 1 //its just not the same as the first time
                    deadbeat.innerHTML = `${this.nameHTML()} stares listlessly at ${player.nameHTML()}, wondering almost idly how it  became ${player.state_of_corpse}. They feel like their hold on reality is slipping away. How could they think this about their ${relationship_label}?`;

                }
                break;

            }

            //a familiar stranger
            if (player.corrupted) {
                const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
                if (this.fear < 13) {
                    //they don't know yet
                    deadbeat.innerHTML = `${this.nameHTML()} almost doesn't notice the mannequin in the corner. How strange...it almost looks like... ${player.nameHTML()}? With dawning realization they understand the terrible fate that befell their ${relationship_label}.`;
                } else {
                    if (tonguePlayer === this) {
                        deadbeat.innerHTML = `${this.nameHTML()} talks softely to ${player.nameHTML()}, hoping they understand past their blank facade.`;
                    } else if (player === tonguePlayer) {
                        deadbeat.innerHTML = `${this.nameHTML()} talks softely to ${player.nameHTML()}, hoping that they won't feel so alone.`;
                    } else {
                        deadbeat.innerHTML = `${this.nameHTML()} looks sadly at ${player.nameHTML}, all too aware of the fate they fell to.`;
                    }

                }
                break;

            }

            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");

            if (relationship.romantic) {
                if (relationship.value > 0) {
                    deadbeat.innerHTML = `${this.nameHTML()} spends a quiet moment with ${player.nameHTML()}, just enjoying the presence of their ${relationship_label}.`;
                } else {
                    deadbeat.innerHTML = `${this.nameHTML()} bickers with ${player.nameHTML()}, bringing up old wounds.`;

                }
                break;
            } else if (relationship.familial) {
                if (relationship.value > 0) {
                    deadbeat.innerHTML = `${this.nameHTML()} jokes around with ${player.nameHTML()}, reminding them of old times.`;
                } else {
                    deadbeat.innerHTML = `${this.nameHTML()} teases ${player.nameHTML()}.`;

                }
                break;
            }


            if (relationship.value > 0) {
                deadbeat.innerHTML = `${this.nameHTML()} works well with ${player.nameHTML()}, supporting them.`;
            } else {
                deadbeat.innerHTML = `${this.nameHTML()} gets in the way of ${player.nameHTML()}, annoying them.`;

            }


        }
    }

    //if you're starting to feel weird you start trying to leave
    isStartingToFeelCorruption = () => {
        let max = 500;
        max += 10 * this.stats[MIND_METAL_STAT]; //you can last longer the higher  your intelligence
        max += -10 * this.stats[TONGUE_METAL_STAT]; //tell others about zampanio and listen to them
        max += -10 * this.stats[EYES_METAL_STAT]; //the Eye is vulnerable to Zampanio
        max += -10 * this.stats[ARMS_METAL_STAT]; // if you give in to the urge to create, Zampanio gets you faster
        max += +10 * this.stats[LEGS_METAL_STAT]; //just walk away
        return this.corruption > max;
    }

    //have fun being a mannequin
    hasHitMaxCorruption = () => {
        let max = 1000;
        max += 200 * this.stats[MIND_METAL_STAT]; //you can last longer the higher  your intelligence
        max += -50 * this.stats[TONGUE_METAL_STAT]; //tell others about zampanio and listen to them
        max += -50 * this.stats[EYES_METAL_STAT]; //the Eye is vulnerable to Zampanio
        max += -50 * this.stats[ARMS_METAL_STAT]; // if you give in to the urge to create, Zampanio gets you faster
        max += +200 * this.stats[LEGS_METAL_STAT]; //just walk away
        return this.corruption > max;
    }

    getName = () => {
        return titleCase(`${this.dead ? "the corpse of " : ""}${this.corrupted ? "what had once been " : ""}${this.corrupted ? Zalgo.generate(this.name) : this.name}`);
    }


    nameHTML = () => {
        if (this.stolen_name) { //lol names suck, why bother with them? so much easier to know people by what they're doing, right?
            return this.titleHTML();
        }
        return `<span class='player-name'>${this.getName()}${DEBUG_PLAYERS ? `(DEBUG INFO: corruption:${this.corruption})` : ""}</span>`;
    }

    titleHTML = () => {
        if (this.wasted) {
            return `<span class='player-wasted-title'>${this.title}</span>`;
        }
        return `<span class='player-title'>${this.title}</span>`;
    }

    //returns key and value of their best stat
    highestStat = () => {
        //BASELINE_METAL_OBJECT[MIND_METAL_STAT] = MEDIUM_STAT_VALUE;
        let currentHighestStat = { key: MIND_METAL_STAT, value: this.stats[MIND_METAL_STAT] };
        for (let [key, value] of Object.entries(this.stats)) {
            //if equal, go more physical (down the chain)
            if (value >= currentHighestStat.value) {
                currentHighestStat = { key: key, value: value }
            }
        }
        return currentHighestStat;
    }

    //returns key and value of their worst stat
    lowestStat = () => {
        //BASELINE_METAL_OBJECT[MIND_METAL_STAT] = MEDIUM_STAT_VALUE;
        let currentLowestStat = { key: MIND_METAL_STAT, value: this.stats[MIND_METAL_STAT] };
        for (let [key, value] of Object.entries(this.stats)) {
            //if equal, go more mental (up the chain)
            if (value < currentLowestStat.value) {
                currentLowestStat = { key: key, value: value }
            }
        }
        return currentLowestStat;
    }

    addCorruption = (value) => {
        this.corruption += value;
    }

    decideWhereToGoAsAMannequin = (ele, rand, currentLocation, north, south, east, west) => {
        let choices = [north, south, east, west, currentLocation].filter((i) => i);
        let chosen = rand.pickFrom(choices);
        ele.innerHTML = `When you weren't looking, somehow ${this.nameHTML()} is in the ${chosen.longer_name} [${chosen.row},${chosen.col}], crumpled over a pile of junk.`;
        if (currentLocation != chosen) {
            chosen.pending_players.push(this);
            removeItemOnce(currentLocation.players, this);
        }
    }

    //if you're getting really corrupt you'll start getting a pull to 
    //try to return back to the maze (go left and up)
    //otherwise you prefer to right and down
    //high eyes and legs stats makes you even more likely to move
    //while tongue and arms and mind makes you want to stay where you are and try to figure things out more
    decideWhereToGo = (ele, rand, currentLocation, north, south, east, west) => {
        //go to the east (continue down current corridor)
        if (this.corrupted) {
            return this.decideWhereToGoAsAMannequin(ele, rand, currentLocation, north, south, east, west);
        }
        console.log("JR NOTE: right now can only go to the east and west, eventaully flesh out movement better, but no point now when only east is real", { ele, rand, currentLocation, north, south, east, west });
        let chosenLocation;

        //continue down corridor
        let loyalWeight = 0;
        //get to the bottom of this before moving to a new branch
        loyalWeight += 1 * this.stats[LEGS_METAL_STAT];
        loyalWeight += 1 * this.stats[ARMS_METAL_STAT];
        //explore new branches first
        loyalWeight += -1 * this.stats[MIND_METAL_STAT];
        loyalWeight += -1 * this.stats[EYES_METAL_STAT];
        loyalWeight += -1 * this.stats[TONGUE_METAL_STAT];

        //can be forced because if literally nothing gets chosen, well, you made your choice
        const chooseStay = (force) => {
            console.log(`JR NOTE: will ${this.name} choose to stay?`, force)
            //10 is an average stat value
            let stayWeight = 0;
            //surely we can find out more here before moving on?
            stayWeight += 1 * this.stats[MIND_METAL_STAT];
            stayWeight += 1 * this.stats[TONGUE_METAL_STAT];
            stayWeight += 1 * this.stats[EYES_METAL_STAT];
            //keep moving keep doing
            stayWeight += -1 * this.stats[ARMS_METAL_STAT];
            stayWeight += -1 * this.stats[LEGS_METAL_STAT];


            console.log("JR NOTE: stay weight was", stayWeight)
            if (force || (currentLocation && stayWeight > 30 && rand.nextDouble() > 0.5)) {
                console.log("JR NOTE: going to stay", force)
                //locations handle adding corruption if you move into them
                //if you stay, i still want you to corrupt, so, here we are
                this.addCorruption(currentLocation.corruption);

                ele.innerHTML = `${this.nameHTML()} decides to stay in the ${currentLocation.longer_name} for a little while longer, checking if they missed anything${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                return currentLocation;

            }
        }

        const chooseEast = () => {
            console.log(`JR NOTE: will ${this.name} choose to go east?`)

            if (east && !this.isStartingToFeelCorruption() && (loyalWeight > 30 || rand.nextDouble() > 0.25)) {
                if (currentLocation.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.name} decides to continue walking down the mall corridor, and moves to the EAST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.name} decides to try out this new mall corridor, and moves to the EAST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                }
                return east;
            }
        }

        const chooseSouth = () => {
            console.log(`JR NOTE: will ${this.name} choose to go south?`)

            if (south && !this.isStartingToFeelCorruption() && (loyalWeight < 30 || rand.nextDouble() > 0.5)) {
                if (currentLocation.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.name} decides to explore the mysterious ${south.longer_name} and moves to the  SOUTH${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.name} barely even notices when the ${currentLocation.longer_name} blends into a ${south.longer_name}${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                }
                return south;
            }
        }

        const chooseWest = () => {
            console.log(`JR NOTE: will ${this.name} choose to go west?`)

            if (west && this.isStartingToFeelCorruption() && rand.nextDouble() > 0.5) {
                if (currentLocation.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.name} is feeling kind of weird and decides to go back up the mall corridor, and moves to the WEST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.name} decides to try going back to a more familiar corridor, and moves to the WEST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                }
                return west;
            }
        }

        const chooseNorth = () => {
            console.log(`JR NOTE: will ${this.name} choose to go north?`)

            if (north && this.isStartingToFeelCorruption() && rand.nextDouble() > 0.1) {
                console.log("JR NOTE: going north")
                ele.innerHTML = `${this.name} decides to try getting back to the entrance, and moves NORTH, into the ${north.longer_name} ${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;

                return north;
            }
        }

        //first check if staying
        //then check where  you want to go

        chosenLocation = chooseStay();



        if (!chosenLocation) {
            chosenLocation = chooseEast();
        }

        if (!chosenLocation) {
            chosenLocation = chooseSouth();
        }

        if (!chosenLocation) {
            chosenLocation = chooseWest();
        }

        if (!chosenLocation) {
            chosenLocation = chooseNorth();
        }


        if (!chosenLocation) {
            chosenLocation = chooseStay(true);
        }
        if (currentLocation != chosenLocation) {
            chosenLocation.pending_players.push(this);
            removeItemOnce(currentLocation.players, this);
        }

        //console.log("JR NOTE: the location I chose was: ", chosenLocation)



    }



}

/*
i just realized a horrible pun

there is  a magic Harvest Fruit that lets you Join the Loop (i.e. become wasted)

fruit loops

finally, its not just lucky charms that is an inexplicable sugary cereal tie in
*/