
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Click is Noise

    Play is Point

    Point is Noise

    lol, here's hoping i fixed this as thoroughly as past me thought i did
    (for future me: in the spine, i made it so signals are all on a setTimeout, which adds them to the browsers eventQueue. they still go super fast (upsettingly fast), but...don't brick the browser
    
    important note, looks like at around 90,000 loops the horrible audio stops playing )

    <img width="400px" src='http://farragofiction.com/ZampanioEyes6/iam_havingfun.png'>
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    /*
    clicking makes a noise
    a noise playing gets you a point
    getting a point makesa  new noise (which plays which gets you a point which gets you a)

    if i don't have a way to stop things like this, people playing the game might make their browsers shit themselves

    inscryption figured this out with p03s "build your own rules" boss so lets see if i can, too
    */


    global_rules_spine.addRule(new Rule("click", "Click is Noise", (rule, event) => {
        console.log("JR NOTE: click is noise")

        global_rules_spine.noisePlayer.play();
        return true;

    }));

    global_rules_spine.addRule(new Rule("play", "Play is Point", (rule, event) => {
        console.log("JR NOTE: play is point")

        global_rules_spine.changePointsBy(1);
        return true;
    }));

    global_rules_spine.addRule(new Rule("state:points", "Point is Noise", (rule, event) => {
        console.log("JR NOTE: point is noise")
        new Audio(global_rules_spine.state["noise_src"]).play()
        return true;
    }));


})()

