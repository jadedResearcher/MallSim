/*
Every event knows if its been triggered and knows how to apply its results (just like sburbsim scenes)

some events are owned by specific locations (and can only trigger inside them) some are general purpose and any location can see if it triggers
*/

//some events should embed videos to play
//or pics of the blorbos

class Event {

    name = "Default Event";

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
        if (this.internalConditionCheck(game, location)) {
            game.event_list.push(this.name);//help AB a little
            this.applyResult(game, location, parentEle);
            return true;
        }
        return false;
    }

    //no event can effect more than one location at a time. 
    //though i suppose you can reach outside players through the relationship they have with those inside
    //actually the horror writes itself
    //actually no i need game for changing things, nvm
    //sub classes will override this, that way checkconditions can be kept in this class unchanged
    applyResult = (game, location, parent) => {
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
class EscapeMall extends Event {
    name = "Escape Mall";

    //is there at least one person ready to escape?
    internalConditionCheck = (game, location) => {
        for (let player of location.players) {
            console.log("JR NOTE: checking player for escape event ", player)

            if (player.isStartingToFeelCorruption() && !player.corrupted) {
                return true;
            }
        }
        return false;
    }

    applyResult = (game, location, parent) => {
        const ele = createElementWithClassAndParent("div", parent, "sub-story-beat");
        //everyone ready to leave can leave together
        const leaving = [];
        for (let player of location.players) {
            console.log("JR NOTE: applying player for escape event ", player)
            if (player.isStartingToFeelCorruption() && !player.corrupted) {
                leaving.push(player);
                removeItemOnce(location.players, player);
                removeItemOnce(game.players, player);
            }
        }
        ele.innerHTML = `${arrayToHumanSentence(leaving.map((n) => n.nameHTML()))} ${leaving.length > 1 ? "leave" : "leaves"} the mall, finally free of this nightmare. No amount of knowledge and power is worth the changes they could feel creeping into their ${leaving.length > 1 ? "bodies" : "body"}.`;

    }
}
//https://lostinzampanio.neocities.org/fanfictions/were_you_just_a_satellite




//no skill, no stats, just an incredibly rare chance to just, stumble on it
//because the mall WANTS you to find the goods you're looking for and take them back out
//its blood moving through arteries
//it craves it
//poor training team, trying to contain things inside an abnormality was such a bad idea
//but they have no choice
//zampanio associates them with the mall now
//they're lucky they can even leave it for short durations
class RandomlyFindShoppingObject extends Event {
    name = "Shopping Time!";

    //is there at least one person ready to escape?
    internalConditionCheck = (game, location) => {
        console.log("JR NOTE: todo if someone in the location has a shopping bag, increase odds of this event (the mall considers you even more a shopper), wire into stats too")
        if (location.livingNonMannequinPlayers().length > 0) {
            return game.rand.nextDouble() < 0.5;
        }
        return false;

    }

    applyResult = (game, location, parent) => {
        const ele = createElementWithClassAndParent("div", parent, "sub-story-beat");
        const shopper = game.rand.pickFrom(location.players);

        shopper.addCorruption(-13);//congrats, shoppers aren't mannequins!
        const formerNameHTML = shopper.nameHTML();
        console.log("JR NOTE: eventually expand this with alchemy traits system. Have the 'its shiny, its crystal and its a sword' quip from sburbsim.");
        const personal_adj = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, ADJ, true);
        const object = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, OBJECT, true);

        const oddsFruit = 0.05;
        if (game.rand.nextDouble() < oddsFruit) {
            const item = new Item(`${personal_adj} Harvest Fruit`, `It's a Sacred Harvest Fruit! Eating this will cause anyone to Join the Loop and learn the Secrets Under Pinning Reality. (JR NOTE: lulz they'll become wasted just like me and the blorbos)`, true)

            ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper! They cannot believe their luck when they stumble upon a ${item.name}!`;
            const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
            shopper.addItemToInventory(item, pickupEle);
        } else {
            const item = new Item(`${personal_adj} ${object}`, `It's a random item that JR hasn't fleshed out yet!`, false)

            ele.innerHTML = `The Westerville Mall has decided ${formerNameHTML} is a shopper! They stumble upon a ${item.name} at too good a deal to turn down (its a free gift!). `;
            const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
            shopper.addItemToInventory(item, pickupEle);

        }

    }

}





class YongkiKill extends Event {
    name = "Yongki Kill";

    //is there at least one person ready to escape?
    internalConditionCheck = (game, location) => {
        //you can't predict yongki, you can't stop him
        //even he can't predict or stop himself
        //a stranger even to himself
        if (location.livingNonMannequinPlayers().length > 0) {
            return game.rand.nextDouble() < 0.01;
        }
        return false;

    }

    applyResult = (game, location, parent) => {
        const ele = createElementWithClassAndParent("div", parent, "sub-story-beat");
        const redPaste = game.rand.pickFrom(location.players);

        const formerNameHTML = redPaste.nameHTML();
        //yeah sure why not, he can kill mannequins (but not corpses)
        if (redPaste.corrupted) {
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

        ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/handdrip.gif'>${formerNameHTML} encounters...<i>something</i>. A blur. A hand. They are a red smear on the ground now, in the blink of an eye.<span class="wasted-knowledge">Yongki didn't mean to do it. Humans are so fragile. He only meant to say 'hello'.</span> ${reaction}`;

    }

}




class HydrationStation extends Event {
    name = "Hydration Station";

    //is there at least one person ready to escape?
    internalConditionCheck = (game, location) => {
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

    applyResult = (game, location, parent) => {
        console.log("JR NOTE: trying to hydrate")
        const ele = createElementWithClassAndParent("div", parent, "sub-story-beat");
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
            hydration_story = ` No one is dumb enough to try drinking the Mystery Mall Fluid.`;
        }
        let dehydration_story = "";
        if (dehydrated_players.length > 0) {
            dehydrated_story = " " + arrayToHumanSentence(dehydrated_players.map((i) => i.nameHTML())) + " did not dare to drink the Mystery Mall Fluid.";
        }

        ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/upsetting_water_final.gif' >
                ${arrayToHumanSentence(players.map((i) => i.nameHTML()))} ${players.length > 1 ? "are" : "is"} exhausted from a long day shopping and the Westerville Mall knows how to treat its shoppers right. 
        They find an incredibly tempting HYDRATION STATION and a nice bench to rest their  feet on.${hydration_story}${dehydration_story} `;

    }

}




const generalEvents = [new YongkiKill(), new HydrationStation]