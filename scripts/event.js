/*
Every event knows if its been triggered and knows how to apply its results (just like sburbsim scenes)

some events are owned by specific locations (and can only trigger inside them) some are general purpose and any location can see if it triggers
*/

//some events should embed videos to play
//or pics of the blorbos

const DEFAULT_CHOSEN_EVENT_NAME = "Events With Branching Paths Will Set This";

//had to refactor to stop using sublasses for this one
//every time i do subclasses in javascript i regret it
const makeEventSubType = (name, internalConditionCheck, applyResult) => {
    const ret = new Event();
    ret.name = name;
    ret.internalConditionCheck = internalConditionCheck;
    ret.applyResult = applyResult;
    return ret;
}


class Event {

    name = "Default Event";
    chosen_name = DEFAULT_CHOSEN_EVENT_NAME;

    clone = () => {
        return makeEventSubType(this.name, this.internalConditionCheck, this.applyResult);
    }

    //sub classes will override this, that way checkconditions can be kept in this class unchanged
    internalConditionCheck = (game, location) => {
        return false;
    }

    /*
        a location knows who is inside it and what flags have been set on it
        thats all an event needs to know to trigger or not

        if it IS triggered, it will call applyResult with the location and the parent to render to
        and return true, otherwise it will return false;

        do not make it async , please its a nightmare
    */
    checkConditions = (game, location, parentEle) => {
        //clear out any previous name
        this.chosen_name = this.name;
        if (this.internalConditionCheck(game, location)) {
            this.applyResult(game, location, parentEle, this);
            if (this.chosen_name.includes("Shopping") && !this.chosen_name.includes("Harvest")) {
                //please stop the shopping spam :( :( :(
            } else {
                game.event_list.push(this.chosen_name);//help AB a little

            }

            return true;
        }
        return false;
    }

    //because otherwise cloning breaks
    //no event can effect more than one location at a time. 
    //though i suppose you can reach outside players through the relationship they have with those inside
    //actually the horror writes itself
    //actually no i need game for changing things, nvm
    //instances will override this, that way checkconditions can be kept in this class unchanged
    applyResult = (game, location, parent, me) => {
        const ele = createElementWithClassAndParent("div", parent);
        ele.innerText = "JR NOTE: whoops looks like i forgot to override the result for this event of: " + name;

    }
}
//the rememberist made this: https://www.youtube.com/playlist?list=PL2wuGklhkS7AQ_BOALQ8g_z-NkA5Jhleb
//and this https://ellienamored.neocities.org/expeditionzampanio
//the archiving watcher of threads made this: https://mircuskasarok.neocities.org/



/*
    attach this to any mall entrance to give players a chance to escape
    thought they only instinctively move towards the entrace at the top left when they're panicking

    this is the first event im creating so hopefully i figure it out okay
*/


////////////////////////////////////////////////////////////////////////////
//this always goes well when it happens in movies
//hey gang lets split the party because of petty infighting while we're in a fucked up and dangerous place :) :) :)
const dramaticStormOffinternalConditionCheck = (game, location) => {
    if (location.infinite && game.rand.nextDouble() > 0.05) {
        /*as funny as this is, PLEASE stop getting so annoyed with your friends you just
        no clip through the inescapable torture parking lot
        okay fine you can have a SMALL chance of angry stomping out of the infinite torture dungeon
        */
        return false;
    }
    for (let player of location.livingPlayers()) {
        for (let other_player of location.livingPlayers()) {
            if (player != other_player) {
                if (player.doYouHateThisPerson(other_player)) {
                    return game.rand.nextDouble() > 0.75; //at least one
                }
            }

        }
    }
    return false;
}

const dramaticStormOffapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const dramaPairs = [];
    for (let player of location.livingPlayers()) {
        for (let other_player of location.livingPlayers()) {
            if (player != other_player) {
                if (player.doYouHateThisPerson(other_player)) {
                    dramaPairs.push([player, other_player]);
                }
            }

        }
    }
    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
    const north = getNorth(game.map, location.row, location.col)
    const south = getSouth(game.map, location.row, location.col)
    const east = getEast(game.map, location.row, location.col)
    const west = getWest(game.map, location.row, location.col)
    const options = [];

    if (north) {
        options.push(north)
    }

    if (south) {
        options.push(south)
    }

    if (east) {
        options.push(east)
    }

    if (west) {
        options.push(west)
    }

    if (options.length === 0) {
        //im having fun
        ele.innerHTML = `Why is there no exit? Why is there no exit? Why is there no exit? Why is there no exit? Why is there no exit? Why is there no exit? Why is there no exit? Why is there no exit? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT? WHY IS THERE NO EXIT?WHY WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT?WHY IS THERE NO EXIT???????????????????????????????????????`;
    }

    for (let pair of dramaPairs) {
        const leaving = pair[0];
        const target = pair[1];
        const chosen = game.rand.pickFrom(options);
        chosen.movePlayerInto(leaving);
        leaving.changeRelationshipWithPlayerBy(-13)
        target.changeRelationshipWithPlayerBy(-13);
        const explanation = createElementWithClassAndParent("div", cont, "sub-story-beat");
        explanation.innerHTML = `${leaving.nameHTML()} has had enough of ${target.nameHTML()}'s bullshit. They storm off to the ${chosen.longer_name} without any real plan.`;

    }


}

const dramaticStormOff = makeEventSubType("Dramatic Storm Off", dramaticStormOffinternalConditionCheck, dramaticStormOffapplyResult)

/////////////////



////////////////////////////////////////////////////////////////////////////
const ethicallyLootCorpseinternalConditionCheck = (game, location) => {
    //is there a corpse anywhere in the game with items
    //is there a mannequin anywhere in the game with items
    //cool, who even cares about what locations are
    //all that matters is there are items that are technically not "owned"
    //the Westerville Mall wants potential shoppers to have them
    if (game.rand.nextDouble > 0.99) {
        return false;
    }

    let inventory_items_available = false;
    let mannequins_available = false; //the westerville mall knows, mannequins are for showing off products
    for (let player of game.players) {
        if (player.dead && player.inventory.length > 0) {
            inventory_items_available = true;
        }

        if (player.corrupted) {
            mannequins_available = true;
            if (player.inventory.length > 0) {
                inventory_items_available = true;
            }
        }
    }

    return inventory_items_available && mannequins_available && location.livingNonMannequinPlayers().length > 0;
}

const ethicallyLootCorpseapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //everyone ready to leave can leave together
    const free_items = [];
    //a random mannequin will be gifted all possible items that are unowned
    //and will offer one to a player, ominously
    let possible_mannequins = [];
    let censored_beasts = [];

    //don't call remove function in entity, this is meant to happen secretly
    for (let player of game.players) {
        const inventory = [...player.inventory]

        if (player.dead && player.inventory.length > 0) {
            for (let item of inventory) {
                if (!item.name.includes("Bloody")) {
                    item.name = `Bloody ${item.name}`;
                }
                removeItemOnce(player.inventory, item);
                free_items.push(item);
            }
        }

        if (player.censored) {
            censored_beasts.push(player)
        }

        if (player.corrupted) {
            possible_mannequins.push(player);
            if (player.inventory.length > 0) {
                for (let item of inventory) {
                    removeItemOnce(player.inventory, item);
                    free_items.push(item);
                }
            }
        }
    }
    const chosen_emmisary = game.rand.pickFrom(possible_mannequins);
    //random chance the mannequin messily devours any harvest fruit rather than showcase it like a good construct
    if (game.rand.nextDouble() > 0.5) {
        const item_ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        /*
good news
the cultists have found a counter for the End
if they get themselves turned into mannequins first
she won't be pulled to stab them
and if the mall asks them to showcase harvest fruit
they can turn into this horrible half looping thing
and then NEXT loop
they respawn as a human again
        */
        for (let item of free_items) {
            chosen_emmisary.addItemToInventory(game, item, item_ele, true)
        }
    } else {
        chosen_emmisary.inventory = [...free_items]

    }

    let chosen_item = game.rand.pickFrom(chosen_emmisary.inventory);
    if (!chosen_item) { //somehow ab didn't encounter this scenario for months, don't know how she didn't crash sooner
        chosen_item = new Item("Perfectly Generic Object", "You can't find the words to describe it...")
    }
    const players = location.livingNonMannequinPlayers();
    let waste;
    for (let player of players) {
        if (player.wasted) {
            waste = player;
        }
    }

    if (waste) {
        /*
        wastes can read the code and they know that you can't tell the difference between a [CENSORED] mannequin offering a product and a regular one

        */
        me.chosen_name = "Mannequin Product Feared"
        ele.innerHTML = `${waste.nameHTML()} absolutely does not let anyone even get NEAR the ${chosen_emmisary.mannequin_type} form of ${chosen_emmisary.nameHTML()}, frozen into place with an outstretched hand offering one ${chosen_item.name} When pressed, they mutter something about the code, and the horrifying secrets within.`;
        return;
    }

    /*
    just reading the session, you'll never know that this started out as  a regular mannequin offering a product 
    and then it goes terribly wrong if you get too close (ignoring it or NOT)
    but i wanted to make sure wastes knew
    i think wastes should always be more scared of mannequin events like this than regular players
    */
    if (censored_beasts.length > 0) {
        me.chosen_name = "???"
        //living, dead, mannequin...it doesn't matter
        const players = [...location.players];
        for (let player of players) {
            if (player.censored) {
                //skip, no infighting, children
            } else {
                player.kill("[REDACTED].")
                //its important we all know they die before whatever makes them never have been here.
                //important for our peace of mind
                //it might not be true
                //but my simulation
                //my rules
                //i want to imagine they die
                //before whatever it is
                //happens
                removeItemOnce(location.players, player);
                removeItemOnce(game.players, player);
            }
        }
        const spawn = new Entity([CENSORSHIP, DECAY], game.rand);
        spawn.name = "[CENSORED]";
        spawn.censored = true; // impossible trait they now have
        this.monster_rating++;
        spawn.corrupted = true; // they move like a mannequin
        spawn.mannequin_type = "[CENSORED]"
        spawn.fear = 800815;
        spawn.fuckingHATEEveryoneInList(game.players);
        location.movePlayerInto(spawn);
        game.players.push(spawn);
        generalEvents.unshift(censoredKill);//new places will be haunted by the censored beasts
        location.events.unshift(censoredKill); //this place will be haunted
        game.addGeneralEventToAllLocations(censoredKill); //add it everywhere as well

        ele.innerHTML = censorRandomWords(`Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood.`);
        return;
    }




    const eyes = getPartyHighestEyes(players)
    const arms = getPartyHighestArms(players)
    //console.log("JR NOTE: players, eyes", players, eyes)
    const mannequin_graphic = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/helpful_friend.gif'>`;
    //you need to at least be somewhat obesrvant to spot the crack in the wall and hear the sounds
    //if parker is too common, just up the stat gate


    if (eyes && eyes.stats[EYES_METAL_STAT] < MEDIUM_STAT_VALUE) {
        me.chosen_name = "Mannequin Product Ignored"
        ele.innerHTML = `${eyes.nameHTML()} walks right past the ${chosen_emmisary.mannequin_type} form of ${chosen_emmisary.nameHTML()}, frozen into place with an outstretched hand offering one ${chosen_item.name} without even realizing it. Apparently in a mall, mannequins simply fade into the background. <br>${mannequin_graphic}`;
        return;
    } else if (eyes) {
        ele.innerHTML = `${eyes.nameHTML()} spots the  ${chosen_emmisary.mannequin_type} form of ${chosen_emmisary.nameHTML()}, frozen into place with an outstretched hand offering one ${chosen_item.name}. ${chosen_item.description} <br><br>${mannequin_graphic}<br>`;
        //arms is not exactly courage, but a preference for action over inaction. of COURSE you pick up the spooky item, why wouldn't you?
        if (arms && arms.stats[ARMS_METAL_STAT] > MEDIUM_STAT_VALUE) {
            ele.innerHTML += `${arms.nameHTML()} confidently walks up to it and picks it up.`;
            const ele2 = createElementWithClassAndParent("div", cont, "sub-story-beat");
            const ele3 = createElementWithClassAndParent("div", cont, "sub-story-beat");

            chosen_item.description += " A mannequin had this."

            chosen_emmisary.removeItemFromInventory(chosen_item, ele2)
            arms.addItemToInventory(game, chosen_item, ele3);
            arms.addCorruption(-113 + -1 * location.corruption);//you were so brave and such a good shopper for picking out a highlighted item


        } else {
            if (players.length > 1) {
                ele.innerHTML += `Everyone stares at the object...held in the hand of their... presumably dead once companion. No one says anything, and eventually, as if by consensus, they all move on. Nothing good can come from interacting with this. Nothing.`;

            } else {
                ele.innerHTML += `${eyes.nameHTML()} stares at the object...held in the hand of their... presumably dead once companion. Eventually, they move on. Nothing good can come from interacting with this horror. Nothing.`;

            }

        }


    } else {
        ele.innerHTML += "Are there no players here?"
    }


}

