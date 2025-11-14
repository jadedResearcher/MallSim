class Game {
    players = [];
    locations = []; //position zero is the entrance
    rand;//only thing storing it, pass it to anything that needs to use it

    constructor(rand) {
        this.rand = rand;
        this.players = randomParty(rand);

    }

    /*
        locations tick, not people (the mall is alive)
        each tick, look for locations that are awake (blood inside them)

        "The twisted shops and forlorn geometry get worse the longer it suffers, he knows. It needs people. Like a body needs blood. Needs to have objects moved out of it, like blood cells moving oxygen. Helps it think better. Remember what it's supposed to be better."
    */
    tick = (parent) => {
        console.log("JR NOTE: ticking with this many lcoations", this.locations.length)
        if (this.locations.length === 0) {
            console.log("JR NOTE: no locations found, spawning entrance")
            this.handleSpawningMallEntrance(parent);
            return;
        }
        //for each location
        //do interaction scene of everyone inside (if more than one)
        //check if any events happen. if not, do a little flavor text
        //if yes, stop checking events

        for (let location of this.locations) {
            console.log("JR NOTE: checking if location is awake: ", location.name)
            let event_happened = false;

            console.warn("JR NOTE: todo, scan location for valid events")

            if (!event_happened) {
                location.renderGenericBoringNonEvent(this.rand, parent);
            }
        }

        //once done ticking each location with blood in it, render the current state of the mall
        this.renderMall(parent);
    }

    renderMall = (parent) => {
        console.warn("JR NOTE: i found myself unable to decide how i wanted this and i wans't making progress so i decided to just leave it for now and think on it while im coding")
    }

    start = (parent) => {
        this.handleIntro(parent);
    }

    handleSpawningMallEntrance = (parent) => {
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

        const mall_entrance = new Location("Mall Entrance", [QUESTING, GUIDING, LONELY, this.rand.pickFrom(keys)], []);
        mall_entrance.players = [...this.players];
        general_intro.innerHTML = `${arrayToHumanSentence(this.players.map((i) => i.nameHTML()))} enter the mall, nervous and excited about their impending adventure. <br><br>They are almost disappointed at how ... normal it seems.<br><br>Sure, it's abandoned, but other than the dust and gloom it seems like any other mall they've been to. <br><br>Surely deeper in is where the danger lurks...`;
        this.locations.push(mall_entrance);

    }

    handleIntro = (parent) => {
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        general_intro.innerHTML = `${this.players.length} members of the Cult of the Harvest gather outside the Westerville Mall. Though it was many years ago each had given themself over to the faith, it is only today they partake in the most sacred ritual of the cult: Delving into the Blasphemous Mall and Relclaiming the Fruit of Wisdom hoarded by the monsters within.<br><br>Should they succeed, they will be granted eldritch knowledge of loops and spirals and endless ends. <br><br>Should they fail...one way or another, they will never leave this mall again.<br><br>They are prepared for their fate, ready to join the Inner Circle of the Cult at last.`;

        for (let player of this.players) {
            const ele = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            let text = "";
            if (player.leader) {
                text = `Leading the Faithful is ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            } else {
                text = `There was also ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            }

            //interests
            const backstory = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, GENERALBACKSTORY, false);
            const compliemnt = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, COMPLIMENT, false);
            const insult = pickARandomThemeFromListAndGrabKey(this.rand, player.themes, INSULT, false);
            text += ` ${titleCase(insult)} but ${compliemnt}, they ${backstory}. `

            //relationships
            const family = getFamilyOfEntity(player);
            if (family && family.length > 1) {
                text += `${family.map((i) => i.nameHTML()).join(", ")} are all members of their family. `;
            } else if (family && family.length === 1) {
                text += `${family[0].nameHTML()} is a member of their family. `;

            }

            const romanticPartners = getRomanticPartnersOfEntity(player);
            if (romanticPartners && romanticPartners.length > 1) {
                text += `${romanticPartners.map((i) => i.nameHTML()).join(", ")} are all members of their polycule. `;
            } else if (romanticPartners && romanticPartners.length === 1) {
                text += `${romanticPartners[0].nameHTML()} is their romantic partner. `;

            }

            ele.innerHTML = text;

        }
        const tick_bar = createElementWithClassAndParent("div", parent, "tick-bar");
        const title = createElementWithClassAndParent("div", tick_bar, "tick-bar-title");
        title.innerText = "Controls"

        const tick_button = createElementWithClassAndParent("button", tick_bar, "tick-button tick-once-button");
        tick_button.innerText = "Tick 1x";
        tick_button.onclick = () => {
            this.tick(parent);
        }

        const tick_button2 = createElementWithClassAndParent("button", tick_bar, "tick-button tick-ten-button");
        tick_button2.innerText = "Tick 10x";
        tick_button2.onclick = () => {
            window.alert("todo ten ticks")
        }

        const tick_button3 = createElementWithClassAndParent("button", tick_bar, "tick-button tick-hundred-button");
        tick_button3.innerText = "Tick 100x";
        tick_button3.onclick = () => {
            window.alert("todo 100 ticks")
        }

    }
}