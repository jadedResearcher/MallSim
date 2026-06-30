
//immediately envoked function does't run into namespacign issues
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    The rules are simple.

    Here are some Important Words you can use to change that.

    <li> how can your eyes be real</li>
    <li>extreme go horse</li>
    <li>hallowed ground</li>
    <li>jr please try to break my browser (Note From Future JR: In theory this doesn't break it anymore, it just makes an ungodly noise)</li>
    <li>tiny little lip balm</li>
    <li>it is not what it is</li>

    (You can always refresh the page to clear all rules)

    (Currently a Work In Progress as of 6/29/2026)
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");

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
        global_rules_spine.changePointsBy(113);
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




})()