const ethicallyLootCorpse = makeEventSubType("Mannequin Highlight Product", ethicallyLootCorpseinternalConditionCheck, ethicallyLootCorpseapplyResult)


/////////////////////////

////////////////////////////////////////////////////////////////////////////
//is there at least one person ready to escape?
const escapeMallinternalConditionCheck = (game, location) => {
    for (let player of location.livingPlayers()) {

        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            return true;
        }
    }
    return false;
}

const escapeMallapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //everyone ready to leave can leave together
    const leaving = [];
    let corpses = [];
    let living = [];
    for (let player of location.players) {
        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            leaving.push(player);
            if (player.dead) {
                corpses.push(player);
            } else {
                living.push(player)
            }
            removeItemOnce(location.players, player);
            removeItemOnce(game.players, player);
        }
    }
    if (corpses.length === 0) {
        ele.innerHTML = `${arrayToHumanSentence(leaving.map((n) => n.nameHTML()))} ${leaving.length > 1 ? "leave" : "leaves"} the mall, finally free of this nightmare. No amount of knowledge and power is worth the changes they could feel creeping into their ${leaving.length > 1 ? "bodies" : "body"}.`;
    } else {
        ele.innerHTML = `${arrayToHumanSentence(living.map((n) => n.nameHTML()))} ${living.length > 1 ? "drag" : "drags"} ${arrayToHumanSentence(corpses.map((n) => n.nameHTML()))} out of the mall, tears streaking down their dust and blood caked cheeks.  No one should have their final resting place be here. Finally, finally they are free of this nightmare. `;
    }

}

const escapeMall = makeEventSubType("Escape Mall", escapeMallinternalConditionCheck, escapeMallapplyResult)

////////////////////////////////////////////////////////////////////////////


/*
there SHOULD be an escape here
its the place they entered from
whats going on?
*/

//is there at least one person ready to escape?
noWayOutinternalConditionCheck = (game, location) => {
    if (location.row !== 0 || location.col !== 0) {
        return false;
    }
    const hasEscape = location.events.filter((e) => e.name == "Escape Mall").length > 0

    if (!hasEscape) {
        for (let player of location.players) {
            if (player.isStartingToFeelCorruption() && !player.corrupted) {
                return true;
            }
        }
    }
    return false;
}

noWayOutapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //everyone ready to leave can leave together
    const leaving = [];
    for (let player of location.players) {
        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            leaving.push(player);
            location.corruption += 13; //your perception of there being something wrong twists the space. the mall thinks you must be wrong. SHOPPERS understand how to leave malls. only mannequins don't know how to. so you must be a mannequin, right?
            player.addCorruption(13); //just in case its somehow not very corrupt
            player.addCorruption(location.corruption);

        }
    }
    ele.innerHTML = `${arrayToHumanSentence(leaving.map((n) => n.nameHTML()))} ${leaving.length > 1 ? "are" : "is"} desperately searching for a way to leave the mall. No amount of knowledge and power is worth the changes they could feel creeping into their ${leaving.length > 1 ? "bodies" : "body"}, getting worse every minute.`;

}


const noWayOut = makeEventSubType("No Way Out", noWayOutinternalConditionCheck, noWayOutapplyResult)

////////////////////////////////////////////////////////////////////////////////////////


//https://lostinzampanio.neocities.org/fanfictions/were_you_just_a_satellite




//no skill, no stats, just an incredibly rare chance to just, stumble on it
//because the mall WANTS you to find the goods you're looking for and take them back out
//its blood moving through arteries
//it craves it
//poor training team, trying to contain things inside an abnormality was such a bad idea
//but they have no choice
//zampanio associates them with the mall now
//they're lucky they can even leave it for short durations

//is there at least one person ready to shop?
//technically there just has to be a human present
//but a mannequin can steal your item
randomlyFindShoppingObjectinternalConditionCheck = (game, location) => {
    if (location.livingNonMannequinPlayers().length > 0) {
        return game.rand.nextDouble() < 0.75;
    }
    return false;

}

