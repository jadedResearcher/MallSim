
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

    const getRandomSense = (theme_keys, rand) => {
        const themes = [all_themes[theme_keys[0]], all_themes[theme_keys[1]]];

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
        Where does it lead?
        It beckons to you.
        The air feels ${adj} around it.
        It's ${feeling}.
        A small picture of a symbolic ${object} is etched onto this door.
        Its...${insult}. Somehow you can just feel it.
        A poster of a strange ${person} is plastered on this door.
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



    //figures out what edges it has and makes a room for it
    const renderOneNode = (room, summarize = false) => {
        if (!summarize) {
            resultsEle.innerHTML = "DEBUG: " + room;
        }
        console.log("JR NOTE: You have arrived in " + room);
        //i have two pieces of data for each room, use each to get a theme
        const multiplier = 1300; //regular string to seed results in not enough variation
        const rand2 = new SeededRandom(stringtoseed(room) * multiplier);
        const rand1 = new SeededRandom(stringtoseed(nodes[room]) * multiplier);
        console.log("JR NOTE: two rands", rand1, rand2, all_themes)
        const theme_keys = [rand1.pickFrom(getAllThemeKeysMinusFood()), rand2.pickFrom(getAllThemeKeysMinusFood())];
        if (summarize) {
            //lets doors be different from each other
            return getRandomSense(theme_keys, new SeededRandom(stringtoseed(room) + stringtoseed(nodes[room])));
        } else {
            //i will never forget strong bads text adventure game with obvious exists being like, north, south and DENNIS
            let obvious_exits = getEdgesFromNode(room).map((e) => e.to);
            if (obvious_exits.length === 0) {
                obvious_exits = getEdgesToNode(room).map((e) => e.from);
            }
            themedRoom(theme_keys, obvious_exits, rand1, rand2)
        }
    }



    //this doesn't care it was part of a graph
    const themedRoom = (theme_keys, obvious_exits, rand1, rand2) => {

        const theme1 = all_themes[theme_keys[0]];
        const theme2 = all_themes[theme_keys[1]];

        const floor_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/Walkabout/floor/"

        const container = createElementWithClassAndParent("div", resultsEle);
        container.style.backgroundColor = "rgba(255,255,255,0.75)"
        container.style.padding = "31px";
        container.style.border = "13px dashed black";
        container.innerHTML = "Themes: " + theme_keys.join(",");


        const h2 = createElementWithClassAndParent("h2", container);
        h2.innerText = "Obvious Exits:"

        const obvious_exits_list_ele = createElementWithClassAndParent("ol", container);
        obvious_exits_list_ele.style.columnCount = "2"

        for (let exit of obvious_exits) {
            console.log("JR NOTE: exit is", exit)
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

        let floor_possibilities = [theme1.pickPossibilityFor(FLOOR, rand1), theme2.pickPossibilityFor(FLOOR, rand2)];
        floor_possibilities = floor_possibilities.filter((f) => f);//remove anything that doesn't exist
        let chosen_floor = rand1.pickFrom(floor_possibilities);
        if (!chosen_floor) {
            chosen_floor = "chevronfloor.png";
        }
        resultsEle.style.backgroundImage = `url(${floor_url + chosen_floor})`
        console.log("JR NOTE: resultsEle.style.backgroundImage", `url(${floor_url + chosen_floor})`);

    }


    const starting_room = "http://farragofiction.com/MallSim"
    renderOneNode(starting_room)

})()

