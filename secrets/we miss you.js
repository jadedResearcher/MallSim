
//immediately envoked function does't run into namespacign issues
(() => {
    const src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/hole-moshed-03-26-23-03-06-290.mp4'
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();