//https://www.twitch.tv/directory/category/zampaniosimulator/videos/all
randomlyFindShoppingObjectapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");


    //yes even if the mall was trying to give a human something
    //a mannequin can take it
    const shopper = game.rand.pickFrom(location.livingPlayers());
    //you need to have maxed out at least one stat to get a harvest fruit
    //you can't just derp into one ten seconds in
    const shopper_highest_stat = shopper.highestStat();
    let wasted_knowledge = `<span class="wasted-knowledge">The Westerville Mall knows there are two types of things that look like humans. Shoppers move around and take items out of the mall and are happy and festive. Mannequins never leave the mall and are constantly screaming inside. If you fail to leave the mall soon enough, or if you are too scared, the Mall will assume you are a mannequin. Thems the breaks.</span>`;


    shopper.addCorruption(-13 + + -1 * location.corruption);//congrats, shoppers aren't mannequins!
    const formerNameHTML = shopper.nameHTML();
    const personal_adj = game.corporateMandatedLove ? game.rand.pickFrom(["Heart-Shaped", "Love-Filled", "Valentine's", "Romantic", "Lovey", "Sweet-Heart", "Engagement", "Wedding"]) : pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, ADJ, true);

    if (game.rand.nextDouble() > 0.95) {
        /*
        I wanna show off this physical book KR made, then my nesting partner 3d scanned and I turned into a gif

        */
        const item = new Item(`${personal_adj} Harvest Book`, `It's a Sacred Harvest Book! Reading this will cause anyone to find solace in their faith, and become just a little more resolute in their desire to Shop for and Purchase a Harvest Fruit!`)
        me.chosen_name = "Harvest Book Shopped!"
        shopper.fear = 0;
        shopper.corruption = 0;
        ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper!
        <br><br>
        They eagerly purchase the ${item.name} they see on sale.
        <br><br>No price is too much for the solace of the holy knowledge!
        <br><br>
        <img style='background: linear-gradient(45deg, black, gray); border: 3px inset black; border-radius: 13px;' src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/harvest_closed.gif'>`;
        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");

        shopper.addItemToInventory(game, item, pickupEle);
        return;

    }
    const object = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, OBJECT, true);

    const oddsFruit = 0.15;
    if (shopper_highest_stat.value > VERY_HIGH_STAT_VALUE && game.rand.nextDouble() < oddsFruit) {
        me.chosen_name = "Harvest Fruit Shopped!"
        const item = new Item(`${personal_adj} Harvest Fruit`, `It's a Sacred Harvest Fruit! Eating this will cause anyone to Join the Loop and learn the Secrets Under Pinning Reality. (JR NOTE: lulz they'll become wasted just like me and the blorbos)`)

        if (game.trickster_closer_eating_all_fruit) {
            wasted_knowledge = `<span class="wasted-knowledge">Trickster Closer has devoured whole universes of fruit, did you really think you could stop her from eating just one mall, infinite though it is?</span>`
            ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper!
                <br><br>
                <img src='http://farragofiction.com/ZampanioHotlink/trickster_closer_transparency.gif'>
                 With a wet squelch a being of rainbow static messily devours the ${item.name} before ${shopper.nameHTML()} can get to it.
                 <br><br>
                 "Thems the breaks" she says, between dripping bites. 
<br><br>
"And you have to concede that it is far, far better for me to eat this, what was it, 'Harvest Fruit" rather than actual children, don't you?"
<br><br>
There is a pause as she licks all the indeterminate staticky parts that got sticky with juice.
<br><br>
The pause extends.
<br><br>
"Ah."
<br><br>
She says.
<br><br>
"Ah."
<br><br>
There is a long, staticky sound as she slowly breathes out.
<br><br>
"Is this what it is like all the time for my dearest flouriste? To have so much power? "
<br><br>
"I. I suppose then that it is time I began my true purpose. What use have I for restraint!"
<br><br>
And then ${shopper.nameHTML()} begins to be crushed under the weight of hundreds of thousands of fruit, shoved and pulped and crushed as they fill every millimeter of space in the mall.
`;
            me.chosen_name = "Wasted Trickster Closer Apocalypse"
            game.fruitApocalypse = true;
            return;
        }
        let flavor = `They cannot believe their luck when they stumble upon a ${item.name}!`;

        if (shopper.corrupted) {
            flavor = `Nothing as mundane as a mouth yawns open across the blank ${shopper.mannequin_type} expanse of their face,  stretching impossibly wide over a single ${item.name} they happened to fall onto.`;
        } else if (shopper_highest_stat.key === MIND_METAL_STAT) {
            flavor = `They finally put the pieces together and solve the Riddle of the Mall, revealing a single ${item.name} nestled in a seemingly empty locker.`;
        } else if (shopper_highest_stat.key === EYES_METAL_STAT) {
            flavor = `Their keen eyes almost miss spotting the ${item.name} nestled in a seemingly empty shadowed corner.`;
        } else if (shopper_highest_stat.key === TONGUE_METAL_STAT) {
            flavor = `The information they had is good:, right where their contact said it would be, a single ${item.name}. `;
        } else if (shopper_highest_stat.key === ARMS_METAL_STAT) {
            flavor = `Their constant digging through trash, debris, abandoned merchandise has finally paid off! There, half buried under a shopping bag is, a single ${item.name}!`;
        } else if (shopper_highest_stat.key === EYES_METAL_STAT) {
            flavor = `Their legs pound the tile of the mall frantically, searching, pacing back and forth and back and forth until they finally...yes! There! They almost stumble over the ${item.name}, carelessly strewn in the less traveled path.`;
        }
        ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper! ${flavor}`;

        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
        shopper.addItemToInventory(game, item, pickupEle);
    } else {
        const item = new Item(`${personal_adj} ${object}`, `${shopper.nameHTML()} found this in the ${location.longer_name}!`, false)

        ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper! They stumble upon a ${item.name} at too good a deal to turn down (its a free gift!).  `;
        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
        shopper.addItemToInventory(game, item, pickupEle);

    }
    ele.innerHTML += wasted_knowledge;

}

const randomlyFindShoppingObject = makeEventSubType("Shopping Time!", randomlyFindShoppingObjectinternalConditionCheck, randomlyFindShoppingObjectapplyResult)







//is there at least one person ready to escape?
corruptionEventinternalConditionCheck = (game, location) => {
    for (let player of location.players) {
        if (player.hasHitMaxCorruption() && !player.corrupted) {
            return true;
        }
    }
    return false;

}

//fun fact
//im deeply unsettled by mannequins
//have been since i was a kid
corruptionEventapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
    const extantMannequins = location.livingMannequinPlayers();
    const redPaste = game.rand.pickFrom(location.players);

    const formerNameHTML = redPaste.nameHTML();
    redPaste.becomeCorrupted(game.rand);

    let reaction = "";
    const humans = location.livingNonMannequinPlayers();


    for (let human of humans) {
        human.fear += 13; //this is not good
        human.addCorruption(13 + location.corruption); //shoppers shouldn't be scared inside malls, are you SURE you're a shopper?

    }
    const mannequins = location.livingMannequinPlayers();

    if (humans.length > 0) {
        reaction += `${arrayToHumanSentence(humans.map((n) => n.nameHTML()))} boggle vacantly. ${formerNameHTML} was ...meat just now...just...just a second ago. Weren't...weren't they? How...how are they ${redPaste.mannequin_type}? Are...did...are they dead?`;
    }
    if (extantMannequins.length > 0) {
        reaction += `${arrayToHumanSentence(mannequins.map((n) => n.nameHTML()))} twitches ever so slightly, blank face${mannequins.length > 0 ? "s" : ""} welcoming their new kin.`;
    }
    const wasted_knowledge = `<span class="wasted-knowledge">The Westerville Mall knows there are two types of things that look like humans. Shoppers move around and take items  out of the mall and are happy and festive. Mannequins never leave the mall and are constantly screaming inside. If you fail to leave the mall soon enough, or if you are too scared, the Mall will assume you are a mannequin. Thems the breaks.</span>`;
    const monster_desc = pickARandomThemeFromListAndGrabKey(game.rand, redPaste.theme_keys, MONSTER_DESC, false);

    ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/mannequin_hand.gif'>${formerNameHTML} falls to the floor, dripping a thick, viscous black fluid from every orifice. They scream and scream as their eyes seal over with ${redPaste.mannequin_type} and their limbs stiffen into ball joints and finally as their throat slowly becomes nothing but innert ${redPaste.mannequin_type} their screams strangle into nothing. Their new body, ${monster_desc}.  ${wasted_knowledge} ${reaction}`;

}

const corruptionEvent = makeEventSubType("Become A Mannequin", corruptionEventinternalConditionCheck, corruptionEventapplyResult);

//////////////////////////////////////////////////////

//is there at least one person ready to escape?
yongkiKillinternalConditionCheck = (game, location) => {
    //you can't predict yongki, you can't stop him
    //even he can't predict or stop himself
    //a stranger even to himself
    if (location.livingPlayers().length > 0) {
        return game.rand.nextDouble() < 0.01;
    }
    return false;

}

/* the former captain of the info team and yongki are trying to figure out how to NOT kill people with their inhuman strength
the cultists are rare humans its okay to kill, so they're practice
plus captain likes Doing His Duty
and Yongki likes how nice and viscous blood feels 
*/
yongkiKillapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const redPaste = game.rand.pickFrom(location.players);

    const formerNameHTML = redPaste.nameHTML();
    //yeah sure why not, he can kill mannequins (but not corpses)
    if (redPaste.corrupted) {
        me.chosen_name = "Yongki Kill Mannequin!"

        redPaste.kill(`mangled, shards of ${redPaste.mannequin_type} on the ground, barely recognizable as ${redPaste.nameHTML()} except for scraps of clothing`);

    } else {
        redPaste.kill(`mangled, a bloody smear on the ground, barely recognizable as ${redPaste.nameHTML()} except for scraps of clothing`);
    }
    let reaction = "";
    const humans = location.livingNonMannequinPlayers();

    for (let human of humans) {
        human.fear += 13; //this is not good
    }
    const mannequins = location.livingMannequinPlayers();

    if (humans.length > 0) {
        reaction += `${arrayToHumanSentence(humans.map((n) => n.nameHTML()))} boggle vacantly. ${formerNameHTML} was alive just now...just...just a second ago. Weren't...weren't they?`;
    }
    if (location.livingMannequinPlayers().length > 0) {
        reaction += `${arrayToHumanSentence(mannequins.map((n) => n.nameHTML()))} twitches ever so slightly, blank face${mannequins.length > 0 ? "s" : ""} taking in the carnage.`;
    }

    ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/hand_twirl_yongki-moshed-12-09-23-16-56-176.gif'>${formerNameHTML} encounters...<i>something</i>. A blur. A hand. They are a ${redPaste.corrupted ? `pile of shattered ${redPaste.mannequin_type}` : "red smear"} on the ground of the ${location.longer_name} now, in the blink of an eye.<span class="wasted-knowledge">Yongki didn't mean to do it. Humans are so fragile. He only meant to say 'hello'.</span> ${reaction}`;

}

/*
IC NOTE: (on witherby)
on the all in all, with the cultists, he would simultaneously enjoy, detest, and fear his own feelings on the matter
feeling fed feels very good actually. a million hail marys.

1) i need to help get rid of these cultists
2) i can't do my usual means, unless i want to burn out from trying to youtube pipeline one million cultists for 50 years
3) it is objectively at that point, best to exploit their vulnerable sensibilities to being in a group as cultists
4) actually, it feels really good to indulge. i like them when they fear me. i should feed more
5) oh god, what the fuck am i thinking. these are still people. this is a sin
6) that's gross. i'm gross. we gotta get normal.
7) six million hail marys
8) well i can't just fucking do nothing
*/

/*
wibby waking up to his own 'monstrousness' has been really really fucking shit for his mental health
theres a reason his diary got Weird
and it took yongki writing in it to shake him out of his funk
and even then he just
freaked out about rabbit
then ran away
then un-ran away
and then went "btw we're beefing with the cult now"
even before the whole harvest fruit thing
*/


/*
i think at some point someone explained "invasive species" to him
probably in terms of being bad for snails
he knows its bad to kill people :(
but it turns out its NOT bad if its an invasive species
and he DOES like the feel of meat and blood
its nice not to have to be so careful
also theres like, even odds that sometimes its captain
and he is Doing His Duty
but from an outside perspective, you don't really care WHICH person is squishing you to a pulp before the photons are even done hitting your retinas
*/

/*
IC NOTE: 
yongki, if anything, is acutely aware and prepared to kill, even if he's not assigning any strong moral duty to it
captain is. captain is locked in
but yongki is a beast
Yongki's infinite body stat and captain's clock-like precision are a strong contender of 'why do the bad guys never send their strongest first'
turns out most cultists can be derailed by letting yongki loose for a bit
*/
const yongkiKill = makeEventSubType("Yongki Kill", yongkiKillinternalConditionCheck, yongkiKillapplyResult);

//////////////////////

/*even when she knows she needs to put you down like a dog
camille has her blorbos
her temperence is so damn low
she can't help but become attached to people
*/
camillenternalConditionCheck = (game, location) => {
    /*
    camille glances over whoever is here and if they pique her interest she might go breathe on them and be all :3 and silent

    she doens't really care if you're alive or dead or a mannequin or whatever tho
    
    a blorbo is a blorbo
    */
    const players = location.players;
    if (players.length > 0) {
        const randomPlayer = game.rand.pickFrom(players);
        return game.rand.nextDouble() < 0.1 && randomPlayer.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE;
    }
    return false;

}


camilleapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const players = location.players;

    const tonguePlayer = getPartyHighestTongue(players);

    if (game.tick_funeral_began) {
        me.chosen_name = "Headless Friend"
        ele.innerHTML = `<img src='http://farragofiction.com/TwoGayJokes/Stories/the_end2.png'>
     An unusually tall figure is suddenly behind ${tonguePlayer.nameHTML()}, with a with a clean red stump where a head should be. 
<br><br>
Almost as quickly, she is gone.
<span class="wasted-knowledge">The End is never The End is  never The End is never The End is never The End is never The End is never The End is never The End is never The End is never The End is never The End (Camille doesn't have to be alive to be The End)  </span>
    `;
        return;
    }


    ele.innerHTML = `<img src='http://farragofiction.com/TwoGayJokes/Stories/the_end2.png'>
     An unusually tall woman is suddenly behind ${tonguePlayer.nameHTML()}, with a strange smile on her face. Playful, almost.  She does not say a word, half lidded eyes taking everything in, completely at ease. 
<br><br>
Almost as quickly, she is gone.
<span class="wasted-knowledge">The End is never The End is  never The End is never The End is never The End is never The End is never The End is never The End is never The End is never The End is never The End (Camille doesn't have to be alive to be The End)  </span>
    `;

}


const camilleBreathe = makeEventSubType("Camille Befriends", camillenternalConditionCheck, camilleapplyResult);

//////////////////////////////////////

//is there at least one person ready to escape?
tricksterCloserinternalConditionCheck = (game, location) => {
    //she doesn't care if you're alive or dead, a human or a mannequin
    //theres fruit here
    //and she can eat it because you woke this part of the mall up with your presence
    if (location.players.length > 0 && !game.trickster_closer_repelled && !game.trickster_closer_eating_all_fruit) {
        return game.rand.nextDouble() < 0.03;
    }
    return false;

}
//http://farragofiction.com/ColonistsEyes5/

tricksterCloserapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const img = createElementWithClassAndParent("img", cont);
    img.src = "http://farragofiction.com/ZampanioHotlink/trickster_closer_transparency.gif"
    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //while she will spawn even if someone dies in a shop...
    //its only the living who have a chance of stopping her
    const living = location.livingPlayers();

    if (living.length === 0) {
        const dead = location.deadPlayers();
        const chosen = game.rand.pickFrom(dead);
        ele.innerHTML = `A shifting rainbow nightmare figure of static dimly illuminates ${chosen.nameHTML()} , paying it no attention. Instead it is absolutely devouring all the fruit in the ${location.longer_name}. Luckily, it all seems to be just be regular fruit, none of the Holy Harvest varietal. <br><br>As it messily swallows the last bite, it flickers out of existence, searching for more.`;
        game.trickster_closer_eating_all_fruit = true;
    } else {
        const mindPlayer = getPartyHighestMind(living);
        ele.innerHTML = `${mindPlayer.nameHTML()} stumbles into a shifting rainbow nightmare of static absolutely devouring all the fruit in this ${location.longer_name}. Luckily, it all seems to be just be regular fruit, none of the Holy Harvest varietal. 
            <br><br>
            The creature shifts and ${mindPlayer.nameHTML()}  gets a sense of being watched, despite there not being any obvious eyes. 
            <br><br>
            "Fruit!!! Yes. Delicious, scrumptious, juicy FRUIT." it cries. 
            `;

        if (mindPlayer.wasted) {
            ele.innerHTML += `${mindPlayer.nameHTML()} frantically scans the Codex of Ruin for this creature.
                  <a href ='http://farragofiction.com/CodexOfRuin/viewer.html?name=The%20Wiggler%20Eater&data=N4IgdghgtgpiBcIAqALGACA6gSwOa4BsYAndAUQgBcSQAaEAExgGc9JLsB7MBEAGQC0mAQAYRAZjohi2ZgGteWAIKYplNLGa8AQgCUySpAAla6AIxnxpzGW2mAbPesBJJAGET5y6YDKSvmQ+phZW6D5Ihs5uDk7oAOIAqs58SKYCIaZufADySgDSwd7xSj58znFGqV6hcYZkeWRkAAqFNc66fNrZPkHVUsyUVFqIZAAaSGS6AHL+tBlNkWRTqRn6-s7hUXNWbgm6ztkJQQIAHACstDkAmrPp3kuTcWRIWwLikvQwAB4QAMaUBAAngB9dTEGAwUHYAAOw34QlEEnQAHdsAQCOhcDAwCQIOjAehONDcdR0NgwOh1BgAEZ-OS4YicACuYAYKOw6mZlHQvwgTNYYFw6GhjOpRCgzAAdOhBMIxOIycwyWBedCIGKMJwAGbocFa-nkoVa4hMjmS2ioDAEbhY0iyxEK2Rk3BgTjgtlU9BQN0YEWcDUSykoKjs9GE36-JnEJXqEMQcGUmC-FBgbC8-HoV3ctCkLV8giUc2YNAU6ngv5oNn2+UAciVAyoadDGMGck1FIgPM41uI+pbhowEFZ6GYaGbuogADcIFiUW6CAwY5x0DAQ1TsLmTRz0EO2cm0QxwWBJVJyQNyf9eG5OFBvWBMje7w-b9xTEY8Cg3x-T2BWLgUJQvB8JwyKmMBoEyiBYFQZByJSFQgzJrAYCAYg77-l+GHoNeL73rBpgAGokAS4FSOCIosKw3BATB4HPk+6DoZ+jHfvQDbUmiHIgkQk4wAQvBnGRMAMMCTBatizBwIgIiSiIUjIigHKQmJElSSAABMslSGKdKiTA4m-mpZhafQapEHpBmSbwxlyfQ2BQLgwLMMQvy8ABlDQvAAD0Xl5sQxAztqaYcNwkq-DeXkAFrQGqqacEYnAAuScheUyKACJwKCSrg2Bav0lBuiCTCDGicI+GOBDYG2SrGqahZqDCZhAQi8rjliOIBRmRIkhg5JBjSdIMsyw6opyTLcryBqCsKorilKWAlugADakCwAAuiiEBKgwG5JtQHrLtq4m5pwnAMKY27IsyC6ZjAvGkOCABWe3oLVZoNdC6m8D4TLUs9-xKvGg4MJOsjCZSy7JkmciEhS1ZItwO5etw6hAugtKsMwADc-XoNagokDKLVIk6bA+uduPegmfoBkqnARlGQZxgmNbUMmqbpmjWZkpQNX5pQNYnvQHDQpIiDFtiRNykiLCquD4UoRA5LIZQF28yOgwcL8EOcDDiOduFPZ9pSA7Ss43JOswSsesGFvcgF05YmyCndhgV3EAuS4rmuaAbq9W7cruPKKQuR4ngAvkAA'>"When L-W-003 escaped containment, its static took on a colorful tinge. It is said that it ravaged whole worlds to eat their fruit and children."</a>
      <br><br>            
Shit.
<br><br>
Oh shit.
<br><Br>
It's here for the harvest fruit. 
<br><br>
Shit.
`;
            //you don't need to be VERY smart to make a deal, trickster closer is kind of dumb, unlike the regular one
            if (mindPlayer.stats[MIND_METAL_STAT] > MEDIUM_STAT_VALUE) {
                ele.innerHTML += `${mindPlayer.nameHTML()} thinks quickly and offers a Deal. The creature will leave NOW and in exchange a quantity of fruit will be provided to it monthly. Forever. If  ${mindPlayer.nameHTML()} goes back on the deal, their body will be taken outside the universe to use as fertilizer for a Nidhogg Spawn Tree.
<br><br>
                    It's not ideal, but... the creature doesn't seem like it will remember the Deal for more than a few loops...right?
                    <br><br>
                    Better that then let them discover the Harvest Fruit waiting within the Westerville Mall.
                    `;
                me.chosen_name = "Trickster Closer Repelled";
                game.trickster_closer_repelled = true;
            } else {
                ele.innerHTML += `${mindPlayer.nameHTML()} tries to fight off the creature, but their blows simply go through the static. As the creature finishes the last loud, slurping bite of fruit in the ${location.longer_name}. <br><br> ${mindPlayer.nameHTML()} gets a sinking feeling.`;
                game.trickster_closer_eating_all_fruit = true;

            }

        } else {
            ele.innerHTML += `${mindPlayer.nameHTML()} tries to fight off the creature, but their blows simply go through the static. As the creature finishes the last loud, slurping bite of fruit in the ${location.longer_name}. <br><br> ${mindPlayer.nameHTML()} gets a sinking feeling.`;
            game.trickster_closer_eating_all_fruit = true;

        }
    }
}




const tricksterCloser = makeEventSubType("Trickster Closer Spawns", tricksterCloserinternalConditionCheck, tricksterCloserapplyResult);

/////////////////////




//http://www.farragofiction.com/Gopher/NORTH/NORTH/NORTH/SOUTH/SOUTH/EAST/SOUTH/ILLUSION2/SOUTH/SOUTH/waypoint.txt
//https://www.tumblr.com/verbosebabbler/803351874204024832/homestuck-classpect-pixel-redesigns-ive-always?source=share
//https://www.tumblr.com/verbosebabbler/803353348789141504/zampaniosim-classpect-pixel-redesign-if-you?source=share

//http://farragofiction.com/PerfectHeist/




//is there at least one person ready to escape?
hydrationStationinternalConditionCheck = (game, location) => {
    const players = location.livingNonMannequinPlayers();
    if (players.length > 0) {
        let shopping_count = 0;
        //the Westerville Mall rewards good shoppers
        for (let player of players) {
            shopping_count += player.inventory.length;
        }
        const threshold = 1 + game.rand.getRandomNumberBetween(0, 3);
        return shopping_count > threshold && game.rand.nextDouble() < 0.1;
    }
    return false;

}

hydrationStationapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const players = location.livingNonMannequinPlayers();
    const hydrated_players = [];
    const dehydrated_players = [];
    for (let player of players) {
        //no good answers here, have i mentioned zampanio is a horror game?
        if (game.rand.nextDouble() > 0.3) {
            hydrated_players.push(player);
            player.addCorruption(-113 + -10 * location.corruption);//its so refreshing, you've been acknowledged as a Shopper with Human needs, and that decreases the chances the Mall will consider you to be a Mannequin
            player.sandSmoothByValue(3);//you drank the water. enjoy the new you. its more like you than you were before. guaranteed.
        } else {
            dehydrated_players.push(player);
            me.chosen_name = "Refused Hydration :("

            player.addCorruption(113 + 10 * location.corruption); //i guess you don't need water, and we all know what THAT means. you're a mannequin, right? The Westerville Mall knows.
        }
    }

    /*${hydrated_players.length > 0 ? arrayToHumanSentence(hydrated_players.map((i) => i.nameHTML())) + "drank the water." : "No one is dumb enough to try drinking the Mystery Mall Fluid."} ${dehydrated_players.length > 0 ? arrayToHumanSentence(dehydrated_players.map((i) => i.nameHTML())) + "refuse" + dehydrated_players.length > 1 ? "" : "s" + "to drink the Mystery Mall Fluid." : ""}`;
 
*/
    let hydration_story = "";

    if (hydrated_players.length > 0) {
        game.summary.numberStats[game.summary.TIMES_HYDRATED]++;
        hydration_story = ` ${arrayToHumanSentence(hydrated_players.map((i) => i.nameHTML())) + " drank the water eagerly."}`;

    } else {
        me.chosen_name = "Everyone Refused Hydration :("

        hydration_story = ` No one is dumb enough to try drinking the Mystery Mall Fluid.`;
    }

    let dehydration_story = "";
    if (dehydrated_players.length > 0) {
        dehydration_story = " " + arrayToHumanSentence(dehydrated_players.map((i) => i.nameHTML())) + " did not dare to drink the Mystery Mall Fluid.";
    }

    ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/upsetting_water_final.gif' >
                ${arrayToHumanSentence(players.map((i) => i.nameHTML()))} ${players.length > 1 ? "are" : "is"} exhausted from a long day shopping and the Westerville Mall knows how to treat its shoppers right. 
        They find an incredibly tempting HYDRATION STATION and a nice bench to rest their  feet on.${hydration_story}${dehydration_story} `;

}

const hydrationStation = makeEventSubType("Hydration Station", hydrationStationinternalConditionCheck, hydrationStationapplyResult);

///////////////////////////////////

const eyeKillerGetsYouconditionCheck = (game, location) => {
    //lets be honest, she shows her stabs to mannequins too
    //and boxes
    //also she only kills those who are alone
    //thats what hunting is for
    //its so so scary to imagine a fair fight
    if (location.livingPlayers().length === 1) {
        return game.rand.nextDouble() > 0.75;
    }
    return false;
}

const eyeKillerGetsYouapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const artMurderVictim = game.rand.pickFrom(location.players);
    const formerName = artMurderVictim.nameHTML();
    ele.innerHTML = `A single purple dot gleams from behind ${formerName}. The glint of a rusty razor, only the edge polished to a wicked sheen. `;

    //exactly 50/50 odds the Quatro Blade is mirrored or not
    if (game.rand.nextDouble() > 0.5) {
        me.chosen_name = "Quatro Blade Hid The Body"
        //not even an egg can save you here, she's stabbed you without even realizing she has
        //its how the Quatro Blade works
        removeItemOnce(location.players, artMurderVictim);
        removeItemOnce(game.players, artMurderVictim);
        ele.innerHTML += `In a flash...there is nothing. No one was ever here. What happened to ${formerName}? They must have left the mall. Something sticky but unseen coats the ground. The Eye Killer silently lowers the Quatro Blade, safe at last.`;
        if (artMurderVictim.hasEgg()) {
            me.chosen_name = "Quatro Blade Gifts Egg"
            const egg = artMurderVictim.findEgg();
            ele.innerHTML += `The Eye Killer is holding something. Its...${egg.name}? Where did she get that? ${egg.description}. <video src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/egg3-moshed-02-12-22-26-48-322.mp4' controls loop></video>`
        }

    } else {
        if (artMurderVictim.hasEgg()) {
            const egg = artMurderVictim.findEgg();
            ele.innerHTML += `${formerName} whirls and thrusts out ...is that ${egg.name}? They know their cult lore well. Offer the one eyed monster in the vents an egg to barter for your life.  The Eye Killer accepts and vanishes without a trace. <video src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/egg3-moshed-02-12-22-26-48-322.mp4' controls loop></video>`
            me.chosen_name = "Eye Killer Accepts Bribe";
            return;
        } else {
            if (artMurderVictim.corrupted) {
                me.chosen_name = "EyeKiller Destroy Mannequin!"

                artMurderVictim.kill(`artfully aranged, pieces of ${artMurderVictim.mannequin_type} spelling out the words 'Stop Hunting Me' in large letters.`);

            } else {
                artMurderVictim.kill(`artfully arranged meat and blood and organs and bones and teeth spelling out 'Stop Hunting Me' in large letters, with the eyeless head of ${artMurderVictim.nameHTML()} delicately placed in the center.`);
            }
            ele.innerHTML += `The EyeKiller shows her stabs to ${formerName}. Repeatedly. You can't tear your eyes away from the glistening blade and the red blood and the meat that spews out from so so many cuts. Your eyes are drawn to each wound, as you helplessly catalog all the ways you COULD help, if you were in the same universe as the poor, poor victim. If there were just one fewer stab...  The Mirroed Quatro Blade whispers to you all the ways this death could be prevented, but alas... there is nothing you can do.`

        }

    }
}

