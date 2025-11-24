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





class Location {
    name = "???"
    longer_name = "??? But Longer"

    row = 0;
    col = 0;
    corruption = 1; //rooms get deeper the further in they go
    theme_keys = []; //for senses and flavor text and children (like a fancy clothes store can be Fire themed, not that a fire theme is more likely to have, i dunno, food)
    players = []; //locations tick, not players
    pending_players = []; //players moving into this location (needed so i don't tick them new)

    events = []; //doesn't mean anything yet, but will.

    constructor(name, longer_name, theme_keys, row, col, events) {
        this.name = name;
        this.longer_name = longer_name;
        this.row = row;
        this.col = col;
        //deeper to the east you get but what REALLY starts adding up is deeper to the south
        this.corruption = row * 10 + col;
        this.events = events;
        this.theme_keys = theme_keys;
        console.log("JR NOTE: made location with theme", theme_keys)
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
    renderGenericBoringNonEvent = (rand, parent) => {
        console.log("JR NOTE: renderGenericBoringNonEvent for: ", this.name)
        const intro_container = createElementWithClassAndParent("div", parent);
        intro_container.style.marginBottom = "50px"

        console.log("JR NOTE: this.theme keys is", this.theme_keys)
        const feeling = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, FEELING, false);
        const smell = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SMELL, false);
        const taste = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, TASTE, false);
        const sound = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SOUND, false);

        //its a coincidence that the only homestuck aspect was my old one. so sue me
        const mindPlayer = getPartyHighestMind(this.players);
        const eyesPlayer = getPartyHighestEyes(this.players);
        const tonguePlayer = getPartyHighestTongue(this.players);
        const armPlayer = getPartyHighestArms(this.players);
        const legPlayer = getPartyHighestLegs(this.players);


        const antiMindPlayer = getPartyLowestMind(this.players);
        const antiEyesPlayer = getPartyLowestEyes(this.players);
        const antiTonguePlayer = getPartyLowestTongue(this.players);
        const antiArmPlayer = getPartyLowestArms(this.players);
        const antiLegPlayer = getPartyLowestLegs(this.players);


        //gather up everything you might be able to do, keyed by player  name
        //yes this means if two party members have identical names the system will confused
        //we will too tho so its probably fine
        //and hey, weird bugs feed me
        const possibleActions = {};
        //initialize
        for (let p of this.players) {
            possibleActions[p.name] = [];
        }


        //we don't care about specifics of the stats just
        //what roll do you play in the party, relative to the others. 

        if (mindPlayer) {
            possibleActions[mindPlayer.name].push(`${mindPlayer.nameHTML()} is planning what the next steps should be.`);
            possibleActions[mindPlayer.name].push(`${mindPlayer.nameHTML()} is thinking deeply about what to do next.`);
        }

        if (antiMindPlayer) {
            possibleActions[antiMindPlayer.name].push(`${antiMindPlayer.nameHTML()} is thinking of nothing in particular.`);
            possibleActions[antiMindPlayer.name].push(`${antiMindPlayer.nameHTML()} is daydreaming about soup.`);
        }


        if (eyesPlayer) {
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} pokes around at all the nooks and crannies but doesn't really find anything.`);
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} tries to figure out where the smell of ${smell} is coming from, but has no luck.`);
            possibleActions[eyesPlayer.name].push(`${eyesPlayer.nameHTML()} tries to figure out where the sound of ${sound} is coming from, but has no luck.`);
        }

        if (antiEyesPlayer) {
            possibleActions[antiEyesPlayer.name].push(`${antiEyesPlayer.nameHTML()} barely even notices the smell of ${smell}.`);
            possibleActions[antiEyesPlayer.name].push(`${antiEyesPlayer.nameHTML()} barely even notices the taste of ${taste} lingering in the air.`);
        }



        if (tonguePlayer) {
            possibleActions[tonguePlayer.name].push(`${tonguePlayer.nameHTML()} reminds ${this.players.length > 1 ? "everyone" : "themself"} to hydrate. They can't help recover ANY Harvest Fruit if they pass out from dehydration. `);
            possibleActions[tonguePlayer.name].push(`${tonguePlayer.nameHTML()} rambles to ${this.players.length > 1 ? "everyone" : "themself"} about what THEY are going to do once they are fully Wasted. What sick stunts can you do with the fabric of reality once you know how to hack it? `);
        }

        if (antiTonguePlayer) {
            possibleActions[antiTonguePlayer.name].push(`${antiTonguePlayer.nameHTML()} doesn't really feel like talking to anyone. ${this.players.length > 1 ? "" : "They are glad to be alone."} `);
            possibleActions[antiTonguePlayer.name].push(`${antiTonguePlayer.nameHTML()} is silent. `);
        }

        if (armPlayer) {
            possibleActions[armPlayer.name].push(`${armPlayer.nameHTML()} digs through various piles of junk on the floor, but doesn't find anything.`);
            possibleActions[armPlayer.name].push(`${armPlayer.nameHTML()} clears away debris and old signs, making sure everything is clear.`);
        }

        if (antiArmPlayer) {
            possibleActions[antiArmPlayer.name].push(`${antiArmPlayer.nameHTML()} doesn't see anything obvious sticking out and doesn't really feel like digging around in piles of junk.`);
            possibleActions[antiArmPlayer.name].push(`${antiArmPlayer.nameHTML()} wishes that it wasn't so cluttered with debris and old signs everywhere.`);
        }

        if (legPlayer) {
            possibleActions[legPlayer.name].push(`${legPlayer.nameHTML()} bounces lighty on their feet, ready for some action. They can almost taste the ${taste} in the next room.`);
            possibleActions[legPlayer.name].push(`${legPlayer.nameHTML()} is itching to find new areas of the Mall.`);
        }

        if (antiLegPlayer) {
            possibleActions[antiLegPlayer.name].push(`${antiLegPlayer.nameHTML()} conserves their energy, sitting on a nearby bench for a while. They're surprised that it feels like ${feeling}.`);
            possibleActions[antiLegPlayer.name].push(`${antiLegPlayer.nameHTML()} worries that they're not spending enough time in each area to make sure everything is found.`);
        }


        //METAL
        let ret = "";
        //alright now that i know what everyone COULD do, what are they actually doing?
        for (let p of this.players) {
            const options = possibleActions[p.name];
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




