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
    theme_keys = []; //for senses and flavor text and children (like a fancy clothes store can be Fire themed, not that a fire theme is more likely to have, i dunno, food)
    northExit;
    southExit;
    eastExit;
    westExit; //disgusting, i know, but this isn't eyedol HQ, its the MALL and it works different, at least here
    players = []; //locations tick, not players
    events = []; //doesn't mean anything yet, but will.

    constructor(name, theme_keys, events, north, south, east, west) {
        this.name = name;
        this.events = events;
        this.theme_keys = theme_keys;
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
        console.log("JR NOTE: made location with theme", theme_keys)
    }

    //whoever is inside you pokes around and finds nothing
    //maybe they hear something in the distance or smell something
    renderGenericBoringNonEvent = (rand, parent) => {
        console.log("JR NOTE: renderGenericBoringNonEvent for: ", this.name)
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

        const templates = [];//populate this based on what kind of players we have


        const feeling = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, FEELING, false);
        const smell = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SMELL, false);
        const taste = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, TASTE, false);
        const sound = pickARandomThemeFromListAndGrabKey(rand, this.theme_keys, SOUND, false);



        const curious_player = rand.pickFrom(this.players);
        const accepting_player = rand.pickFrom(this.players);

        const patient_player = rand.pickFrom(this.players);
        const energetic_player = rand.pickFrom(this.players);
        const idealistic_player = rand.pickFrom(this.players);
        const realistic_player = rand.pickFrom(this.players);

        const free_player = rand.pickFrom(this.players);
        const loyal_player = rand.pickFrom(this.players);

        //instead of being paired like this, real events will have templates and results that are reliant on who is present
        //for example, at least one person who can SEE devona and one person who can CATCH her gets THIS path
        if (curious_player) {
            templates.push(`${curious_player.nameHTML()} pokes around at all the nooks and crannies but doesn't really find anything.`);
            templates.push(`${curious_player.nameHTML()} tries to figure out where the smell of ${smell} is coming from, but has no luck.`);
            templates.push(`${curious_player.nameHTML()} tries to figure out where the sound of ${sound} is coming from, but has no luck.`);
        } else if (accepting_player) {
            templates.push(`${accepting_player.nameHTML()} barely even notices the smell of ${smell}.`);
            templates.push(`${accepting_player.nameHTML()} barely even notices the sound of ${smell}.`);
        }

        if (energetic_player) {
            templates.push(`${energetic_player.nameHTML()} bounces lighty on their feet, ready for some action. They can almost taste the ${taste}.`);

        } else if (patient_player) {
            templates.push(`${patient_player.nameHTML()} conserves their energy, sitting on a nearby bench for a while. They're surprised that it feels like ${feeling}.`);
        }

        if (free_player) {
            templates.push(`${free_player.nameHTML()} is itching to find new areas of the Mall.`);

        } else if (loyal_player) {
            templates.push(`${patient_player.nameHTML()} worries that they're not spending enough time in each area to make sure everything is found.`);
        }

        if (realistic_player) {
            if (this.players.length > 1) {
                templates.push(`${realistic_player.nameHTML()} reminds everyone to hydrate. They can't help recover ANY Harvest Fruit if they pass out from dehydration. `);
            }
        } else if (idealistic_player) {
            if (this.players.length > 1) {
                templates.push(`${idealistic_player.nameHTML()} rambles to everyone about what THEY are going to do once they are fully Wasted. What sick stunts can you do with the fabric of reality once you know how to hack it? `);
            }
        }


        console.log('JR NOTE: eventually select template variables based on stats. So a curious player will be the one poking around etc.')

        const ret_options = [`${rand.pickFrom(templates)} <br><br>Meanwhile, ${rand.pickFrom(templates)}`];
        general_intro.innerHTML = rand.pickFrom(ret_options);

    }
}