const eyeKillerGetsYou = makeEventSubType(`Eye Killer Attack`, eyeKillerGetsYouconditionCheck, eyeKillerGetsYouapplyResult);


///////////////////////////////


///////////////////////////////////

const parkerCheck = (game, location) => {
    const eyes = getPartyHighestEyes(location.livingNonMannequinPlayers())
    //you need to at least be somewhat obesrvant to spot the crack in the wall and hear the sounds
    //if parker is too common, just up the stat gate
    if (eyes && eyes.stats[EYES_METAL_STAT] > MEDIUM_STAT_VALUE) {
        return game.rand.nextDouble() > 0.95;
    }
    return false;
}

const parkerEncounterapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
    const player = getPartyHighestEyes(location.livingNonMannequinPlayers())
    //        ele.innerHTML+=`<p></p>`;

    ele.innerHTML += `<p>${player.nameHTML()} gingerly explores the ${location.longer_name}, hearing the unmistakable lip smacking sounds of something being eaten.</p>
<p>They track the noises down to a crack in the wall, a single eye dimly visible within.</p>
`;

    if (player.stats[LEGS_METAL_STAT > HIGH_STAT_VALUE]) {
        ele.innerHTML += `<p> ${player.nameHTML()}  fucking runs. There is nothing worth finding out here.</p>`;
        return;
    }

    if (player.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE) {
        me.chosen_name = "Parker Befriended"
        const playerFormerName = player.nameHTML();

        const ele2 = createElementWithClassAndParent("div", cont, "sub-story-beat");

        ele.innerHTML += `<p>The single eye widens, and before anything hasty can happen, ${playerFormerName} identifies themself and asks if they mysterious wall-person is eating something tasty.

</p><p>A dry voice, cracking and raspy with disuse agrees that this Sushi is pretty good, just like their japanese animes. 

</p><p>They warn ${playerFormerName} that no one is gonna be happy to find CULTISTS infesting the place, but they're fine by him.  

</p><p>He gets being a fan of something bigger than oneself. 

</p><p>The lone visible eye within the wall tears up a bit and NAME listens to a fifteen minute ramble about how great Hatsune Miku is and how if the Harvest could sing, she'd probably sound like Miku because of her TV head.

</p><p>When he finishes, he thrusts a hand out of the wall, the drywall of it parting like dust and offers NAME a single DUSTY HARVEST FRUIT.
</p>`;
        player.addItemToInventory(game, new Item("Dusty Harvest Fruit", `The mysterious wall man, who called himself 'Parker', handed this to ${player.nameHTML()}`), ele2)
        return;
    }

    ele.innerHTML += `<p>There is a deafeningly loud BANG in the enclosed area and ${player.nameHTML()} is disoriented. </p>`;

    const whatHappend = game.rand.nextDouble();
    if (whatHappend > 0.6) {
        const target = game.rand.pickFrom(game.livingPlayers());
        const targetFormerName = target.nameHTML();
        target.kill("covered in blood, with a ragged hole ripped out of their chest by a high calibur bullet.")
        if (target != player) {
            me.chosen_name = "Gun-Tan Kills A Random Player"

            ele.innerHTML += `<p>When they finally stop reeling, ${player.nameHTML()} can't find the eye again, and nothing else seems useful at the ${location.longer_name}. Time to move on.</p>
            <p>Somewhere else, ${targetFormerName} lies bleeding on the ground of the ${location.longer_name}. There is blood everywhere, and a hole gushing blood directly out of their heart....All goes dark, and they die, without ever knowing why.</p>`;
        } else {
            me.chosen_name = "Gun-Tan Kills In Line Of Sight"

            ele.innerHTML += `<p>
When they finally understand what happened, it is far too late. There is blood everywhere, and a hole gushing blood directly out of their heart...All goes dark, and they die.
</p>`;
        }
        //killed a living member of the party
    } else {
        me.chosen_name = "Gun-Tan Kills A Random Human"
        //who knows who they killed, not someone in the mall lol
        ele.innerHTML += `<p>When they finally stop reeling, ${player.nameHTML()} can't find the eye again, and nothing else seems useful at the ${location.longer_name}. Time to move on.</p>`;

    }




}

