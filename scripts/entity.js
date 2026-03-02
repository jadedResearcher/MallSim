//keyed by title (names can be lost)
const all_entities = {};
let DEBUG_PLAYERS = false;
const FAMILY_LABEL = "family"
const PARTNER_LABEL = "partner"
const FRIEND_LABEL = "friend"
const RIVAL_LABEL = "rival"
const TEAM_LABEL = "team-mate"
const CLONE_LABEL = "clone"
const FUNERAL_FOR_DEAD_BUTTERFLIES = "Funeral For Dead Butterflies";

const STRONG_RELATIONSHIP_VALUE = 50;

const TWIN_KILLER = "TWIN_KILLER";
const TEAM_KILLER = "TEAM_KILLER";
const MONSTER_KILLER = "MONSTER_KILLER";



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
        } else if (p.stats[ARMS_METAL_STAT] > ret.stats[ARMS_METAL_STAT]) {//if equal pick the one who came first, prefers leader
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
        } else if (p.stats[LEGS_METAL_STAT] > ret.stats[LEGS_METAL_STAT]) {//if equal pick the one who came first, prefers leader
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
    //actually make it be able to be bigger or smaller, but 6 is probably perfect
    const party_size = rand.getRandomNumberBetween(2, 12);
    const ret = [];
    for (let i = 0; i < party_size; i++) {
        ret.push(randomEntity(rand));
    }
    initializeRelationshipsForParty(rand, ret);
    ret[0].leader = true;
    return ret;
}

const initializeRelationshipsForParty = (rand, party) => {
    const forceLove = isItValentinesDay();
    for (let x of party) {
        x.relationships = {};//reset
        for (let y of party) {
            const value = rand.getRandomNumberBetween(-113, 113);
            let romantic = false;
            let familial = false;
            const roll = rand.nextDouble();

            if (forceLove) {
                romantic = true; //even if you don't like them very much, congrats, you're DATING, happy corporate mandated love day!!!
            } else {
                //if you feel strongly, equal odds of being familiy or partners
                //but still chance of not yet being partners
                if (Math.abs(value) > STRONG_RELATIONSHIP_VALUE && roll > 0.60) {
                    familial = true;
                } else if (Math.abs(value) > STRONG_RELATIONSHIP_VALUE && roll > 0.4) {
                    romantic = true;
                }
            }

            x.relationships[y.title] = new Relationship(value, romantic, familial);
        }
        //don't have a relationship with yourself
        x.relationships[x.title].clone = true;
        x.relationships[x.title].familial = false;
        x.relationships[x.title].romantic = false;

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

class Item {
    name = "Perfectly Generic Object"
    description = "It is not HarvestFruit so it is probably useless."
    //so many foods make zampanio treat you differently, come to think of it
    isFruit = false; //the sales beast LOVES fruit, but also Zampanio has made it so all fruit within the mall is Harvest Fruit (which you can eat to Join the Loop/Become Wasted)
    isEgg = false; //look, if it SAYS egg it IS egg and the eye killer knows this
    constructor(name, description) {
        this.name = name;
        this.description = description;
        const nameCheck = this.name.toUpperCase();
        if (nameCheck.includes("FRUIT")) {
            this.isFruit = true;
            this.name = titleCase(nameCheck.replaceAll("FRUIT", "HARVEST FRUIT"));
        }

        if (nameCheck.includes("EGG")) {
            this.isEgg = true;
        }
    }
}

class Relationship {
    value = 0; //can  be negative
    romantic = false;
    clone = false;
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
        this.value += Math.round(this.value / Math.abs(this.value));

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
            this.romantic = value;
        }
    }
}


class Entity {
    name = "Jane Doe"; //JR will probably steal this though, especially if you Join The Loop
    theme_keys = [];
    marked_for_cloning = false;//don't worry about this :) :) :)
    dead = false;
    musical = false; //hey how could this be bad???
    corrupted = false;
    preparedToKill = false;
    sprite_aspect = Object.keys(aspect_mapping)[0];
    sprite_class = Object.keys(class_mapping)[0];
    monster_rating = 0; //every time you loop you lose a little bit more of your nuance, plus every time you kill, hoon and wibby respond to this
    fear = 0;
    inventory = []; //list of items, i think its funny rn that all they do is function as a sort of 'good boi points' from the mall. good shoppers have lots of items :) :) :)
    mannequin_type = "wood"
    corruption = 0; //absorbs from exploring the maze
    stolen_name = false;
    current_location; //can be undefined, usually if glitch
    pending_location; //so that you can tell your companions where you are going to go
    stats = {};
    state_of_corpse = "";
    sin_array = [];// oh boy do so many entities HATE it when you sin
    fleeing = false; //you'll auto flee if you're corrupt enough, but theres plenty of reasons to want to get the hell out of dodge
    title = "Null of Null";
    leader = false; //in sburbsim this decided ectobiology, who knows what this does, if anything, here
    //keyed by other persons title
    relationships = {};
    wasted = false; //same thing as Joining The Loop (because if you have wasted (i.e. know how to hack reality), why just passively let the end of the world end you? no, instead hook yourself up to Wanda's bullshit spiral and let yourself be dragged to the next universe, all fresh and pristine)
    //eventually things like inventory, relationships and stats
    //themes decide all that, themes decide everything
    //basically homestuck classpects

    constructor(themes, rand) {
        this.randomize(rand, themes)
    }

    hunted = () => {
        if (this.sin_array.includes(TWIN_KILLER)) {
            return true;
        }
        return false;
    }

    randomize = (rand, hardcoded_themes) => {
        if (hardcoded_themes) {
            this.theme_keys = hardcoded_themes;
        } else {
            const no_food_themes = getAllThemeKeysMinusFood();

            this.theme_keys = [rand.pickFrom(no_food_themes),
            rand.pickFrom(no_food_themes),
            rand.pickFrom(no_food_themes),
            rand.pickFrom(no_food_themes)]
        }
        this.name = `${rand.pickFrom(first_names)} ${rand.pickFrom(last_names)}`;
        this.title = classpectFromThemeList(rand, this.theme_keys);
        all_entities[this.title] = this;
        this.stats = getStatsFromThemes(this.theme_keys);

        for (let relationship of Object.values(this.relationships)) {
            relationship.value = rand.getRandomNumberBetween(-1 * STRONG_RELATIONSHIP_VALUE, STRONG_RELATIONSHIP_VALUE)
        }
    }

    //come on you know this is important
    hasEgg = () => {
        return (this.inventory.filter((i) => i.isEgg)).length > 0;
    }

    findEgg = () => {
        for (let i of this.inventory) {
            if (i.isEgg) {
                return i;
            }
        }
    }

