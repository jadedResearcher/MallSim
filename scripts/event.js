/*
Every event knows if its been triggered and knows how to apply its results (just like sburbsim scenes)

some events are owned by specific locations (and can only trigger inside them) some are general purpose and any location can see if it triggers
*/

//some events should embed videos to play
//or pics of the blorbos

class Event {

    name = "Default Event";

    //sub classes will override this, that way checkconditions can be kept in this class unchanged
    internalConditionCheck = (location) => {
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
        if (this.internalConditionCheck(location)) {
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
    internalConditionCheck = (location) => {
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
        ele.innerHTML = `${arrayToHumanSentence(leaving.map((n) => n.nameHTML()))} ${leaving.length > 1 ? "leave" : "leaves"} the mall, finally free of this nightmare. No amount of knowlege and power is worth the changes they could feel creeping into their ${leaving.length > 1 ? "body" : "bodies"}.`;

    }
}
//https://lostinzampanio.neocities.org/fanfictions/were_you_just_a_satellite