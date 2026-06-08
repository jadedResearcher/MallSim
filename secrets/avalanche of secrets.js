
//immediately envoked function does't run into namespacign issues
(() => {
    const linksRaw = `http://farragofiction.com/ColonistsEyes5/DocumentingTheKillerByRememberistOfQuests/
    http://farragofiction.com/ColonistsEyes5/LyreBird/
    http://farragofiction.com/ColonistsEyes5/StenographerOfPatternsAudioLogTranscripts/
    http://farragofiction.com/ColonistsEyes5/TheoristConfessions/
    http://farragofiction.com/ColonistsEyes5/gartic/
    http://farragofiction.com/ZampanioEyes4/BookOfX0/
    http://farragofiction.com/ZampanioEyes4/LiveBlogIllusionistsPowerpoint/
    http://farragofiction.com/ZampanioEyes4/SurvivorLiveblog/
    http://farragofiction.com/ZampanioEyes4/WatchedsSubGopherMaze/
    http://farragofiction.com/ZampanioEyes4/howjr_andic_brainstorm/
    http://farragofiction.com/ZampanioEyes4/iplayedPools/
    http://farragofiction.com/ZampanioEyes4/pinkishPickleLTE/
    http://farragofiction.com/ZampanioEyes4/theBestDude72/
    http://farragofiction.com/ZampanioEyes3/LavinracaSpeculation/
    http://farragofiction.com/ZampanioEyes3/MediumOriginStoryButNot/
    http://farragofiction.com/ZampanioEyes3/WatcherOfThreadsLabyrinthLiveBlog/
    http://farragofiction.com/ZampanioEyes3/Zam2anioLetsPlays/
    http://farragofiction.com/ZampanioEyes2/50thAnniversary/
    http://farragofiction.com/ZampanioEyes2/AIClaims/
    http://farragofiction.com/ZampanioEyes2/LifeSim2023/
    http://farragofiction.com/ZampanioEyes2/MemoriesOfThePast/
    http://farragofiction.com/ZampanioEyes2/Responses/
    http://farragofiction.com/ZampanioEyes2/Speculation/
    http://farragofiction.com/ZampanioEyes2/TheGuidesRabbitTheories/
    http://farragofiction.com/ZampanioEyes2/Title_Pending_Is_So_Zampanio/
    http://farragofiction.com/ZampanioEyes2/WatchersMemory/
    http://farragofiction.com/ZampanioEyes2/YongkiLiveBlogIntermssion/
    http://farragofiction.com/ZampanioEyes2/ZampaniniFeedback/
    http://farragofiction.com/ZampanioEyes2/guide_of_hunters_linear_gopher_maze_commentary/
    http://farragofiction.com/ZampanioEyes2/infinite_discord_hellmaze_branch/
    http://farragofiction.com/ZampanioEyes/WatchersMemory/
    http://farragofiction.com/ZampanioEyes/10_out_of_10_pun.PNG
    http://farragofiction.com/FractalShitpost/
    
    `;
    const links = linksRaw.split("\n")
    let src = "how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten how could i have forgotten<br>";

    for (let link of links) {
        src += `<a target ="_blank" href = '${link}'>${link}</a>`;;
    }

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

