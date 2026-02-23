

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
    theme_locations[BAKERY].push(makeGenericThemedLocation(rand, BAKERY, undefined, undefined, [devonaEvent, nevilleEncounter])); //DEVONA AND NEVILLE
    theme_locations[BURGERS].push(makeGenericThemedLocation(rand, BURGERS)); //CFO
    theme_locations[BREAKFAST].push(makeGenericThemedLocation(rand, BREAKFAST, undefined, [eyeKillerGetsYou])); //captain
    theme_locations[CHICKEN].push(makeGenericThemedLocation(rand, CHICKEN)); // camille
    theme_locations[COFFEE].push(makeGenericThemedLocation(rand, COFFEE, undefined, undefined, [wibbysConfession])); //WIBBY
    theme_locations[DESSERTS].push(makeGenericThemedLocation(rand, PIZZA)); //YONGKI
    theme_locations[DINER].push(makeGenericThemedLocation(rand, DINER)); //HOON
    theme_locations[ITALIAN].push(makeGenericThemedLocation(rand, ITALIAN)); //JOHN
    theme_locations[MEXICAN].push(makeGenericThemedLocation(rand, MEXICAN)); //INTERN
    theme_locations[PIZZA].push(makeGenericThemedLocation(rand, PIZZA)); //whole training team
    theme_locations[PREMIUM].push(makeGenericThemedLocation(rand, PREMIUM)); //K
    theme_locations[SALAD].push(makeGenericThemedLocation(rand, SALAD)); //doc slaughter
    theme_locations[SANDWICHES].push(makeGenericThemedLocation(rand, SANDWICHES)); //ria conspiracy boarding on is a hotdog a sandwich
    theme_locations[SEAFOOD].push(makeGenericThemedLocation(rand, SEAFOOD, undefined, undefined, [vikEncounter])); //vik
    theme_locations[SUSHI].push(makeGenericThemedLocation(rand, SUSHI, undefined, undefined, [parkerEncounter])); //parker
    //"rgba(132,90,20)"
    //dont forget these are ARRAYS we are pushing into, can have more than one location per theme
    theme_locations[HUNTING].push(makeGenericThemedLocation(rand, HUNTING, "Armory", "rgba(133,55,207)", [eyeKillerGetsYou, devonaEvent, nevilleEncounter])); ////eye killer (this is NOT chill btw, you're literally a cultists)
    theme_locations[KILLING].push(makeGenericThemedLocation(rand, KILLING, "Butcher", "rgba(133,55,207)", [parkerEncounter, eyeKillerGetsYou])); ////eye killer (this is NOT chill btw, you're literally a cultists)
    theme_locations[ART].push(makeGenericThemedLocation(rand, ART, "Craft Supply", "rgba(133,55,207)", [eyeKillerGetsYou])); ////eye killer (this is NOT chill btw, you're literally a cultists)
    theme_locations[TIME].push(makeGenericThemedLocation(rand, TIME, "Antiques", "rgba(133,55,207)", [eyeKillerGetsYou])); ////eye killer (this is NOT chill btw, you're literally a cultists)

    theme_locations[BURIED].push(makeGenericThemedLocation(rand, BURIED, "Mining", "rgba(132,90,20)", [parkerEncounter]));
    theme_locations[MUSIC].push(makeGenericThemedLocation(rand, MUSIC, "Records", "rgba(132,90,20)", [parkerEncounter]));
    theme_locations[SPYING].push(makeGenericThemedLocation(rand, SPYING, "Cameras", "rgba(132,90,20)", [parkerEncounter, devonaEvent]));
    theme_locations[SPACE].push(makeGenericThemedLocation(rand, SPACE, "Planetarium", "rgba(132,90,20)", [parkerEncounter]));
    //i think its funny that unless you know certain things about wibby you'd be SHOCKED he's in the stealing theme. he works hard so he doesn't look like a petty thief, lol
    theme_locations[STEALING].push(makeGenericThemedLocation(rand, STEALING, "Bank", "rgba(132,90,20)", [wibbysConfession, parkerEncounter]));



    theme_locations[CENSORSHIP].push(makeGenericThemedLocation(rand, CENSORSHIP, "[REDACTED]", "rgba(0,0,0)", [vikEncounter]));
    theme_locations[DECAY].push(makeGenericThemedLocation(rand, DECAY, "Rot", "rgba(0,0,0)", [vikEncounter]));
    theme_locations[OBFUSCATION].push(makeGenericThemedLocation(rand, OBFUSCATION, "Secrets", "rgba(0,0,0)", [vikEncounter, nevilleEncounter]));
    theme_locations[SERVICE].push(makeGenericThemedLocation(rand, SERVICE, "Service", "rgba(0,0,0)", [vikEncounter, wibbysConfession]));
    theme_locations[MAGIC].push(makeGenericThemedLocation(rand, MAGIC, "Tricks", "rgba(0,0,0)", [vikEncounter]));

    theme_locations[DARKNESS].push(makeGenericThemedLocation(rand, OBFUSCATION, "Darkroom", "rgba(0,0,0)", [vikEncounter, nevilleEncounter]));
    theme_locations[MATH].push(makeGenericThemedLocation(rand, OBFUSCATION, "Calculators", "rgba(0,0,0)", [nevilleEncounter]));

    theme_locations[LIGHT].push(makeGenericThemedLocation(rand, LIGHT, "Lighting", "rgba(255,255,255)", [devonaEvent, wibbysConfession]));

    theme_locations[LONELY].push(makeGenericThemedLocation(rand, LONELY, "Convenience", "rgba(167,199,203)", [wibbysConfession]));
    theme_locations[FREEDOM].push(makeGenericThemedLocation(rand, FREEDOM, "Birds", "rgba(167,199,203)", [wibbysConfession]));
    theme_locations[ANGELS].push(makeGenericThemedLocation(rand, ANGELS, "Scripture", "rgba(167,199,203)", [wibbysConfession]));
    theme_locations[KNOWING].push(makeGenericThemedLocation(rand, KNOWING, "Books", "rgba(167,199,203)", [wibbysConfession]));
    //theres something missing inside Witherby, and he searched and searched for it in clubs, in other men's beds, in his own solitude, but somehow when he finally found it, he realized it was the found family he has with the training team all along
    theme_locations[QUESTING].push(makeGenericThemedLocation(rand, QUESTING, "Escape Room", "rgba(167,199,203)", [wibbysConfession]));


    theme_locations[TIME].push(makeInfiniteParkingGarageToClone(TIME)) //leehunter
    theme_locations[SPACE].push(makeInfiniteParkingGarageToClone(SPACE)) //river
    theme_locations[ANGER].push(makeInfiniteParkingGarageToClone(ANGER)) //hoon

}

