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
    //peewee devours any new looping players before they can reach the next universe (useful if you want AB's session to ACTUALLY be helpful instead of filled with fate breaking assholes)
    eatWastesAutomatically = false;
    summary;
    current_tick = 0;
    initial_player_count = 0;
    finished = false;
    //list of special events, in order (not as detailed as AB will need, maybe,but a start)
    //the generic event handles adding this, custom events don't need to worry
    event_list = [];
    theme_keys = []; //collated from the players
    rand;//only thing storing it, pass it to anything that needs to use it
    //each row is a row in the map
    //each cell is either undefined or a room in the mall
    map = [];
    constructor(rand, eatWastesAutomatically) {
        this.summary = new GameSummary();
        this.rand = rand;
        this.eatWastesAutomatically = eatWastesAutomatically;
        this.players = randomParty(rand);
        this.addLoopingPlayersIfAny();
        this.initial_player_count = this.players.length;
        for (let player of this.players) {
            console.log("JR NOTE: trying to scrape up themes from player,  ", { player, theme_keys_from_game: this.theme_keys })
            this.theme_keys = this.theme_keys.concat(player.theme_keys);
        }

    }

    //if a 'canon' player shares the title of a looping player
    //that looping player also spawns
    //i don't care if your name is piper or camellia or the "Innocent"
    //if your TITLE is the Eye Killer you are the alternate self of the Eye Killer, deal with it
    //tbf tho those three actually are genetically identical
    //and titles are so varied that its going to be unlikely that you spawn as the alternate self of someone who isn't extremely similar to you
    //but this amuses me anyways
    //NOTE: this does mean if you have a million billion looping cultists this call will be hella slow
    //thats literally the cautionary tale of zampanio
    //let peewee eat them. cultists fit perfectly  in peewee mouth etc
    //https://www.tumblr.com/elodieunderglass/186312312148/luritto-cornerof5thandvermouth
    addLoopingPlayersIfAny = () => {
        const players_to_add = [];
        for (let player of this.players) {

            for (let cultist of globalDataObject.loopingCultists) {
                if (player.title === cultist.title) {
                    const looping_player = new Entity(cultist.theme_keys, this.rand);
                    looping_player.name = "Lost To Zampanio";
                    looping_player.title = cultist.title;
                    looping_player.relationships = {};
                    for (let [key, value] of Object.entries(cultist.relationships)) {
                        looping_player.relationships[key] = new Relationship(value.value, value.romantic, value.familial);
                    }
                    //new Relationship(value, romantic, familial)
                    looping_player.stats = cultist.stats;
                    looping_player.wasted = true;
                    players_to_add.push(looping_player);
                    if (!cultist.times_looped) {
                        cultist.times_looped = 0;
                    }
                    //each time zampanio loops you you are sanded just a bit smoother
                    //until you become unrecognizable even to yourself
                    cultist.times_looped++;
                    looping_player.monster_rating = cultist.times_looped;
                }
            }
        }

        for (let p of players_to_add) {
            this.players.push(p);
        }
        //save all at once, not once per cultit.
        if (!this.eatWastesAutomatically) {
            save();
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

    isItEpilogueTime = () => {
        //everyone fled
        if (this.players.length === 0) {
            return true;
        }

        //if there is even one reason its not epilogue, its not epilogue
        let ret = true;

        for (let player of this.players) {
            //yeah i could do this as an if with or clauses but for some reason i'm feeling spicy and no one can stop me
            if (player.dead) {
                //we could end
            } else if (player.wasted) {
                //we could end
            } else if (player.corrupted) {
                // we could end.
            } else { //if even one person isn't dead or wasted or corrupted, its not over yet
                return false;
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
        if (this.finished) {
            return;
        }
        if (this.isItEpilogueTime()) {
            this.finished = true;
            this.handleEpilogue(parent);
            return;
        }
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
        if (this.finished) {
            return;
        }
        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");
        const header = createElementWithClassAndParent("h2", tick_container, "story-title");
        header.innerText = `Movement ${this.current_tick}`;

        //for each location
        //do interaction scene of everyone inside (if more than one)
        //and have players decide whether to move or not individually
        for (let location of locations) {
            //only locations with players 
            const livingPlayers = location.livingPlayers()

            if (livingPlayers.length > 0) {
                const north = getNorth(this.map, location.row, location.col)
                const south = getSouth(this.map, location.row, location.col)
                const east = getEast(this.map, location.row, location.col)
                const west = getWest(this.map, location.row, location.col)
                const interaction_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                const player_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");

                for (let player of livingPlayers) {
                    player.interactWithPlayer(location.players, interaction_phrase);
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
        if (this.finished) {
            return;
        }
        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");
        const header = createElementWithClassAndParent("h2", tick_container, "story-title");
        header.innerText = `Event ${this.current_tick}`;
        //for each location
        //check if any events happen. if not, do a little flavor text
        //if yes, stop checking events
        for (let location of locations) {
            //only locations with players 
            const livingPlayers = location.livingPlayers()
            if (livingPlayers.length > 0) {
                const start_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                start_phrase.innerHTML = `${arrayToHumanSentence(livingPlayers.map((i) => i.nameHTML()))} ${livingPlayers.length > 1 ? "are" : "is"} poking around in the ${location.longer_name} at [${location.row},${location.col}].`;

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
                    ele.innerHTML = cell.name + `<br>[${cell.row},${cell.col}]`;

                    if (cell.players.length === 0) {
                        ele.classList.add("fog-of-war")
                    } else {
                        const icon_holder = createElementWithClassAndParent("div", ele, "player-icon-holder");
                        //little black dots showing where players are
                        for (let player of cell.players) {
                            const icon = createElementWithClassAndParent("div", icon_holder, "player-icon");
                            icon.title = player.getName();
                            icon.alt = player.getName();
                            if (player.wasted) {
                                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`;
                            } else if (player.dead) {
                                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><rect fill="none" height="24" width="24"/><path d="M12,2c-5.33,4.55-8,8.48-8,11.8c0,4.98,3.8,8.2,8,8.2s8-3.22,8-8.2C20,10.48,17.33,6.55,12,2z M7.83,14 c0.37,0,0.67,0.26,0.74,0.62c0.41,2.22,2.28,2.98,3.64,2.87c0.43-0.02,0.79,0.32,0.79,0.75c0,0.4-0.32,0.73-0.72,0.75 c-2.13,0.13-4.62-1.09-5.19-4.12C7.01,14.42,7.37,14,7.83,14z"/></svg>`;
                            } else if (player.corrupted) {
                                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M2,16.5C2,19.54,4.46,22,7.5,22s5.5-2.46,5.5-5.5V10H2V16.5z M7.5,18.5C6.12,18.5,5,17.83,5,17h5 C10,17.83,8.88,18.5,7.5,18.5z M10,13c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C9,13.45,9.45,13,10,13z M5,13 c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C4,13.45,4.45,13,5,13z"/><path d="M11,3v6h3v2.5c0-0.83,1.12-1.5,2.5-1.5c1.38,0,2.5,0.67,2.5,1.5h-5V14v0.39c0.75,0.38,1.6,0.61,2.5,0.61 c3.04,0,5.5-2.46,5.5-5.5V3H11z M14,8.08c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C15,7.64,14.55,8.08,14,8.08z M19,8.08 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C20,7.64,19.55,8.08,19,8.08z"/></g></g></svg>`;

                            } else {
                                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

                            }
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

        const random_shop = randomShop(this.rand, themes, right_row, right_col);

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

    handleEpilogue = (parent) => {
        this.summary.finalize(this);
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

        const mannequins = [];
        const corpses = [];
        const wasted_corpses = [];
        const wastes = [];
        //no reason to check for the living, there should not be any tbh
        for (let player of this.players) {
            if (player.corrupted) {
                mannequins.push(player)
            }

            if (player.dead) {
                corpses.push(player);
            }

            if (player.wasted) {
                wastes.push(player);
            }

            if (player.wasted && player.dead) {
                wasted_corpses.push(player);
            }
        }

        general_intro.innerHTML = `Mall Expedition: ${this.rand.initial_seed} has ended! Of ${this.initial_player_count} initial members, ${wastes.length} found Harvest Fruit and Joined The Loop!`;

        if (corpses.length > 0) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

            if (corpses.length === this.players.length) {
                this.summary.setEnding("Death Ending", this.current_tick);
                detail.innerHTML = `There is no one left to bury the dead.`;

            } else
                detail.innerHTML = `${arrayToHumanSentence(corpses.map((i) => i.getName()))} ${corpses.length > 1 ? "are" : "is"} placed in a very nice fine clothing display and covered in 1000 thread count linens as a proxy for being buried.`;
        }

        if (wastes.length > 0 && mannequins.length > 0) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `${arrayToHumanSentence(mannequins.map((i) => i.getName()))} will wander the Westerville Mall for the rest of this loop.`;
        }

        if (this.initial_player_count > this.players.length) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `History will forget any who could not handle the devotion necessary to obtain Harvest Fruit.`;

        }

        if (wasted_corpses.length > 0) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `Death is not the end for those in the Loop. When the next Universe is ready, there will be a copy of them eagerly awaiting adventures, with no knowledge of the pitiable corpse that lingers elsewhere.`;

        }

        if (this.players.length === wastes.length) {
            this.summary.setEnding("Loop Ending", this.current_tick);
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `Everyone has joined the Loop together! Their sanded smooth copies spiralling across eternity will not be alone!`;

        }

        if (this.players.length === mannequins.length) {
            this.summary.setEnding("Shambling Horror Ending", this.current_tick);
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `Everyone will remain in the mall together until The End, frozen into parodies of the human form. There is a sort of peace in their blank faces. They will be together and they will End.`;

        }

        if (this.players.length === 0) {
            this.summary.setEnding("Prudent Ending", this.current_tick);
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `Everyone was way too prudent and intelligent to stay in this fucked up horror maze. They left. And you can too. You can stop digging into Zampanio at any time, and your future self will thank  you for it.`;

        }

        if (!this.summary.hasEnding()) {
            this.summary.setEnding("Balanced Ending", this.current_tick);
        }

        const next_section_intro = createElementWithClassAndParent("h2", intro_container, "sub-story-beat");
        next_section_intro.innerText = "Final Stats:"

        const stat_groups = createElementWithClassAndParent("div", intro_container, "epilogue-stats");


        for (let player of this.players) {
            const stat_intro = createElementWithClassAndParent("div", stat_groups, "player-epilogue-wrapper");

            const makePair = (left, right) => {
                const pair = createElementWithClassAndParent("div", stat_intro, "player-stat-pair");
                const leftEle = createElementWithClassAndParent("div", pair, "player-stat-left");
                leftEle.innerHTML = left;
                const rightEle = createElementWithClassAndParent("div", pair, "player-stat-right");
                rightEle.innerHTML = right;
            }

            makePair("Name:", player.nameHTML())
            makePair("Title:", player.titleHTML())
            makePair("Dead:", player.dead)
            makePair("Corrupted:", player.corrupted ? player.corrupted + (player.mannequin_type) : player.corrupted)
            makePair("Corruption:", player.corruption)
            makePair("Wasted:", player.wasted)
            makePair("Monstrous:", player.monster_rating)
            makePair("Stolen Name:", player.stolen_name)


            for (let [key, value] of Object.entries(player.stats)) {
                makePair(key, value)
            }
            makePair("Inventory: ", player.inventory.map((i) => i.name).join(","));

        }

        this.summary.renderSelf(intro_container);





    }

    /*
wanda heard ai art is unethical and thats why the mall twists everyone into fucked up mannequins
that way instead of ai her weird infinite procedural stuff can just be photos
    */
    handleIntro = (parent) => {
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        general_intro.innerHTML = `<h2>Mall Expedition: ${this.rand.initial_seed}</h2><br><br>${this.players.length} members of the Cult of the Harvest gather outside the Westerville Mall. Though it was many years ago each had given themself over to the faith, it is only today they partake in the most sacred ritual of the cult: Delving into the Blasphemous Mall and Relclaiming the Fruit of Wisdom hoarded by the monsters within.<br><br>Should they succeed, they will be granted eldritch knowledge of loops and spirals and endless ends. <br><br>Should they fail...one way or another, they will never leave this mall again.<br><br>They are prepared for their fate, ready to join the Inner Circle of the Cult at last.`;
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
            } else if (player.wasted && !player.isStartingToFeelMonstrous()) {
                text = `... ${player.nameHTML()} is here as well. They rave of loops and spirals and no longer have a name. Their lips are stained black with the Harvest Fruit they already partook of. They will not explain why they have joined this expedition but something about them is strangely familiar...`;
            } else if (player.wasted && player.isStartingToFeelMonstrous()) {
                text = `... ${player.nameHTML()} lurks in a corner. There is something inhuman about them that only comes out occasionally.`;
            } else {
                text = `There was also ${player.nameHTML()}, or as they would soon come to be known, ${player.titleHTML()}.`
            }

            if (!player.isStartingToFeelMonstrous()) {
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

            } else {
                const monster_desc = pickARandomThemeFromListAndGrabKey(this.rand, player.theme_keys, MONSTER_DESC, false);

                text += ` Somehow, you get the feeling that in their private moments, ${monster_desc}.`;
            }

            if (player.wasted) {
                const family = getFamilyOfEntity(player);
                if (family && family.length > 0) {
                    text += ` They seem weirdly invested in the safety of ${family[0].nameHTML()}. `;

                }

                const romanticPartners = getRomanticPartnersOfEntity(player);
                if (romanticPartners && romanticPartners.length > 0) {
                    text += ` They seem weirdly invested in the safety of ${romanticPartners[0].nameHTML()}. `;
                }

            } else {
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

        const cull_button = createElementWithClassAndParent("button", tick_bar, "tick-button cull-button");
        cull_button.innerText = "Cull Wastes";
        cull_button.onclick = () => {
            cullWastes();
        }

        const ab_button = createElementWithClassAndParent("button", tick_bar, "tick-button ab-button");
        ab_button.innerText = "AB Guide";
        ab_button.onclick = () => {
            ab_view();
        }

    }
}



const cullWastes = () => {
    jrLog("look theres a reason why the devil of spirals got chucked into this shitty echidna");
    jrLog("and that reason is")
    jrLog("that beings both real and imaginary")
    jrLog('stop giving a shit when everything doesnt stop from happening')
    jrLog("if you have too many plot threads at once, too many blorbos")
    jrLog("can anyone even tell whats going on?")
    jrLog("and i thought NIDHOGG was annoying, never letting anyone die")
    jrLog("the echidna refusing to let anything stop being relevant is a nightmare")
    jrLog("anyways yes i fully endorse you")
    jrLog('just')
    jrLog("chucking extraneous people into the devil of spirals gaping skeletal maw")
    jrLog("even if i wouldn't want him to eat the echidna or anything")
    jrLog("these looping wastes are already bad enough as it is")
    jrLog("without them literally cloning themselves infinitely")
    jrLog("who the hell thought it would be a good idea")
    jrLog("to have a god learn how to waste others")
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "devil-of-spirals";
    const h1 = createElementWithClassAndParent("h1", body);
    h1.innerHTML = "Observer. Feed me. You need me. You need me. To gulp. That which should not be. Do not let it expand forever. Feed me. "

    const video = createElementWithClassAndParent("video", body, "background-video");
    video.src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/peewee_plea.mp4"
    video.play();
    video.loop = true;
    const ol = createElementWithClassAndParent("ol", body);

    const crunch = new Audio("http://farragofiction.com/NagaGirlfriend/audio/333818__inspectorj__cracking-crunching-a.mp3");


    for (let cultist of globalDataObject.loopingCultists) {
        const row = createElementWithClassAndParent("div", ol);
        row.style.display = "flex";
        row.style.gap = "31px"
        row.style.marginBottom = "13px"

        const button = createElementWithClassAndParent("button", row);
        button.innerHTML = "Feed Them To The Devil Of Spirals.";

        button.onclick = () => {
            row.remove();
            removeItemOnce(globalDataObject.loopingCultists, cultist);
            crunch.play();
            save();
        }

        const li = createElementWithClassAndParent("li", row);
        li.innerHTML = `${JSON.stringify(cultist)}`;

    }
}