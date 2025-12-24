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
            game.event_list.push(this.chosen_name);//help AB a little

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
//is there at least one person ready to escape?
const escapeMallinternalConditionCheck = (game, location) => {
    for (let player of location.players) {

        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            return true;
        }
    }
    return false;
}

const escapeMallapplyResult = (game, location, parent, me) => {

    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //everyone ready to leave can leave together
    const leaving = [];
    for (let player of location.players) {
        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            leaving.push(player);
            removeItemOnce(location.players, player);
            removeItemOnce(game.players, player);
        }
    }
    ele.innerHTML = `${arrayToHumanSentence(leaving.map((n) => n.nameHTML()))} ${leaving.length > 1 ? "leave" : "leaves"} the mall, finally free of this nightmare. No amount of knowledge and power is worth the changes they could feel creeping into their ${leaving.length > 1 ? "bodies" : "body"}.`;

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
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //everyone ready to leave can leave together
    const leaving = [];
    for (let player of location.players) {
        if (player.isStartingToFeelCorruption() && !player.corrupted) {
            leaving.push(player);
            console.log("JR NOTE: before no way out result, corruption is", player.corruption)
            location.corruption += 13; //your perception of there being something wrong twists the space. the mall thinks you must be wrong. SHOPPERS understand how to leave malls. only mannequins don't know how to. so you must be a mannequin, right?
            player.addCorruption(13); //just in case its somehow not very corrupt
            player.addCorruption(location.corruption);
            console.log("JR NOTE: after no way out result, corruption is", player.corruption)

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
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");


    //yes even if the mall was trying to give a human something
    //a mannequin can take it
    const shopper = game.rand.pickFrom(location.livingPlayers());
    //you need to have maxed out at least one stat to get a harvest fruit
    //you can't just derp into one ten seconds in
    const shopper_highest_stat = shopper.highestStat();
    let wasted_knowledge = `<span class="wasted-knowledge">The Westerville Mall knows there are two types of things that look like humans. Shoppers move around and take items of the mall and are happy and festive. Mannequins never leave the mall and are constantly screaming inside. If you fail to leave the mall soon enough, or if you are too scared, the Mall will assume you are a mannequin. Thems the breaks.</span>`;


    shopper.addCorruption(-13);//congrats, shoppers aren't mannequins!
    const formerNameHTML = shopper.nameHTML();
    const personal_adj = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, ADJ, true);
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
            me.chosen_name = "Mannequin Ascension"
            flavor = `Nothing as mundane as a mouth yawns open across the blank ${shopper.mannequin_type} expanse of their face,  stretching impossibly wide over a single ${item.name} they happened to fall onto.`;
        } if (shopper_highest_stat.key === MIND_METAL_STAT) {
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
        shopper.addItemToInventory(item, pickupEle);
    } else {
        const item = new Item(`${personal_adj} ${object}`, `It's a random item that JR hasn't fleshed out yet!`, false)

        ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper! They stumble upon a ${item.name} at too good a deal to turn down (its a free gift!).  `;
        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
        shopper.addItemToInventory(item, pickupEle);

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
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
    const extantMannequins = location.livingMannequinPlayers();
    const redPaste = game.rand.pickFrom(location.players);

    const formerNameHTML = redPaste.nameHTML();
    redPaste.becomeCorrupted(game.rand);

    let reaction = "";
    const humans = location.livingNonMannequinPlayers();


    for (let human of humans) {
        human.fear += 13; //this is not good
        human.addCorruption(13); //shoppers shouldn't be scared inside malls, are you SURE you're a shopper?
    }
    const mannequins = location.livingMannequinPlayers();

    if (humans.length > 0) {
        reaction += `${arrayToHumanSentence(humans.map((n) => n.nameHTML()))} boggle vacantly. ${formerNameHTML} was ...meat just now...just...just a second ago. Weren't...weren't they? How...how are they ${redPaste.mannequin_type}? Are...did...are they dead?`;
    }
    if (extantMannequins.length > 0) {
        reaction += `${arrayToHumanSentence(mannequins.map((n) => n.nameHTML()))} twitches ever so slightly, blank face${mannequins.length > 0 ? "s" : ""} welcoming their new kin.`;
    }
    const wasted_knowledge = `<span class="wasted-knowledge">The Westerville Mall knows there are two types of things that look like humans. Shoppers move around and take items of the mall and are happy and festive. Mannequins never leave the mall and are constantly screaming inside. If you fail to leave the mall soon enough, or if you are too scared, the Mall will assume you are a mannequin. Thems the breaks.</span>`;
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

yongkiKillapplyResult = (game, location, parent, me) => {
    const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

    const h3 = createElementWithClassAndParent("h3", cont);
    h3.innerText = "Important Event: " + this.name;

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

    ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/hand_twirl_yongki-moshed-12-09-23-16-56-176.gif'>${formerNameHTML} encounters...<i>something</i>. A blur. A hand. They are a ${redPaste.corrupted ? `pile of shattered ${redPaste.mannequin_type}` : "red smear"} on the ground now, in the blink of an eye.<span class="wasted-knowledge">Yongki didn't mean to do it. Humans are so fragile. He only meant to say 'hello'.</span> ${reaction}`;

}


