
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    The rules are simple.

    Here are some Important Words you can use to change that.
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");

    global_rules_spine.addRule(new Rule("", "Noise Is Static", (rule, event) => {
        global_rules_spine.updateState("noise_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/static_chrip.mp3")
        return true;
    }));

    global_rules_spine.addRule(new Rule("click", "Click is Noise", (rule, event) => {
        //i know i'm handling a click event so theres a target
        const target = event.target;
        global_rules_spine.noisePlayer.play();
        return true;

    }));

    global_rules_spine.addRule(new Rule("play", "Play is Point", (rule, event) => {
        global_rules_spine.changePointsBy(1);
        return true;
    }));


})()

