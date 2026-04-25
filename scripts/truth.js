const truthView = () => {
    alert("Oh. Hello there. It's you. This is the east so it seems I must put on my False Face. One moment. Hello!!! Welcome to the wild world of Zampanio!");
    /*
* achievement screen looking at all scenes in local storage, if it knows about 
a scene, will print it out as a little pill and you can click on it to get a little truth popup quip (truth is friendly) and it includes a password to unlock

* achievement screen has a rabbit hole icon you can enter passwords into (most unlock little easter eggs like red string video, a few unlock new scenes like maccus or jr or blorbos in the food court)
    */
    const body = document.querySelector('body');
    body.innerHTML = "";
    body.className = "survival";
}