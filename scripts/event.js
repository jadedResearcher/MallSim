/*
Every event knows if its been triggered and knows how to apply its results (just like sburbsim scenes)

some events are owned by specific locations (and can only trigger inside them) some are general purpose and any location can see if it triggers
*/

//some events should embed videos to play
//or pics of the blorbos

class Event {

    name = "Default Event";

    internalConditionCheck = (location) => {
        return false;
    }

    /*
        a location knows who is inside it and what flags have been set on it
        thats all an event needs to know to trigger or not

        if it IS triggered, it will call applyResult with the location and the parent to render to
        and return true, otherwise it will return false;

        async just in case
    */
    checkConditions = async (location, parentEle) => {
        if (internalConditionCheck(location)) {
            await this.applyResult(location, parentEle);
            return true;
        }
        return false;
    }

    //no event can effect more than one location at a time. 
    //though i suppose you can reach outside players through the relationship they have with those inside
    //actually the horror writes itself
    applyResult = async (location, parent) => {
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
        let ret = false;
        for (let person in location.players) {
            if (person.isStartingToFeelCorruption() && !person.corrupted) {

            }
        }
        return ret;
    }
}
//https://lostinzampanio.neocities.org/fanfictions/were_you_just_a_satellite