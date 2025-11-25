const CORRIDOR_NAME = "Hall"

//row - 1
const getNorth = (map, row, col) => {
    if (!map[row]) {
        return;
    }
    if (row < 1) {
        return undefined;
    }
    return map[row - 1][col];
}

//col + 1
const getEast = (map, row, col) => {
    if (!map[row]) {
        return;
    }
    //console.log("JRNOTE: getEast", { map, row, col })
    return map[row][col + 1];
}

//col-1
const getWest = (map, row, col) => {
    if (!map[row]) {
        return;
    }
    return map[row][col - 1];
}

//row + 1
const getSouth = (map, row, col) => {
    if (!map[row]) {
        return;
    }
    //three elements, 0,1,2, if row is 3 its undefined
    if (row >= map.length - 1) {
        return undefined;
    }
    return map[row + 1][col];
}



class Game {
    players = [];
    current_tick = 0;
    theme_keys = []; //collated from the players
    rand;//only thing storing it, pass it to anything that needs to use it
    //each row is a row in the map
    //each cell is either undefined or a room in the mall
    map = [];
    constructor(rand) {
        this.rand = rand;
        this.players = randomParty(rand);
        for (let player of this.players) {
            console.log("JR NOTE: trying to scrape up themes from player,  ", { player, theme_keys_from_game: this.theme_keys })
            this.theme_keys = this.theme_keys.concat(player.theme_keys);
        }

    }

    getLocations = () => {
        const ret = [];
        for (let row of this.map) {
            for (let item of row) {
                if (item) { //its not empty space
                    ret.push(item);
                }
            }
        }
        return ret;
    }

    /*
        locations tick, not people (the mall is alive)
        each tick, look for locations that are awake (blood inside them)

        order of operations:
        decide if move
        check for events
        render mall

        "The twisted shops and forlorn geometry get worse the longer it suffers, he knows. It needs people. Like a body needs blood. Needs to have objects moved out of it, like blood cells moving oxygen. Helps it think better. Remember what it's supposed to be better."
    */
    tick = (parent) => {
        this.current_tick++;
        const locations = this.getLocations();

        console.log("JR NOTE: ticking with this many lcoations", locations.length)
        if (locations.length === 0) {
            console.log("JR NOTE: no locations found, spawning entrance")
            this.handleSpawningMallEntrance(parent);
            return;
        }

        this.movementAndInterctionTick(parent, locations)
        this.eventTick(parent, locations);
        //once done ticking each location with blood in it, render the current state of the mall
    }

    movementAndInterctionTick = (parent, locations) => {
        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");
        const header = createElementWithClassAndParent("h2", tick_container, "story-title");
        header.innerText = `Movement ${this.current_tick}`;

        //for each location
        //do interaction scene of everyone inside (if more than one)
        //and have players decide whether to move or not individually
        for (let location of locations) {
            //only locations with players 
            if (location.players.length > 0) {
                const north = getNorth(this.map, location.row, location.col)
                const south = getSouth(this.map, location.row, location.col)
                const east = getEast(this.map, location.row, location.col)
                const west = getWest(this.map, location.row, location.col)
                const start_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                start_phrase.innerHTML = `<span style='color:red'>TODO:</span> have ${arrayToHumanSentence(location.players.map((i) => i.nameHTML()))} interact with each other (altering relationships) and decide whether to move to a new location or stay here. List out their deicisons.`;
                for (let player of location.players) {
                    const player_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");

                    player.decideWhereToGo(player_phrase, this.rand, location, north, south, east, west);
                }

            }
        }

        //clean up, move pending players into their locations
        //can't do sooner or they might double tick
        for (let location of locations) {
            if (location.movePlayersFromPendingToInternal()) {
                //call add no matter what because it handles rng internally
                console.warn("JR NOTE: todo add things to other directions as well (north and south) only (never add west, oddly enough)")
                this.handleAddingCorridorToEastOfLocation(location);
                this.handleAddingShopToSouthOfLocation(location);
            }
        }
        this.renderMall(tick_container);

    }

