
//immediately envoked function does't run into namespacign issues
(() => {
    const src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/tina_hesitatates_in_ice-moshed-01-25-12-15-33-935.mp4"
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();