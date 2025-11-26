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

        ele.innerHTML = `${formerNameHTML} encounters...<i>something</i>. A blur. A hand. They are a red smear on the ground now, in the blink of an eye.<span class="wasted-knowledge">Yongki didn't mean to do it. Humans are so fragile. He only meant to say 'hello'.</span> ${reaction}`;

    }

}




const generalEvents = [new YongkiKill()]