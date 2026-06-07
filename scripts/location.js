/*
A square in the mall.

"The twisted shops and forlorn geometry get worse the longer it suffers, 
he knows. It needs people. Like a body needs blood. 
Needs to have objects moved out of it, like blood cells moving oxygen.
 Helps it think better. Remember what it's supposed to be better.

 And so he provides. Basic Attachment work really, 
 filling this strange place's social needs. 
 A bit of Instinct as well, he supposes, but he was hardly terrible at that.
 "

 this is an extremely good reason for the mall to be more .... MALL like near the entrance. 

further you get from it (keep count as you spawn new squares) the weirder it gets

i think if they get far enough in the Mall itself should try to talk to them

begs them to serve it, to bring other people in, to take things out of it, to leave little coins behind

promises fruit, all the fruit they could want

don't leave it alone... don't abandon it...

https://kittyhorrorshow.itch.io/anatomy
*/

const randomThemedShop = (rand, themes, right_row, right_col) => {
    let foundTemplates = []; //always at least SOME chance of a non themed shop

    for (let theme of themes) {
        if (theme_locations[theme] && theme_locations[theme].length > 0) {
            foundTemplates = foundTemplates.concat(theme_locations[theme])
        }
    }

    if (foundTemplates.length > 0) {
        const ret = rand.pickFrom(foundTemplates).cloneIntoLocation(right_row, right_col);
        ret.theme_keys = themes; //don't throw away all the other themes
        return ret;
    }
}

const randomShop = (rand, themes, right_row, right_col) => {


    const personal_adj = pickARandomThemeFromListAndGrabKey(rand, themes, ADJ, true);

    if (rand.nextDouble() > 0.95) {
        return new Location(`Smoothies`, `${personal_adj} Smoothies`, themes, right_row, right_col, [tricksterCloser.clone()], "rgba(161,0,66)");
    }

    if (rand.nextDouble() > 0.95) {
        const ret = new Location(`Food Court`, `${personal_adj} Food Court Entrance`, food_keys, right_row, right_col, [], "rgba(236,185,10)");
        ret.isFoodCourt = true; //starts a food court spawning chain
        return ret;
    }

    const ret = randomThemedShop(rand, themes, right_row, right_col);
    if (ret || rand.nextDouble() > 0.88) { //not guaranteed to have a themed shop
        return ret;
    }


    //fallback
    return new Location(`Shop`, `${personal_adj} Shop`, themes, right_row, right_col, [randomlyFindShoppingObject.clone()], "#a10000");
}


class Location {
    name = "???"
    //a food court entrance will start this, food courts have different spawning rules
    isFoodCourt = false;
    longer_name = "??? But Longer"
    color; //special shops will be special colors
    row = 0;
    col = 0;
    river = false; //possibly not the kind of river you're thinking about lol
    infinite = false; //infinite locations behave differently, and if you die inside them you spawn, alive, back at [0,0]
    corruption = 1; //rooms get deeper the further in they go
    theme_keys = []; //for senses and flavor text and children (like a fancy clothes store can be Fire themed, not that a fire theme is more likely to have, i dunno, food)
    players = []; //locations tick, not players
    pending_players = []; //players moving into this location (needed so i don't tick them new)

    events = [];

    constructor(name, longer_name, theme_keys, row, col, events, color) {
        this.name = name;
        if (color) {
            this.color = color;
        }
        this.longer_name = longer_name;
        this.row = row;
        this.col = col;
        //deeper to the east you get but what REALLY starts adding up is deeper to the south
        this.corruption = row * 2 + col;
        this.events = events;
        const existingEventNames = this.events.map((e) => e.name)
        for (let event of generalEvents) {
            if (!existingEventNames.includes(event.name)) {
                this.events.push(event.clone())
            }
        }
        this.theme_keys = theme_keys;
    }
    //http://knucklessux.com/PuzzleBox/Secrets/misc/Zampanio_AP_Test_Sampler_by_SurvivorOfAvalances.pdf
    //need to know the correct location because otherwise corruption will be wrong
    cloneIntoLocation = (row, col) => {
        let cloned_events = this.events.map((e) => e.clone());

        const ret = new Location(this.name, this.longer_name, [...this.theme_keys], row, col, cloned_events, this.color);
        ret.infinite = this.infinite;
        return ret;
    }