const yongkiKill = makeEventSubType("Yongki Kill", yongkiKillinternalConditionCheck, yongkiKillapplyResult);

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
    h3.innerText = "Important Event: " + this.name;

    const img = createElementWithClassAndParent("img", cont);
    img.src = "http://farragofiction.com/ZampanioHotlink/trickster_closer_transparency.gif"
    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    //while she will spawn even if someone dies in a shop...
    //its only the living who have a chance of stopping her
    const living = location.livingPlayers();

    if (living.length === 0) {
        const dead = location.deadPlayers();
        const chosen = game.rand.pickFrom(dead);
        ele.innerHTML = `A shifting rainbow nightmare figure of static dimly illuminates ${chosen.nameHTML()} , paying it no attention. Instead it is absolutely devouring all the fruit in the ${location.name}. Luckily, it all seems to be just be regular fruit, none of the Holy Harvest varietal. <br><br>As it messily swallows the last bite, it flickers out of existence, searching for more.`;
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
                ele.innerHTML += `${mindPlayer.nameHTML()} tries to fight off the creature, but their blows simply go through the static. As the creature finishes the last loud, slurping bite of fruit in the ${location.name}. <br><br> ${mindPlayer.nameHTML()} gets a sinking feeling.`;
                game.trickster_closer_eating_all_fruit = true;

            }

        } else {
            ele.innerHTML += `${mindPlayer.nameHTML()} tries to fight off the creature, but their blows simply go through the static. As the creature finishes the last loud, slurping bite of fruit in the ${location.name}. <br><br> ${mindPlayer.nameHTML()} gets a sinking feeling.`;
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
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const players = location.livingNonMannequinPlayers();
    const hydrated_players = [];
    const dehydrated_players = [];
    for (let player of players) {
        //no good answers here, have i mentioned zampanio is a horror game?
        if (game.rand.nextDouble() > 0.3) {
            hydrated_players.push(player);
            player.addCorruption(-113);//its so refreshing, you've been acknowledged as a Shopper with Human needs, and that decreases the chances the Mall will consider you to be a Mannequin
            player.sandSmoothByValue(3);//you drank the water. enjoy the new you. its more like you than you were before. guaranteed.
        } else {
            dehydrated_players.push(player);
            me.chosen_name = "Refused Hydration :("

            player.addCorruption(113); //i guess you don't need water, and we all know what THAT means. you're a mannequin, right? The Westerville Mall knows.
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
    h3.innerText = "Important Event: " + this.name;

    const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

    const artMurderVictim = game.rand.pickFrom(location.players);
    const formerName = artMurderVictim.nameHTML();
    ele.innerHTML = `A single purple dot gleams from behind ${formerName}. The glint of a rusty razor, only the edge polished to a wicked sheen. `;

    //exactly 50/50 odds the Quatro Blade is mirrored or not
    if (game.rand.nextDouble() > 0.5) {
        me.chosen_name = "Quatro Blade Hid The Body"
        console.log("JR NOTE: i am trying to change the name to", { name: me.chosenName, me })
        //not even an egg can save you here, she's stabbed you without even realizing she has
        //its how the Quatro Blade works
        removeItemOnce(location.players, artMurderVictim);
        removeItemOnce(game.players, artMurderVictim);
        ele.innerHTML += `In a flash...there is nothing. No one was ever here. What happened to ${formerName}? They must have left the mall. Something sticky but unseen coats the ground. The Eye Killer silently lowers the Quatro Blade, safe at last.`;
        if (artMurderVictim.hasEgg()) {
            const egg = artMurderVictim.findEgg();
            ele.innerHTML += `The Eye Killer is holding something. Its...${egg.name}? Where did she get that? ${egg.description}.`
        }

    } else {
        if (artMurderVictim.hasEgg()) {
            const egg = artMurderVictim.findEgg();
            ele.innerHTML += `${formerName} whirls and thrusts out ...is that ${egg.name}? They know their cult lore well. Offer the one eyed monster in the vents an egg to barter for your life.  The Eye Killer accepts and vanishes without a trace.`
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












//the events ANY room can have, not just shops
const generalEvents = [corruptionEvent, noWayOut, yongkiKill, hydrationStation]