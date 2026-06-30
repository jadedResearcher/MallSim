
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Coffin is Image. 

    Click is Image.

    Load is point.

    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    global_rules_spine.addRule(new Rule("", "Image Is Coffin", (rule, event) => {
        global_rules_spine.updateState("img_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/wanda_coffin.gif")
        return true;
    }));

    global_rules_spine.addRule(new Rule("click", "Click is Image", (rule, event) => {
        //i know i'm handling a click event so theres a target
        const img = document.createElement("img");
        img.src = global_rules_spine.state.img_src;
        img.style.position = "absolute";
        img.style.maxWidth = "50px";
        img.style.left = `${event.pageX}px`;
        img.style.top = `${event.pageY}px`;
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

