/*
wanted to make a mini sim that wasn't lore heavy, so brainstormed 
"what if the rules horror i did for zworld actually did something"

so the spine:

wires up document/window with all listeners i have available to me, and has each pass it to a handler the spine has
spine asks each rule if it responds to the event, and calls it if it does with the target dom element
rules have an event they respond to and a callback function that takes in a target element and the spine object directly
rules figure out what, if anything they wanna do  (modify global state, modify the target (turn eyes into cats), play a sound, change the css class etc
figure out some way to prevent infinite loops (a click causes a click causes a click causes a click),
*/

//i am using gemini like i used to use stack overflow and google searches. 
// generating no code but quickly answering questions about syntax, best practices, etc.
//it keeps offering up ways i can accomplish my goals and they're all exactly missing
//  the point (by trying to offer me new goals or reduce the chaos)
//though it has very useful things to tell me about optimizations
//  that i can test by trying to brick my browser
//so my current evaluation is "useful if you already know what you're doing
//  and how you want to do it but don't have memorized the most optimal way to spam a browsers"
//this might make things like the custom audio engine in the corn maze way more efficient

//we are sinning on purpose tonight boys
//i haven't attempted to hack language level objects since my Ruby on Rails days
const OriginalAudio = window.Audio;

//we need to do this if we want to expose non DOM audio events
window.Audio = function (...args) {
    // Instantiate the real audio element object
    const audioInstance = new OriginalAudio(...args);

    //might make new Audio instances that get added to the dom called twice but whatever
    audioInstance.addEventListener('ended', () => {
        //even tho this audio isn't in the dom, we want it to expose that it ended for the document listener
        document.dispatchEvent(new Event('ended'), { detail: { subtype: "audio" } });
    });

    audioInstance.addEventListener('play', () => {
        //even tho this audio isn't in the dom, we want it to expose that it ended for the document listener
        document.dispatchEvent(new Event('play', { detail: { subtype: "audio" } }));

        audioInstance.addEventListener('pause', () => {
            //even tho this audio isn't in the dom, we want it to expose that it ended for the document listener
            document.dispatchEvent(new Event('pause', { detail: { subtype: "audio" } }));
        });
    });

    return audioInstance;
};


class RulesSpine {
    //no clue what im gonna do with any of these, just letting them do their thing

    state = {
        points: 0, danger: 0, points_multiplier: 1,
        img_src: "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/wanda_coffin.gif",
        noise_src: "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/hallow_is_so_quiet_whenheshappy.mp3"
    }


    noisePlayer = new Audio(this.state.noise_src);
    //NOT guaranteed to be unique and that is half the challenge
    rules = [];
    element;
    toggle;

    //i guess todays goal is to learn a lot about events
    constructor() {
        //keydown/up and mouse out/over won't work on mobile
        //instead if want to have a rule about typing  "e" i can use before input
        document.addEventListener("click", this.handleEvent);
        document.addEventListener("mouseup", this.handleEvent);
        document.addEventListener("mousedown", this.handleEvent);
        document.addEventListener("beforeinput", this.handleEvent);
        document.addEventListener("focus", this.handleEvent, true); //true means i see things before the element does
        document.addEventListener("blur", this.handleEvent, true);
        document.addEventListener("load", this.handleEvent, true);
        //don't do this for now, need to make sure only one event ever X seconds like i do for eyedolgames
        //document.addEventListener("scroll", this.handleEvent, true);
        document.addEventListener("play", this.handleEvent, true);
        document.addEventListener("pause", this.handleEvent, true);
        document.addEventListener("ended", this.handleEvent, true);
        document.addEventListener("submit", this.handleEvent, true);

        document.addEventListener("visibilitychange", this.handleEvent); //change tab
        window.addEventListener("error", this.handleEvent);


    }

    //this way we can treat state changes as events to have rules respond to
    //if you want to add/subtract, figure that out on your own
    updateState = (key, newValue) => {
        const oldValue = this.state[key];
        this.state[key] = newValue;
        if (key === "noise_src") {
            this.noisePlayer.src = newValue;
        }

        //instead of dispatching like normal (and trying to make an event listener for state key (which might grow with new rules), just call directly)
        //don't need to pass a real event, only required attr is type
        this.handleEvent({ type: 'state:' + key, newValue, oldValue });

    }

    renderPoints = () => {
        if (this.pointsEle) {
            this.pointsEle.innerText = "Points: " + this.state.points;
        }
    }

    //attach to the body, and check if something else removed you (changing passwords might)
    render = () => {
        if (!this.element) {
            this.toggle = createElementWithClassAndParent("button", document.body, "rules_toggle");
            this.element = createElementWithClassAndParent("div", document.body, "rules_list");
            this.toggle.innerHTML = "Hide Rules"
            this.toggle.onclick = () => {
                if (this.element.classList.contains("hidden-rules")) {
                    this.element.classList.remove('hidden-rules');
                    this.toggle.innerHTML = "Hide Rules"
                } else {
                    this.element.classList.add('hidden-rules');
                    this.toggle.innerHTML = "View Rules"
                }
            }
        } else if (!this.element.isConnected) {
            const body = document.querySelector("body");
            body.append(toggle);
            body.append(this.element)

        }
        //the only reason i'm rendering this is to change the rules, so throw them away and rerender
        this.element.innerHTML = "";
        this.pointsEle = createElementWithClassAndParent("div", this.element);
        this.pointsEle.innerText = "Points: " + this.state.points;

        for (let rule of this.rules) {
            const ele = createElementWithClassAndParent("div", this.element, "rule");
            ele.innerText = rule.text;
            ele.dataset.ruleText = rule.text;
            //if it doesn't respond to events its active by default
            if (rule.eventName.trim() === "") {
                ele.classList.add("active-rule");

            }
        }
    }

