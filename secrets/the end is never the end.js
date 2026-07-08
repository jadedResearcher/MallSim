
//immediately envoked function does't run into namespacign issues
let hax_maze_data;
//you can set your red ball of yarn to remember a specific place to return to, but only if you've unlocked it
//if you waste this, you can put a location you HAVEN'T been in and navigate that way, but be careful you don't typo, or don't use have a '/' on the end when there isn't supposed to be one or a www if theres not supposed to be one. fiddly hacking
let redBall;
//the closer can give you a ball of yarn already tied to AB's room
let blueBall;

//trying to shove everything into a single file for rabbithole is exhausting lol, so messy
(async () => {

    initThemes();
    //key is url, value is domain
    let nodes = {};
    //array of from, to pairs
    let edges = [];

    let right_list_ele;
    let current_room;

    //this used to be a big picture of my horridor that covered up the password field
    //but now its "are you sure this was here before"
    //because its too funny to have this password instead tie to yet another maze
    //hopefully one so deep you forget you were in mallsim
    //much like some of the rooms of bathroom sim
    resultsEle.innerHTML = `    `;

    try {
        const response = await fetch('https://laughing.observer/DataSets/zampanio_urlmap_v8_pruned.json');
        right_list_ele = createElementWithClassAndParent("div", document.body, "right_list");

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

        hax_maze_data = { nodes: nodes, edges: edges };
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

    //needed for closer's store, bredth first search
    /*
    because cycles are possible, if you ever see a room in your current path stack, abort

    works backwards from target to the current room you are in
    NOTE: current_room never changes
    */
    const findPathFromAToB = (current_physical_room, target_room, current_path = [], all_visited = [], pending_explorations = []) => {
        console.log("JR NOTE: findPathFromAToB ", { current_physical_room, target_room, current_path, all_visited, pending_explorations })
        current_path = [...current_path, target_room]; //copied so i don't edit anyone elses
        all_visited.push(target_room); //used to avoid repeitition or loops
        //remove this exploration from the front of the array
        pending_explorations.shift();
        /*
            starting at target_room, check all edges going TO it
            to see if the FROM location is current_room
            if it is, return the current path + target_room (reversed), hooray you did it

            if its not, confirm that the edge isn't FROM anywhere in the all_visited
            if it is, return undefined or some other error signal

            otherwise, for each edge you have, recursively call pickNextDoorToGetFromAToB
            with (current_room, FROM and curernt_path + target_room)
            if you get anything but 'undefined' returned, return it up the chain
            should mean that only the fastest path gets returned.
             incorrect paths might go forever though, so add logging just to confirm it doesn't explode
             plus research this
        */

        //its a loop, prune this and abort
        if (all_visited.includes(current_physical_room)) {
            console.log("JR NOTE: found a loop ", { current_physical_room, target_room, current_path, all_visited, pending_explorations })
            return undefined;
        }

        //the graph/reality is directed but im letting the maze not be
        //i..e eyedol games links to eyedlr but not necessarily the reverse
        //but that makes for an annoying maze
        const edgesTO = getEdgesToNode(target_room);
        console.log("JR NOTE: edges to were", edgesTO)
        const edgesFROM = getEdgesFromNode(target_room);
        console.log("JR NOTE: edges from were", edgesFROM)

        for (let e of edgesTO) {
            //we found our shortest path
            if (e.from === current_physical_room) {
                console.log("JR NOTE: found a path!!!!!!!!!!!!! ", { current_physical_room, target_room, current_path, all_visited, pending_explorations })
                return current_path.reverse();
            }


            //recurse
            pending_explorations.push({ current_physical_room, target_room: e.from, current_path, all_visited, pending_explorations });

        }

        for (let e of edgesFROM) {
            //we found our shortest path
            if (e.to === current_physical_room) {
                console.log("JR NOTE: found a path!!!!!!!!!!!!! ", { current_physical_room, target_room, current_path, all_visited, pending_explorations })
                return current_path.reverse();
            }
            //recurse
            pending_explorations.push({ current_physical_room, target_room: e.to, current_path, all_visited, pending_explorations });

        }

        if (pending_explorations.length === 0) {
            console.log("JR NOTE: end of the road ", { current_physical_room, target_room, current_path, all_visited, pending_explorations })
            return undefined; //end of the road
        } else {
            //will always pick siblings of the previous path before children of this one
            //since we start at the top
            const next = pending_explorations[0];
            return findPathFromAToB(next.current_physical_room, next.target_room, next.current_path, next.all_visited, next.pending_explorations)
        }

    }
    window.haxFindPathFromAToB = findPathFromAToB; //for testing/wasting, use with hax_debug_data
    //haxFindPathFromAToB(hax_maze_data.edges[4].from, hax_maze_data.edges[44].from) (eyedolgames.com to eyedlr)
    //haxFindPathFromAToB("http://eyedolgames.com/","http://farragofiction.com/CatalystsBathroomSim/NORTH/EAST/EAST/NORTH") //gotta be careful with this version, things like trailing / or www matter
    const getRandomDoorSense = (room, theme_keys, rand) => {
        if (room === ab_room) {
            return "a superior robot can be heard quietly rapping within."
        } else if (room.includes("store")) {
            return "the sound of buzzing static and a humming telephone line is within."
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

            resultsEle.innerHTML = "DEBUG: " + room;
        } else {
            current_room = room;
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
            const entryPhrase = `You step through a door, ${getRandomDoorSense(room, theme_keys, omniRand).toLowerCase()} ${blueBall ? "Your blue wire steadfastly points toward some far off Guide." : ""} ${redBall ? "Your red yarn pulls tightly, reminding you the way to where you tied it." : ""}<br><Br>`;
            //i will never forget strong bads text adventure game with obvious exists being like, north, south and DENNIS
            let obvious_exits = getEdgesFromNode(room).map((e) => e.to);
            obvious_exits = obvious_exits.concat(getEdgesToNode(room).map((e) => e.from));

            if (room === ab_room) {
                abRoom(obvious_exits, entryPhrase)
            } else if (room.includes("store")) {
                storeRoom(obvious_exits, entryPhrase, room); //it needs room to manually handle its own redstring 
            } else {
                themedRoom(theme_keys, obvious_exits, omniRand, entryPhrase)
            }
            //no matter what kind of room, handle red strings. if there are doors within we'll find it
            handleRedString(room);
            handleBlueWire(room);
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

    const storeRoom = async (obvious_exits, entryPhrase, room) => {
        global_rules_spine.state.music_src = ("http://farragofiction.com/CatalystsBathroomSim/seeking_help.mp3");
        global_rules_spine.musicPlayer.play();
        const sinfulInjectedCSS = `

  .help-button{
    position: fixed;
    top: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    border-radius: 25px;
    font-size: 28px;
    line-height: 33px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;

  }
    .chat-container{
      position: fixed;
      right: 15px;
      top: 15px;
      margin-top: 65px;
      height: 515px;
      width: 350px;
      color: white;
      text-decoration: none;
      z-index: 10;
      border-radius: 2px;
      box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    }

    .chat-header{
      height: 100px;
      color: white;
      background-color: #1f3f87;
      font-size: 14px;
      padding: 20px;
      p{
          margin-left: 15px;
      }
    }

    .small{
      width: 100px !important;
    }

    .selected{
      background: darkred !important;
    }

    .chat-body{
      color: #1f3f87;
      background-color: #f8fafa;
      width: 100%;
      height: 100%;
      p{
          margin-left: 15px;
      }
    }

    .styled-button{
      color: #1f3f87;
      background: whie;
    }

    .chat-line{
      padding: 5px;
    }

    .chat-options{
      padding: 5px;
      margin-top: 15px;
      overflow: auto;
      height: 190px;
    }

    .chat-icon{
      clip-path: circle(50% at 50% 50%);
      -webkit-clip-path: circle(43% at 50% 50%);
      display: inline-block;
      background-color: #1f3f87;
      color: white;
      padding: 15px;
      font-size: 16px;
      line-height: 10px;
      vertical-align: top;
    }

    .chat-text{
      background: white;
      font-size; 14px;
      display: inline-block;
      width: 200px;
      margin-left: 10px;
      border: 1px solid #c4c4c4;
      padding: 10px;
      border-radius: 8px;
    }

    .chat-option{
      background: #1f3f87;
      font-size; 14px;
      color: white;
      display: inline-block;
      width: 225px;
      margin-left: 10px;
      margin-bottom: 8px;
      border: 1px solid #c4c4c4;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
    }

    .customer-service-hell{
      height: 300px;
      overflow: auto;
    }

    .closer-chat-container{
      position: fixed;
      z-index: 2000;
      right: 15%;
      top: 15px;
      margin-top: 65px;
      height: 515px;
      width: 80%;
      color: white;
      text-decoration: none;
      border-radius: 2px;
      box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    }

    .closer-chat-header{
      height: 25px;
      color: white;
      background-color: #b72a21;
      font-size:22px;
      padding: 5px;
      p{
          margin-left: 15px;
          margin-top: 0px;
      }
    }

    .closer-chat-body{
      color: #b72a21;
        background-color: #f8fafa;
        width: 100%;
        height: 100%;
        p{
            margin-left: 15px;
        }
    }

    .closer-chat-line{
      padding: 5px;
    }

    .closer-chat-icon{
      clip-path: circle(50% at 50% 50%);
        -webkit-clip-path: circle(43% at 50% 50%);
        display: inline-block;
        background-color: #b72a21;
        color: white;
        padding: 15px;
        font-size: 16px;
        line-height: 10px;
        vertical-align: top;
    }

    .closer-chat-option{
      background: #b72a21;
      font-size; 14px;
      color: white;
      display: inline-block;
      width: fit-content;
      margin-left: 10px;
      margin-bottom: 8px;
      border: 1px solid #c4c4c4;
      padding: 10px;
      border-radius: 8px;
      height: 42px;
      overflow: hidden;
      cursor: pointer;
      p{
        padding: 2px;
        margin: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .closer-chat-text{
      background: white;
      font-size; 14px;
      display: inline-block;
      width: 80%;
      margin-left: 10px;
      border: 1px solid #c4c4c4;
      padding: 10px;
      border-radius: 8px;
    }

    .closer-customer-service-hell{
      overflow: auto;
      height: 465px;
    }

    .closer{
      z-index: 1000;
      left: 200px;
      top: 113px !important;
      animation: flipout 1s linear infinite;
    }

    .closer-chat-options{

      padding: 20px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    @keyframes flipout{
      0%,20%,40%,60%,80%,100%{
        transform: translate(0px, 10px);
      }
      10%,30%,50%,70%,90%{
        transform: translate(0px, 0px);
      }
    }

 
`;
        const style = createElementWithClassAndParent("style", resultsEle);
        style.innerHTML = sinfulInjectedCSS;
        const closerPopup = createElementWithClassAndParent("div", resultsEle, 'closer-chat-container');
        const closerHeader = createElementWithClassAndParent("div", closerPopup, 'closer-chat-header');
        closerHeader.innerHTML = `<p>The Closer will fulfill your Customer Support needs.</p>`;
        const closerBody = createElementWithClassAndParent("div", closerPopup, 'closer-chat-body');
        const hell = createElementWithClassAndParent("div", closerBody, 'closer-customer-service-hell');

        const closerChat = (line, parent) => {
            const ele = createElementWithClassAndParent("div", parent, 'closer-chat-line');

            const icon = createElementWithClassAndParent("div", parent, 'closer-chat-icon');
            icon.innerText = "TC";

            const textEle = createElementWithClassAndParent("div", parent, 'closer-chat-text');
            textEle.innerText = line;


        }

        closerChat("Straight to the point,so to speak. I like that. It's an admirable trait in someone.", hell);
        await sleep(1000)
        closerChat("But yes, you /can/ buy things here with Points, if you know the right Rules to play. The infection from the Harvest runs deep, one supposes.", hell);
        await sleep(1000);
        console.log("JR NOTE: checking points")
        if (global_rules_spine.state.points === 0) {
            closerChat("Ah.", hell);
            await sleep(1000);
            closerChat("Not much of a gamer, are we?", hell);
            await sleep(1000);
            closerChat("Then as a special introductory offer, allow me to unlock the feature for you.", hell);
            await sleep(1000);
            closerChat("I look forward to  your future patronage.", hell);

            global_rules_spine.addRule(new Rule("", "Noise Is Static", (rule, event) => {
                global_rules_spine.updateState("noise_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/static_chrip.mp3")
                return true;
            }));

            global_rules_spine.addRule(new Rule("click", "Click is Noise", (rule, event) => {
                //i know i'm handling a click event so theres a target
                global_rules_spine.noisePlayer.play();
                return true;

            }));

            global_rules_spine.addRule(new Rule("play", "Play is Point", (rule, event) => {
                global_rules_spine.changePointsBy(1);
                return true;
            }));

            global_rules_spine.addRule(new Rule("visibilitychange", "Rest is Point", (rule, event) => {
                global_rules_spine.changePointsBy(13);
                return true;
            }));

            global_rules_spine.addRule(new Rule("state:danger", "Danger is Red", (rule, event) => {
                console.log("JR NOTE: danger is red", event)
                const danger = global_rules_spine.state.danger;
                if (global_rules_spine.state.danger > 0) {
                    const prev = document.querySelector(".danger-overlay");
                    if (prev) {
                        prev.remove();
                    }
                    console.log("JR NOTE: there is a prevs")
                    const ele = document.createElement("div");
                    ele.classList.add("danger-overlay");
                    //gemini stuff, it says this is more efficient than just a filter tinting red (cuz it lets animations underneath not rerender)
                    //this fascinates me, cuz it means gemini remembers it helped me make bouncey animations earlier
                    ele.innerHTML = `<style>
                            .danger-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                
                /* Ensures it sits on top of text but ignores user interactions */
                z-index: 99999;
                pointer-events: none; 
                
                /* Semitransparent red base */
                background-color: rgba(255, 0, 0, ${danger / 100});
                
                /* Blends beautifully with text/images underneath without flattening them */
                mix-blend-mode: multiply; 
                
                /* Forces the browser to isolate this on its own GPU layer */
                will-change: transform; 
                }
            </style>
            <div class="danger-overlay"></div>`;
                    document.body.append(ele)
                } else {
                    const danger_ele = document.querySelectorAll(".danger-overlay");
                    for (let d of danger_ele) {
                        d.remove();
                    }
                }
                return true;
            }));

            global_rules_spine.addRule(new Rule("state:danger", "Safe is Green", (rule, event) => {
                if (global_rules_spine.state.danger < 0) {
                    const danger = global_rules_spine.state.danger;

                    const prev = document.querySelector(".safe-overlay");
                    if (prev) {
                        prev.remove();
                    } const ele = document.createElement("div");
                    ele.classList.add("safe-overlay");
                    //gemini stuff, it says this is more efficient than just a filter tinting red (cuz it lets animations underneath not rerender)
                    //this fascinates me, cuz it means gemini remembers it helped me make bouncey animations earlier
                    ele.innerHTML = `<style>
                            .safe-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                
                /* Ensures it sits on top of text but ignores user interactions */
                z-index: 99999;
                pointer-events: none; 
                
                /* Semitransparent red base */
                background-color: rgba(60, 255, 0, ${-1 * danger / 100});
                
                /* Blends beautifully with text/images underneath without flattening them */
                mix-blend-mode: multiply; 
                
                /* Forces the browser to isolate this on its own GPU layer */
                will-change: transform; 
                }
            </style>
            <div class="safe-overlay"></div>`;
                    document.body.append(ele)
                } else {
                    const danger_ele = document.querySelectorAll(".safe-overlay");
                    for (let d of danger_ele) {
                        d.remove();
                    }
                }
                return true;
            }));

            closerChat("Ah. Forgive me. Allow me to show you the exits:", hell);



        } else {
            closerChat(`Currently, you have ${global_rules_spine.state.points} points.`, hell);
            const shopEle = createElementWithClassAndParent("div", hell, "shop-ele");
            shopEle.style.padding = "13px";
            shopEle.style.margin = "13px"
            shopEle.style.border = "1px solid red";

            if (!redBall) {
                const ele = createElementWithClassAndParent("li", shopEle, "closer-chat-option");
                ele.innerText = "Ball of Red Yarn (5 points)";
                ele.onclick = () => {
                    if (global_rules_spine.iWantToSpendPoints(5)) {
                        redBall = room;
                        closerChat(`The Red Yarn. A wise choise indeed.`, shopEle);
                        closerChat(`I have taken the liberty of tying one end to this shop.`, shopEle);
                        closerChat(`But you are free to snip off the end and tie it anywhere new.`, shopEle);
                        closerChat(`It is only yarn, after all.`, shopEle);
                        const div = createElementWithClassAndParent("div", right_list_ele, 'icon-container');

                        const ball_icon = createElementWithClassAndParent("img", div, 'img-icon');
                        ball_icon.src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/ballofyarn.png';
                        const ball_button = createElementWithClassAndParent("button", div);
                        ball_button.innerText = "Tie Here";
                        div.onclick = () => {
                            redBall = current_room;
                        }

                        ele.remove();
                    } else {
                        closerChat(`I am afraid you can not yet afford that.`, shopEle);

                    }
                }
            }

            if (!blueBall) {
                const ele = createElementWithClassAndParent("li", shopEle, "closer-chat-option");
                ele.innerText = "Ball of Blue Wire (113 points)";
                ele.onclick = () => {

                    if (global_rules_spine.iWantToSpendPoints(113)) {
                        console.log("JR NOTE: bought ball");
                        closerChat(`The Blue Wire. It should serve you well.`, shopEle);
                        closerChat(`The far end of it leads to a helpful guide.`, shopEle);
                        closerChat(`It will always point you towards her.`, shopEle);


                        const div = createElementWithClassAndParent("div", right_list_ele, 'icon-container');

                        const ball_icon = createElementWithClassAndParent("img", div, 'img-icon');
                        ball_icon.src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/ballofyarn.png';
                        ball_icon.style.filter = "hue-rotate(-113deg)";
                        blueBall = ab_room;
                        ele.remove();
                    } else {
                        closerChat(`I am afraid you can not yet afford that.`, shopEle);

                    }
                }
            }

            if (shopEle.children.length === 0) {
                shopEle.innerText = "Well done, Observer. You have been a most excellent Shopper. Your patronage is appreciated and you will be the first to know when we have additional stock."
            }

            closerChat("Ah. Forgive me. Allow me to show you the exits:", hell);


        }

        const exitsEle = createElementWithClassAndParent("div", hell,);
        exitsEle.style.marginTop = "31px"
        for (let exit of obvious_exits) {
            const ele = createElementWithClassAndParent("li", exitsEle, "closer-chat-option");
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
            ele.dataset.url = exit;
            ele.onclick = () => {
                renderOneNode(exit);
            }
        }
        handleRedString(room);
        handleBlueWire(room);

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
            ele.dataset.url = exit;
            ele.onclick = () => {
                renderOneNode(exit);
            }
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

    //its a classic way to navigate mazes, isn't it? trying one end to where you currently are, so you can always go back, and know when you're going in circles.
    const handleRedString = (current_physical_room) => {

        if (!redBall) {
            return;
        }
        const path = findPathFromAToB(current_physical_room, redBall);
        console.log("JR NOTE: red ball path is", path);
        const doors = document.querySelectorAll("[data-url]");
        for (let door of doors) {
            if (path.includes(door.dataset.url)) {
                //door.style.cssText = `    border-bottom: 5px solid transparent;
                //border-image: url(http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/thread.png) 9;`;
                //  
                door.style.borderBottom = "5px solid transparent"
                door.style.borderImage = "url(http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/thread.png) 9";
            }
        }

    }


    //you can always find ab
    const handleBlueWire = (current_physical_room) => {

        if (!blueBall) {
            return;
        }
        const path = findPathFromAToB(current_physical_room, blueBall);

        //i wish i hadn't made the naming connection of red ball lol
        console.log("JR NOTE: blue ball path is", path);
        const doors = document.querySelectorAll("[data-url]");
        for (let door of doors) {
            if (path.includes(door.dataset.url)) {
                //door.style.cssText = `    border-bottom: 5px solid transparent;
                //border-image: url(http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/thread.png) 9;`;
                //  
                door.style.borderBottom = "3px double blue";
            }
        }

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
            ele.dataset.url = exit;
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


    const store_example = 'http://farragofiction.com/CatalystsBathroomSim/store_inventory'
    const starting_room = "http://farragofiction.com/MallSim"
    //abs location, which will let us type in map locations to move to
    const ab_room = "http://farragofiction.com/CatalystsBathroomSim/EAST/SOUTH/EAST/SOUTH/NORTH/SOUTH/SOUTH/NORTH";
    renderOneNode(store_example)

})()

