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


const randomShop = (rand, themes, right_row, right_col) => {
    console.log("JR NOTE: todo have non generic shops, like clothings stores for wibby (use alchemy engine from sburbsim to have theme traits?) like royal can have fancy?")
    const personal_adj = pickARandomThemeFromListAndGrabKey(rand, themes, ADJ, true);

    return new Location(`Shop`, `${personal_adj} Shop`, themes, right_row, right_col, [new RandomlyFindShoppingObject()]);
}


class Location {
    name = "???"
    longer_name = "??? But Longer"

    row = 0;
    col = 0;
    corruption = 1; //rooms get deeper the further in they go
    theme_keys = []; //for senses and flavor text and children (like a fancy clothes store can be Fire themed, not that a fire theme is more likely to have, i dunno, food)
    players = []; //locations tick, not players
    pending_players = []; //players moving into this location (needed so i don't tick them new)

    events = [];

    constructor(name, longer_name, theme_keys, row, col, events) {
        this.name = name;
        this.longer_name = longer_name;
        this.row = row;
        this.col = col;
        //deeper to the east you get but what REALLY starts adding up is deeper to the south
        this.corruption = row * 2 + col;
        this.events = events;
        for (let event of generalEvents) {
            this.events.push(event)
        }
        this.theme_keys = theme_keys;
        console.log("JR NOTE: made location with theme", theme_keys)
    }

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