    addRule = (rule) => {
        this.rules.push(rule);
        this.render();
        if (rule.eventName.trim() === "") {
            rule.eventCallback();//with no event
        }
    }

    removeRule = (rule_text) => {
        console.log("JR NOTE: removeRule", rule_text)
        const copy = [...this.rules];
        for (let item of copy) {
            if (item.text === rule_text) {
                removeItemOnce(this.rules, item);
            }
        }
        this.render();
        //i can't undo a rule's add effects (no stack to pop i'm afraid)
        //i COULD make a stack. just don't want to lol
    }

    //can be negative
    changePointsBy = (number) => {
        this.updateState("points", this.state["points"] + number * this.state["points_multiplier"])
        this.renderPoints();
    }


    /*
    a spine moves information between body and brain
    the page itself is the body
    the list of rules is the brain
    all the spine does is move information
    */
    handleEvent = (event) => {
        const type = event.type;
        console.log("JR NOTE: event called", type);
        //NOTE: any rule that changes the dom in any way should be tied to events that are  rare
        //because you will brick the browser if you try to constantly mess with the dom every millisecond

        for (let r of this.rules) {
            if (r.eventName === type) {
                console.log("JR NOTE: found rule", r);
                if (r.eventCallback) {

                    //doesn't prevent infinite loops but DOES prevent them from crashing your browser
                    //this adds it to an event queue so only one happens at a time, not infinity in a single tick
                    //HOWEVER this DOES prevent the target form being stored normally for some events, need to cache it
                    const target = event.target;
                    setTimeout(() => {
                        const ret = r.eventCallback(r, event, target);
                        if (ret) {
                            const all_eles = document.querySelectorAll(".rule");

                            const active_eles = document.querySelectorAll(`[data-rule-text='${r.text}']`);
                            for (let e of active_eles) {
                                e.classList.add("active-rule");
                                //give it a little bit for us to see
                                setTimeout(() => e.classList.remove("active-rule"), 1000)
                            }
                        }
                    }, 0)


                }
            }
        }

    }




}

/*
A rule is very simple. It knows what type of event it responds to. 
It knows what to do when it is given the type of event it responds to (including further targeting)

So, for example, a click event might spawn an image (clicks are rare enough it should be okay) of an eye
with data-attr eye

a rule might respond to click, but further check if what was clicked had a data-attr of "eye" before doing its thing
*/
//unlike sburbsim etc we aren't expecting to have rules handle generic stuff
//like, we don't have it take in an important number or whatever
//we're making rules from scratch in the procedulally loaded passwords, mostly
//no "RuleXGreaterThanY" here, okay future me?
class Rule {
    text = "Generic Rule Does Nothing"
    eventName = "click"; //if this is empty, eventCallback will be called when added to the spine with no event
    eventCallback;
    constructor(eventName, text, eventCallback) {
        this.eventName = eventName;
        this.text = text;
        this.eventCallback = eventCallback;
    }

}

const global_rules_spine = new RulesSpine();

/*
global_rules_spine.addRule(new Rule("click", "Any Video Click Plays A Noise", (rule, event) => {
    //i know i'm handling a click event so theres a target
    const target = event.target;
    if (target.closest('video')) {
        global_rules_spine.noisePlayer.play();
        return true;
    }
}));

//example rules, we want to turn these off and only let passwords add them
global_rules_spine.addRule(new Rule("ended", "Ending Earns a Point", (rule, event) => {
    global_rules_spine.changePointsBy(1);
    //easy to tell if video, hard to tell if audio
    return true;
}));



//if the noise changes to giggles you get a one time point bomb (if this rule is AFTER a rule that seets it to giggles you won't get the point)
global_rules_spine.addRule(new Rule("state:noise_src", "Giggles Is Points", (rule, event) => {
    console.log("JR NOTE: giggle event is", event)
    if (event.newValue && event.newValue.includes("giggle")) {
        global_rules_spine.changePointsBy(113);
    }
    return true;
}));

//because event name is empty, will happen on adding the rule
global_rules_spine.addRule(new Rule("", "Noise Is Giggles", (rule, event) => {
    global_rules_spine.updateState("noise_src", "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/gigglebest.mp3")
    return true;
}));


global_rules_spine.addRule(new Rule("play", "Playing Earns a Point", (rule, event) => {
    //i know i'm handling an ended event
    global_rules_spine.changePointsBy(1);
    return true;

}));




global_rules_spine.addRule(new Rule("play", "Video Playing = Click", (rule, event) => {
    //i know i'm handling an ended event
    if (event.target) {
        console.log("JR NOTE: event.target", event.composedPath())
        const video = event.composedPath()[0];
        if (video && video instanceof HTMLVideoElement) {
            video.click();
            return true;

        }
    }

}));
*/