
//immediately envoked function does't run into namespacign issues
(() => {
    const src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/crowd_goes_wild_for_clown.mp4"
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();