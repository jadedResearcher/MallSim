
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Hallow Is Bonus

    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


    global_rules_spine.addRule(new Rule("load", "Hallow Is Bonus", (rule, event, target) => {
        console.log("JR NOTE: hallow is bonus", event)
        if (target && target.src && target.src.includes("hallow")) {
            global_rules_spine.changePointsBy(13);

        }

        return true;

    }));


    global_rules_spine.addRule(new Rule("load", "Hallow Is Very Safe", (rule, event, target) => {
        if (target && target.src && target.src.includes("hallow")) {
            global_rules_spine.updateState("danger", global_rules_spine.state.danger - 31);
            return true;
        }

        return false;

    }));




})()

