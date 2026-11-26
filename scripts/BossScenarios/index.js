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
const clearPreviousScenario = (game)=>{
    //clear out generalEvents
    generalEvents= [];
    //clear out all existing locations
    for (let row of game.map) {
            for (let item of row) {
                if (item) { //its not empty space
                    item.events = []; //be purged
                }
            }
        }
    //clear out themeLocations events
    //each item in theme_locations is an array of locations
    for(let loc_array of Object.values(theme_locations)){
        for(let loc of loc_array){
            loc.events = []
        }
    }
    //all that remains should be non events like hanging out and shopping. normal mall stuff.
}

const injectNewScenario = ()=>{

}