    //roll for mannequin type
    //location will call this in a regular 'blank' event
    //(the conceit is if something interesting is happening to you, you resist longer)
    becomeCorrupted = (rand) => {
        this.corrupted = true;
        this.monster_rating++;

        const types = ["wood", "plaster", "porcelain", "ceramic", "wood", "plastic", "wood", "plastic", "plastic"];
        this.mannequin_type = rand.pickFrom(types);
    }

    //store the flanderized version of yourself into local storage
    //when a new session starts with someone who 'is' you, you'll be added (not replace them)
    //why do you think the echidna is causing a memory leak? 
    joinTheLoop = (ele) => {
        this.monster_rating++;
        this.sandSmoothByValue(MEDIUM_STAT_VALUE);//congratulations on becoming the 'you' you were always meant to be. technically this should happen a bit over time, over centuries, but we all know simulations are supposed to be super fast
        //yes its accessing a global var called game but im in a hurry
        if (!game.eatWastesAutomatically) {
            globalDataObject.loopingCultists.push({ homeBranch: game.rand.initial_seed, title: this.title, musical: this.musical, censored: this.censored, relationships: this.relationships, stats: this.stats, theme_keys: this.theme_keys, sprite_aspect: this.sprite_aspect, sprite_class: this.sprite_class })
            save();
        }
        const knowledge = document.querySelectorAll(".wasted-knowledge");
        if (knowledge.length > 0) {
            const knowledge_ele = createElementWithClassAndParent("div", ele, "sub-story-beat");
            let text = "";
            //ironic
            for (let k of knowledge) {
                text += k.innerHTML;
            }
            /*
            fun fact, the wasted-knowledge system wasn't working for a while
            i didn't realize
            so when i fixed a seemingly unrelated bug
            i was suddenly jumpscared by walls of text about yongki not meaning it and mannequins screaming inside
            10/10 zampanio experience
            so i decided to lean into that spook and style this text scary like
            */
            knowledge_ele.innerHTML = `${this.nameHTML()} sees with new eyes that which was missed before, the weight of it cracking their mind open as a wave of vertigo takes them: <p class='madness'>${text}</p>.<br><Br>As they adjust to their new senses, composure returns to them. The secrets of the universe settling into their brain.`;

        }

    }

    /*for shareable urls and the like (joining the loop has its own subset, doesn't include name but DOES include censored), its interesting that they're related
    unlike in wigglersim, don't make the mistake of stringifying it too early
    however i DO want to record the index of theme keys and sprite info
    
    */
    export = () => {
        const ret = {
            name: this.name,
            title: this.title,
            musical: this.musical,
            relationships: this.relationships,
            stats: this.stats,
            theme_keys: this.theme_keys.map((t) => keys.indexOf(t)),
            sprite_aspect: Object.keys(aspect_mapping).indexOf(this.sprite_aspect),
            sprite_class: Object.keys(class_mapping).indexOf(this.sprite_class)
        };

        return ret;
    }

    clone = (rand) => {
        this.marked_for_cloning = false;
        //new Entity(cultist.theme_keys, this.rand);
        //a clone is never quite the same as the original now are they
        const ret = new Entity(this.theme_keys, rand);
        ret.relationships = { ...this.relationships };
        ret.title = this.title;
        ret.name = this.name;
        ret.musical = this.musical; //you can't escape the orchestra meerly by dying
        ret.stats = { ...this.stats };
        ret.sprite_aspect = this.sprite_aspect;
        ret.sprite_class = this.sprite_class;
        ret.fear = 113; //this is not okay, no matter how sure the westerville mall is that you're new, you KNOW you were somewhere else before (and hey, maybe this means you're LESS scared than you were a minute ago, could be that 113 fear is nothing compared to what you were previously enduring)
        ret.corruption = 0; //you just entered the mall :) :) :) the Westerville Mall knows you're okay...for now
        ret.current_location = undefined; //have fun with that :)
        return ret;
    }

    becomeMusical = (game) => {
        this.musical = true;
        this.monster_rating++;
        const firstname = this.name.split(" ")[0]
        const new_name = game.orchestra_name + firstname;
        game.orchestra_name = new_name;
        this.name = new_name;
        this.title = new_name;
        this.current_location = undefined; //if you're in the parking lot, you go somewhere else
    }

    //it erodes the soul, to kill something that looks human
    //can call this against a blorbo, theres just no target since they aren't simulated, only cultists are
    murder = (target, state_of_corpse) => {
        this.monster_rating++;
        if (target) {
            target.kill(state_of_corpse);
        }
    }

    kill = (state_of_corpse) => {
        if (this.current_location && this.current_location.infinite) {
            game.event_list.push("Died In Infinity");
            this.marked_for_cloning = true;
        }
        this.dead = true;
        this.state_of_corpse = state_of_corpse;
    }
    //https://calljoker.com/zampanio
    //https://spiralsrest.neocities.org/versions
    //http://eyedolgames.com/ZampanioQuizEast/?direction=WEST
    //http://eyedolgames.com/ZampanioQuizEast/?direction=EAST
    //http://eyedolgames.com/ZampanioQuizEast/?direction=NORTH

