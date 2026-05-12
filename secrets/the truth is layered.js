
//immediately envoked function does't run into namespacign issues
(() => {
    const src = `<div style='background: black;color: white;font-family: Courier New;padding: 31px;'>
    
    All Faithful should be informed of the extreme difficulty extant in recording information within the Blasphemous Westerville Mall.

    Lights seem to dim quickly within it.

    Video records at reduced quality and at twisted angles.

    Even memories seem to bare the taint of uncertainty.

    The Sextant, briefly 'borrowed' from Eyedol Games, offered us a brief window into the Truth layered behind all the degradation and lies.

    It is recommended that we recover the Artifact as soon as is prudent, with full knowledge of the consequences of crossing the heretics within Eyedol Games.

    It is hypothesized that the Monsters within suffer no such handicaps.


    <u>Exhibit A</u>: Example of typical recording within the Blasphemous Mall. 
    <img style='width: 75%'src='http://farragofiction.com/MallSim/images/Diorama/CamillesDeathInAnOrangeJulius/maze_degradation.JPG'>

      <u>Exhibit B</u>: While the Sextant is active, the effect is blocked and pictures may be recorded normally. 
    <img style='width: 75%'src='http://farragofiction.com/MallSim/images/Diorama/CamillesDeathInAnOrangeJulius/flat_lighting_no_interesting_angles_thiswasjusta_ismostofeverything_done_test.jpg'>

</div>
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

