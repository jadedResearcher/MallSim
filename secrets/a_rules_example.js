
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Click is Image.

    Load is point.

    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    //will be called on adding to the spine cuz no event name
    global_rules_spine.addRule(new Rule("", "Image Is Coffin", (rule, event) => {
        global_rules_spine.updateState("img_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/wanda_coffin.gif")
        return true;
    }));

    global_rules_spine.addRule(new Rule("click", "Click is Image", (rule, event) => {
        //i know i'm handling a click event so theres a target
        const target = event.target;
        global_rules_spine.noisePlayer.play();
        return true;

    }));

    global_rules_spine.addRule(new Rule("load", "Load is Point", (rule, event) => {
        global_rules_spine.changePointsBy(1);
        return true;
    }));


})()

