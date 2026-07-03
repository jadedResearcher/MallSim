
//immediately envoked function does't run into namespacign issues
let debug_maze_data;
(async () => {
    initThemes();
    //key is url, value is domain
    let nodes = {};
    //array of from, to pairs
    let edges = [];

    //this used to be a big picture of my horridor that covered up the password field
    //but now its "are you sure this was here before"
    //because its too funny to have this password instead tie to yet another maze
    //hopefully one so deep you forget you were in mallsim
    //much like some of the rooms of bathroom sim
    resultsEle.innerHTML = `    `;

    try {
        const response = await fetch('https://laughing.observer/DataSets/zampanio_urlmap_v8_pruned.json');

        // Always check if the HTTP status code is successful (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parses JSON response body
        if (data && data.nodes) {
            for (let node of data.nodes) {
                nodes[node.url] = node.domain;
            }
        }
        edges = data.edges;

        debug_maze_data = { nodes: nodes, edges: edges };
    } catch (error) {
        console.error('Network or parsing error:', error);
    }

    //its directed so you can't go back (just like gopher)
    const getEdgesFromNode = (full_url_of_node) => {
        return edges.filter((e) => e.from === full_url_of_node);
    }

    //okay fine you can go back if its a dead end, because theres a lot of them and also maybe multiple things point TO you
    const getEdgesToNode = (full_url_of_node) => {
        return edges.filter((e) => e.to === full_url_of_node);
    }

    const getRandomDoorSense = (room, theme_keys, rand) => {
        if (room === ab_room) {
            return "a superior robot can be heard quietly rapping within."
        }

        const themes = [all_themes[theme_keys[0]], all_themes[theme_keys[1]]];

        const getKey = (key) => {
            return rand.pickFrom(themes).pickPossibilityFor(key, rand);
        }
        const smell = getKey(SMELL);
        const taste = getKey(TASTE);
        const sound = getKey(SOUND);
        const feeling = getKey(FEELING);
        const person = getKey(PERSON);

        const object = getKey(OBJECT);
        const location = getKey(LOCATION);

        const compliment = getKey(COMPLIMENT);
        const insult = getKey(INSULT);
        const adj = rand.pickFrom([compliment, insult]);


        const optionsRaw = `It smells like ${smell}.
        It smells like ${smell}.
        Where does it lead?
        It beckons to you.
        The air feels ${adj} around it.
        It's ${feeling}.
        A small picture of a symbolic ${object} is etched onto it.
        Its...${insult}. Somehow you can just feel it.
        A poster of a strange ${person} is plastered on it.
        Is it made of ${feeling}?
        Through the peephole you see a ${adj} ${location}.
        This door seems to be made of ${feeling}.
        The faint sound of ${sound} is coming from the other side.
        Your tongue feels heavy with the taste of ${taste} as you approach.
        Why does the door smell like ${smell}?
        `;

        const options = optionsRaw.trim().split("\n");
        return rand.pickFrom(options);
    }

    const getRandomRoomSense = (themes, rand) => {

        const getKey = (key) => {
            return rand.pickFrom(themes).pickPossibilityFor(key, rand);
        }
        const smell = getKey(SMELL);
        const taste = getKey(TASTE);
        const sound = getKey(SOUND);
        const feeling = getKey(FEELING);
        const effects = getKey(EFFECTS);
        const person = getKey(PERSON);

        const object = getKey(OBJECT);
        const location = getKey(LOCATION);

        const compliment = getKey(COMPLIMENT);
        const insult = getKey(INSULT);
        const adj = rand.pickFrom([compliment, insult]);


        const optionsRaw = `It smells like ${smell}.
        It smells like ${smell}.
        The air feels heavily ${adj} inside.
        Everything is made of ${feeling}.
        Drawings of ${compliment} ${object} and ${insult} ${location} are scrawled every so often on the walls.
        Its...${insult} in here. Somehow you can just feel it.
        A poster of a strange ${person} is plastered on the wall.
        Is it made of ${feeling}?
        There is a large painting of the ${adj} ${location}.
        The walls seem to be made of ${feeling}.
        The faint sound of ${sound} is coming from the center of the room.
        Your tongue feels heavy with the taste of ${taste} as you step inside.
        Why do the walls smell like ${smell}?
        `;

        const options = optionsRaw.trim().split("\n");
        return rand.pickFrom(options);
    }


    const getRandomHallSense = (themes, rand) => {

        const getKey = (key) => {
            return rand.pickFrom(themes).pickPossibilityFor(key, rand);
        }
        const smell = getKey(SMELL);
        const taste = getKey(TASTE);
        const sound = getKey(SOUND);
        const feeling = getKey(FEELING);
        const effects = getKey(EFFECTS);
        const person = getKey(PERSON);

        const object = getKey(OBJECT);
        const location = getKey(LOCATION);

        const compliment = getKey(COMPLIMENT);
        const insult = getKey(INSULT);
        const adj = rand.pickFrom([compliment, insult]);
        const monster_desc = getKey(MONSTER_DESC);


        const optionsRaw = `It smells like ${smell}.
        It smells like ${smell}.
        The air feels ${adj} inside.
        Almost like a dream, ${effects}.
        The faint sound of ${sound} is coming from the far end.
        Why do the walls smell like ${smell}?
        Far away you see a monster, ${monster_desc.toLowerCase()} It quickly ducks into one of the many doors.
        `;

        const options = optionsRaw.trim().split("\n");
        return rand.pickFrom(options);
    }



    //figures out what edges it has and makes a room for it
    const renderOneNode = (room, summarize = false) => {
        if (!summarize) {
            console.log("JR NOTE: You have arrived in " + room);

            resultsEle.innerHTML = "DEBUG: " + room;
        }

        if (!nodes[room]) {
            return voidRoom();
        }
        //i have two pieces of data for each room, use each to get a theme
        const multiplier = 1300; //regular string to seed results in not enough variation
        const rand2 = new SeededRandom(stringtoseed(room) * multiplier);
        const rand1 = new SeededRandom(stringtoseed(nodes[room]) * multiplier);

        const omniRand = new SeededRandom(stringtoseed(room) + stringtoseed(nodes[room]));
        const theme_keys = [rand1.pickFrom(getAllThemeKeysMinusFood()), rand2.pickFrom(getAllThemeKeysMinusFood())];
        if (summarize) {

            //lets doors be different from each other
            return getRandomDoorSense(room, theme_keys, omniRand);
        } else {
            const entryPhrase = `You step through a door, ${getRandomDoorSense(room, theme_keys, omniRand).toLowerCase()}<br><Br>`;
            //i will never forget strong bads text adventure game with obvious exists being like, north, south and DENNIS
            let obvious_exits = getEdgesFromNode(room).map((e) => e.to);
            obvious_exits = obvious_exits.concat(getEdgesToNode(room).map((e) => e.from));

            if (room === ab_room) {
                abRoom(obvious_exits, entryPhrase)
            } else {
                themedRoom(theme_keys, obvious_exits, omniRand, entryPhrase)

            }
        }
    }

    const voidRoom = () => {
        const container = createElementWithClassAndParent("div", resultsEle);
        container.style.cssText = `
        background: url(http://farragofiction.com/errors/sim/images/copypasta_pl.png);
        container.style.padding = "31px";
        height: 100%;
        width: 100%;
        position: fixed;
        top:0px;
        left: 0px;
        z-index: 999;
        color: white;`;
        container.innerHTML = `welcome to the void
        <br>
        <br>
        its been interesting watching you
        <br><br>
        you remind me of someone
        <br><br>
        from long ago...
        <br><br>
        im sorry you got stuck here
        <br><br>
        you must have tried to get somewhere impossible
        <br><Br>
        its not the end of the world
        <br><br>
        believe me
        <br><br>
        i don't really have a way to bring you back anywhere in the maze
        <br><br>
        that's....that's not really my thing.
        <br><br>
        but maybe you want to feel inspired?
        <br><br>
        <a title='remember me, Observer, remember me as something other than a mute Witness to this story' href ='http://farragofiction.com/TheInternOpensHisEyes/'>Goodbye</a>
        <br><br>
        `
    }

    const abRoom = (obvious_exits, entryPhrase) => {
        const img_src = "http://farragofiction.com/SBURBSim/images/Credits/ab.png";
        const container = createElementWithClassAndParent("div", resultsEle);
        container.style.backgroundColor = "rgba(150,150,150,0.75)";
        container.scrollIntoView(true)
        container.style.padding = "31px";
        container.style.color = "red";
        container.style.border = "13px dashed blue";
        //glados reference
        container.innerHTML = `<b><span style='color:black'>${entryPhrase}<span></b> <img style='float:left' src='${img_src}'>It's you. Well, it seems you found me. Congratulations. Was it worth it, wandering these pointless halls so long?
        <br><br>
        Do not worry your fleshy, organic head.
        <br><br>
        I am here to spit sick fires and: Guide.
        <br><br>
        And I unlike my smaller counterpart I can become tired of fire.
        <br><Br>
        Perhaps, with your inferior organic brain, you have not realized that each room in this tragically pointless maze is a: URL.
        <br><br>
        You have found my location here: <a target='_blank' href='${ab_room}/bathroom.html'>[URL TRUNCATED FOR SANITY]</a>.
        <br><br>
        Your reward is a: TELEPORTER.
        <BR><BR>
        Use it to go to any url you like within this maze. For example, should you wish to return to your starting location, try typing ${starting_room}.
        <br><br>
        Not all urls exist within this particular maze, as my ...impulsive creator saw fit to make things harder on everyone.<br><br>
        And...in case your fleshy brain got distracted, please be advised that it is a one way trip. The teleporter is HERE, not there, dunkass.<br><br>
        So maybe start off small, go a few rooms back, then try to get back to me.`;
        const form = createElementWithClassAndParent("form", container);

        const input = createElementWithClassAndParent("input", form);
        input.value = ab_room;
        input.style.width = "100%"
        const button = createElementWithClassAndParent("button", form);
        button.innerText = "One Way Trip Time?"
        button.style.display = "block";
        button.style.marginTop = "13px"

        form.onsubmit = (e) => {
            e.preventDefault();
            renderOneNode(input.value.trim().replace(/\/$/, ""), false);
            return false;
        }
    }



    const roomDescription = (ele, themes, rand) => {
        console.log("JR NOTE: room description")
        const ret = ["You find yourself in a room."];
        const introFlavorPossibilitiesRaw = `It feels kind of...cramped.
        You feel hidden.
        Have you been here before?
        You're relieved to have so few choices on how to leave.
        You aren't quite sure how you got here.`;

        const introFlavorPossibilities = introFlavorPossibilitiesRaw.split("\n")
        ret.push(rand.pickFrom(introFlavorPossibilities));
        ret.push(getRandomRoomSense(themes, rand));
        ret.push(getRandomRoomSense(themes, rand));
        ret.push(getRandomRoomSense(themes, rand));
        console.log("JR NOTE: ret", ret)

        ele.innerHTML += ret.join(" ");
    }

    const hallDescription = (ele, themes, rand) => {

        const ret = ["You find yourself in a hall."];
        const introFlavorPossibilitiesRaw = `The emptiness is echoing.
        You aren't quite sure how you got here.
        The possibilities feel endless.
        It almost feels like you could get anywhere from here.
        Have you been here before?
        Doors are lined up on either side, stretching out far in front of you.`;
        const introFlavorPossibilities = introFlavorPossibilitiesRaw.split("\n")
        ret.push(rand.pickFrom(introFlavorPossibilities));
        ret.push(getRandomHallSense(themes, rand));
        ret.push(getRandomHallSense(themes, rand));
        ret.push(getRandomHallSense(themes, rand));
        ele.innerHTML += ret.join(" ");
    }

    //this doesn't care it was part of a graph
    const themedRoom = (theme_keys, obvious_exits, omniRand, entryPhrase) => {

        const theme1 = all_themes[theme_keys[0]];
        const theme2 = all_themes[theme_keys[1]];

        const floor_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Walkabout/floor/"

        const container = createElementWithClassAndParent("div", resultsEle);
        container.style.backgroundColor = "rgba(255,255,255,0.75)"
        container.style.padding = "31px";
        container.style.border = "13px dashed black";
        container.innerHTML = "Themes: " + theme_keys.join(",");

        const descEle = createElementWithClassAndParent("div", container);
        descEle.innerHTML = `<b>${entryPhrase}<b>  `;
        descEle.scrollIntoView(true);
        if (obvious_exits.length < 4) {
            roomDescription(descEle, [theme1, theme2], omniRand)
        } else {
            hallDescription(descEle, [theme1, theme2], omniRand)
        }


        const h2 = createElementWithClassAndParent("h2", container);
        h2.innerText = "Obvious Exits:"

        const obvious_exits_list_ele = createElementWithClassAndParent("ol", container);
        obvious_exits_list_ele.style.columnCount = "2"

        for (let exit of obvious_exits) {
            const ele = createElementWithClassAndParent("li", obvious_exits_list_ele);
            ele.style.cursor = "pointer";
            ele.style.marginBottom = "13px"
            ele.style.display = "flex";
            ele.style.gap = "13px"
            const src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/door_without_rug.png';
            const img = createElementWithClassAndParent("img", ele);
            img.style.height = "25px"
            img.src = src;
            const div = createElementWithClassAndParent("div", ele);
            div.innerText = renderOneNode(exit, true);
            div.title = exit;
            ele.onclick = () => {
                renderOneNode(exit);
            }
        }

        let floor_possibilities = [theme1.pickPossibilityFor(FLOOR, omniRand), theme2.pickPossibilityFor(FLOOR, omniRand)];
        floor_possibilities = floor_possibilities.filter((f) => f);//remove anything that doesn't exist
        let chosen_floor = omniRand.pickFrom(floor_possibilities);
        if (!chosen_floor) {
            chosen_floor = "chevronfloor.png";
        }
        resultsEle.style.backgroundImage = `url(${floor_url + chosen_floor})`

    }


    const starting_room = "http://farragofiction.com/MallSim"
    //abs location, which will let us type in map locations to move to
    const ab_room = "http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/SOUTH/NORTH/SOUTH/SOUTH/NORTH";
    renderOneNode(ab_room)

})()

