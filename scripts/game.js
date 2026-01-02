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
    pending_clone_players = [];//why do we need this? :) :) ;)
    //peewee devours any new looping players before they can reach the next universe (useful if you want AB's session to ACTUALLY be helpful instead of filled with fate breaking assholes)
    eatWastesAutomatically = false;
    summary;
    trickster_closer_eating_all_fruit = false; //come on did you REALLY think she's stay away from this?
    trickster_closer_repelled = false;
    fruitApocalypse = false; //srsly don't let her eat the fruit

    current_tick = 0;
    initial_player_count = 0;
    finished = false;
    //list of special events, in order (not as detailed as AB will need, maybe,but a start)
    //the generic event handles adding this, custom events don't need to worry
    //but you can also add to this so ab shows thigns that aren't TECHNICALLY events , like getting stuck in the infinite parking lot
    event_list = []; //list of strings
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
        setSpritesForParty(this.rand, this.players);//game handles this because we don't want doubles
        this.initial_player_count = this.players.length;
        for (let player of this.players) {
            this.theme_keys = this.theme_keys.concat(player.theme_keys);
        }
        //resets them for this game, yeah im mixing an object and global variables
        //so sue me
        initThemeLocations(this.rand);


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
                    if (cultist.sprite_aspect) {
                        looping_player.sprite_aspect = cultist.sprite_aspect;
                    }
                    if (cultist.sprite_class) {
                        looping_player.sprite_class = cultist.sprite_class;
                    }
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

    addGeneralEventToAllLocations = (event) => {
        for (let row of this.map) {
            for (let item of row) {
                if (item) { //its not empty space
                    item.events.unshift(event)
                }
            }
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
        if (this.fruitApocalypse) {
            for (let player of this.players) {
                player.kill("crushed to a pulp under tons upon tons of fruit."); //thems the breaks
            }
            return true;
        }
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

        //haha whoops now i'm doing it on purpose
        /*if (this.initial_player_count < this.players.length) {
            //jr note: its WAY too easy for this mall to get flooded with clones rip
            this.event_list.push("WARNING: IS THERE CLONING?")
        }*/
        if (this.isItEpilogueTime()) {
            this.finished = true;
            this.handleEpilogue(parent);
            return;
        }
        this.current_tick++;

        const locations = this.getLocations();
        for (let player of this.players) {
            if (player.marked_for_cloning) {
                this.players.push(player.clone(this.rand));
            }
        }

        if (locations.length === 0) {
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
        //console.log("JR NOTE: movement tick", this.current_tick)

        const tick_container = createElementWithClassAndParent("div", parent, "story-beat");
        const header = createElementWithClassAndParent("h2", tick_container, "story-title");
        header.innerText = `Movement ${this.current_tick}`;
        let players_moving = 0;





        //for each location
        //do interaction scene of everyone inside (if more than one)
        //and have players decide whether to move or not individually
        for (let location of locations) {
            const north = getNorth(this.map, location.row, location.col)
            const south = getSouth(this.map, location.row, location.col)
            const east = getEast(this.map, location.row, location.col)
            const west = getWest(this.map, location.row, location.col)
            //only locations with players 
            const livingPlayers = location.livingPlayers();
            if (location.river) {
                location.spreadRiver(this.rand, north, south, east, west);
            }


            if (livingPlayers.length > 0) {

                const interaction_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                const player_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                for (let player of livingPlayers) {
                    if (location.river) {
                        //you will happy to know that river infecting the mall CHEWS through ram because, i presume, i made her little goo effect jiggly
                        interaction_phrase.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/river.gif'>It's nothing personal as more and more pink goo floods into the ${location.longer_name}. It sizzles as it dissolves the ${player.corrupted ? player.mannequin_type : "flesh"} of ${player.nameHTML()}. There's no room for anything but her, here.`;
                        player.kill(`dissolved into ${player.corrupted ? player.mannequin_type : "bones"} and goo`)
                    } else {
                        players_moving++;
                        player.interactWithPlayer(location.players, interaction_phrase);
                        player.decideWhereToGo(player_phrase, this.rand, location, north, south, east, west);
                    }

                }

            }
        }

        for (let player of this.players) {
            if (!player.current_location) {
                console.log("JR NOTE: recovering a locationless player", player.name, this.current_tick)
                this.event_list.push("ERROR LOCATION")
                //just toss them in the first place we can find (proably the entrance)
                locations[0].movePlayerInto(player)
                //this happened as a bug during dev so of course i made an edge case for it, it was spooky how eventually alaya would always be alone (becaues she was less likely to go south)
                //and then of course the infinite parking garage does this to you on purpose if you die
                const start_phrase = createElementWithClassAndParent("div", tick_container, "sub-story-beat");
                start_phrase.innerHTML = `${player.nameHTML()} is nowhere and they see nothing and hear nothing not even their own screams. Suddenly they are somewhere...the ${locations[0].longer_name}? They are too rattled to care how this happened. `;

            }
        }



        //clean up, move pending players into their locations
        //can't do sooner or they might double tick
        for (let location of locations) {
            if (location.movePlayersFromPendingToInternal()) {
                if (location.isFoodCourt) {
                    //food related places have custom theme events, eventaully everything will
                    this.handleExpandingFoodCourt(location);
                } else {
                    //call add no matter what because it handles rng internally
                    this.handleAddingCorridorToEastOfLocation(location);
                    this.handleAddingShopToSouthOfLocation(location);
                }

            }
        }
        //if you weren't going to move, make sure you get rid of your pending location anyways
        for (let player of this.players) {
            player.pending_location = undefined;
        }

        //this only made sense before i made clones cannon
        /*if (this.initial_player_count < players_moving) {
            //jr note: its WAY too easy for this mall to get flooded with clones rip
            this.event_list.push("WARNING: ARE PLAYERS SIMULTANEOUSLY IN MULTIPLE LOCATIONS?")
            const errorEle = createElementWithClassAndParent("div", tick_container, "error");
            errorEle.innerHTML = "WARNING: ARE PLAYERS SIMULTANEOUSLY IN MULTIPLE LOCATIONS? " + players_moving;
        }*/
        this.renderMall(tick_container);

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

    eventTick = (parent, locations) => {
        if (this.finished) {
            return;
        }
        //console.log("JR NOTE: event tick", this.current_tick)
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
                    event_phrase.remove();
                    const ele = createElementWithClassAndParent("div", tick_container, "sub-story-beat");

                    location.renderGenericBoringNonEvent(this, this.rand, ele);
                }
            }
        }


        tick_container.scrollIntoView();
        this.renderMall(tick_container);

    }

    longestRowLength = () => {
        let ret = 0;
        for (let row of this.map) {
            if (row.length > ret) {
                ret = row.length;
            }
        }
        return ret;
    }

    renderMall = (parent) => {
        //console.log("JR NOTE: rendering mall", this.map)
        const detailSection = createElementWithClassAndParent("div", parent, 'map-details');
        detailSection.innerText = "Click On Box For Details"


        const zoomBar = createElementWithClassAndParent("div", parent, "horizontal-bar");



        const mall_container = createElementWithClassAndParent("div", parent, "mall-render");
        let zoom_level = Math.min(1, 9 / this.longestRowLength());

        addMapControls(zoom_level, zoomBar, mall_container)


        for (let row of this.map) {
            const rowEle = createElementWithClassAndParent("div", mall_container, "maze-row");
            //console.log("JR NOTE: rendering map, row is ", row)

            for (let cell of row) {
                //console.log("JR NOTE: rendering map cell is ", cell)

                if (cell) {
                    const ele = createElementWithClassAndParent("div", rowEle, "maze-cell");
                    if (cell.river) {
                        ele.classList.add("river");
                    }
                    const cached_name = cell.longer_name;
                    const cached_inhabitants = cell.players.map((p) => p.nameHTML()).join(",");
                    const cached_corpses = cell.deadPlayers().map((p) => `${p.nameHTML()}(${p.state_of_corpse})`).join(",");

                    const cached_corruption = cell.corruption;
                    const cached_events = cell.events.map((e) => e.name).join(",");
                    ele.onclick = () => {
                        document.querySelectorAll(".selected").forEach((i) => i.classList.remove("selected"));
                        ele.classList.add("selected");
                        detailSection.innerHTML = `[${cell.row},${cell.col}]
                        <br>
                        <b>Name:</b> ${cached_name}
                        <br>
                        <b>Inhabitants:</b> ${cached_inhabitants}
                        <br>
                        <b>Corpses: </b> ${cached_corpses}
                        <br>
                        <b>Corruption Level:</b> ${cached_corruption}
                        <br>
                        <b>Possible Events:</b> ${cached_events}`;
                    }
                    ele.title = `${cell.longer_name}(${cell.corruption})`;
                    if (cell.name != CORRIDOR_NAME) {
                        ele.style.backgroundColor = cell.color;
                    } else {
                        ele.classList.add("corridor")
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
                                const sprite = renderSpriteForEntity(icon, player);
                                sprite.style.transform = "scale(0.2) translate(-200%,-200%)";
                            } else if (player.dead) {
                                const sprite = renderSpriteForEntity(icon, player);
                                sprite.style.transform = "scale(0.2) translate(-200%,-200%)";
                            } else if (player.corrupted) {
                                const sprite = renderSpriteForEntity(icon, player);
                                sprite.style.transform = "scale(0.2) translate(-200%,-200%)";
                            } else {
                                const sprite = renderSpriteForEntity(icon, player);
                                sprite.style.transform = "scale(0.2) translate(-200%,-200%)";
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
        mall_entrance.events.push(escapeMall.clone());

        for (let player of this.players) {
            player.current_location = mall_entrance; //so they aren't screaming they're in teh void
        }
        general_intro.innerHTML = `${arrayToHumanSentence(this.players.map((i) => i.nameHTML()))} enter the mall, nervous and excited about their impending adventure. <br><br>They are almost disappointed at how ... normal it seems.<br><br>Sure, it's abandoned, but other than the dust and gloom it seems like any other mall they've been to. <br><br>Surely deeper in is where the danger lurks...`;
        this.map.push([mall_entrance]);
        this.handleAddingCorridorToEastOfLocation(mall_entrance);

        this.renderMall(tick_container);

    }

    //a food court surrounds itself on all sides with food locations
    //that try to rewrite to everything they touch
    //it doesn't care what themes the parent location has, picks a single random food
    handleExpandingFoodCourt = (location) => {
        const food_court_strength = 0.3; // what are the odds it overwrites a previous location?
        const handleEast = (theme_key) => {
            if (this.rand.nextDouble() > 0.75) {
                this.handleAddingCorridorToEastOfLocation(location);
                return;
            }
            let right_row = location.row;
            let right_col = location.col + 1;
            const templates = theme_locations[theme_key];
            if (!templates || templates.length === 0) {
                return;
            }
            const newLocation = this.rand.pickFrom(templates).cloneIntoLocation(right_row, right_col);
            newLocation.isFoodCourt = true;
            const existing = getEast(this.map, location.row, location.col);
            if (existing) {

                if (this.rand.nextDouble() > food_court_strength) {
                    return;
                }
                //console.log("JR NOTE: trying to spread the food court east into an existing location", { newName: newLocation.name, name: existing.name, existing })

                //its WRONG to twist space like this, the mall remembers
                newLocation.corruption += 13 + existing.corruption * 2;
                //instead of players being lost to the void they 
                //suddenly are in the new location
                newLocation.transferPlayersFrom(existing);



                this.map[right_row][right_col] = newLocation;
            } else if (!this.map[right_row][right_col]) {
                //if right does not exist, check if its col index is the same or greater than the rows length
                //if so, need to add a new "undefined" cel to the end of every row in the maze
                //then, pick my index and make a new random room
                if (right_col < this.map[right_row].length) {
                    this.map[right_row][right_col] = newLocation;
                } else {
                    if (right_col == this.map[right_row].length) {
                        for (let row of this.map) {
                            row.push(undefined);
                        }
                        this.map[right_row][right_col] = newLocation;
                    }
                }
            }
        }

        //if the food court rewrites the ENTRANCE
        //fleeing is no longer possible
        const handleWest = (theme_key) => {
            let right_row = location.row;
            let right_col = location.col - 1;
            if (right_col < 0) {
                return;
            }

            const templates = theme_locations[theme_key];
            if (!templates || templates.length === 0) {
                return;
            }
            const newLocation = this.rand.pickFrom(templates).cloneIntoLocation(right_row, right_col);
            newLocation.isFoodCourt = true;
            const existing = getWest(this.map, location.row, location.col)
            if (existing) {

                if (this.rand.nextDouble() > food_court_strength) {
                    return;
                }
                //console.log("JR NOTE: trying to spread the food court west into an existing location", { newName: newLocation.name, name: existing.name, existing })

                //its WRONG to twist space like this, the mall remembers
                newLocation.corruption += 13 + existing.corruption * 2;
                //instead of players being lost to the void they 
                //suddenly are in the new location
                newLocation.transferPlayersFrom(existing);

                this.map[right_row][right_col] = newLocation;
            } else {
                this.map[right_row][right_col] = newLocation;
            }
        }

        const handleSouth = (theme_key) => {
            if (this.rand.nextDouble() > 0.75) {
                this.handleAddingShopToSouthOfLocation(location);
                return;
            }
            let right_row = location.row + 1;
            let right_col = location.col;
            const templates = theme_locations[theme_key];
            if (!templates || templates.length === 0) {
                return;
            }
            const newLocation = this.rand.pickFrom(templates).cloneIntoLocation(right_row, right_col);
            newLocation.isFoodCourt = true;
            const existing = getSouth(this.map, location.row, location.col)
            if (existing) {

                if (this.rand.nextDouble() > food_court_strength) {
                    return;
                }
                //console.log("JR NOTE: trying to spread the food court south into an existing location", { newName: newLocation.name, name: existing.name, existing })

                //its WRONG to twist space like this, the mall remembers
                newLocation.corruption += 13 + existing.corruption * 2;
                //instead of players being lost to the void they 
                //suddenly are in the new location
                newLocation.transferPlayersFrom(existing);


                this.map[right_row][right_col] = newLocation;
            } else if (this.map[right_row] && right_row < this.map.length) {
                this.map[right_row][right_col] = newLocation;
            } else {
                const new_row = [];
                for (let cel of this.map[0]) {
                    new_row.push(undefined);
                }
                this.map.push(new_row);
                this.map[right_row][right_col] = newLocation;
            }
        }

        //if the food court rewrites the ENTRANCE
        //fleeing is no longer possible
        const handleNorth = (theme_key) => {
            let right_row = location.row - 1;
            let right_col = location.col;
            if (right_row < 0) {
                return;
            }

            const templates = theme_locations[theme_key];
            if (!templates || templates.length === 0) {
                return;
            }
            const newLocation = this.rand.pickFrom(templates).cloneIntoLocation(right_row, right_col);
            newLocation.isFoodCourt = true;
            const existing = getNorth(this.map, location.row, location.col)
            if (existing) {

                if (this.rand.nextDouble() > food_court_strength) {
                    return;
                }
                //console.log("JR NOTE: trying to spread the food court west into an existing location", { newName: newLocation.name, name: existing.name, existing })

                //its WRONG to twist space like this, the mall remembers
                newLocation.corruption += 13 + existing.corruption * 2;
                //instead of players being lost to the void they 
                //suddenly are in the new location
                newLocation.transferPlayersFrom(existing);


                this.map[right_row][right_col] = newLocation;
            } else {
                this.map[right_row][right_col] = newLocation;
            }
        }

        handleNorth(this.rand.pickFrom(food_keys))
        handleSouth(this.rand.pickFrom(food_keys))
        handleEast(this.rand.pickFrom(food_keys))
        handleWest(this.rand.pickFrom(food_keys))


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

    everythingIsGoo = (parent) => {
        let ret = true;
        for (let row of this.map) {
            for (let item of row) {
                if (item) { //its not empty space
                    if (!item.river) {
                        return false;
                    }
                }
            }
        }
        return ret;
    }

    isInfiniteFoodCourt = (parent) => {
        let ret = true;
        for (let row of this.map) {
            for (let item of row) {
                if (item) { //its not empty space
                    if (!item.isFoodCourt) {
                        return false;
                    }
                }
            }
        }
        return ret;
    }

    handleEpilogue = (parent) => {
        this.summary.finalize(this);
        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");
        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        intro_container.scrollIntoView();

        const mannequins = [];
        const corpses = [];
        const living = [];
        const wasted_corpses = [];
        const wastes = [];
        const poseAsTeam = createElementWithClassAndParent("div", intro_container, "pose-as-a-team");

        //no reason to check for the living, there should not be any tbh
        for (let player of this.players) {
            if (player.corrupted) {
                mannequins.push(player)
            }

            if (player.dead) {
                corpses.push(player);
            } else {
                living.push(player);
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
            for (let corpse of corpses) {
                const detail2 = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
                detail2.innerHTML = `${corpse.nameHTML()} is ${corpse.state_of_corpse}`;
            }
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");

            if (corpses.length === this.players.length) {
                this.summary.setEnding("Death Ending", this.current_tick);
                detail.innerHTML = `There is no one left to bury the dead.`;

            } else if (mannequins.length === living.length) {
                detail.innerHTML = `Slowly, over time, while you're not watching, the mannequins of the Westerville Mall cover the dead with fine clothing, debris and shopping bags. Their impassive faces make it impossible to tell if they are grieving, but a burial has occured. The Westerville Mall is once again ready for shoppers.`;
                this.summary.setEnding("Mannequin Burial Ending", this.current_tick);

            } else {
                detail.innerHTML = `${arrayToHumanSentence(corpses.map((i) => i.getName()))} ${corpses.length > 1 ? "are" : "is"} placed in a very nice fine clothing display and covered in 1000 thread count linens as a proxy for being buried.`;
            }
        }

        if (mannequins.length > 0) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            for (let horror of mannequins) {
                if (horror.dead) {
                    const detail2 = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
                    detail2.innerHTML = `${horror.nameHTML()} still has a flicker of awareness in their ${horror.mannequin_type} body, mangled though it is.`;

                } else {
                    const detail2 = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
                    detail2.innerHTML = `${horror.nameHTML()} has gotten used to their new body of ${horror.mannequin_type}. They settle into their new, permanent, home.`;

                }
            }
        }

        if (wastes.length > 0 && mannequins.length > 0) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `${arrayToHumanSentence(mannequins.map((i) => i.getName()))} will wander the Westerville Mall for the rest of this loop.`;
        }

        if (this.initial_player_count > this.players.length) {
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `The Westerville Mall has already forgotten any who could not handle the devotion necessary to obtain Harvest Fruit and instead fled. Not a Shopper, not a Mannequin, but an irrelevant third thing.`;

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

        if (this.fruitApocalypse) {
            this.summary.setEnding("Fruit Ending", this.current_tick);
            const detail = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
            detail.innerHTML = `The Wasted Trickster Lonesome Witch of Threaded Motivation has turned all oxygen into fruit. The entire party is crushed to death, slowly, under all that weight. They...really should not have let her eat the Harvest Fruit!`;

        }

        if (this.isInfiniteFoodCourt()) {
            this.summary.setEnding("Infinite Food Court Ending")
        }

        if (this.everythingIsGoo()) {
            this.summary.setEnding("Goo Mall Ending")
        }

        if (!this.summary.hasEnding()) {
            this.summary.setEnding("Balanced Ending", this.current_tick);
        }

        const next_section_intro = createElementWithClassAndParent("h2", intro_container, "sub-story-beat");
        next_section_intro.innerText = "Final Stats:"

        const stat_groups = createElementWithClassAndParent("div", intro_container, "epilogue-stats");


        for (let player of this.players) {
            renderSpriteForEntity(poseAsTeam, player)
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
            makePair("Fear:", player.fear)
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
        this.handleTickBar(parent);


        const intro_container = createElementWithClassAndParent("div", parent, "story-beat");


        const general_intro = createElementWithClassAndParent("p", intro_container, "sub-story-beat");
        general_intro.innerHTML = `<h2>Mall Expedition: ${this.rand.initial_seed}</h2><br><br>${this.players.length} members of the Cult of the Harvest gather outside the Westerville Mall. Though it was many years ago each had given themself over to the faith, it is only today they partake in the most sacred ritual of the cult: Delving into the Blasphemous Mall and Relclaiming the Fruit of Wisdom hoarded by the monsters within.<br><br>Should they succeed, they will be granted eldritch knowledge of loops and spirals and endless ends. <br><br>Should they fail...one way or another, they will never leave this mall again.<br><br>They are prepared for their fate, ready to join the Inner Circle of the Cult at last.`;
        const mindPlayer = getPartyHighestMind(this.players);
        const eyesPlayer = getPartyHighestEyes(this.players);
        const tonguePlayer = getPartyHighestTongue(this.players);
        const armPlayer = getPartyHighestArms(this.players);
        const legPlayer = getPartyHighestLegs(this.players);
        const poseAsTeam = createElementWithClassAndParent("div", intro_container, "pose-as-a-team");
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

                if (roles.length === 0) {
                    roles.push("normal")
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
            if (player.preparedToKillInitially()) {
                text += " They are prepared to kill to secure what is rightfully theirs. "
            }

            text += ` <span class='spoiler'> Mind: ${player.stats[MIND_METAL_STAT]}, Eyes: ${player.stats[EYES_METAL_STAT]}, Tongue: ${player.stats[TONGUE_METAL_STAT]} , Arms: ${player.stats[ARMS_METAL_STAT]} , Legs: ${player.stats[LEGS_METAL_STAT]} </span>`

            ele.innerHTML = text;
            const sprite = renderSpriteForEntity(poseAsTeam, player);
            sprite.title = player.name;

        }//end player loop
    }


    handleTickBar = (parent) => {
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

        const radio_button = createElementWithClassAndParent("button", tick_bar, "tick-button radio-button");
        radio_button.innerText = "Radio (TODO hide till first story)";
        radio_button.onclick = () => {
            handleRenderingStoryList();
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
    //https://www.youtube.com/watch?v=4t-nTKeo9Eg
    //https://www.youtube.com/watch?v=QPSejohQHYI

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


//seriously no one should let trickster closer become wasted
fruitApocalypse = () => {

}