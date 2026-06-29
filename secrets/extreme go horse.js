
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    
    Image is Hallow

    Noise Is Image

    Load is point.

    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    //will be called on adding to the spine cuz no event name
    global_rules_spine.addRule(new Rule("", "Image Is Hallow", (rule, event) => {
        global_rules_spine.updateState("img_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/hallow.gif")
        return true;
    }));

    global_rules_spine.addRule(new Rule("play", "Noise Is Image", (rule, event) => {
        //i know i'm handling a click event so theres a target
        const img = document.createElement("img");
        img.src = global_rules_spine.state.img_src;
        img.style.position = "absolute";

        //i just had gemini do this math
        const docWidth = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth
        );

        // 2. Get the total scrollable height of the entire document
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );

        // 3. Generate random integers within those exact bounds
        const randomPageX = Math.floor(Math.random() * docWidth);
        const randomPageY = Math.floor(Math.random() * docHeight);

        console.log("JR NOTE: randomPageX,randomPageY", randomPageX, randomPageY)
        img.style.left = `${randomPageX}px`;
        img.style.width = "50px"
        img.style.top = `${randomPageY}px`;
        img.style.transform = "translate(-50%, -50%)";
        img.style.pointerEvents = "none";
        resultsEle.append(img);
        return true;

    }));

    global_rules_spine.addRule(new Rule("load", "Load is Point", (rule, event) => {
        global_rules_spine.changePointsBy(1);
        return true;
    }));


})()