    //returns if interaction happened, if so, no other should
    interactWithCensor = (rand, player, ele) => {
        if (player.dead) {
            return;
        }
        //censored will only kill them in an event, but they shouldn't be bickering or whatever.
        if (player.censored && !this.censored) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            this.fear += 113;
            deadbeat.innerHTML = `${this.nameHTML()} cannot perceive ${player.nameHTML()} but they are very, very afraid.`;
            return true;
        } else if (this.censored && !player.censored) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            player.fear += 113;
            deadbeat.innerHTML = `${this.nameHTML()} cannot perceive ${player.nameHTML()} but they are very, very afraid.`;
            return true;
        } else if (this.censored && player.censored) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            player.fear += 113;
            deadbeat.innerHTML = `This is censored for your protection :) :) :) You're welcome!`;
            return true;
        }
        return false;
    }

    interactWithLove = (relationship, game, rand, player, ele) => {
        /*
            todo, flesh out based on stats and themes, 
            love players should go damnh hard
            if you have items in your inventory, maybe give as a gift
        */
        const relationship_label = relationship.getLabel();
        relationship.deepenRelationship();

        const goodRomance = () => {
            const romanceOptions = [`${this.nameHTML()} spends a quiet moment with ${player.nameHTML()}, just enjoying the presence of their ${relationship_label}.`];
            if (this.theme_keys.includes(MUSIC)) {
                romanceOptions.push(`${this.nameHTML()} sings a little song about how much they love ${player.nameHTML()}.`)
            }

            if (this.theme_keys.includes(LANGUAGE)) {
                romanceOptions.push(`${this.nameHTML()} brainstorms a sonnet about how much they love ${player.nameHTML()}.`)
            }


            if (this.theme_keys.includes(CRAFTING)) {
                romanceOptions.push(`${this.nameHTML()} makes a little crown out of mall debris and puts it on ${player.nameHTML()}'s head.`)
            }

            if (this.theme_keys.includes(LOVE)) {
                romanceOptions.push(`${this.nameHTML()} stares deep into ${player.nameHTML()}'s eyes and tells them how loved they are.`)
                romanceOptions.push(`${this.nameHTML()} smiles goofily at ${player.nameHTML()} and asks them how they can be so perfect.`)
                romanceOptions.push(`${this.nameHTML()} giggles softly to themself, in awe that ${player.nameHTML()} is in love with them.`)
                romanceOptions.push(`${this.nameHTML()} kisses ${player.nameHTML()} softly.`)
                romanceOptions.push(`${this.nameHTML()} hugs ${player.nameHTML()} close.`)
                romanceOptions.push(`${this.nameHTML()} holds ${player.nameHTML()} hand as they walk along.`)
                romanceOptions.push(`${this.nameHTML()} dreamily says ${player.nameHTML()}'s name over and over.`)
            }

            if (this.theme_keys.includes(PLANTS)) {
                romanceOptions.push(`${this.nameHTML()} finds a decently intact flower among the mall debris and gifts it to ${player.nameHTML()}.`)
            }

            if (this.theme_keys.includes(DEFENSE)) {
                romanceOptions.push(`${this.nameHTML()} makes sure they watch ${player.nameHTML()}'s back, for safety.`)
            }

            if (this.theme_keys.includes(CLOWNS)) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} a lot of jokes to keep their mood up.`)
            }

            if (this.theme_keys.includes(SERVICE)) {
                romanceOptions.push(`${this.nameHTML()} asks if there's anything ${player.nameHTML()} needs.`)
            }

            if (this.stats[MIND_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} they're thinking of how they first met.`)
            }

            if (this.stats[EYES_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} how wonderful they're looking right now.`)
            }

            if (this.stats[TONGUE_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} all sorts of things that make them blush.`)
            }

            if (this.stats[ARMS_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} opens doors for ${player.nameHTML()} as they move around.`)
            }

            if (this.stats[LEGS_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} makes sure ${player.nameHTML()} doesn't get left behind as they move together.`)
            }

            if (this.inventory.length > 0 && (game.rand.nextDouble > 0.75 || this.theme_keys.includes(SERVICE))) {
                game.event_list.push("Gift!")
                const chosen_item = game.rand.pickFrom(this.inventory);
                chosen_item.description += ` ${this.nameHTML()} gave this to ${player.nameHTML()}.`;
                const ele1 = createElementWithClassAndParent("p", ele)
                const ele2 = createElementWithClassAndParent("p", ele)
                const ele3 = createElementWithClassAndParent("p", ele)

                ele1.innerHTML = rand.pickFrom(romanceOptions) + ` ${this.nameHTML()} decides to give ${player.nameHTML()} their ${chosen_item.name} as a gift!`;

                this.removeItemFromInventory(chosen_item, ele2)
                player.addItemToInventory(game, chosen_item, ele3);

            } else {
                ele.innerHTML = rand.pickFrom(romanceOptions);

            }
        }

        /*
Ra-ra, ah-ah-ah
Roma-, roma-ma-
Gaga, ooh, la-la
Want your bad romance
        */
        const badRomance = () => {
            const romanceOptions = [`${this.nameHTML()} bickers with ${player.nameHTML()}, bringing up old wounds.`];



            if (this.theme_keys.includes(PLANTS)) {
                romanceOptions.push(`${this.nameHTML()} tricks ${player.nameHTML()} into smelling a dusty fake flower.`)
            }


            if (this.theme_keys.includes(CLOWNS)) {
                romanceOptions.push(`${this.nameHTML()} tells a lot of cutting jokes about ${player.nameHTML()}.`)
            }

            if (this.theme_keys.includes(CRAFTING)) {
                romanceOptions.push(`${this.nameHTML()} spraypaints '${player.nameHTML()} is dumb' on the wall. `)
            }

            if (this.theme_keys.includes(ANGER)) {
                romanceOptions.push(`${this.nameHTML()} keeps yelling at '${player.nameHTML()} as they move. `)
            }

            if (this.theme_keys.includes(LONELY)) {
                romanceOptions.push(`${this.nameHTML()} tells '${player.nameHTML()} all the hurtful things their friends in common say about them behind their back. `)
            }

            if (this.theme_keys.includes(KILLING)) {
                romanceOptions.push(`${this.nameHTML()} makes vaguely threatening gestures towards '${player.nameHTML()} as they walk. `)
            }

            if (this.theme_keys.includes(DEFENSE)) {
                romanceOptions.push(`${this.nameHTML()} never turns their back on ${player.nameHTML()} as they walk. `)
            }

            if (this.stats[MIND_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} they're thinking of how annoying they are.`)
            }

            if (this.stats[EYES_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} how frumpy they're looking right now.`)
            }

            if (this.stats[TONGUE_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} tells ${player.nameHTML()} all sorts of things that make them pissed off.`)
            }

            if (this.stats[ARMS_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} slams doors in ${player.nameHTML()}'s face as they move around.`)
            }

            if (this.stats[LEGS_METAL_STAT] > MEDIUM_STAT_VALUE) {
                romanceOptions.push(`${this.nameHTML()} makes sure  to walk extra fast so ${player.nameHTML()} has to hurry to catch up.`)
            }

            //stealing time
            if (player.inventory.length > 0 && (game.rand.nextDouble > 0.75 || this.theme_keys.includes(STEALING))) {
                game.event_list.push("Stealing!")
                const chosen_item = game.rand.pickFrom(player.inventory);
                chosen_item.description += ` ${this.nameHTML()} stole this from ${player.nameHTML()}.`;
                const ele1 = createElementWithClassAndParent("p", ele)
                const ele2 = createElementWithClassAndParent("p", ele)
                const ele3 = createElementWithClassAndParent("p", ele)

                ele1.innerHTML = rand.pickFrom(romanceOptions) + ` ${this.nameHTML()} decides to steal ${player.nameHTML()}'s ${chosen_item.name} without them noticing!`;
                player.removeItemFromInventory(chosen_item, ele2)
                this.addItemToInventory(game, chosen_item, ele3);
            } else {
                ele.innerHTML = rand.pickFrom(romanceOptions);

            }

        }

        game.event_list.push("Romance Interaction")
        if (relationship.value > 0) {
            return goodRomance();
        } else {
            return badRomance();
        }
    }


    //returns if interaction happened, if so, no other should
    interactWithMusic = (game, rand, player, ele) => {
        if (player.dead) {
            return false;
        }
        //meanwhile the orchestra doesn't need an event, they simply take you ambiently
        if (player.musical && !this.musical) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            deadbeat.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/istockphoto-1731602083-612x612-moshed-01-03-10-46-51-827.gif'>${player.nameHTML()} plays a beautiful song for ${this.nameHTML()}.`;
            if (this.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE) {
                this.becomeMusical(game);//you've enchanted them, they simply must have you, join the Westerville Polycule please
                this.stats = { ...BASELINE_METAL_OBJECT }; //you're part of the hivemand now, completely average
                deadbeat.innerHTML += `<br><br>${this.nameHTML()} feels their flesh and clothing become one with the Orchestra. Strange new thoughts and feelings enter their mind. They love their new family. They need to kill anyone who would try to take Fruit out of the Westerville Mall, because it would make their Conductor sad if it left. The universe might end if people eat too much Harvest Fruit. Protecting the universe is important. The Echidna is important. The Conductor is important. Music is important..........`;
                game.event_list.push("Orchestral Bliss");
                return true;
            } else {
                this.fear += 113;
                if (this.preparedToKill) {
                    deadbeat.innerHTML += `<br><br>${this.nameHTML()} doesn't know what the music will do to them but they feel in their bones its dangerous. They grab the loose detritis of the mall and hit ${player.nameHTML()} in the head over and over again, even after they stop playing, only stopping when they finally, finally stop breathing.`;
                    this.murder(player, "head caved in by a heavy object, likely improvised")
                    game.event_list.push("Orchestral Defense");

                    return true;
                }

                //become too old or too young but they got you
                if (rand.nextDouble() > 0.5) {
                    deadbeat.innerHTML += `<br><br>The trumpet's clarion call rings in ${player.nameHTML()} head as they rapidly get older and older until they finally collapse to the ground, dead.`;
                    this.kill("wrinkled into an ancient mummy with whispy grey hair and thin, dessicated skin")
                    game.event_list.push("Orchestral Trumpet");

                } else {
                    deadbeat.innerHTML += `<br><br>The soothing piano calms ${this.nameHTML()} as they rapidly get younger and younger until they finally lose their ability to survive outside a womb that has long forgotten them, and take their final breath in a macabre inverse of their first.`;
                    game.event_list.push("Orchestral Piano");
                    this.kill("shrunk away to a tiny, oozing fetus, pitifully squashed into the ground")
                }
            }
            return true;

        } else if (this.musical && !player.musical) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            deadbeat.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/istockphoto-1731602083-612x612-moshed-01-03-10-46-51-827.gif'>${this.nameHTML()} plays a beautiful song for ${player.nameHTML()}.`;
            if (player.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE) { //you've enchanted them, they simply must have you, join the Westerville Polycule please
                player.becomeMusical(game);
                player.stats = { ...BASELINE_METAL_OBJECT }; //you're part of the hivemand now, completely average
                deadbeat.innerHTML += `<br><br>${player.nameHTML()} feels their flesh and clothing become one with the Orchestra. Strange new thoughts and feelings enter their mind. They love their new family. They need to kill anyone who would try to take Fruit out of the Westerville Mall, because it would make their Conductor sad if it left. The universe might end if people eat too much Harvest Fruit. Protecting the universe is important. The Echidna is important. The Conductor is important. Music is important..........`;
                game.event_list.push("Orchestral Bliss");

                return true;
            } else {
                player.fear += 113;
                if (player.preparedToKill) {
                    deadbeat.innerHTML += `<br><br>${player.nameHTML()} doesn't know what the music will do to them but they feel in their bones its dangerous. They grab the loose detritis of the mall and hit ${this.nameHTML()} in the head over and over again, even after they stop playing, only stopping when they finally, finally stop breathing.`;
                    this.sin_array.push(MONSTER_KILLER)
                    player.murder(this, "head caved in by a heavy object, likely improvised")
                    game.event_list.push("Orchestral Defense");

                    return true;
                }

                //become too old or too young but they got you
                if (rand.nextDouble() > 0.5) {
                    deadbeat.innerHTML += `<br><br>The trumpet's clarion call rings in ${player.nameHTML()} head as they rapidly gets older and older until they finally collapse to the ground, dead.`;
                    player.kill("wrinkled into an ancient mummy with whispy grey hair and thin, dessicated skin")
                    game.event_list.push("Orchestral Trumpet");

                } else {
                    deadbeat.innerHTML += `<br><br>The soothing piano calms ${player.nameHTML()} as they rapidly get younger and younger until they finally lose their ability to survive outside a womb that has long forgotten them, and take their final breath in a macabre inverse of their first.`;
                    game.event_list.push("Orchestral Piano");

                    player.kill("shrunk away to a tiny, oozing fetus, pitifully squashed into the ground")
                }
            }
            return true;
        } else if (this.musical && !player.musical) {
            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
            deadbeat.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/istockphoto-1731602083-612x612-moshed-01-03-10-46-51-827.gif'>${this.nameHTML()} and ${player.nameHTML()} play a beautiful song together.`;
            return true;
        }
        return false;
    }

    //corpses and mannequins included
    //i should almost certainly break this into smaller functions but its one of the last days of my winter break and you can't make me
    interactWithPlayer = (game, rand, all_players_in_location, ele) => {



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

            if (this.interactWithCensor(rand, player, ele)) {
                break;
            }

            if (this.interactWithMusic(game, rand, player, ele)) {
                break;
            }


            const relationship = this.relationships[player.title];
            if (!relationship) {
                const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
                deadbeat.innerHTML = `${this.nameHTML()} doesn't know how to feel about ${player.nameHTML()}.`;
                //technically you from another universe is your family, i'd argue
                this.relationships[player.title] = new Relationship(0, false, player.title === this.title);
                break;
            }
            relationship.deepenRelationship();
            const relationship_label = relationship.getLabel();

            //corpse party
            if (player.dead) {
                const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
                if (this.fear < 13) {
                    this.fear += 13; //congrats on your first corpse viewing
                    deadbeat.innerHTML = `${this.nameHTML()} can't believe their eyes. ${player.nameHTML()} is ${player.state_of_corpse}. ${relationship.familial ? " How are they going to tell the rest of the family?" : ""} ${relationship.romantic ? "They...they'll never kiss them again. Never hold them...Never..." : ""} They start screaming and they aren't sure if they'll stop...`;

                    if (this.stats[ARMS_METAL_STAT] > LOW_STAT_VALUE && !this.preparedToKill) {
                        this.preparedToKill = true; //its life or death now, i'm sorry
                        deadbeat.innerHTML += `They steel themselves. This has become life or death and they are not going to be a corpse. They are prepared to kill.`;
                    }

                } else {

                    this.fear += 1 //its just not the same as the first time
                    deadbeat.innerHTML = `${this.nameHTML()} stares listlessly at ${player.nameHTML()}, wondering almost idly how it  became ${player.state_of_corpse}. They feel like their hold on reality is slipping away. How could they think this about their ${relationship_label}?`;
                    if (this.stats[ARMS_METAL_STAT] > LOW_STAT_VALUE && !this.preparedToKill) {
                        this.preparedToKill = true; //its life or death now, i'm sorry
                        deadbeat.innerHTML += `They steel themselves. This has become life or death and they are not going to be a corpse. They are prepared to kill.`;
                    }
                }
                break;

            }

            //a familiar stranger
            if (player.corrupted) {
                const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");
                if (this.fear < 13) {
                    //they don't know yet
                    game.event_list.push("Mannequin Realization")
                    deadbeat.innerHTML = `${this.nameHTML()} almost doesn't notice the mannequin in the corner. How strange...it almost looks like... ${player.nameHTML()}? With dawning realization they understand the terrible fate that befell their ${relationship_label}.`;
                } else {
                    if (tonguePlayer === this) {
                        game.event_list.push("Mannequin Comfort")

                        deadbeat.innerHTML = `${this.nameHTML()} talks softly to ${player.nameHTML()}, hoping they understand past their blank facade.`;
                    } else if (player === tonguePlayer) {
                        game.event_list.push("Mannequin Comfort 2")

                        deadbeat.innerHTML = `${this.nameHTML()} talks softly to ${player.nameHTML()}, hoping that they won't feel so alone.`;
                    } else {
                        game.event_list.push("Mannequin Sadness")

                        deadbeat.innerHTML = `${this.nameHTML()} looks sadly at ${player.nameHTML()}, all too aware of the fate they fell to.`;
                    }

                }
                break;
                return;
            }

            const deadbeat = createElementWithClassAndParent("div", ele, "sub-story-beat");

            if (relationship.romantic) {
                this.interactWithLove(relationship, game, rand, player, deadbeat)

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

    doYouHateThisPerson = (person) => {
        if (!this.relationships[person.title]) {
            return false;
        }
        return this.relationships[person.title].value < STRONG_RELATIONSHIP_VALUE * -1;
    }

    changeRelationshipWithPlayerBy = (player, value) => {
        if (!this.relationships[player.title]) {
            return false;
        }
        this.relationships[player.title].value += value;
    }

    fuckingHATEEveryoneInList = (players) => {
        for (let player of players) {
            const r = this.relationships[player.title];
            if (r) {
                r.value = -113;
            } else {
                this.relationships[player.title] = new Relationship(-113, false, false)
            }
        }
    }

    hateEveryoneALittleBitMore = () => {
        for (let relationship of Object.values(this.relationships)) {
            relationship.value += Math.round(-1 * (relationship.value / 20) - 2);
        }
    }
    //good or bad, i don't care right now
    //just if its strong, return the relationship
    //if its not, return nothing
    getStrongRelationshipOrNothing = (player) => {
        const relationship = this.relationships[player.title];
        if (!relationship) {
            return;
        }

        if (relationship.value > STRONG_RELATIONSHIP_VALUE) {
            return relationship;
        }
    }

    //witherby was the last of training to subcumb. everyone goes at different rates
    isStartingToFeelMonstrous = () => {
        let max = 5;
        max += 1 * Math.ceil(this.stats[MIND_METAL_STAT] / 10); //you can rationalize that you're fine you're normal nothing is wrong this is just how people are sometimes (camille)
        max += 1 * Math.ceil(this.stats[TONGUE_METAL_STAT] / 10); //you can tell yourself soothing stories about how much better you are than a monster (witherby)
        max += -1 * Math.ceil(this.stats[EYES_METAL_STAT] / 10); //you can see exactly how monstrous you are and can't turn a blind eye (devona)
        max += -1 * Math.ceil(this.stats[ARMS_METAL_STAT] / 10); //you instinctively lash out, whether you accept it or not you DO monstrous things (ria)
        max += +1 * Math.ceil(this.stats[LEGS_METAL_STAT] / 10); //just keep going and going and going and maybe it will never catch up to you (neville)
        return this.monster_rating > Math.max(1, max);
    }

    //if you're starting to feel weird you start trying to leave
    isStartingToFeelCorruption = () => {
        if (this.wasted || this.censored || this.musical) {
            return false; //:)
        }

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
        if (this.wasted || this.censored || this.musical) {
            return false; //:) its the first thing waasted players hack but also theres other ways to become a monster :)
        }
        let max = 1000;
        max += 200 * this.stats[MIND_METAL_STAT]; //you can last longer the higher  your intelligence
        max += -50 * this.stats[TONGUE_METAL_STAT]; //tell others about zampanio and listen to them
        max += -50 * this.stats[EYES_METAL_STAT]; //the Eye is vulnerable to Zampanio
        max += -50 * this.stats[ARMS_METAL_STAT]; // if you give in to the urge to create, Zampanio gets you faster
        max += +200 * this.stats[LEGS_METAL_STAT]; //just walk away
        return this.corruption > max;
    }
    //https://www.tumblr.com/jadedresearcher/801579387276378112/whiteantcrawls-helloitsbees?source=share
    getName = () => {
        let name_holder = this.wasted ? this.title : this.name;
        return titleCase(`${this.dead ? "the corpse of " : ""}${this.corrupted ? "what had once been " : ""}${this.corrupted ? Zalgo.generate(name_holder) : name_holder}${this.wasted ? "(Looping)" : ""}${this.hunted() ? "(Hunted)" : ""}`);
    }


    nameHTML = () => {
        if (this.stolen_name || this.wasted) { //lol names suck, why bother with them? so much easier to know people by what they're doing, right?
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

    addItemToInventory = (game, item, ele, surpress_spam) => {
        //automatically eat it if it would waste you
        if (!this.wasted && item.isFruit) {

            /*player on player violence is tragic but possible
                what would YOU do
            to become a demi-god
            */

            if (this.current_location && this.current_location.players.length > 1) {
                let best_murderer;
                for (let player of this.current_location.players) {
                    //mannequins can kill you for your fruit, but the dead can not
                    //just knowing the wastes, both real and imaginary, will read these comments, gives me life
                    if (player != this && !player.dead && player.preparedToKill) {
                        if (!best_murderer) {
                            best_murderer = player;
                        } else {
                            //whoever hates the lucky bastard who found Harvest Fruit most gets dibs on shanking them for it
                            if (player.relationships[this.title] < best_murderer.relationships[this.title]) {
                                best_murderer = player;
                            }
                        }
                    }
                }

                if (best_murderer) {
                    game.event_list.push("Black Friday")
                    const child = createElementWithClassAndParent('p', ele)
                    //don't accidentally recurse and risk someone ELSE stealing this from you

                    if (this.corrupted) {
                        child.innerHTML = `${this.nameHTML()} is battern into many shards of ${this.mannequin_type} as ${best_murderer.nameHTML()} violently pries the ${item.name} from their stiff and unyeilding joints.`;
                    } else {
                        child.innerHTML = `${this.nameHTML()} raises the ${item.name} to their lips on base instinct, ready to devour it when some other, deeper instinct has them look behind them. 
                        <br><br>It's only ${best_murderer.nameHTML()}. 
                        <br><br>They turn back, intent on achieving their divinity when something heavy hits them on the head and there is a swirl of vertigo as their world view shifts. <br><Br>
                        Dazed, they try to understand. Floor? Ceiling? Wall? Where...where are they?
                        <Br><Br>
                        Try to focus.
                        <br><Br>
                        Their hand grips the ${item.name} tighter, feeling its juices just barely begining to seep out.
                        <br><br>A burst of pain and with it...everything goes dark, and they die.
                        The mall does not know what sometimes drives shoppers to violence to acquire items.<br><Br>
                        Only that is sometimes does.`;

                    }
                    //even if they were a mannequin, the Sin of fraticide is upon you and witherby and hoon can smell it
                    best_murderer.sin_array.push(TEAM_KILLER);
                    this.kill("splayed onto the ground, head a bruised and bloody mess, fingers stained purple with fruit juice.")
                    const recursiveEle = createElementWithClassAndParent('p', child)

                    best_murderer.addItemToInventory(game, item, child, recursiveEle)

                    return;
                }
            }


            /*
            camille is just built different
            instead of an event
            she simply lurks
            waiting for doom
            so she can kill it

            also she doesn't get that instinctual tug towards mannequins
            they don't count as "alive" to her aspects of death and doom
            so
            in the rare case that a mannequin gets its <INSERT MATERIAL HERE> hands on some fruit
            it ascends just fine
            */
            //if you're in a session ending in 4...thems the breaks, you are NOT going to get wasted on camilles watch (though she still can't sense mannequins as they are neither alive nor)
            if (((!this.corrupted && !this.wasted) && game.rand.nextDouble() < 0.4) || (!this.corrupted && game.rand.initial_seed % 10 === 4)) { //camille has a katana, 4 is a death/unlucky number in japan, it makes sense in a doom player way, theres a rule about how often she decapitates you
                if (game.tick_funeral_began && (game.current_tick - game.tick_funeral_began) > 10) {
                    //you can't stop her now that she's risen
                    game.event_list.push("The End Is Never The End")

                    this.inventory.push(item);
                    const child = createElementWithClassAndParent('p', ele)
                    /*
                    camille isn't in the armor if she's not bringing the End to someone
                    though she DOES still walk around as a corpse
                    the end is never the end is never the end is never the end
                    */

                    child.innerHTML = ` ${this.nameHTML()} raises the ${item.name} to their lips on base instinct, barely aware of their action when something tugs at their chest. They look down, the fruit dropping from suddenly enervated fingers and they see something...strange.
                    <br><br>
                    Is that... metal?  Sticking...out of their chest? 
                    <br><br>
                    The red coating it blossoms like a flower and then just as silently, the blade is withdrawn.
                    <br><br>
                    They fall to their knees.
                    <br><br>
                    As the life fades from their eyes, they realize they never even saw who stabbed them.
                    <br><br>
                    As if granting a final mercy, their view suddenly tumbles, and as their vision blurs, they catch a glimpse of a ghastly horror, a figure in thick armor with their head crudely sewn back on, crimson butterfly mask obscuring their face, as well as  ${this.nameHTML()}'s own headless torso, falling limply forward.
                    <br>
                    <img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/the_end_breached.gif'>
                    `;
                    game.event_list.push("The End");
                    this.kill("decapitated with a clean slice, head neatly beside the body, blood stained in all directions. If you look closely, you can see a stab wound in the chest, but the blood from the missing head seems to almost completely cover it. The head must have been removed within minutes of the stab.")

                    return;
                }


                if (this.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE) {
                    //you don't get killed but you DO forget to eat your fruit
                    const child = createElementWithClassAndParent('p', ele)
                    child.innerHTML = ` 
${this.nameHTML()} raises the ${item.name} to their lips on base instinct, ready to devour it when some other, deeper instinct has them look behind them. 
<br><Br>
A tall woman looms there, a blade at the ready. 
<br><Br>
Immediately ${this.nameHTML()} begins talking, rambling really, trying to demand the strange woman explain why they are attacking them, what crime they commited, asking if they're a cop, if they're with that 'training team' they heard defends the mall, asking why they try to stop them from getting the fruit.
<br><Br>
The woman opens her mouth to speak only for something to squelch within her. 
<br><Br>
She gasps out just a few words and her words become wetter, more guttural.   The Fruit is Tainted. Unloved by the Universe. Dangerous.  All who eat suffer. All who eat cause suffering. 
<br><Br>
A thick red line opens along her throat and blood begins gushing out in thick pulses. 
<br><Br>
Finally, her head slides off her body, and it tumbles backwards.
<br><br>
<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/oh_huh_2-moshed-01-29-23-11-06-030.gif'>

${this.nameHTML()} boggles vacantly, as a swarm of crimson butterflies slowly enfold the rapidly cooling corpse, spinning a coffin from thin air.
`;
                    this.sin_array.push(MONSTER_KILLER)
                    /*

(and why yes, she is not thinking about the implications that her and her friends being in the loop is both suffering and causing suffering, why do you ask)


vik doesn't get it
or does and is maliciously pretending they don't
theres a reason camille insists on still doing corporation work
in still using the veneer of normalcy
the forms
the beurocracy
camille both is inherently aware of, and trying to ignoroe, the weight on her shoulders
haven't they ALWAYS been saving the world with their work?
isn't this no different than an aleph teir threat?
but it is.
its not one world
its not even all worlds
its all POSSIBLE worlds
if the echidna runs out of space, reality crashes
and the space its chewing through is whats allocated for... everything
ever
the future
the past
the present
the entire creation cycle of sburb dies with the echidna
OR
you know
you can kill it
before it eats through everything
but she won't
she protects it
immune system
                    */
                    game.tick_funeral_began = game.current_tick; //ria spends ten ticks mourning in the funeral, then her event starts responding ANYWHERE
                    game.event_list.push("The End Is Dead")
                    this.current_location.name = "Funeral"
                    this.inventory.push(item);

                    this.current_location.longer_name = FUNERAL_FOR_DEAD_BUTTERFLIES
                    return;
                } else {
                    this.inventory.push(item);
                    const child = createElementWithClassAndParent('p', ele)

                    child.innerHTML = ` ${this.nameHTML()} raises the ${item.name} to their lips on base instinct, barely aware of their action when something tugs at their chest. They look down, the fruit dropping from suddenly enervated fingers and they see something...strange.
                    <br><br>
                    Is that... metal?  Sticking...out of their chest? 
                    <br><br>
                    The red coating it blossoms like a flower and then just as silently, the blade is withdrawn.
                    <br><br>
                    They fall to their knees.
                    <br><br>
                    As the life fades from their eyes, they realize they never even saw who stabbed them.
                    <br><br>
                    As if granting a final mercy, their view suddenly tumbles, and as their vision blurs, they catch a glimpse of a gently smiling woman...and of ${this.nameHTML()}'s own headless torso, falling limply forward.
                    <br>
                    <img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/the_last_thing_you_see.gif'>
                    `;
                    game.event_list.push("The End");
                    this.kill("decapitated with a clean slice, head neatly beside the body, blood stained in all directions. If you look closely, you can see a stab wound in the chest, but the blood from the missing head seems to almost completely cover it. The head must have been removed within minutes of the stab.")

                }
                return;
            }

            const formerName = this.nameHTML();
            this.wasted = true;
            this.joinTheLoop(ele);
            if (this.corrupted) {
                game.event_list.push("Mannequin Ascension")
                const child = createElementWithClassAndParent('p', ele)

                child.innerHTML = `You do not understand how ${formerName} managed to messily devoured the ${item.name} through a blank ${this.mannequin_type} face and at this point you're afraid to ask. They have become the ${this.nameHTML()} as a result. They have Joined the Loop! <br><br><img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/get_ahead-moshed-02-01-10-05-10-088.gif'>`;

            } else {
                const child = createElementWithClassAndParent('p', ele)

                child.innerHTML = ` ${formerName} has messily devoured the ${item.name} and has become the ${this.nameHTML()} as a result. They have Joined the Loop!`;

            }

        } else if (this.wasted && item.isFruit) {
            this.inventory.push(item);
            const child = createElementWithClassAndParent('p', ele)

            child.innerHTML = ` ${this.nameHTML()} reverently picks up the ${item.name}! While they are already Wasted, they are not about to leave the sacred item behind just lying on the floor. ${item.description}`;

        } else {

            this.inventory.push(item);
            if (!surpress_spam) { //mannequins would generate a lot of this
                const child = createElementWithClassAndParent('p', ele)

                child.innerHTML = ` ${this.nameHTML()} has picked up the ${item.name}! ${item.description}`;

            }
        }
    }

    removeItemFromInventory = (item, ele) => {
        removeItemOnce(this.inventory, item);
        ele.innerHTML = ` ${this.nameHTML()} has dropped the ${item.name}!`;
    }

    //zampanio sands you smooth
    //corrupts you into yourself
    //you become more and more what you are, the highs and lows
    //with anything in the middle slowly rubbed away
    raiseHighestStat = (value) => {
        const stat = this.highestStat();
        this.raiseStat(stat[key], value);
    }

    reduceLowestStat = (value) => {
        const stat = this.lowestStat();
        this.raiseStat(stat[key], -1 * value);
    }

    //if youre not the best or the worst,
    // become a bit more like a default human (MEDIUM_STAT_VALUE)
    smoothOutMediocreStatsByOne = () => {
        const high = this.highestStat();
        const low = this.lowestStat();
        for (let [key, value] of Object.entries(this.stats)) {
            if (key !== high[key] && key !== low[key]) {
                //lower it if you're too good at it
                if (value > MEDIUM_STAT_VALUE) {
                    this.raiseStat(key, -1);
                } else if (value < MEDIUM_STAT_VALUE) { //raise it if you're too bad at it
                    this.raiseStat(key, 1);

                }
            }
        }

    }

    //zampanio only cares about the ways you stand out
    //everything else gets lost to you
    //the fanfic-ification of blorbos is mandatory in order to save space
    //compression is a hell of a thing
    sandSmoothByValue = (change_value) => {
        const high = this.highestStat();
        const low = this.lowestStat();
        for (let [key, value] of Object.entries(this.stats)) {
            if (key == high["key"]) {
                this.raiseStat(key, change_value);
            } else if (key == low["key"]) {

                this.raiseStat(key, -1 * change_value);

            } else {

                if (value > MEDIUM_STAT_VALUE) {
                    //don't reduce it by TOO much, get stuck at the medium value
                    this.stats[key] = Math.max(MEDIUM_STAT_VALUE, this.stats[key] - change_value)
                } else if (value < MEDIUM_STAT_VALUE) { //raise it if you're too bad at it
                    //don't raise it by TOO Much, get stuck at the medium value
                    this.stats[key] = Math.min(MEDIUM_STAT_VALUE, this.stats[key] + change_value)

                }
            }

        }

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

    raiseStat = (key, value) => {
        this.stats[key] += value;
    }

    //its not easy, to take a life
    //camellia has riled the cultists up
    //dehumanized the enemy
    //but you still have to be a very specific kind of person
    //to kill in coold blood
    preparedToKillInitially = () => {

        if (isItFriday()) {
            /*
the mall is afraid of fridays
black friday
it doesn't know whats special about that
something about fridays makes people rip and tear into each other
just for things
any other day they simply use little bits of paper and metal to get their things
but fridays
something goes wrong
the rest of zampanio warns you off on friday
but mall sim shows you why
*/
            return true;
        }

        if (this.theme_keys.includes(KILLING)) {
            return true;
        }
        //someone will kill if they prefer action strongly over compromise

        return this.stats[ARMS_METAL_STAT] > MEDIUM_STAT_VALUE && this.stats[TONGUE_METAL_STAT] < MEDIUM_STAT_VALUE;
    }

    decideWhereToGoAsAMannequin = (ele, rand, currentLocation, north, south, east, west) => {
        //its not you moving your limbs, not always
        this.fear++;
        let choices = [north, south, east, west, currentLocation].filter((i) => i);
        let chosen = rand.pickFrom(choices);
        ele.innerHTML = `When you weren't looking, somehow ${this.nameHTML()} is in the ${chosen.longer_name} [${chosen.row},${chosen.col}], crumpled over a pile of junk.`;
        if (currentLocation != chosen) {
            chosen.pending_players.push(this);
            this.pending_location = chosen;
        }
    }

    //if you're getting really corrupt you'll start getting a pull to 
    //try to return back to the maze (go left and up)
    //otherwise you prefer to right and down
    //high eyes and legs stats makes you even more likely to move
    //while tongue and arms and mind makes you want to stay where you are and try to figure things out more
    decideWhereToGo = (parent, rand, currentLocation, north, south, east, west) => {
        //go to the east (continue down current corridor)
        if (this.dead) {
            return; //PLEASE stop being lively corpses
        }
        const ele = createElementWithClassAndParent("div", parent)
        if (this.corrupted) {
            return this.decideWhereToGoAsAMannequin(ele, rand, currentLocation, north, south, east, west);
        }
        const fleeing = this.fleeing || this.isStartingToFeelCorruption()

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
        let avoidedGoo = false;

        //can be forced because if literally nothing gets chosen, well, you made your choice
        const chooseStay = (force) => {
            //10 is an average stat value
            let stayWeight = 0;
            //surely we can find out more here before moving on?
            stayWeight += 1 * this.stats[MIND_METAL_STAT];
            stayWeight += 1 * this.stats[TONGUE_METAL_STAT];
            stayWeight += 1 * this.stats[EYES_METAL_STAT];
            //keep moving keep doing
            stayWeight += -1 * this.stats[ARMS_METAL_STAT];
            stayWeight += -1 * this.stats[LEGS_METAL_STAT];


            if (currentLocation.infinite || force || (currentLocation && stayWeight > 30 && rand.nextDouble() > 0.5)) {
                //locations handle adding corruption if you move into them
                //if you stay, i still want you to corrupt, so, here we are
                this.addCorruption(currentLocation.corruption);
                if (currentLocation.row === 0 && currentLocation.col === 0) {
                    if (this.isStartingToFeelCorruption()) {
                        ele.innerHTML = `${this.nameHTML()} desperately searches the ${currentLocation.longer_name} for a way out. It used to BE here, what.... How? They are freaking the fuck out. They KNOW they didn't get turned around, they were careful, they left the chalk marks, WHERE IS THE EXIT!?`;
                    } else {
                        ele.innerHTML = `${this.nameHTML()} decides to stay in the ${currentLocation.longer_name} for a little while longer, not quite ready to move further into the terrifying Westerville Mall.`;

                    }

                } else {
                    if (currentLocation.infinite) {
                        game.event_list.push("Infinite Wandering")
                        ele.innerHTML = `No matter how much ${this.nameHTML()} wanders, they can not find a way out of the <a target='_blank' href='http://farragofiction.com/ParkerLotLost/'>${currentLocation.longer_name}</a>.`;

                    } else {
                        if (!currentLocation.river && avoidedGoo) {
                            ele.innerHTML = `${this.nameHTML()} watches with horror as all exits are blocked by a sizzling, viscous pink goo.`;
                        } else if (currentLocation.river) {
                            ele.innerHTML = `${this.nameHTML()} desparately tries to avoid the sizzling, viscous pink goo pouring into the ${currentLocation.longer_name}.`;
                        } else {
                            ele.innerHTML = `${this.nameHTML()} decides to stay in the ${currentLocation.longer_name} for a little while longer, checking if they missed anything${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                        }

                    }

                }

                return currentLocation;

            }
        }

        const chooseEast = () => {

            if (east && !fleeing && (loyalWeight > 30 || rand.nextDouble() > 0.5)) {
                if (currentLocation.name === CORRIDOR_NAME && east.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.nameHTML()} decides to continue walking down the mall corridor, and moves to the EAST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else if (east.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.nameHTML()} decides to try out this new mall corridor, and moves to the EAST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.nameHTML()} decides to explore the mysterious ${east.longer_name} and moves to the  EAST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;

                }
                return east;
            }
        }

        const chooseSouth = () => {

            if (south && !fleeing && (loyalWeight < 30 || rand.nextDouble() > 0.5)) {
                if (currentLocation.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.nameHTML()} decides to explore the mysterious ${south.longer_name} and moves to the  SOUTH${DEBUG_PLAYERS ? `, gaining ${south.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.nameHTML()} barely even notices when the ${currentLocation.longer_name} blends into a ${south.longer_name}${DEBUG_PLAYERS ? `, gaining ${south.corruption} corruption` : ""}.`;
                }
                return south;
            }
        }

        const chooseWest = () => {
            if (west && fleeing && rand.nextDouble() > 0.5) {
                if (currentLocation.name === CORRIDOR_NAME) {
                    ele.innerHTML = `${this.nameHTML()} is feeling kind of weird and decides to go back up the mall corridor, and moves to the WEST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                } else {
                    ele.innerHTML = `${this.nameHTML()} decides to try going back to a more familiar corridor, and moves to the WEST${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;
                }
                return west;
            }
        }

        const chooseNorth = () => {

            if (north && fleeing && rand.nextDouble() > 0.1) {
                ele.innerHTML = `${this.nameHTML()} decides to try getting back to the entrance, and moves NORTH, into the ${north.longer_name} ${DEBUG_PLAYERS ? `, gaining ${east.corruption} corruption` : ""}.`;

                return north;
            }
        }

        //first check if staying
        //then check where  you want to go


        const companions = currentLocation.livingPlayers();
        //ignore yourself
        if (companions.length > 1) {
            //is there anyone here you feel strongly about (good or bad)?
            //do they already have a pending_location?
            //if so, copy it from them without figuring out where you want to go on your own
            //only leave them if you decide you don't care anymore
            for (let companion of companions) {
                if (companion !== this && companion.pending_location) {
                    const relationship = this.getStrongRelationshipOrNothing(companion);
                    if (relationship) {
                        chosenLocation = companion.pending_location;
                        ele.innerHTML = `${this.nameHTML()} decides to stick with ${companion.nameHTML()}. ${relationship.value > 0 ? "It just feels safer that way." : "They don't trust them as far as they can throw them and like HELL they're letting them out of their sight."}`;

                    }
                }
            }
        }


        //you might have chosen to go with a  friend already
        if (!chosenLocation) {
            chosenLocation = chooseStay();
            if (chosenLocation && chosenLocation.river) {
                chosenLocation = undefined;
                avoidedGoo = true;
            }
        }



        if (!chosenLocation) {
            chosenLocation = chooseEast();
            if (chosenLocation && chosenLocation.river) { //try to avoid dying on purpose in goo
                chosenLocation = undefined;
                avoidedGoo = true;
            }
        }

        if (!chosenLocation) {
            chosenLocation = chooseSouth();
            if (chosenLocation && chosenLocation.river) {//try to avoid dying on purpose in goo
                chosenLocation = undefined;
                avoidedGoo = true;
            }
        }

        if (!chosenLocation) {
            chosenLocation = chooseWest();
            if (chosenLocation && chosenLocation.river) {//try to avoid dying on purpose in goo
                chosenLocation = undefined;
                avoidedGoo = true;
            }
        }

        if (!chosenLocation) {
            chosenLocation = chooseNorth();
            if (chosenLocation && chosenLocation.river) {//try to avoid dying on purpose in goo
                chosenLocation = undefined;
                avoidedGoo = true;
            }
        }


        if (!chosenLocation) {
            chosenLocation = chooseStay(true);
        }
        if (currentLocation != chosenLocation) {
            chosenLocation.pending_players.push(this);
            this.pending_location = chosenLocation;
        } else {
            //choosing to stay, need to tell my friends about this
            this.pending_location = chosenLocation;
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