//there is no way out.
//period
//the only way parker got out was dying to river
//http://farragofiction.com/ParkerLotLost/
/*
i think its kinda fun to be treating my own branch like i treated homestuck when making sburbsim
looking for evidence of how things work
twisting it and tweaking it where needed to make it easier to code
*/
const makeInfiniteParkingGarageToClone = (theme_key, event_override = []) => {

    //http://farragofiction.com/RadioTranscript/
    /*our only non aleph parking lot native. hoon isn't going to end the world
    yeah you'll probably die but... just you, no one else*/
    const makeHoonEvent = () => {

        const audioOptionsRaw = `http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/warning.mp3
http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/terminate_them.mp3
http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/supress_it_immediately.mp3
http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/second_alert.mp3
http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/neutralize_the_target.mp3
http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/NORTH/NORTH/NORTH/audio/fx/HoonVoiceWorkByWisp/kill_it_now.mp3`;
        const audioOptions = audioOptionsRaw.split("\n");

        const conditionCheck = (game, location) => {
            /*she cheerfully kills mannequins and whatever else too
            if you are currently not dead...you will be
            though i think she shouldn't be able to kill [CENSORED] spawn
            i think also she mostly only 1v1's people
            cuz the radio just lets her know when its time to KILL
            not which targets are valid
            so...if you're in a group
            she avoids you
            
            */
            if (location.livingPlayers().length === 1) {
                return game.rand.nextDouble() > 0.95;
            }
            return false;
        }

        const applyResult = (game, location, parent, me) => {

            const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

            const h3 = createElementWithClassAndParent("h3", cont);
            h3.innerText = "Important Event: " + this.name;
            const target = location.livingPlayers()[0];
            const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

            /*the radio has...really strict ideas about who needs to die
            theres no such thing as being only a "little" monsterous to it*/
            if (target.monster_rating > 0 || target.sin_array.length > 0) {
                me.chosen_name = "Radio Kill"
                const explanation = createElementWithClassAndParent("div", ele, "sub-story-beat");
                explanation.innerHTML = `${target.nameHTML()} encounters a strange bandaged figure, quietly listening to a radio. It blurts out terrifying static <audio controls>
  <source src="${game.rand.pickFrom(audioOptions)}" type="audio/mpeg">
</audio> and the figure lurches to their feet, lassoing a noose around ${target.nameHTML()}'s neck. They struggle some, but ultimately, everything goes dark, and they die.`;
                target.kill("covered in deep purple and red bruises around their neck halloing a thick rope tied around it, thick scratches from their fingernails having tried to pry it off in time")
            } else {
                const explanation = createElementWithClassAndParent("div", ele, "sub-story-beat");
                target.preparedToKill = true; //its quiet. you barely even notice the change inside you. but you're laced with violence. ready to leave this parking lot and kill with little rhyme or reason, the radio isn't safe
                explanation.innerHTML = `${target.nameHTML()} encounters a strange bandaged figure, quietly listening to a radio. With a husky voice, she offers to let them listen along for a while. Something within ${target.nameHTML()}'s heart shifts to a new frequency, but they can't explain how.`;

                renderRadioCipherStory(getNextStory(!game.eatWastesAutomatically), ele);
            }


        }



        return makeEventSubType(`Hoon Encounter`, conditionCheck, applyResult);
    }

    //http://farragofiction.com/ASecondPersonalTranscript/
    const makeLeeHunterEvent = () => {

        const conditionCheck = (game, location) => {
            if (location.livingNonMannequinPlayers().length > 0) {
                return game.rand.nextDouble() > 0.99;
            }
            return false;
        }

        const applyResult = (game, location, parent, me) => {
            /*
 the parking lot crew don't innately care about containing anything
 though hoon will do a weird facimile of "discipline" that was her previous job
 but RIA cares and she's the Conductor of the Silent Orchestra so....
 leehunter want you dead. they're doing it for her.
 with river it was nothing personal, just an accident
 with leehunter...they are making sure you're dead unless they noticed you from across the room and like your vibes
 (by which i mean, want you to join their polycule, in which case you're not a cultist anymore because the hive mind isn't a cultist so everyone wins)
*/
            const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

            const h3 = createElementWithClassAndParent("h3", cont);
            h3.innerText = "Important Event: " + this.name;
            const possible_targets = location.livingNonMannequinPlayers()
            const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
            const to_kill_old = [];
            const to_kill_young = [];
            const to_recruit = [];
            for (let player of possible_targets) {
                if (!player.musical && !player.censored) {
                    if (player.stats[TONGUE_METAL_STAT] > HIGH_STAT_VALUE) { //you've enchanted them, they simply must have you, join the Westerville Polycule please
                        to_recruit.push(player);
                    } else {
                        if (game.rand.nextDouble() > 0.5) {
                            to_kill_old.push(player);
                        } else {
                            to_kill_young.push(player);
                        }
                    }

                }
            }

            ele.innerHTML = `<img src='http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/istockphoto-1731602083-612x612-moshed-01-03-10-46-51-827.gif'>Two indistinct figures dressed somewhere between an Orchestra and a Marching Band plays a beautiful song for ${arrayToHumanSentence(possible_targets.map((e) => e.nameHTML()))} from every car in the Parking Lot, echoing from all directions at once. It cannot be stopped.`;
            if (to_recruit.length > 0) { //you've enchanted them, they simply must have you, join the Westerville Polycule please
                for (player of to_recruit) {
                    player.becomeMusical(game);//you've enchanted them, they simply must have you, join the Westerville Polycule please
                    player.stats = { ...BASELINE_METAL_OBJECT }; //you're part of the hivemand now, completely average
                }
                ele.innerHTML += `<br><br>${arrayToHumanSentence(to_recruit.map((e) => e.nameHTML()))} feels their flesh and clothing become one with the Orchestra. Strange new thoughts and feelings enter their mind. They love their new family. They need to kill anyone who would try to take Fruit out of the Westerville Mall, because it would make their Conductor sad if it left. The universe might end if people eat too much Harvest Fruit. Protecting the universe is important. The Echidna is important. The Conductor is important. Music is important..........`;
                game.event_list.push("Orchestral Bliss");

            }

            for (player of to_kill_old) {
                player.kill("wrinkled into an ancient mummy with whispy grey hair and thin, dessicated skin")
            }
            if (to_kill_old.length > 0) {
                game.event_list.push("Orchestral Trumpet");

                ele.innerHTML += `<br><br>The trumpet's clarion call rings in ${arrayToHumanSentence(to_kill_old.map((e) => e.nameHTML()))} head as they rapidly gets older and older until they finally collapse to the ground, dead.`;
            }

            for (player of to_kill_young) {
                player.kill("shrunk away to a tiny, oozing fetus, pitifully squashed into the ground")
            }

            if (to_kill_young.length > 0) {
                game.event_list.push("Orchestral Piano");

                ele.innerHTML += `<br><br>The soothing piano calms ${arrayToHumanSentence(to_kill_young.map((e) => e.nameHTML()))} as they rapidly get younger and younger until they finally lose their ability to survive outside a womb that has long forgotten them, and take their final breath in a macabre inverse of their first.`;

            }
        }






        return makeEventSubType(`LeeHunter Encounter`, conditionCheck, applyResult);
    }

    const makeRiverEvent = () => {

        const conditionCheck = (game, location) => {
            if (location.livingNonMannequinPlayers().length > 0) {
                return game.rand.nextDouble() > 0.99;
            }
            return false;
        }

        const applyResult = (game, location, parent, me) => {

            /*much like yongki, there is nothing you can do to stop this
    river doesn't even realize you're here
    you can not be fast enough or clever enough
    you are simply crushed like an ant
    */
            const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

            const h3 = createElementWithClassAndParent("h3", cont);
            h3.innerText = "Important Event: " + this.name;
            const living = location.livingPlayers()
            const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");
            ele.innerHTML = `${arrayToHumanSentence(living.map((n) => n.nameHTML()))} watch in horror as a viscous pink goo begins bubbling up from everywhere and nowhere.`;
            location.river = true;


        }

        return makeEventSubType(`River Encounter`, conditionCheck, applyResult);
    }
    //in order of parker finding them
    event_override.push(makeLeeHunterEvent(), makeHoonEvent(), makeRiverEvent());

    //name, longer_name, theme_keys, row, col, events, color
    const ret = new Location("Parking Lot", "Infinite Parking Lot", [theme_key], 0, 0, event_override, "rgba(255,255,255)");
    ret.infinite = true;

    return ret;
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

    const applyResult = (game, location, parent, me) => {
        const cont = createElementWithClassAndParent("div", parent, "sub-story-beat");

        const h3 = createElementWithClassAndParent("h3", cont);
        h3.innerText = "Important Event: " + this.name;

        const ele = createElementWithClassAndParent("div", cont, "sub-story-beat");

        //yes even if the mall was trying to give a human something
        //a mannequin can take it
        const shopper = game.rand.pickFrom(location.livingPlayers());
        shopper.addCorruption(-13);//congrats, shoppers aren't mannequins!
        const personal_adj = game.corporateMandatedLove ? game.rand.pickFrom(["Heart-Shaped", "Love-Filled", "Valentine's"]) : pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, COMPLIMENT, true);
        const object = pickARandomThemeFromListAndGrabKey(game.rand, location.theme_keys, OBJECT, true);

        const item = new Item(`${personal_adj} ${object}`, `It's clearly labeled as from the ${location.longer_name}! ${shopper.nameHTML()} bought this originally!`, false)
        if (item.isFruit) {
            me.chosen_name = "Random Harvest Fruit Find!"
        }
        if (shopper.fleeing) {
            me.chosen_name = "Late With Starbucks";
            ele.innerHTML = `${shopper.nameHTML()} is in a hurry to escape this terrifying mall, but something compels them to take to the time to stop and purchases one ${item.name} from ${location.longer_name}! Luckily the Westerville Mall never fully understood what currency was, so they kinda just pick it up and take it! `;

        } else if (shopper.corrupted) {
            me.chosen_name = "Mannequin Shopper"
            ele.innerHTML = `${shopper.nameHTML()} is asked by the Westerville Mall to begin showcasing ${item.name} from ${location.longer_name}!  `;

        } else {
            ele.innerHTML = `${shopper.nameHTML()} dutifully performs the role of Shopper and purchases one ${item.name} from ${location.longer_name}! Luckily the Westerville Mall never fully understood what currency was, so they kinda just pick it up and take it! `;

        }
        const pickupEle = createElementWithClassAndParent("span", ele, "sub-story-beat");
        shopper.addItemToInventory(game, item, pickupEle);


    }



    const themeShopping = makeEventSubType(`${name} Shopping!`, conditionCheck, applyResult);
    event_override.push(themeShopping);
    return new Location(name, `${object} ${location}`, [theme_key], right_row, right_col, event_override, color_override ? color_override : "rgba(236,185,10)");

}