    eventTick = (parent, locations) => {
        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");
        const header = createElementWithClassAndParent("h2", tick_container, "story-title");
        header.innerText = `Event ${this.current_tick}`;
        //for each location
        //check if any events happen. if not, do a little flavor text
        //if yes, stop checking events
        for (let location of locations) {
            //only locations with players 
            if (location.players.length > 0) {
                const start_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                start_phrase.innerHTML = `${arrayToHumanSentence(location.players.map((i) => i.nameHTML()))} ${location.players.length > 1 ? "are" : "is"} poking around in the ${location.longer_name}.`;

                const event_phrase = createElementWithClassAndParent("div", tick_container, "event-beat");

                //console.log("JR NOTE: checking if location is awake: ", location.name)
                let event_happened = location.checkEventsAndApplyNoMoreThanOne(this, event_phrase);

                //console.warn("JR NOTE: todo, scan location for valid events")

                if (!event_happened) {
                    location.renderGenericBoringNonEvent(this, this.rand, event_phrase);
                }
            }
        }

        for (let player of this.players) {
            //this happened as a bug during dev so of course i made an edge case for it, it was spooky how eventually alaya would always be alone (becaues she was less likely to go south)
            if (!player.current_location) {
                const start_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                start_phrase.innerHTML = `${player.nameHTML()} is nowhere and they see nothing and hear nothing not even their own screams.`;
            }
        }
        this.renderMall(tick_container);

    }

    renderMall = (parent) => {
        //console.log("JR NOTE: rendering mall", this.map)
        const mall_container = createElementWithClassAndParent("div", parent, "mall-render");
        for (let row of this.map) {
            const rowEle = createElementWithClassAndParent("div", mall_container, "maze-row");
            //console.log("JR NOTE: rendering map, row is ", row)

            for (let cell of row) {
                //console.log("JR NOTE: rendering map cell is ", cell)

                if (cell) {
                    const ele = createElementWithClassAndParent("div", rowEle, "maze-cell");
                    if (cell.name != CORRIDOR_NAME) {
                        ele.style.backgroundColor = "#a10000"
                    }
                    ele.innerText = cell.name;

                    if (cell.players.length === 0) {
                        ele.classList.add("fog-of-war")
                    } else {
                        const icon_holder = createElementWithClassAndParent("div", ele, "player-icon-holder");
                        //little black dots showing where players are
                        for (let i = 0; i < cell.players.length; i++) {
                            const icon = createElementWithClassAndParent("div", icon_holder, "player-icon");
                        }
                    }


                } else {
                    const ele = createElementWithClassAndParent("div", rowEle, "maze-cell");
                    ele.classList.add("empty-cell");
                    ele.innerText = ".";
                }
            }
        }

    }

    start = (parent) => {
        this.handleIntro(parent);
    }

    handleSpawningMallEntrance = (parent) => {
        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");

        const intro_container = createElementWithClassAndParent("div", tick_container);
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

        const mall_entrance = new Location("Entrance", "Mall Entrance", [QUESTING, GUIDING, LONELY, this.rand.pickFrom(this.theme_keys)], 0, 0, []);
        mall_entrance.players = [...this.players];
        mall_entrance.events.push(new EscapeMall());

        for (let player of this.players) {
            player.current_location = mall_entrance; //so they aren't screaming they're in teh void
        }
        general_intro.innerHTML = `${arrayToHumanSentence(this.players.map((i) => i.nameHTML()))} enter the mall, nervous and excited about their impending adventure. <br><br>They are almost disappointed at how ... normal it seems.<br><br>Sure, it's abandoned, but other than the dust and gloom it seems like any other mall they've been to. <br><br>Surely deeper in is where the danger lurks...`;
        this.map.push([mall_entrance]);
        this.handleAddingCorridorToEastOfLocation(mall_entrance);

        this.renderMall(tick_container);

    }