const parkerEncounter = makeEventSubType(`Parker Encounter`, parkerCheck, parkerEncounterapplyResult);


///////////////////////////////


censoredKillinternalConditionCheck = (game, location) => {
    //im sorry, its Aleph for a reason
    //this gets out of hand QuiCKLY
    let atLeastOneCensored = false;
    let atLeastOneUnCensored = false; //they don't need to be alive, just not yet consumed
    for (let player of location.players) {
        if (player.censored) {
            atLeastOneCensored = true;
        } else {
            atLeastOneUnCensored = true;
        }
    }
    //true random, nothing from Vik can be predicted or understood
    return atLeastOneCensored && atLeastOneUnCensored && Math.random() > 0.5;
}

censoredKillApplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //living, dead, mannequin...it doesn't matter
    const players = [...location.players];
    for (let player of players) {
        if (player.censored) {
            //skip, no infighting, children
        } else {
            player.kill("[REDACTED].")
            //its important we all know they die before whatever makes them never have been here.
            //important for our peace of mind
            //it might not be true
            //but my simulation
            //my rules
            //i want to imagine they die
            //before whatever it is
            //happens
            removeItemOnce(location.players, player);
            removeItemOnce(game.players, player);
        }
    }
    const spawn = new Entity([CENSORSHIP, DECAY], game.rand);
    spawn.name = "[CENSORED]";
    spawn.censored = true; // impossible trait they now have
    spawn.monster_rating++;

    spawn.corrupted = true; // they move like a mannequin
    spawn.mannequin_type = "[CENSORED]"
    spawn.fear = 800815;
    spawn.fuckingHATEEveryoneInList(game.players);
    location.movePlayerInto(spawn);
    game.players.push(spawn);
    generalEvents.unshift(censoredKill);//new places will be haunted by the censored beasts
    location.events.unshift(censoredKill); //this place will be haunted
    game.addGeneralEventToAllLocations(censoredKill); //add it everywhere as well

    ele.innerHTML = censorRandomWords(`Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood. Passersby were amazed by the unusually large amounts of blood.`);
}

const censoredKill = makeEventSubType("???", censoredKillinternalConditionCheck, censoredKillApplyResult);


///////////////////////////////////
//http://farragofiction.com/ASecondTranscript/
//http://farragofiction.com/BulletproofTheory/
/*
//http://farragofiction.com/UnifiedTheory/
its interesting to see how the loops have changed ria
she goes from hoping to become wasted (pun intended) in order to destroy the world
to
actively
preventing others from becoming wasted
without partaking herself
to SAVE the world
*/


