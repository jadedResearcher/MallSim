
//immediately envoked function does't run into namespacign issues
(() => {
    const src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/maccus_full_routine-moshed-04-05-00-43-13-682.mp4'
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();