    livingPlayers = () => {
        let ret = [];
        for (let player of this.players) {
            if (!player.dead) {
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

    //handles corrupting them
    movePlayersFromPendingToInternal = () => {
        //was anyone added to this location?
        let ret = false;
        if (this.pending_players.length > 0) {
            for (let player of this.pending_players) {
                player.addCorruption(this.corruption);
                ret = true;
                this.players.push(player);
                player.current_location = this;
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

        //console.log("JR NOTE: this.theme keys is", this.theme_keys)
        const feeling = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, FEELING, false);
        const smell = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SMELL, false);
        const taste = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, TASTE, false);
        const sound = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SOUND, false);

        //its a coincidence that the only homestuck aspect was my old one. so sue me
        const mindPlayer = getPartyHighestMind(game.players);
        const eyesPlayer = getPartyHighestEyes(game.players);
        const tonguePlayer = getPartyHighestTongue(game.players);
        const armPlayer = getPartyHighestArms(game.players);
        const legPlayer = getPartyHighestLegs(game.players);


        const antiMindPlayer = getPartyLowestMind(game.players);
        const antiEyesPlayer = getPartyLowestEyes(game.players);
        const antiTonguePlayer = getPartyLowestTongue(game.players);
        const antiArmPlayer = getPartyLowestArms(game.players);
        const antiLegPlayer = getPartyLowestLegs(game.players);


        //gather up everything you might be able to do, keyed by player  name
        //yes this means if two party members have identical names the system will confused
        //we will too tho so its probably fine
        //and hey, weird bugs feed me
        const possibleActions = {};
        //initialize
        for (let p of game.players) {
            possibleActions[p.name] = [];
        }


        //we don't care about specifics of the stats just
        //what roll do you play in the party, relative to the others. 

        if (mindPlayer && this.players.includes(mindPlayer)) {
            possibleActions[mindPlayer.name].push(`${mindPlayer.nameHTML()} is planning what the next steps should be.`);
            possibleActions[mindPlayer.name].push(`${mindPlayer.nameHTML()} is thinking deeply about what to do next.`);
        }

        if (antiMindPlayer && this.players.includes(antiMindPlayer)) {
            possibleActions[antiMindPlayer.name].push(`${antiMindPlayer.nameHTML()} is thinking of nothing in particular.`);
            possibleActions[antiMindPlayer.name].push(`${antiMindPlayer.nameHTML()} is daydreaming about soup.`);
        }


        if (eyesPlayer && this.players.includes(eyesPlayer)) {
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} pokes around at all the nooks and crannies but doesn't really find anything.`);
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} tries to figure out where the smell of ${smell} is coming from, but has no luck.`);
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} tries to figure out where the sound of ${sound} is coming from, but has no luck.`);
        }

        if (antiEyesPlayer && this.players.includes(antiEyesPlayer)) {
            possibleActions[antiEyesPlayer.name].push(`${antiEyesPlayer.nameHTML()} barely even notices the smell of ${smell}.`);
            possibleActions[antiEyesPlayer.name].push(`${antiEyesPlayer.nameHTML()} barely even notices the taste of ${taste} lingering in the air.`);
        }



        if (tonguePlayer && this.players.includes(tonguePlayer)) {
            possibleActions[tonguePlayer.name].push(`${tonguePlayer.nameHTML()} reminds ${this.players.length > 1 ? "everyone" : "themself"} to hydrate. They can't help recover ANY Harvest Fruit if they pass out from dehydration. `);
            possibleActions[tonguePlayer.name].push(`${tonguePlayer.nameHTML()} rambles to ${this.players.length > 1 ? "everyone" : "themself"} about what THEY are going to do once they are fully Wasted. What sick stunts can you do with the fabric of reality once you know how to hack it? `);
        }

        if (antiTonguePlayer && this.players.includes(antiTonguePlayer)) {
            possibleActions[antiTonguePlayer.name].push(`${antiTonguePlayer.nameHTML()} doesn't really feel like talking to anyone. ${this.players.length > 1 ? "" : "They are glad to be alone."} `);
            possibleActions[antiTonguePlayer.name].push(`${antiTonguePlayer.nameHTML()} is silent. `);
        }

        if (armPlayer && this.players.includes(armPlayer)) {
            possibleActions[armPlayer.name].push(`${armPlayer.nameHTML()} digs through various piles of junk on the floor, but doesn't find anything.`);
            possibleActions[armPlayer.name].push(`${armPlayer.nameHTML()} clears away debris and old signs, making sure everything is clear.`);
        }

        if (antiArmPlayer && this.players.includes(antiArmPlayer)) {
            possibleActions[antiArmPlayer.name].push(`${antiArmPlayer.nameHTML()} doesn't see anything obvious sticking out and doesn't really feel like digging around in piles of junk.`);
            possibleActions[antiArmPlayer.name].push(`${antiArmPlayer.nameHTML()} wishes that it wasn't so cluttered with debris and old signs everywhere.`);
        }

        if (legPlayer && this.players.includes(legPlayer)) {
            possibleActions[legPlayer.name].push(`${legPlayer.nameHTML()} bounces lighty on their feet, ready for some action. They can almost taste the ${taste} in the next room.`);
            possibleActions[legPlayer.name].push(`${legPlayer.nameHTML()} is itching to find new areas of the Mall.`);
        }

        if (antiLegPlayer && this.players.includes(antiLegPlayer)) {
            possibleActions[antiLegPlayer.name].push(`${antiLegPlayer.nameHTML()} conserves their energy, sitting on a nearby bench for a while. They're surprised that it feels like ${feeling}.`);
            possibleActions[antiLegPlayer.name].push(`${antiLegPlayer.nameHTML()} worries that they're not spending enough time in each area to make sure everything is found.`);
        }


        //METAL
        let ret = "";
        //alright now that i know what everyone COULD do, what are they actually doing?
        //even tho we initialized all game players (to know what your role is) we are only getting local ones
        for (let p of this.players) {
            if (p.dead) {
                break;//no more lively corpses
            }
            let options = possibleActions[p.name];

            if (p.isStartingToFeelCorruption()) {
                options.push(`${p.nameHTML()} is clutching their stomach.`)
                options.push(`${p.nameHTML()} is sweating really bad.`)
                options.push(`${p.nameHTML()} is breathing really hard.`)
                options.push(`${p.nameHTML()} is grabbing and scratching at their head...`)
                options.push(`${p.nameHTML()} is repeating little phrases quietly to themselves...over and over up and down...`)
            }

            //interesting the corruption only fully gets you when you're alone
            //if something is happening to you, the Curiosity To See will pull you forward just that little bit longer
            //its the quiet moments afterwards you need to worry about
            if (p.hasHitMaxCorruption() && !p.corrupted) {
                p.becomeCorrupted(rand);
                const monster_desc = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, MONSTER_DESC, false);

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




