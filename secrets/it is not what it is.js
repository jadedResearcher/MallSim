
//immediately envoked function does't run into namespacign issues
//https://www.youtube.com/watch?v=GCmsQeE2bQ8
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Click is Invert
    Rule Click Is Not Rule*

    * lol i'd have to make a state engine to undo any rules that cause a change when they're added
    and i don't wanna
    so i m not gonna
    so
    no way to stop one off rules (like ones that change what the noise is)
    but theres less reason to
    just find a new rule to change it, yeah


    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");

    //will be called on adding to the spine cuz no event name
    global_rules_spine.addRule(new Rule("click", "Click Is Invert", (rule, event, target) => {
        if (target.style.filter.includes("invert(1)")) {
            target.style.filter = "invert(0)";
            target.style.backdropFilter = "invert(0)";
        } else {
            target.style.filter = "invert(1)";
            target.style.backdropFilter = "invert(1)";
        }
    }));

    global_rules_spine.addRule(new Rule("click", "Click is Not Points", (rule, event) => {
        global_rules_spine.changePointsBy(-1);
        return true;
    }));

    global_rules_spine.addRule(new Rule("click", "Rule Click is Not Rule", (rule, event, targets) => {
        if (target.classList.contains("rule")) {
            global_rules_spine.removeRule(target.dataset.ruleText);
        }
        return true;
    }));



})()

