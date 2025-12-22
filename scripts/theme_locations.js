

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
    theme_locations[BAKERY] = makeGenericThemedLocation(rand, BAKERY); //DEVONA AND NEVILLE
    theme_locations[BURGERS] = makeGenericThemedLocation(rand, BURGERS); //CFO
    theme_locations[BREAKFAST] = makeGenericThemedLocation(rand, BREAKFAST); //captain
    theme_locations[CHICKEN] = makeGenericThemedLocation(rand, CHICKEN); // camille
    theme_locations[COFFEE] = makeGenericThemedLocation(rand, COFFEE); //WIBBY
    theme_locations[DESSERTS] = makeGenericThemedLocation(rand, PIZZA); //YONGKI
    theme_locations[DINER] = makeGenericThemedLocation(rand, DINER); //HOON
    theme_locations[ITALIAN] = makeGenericThemedLocation(rand, ITALIAN); //JOHN
    theme_locations[MEXICAN] = makeGenericThemedLocation(rand, MEXICAN); //INTERN
    theme_locations[PIZZA] = makeGenericThemedLocation(rand, PIZZA); //whole training team
    theme_locations[PREMIUM] = makeGenericThemedLocation(rand, PREMIUM); //K
    theme_locations[SALAD] = makeGenericThemedLocation(rand, SALAD); //doc slaughter
    theme_locations[SANDWICHES] = makeGenericThemedLocation(rand, SANDWICHES); //ria conspiracy boarding on is a hotdog a sandwich
    theme_locations[SEAFOOD] = makeGenericThemedLocation(rand, SEAFOOD); //vik
    theme_locations[SUSHI] = makeGenericThemedLocation(rand, SUSHI); //parker

}

//customize this later, this just speeds up part of the process
const makeGenericThemedLocation = (rand, theme_key) => {
    //we aren't putting them anywhere yet, we're making a template
    const right_col = 0;
    const right_row = 0;
    const object = titleCase(all_themes[theme_key].pickPossibilityFor(OBJECT, rand));
    const location = titleCase(all_themes[theme_key].pickPossibilityFor(LOCATION, rand));

    return new Location(titleCase(theme_key), `${object} ${location}`, [theme_key], right_row, right_col, [], "rgba(236,185,10)");

}