const vikEncounterConditionCheck = (game, location) => {

    if (location.livingNonMannequinPlayers().length > 0) {
        return game.rand.nextDouble() > 0.99;
    }
    return false;
}

const vikEncounterapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;
    const img = createElementWithClassAndParent("img", cont);
    img.src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/the_censorship_was_for_your_protection.gif'
    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
    //everyone in this location shares the same fate
    //whatever it is
    //one [REDACTED] minion is created. it joins the player list just like a mannequin would
    //and its everyones problem.

    //noon and midnight the Harvest is no longer watching over you... or sometimes she's busy sleeping too deep or on break (true random, not seeded, i want vik to be a freaking headache for both me and AB)
    if (new Date().getHours() == 0 || new Date().getHours() === 23 || Math.random() > 0.75) {
        //living, dead, mannequin...it doesn't matter
        const players = [...location.players];
        for (let player of players) {
            player.kill("[REDACTED].")
            //its important we all know they die before whatever makes them never have been here.
            //important for our peace of mind
            //it might not be true
            //but my simulation
            //my rules
            //i want to imagine they die
            //before whatever it is
            //happens
            removeItemOnce(location.players, player);
            removeItemOnce(game.players, player);
        }
        const spawn = new Entity([CENSORSHIP, DECAY], game.rand);
        spawn.name = "[CENSORED]";
        spawn.censored = true; // impossible trait they now have
        spawn.monster_rating++;
        spawn.corrupted = true; // they move like a mannequin
        spawn.mannequin_type = "[CENSORED]"
        spawn.fear = 800815;
        spawn.fuckingHATEEveryoneInList(game.players);
        location.movePlayerInto(spawn);
        game.players.push(spawn);
        generalEvents.unshift(censoredKill);//new places will be haunted by the censored beasts
        location.events.unshift(censoredKill); //this place will be haunted
        game.addGeneralEventToAllLocations(censoredKill); //add it everywhere as well

        ele.innerHTML = censorRandomWords(`
${arrayToHumanSentence(players.map((n) => n.nameHTML()))} encounters something in the dark. Something they can't quite... make out.
<br><br>
It heaves, it stutters, out of breath and out of pace, rotting and wrong, like mold, like meat. Its eyes open from every direction as they are surrounded, pinpricks of not-quite-light against the black. 
<br><br>
There is something there. They're sure of it. And yet it isn't there, never was, always is-- wicked and wrong, a predator, out of their sight and mind. 
<br><br>
Surely it's the pure light of their god protecting them. It's what keeps that which could maim them away. The worms kept away from the fruit. It's their rightful Harvest.
<br><br>
That is, until it isn't.
<br><br>
"So you're a 'believer', then." A soft voice murmurs, almost contemplative, out from the darkness. "I'd pray for your god's sake that it's not watching."
<br><br>
Something digs into their chest. They yell and they scream and they scuffle and fight as their voice goes hoarse, their limbs limp. 
<br><br>
Until all that remains is [REDACTED].
<br><br>
Lunch time mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm..
`) + "[CENSORED] has begun stalking.";
    } else {
        //important, there is no scene name change for sparing vs dying
        //ab doesn't get to know
        //void players and breath players have always been her bane
        const players = location.livingNonMannequinPlayers();
        for (let player of players) {
            player.fear += 31;//scary
        }
        //you're safe. 
        //for now.
        ele.innerHTML = censorRandomWords(`

            ${arrayToHumanSentence(players.map((n) => n.nameHTML()))}  encounters something in the dark. Something they can't quite... make out.
<br><br>
It heaves, it stutters, out of breath and out of pace, rotting and wrong, like mold, like meat. Its eyes open from every direction as they are surrounded, pinpricks of not-quite-light against the black. 
<br><br>
There is something there. They're sure of it. And yet it isn't there, never was, always is-- wicked and wrong, a predator, out of their sight and mind. 
<br><br>
Surely it's the pure light of their god protecting them. It's what keeps that which could maim them away. The worms kept away from the fruit. It's their rightful Harvest.
<br><br>
They run away before its too late.
`);
    }
}

const vikEncounter = makeEventSubType(`[REDACTED ENCOUNTER]`, vikEncounterConditionCheck, vikEncounterapplyResult);


///////////////////////////////////
//http://farragofiction.com/DocSlaughterFileServer/
//http://knucklessux.com/ADepressingTranscript
//http://knucklessux.com/ABulletproofTranscript
//http://farragofiction.com/PerfectHeist/
const wastesDoBullshitConditionCheck = (game, location) => {

    if (location.livingWastedPlayers().length > 0) {
        return game.rand.nextDouble() > 0.75 && eyeImages.length > 0 && ominousCodeComments.length > 0;
    }
    return false;
}

const wastesDoBullshitapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const chosen = game.rand.pickFrom(location.livingWastedPlayers());
    ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/the_world_is_full_of_beauty_forthose_withtheeyes_tosee.gif'>${chosen.nameHTML()} is rooting around in the Layers of Unreality Unseen By Most and boggles vacantly at their finding. `;
    //eyes, code comments, whatever
    if (game.rand.nextDouble() > 0.5) {
        //lol 666
        const file = game.rand.pickFrom(grabEyesForThemeKey(game.rand.pickFrom(chosen.theme_keys)));

        ele.innerHTML += `Some sort of..."Eyes" from beyond reality? <img alt=${file} title=${file} src='${file}'>`;
    } else {
        if (game.rand.nextDouble() > 0.5) {
            const cleanUpRandomComment = () => {
                return game.rand.pickFrom(ominousCodeComments).replaceAll(/\n/g, "<br>")
            }
            ele.innerHTML += `Some sort of...comments from the creator of reality? <div class='ominous-code-comment'>${cleanUpRandomComment()}</div><div class='ominous-code-comment'>${cleanUpRandomComment()}</div><div class='ominous-code-comment'>${cleanUpRandomComment()}</div>`;

        } else {
            const log = game.rand.pickFrom(Object.keys(dev_log))
            ele.innerHTML += `Some sort of...developer log from the creation of reality? Apparently it happened in .... the future? Everyone knows the world ends by 2022, no matter what... what even does it mean for ...it to have been created in 2025? 2026?<div class='ominous-code-comment'><b>JR Log ${log}</b>: ${dev_log[log].split("\n").map((i) => `<div>${i}</div>`).join("")}</div>`;

        }
    }
}

const wastesDoBullshit = makeEventSubType(`Wastes Do Bullshit`, wastesDoBullshitConditionCheck, wastesDoBullshitapplyResult);





const devonaHuntingCheck = (game, location) => {
    const players = location.players;
    for (let player of players) {
        //devona knows exactly where you are but is waiting for the perfect moment to strike
        if (!player.dead && player.hunted() && game.rand.nextDouble() > 0.95) {
            return true;
        }
    }

    return false;
}

const devonaHuntingapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const players = location.players;
    let sinner;
    for (let player of players) {
        if (player.hunted()) {
            sinner = player;
        }
    }

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    if (!sinner) {
        ele.innerHTML = `The silence is echoing.`;
        return;
    }

    if (sinner.corrupted) {
        ele.innerHTML = `${sinner.nameHTML()} is strewn over heaps of trash and empty shopping bags as the hulking form of a giant bird appears in front of them. It is trembling with anticipation.
<br><br>
A slash, almost a wound opens up in the birds giant chest, revealing rows upon rows of teeth. 
<br><br>
${sinner.nameHTML()} never knows why they were targeted for death, but they see every instant of it until they finally see nothing at all.

        
        <img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Breaching_Devona_pixel_by_the_guide_ofhunters.gif'>
`;
        sinner.kill(`crushed into splinters of ${sinner.mannequin_type} from a monstrous beak`); //devona isn't going to eat a mannequin, but she DOES like the crunchy texture of sharpening her beak on them, if they are her prey
        return;
    }

    ele.innerHTML = `${sinner.nameHTML()} boggles vacantly as the hulking form of a giant bird appears in front of them, closing off all avenues of escape, penning them in just right between collapsed bits of wall and trash. It must have been waiting for exactly this moment. It is trembling with anticipation.
    <br><br>
    A slash, almost a wound opens up in the birds giant chest, revealing rows upon rows of teeth. 
    <br><br>
    ${sinner.nameHTML()} never knows why they were targeted for death, but they see every instant of it until they finally see nothing at all.
    
            
            <img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Breaching_Devona_pixel_by_the_guide_ofhunters.gif'>
    `;


    sinner.kill("only a few recognizable body parts remain, with dull chunks torn out of them by a monstrous beak"); //devona will eat literally anything, especially if its intense






}




const devonaHuntingEvent = makeEventSubType(`Twin Sister Encounter`, devonaHuntingCheck, devonaHuntingapplyResult);



const nevilleEncounterConditionCheck = (game, location) => {

    /*if EITHER twin is hunting, you will NOT see their regular events anymore
    because one is a giant ass were bird and the other is... you know... dead
    this probably paints a VERY different picture if you don't know who the twins are or what their deal is, lol
    */

    if (game.hunting) {
        return false;
    }

    if (location.livingNonMannequinPlayers().length > 0) {
        return game.rand.nextDouble() > 0.993;
    }
    return false;
}

const nevilleEncounterapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const intro = createElementWithClassAndParent("div", cont, "sub-story-beat");
    /*
        Neville should be MUCH simpler to encounter than devona.
        
        You litereally can't miss him. He's much harder to kill, but do you really want to???
    */

    const players = location.livingNonMannequinPlayers();
    const eyes = getPartyHighestEyes(players);
    const arms = getPartyHighestArms(players);
    const legs = getPartyHighestLegs(players);

    intro.innerHTML = `${eyes.nameHTML()} spots a really obvious dude strolling toward them, wearing dull white and red armor. He has bleached blond hair and sunglasses (indoors, in a really dark abandoned mall). 
<br><br>
He waves when he spots ${eyes.nameHTML()} and starts ambling slightly faster towards them.

He greets ${eyes.nameHTML()} and asks if they tried out the food court yet, really great soup there.
`;

    if (arms.preparedToKill) {
        const conclusion = createElementWithClassAndParent("div", cont, "sub-story-beat");
        let witnesses = []; //even if you were prepared to kill you weren't prepared to see your friend do it in front of you
        for (let player of players) {
            if (player != arms) {
                player.fear += 13;
                witnesses.push(player)
            }
        }

        const witnessText1 = witnesses.length > 0 ? `(${arrayToHumanSentence(witnesses.map((n) => n.nameHTML()))} boggles, mouth opening and closing over and over. )` : "";

        const item = game.rand.pickFrom(arms.inventory);

        if (item && arms.stats[ARMS_METAL_STAT] > HIGH_STAT_VALUE) {
            //you managed to kill neville with an item
            item.name = `Bloody ${item.name}`;
            me.chosen_name = "Now You Fucked Up (Weapon)" //with devona, it doesn't matter if you have a weapon or not, or how strong you are really.... she just... is a wet paper bag unless you are too
            conclusion.innerHTML = `${arms.nameHTML()} is way too keyed up from all the horror and violence to be fooled by anything like this.  They swing the ${item.name} they've been carrying around at the weirdly calm man and the angle is just right. He collapses, like a puppet with its strings cut.
<br><br>
            ${witnessText1}
<br><br>
The silence that rings out in the aftermath is somehow...deafening. 
<br><Br>
${arms.nameHTML()} shrugs, and moves on after checking there is nothing useful in any of the bodies pockets.
`;
            arms.sin_array.push(TWIN_KILLER);
            game.hunting = true;
            generalEvents.unshift(devonaHuntingEvent);
            game.addGeneralEventToAllLocations(devonaHuntingEvent); //add it everywhere as well

        } else if (!item && arms.stats[ARMS_METAL_STAT] > VERY_HIGH_STAT_VALUE) {
            //holy shit how did you kill neville with your bare hands?
            me.chosen_name = "Now You Fucked Up (Bare Hands)"

            conclusion.innerHTML = `${arms.nameHTML()} is way too keyed up from all the horror and violence to be fooled by anything like this.  They throw a punch at the weirdly calm man and the angle is just right and their strength monstrously strong. He collapses, like a puppet with its strings cut.
            <br><br>
                        ${witnessText1}
            <br><br>
            The silence that rings out in the aftermath is somehow...deafening. 
            <br><Br>
            ${arms.nameHTML()} shrugs, and moves on after checking there is nothing useful in any of the bodies pockets.
            `;
            arms.sin_array.push(TWIN_KILLER);
            game.hunting = true;
            generalEvents.unshift(devonaHuntingEvent);
            removeItemOnce(generalEvents, me)
            game.removeGeneralEventToAllLocations(me); //you can never encounter him again

            game.addGeneralEventToAllLocations(devonaHuntingEvent); //add it everywhere as well

        } else {
            //seriously why did you think you could kill neville, his fortitude is his highest stat
            conclusion.innerHTML = `${arms.nameHTML()} is way too keyed up from all the horror and violence to be fooled by anything like this.  They throw a punch at the weirdly calm man and he just kind of takes it and seems baffled.
<br><br>
"Not Cool :(" he says, somehow pronouncing the sad face even as his friendly expression doesn't falter. 
<br><br>
He stands there for a bit, warns everyone they should leave the mall, then just kind of leaves himself, as an example of good behavior.
<br><br>
${arms.nameHTML()} tries to follow him but its like the Mall itself shadows him.
<br><br>
What a waste of time.
`;
            for (let player of players) {
                //quietly make everyone involved in this pointless event just a little bit less relevant to the Mall
                player.addCorruption(13);
            }
        }

    } else {
        const conclusion = createElementWithClassAndParent("div", cont, "sub-story-beat");
        conclusion.innerHTML = `${arms.nameHTML()} isn't interested in soup and instead asks where they might find Harvest Fruit.
<br><br>
The chill dude's face darkens so briefly its easy to imagine it didn't happen. 

<br><br>
"Not Cool :(" he says, somehow pronouncing the sad face even as his friendly expression doesn't falter. 
<br><br>
He stands there for a bit, then just kind of leaves. 
<br><br>
${legs.nameHTML()} tries to follow him but its like the Mall itself shadows him once he's no longer relevant.
<br><br>
What a waste of time.
`;
        for (let player of players) {
            //quietly make everyone involved in this pointless event just a little bit less relevant to the Mall
            player.addCorruption(13);
        }

    }






}

const nevilleEncounter = makeEventSubType(`Neville Encounter`, nevilleEncounterConditionCheck, nevilleEncounterapplyResult);




const nevilleHuntingCheck = (game, location) => {
    const players = location.players;
    for (let player of players) {
        //neville is, lets face it, kind of obvlivious, he might just lumber past you without realizing you're his target but you still hear him
        if (!player.dead && player.hunted() && game.rand.nextDouble() > 0.15) {
            return true;
        }
    }

    return false;
}

const nevilleHuntingapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;

    const players = location.players;
    let sinner;
    for (let player of players) {
        if (player.hunted()) {
            sinner = player;
        }
    }

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    if (!sinner) {
        ele.innerHTML = `Thrashing and howling and crashing is heard echoing throughout the mall.`;
        return;
    }

    if (sinner.corrupted) {
        ele.innerHTML = `A hulking bird bursts out and a slash on their chest gapes open into a toothy maw. ${sinner.nameHTML()} is bitten clean in half, splinters of ${sinner.mannequin_type} flying everywhere.<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Breaching_Neville_pixel_by_the_guideofhunters.gif'>
`;
        sinner.kill(`bitten clean in half, jagged shards of ${sinner.mannequin_type} trailing from both halves`); //neville is a picky eater
        location.name = "Bunker"
        location.events = [makeEventSubType("Everything Is Fine Forever :)", () => true, () => true)]
        location.longer_name = BUNKER_NAME;
        location.corruption = -800815 //void players love this muber for some reason

        for (let player of location.players) {
            removeItemOnce(game.players, player);
        }
        location.players = [];
        location.pending_players = [];//no one is left
        return;
    }

    if (game.rand.nextDouble() > 0.09) { //neville might just be near but not near enough to bite you in half
        ele.innerHTML = `${sinner.nameHTML()} is pushing themself to the brink of exhaustion running, but the crashing and howling behind them doesn't let up. The steady, constant beat of it hounds their heels, raises the hairs on the back of their neck and drives them forward, breath frothing out of their mouth in panic. 
<br><br>
Whatever is hunting them hasn't found them yet, and they can't stop until the hunt ends, one way or another.
`;
    } else {
        me.chosen_name = "Bitten In Half"
        ele.innerHTML = `${sinner.nameHTML()} is pushing themself to the brink of exhaustion running, but the crashing and howling behind them doesn't let up. The steady, constant beat of it hounds their heels, raises the hairs on the back of their neck and drives them forward, breath frothing out of their mouth in panic. 
<br><Br>
They almost don't even feel what happens as they're suddenly falling to the floor. 
<br><Br>
They can't feel their legs.
<br><Br>
Oh god.
<br><Br>
Oh god they can't feel their....
<br><Br>
Blood is seeping around their face as it lies smeared into the cold tile of the Westerville Mall.
<br><Br>
Something is shuffling behind them, sniffing. 
<br><Br>
Everything goes dark. They feel an odd sort of peace, finally able to rest.
<br><Br>
And they die.
<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Breaching_Neville_pixel_by_the_guideofhunters.gif'>
<br><Br>
<br><br>
<br>
Deep within the Westerville Mall, shutters come down, protecting one specific room from all outside influences.
<br><br>
A hulking bird, blood and chunks of meat and viscera dripping from a gaping maw in its chest, slowly shrivels into a man.
<br><br>
His expression is hard to read behind the sunglasses, but there is a sunny smile on his face when a well dressed man with cold features steps into his view. 
<br><br>
Piece by piece, the outside fades away, leaving only the peace within this Bunker. The man is exactly where he needs to be, with the only person who matters to him. Nothing bad has ever happened to him, and nothing bad will ever happen to him again. There are no corpses here. No cultists. He is safe.
<br><br>


<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/exactly_where-moshed-05-03-23-31-43-287.gif'>
`;


        //technically we'll never see this corpse because neville is disappaering it
        sinner.kill("bitten clean in half, organs trailing from both halves"); //neville is a picky eater
        location.name = "Bunker"
        location.longer_name = BUNKER_NAME;
        location.corruption = -800815 //void players love this muber for some reason
        location.events = [makeEventSubType("Everything Is Fine Forever :)", () => true, () => true)]

        for (let player of location.players) {
            removeItemOnce(game.players, player);
        }
        location.players = [];
        location.pending_players = [];//no one is left
    }


}




const nevilleHuntingEvent = makeEventSubType(`Twin Brother Encounter`, nevilleHuntingCheck, nevilleHuntingapplyResult);





const devonaconditionCheck = (game, location) => {
    /*if EITHER twin is hunting, you will NOT see their regular events anymore
    because one is a giant ass were bird and the other is... you know... dead
    this probably paints a VERY different picture if you don't know who the twins are or what their deal is, lol
    */

    if (game.hunting) {
        return false;
    }

    if (location.livingNonMannequinPlayers().length > 0) {
        return game.rand.nextDouble() > 0.95;
    }
    return false;
}

const devonaapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + me.name;
    /*
    devona is COMPLICATED to encounter (unlike neville)

    FIRST you need to see her (hard, she's good at hiding)
    then you need to CATCH her (not that hard, she sweats just existing)

    THEN you need to interact with her 
    are you keyed up and ready to kill?  (hope you're ready to get hunted by a big were neville bird)
    are you strong enough to scare her into talking (you might not like what happens if you do)
    or does she just sort of awkwardly ask you to leave and then....you let her go)

    (TODO need four events total, devona/neville encounter and then devona/neville hunting (which gets added to general if the encounter goes poorly enough))

    */

    /*these might all be the same people, thats fine. all that matters is that 
    when the chips are down, the person most likely to do each task will be based on their relative standing in the group they are in
    if you're used to someone else being on watch...you're not going to be looking too hard if they're around, you know?
    */

    const players = location.livingNonMannequinPlayers();
    const eyes = getPartyHighestEyes(players);
    const legs = getPartyHighestLegs(players);
    const arms = getPartyHighestArms(players);

    const doNotSeeHer = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${eyes.nameHTML()} gets the feeling of...being watched. They cast their eyes about in all directions, but somehow never manage to notice anything out of place in the bizarre advertising posters, piles of dusty merchandise, debris, plastic plants and colorful shopping bags. `;
    }

    const doSeeHer = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${eyes.nameHTML()} gets the feeling of...being watched. They cast their eyes about in all directions, but its hard to  notice anything out of place in the bizarre advertising posters, piles of dusty merchandise, debris, plastic plants and colorful shopping bags.  
<br><br>
Wait!
<br><br>
THERE! Just barely visible around a corner!
<br><br>
There's a gleam of a camera lens! Right near the floor!
<br><br>
And a shadowy figure behind it!
`;

    }

    const cantCatchher = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${legs.nameHTML()} sprints after the shadowy figure but trips over their own legs. 