    //mostly used by the expanding food court
    //if the location you're in suddenly shifts on you
    //don't get lost in a shadow location, m'kay?
    transferPlayersFrom = (existing) => {
        //console.log("JR NOTE: transfering players from", { existing, current: this })
        for (let player of existing.players) {
            player.current_location = this;
            this.players.push(player)
        }

        for (let player of existing.pending_players) {
            player.current_location = this;
            this.pending_players.push(player)
        }
    };


    livingNonMannequinPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.dead && !player.corrupted) {
                ret.push(player)
            }
        }
        return ret;
    }

    livingMannequinPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.dead && player.corrupted) {
                ret.push(player)
            }
        }
        return ret;
    }

    livingWastedPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.dead && player.wasted) {
                ret.push(player)
            }
        }
        return ret;
    }

    livingPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.dead) {
                ret.push(player)
            }
        }
        return ret;
    }

    deadPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (player.dead) {
                ret.push(player)
            }
        }
        return ret;
    }

    nonCorruptedPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.corrupted) {
                ret.push(player)
            }
        }
        return ret;
    }

    checkEventsAndApplyNoMoreThanOne = (game, ele) => {
        for (let event of this.events) {
            let triggered = event.checkConditions(game, this, ele);
            if (triggered) {
                return true;
            }
        }
        return false;
    }

    //its not malicious, she's just very big and you're too tiny to see as she shifts around to get more comfortable
    spreadRiver = (rand, north, south, east, west) => {
        if (north && rand.nextDouble() > 0.5) {
            north.river = true;
        }

        if (south && rand.nextDouble() > 0.5) {
            south.river = true;
        }

        if (east && rand.nextDouble() > 0.5) {
            east.river = true;
        }

        if (west && rand.nextDouble() > 0.5) {
            west.river = true;
        }
    }

    removeEvent = (event) => {
        const copyOfEvents = [...this.events]
        for (let e of copyOfEvents) {
            if (event.name === e.name) {
                removeItemOnce(this.events, e)
            }
        }
    }

    movePlayerInto = (player) => {
        player.addCorruption(this.corruption);
        if (player.current_location) { //who says they came from anywhere?
            removeItemOnce(player.current_location.players, player);
        }

        this.players.push(player);
        player.current_location = this;
        player.pending_location = undefined;
    }


    //handles corrupting them
    movePlayersFromPendingToInternal = () => {
        //was anyone added to this location?
        let ret = false;
        if (this.pending_players.length > 0) {
            for (let player of this.pending_players) {
                this.movePlayerInto(player)
                ret = true;
            }
            this.pending_players = [];//clear out

        }

        return ret;
    }



    //whoever is inside you pokes around and finds nothing
    //maybe they hear something in the distance or smell something
    //take in game so we know what players are like relative to the full party (i don't care how high your mind stat is, are you "the smart one" or not)
    renderGenericBoringNonEvent = (game, rand, parent) => {
        //console.log("JR NOTE: renderGenericBoringNonEvent for: ", this.name)
        const intro_container = createElementWithClassAndParent("div", parent);
        intro_container.style.marginBottom = "50px"

        const living = this.livingPlayers();

        //console.log("JR NOTE: this.theme keys is", this.theme_keys)
        const feeling = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, FEELING, false);
        const smell = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SMELL, false);
        const taste = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, TASTE, false);
        const sound = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SOUND, false);

        //its a coincidence that the only homestuck aspect was my old one. so sue me
        //btw this SHOULD be game , if you're the smartest person on the team you act like it, doesn't matter if you'r ethe smartest here
        const mindPlayer = getPartyHighestMind(game.players);
        const eyesPlayer = getPartyHighestEyes(game.players);
        const tonguePlayer = getPartyHighestTongue(game.players);
        const armPlayer = getPartyHighestArms(game.players);
        const legPlayer = getPartyHighestLegs(game.players);

        const locmindPlayer = getPartyHighestMind(this.players);
        const loceyesPlayer = getPartyHighestEyes(this.players);
        const loctonguePlayer = getPartyHighestTongue(this.players);
        const locarmPlayer = getPartyHighestArms(this.players);
        const loclegPlayer = getPartyHighestLegs(this.players);


        const antiMindPlayer = getPartyLowestMind(game.players);
        const antiEyesPlayer = getPartyLowestEyes(game.players);
        const antiTonguePlayer = getPartyLowestTongue(game.players);
        const antiArmPlayer = getPartyLowestArms(game.players);
        const antiLegPlayer = getPartyLowestLegs(game.players);


        //gather up everything you might be able to do, keyed by player  name
        //yes this means if two party members have identical titles the system will confused
        //we will too tho so its probably fine
        //and hey, weird bugs feed me
        const possibleActions = {};
        //initialize
        for (let p of this.livingPlayers()) {
            possibleActions[p.title] = []; //don't use name, they might lose it
        }


        //we don't care about specifics of the stats just
        //what roll do you play in the party, relative to the others. 

        if (mindPlayer && living.includes(mindPlayer)) {
            possibleActions[mindPlayer.title].push(`${mindPlayer.nameHTML()} is planning what the next steps should be.`);
            possibleActions[mindPlayer.title].push(`${mindPlayer.nameHTML()} is thinking deeply about what to do next.`);
        }

        if (antiMindPlayer && living.includes(antiMindPlayer)) {
            possibleActions[antiMindPlayer.title].push(`${antiMindPlayer.nameHTML()} is thinking of nothing in particular.`);
            possibleActions[antiMindPlayer.title].push(`${antiMindPlayer.nameHTML()} is daydreaming about soup.`);
        }


        if (eyesPlayer && living.includes(eyesPlayer)) {
            possibleActions[eyesPlayer.title].push(`${eyesPlayer.nameHTML()} pokes around at all the nooks and crannies but doesn't really find anything.`);
            possibleActions[eyesPlayer.title].push(`${eyesPlayer.nameHTML()} tries to figure out where the smell of ${smell} is coming from, but has no luck.`);
            possibleActions[eyesPlayer.title].push(`${eyesPlayer.nameHTML()} tries to figure out where the sound of ${sound} is coming from, but has no luck.`);
        }

        if (antiEyesPlayer && living.includes(antiEyesPlayer)) {
            possibleActions[antiEyesPlayer.title].push(`${antiEyesPlayer.nameHTML()} barely even notices the smell of ${smell}.`);
            possibleActions[antiEyesPlayer.title].push(`${antiEyesPlayer.nameHTML()} barely even notices the taste of ${taste} lingering in the air.`);
        }



        if (tonguePlayer && living.includes(tonguePlayer)) {
            possibleActions[tonguePlayer.title].push(`${tonguePlayer.nameHTML()} reminds ${this.players.length > 1 ? "everyone" : "themself"} to hydrate. They can't help recover ANY Harvest Fruit if they pass out from dehydration. `);
            possibleActions[tonguePlayer.title].push(`${tonguePlayer.nameHTML()} rambles to ${this.players.length > 1 ? "everyone" : "themself"} about what THEY are going to do once they are fully Wasted. What sick stunts can you do with the fabric of reality once you know how to hack it? `);
        }

        if (antiTonguePlayer && living.includes(antiTonguePlayer)) {
            possibleActions[antiTonguePlayer.title].push(`${antiTonguePlayer.nameHTML()} doesn't really feel like talking to anyone. ${this.players.length > 1 ? "" : "They are glad to be alone."} `);
            possibleActions[antiTonguePlayer.title].push(`${antiTonguePlayer.nameHTML()} is silent. `);
        }

        if (armPlayer && living.includes(armPlayer)) {
            possibleActions[armPlayer.title].push(`${armPlayer.nameHTML()} digs through various piles of junk on the floor, but doesn't find anything.`);
            possibleActions[armPlayer.title].push(`${armPlayer.nameHTML()} clears away debris and old signs, making sure everything is clear.`);
        }

        if (antiArmPlayer && living.includes(antiArmPlayer)) {
            possibleActions[antiArmPlayer.title].push(`${antiArmPlayer.nameHTML()} doesn't see anything obvious sticking out and doesn't really feel like digging around in piles of junk.`);
            possibleActions[antiArmPlayer.title].push(`${antiArmPlayer.nameHTML()} wishes that it wasn't so cluttered with debris and old signs everywhere.`);
        }

        if (legPlayer && living.includes(legPlayer)) {
            possibleActions[legPlayer.title].push(`${legPlayer.nameHTML()} bounces lighty on their feet, ready for some action. They can almost taste the ${taste} in the next room.`);
            possibleActions[legPlayer.title].push(`${legPlayer.nameHTML()} is itching to find new areas of the Mall.`);
        }

        if (antiLegPlayer && living.includes(antiLegPlayer)) {
            possibleActions[antiLegPlayer.title].push(`${antiLegPlayer.nameHTML()} conserves their energy, sitting on a nearby bench for a while. They're surprised that it feels like ${feeling}.`);
            possibleActions[antiLegPlayer.title].push(`${antiLegPlayer.nameHTML()} worries that they're not spending enough time in each area to make sure everything is found.`);
        }


        //METAL
        let ret = "";
        //alright now that i know what everyone COULD do, what are they actually doing?
        //even tho we initialized all game players (to know what your role is) we are only getting local ones
        for (let p of living) {
            if (p.dead) {
                break;//no more lively corpses
            }
            let options = possibleActions[p.title];

            if (p.isStartingToFeelCorruption()) {
                options.push(`${p.nameHTML()} is feeling weird... They are clutching their stomach.`)
                options.push(`${p.nameHTML()} is feeling weird... They are sweating really bad.`)
                options.push(`${p.nameHTML()} is feeling weird... They are breathing really hard.`)
                options.push(`${p.nameHTML()} is feeling weird... They are grabbing and scratching at their head...`)
                options.push(`${p.nameHTML()} is feeling weird... They are repeating little phrases quietly to themselves...over and over up and down...`)
                //unfortunately...you start to get irritable, too.
                p.hateEveryoneALittleBitMore();

            }

            //interesting the corruption only fully gets you when you're alone
            //if something is happening to you, the Curiosity To See will pull you forward just that little bit longer
            //its the quiet moments afterwards you need to worry about
            //incidentally
            //the mannequin thing
            //is really funny to me
            //if you're in the mall too long
            //zampanio loses track of you
            //SHOPPERS aren't in the mall that long
            //so the only other humanoid thing you might be
            //is a mannequin
            //and it just
            //assumes that about you without checking
            if (p.hasHitMaxCorruption() && !p.corrupted && !p.wasted) {
                p.becomeCorrupted(rand);
                const monster_desc = pickARandomThemeFromListAndGrabKey(rand, p.theme_keys, MONSTER_DESC, false);

                options = [`${p.nameHTML()} screams and screams as their eyes seal over with ${p.mannequin_type} and their limbs stiffen into ball joints and finally as their throat slowly becomes nothing but innert ${p.mannequin_type} their screams strangle into nothing. Their new body, ${monster_desc} `]
            } else if (p.corrupted) {
                /*
                fun fact: if you're ever playing miside, in that maze where the mannequins chase you?
                you can just look down at your feet
                it counts as seeing them (the reflection in the floor, i think)
                it makes it hard to navigate the maze
                but you can't die so
                shrugs
                */
                options = [`${p.nameHTML()} moves only when you cannot see them, their ${p.mannequin_type} limbs firmly locked into place as your gaze falls upon them.`]
            }

            if (this.river) {
                options = [];
                if (p === loclegPlayer) {
                    options.push(`${p.nameHTML()} is desperately trying to find solid locations to stand on, the sizzling pink goo driving them to feats of athleticism as they scramble up ledges, over garbage and onto kiosks.`)
                }

                if (p === locarmPlayer) {
                    options.push(`${p.nameHTML()} is desperately trying to punch the encroaching pink goo, burning off the skin of their knuckles.`)
                }

                if (p === locmindPlayer) {
                    options.push(`${p.nameHTML()} is desperately trying to figure out how to stop the pink goo but...theres nothing. It's too big.`)
                }


                if (p === loctonguePlayer) {
                    options.push(`${p.nameHTML()} is desperately trying to reason with the pink goo, but it is unresponsive.`)
                }

                if (p === loceyesPlayer) {
                    options.push(`${p.nameHTML()} is desperately looking for a way out of this, but all paths are sealed with the pink goo.`)
                }
                options.push(`${p.nameHTML()} doesn't even react as the sizzling pink goo laps at their feet and begins eating away at their shoes.`)

                options.push(`${p.nameHTML()} begs the Harvest to save them from the sizzling pink goo.`)
                options.push(`${p.nameHTML()} dunks their head into the sizling pink goo, hoping that it puts them out of their misery faster.`)
                options.push(`${p.nameHTML()} begins to cry as the pink goo splashes against their ankles and eats through their shoes.`)
            }


            if (!options || options.length === 0) {
                options.push(`${p.nameHTML()} isn't doing anything in particular.`);
            }
            if (ret == "") {
                ret += `<p>${rand.pickFrom(options)}</p>`;
            } else {
                const bridgeWords = ["", "", "", "", "", "", "", "", "Meanwhile, ", "At the same time, ", "Also, "];
                ret += `<p>${rand.pickFrom(bridgeWords)}${rand.pickFrom(options)}</p>`;
            }
        }

        intro_container.innerHTML = ret;

    }
}




