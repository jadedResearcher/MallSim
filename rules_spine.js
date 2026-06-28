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

class RulesSpine {
    //no clue what im gonna do with any of these, just letting them do their thing
    points = 0;
    safety = 0;
    danger = 0;
    turns_of_the_spiral = 0;
    //things can change this
    noise_src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/hallow_is_so_quiet_whenheshappy.mp3";

    noisePlayer = new Audio(this.noise_src);
    //NOT guaranteed to be unique and that is half the challenge
    rules = [];

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


    /*
    a spine moves information between body and brain
    the page itself is the body
    the list of rules is the brain
    all the spine does is move information
    */
    handleEvent = (event) => {
        const type = event.type;
        //console.log("JR NOTE: event called", type);
        //NOTE: any rule that changes the dom in any way should be tied to events that are  rare
        //because you will brick the browser if you try to constantly mess with the dom every millisecond

        for (let r of this.rules) {
            if (r.eventName === type) {
                console.log("JR NOTE: found rule", r);
                if (r.eventCallback) {
                    r.eventCallback(r, event);
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
    eventName = "click";
    eventCallback;
    constructor(eventName, text, eventCallback) {
        this.eventName = eventName;
        this.text = text;
        this.eventCallback = eventCallback;
    }

}

const global_rules_spine = new RulesSpine();

global_rules_spine.rules.push(new Rule("click", "Any Input Plays A Noise", (rule, event) => {
    console.log("JR NOTE: ", rule.text, event);
    //i know i'm handling a click event
    const target = event.target;
    if (target.closest('input')) {
        global_rules_spine.noisePlayer.play();
    }
}));