
//immediately envoked function does't run into namespacign issues
(() => {
    const src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/my_shrine_to_donut_got_scanned.mp4"
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();