    handleAddingShopToSouthOfLocation = (location, force = false) => {
        let right_row = location.row + 1;
        let right_col = location.col;
        if (this.map[right_row] && this.map[right_row][right_col]) {
            //there was a bug early on where it was spawning shops on top of each other and players were falling off the face of the map and it was scaring the shit out of me and i stayed up way too late trying to find them again
            return;
        }

        //don't have shops touching each other
        const east = getEast(this.map, right_row, right_col);
        const west = getWest(this.map, right_row, right_col);
        if ((east && east.name != CORRIDOR_NAME) || west && west.name != CORRIDOR_NAME) {
            //console.log("JR NOTE: handleAddingShopToSouthOfLocation would have a shop touching another shop", east, west)
            return;
        }

        const odds_empty = force ? 0 : 0.3;
        //console.log("JR NOTE: processing handleAddingShopToSouthOfLocation, force is", { force, odds_empty, right_col, right_row })
        //if the row doesn't even exist OR it does but theres nothing in the column
        //if down does not exist, check if its row index is the same or greater than how many rows there are
        //if so, add a new row of all undefineds to the maze
        //then, pick my index and make a new random room
        //console.warn("JR NOTE: todo pick from set of random shops with specific internalevents", location);
        const themes = [this.rand.pickFrom(location.theme_keys), this.rand.pickFrom(location.theme_keys), this.rand.pickFrom(this.theme_keys)];
        const personal_adj = pickARandomThemeFromListAndGrabKey(this.rand, themes, ADJ, true);

        const random_shop = new Location(`Shop`, `${personal_adj} Shop`, themes, right_row, right_col, []);

        if (this.map[right_row] && right_row < this.map.length && this.rand.nextDouble() > odds_empty) {
            // console.log("JR NOTE: handleAddingShopToSouthOfLocation adding a shop to an existing row")
            this.map[right_row][right_col] = random_shop;
        } else {
            if (this.rand.nextDouble() < odds_empty) {
                //console.log("JR NOTE: handleAddingShopToSouthOfLocation making a new row")
                const new_row = [];
                for (let cel of this.map[0]) {
                    new_row.push(undefined);
                }
                this.map.push(new_row);
                this.map[right_row][right_col] = random_shop;

            }
        }


    }


    //from truth sim, is called "processRight" there
    //if there is nothing to the east, make a coridor
    //always allow east movement (other directions will have rng if something is there)
    //never empty (its a mall and it goes forever)
    //stores might be up or down but right ALWAYS exists
    handleAddingCorridorToEastOfLocation = (location) => {
        let right_row = location.row;
        let right_col = location.col + 1;
        const corridor = new Location(CORRIDOR_NAME, "Mall Corridor", [this.rand.pickFrom(location.theme_keys), this.rand.pickFrom(location.theme_keys), this.rand.pickFrom(this.theme_keys)], right_row, right_col, []);

        if (!this.map[right_row][right_col]) {
            //if right does not exist, check if its col index is the same or greater than the rows length
            //if so, need to add a new "undefined" cel to the end of every row in the maze
            //then, pick my index and make a new random room
            if (right_col < this.map[right_row].length) {
                this.map[right_row][right_col] = corridor;
            } else {
                if (right_col == this.map[right_row].length) {
                    for (let row of this.map) {
                        row.push(undefined);
                    }
                    this.map[right_row][right_col] = corridor;
                }
            }
        }

    }