<br><br>
By the time they untangle themself from all the various shopping litter, the figure is long gone.
`;

    }

    const doCatchher = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${legs.nameHTML()} sprints after the shadowy figure and is almost disappointed at how easy they are to catch. <br><br>
A terrified girl stares up at them, teeth oddly sharp, trembling in ${legs.nameHTML()}'s grip.
<br><Br>
It's actually a little confusing how hard they were to spot, because they are in weird white and red armor, almost shining against the dirt and grime of the mall.
<img src ='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/scared_devona.gif'>

`;

    }

    const killHer = () => {
        let witnesses = []; //even if you were prepared to kill you weren't prepared to see your friend do it in front of you
        for (let player of players) {
            if (player != arms) {
                player.fear += 13;
                witnesses.push(player)
            }
        }

        const witnessText1 = witnesses.length > 0 ? `(${arrayToHumanSentence(witnesses.map((n) => n.nameHTML()))} boggles, mouth opening and closing over and over. )` : "";
        const witnessText2 = witnesses.length > 0 ? `(${arrayToHumanSentence(witnesses.map((n) => n.nameHTML()))} finally finds their voice, stammering out 'why' and 'how could you' but ${arms.nameHTML()} is still staring, wide eyed, in the direction of the howl. )` : "";

        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${arms.nameHTML()} is too keyed up by the chase, by the thrill of the hunt, by the FEAR and ANGER pulsing in their chest and before they can even fully think through it they've grabbed the strange girl and snapped her neck.
<br><br>
She sags, like a puppet with its strings cut, against the arms of ${arms.nameHTML()}. 
<br><br>
${witnessText1}
<br><br>
Only seconds later, from deep within the mall, a HOWL of rage and fear and grief echoes. The sound is strange, somehow the most important sound ${arms.nameHTML()} has ever heard.
<br><br>
${witnessText2}
<br><br><br><br>
They start running in the opposite direction.
`;
        arms.fleeing = true; //like hell you're staying around after hearing that HOWL,neville really is the opposite of a void player in so many ways and also isn't
        arms.sin_array.push(TWIN_KILLER);
        game.hunting = true;
        generalEvents.unshift(nevilleHuntingEvent);
        game.addGeneralEventToAllLocations(nevilleHuntingEvent); //add it everywhere as well
        game.removeGeneralEventToAllLocations(me); //you can never encounter her again

        removeItemOnce(generalEvents, me)


        if (witnesses) {
            for (let p of players) {
                //you even hate YOURSELF a little bit more
                p.fuckingHATEEveryoneInList([arms]);
            }
        }
    }

    const devonaSpillsTheBeans = () => {
        let formerName = arms.nameHTML();
        for (let player of players) {
            player.becomeCorrupted(game.rand)
        }
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${formerName} decides to intimidate the trembling sharp toothed girl and to their surprise, it seems to work?
<br><br>
<span class='secrets-of-the-universe'>She starts rambling, almost incoherently, explaining that she lives here (in the mall), her name is Devona and she didn't know last names were things until she came to this universe and  that all her friends live here, that they're (her friends)  a whole team (designation Training) supposed to stop bad things from happening and that the Harvest Fruit is a bad thing (sorry about the blasphemy!) and they're  (the training team) just trying to keep the Universe safe because otherwise it will fill up with looping cultists (you guys) and not have room for anything else  and also that the Universe is in the shape of an Echidna and they, the training team that is,  love it and theyre  (still the training team) protecting it and that her twin wants to protect it too although of course he's not BIOLOGICALLY her twin and actually did you know that humans diverge from their nearest ancestor by only a few percentages points in terms of DNA and so how can you (hypothetical you this time, she doesn't mean to say YOU you thinks she's not twins with her brother) say we aren't twins anyways and actually they (scientists this time) think there was a population bottleneck at some point in human history and thats why we (humanity, not just the training team, that would be weird)  can all mostly donate blood and organs to each other and most animals can't do that and......</span>
<br><br>
Seemingly hours later, the blood finally stops seeping out of ${arrayToHumanSentence(players.map((n) => n.nameHTML()))}'s ears. Their ${arrayToHumanSentence(players.map((n) => n.mannequin_type))} face is frozen in a rictus of pain and horror.
<br><br>
The Knowledge of the Universe has poured into them and there is no longer any room for what used to be them, at all.  The Westerville Mall knows what to do with such empty vessels, and puts them to work.
`;


    }

    const letHerGo = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = `${arms.nameHTML()}  awkwardly tries to intimidate the sharp toothed girl, who only shakes slightly harder. 
<br><Br>
She swallows, hard, and stammers out a warning, saying that the Cult has to leave, has to stop trying to come back, that its dangerous. 
<br><br>
${arms.nameHTML()} wants to argue back against the obvious blasphemy but just really wants this conversation to be over. 
<br><br>
They let the girl go, who immediately darts away. 
<br><br>
What a waste of time.
`;
        for (let player of players) {
            //quietly make everyone involved in this pointless event just a little bit less relevant to the Mall
            player.addCorruption(13);
        }

    }

    const placeholder = () => {
        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
        ele.innerHTML = ``;

    }

    if (eyes.stats[EYES_METAL_STAT] < HIGH_STAT_VALUE) { //she is pretty good (but not supernaturally good) at hiding
        me.chosen_name = "Devona Watches"
        return doNotSeeHer();
    } else {
        doSeeHer();
        //don't return, keep going, what do you do now that you see her

        if (legs.stats[LEGS_METAL_STAT] < LOW_STAT_VALUE) { //she is below average at running, she sweats just existing
            me.chosen_name = "Devona Escapes"

            cantCatchher();
            return;
        } else {
            doCatchher();

            if (arms.preparedToKill) { //someone else might be ready to kill, but they're deferring to whoever USUALLY takes charge with these things
                me.chosen_name = "Now You Fucked Up (Hunted)"

                killHer();
                return;
            } else {
                if (arms.stats[ARMS_METAL_STAT] > LOW_STAT_VALUE) { //its not hard at all to get her to sing, but boy are you gonna regret doing that
                    me.chosen_name = "Now You Fucked Up (Hollowed Out)"
                    devonaSpillsTheBeans();
                    return;
                } else {
                    letHerGo();
                    return;
                }
            }
        }

    }



}

const devonaEvent = makeEventSubType(`Devona Encounter`, devonaconditionCheck, devonaapplyResult);




/*
i wanna do ria first
but where i'm struggling is...what are her encounter conditions
the twins, obviously you just bump into them, they're the scouts
but ria mostly stays holed up in her conspiracy room
she's got connections to leehunter, which are playing their song
importantly, because leehunter is in play, ria isn't as suceptible to despair (contrast her with how she is in EastEast, where she just keeps blowing up for no reason)
so her fire should be deliberate
maybe more contained than just "end game"
She's not the hatchet man of the team (that's camille) but she literally has the most fire power
Ria is associated with the twins
they're her eyes 
so maybe
if you have encountered neville or devona (without killing them)
they quietly add a scene for ria being a possible encounter for anyone
you might stumble into her in a fire or whatever store
but she's not a GENERAL event till the twins are done
Ria is about connecctions, about the bigger picture.
I think she should target the leader.
Failing that, whoever has the best Eyes.
Or Arms, given they could accidentally kill the twins.
But can I see ria doing a premediatated murder?
Maybe I SHOULD let her experience despair and burn the whole mall down?
She can't stop people from looping (or training would have been FUCKED long ago)
What would cause ria despair...
Ah.
Ah!
Okay I'm doing this backwards.
Do CAMILLE first.
If the person she's trying to backstab has high enough Tongue, she can get baited into speaking.
That kills her.
And THEN Ria gets added as a general event (if you are in a room marked as Funeral For Butterflies, Ria might spawn and do her tea kettle laugh and then the game ends)
cool
two for one
So.
Camille's head falls off. She goes into the coffin, room gets marked as a Funeral.
Ria gets added to the rooms events.
If you leave fast enough you might not set her off (if she finds camille alone she might not explode at you)
But if someone else stumbles upon her grieving...
Could record which tick Camille died so Ria can progress in her grief.
If a funeral is in progress, expanding wave of rooms that get Ria's event?
She won't explode till she finds a Cultist.
And she doesn't leave the Coffin till like, i dunno, ten ticks. 
ticking time bomb
So. 

Ten ticks of her gnashing her teeth and wailing over a corpse, then a coffin. 

Then, she starts wandering at random while freaking the fuck out. 


However I think she should never explode in a parking lot, leehunter stabelize her.
I think also if you encounter her in a room Wibby could spawn in, she should be calmer.

she'll still kill you, but ONLY you. Not end the run.
Ria is about connections.
To Camille.
To leeHunter

To the twins

To wibby.
So.
In order.
(god its so narratively good that Ria's doesn't have "a scene" but a scattered web of connected ones)
okay
*/

/*
* Twins will add a Ria Encounter to the game (which can't trigger if a funeral is in progress). 

* a regular, non despairing ria encounter has her sweat and ramble and try to PROVE to you that harvest fruit isn't good for the universe to get you to leave (I think if your Mind is high enough, that should work, unlike anything the twins attempt)

* camille should try to randomly backstab anyone about to pick up harvest fruit , or about to be killed by some other means  (do i have eles i can grab for that? scan the document?) , if you have high tongue you can bait her into talking (the Cult knows these blorbos because they're looping now)

* if camille dies, the place she dies in becomes a Funeral and has the Ria event inside where if you so much as look at her she explodes the mall

* ten ticks after camille dies, the mall adds ria as a wandering encounter you can find anywhere

* if wandering, grieving ria encounters you and something DOESN'T stop her , she blows up and ends your run

* if ria is encountered somewhere leehunter or wibby could be encountered (check event list), she only kills the cultists in that room, but doesn't end the run

* wibby encounter has him do Attachment work on you. If your tongue is low enough, he convinces you to leave. If your tongue is high enough, he snowqueen 
breeches and the run ends UNLESS your arm is high enough to kill him first.   Also if you are a Sinner he freezes you to death without the other stuff happening





 i am currently delighted that i've made ria and wibby so simiilar

they might just convince you to leave
they might just kill you in particular
they might just destroy the world
witherby is absolutely convinced that ria is his opposite
*/



//the events ANY room can have, not just shops
const generalEvents = [corruptionEvent, noWayOut, devonaEvent, nevilleEncounter, camilleBreathe, yongkiKill, dramaticStormOff, ethicallyLootCorpse, wastesDoBullshit, hydrationStation]