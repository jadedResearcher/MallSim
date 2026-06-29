
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Hallow Is Bonus

    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    global_rules_spine.addRule(new Rule("load", "Hallow Is Bonus", (rule, event) => {
        //i know i'm handling a load event so theres a target
        const target = event.target;
        if (target.src.includes("hallow")) {
            global_rules_spine.changePointsBy(13);

        }

        return true;

    }));




})()

