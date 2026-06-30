
//immediately envoked function does't run into namespacign issues
//https://www.youtube.com/watch?v=GCmsQeE2bQ8
(() => {
    //i really need to play baba is you at some point. trying to make rules horror be an actual game is making me feel like that game.
    const src = `
    
    
    Click is Invert


    What will you do with this, I wonder?
    
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");




    global_rules_spine.addRule(new Rule("click", "Click Is Bounce", (rule, event) => {
        const target = event.target;


        const id = "bouncey-rules-animation";
        if (!document.querySelector(`#id`)) {
            //gemini did this animation cuz i usually just google animations rather than make them from scratch
            const style = document.createElement("div");
            //
            style.innerHTML = `<style>@keyframes elasticBounce {
                    0%, 100% {
                        /* Starting point on the left */
                        transform: translateX(0) scaleX(1);
                    }
                    45% {
                        /* Approaching the right wall - stretching forward */
                        transform: translateX(230px) scaleX(1.25) scaleY(0.85);
                    }
                    50% {
                        /* Impacting the right wall - squishing flat */
                        transform: translateX(250px) scaleX(0.7) scaleY(1.3);
                    }
                    55% {
                        /* Snapping back away from the right wall */
                        transform: translateX(230px) scaleX(1.2) scaleY(0.9);
                    }
                    95% {
                        /* Approaching the left wall - stretching forward */
                        transform: translateX(20px) scaleX(1.25) scaleY(0.85);
                    }
                    }

                    .rules-bouncy-mover {
                    will-change: transform;
                    
                    /* Infinite back-and-forth loop */
                    animation: elasticBounce 2.5s infinite ease-in-out;
                
                 </style>

                    }`;
            document.body.append(style);
        }
        target.classList.add("rules-bouncy-mover")



    }));



})()

