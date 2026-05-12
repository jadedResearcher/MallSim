
//immediately envoked function does't run into namespacign issues
(() => {
    const src = 'http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/crawl-moshed-05-05-23-30-06-091.mp4'
    resultsEle.innerHTML = `<video src=${src} loop controls></video>`


})();