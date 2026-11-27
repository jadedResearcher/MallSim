/*
Did you think the Boss was going to stay in a coma forever?
In every loop?

In strange eons even death may die, you thought Zampanio would keep him a puppet of his kid sibling?

No.

The Boss is begining to wake. 

With only the vaguest understanding of disliking the Cult of the Candy Harvest, of disliking the Fruit of Gnosis that is fucking everything up... he attacks the mall.

Half dreaming, but fully in tune with his Web Aspect.

He doesn't care about the difference between the Mall's Residents and the Invaders.

To survive, all will have to band together against him.

NOTE: this replaces all events (global and specific) with this new set.

each boss scenario has its own file and will use this file to handle setup and teardown.
*/

//NOTE: this can not be undone. this will even unwire things like the meeting blorbos in their locations
const clearPreviousScenario = (game) => {
    //clear out generalEvents
    generalEvents = [];
    //clear out all existing locations
    for (let row of game.map) {
        for (let item of row) {
            if (item) { //its not empty space
                item.events = item.events.filter((e) => e.name.includes("Shopping") || e.name.includes("Hydration") || e.name.includes("Become A Mannequin"))
            }
        }
    }
    //clear out themeLocations events
    //each item in theme_locations is an array of locations
    for (let loc_array of Object.values(theme_locations)) {
        for (let loc of loc_array) {
            loc.events = loc.events.filter((e) => e.name.includes("Shopping") || e.name.includes("Hydration") || e.name.includes("Become A Mannequin"))
        }
    }
    //all that remains should be non events like hanging out and shopping and becoming a constantly silently screaming mannequin. normal mall stuff.
}


//no matter what you inject, basic things like shopping, hydration, turning into a mannequin (and camille stabbing you if you get harvest fruit sometimes) will happen
const injectNewScenario = (scenario) => {
    console.log("JR NOTE: injecting new scenario: ", scenario)
    generalEvents = scenario.generalEvents;
    for (let row of game.map) {
        for (let item of row) {
            if (item) { //its not empty space
                item.events = item.events.concat(scenario.generalEvents);
            }
        }
    }

    for (let [key, value] of Object.entries(scenario.theme_events)) {
        console.log("JR NOTE: processing scenario theme_events of", key, value)
        if (theme_locations[key]) {
            console.log("JR NOTE: trying to add a new event of key", key, value)
            //all locations will take this
            for (let loc of theme_locations[key]) {
                loc.events = loc.events.concat(value);
            }
        }
    }
}

const testStartingNewScenario = () => {
    //reminder that hashmaps use string literal, so BURIED is "BURIED", not the string in the const BURIED
    const testScenario = new Scenario("A test scenario has started. Oops all guns.", [parkerEncounter], { 'buried': parkerEncounter });
    clearPreviousScenario(game);
    injectNewScenario(testScenario);
}


//every scenario has its own general events and theme_locations, as well as its intro text
class Scenario {
    introText = "A generic new scene has started."
    generalEvents = []; //array of events
    theme_events = {}; //theme key , array of events pairs (will be injected into theme locations)
    constructor(introText, generalEvents, theme_events) {
        this.introText = introText;
        this.generalEvents = generalEvents;
        this.theme_events = theme_events;
    }

}