    handleIntro = (parent) => {
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        general_intro.innerHTML = `${this.players.length} members of the Cult of the Harvest gather outside the Westerville Mall. Though it was many years ago each had given themself over to the faith, it is only today they partake in the most sacred ritual of the cult: Delving into the Blasphemous Mall and Relclaiming the Fruit of Wisdom hoarded by the monsters within.<br><br>Should they succeed, they will be granted eldritch knowledge of loops and spirals and endless ends. <br><br>Should they fail...one way or another, they will never leave this mall again.<br><br>They are prepared for their fate, ready to join the Inner Circle of the Cult at last.`;
        const mindPlayer = getPartyHighestMind(this.players);
        const eyesPlayer = getPartyHighestEyes(this.players);
        const tonguePlayer = getPartyHighestTongue(this.players);
        const armPlayer = getPartyHighestArms(this.players);
        const legPlayer = getPartyHighestLegs(this.players);
        console.log("JR NOTE: getting the relations", { tonguePlayer })

        for (let player of this.players) {
            const ele = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            let text = "";
            if (player.leader) {
                text = `Leading the Faithful is ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            } else {
                text = `There was also ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            }

            //interests
            const backstory = pickARandomThemeFromListAndGrabKey(this.rand, player.theme_keys, GENERALBACKSTORY, false);
            const compliemnt = pickARandomThemeFromListAndGrabKey(this.rand, player.theme_keys, COMPLIMENT, false);
            const insult = pickARandomThemeFromListAndGrabKey(this.rand, player.theme_keys, INSULT, false);
            text += ` ${titleCase(insult)} but ${compliemnt}, they ${backstory}.`

            const bestStatMap = {};
            //nothing too targeted, just a little line about where their current strength lies
            bestStatMap[MIND_METAL_STAT] = ["They love thinking through a good puzzle.", "They love reading books and learning all sorts of new things.", "They're often the first to figure out a riddle."]
            bestStatMap[EYES_METAL_STAT] = ["Their eyes never miss anything.", "They love taking in color and motion and the sounds of the world around them.", "They are always the first to compliment someones new hairstyle or outfit."]
            bestStatMap[TONGUE_METAL_STAT] = ["They love rambling and talking for hours on end.", "They are a really good listener, and always have something insightful to say in return.", "Somehow, they manage to convince people to go along with all their ideas."]
            bestStatMap[ARMS_METAL_STAT] = ["There just something that appeals to them about the thrill of violence.", "They think getting to build things with your hands is one of life's simple pleasures.", "They love figuring out how to repair things themselves instead of having someone else do it."]
            bestStatMap[LEGS_METAL_STAT] = ["They are quick on their feet.", "Somehow, they never stop moving.", "They love exploring new places."]

            text += ` ${this.rand.pickFrom(bestStatMap[player.highestStat().key])}`;


            const worstStatMap = {};
            //nothing too targeted, just a little line about where their current strength lies
            worstStatMap[MIND_METAL_STAT] = ["Also, puzzles just don't interest them.", "They also find books and movies to be incredibly boring.", "They also don't get why people keep trying to complicate things, the world should be very simple."]
            worstStatMap[EYES_METAL_STAT] = ["Loud sounds also don't bother them very much.", "They also often seem to be in their own little world.", "They also love just vibing with their own thoughts."]
            worstStatMap[TONGUE_METAL_STAT] = ["They also often stumble over their own words.", "They also have trouble speaking up in groups.", "They also feel a little awkward when its their turn to speak."]
            worstStatMap[ARMS_METAL_STAT] = ["They also prefer to just go with the flow.", "They also are a very peaceful person.", "Its also just easier for them to buy something premade versus learning how to make it themselves."]
            worstStatMap[LEGS_METAL_STAT] = ["They also tend to walk at a relaxed pace.", "They also seem no rush to get anywhere.", "They're also often late to appointments."]

            text += ` ${this.rand.pickFrom(worstStatMap[player.lowestStat().key])}`;


            const roles = [];
            if (mindPlayer === player) {
                roles.push("smart")
            }

            if (eyesPlayer === player) {
                roles.push("observant")
            }

            if (tonguePlayer === player) {
                roles.push("charismatic")
            }

            if (armPlayer === player) {
                roles.push("handy")
            }

            if (legPlayer === player) {
                roles.push("fast")
            }

            text += ` They are the ${arrayToHumanSentence(roles)} one.`;

            //relationships
            const family = getFamilyOfEntity(player);
            if (family && family.length > 1) {
                text += ` ${family.map((i) => i.nameHTML()).join(", ")} are all members of their family. `;
            } else if (family && family.length === 1) {
                text += ` ${family[0].nameHTML()} is a member of their family. `;

            }

            const romanticPartners = getRomanticPartnersOfEntity(player);
            if (romanticPartners && romanticPartners.length > 1) {
                text += ` ${romanticPartners.map((i) => i.nameHTML()).join(", ")} are all members of their polycule. `;
            } else if (romanticPartners && romanticPartners.length === 1) {
                text += ` ${romanticPartners[0].nameHTML()} is their romantic partner. `;

            }

            text += `<span class='spoiler'> Mind: ${player.stats[MIND_METAL_STAT]}, Eyes: ${player.stats[EYES_METAL_STAT]}, Tongue: ${player.stats[TONGUE_METAL_STAT]} , Arms: ${player.stats[ARMS_METAL_STAT]} , Legs: ${player.stats[LEGS_METAL_STAT]} </span>`

            ele.innerHTML = text;

        }//end player loop
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
            for (let i = 0; i < 10; i++) {
                this.tick(parent);
            }
        }

        const tick_button3 = createElementWithClassAndParent("button", tick_bar, "tick-button tick-hundred-button");
        tick_button3.innerText = "Tick 100x";
        tick_button3.onclick = () => {
            for (let i = 0; i < 100; i++) {
                this.tick(parent);
            }
        }

    }
}