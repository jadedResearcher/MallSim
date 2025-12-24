

/*
important note: if a location has a food theme,
it has custom child rules (more food)
because food courts cluster up on each other
*/

/*
'Bakery,Breakfast,Burgers,Chicken,Coffee,Desserts,Diner,Italian,Mexican,Pizza,Premium,Salad,Sandwiches,Seafood,Sushi,waste,technology,art,space,time,flesh,buried,stealing,freedom,fire,lonely,ocean,science,math,twisting,death,apocalypse,service,family,magic,angels,light,hunting,clowns,plants,decay,choices,zap,love,soul,anger,web,royalty,endings,knowing,guiding,crafting,addiction,spying,healing,dolls,obfuscation,censorship,darkness,killing,music,defense,questing,bugs,language'

*/

//keyed by theme
const theme_locations = {}

//game calls this, not page
/*
NOTE: these are TEMPLATE locations
you need to clone them to move forward and give them the correct row/col etc so they can calculate their corruption level
*/
const initThemeLocations = (rand) => {
    console.warn("JR NOTE: don't forget to wire up template locations with custom events")
    //at least init
    for (let key of Object.keys(all_themes)) {
        theme_locations[key] = [];
    }
    /*
    the food locations should be humanizing moments
    though they should have a "now you fucked up" state
    depending on your stats (for example, if you have really high arm and low everythign else, you might kill devona before you realize she's not a threat)
    and that would add neville to the event list, with a specific target of YOU
    */
    theme_locations[BAKERY].push(makeGenericThemedLocation(rand, BAKERY)); //DEVONA AND NEVILLE
    theme_locations[BURGERS].push(makeGenericThemedLocation(rand, BURGERS)); //CFO
    theme_locations[BREAKFAST].push(makeGenericThemedLocation(rand, BREAKFAST)); //captain
    theme_locations[CHICKEN].push(makeGenericThemedLocation(rand, CHICKEN)); // camille
    theme_locations[COFFEE].push(makeGenericThemedLocation(rand, COFFEE)); //WIBBY
    theme_locations[DESSERTS].push(makeGenericThemedLocation(rand, PIZZA)); //YONGKI
    theme_locations[DINER].push(makeGenericThemedLocation(rand, DINER)); //HOON
    theme_locations[ITALIAN].push(makeGenericThemedLocation(rand, ITALIAN)); //JOHN
    theme_locations[MEXICAN].push(makeGenericThemedLocation(rand, MEXICAN)); //INTERN
    theme_locations[PIZZA].push(makeGenericThemedLocation(rand, PIZZA)); //whole training team
    theme_locations[PREMIUM].push(makeGenericThemedLocation(rand, PREMIUM)); //K
    theme_locations[SALAD].push(makeGenericThemedLocation(rand, SALAD)); //doc slaughter
    theme_locations[SANDWICHES].push(makeGenericThemedLocation(rand, SANDWICHES)); //ria conspiracy boarding on is a hotdog a sandwich
    theme_locations[SEAFOOD].push(makeGenericThemedLocation(rand, SEAFOOD)); //vik
    theme_locations[SUSHI].push(makeGenericThemedLocation(rand, SUSHI)); //parker

    //dont forget these are ARRAYS we are pushing into, can have more than one location per theme
    theme_locations[HUNTING].push(makeGenericThemedLocation(rand, HUNTING, "Armory", "rgba(133,55,207)")); ////eye killer (this is NOT chill btw, you're literally a cultists)


}

//customize this later, this just speeds up part of the process
const makeGenericThemedLocation = (rand, theme_key, location_override, color_override, event_override = []) => {
    //we aren't putting them anywhere yet, we're making a template
    const right_col = 0;
    const right_row = 0;
    const object = titleCase(all_themes[theme_key].pickPossibilityFor(OBJECT, rand));
    const name = location_override ? location_override : titleCase(theme_key);

    const location = location_override ? location_override : titleCase(all_themes[theme_key].pickPossibilityFor(LOCATION, rand));

    const conditionCheck = (game, location) => {
        if (location.livingNonMannequinPlayers().length > 0) {
            return game.rand.nextDouble() > 0.75;
        }
        return false;
    }

    const applyResult = (game, location, parent) => {
        const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

        const h3 = createElementWithClassAndParent("h3", cont);
        h3.innerText = "Important Event: " + this.name;

        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

        //yes even if the mall was trying to give a human something
        //a mannequin can take it
        const shopper = game.rand.pickFrom(location.livingPlayers());
        shopper.addCorruption(-13);//congrats, shoppers aren't mannequins!
        const personal_adj = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, COMPLIMENT, true);
        const object = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, OBJECT, true);

        const item = new Item(`${personal_adj} ${object}`, `It's from the ${location.longer_name}!`, false)
        ele.innerHTML = `${shopper.nameHTML()} dutifully performs the role of Shopper and purchases one ${item.name} from ${location.longer_name}! Luckily the Westerville Mall never fully understood what currency was, so they kinda just pick it up and take it! `;
        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
        shopper.addItemToInventory(item, pickupEle);


    }



    const themeShopping = makeEventSubType(`${name} Shopping!`, conditionCheck, applyResult);
    event_override.push(themeShopping);
    return new Location(name, `${object} ${location}`, [theme_key], right_row, right_col, event_override, color_override ? color_override : "rgba(236,185,10)");

}



