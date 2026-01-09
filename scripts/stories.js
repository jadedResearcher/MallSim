/*
plain text stories with new lines

however i want to hide them in this sim (radio cipher minigame?)

parse them from here
*/
/*
http://www.farragofiction.com/ExperimentalMusic/
and
http://www.farragofiction.com/ASecondPersonalTranscript/
*/
//google docs is useful to convert doc to html and keep formatting, download as zipped web page then extract
const throg_diary_1 = `<p><span >SO</span></p>

<p><span >MY PARENTS SAID THAT IF I WANT TO EVER GET UNGROUNDED FROM BURNINATING THE BACKYARD</span></p>

<p><span >I HAD TO KEEP THIS DUMB JOURNEL</span></p>

<p><span >JOURNAL</span></p>

<p><span >DIARY</span></p>

<p><span >WHATEVER</span></p>

<p><span >WHICH IS STUPID</span></p>

<p><span >BECAUSE ITS GOING TO BE 🎃</span><strong><span >HALLOWEEN🎃&nbsp;</span></strong><span >SOON</span></p>

<p><span >AND THAT IS THE&nbsp;</span><strong><span >BEST&nbsp;</span></strong><span >DAY OF THE YEAR</span></p>

<p><span >BETTER THAN REAPING DAY BETTER THAN MY BIRTHDAY</span></p>

<p><span >BECAUSE THEN NO ONE YELLS AT YOU FOR WEARING A DINOSAUR COSTUME AND GOING AROUND BURNINATING THINGS AND NO ONE CORRECTS YOU IF YOU SAY BURNINATE AND TRIES TO ACT LIKE BURNING IS BETTER SOMEHOW</span></p>

<p><span >THE ONLY THING THEY YELL AT YOU FOR IS BEING TOO OLD FOR HALLOWEEN WHICH IS DUMB BECAUSE EVERYONE KNOWS THE SPIRIT OF HALLOWEEN DOESNT CARE ABOUT STUPID STUFF LIKE THAT</span></p>

<p><span >AND ITS EVEN&nbsp;</span><strong><span >MORE&nbsp;</span></strong><span >DUMB BECAUSE YOU CANT TELL ME MY STUPID PARENTS DIDNT JOIN THAT STUPID CULT&nbsp;</span></p>
<p><span >(WHICH IS WHAT IT IS NO ONE ACTUALLY SAYS ALTERNATIVE RELIGIOUS GROUP OUT LOUD AND MEANS THAT THATS STUPID NO ONE TALKS LIKE THAT)</span></p>

<p><span >ANYWAYS THEY DIDNT JOIN THAT STUPID CULT FOR ANY REASON BUT THEY WANTED TO DRESS UP IN THOSE COOL ROBES ALL YEAR BUT SOMEHOW IM THE ONE WHO IS A STUPID BABY BECAUSE I WANT TO WEAR A COOL COSTUME ALL YEAR</span></p>


<p><span >YEAH THATS RIGHT POP ITS A CULT AND I&nbsp;</span><strong><span >KNOW&nbsp;</span></strong><span >YOU&apos;RE GOING TO READ THIS BECAUSE WHY ELSE MAKE ME WRITE THIS STUPID THING</span></p>

<p><span >THIS IS STUPID IM GOING TO BED</span></p>

`;

const throg_diary_2 = `<p><span >OKAY MAYBE I WAS BEING A LITTLE MEAN BECAUSE I THOUGHT ID GET IN TROUBLE FOR CALLING IT A CULT BUT POP DIDNT EVEN LOOK MEAN AT ME AND DAD WAS TOO BUSY TRYING NOT TO ARGUE WITH HIM ABOUT SOME STUPID CULT THING SO I GUESS THEY REALLY ARENT READING THIS</span></p>
<p><span >WHATEVER</span></p>
<p><span >WHY MAKE ME WRITE THIS STUPID THING IF THEY ARENT EVEN GOING TO USE IT TO SPY ON ME</span></p>
<p><span >BUT THEY WONT LET ME GET UP FROM THE BREAKFAST TABLE UNTIL I WRITE ENOUGH SO I GUESS I HAVE TO KEEP GOING</span></p>
<p><span >STUPID</span></p>
<p><span >STUPID</span></p>
<p><span >STUPID</span></p>
<p><span >I GUESS THEY&apos;D NOTICE IF I JUST WROTE THE WORD STUPID OVER AND OVER AGAIN</span></p>
<p><span >SO I GUESS IF THEY REALLY ARENT READING THIS ILL WRITE ABOUT MY SUPER COOL DREAMS</span></p>
<p><span >IN MY DREAMS ITS ALWAYS HALLOWEEEN AND IM STOMPING AROUND IN THIS REALLY COOL CORN FIELD AND ITS ALL FOGGY AND DARK AND THERES ALL THESE SECRETS AND CANDY AND MONSTERS BUT ITS OKAY BECAUSE I AM THE SCARIEST MONSTER OF ALL AND I BURNINATE EVERYTHING AND ITS REALLY COOL</span></p>
<p><span >THERE IS A BIG GREEN LADY WITH A REALLY COOL TV HEAD AND SHE TELLS ME THAT I CHOOSE CANDY OVER FRIENDS LIKE I DIDN&apos;T ALREADY KNOW THAT.</span></p>
<p><span >I HAD THE DREAM LAST NIGHT OF COURSE BUT IM SO COOL AND AWESOME I ACTUALLY HAVE THE DREAM JUST ABOUT EVERY NIGHT</span></p>
<p><span >THERES THESE GUYS IN COOL ROBES TOO, JUST LIKE MY PARENTS SOMETIMES WEAR BEFORE BEING GONE ALL NIGHT&nbsp;</span></p>
<p><span >THATS RIGHT POP, I KNOW YOU GUYS ARE SNEAKING OUT AT NIGHT</span></p>
<p><span >IM NOT STUPID</span></p>
<p><span >REX ALWAYS BARKS WHEN YOU GO OUT</span></p>
<p><span >ANYWAYS I THINK I WROTE ENOUGH BECAUSE POP ISNT WATCHING ME LIKE A HAWK ANYMORE SO IM GONNA GO PLAY OUTSIDE</span></p>
`;
const throg_diary_3 = `<p><span >THIS IS STUPID AND IM NOT GOING TO DO IT THEY CANT MAKE ME DO IT</span></p>
<p><span >AND ITS NOT&nbsp;</span><strong><span >FAIR</span></strong></p>
<p><span >I THOUGHT THEY WERENT READING THIS AND YOU CANT JUST SUDDENLY READ IT AND SNITCH ON ME!!!!!!!!!!!!!!!!!!!!!!</span></p>
<p><span >I ALREADY&nbsp;</span><strong><span >KNEW&nbsp;</span></strong><span >MY DREAMS WERE SUPER COOL AND SPECIAL BUT THEY WERE&nbsp;</span><strong><span >MY&nbsp;</span></strong><span >DREAMS</span></p>
<p><span >I HATE YOU POP I HATE YOU DAD WHY DID YOU HAVE TO GO AND TELL YOUR STUPID CULT FRIENDS ABOUT MY COOL DREAMS</span></p>
<p><span >I DON&apos;T&nbsp;</span><strong><span >CARE&nbsp;</span></strong><span >THAT THEY ARE ABOUT THE STUPID GOD YOU WORSHIP&apos;S STUPID CORN ORIGIN OR WHATEVER ITS&nbsp;</span><strong><span >MY&nbsp;</span></strong><span >DREAM AND&nbsp;</span><strong><span >MY&nbsp;</span></strong><span >COOL MONSTERSONA</span></p>
<p><span >RAAAAAARGGH!!!!!!!!!!</span></p>
<p><span >NOW THEY WANT ME TO ACTUALLY GO TO CULT MEETINGS SO GROWN UPS CAN ASK ME ABOUT MY DREAMS AND I DON&apos;T&nbsp;</span><strong><span >WANT&nbsp;</span></strong><span >TO</span></p>
<p><span >ILL BURNINATE ANYONE WHO MAKES ME!!!!!!!!!!!!!!!!!!!!!!!!!!!</span></p>
`;
const throg_diary_4 = `<p><span >I HATE THIS STUPID CULT</span></p>
<p><span >THEY ALL THINK IM STUPID AND A LITTLE KID AND DONT KNOW ANYTHING</span></p>
<p><span >THEY ASKED ME ALL THESE STUPID QUESTIONS THAT DIDNT EVEN&nbsp;</span><strong><span >MATTER&nbsp;</span></strong><span >AND THEN GOT MAD AT ME FOR NOT KNOWING THE ANSWER</span></p>
<p><span >IM SORRY BUT NO ONE CARES WHAT APOTHEEOASIS OR WHATEVER MEANS</span></p>
<p><span >NOW THEYRE GOING TO MAKE ME TAKE EXTRA CLASSES AND WEAR A DUMB ROBE AND EAT BUGS AND I DONT LIKE ANY OF THAT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</span></p>
<p><span >AND THEYRE ACTING LIKE IM A STUPID LITTLE KID FOR NOT LIKING IT!!!!!!!!!!!!!!</span></p>
<p><span >I DON&apos;T CARE HOW EXPENSIVE THAT LOBSTER WAS THATS A BIG RED BUG AND YOU CANT MAKE ME EAT IT!</span></p>
<p>RAAAAAARGGH!!!!!!!!!!</p>

`;
const throg_diary_5 = `<p><span >DEAR POP AND DAD,</span></p>
<p><span >YOU&apos;LL BE SORRY YOU WERE SO MEAN TO ME.</span></p>
<p><span >I AM GOING AWAY NOW AND YOU WONT FIND ME BECAUSE I AM SUPER GOOD AT HIDING.</span></p>
<p><span >LOVE</span></p>
<p><span >THROGDAZORG</span></p>
<p><span >P.S. YOUR CULT SUCKS AND YOU DONT HAVE TO LET THEM MAKE YOU EAT BUGS JUST BECAUSE I HAVE COOL DREAMS</span></p>
<p><span >THATS BULLYING</span></p>
<p><span >P.P.S I TOOK MY COSTUME WITH ME BECAUSE ITS MINE AND I BOUGHT IT WITH MY ALLOWANCE FROM THAT COOL STORE AT THE MALL AND IT WAS STUPID YOU TOOK IT AWAY FROM ME AND I KNEW WHERE YOU HID IT BECAUSE YOURE BAD AT HIDING</span></p>
<p><span >P.P.P.S PLEASE TAKE CARE OF REX FOR ME HE DID NOTHING WRONG HERE</span></p>
`;
const throg_diary_6_wibby_interlude = `<p><span >Witherby puffs out a sigh, ignoring the cold fog that swirls from his mouth, not even bothering to hide its strangeness with a cigarette.</span></p>
<p><span >The kid ugly crying into his side in the dinosaur onesie wasn&apos;t exactly about to notice.</span></p>
<p><span >His instincts tug on him. Polite and refined weren&apos;t going to work well on this Resident.&nbsp;</span></p>
<p><span >He pulls the kid back, squatting a bit to get down below him, to not look down on him, and hands him over a handkerchief.&nbsp;</span></p>
<p><span >The kid stares at it like he&apos;d never seen one before, and judging from all the snot stains on the onesie, Witherby was willing to believe he hadn&apos;t.</span></p>
<p><span >&quot;Kid&quot;, he says, gently, but slightly aloof, not a difficult character to play.</span></p>
<p><span >&quot;I can&apos;t understand a word you&apos;re saying. Blow your nose and we can talk it out okay?&quot;</span></p>
<p><span >There&apos;s a burbly grumble from the kid but he blows his nose anyways and Witherby calls it a win.</span></p>
<p><span >&quot;I&apos;M NOT A KID&quot;, the kid shouts, as soon as he can get a deep breath.</span></p>
<p><span >Well then.</span></p>
<p><span >&quot;Sure, sure, my mistake, I can hear how big you are now&quot; he says, all agreeable like.&nbsp;</span></p>
<p><span >&apos;GOOD! I AM A BIG SCARY DINOSAUR!&apos;</span></p>
<p><span >Oh boy.</span></p>
<p><span >&quot;Very impressive. What species are you?&quot; Get the kid talking and he&apos;ll naturally stop spiralling. Simple.</span></p>
<p><span >&quot;</span><em><span >Tarbosaurus</span></em><span >!&quot; came the reply, smaller than expected.</span></p>
<p><span >There&apos;s a flinch in the kid&apos;s eyes, waiting for something bad to happen in response.&nbsp;</span></p>
<p><span >Witherby chuckles warmly. A practiced chuckle, to be sure, so he was always careful to only use it in moderation in case the artificial perfection of it was noticed with repetition.</span></p>
<p><span >But he needed it now.&nbsp;</span></p>
<p><span >He felt that tug, thankfully small, but still that cold, monstrous hunger in the pit of his belly, seeing that flinch in the kid&apos;s eyes.&nbsp;</span></p>
<p><span >The kid didn&apos;t think of other people as safe to be himself around.</span></p>
<p><span >How...Lonely...&nbsp;</span></p>
<p><span >How easy it would be to just isolate this Resident until the Mall slowly devoured him, turning him into something that could never connect with another soul again.</span></p>
<p><span >The kid would thank him for it.</span></p>
<p><span >...</span></p>
<p><span >&quot;Tarbosaurus huh? &nbsp;Just the sort of impressive knowledge I would expect a dinosaur to have!&quot; He leans forward, conspiratorial, bringing the kid into a world where just the two of them know something &nbsp;together. &quot;You know, I have this friend, Devona, who probably knows just about everything there is to know about dinosaurs. Tarbosaurus included&quot;.&nbsp;</span></p>
<p><span >He&apos;s careful to get the name of the dinosaur right both times. No flubbing the pronunciation, no revealing even a hint of mockery or disrespect. Say it exactly how the kid said it, no changes.</span></p>
<p><span >&quot;NO WAY I BET I KNOW MORE THAN YOUR FRIEND&quot; the kid bellows, directly into his ear. Conspiracy canceled. Witherby flawlessly resists flinching, he needs to be as frictionless as possible for this Attachment work to go smoothly. Needs to not have the Resident think they&apos;re doing anything wrong.</span></p>
<p><span >He waits long enough that its not, technically, a reaction to the bellow and stands up, still grinning easily.</span></p>
<p><span >&quot;You just might yet&quot; he agrees, &quot;Maybe you can meet her. What brings you this far into the Mall? Not many people go here...&quot; No judgement. No lecture on safety or legality. Let this kid meet him where he is.</span></p>
<p><span >The kid looks down.&nbsp;</span></p>
<p><span >&quot;My parents... MY PARENTS ARE IN THIS DUMB CULT AND THEY WANTED ME TO EAT BUGS AND GO TO CLASSES AND THEY SAID MY DREAMS WERE TOO COOL AND THEY&nbsp;</span><strong><span >PROMISED&nbsp;</span></strong><span >ME THEY WEREN&apos;T GOING TO READ MY JOURNAL!&quot;</span></p>
<p><span >Ah. Classic runaway then.&nbsp;</span></p>
<p><span >The tug again. Stronger.&nbsp;</span></p>
<p><span >The kid doesn&apos;t think anyone would miss him.&nbsp;</span></p>
<p><span >The skull in his head begins whispering dark secrets to him. All the sins this kid has committed. All the reasons why it would be Just to let him rot in the dark, alone and forgotten.</span></p>
<p><span >He ignores it.</span></p>
<p><span >It&apos;s a kid.</span></p>
<p><span >And if there&apos;s one thing he gets that that skull doesn&apos;t, its that kids are Innocent.</span></p>
<p><span >No sin of their&apos;s gets to count for anything.</span></p>
<p><span >So.</span></p>
<p><span >Classic runaway procedure.&nbsp;</span></p>
<p><span >Give the kid a tour, point out the lack of bedtime stories and three square meals and toys and stuff as if its perks, have the kid come to their own conclusion about where they would rather be, &apos;regretfully&apos; escort them back outside, maybe even as far as a block or two from their house and be done with it all.</span></p>
<p><span >He slips into his role fully, locking his cold, cold heart behind the warmly smiling mask.</span></p>
`;
const throg_diary_7 = `<p><span >SO</span></p>
<p><span >UH</span></p>
<p><span >I GUESS I DON&apos;T REALLY HAVE TO WRITE IN THIS DUMB BOOK ANYMORE.</span></p>
<p><span >BUT I FIGURED...</span></p>
<p><span >IF I WERE READING A SUPER COOL BOOK ABOUT A TERRIFYING DINOSAUR AND THE LAST THING IN IT WERE ABOUT HOW THEY WERE LEAVING I WOULD BE MAD THAT I NEVER FOUND OUT WHAT HAPPENED NEXT.</span></p>
<p><span >SO.</span></p>
<p><span >IT TURNS OUT HIDING IN A MALL IS WAY MORE BORING THAN YOU&apos;D THINK.</span></p>
<p><span >THERE ARE WAY MORE SUIT STORES THAN TOY STORES AND ALL THE TOYS ARE DUSTY AND BROKEN.</span></p>
<p><span >AND THE FOOD SUCKS.</span></p>
<p><span >NO DINO NUGGIES.&nbsp;</span></p>
<p><span >THIS WEIRD OLD DUDE TRIED TO CONVINCE ME THAT KALE SMOOTHIES ARE SOMEHOW BETTER THAN DINO NUGGIES.&nbsp;</span></p>
<p><span >GROSS.</span></p>
<p><span >I ROARED AT HIM UNTIL HE AGREED TO TAKE ME HOME.</span></p>
<p><span >HE WAS WEIRD.</span></p>
<p><span >POP AND DAD CRIED A LOT WHEN I CAME HOME INSTEAD OF YELLING AT ME.</span></p>
<p><span >I GUESS THEY DIDN&apos;T KNOW HOW MUCH I DIDN&apos;T LIKE ALL THE WEIRD SPECIAL TREATMENT EVEN THOUGH I YELLED ABOUT IT A LOT.</span></p>
<p><span >THAT WEIRD OLD GUY TOLD ME THAT IF YOU ALWAYS DO THE SAME THING IN THE SAME WAY PEOPLE CANT NOTICE WHEN YOU DO IT SLIGHTLY DIFFERENTLY.&nbsp;</span></p>
<p><span >HE SAID THAT ROARS ARE WAY SCARIER IF YOURE MOSTLY QUIET AND THEN ROAR BUT WHEN YOU&apos;RE ALWAYS YELLING A ROAR IS SORT OF HARD TO NOTICE?</span></p>
<p><span >I WAS THINKING ABOUT THAT WHILE POP AND DAD WERE HUGGING AND CRYING AND APOLOGIZING TO ME.</span></p>
<p><span >MAYBE BECAUSE I YELL A LOT THEIR EARS CANT UNDERSTAND WHEN IM UPSET YELLING?</span></p>
<p><span >SO I TOLD THEM IF I WAS UPSET YELLING I&apos;D TELL THEM I WAS UPSET YELLING SO THEY WOULDNT GET CONFUSED BUT THAT CONFUSED THEM TOO!</span></p>
<p><span >THEN THE CULT BOSS OR WHOEVER, THE LADY WITH ALL THE HAIR CAME BY AND APOLOGIZED TO ME TOO AND SAID THAT I WAS TOO COOL TO LOSE AND ASKED WHAT WOULD MAKE ME HAPPY.</span></p>
<p><span >I TOLD HIM I LIKED BEING A DINOSAUR AND POP AND DAD EXPLAINED ABOUT MY COSTUME LIKE I WASN&apos;T ALREADY WEARING IT AND THE BOSS LADY SAID THAT THERES THIS THING CALLED LARPING AND SHE COULD GET ME IN!</span></p>
<p><span >APPARENTLY KIDS AND GROWNUPS WHO LARP GET TO WEAR COSTUMES AND HAVE COOL FIGHTS ALL THE TIME?????????? I THOUGHT EVERYONE WAS JUST BORING UNLESS ITS HALLOWEEN BUT APPARENTLY I JUST WASN&apos;T MEETING THE RIGHT KINDS OF GROWNUPS AND KIDS!</span></p>
<p><span >SO HOPEFULLY THEY ARE COOL BUT NOT AS COOL AS ME AND AREN&apos;T MEAN OR STUPID OR SOMETHING.</span></p>
`;
const throg_diary_8 = `<p><span >SO MARK THE WIZARD CAST THIS REALLY REALLY COOL SPELL TODAY AND KABLAM AND KABLOOY AND THERE WERE ALL THESE COOL SPECIAL EFFECTS AND I ASKED HIM HOW HE DID IT AND HE SAID THAT HE COULD SHOW ME THE APP ON HIS PHONE AND I ASKED IF I COULD USE IT TO BURNINATE STUFF BETTER DURING THE LARP AND HE SAID HE THOUGHT I COULD AND HE IS GOING TO COME OVER AFTER LARP TODAY TO EXPLAIN TO MY PARENTS WHAT APP I NEED AND WHY ITS TOTALLY WORTH THE MONEY TO SPEND ON IT AND THAT&apos;S SO COOL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</span></p>
<p><span >AND GINNY THE ELF SAID HER MOM NEVER LETS HER EAT DINO NUGGIES SO I TOLD HIM SHE HAD TO COME OVER TOO SO THAT SHE COULD HAVE DINO NUGGIES AT MY PLACE AND IT WOULD BE JUST LIKE THAT TIME WE FOUND MANA FROM THE GODS IN THE FOREST OF SECRETS BUT BETTER BECAUSE MANA IS JUST BREAD BUT DINONUGGIES ARE BREAD&nbsp;</span><strong><span >AND&nbsp;</span></strong><span >MEAT</span></p>
<p><span >AND IM WRITING THIS HERE BECAUSE I THINK THIS MIGHT BE THE HAPPIEST IVE BEEN SINCE I GOT THIS BIG KIDS SIZED DINOSAUR COSTUME AND I THOUGHT MAYBE MY DIARY THING WANTED TO KNOW ABOUT ME BEING HAPPY BECAUSE I AM PRACTICING LETTING PEOPLE KNOW WHEN I AM HAPPY BECAUSE IT HELPS MY POP AND DAD AND TEACHERS AND THAT CULT BOSS LADY KNOW HOW TO HELP ME BE HAPPY</span></p>
<p><span >ANYWAYS GOODBYE!</span></p>
`;


const terri_report1 = `<p>>Ms. Wanda CEBro,</span></p>
<p>>Please accept this letter as formal notification of my resignation from Eyedol Games, LLC, effective immediately.</span></p>
<p>>It pains me to leave as I have genuinely believed in the core values of Confusion, Creepiness and Comfort. &nbsp;Eyedol Games has been THE most accessible makers of bespoke horror experiences in the industry and a wonderful start to my career.</span></p>
<p>>Which is why it came as a shock to realize that Eyedol Games has actively been working against the expansion of the Universe into more and more mazes. Actively working against more people gaining the ability to create the maze they want to see in the world.&nbsp;</span>><br></span>><br></span>>Please give Ms CFO my regards, but I just can not commit myself to the future she seems so determined to pursue. To avoid an End at all cost is to commit oneself to stagnation.&nbsp;</span></p>
<p>>Change comes to us all, the Church of the Harvest tells us, and it is up to each of us to Serve as we are able the Inspiration we find in it.</span></p>
<p>>&nbsp;</span></p>
<p>>Thank you for the opportunity to work together.</span></p>
<p>>Terri Mathews</span></p>
`;
const terri_report2 = `<p class="c6"><span class="c5">To</span><span class="c1">: Wanda, CEO of Eyedol Games</span></p>
  <p class="c10"><span class="c5">From</span><span class="c1">: JR, Leader of the Quotidian Quorom</span></p>
  <p class="c10"><span class="c5">Subject</span><span class="c1">: Corporate Espionage</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c7"><span class="c18">Today I completed all required tasks two hours ahead of schedule, leaving ample time
      for my mandatory </span><span class="c5">SOCIAL SMILING INTERVALS</span><span class="c1">. I executed four. That
      is above average, I believe.</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">[Small Talk Concluded] </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Note</span><span class="c1">: All information provided is protected by the Terms and
      Conditions of Eyedol Games employment contract and may be subject to external laws or regulations.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Summary</span><span class="c1">:</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Target "Terri Mathews" has been confirmed to have left Eyedol Games employment. 95%
      chance of current employment in the "Cult of the Harvest", formerly the "Cult of the Nameless One" (see attached
      addendum LAV-C-002). </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Preliminary information indicates she has been spending the majority of her time with
      this cult, and had recently filed a mandatory "Apocalypse Warning" regarding them as outlined in the Eyedol Games
      Employee Guidebook (see attached addendum 6b). The CFO took action accordingly and informed the TRAINING TEAM
      immune system as per the Eyedol Games Employee Guidebook.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Further reports pending espionage activities from junior members and Quotidian Interns.
    </span></p>
    <br>
    http://farragofiction.com/CodexOfRuin/
  `;
const terri_report3 = `<p class="c6"><span class="c5">To</span><span class="c1">: Wanda, CEO of Eyedol Games</span></p>
  <p class="c10"><span class="c5">From</span><span class="c1">: JR, Leader of the Quotidian Quorom</span></p>
  <p class="c10"><span class="c5">Subject</span><span class="c1">: Corporate Espionage</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c7"><span class="c1">I intend to spend this upcoming Reaping Day attempting to court that fetching pink
      doctor with the bird face again. However no matter how many facts I uncover and expose about her, she still snubs
      me by refusing to respond in kind. Any appropriate advice would be rewarded.</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">[Small Talk Concluded] </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Note</span><span class="c1">: All information provided is protected by the Terms and
      Conditions of Eyedol Games employment contract and may be subject to external laws or regulations.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Summary</span><span class="c1">:</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">According to agent "Doug Walker" assigned to monitor location "DOG WAREHOUSE" , the
      following is accurate and Relevant:</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Approximately three months ago, target "Terri Mathews" was documented encountering
      known abnormality "TWIG" (see addendum LAV-C-003-A). </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">She participated in ESPIONAGE activities of a particularly low level, following "TWIG"
      back to their warehouse location before being caught.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Information was exchanged, including shared dreams involving a corn maze (see addendum
      LAV-C-002). </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">A transcript of this exchange is as follows (labeled with date and time and format):</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: *gasp*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Twig: *growling*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: I!</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">*a small scuffle ensues, Twig soundly winning and dragging her inside the warehouse to
      present to Rava*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: What's this? Good dog, Twig, spit her out.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: I can explain I--</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: Stop mewling, pup. You'll bark when I tell you.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">*several minutes of silence*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: You have the stink of you of one of *them*.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: ...</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: One of those maze freaks.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: ... *visibly stopping herself from responding*<br><br>Rava: Can't say they
      trained you entirely badly though.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">*several more minutes of silence in which this operative reached a new level of RoboCat
      Quest 3*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: Start yapping, pup. &nbsp;Why were you snooping around our territory.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: Oh! Um! First of all I really want to apologize for--</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Twig: *growling*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: *evenly* Why were you snooping around our territory.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: *gulp*</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: I recognized Twig.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: ...</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: From my dreams...</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Terri: Corn maze dreams.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Rava: ...</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri: And...I wanted to ask them if they recognized me?</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Rava: So you knocked on the door all friendly like instead of sniffing around the
      edges of our territory like you thought you could pull one over on us.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri: NO! I! I just... </span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri: *small voice* This warehouse is scary.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri: And not in the fun way.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri: I thought....</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Rava: *jerking her head towards Twig*, so. Pup. You recognize this one?</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Twig: *sniffs*</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Twig: You called me 'Dracula Enthusiast' in the corn maze.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Twig: You seemed happy.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Twig: You were alright.</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Rava: Well well well...</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">*Rava and Twig proceed to drag her to a third location outside of this operatives
      territory*</span></p>
  `;
const terri_report4 = `<p class="c6"><span class="c5">To</span><span class="c1">: Wanda, CEO of Eyedol Games</span></p>
  <p class="c10"><span class="c5">From</span><span class="c1">: JR, Leader of the Quotidian Quorom</span></p>
  <p class="c10"><span class="c5">Subject</span><span class="c1">: Corporate Espionage</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c7"><span class="c1">Ah yes, the weather! I, too, enjoy discussing it in casual break-room contexts. The
      recent increase in atmospheric moisture has proven advantageous for feather—</span></p>
  <p class="c7"><span class="c1">I mean hair. Human hair. Mine is extremely typical.</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">[Small Talk Concluded] </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Note</span><span class="c1">: All information provided is protected by the Terms and
      Conditions of Eyedol Games employment contract and may be subject to external laws or regulations.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">According to agent "Carrie Harrison" assigned to monitor location "Cult HQ" , the
      following is accurate and Relevant (Incidentally, my apologies for her less than professional communication style,
      she is still only 18 months old):</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Approximately three months ago, target "Terri Mathews" was documented encountering the
      leader of the Cult of the Harvest (see addendum LAV-C-002) which THIS operative still claims bears a remarkable
      similarity to L-C-002 (surely its not a coincidence, LAV-C-002 only differs from the "Eye Killer"'s designation by
      TWO LETTERS!!!!!! The Truth Cannot Be Silenced!!!!!!!!!! The Cultist is the Same Person as the Killer!
      CAW!!!!!!)</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Terri was IMMEDIATELY recruited into the Cult, despite everyone saying she worked for
      the "ENEMY" which is totally suspicious if you ask me. </span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">The Cult has designated her one of the "Dreamers" along with that cool dinosaur kid
      (what DID destroy the dinosaurs? More at 11!!!!!!!!!!!)</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Not only THAT! But apparently she's PARTIALLY WASTED! &nbsp;Something about a
      knowledge of Mazes being useful for getting "HARVEST FRUIT" to pass the Echidna's barrier that lets only
      information through??? (I call bullshit, isn't ALL fruit harvested????????????????)</span></p>
  <p class="c11 c2"><span class="c1"></span></p>
  <p class="c11"><span class="c1">Anyways apparently they've been reaaaaaaallly close to a break through! Something
      about DNA being just information, when you get down to it. MEMES ARE THE DNA OF THE
      SOUL!!!!!!!!!!<span></p>
  <p class="c11 c2"><span class="c1"></span></p>

  `;
const terri_report5 = `<p class="c6"><span class="c5">To</span><span class="c1">: Wanda, CEO of Eyedol Games</span></p>
  <p class="c10"><span class="c5">From</span><span class="c1">: JR, Leader of the Quotidian Quorom</span></p>
  <p class="c10"><span class="c5">Subject</span><span class="c1">: Corporate Espionage</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c7"><span class="c18">"This weekend I intend to engage in ‘</span><span class="c5">RELAXATION</span><span
      class="c1">,’ which involves sitting on a power line near the mall and observing other humans for recreational
      purposes. Should any shiny objects be discovered, I will of course report them to the proper authorities, as a
      polite human would."</span></p>
  <p class="c7 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">[Small Talk Concluded] </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c5">Note</span><span class="c1">: All information provided is protected by the Terms and
      Conditions of Eyedol Games employment contract and may be subject to external laws or regulations.</span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">Various agents collated these pieces of information, for ease of perusal. We here at
      the Quotidian Quorum Information System pride ourselves in convenience and there is no reason for you to search
      your own chat history for Relevant information. </span></p>
  <p class="c0 c2"><span class="c1"></span></p>
  <p class="c0"><span class="c1">troveTextravaganza: wanda.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: baby.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: cinnamon bun.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: my sister from another mister.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: why did one of our actual human employees</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: just hand me a brand new Artifact of the Apocalypse?</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: in FRUIT form no less?</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: do you know how scared I am holding this thing?</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: i dont caaaaaaaaaaaaaaaaaaaaaaare how tiny a pomegranate seed
      is</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: that version of my wife that works for this company is gooooooooing
      to find it and eat it and then the apocalypse will happen</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: so i am sitting here</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: neck deep in shitty javascript code</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: trying to hack it to stop existing</span></p>
  <p class="c0"><span class="c1">CEBro: ARIL</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: ...</span></p>
  <p class="c0"><span class="c1">CEBro: I THINK A POMEGRANATE SEED IS TECHNICALLY AN ARIL, BRO</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: wanda.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: baby.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: cinnamon bun.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: use that universe sized brain of yours</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: and Know whether or not this is the time</span></p>
  <p class="c0"><span class="c1">CEBro: SORRY</span></p>
  <p class="c0"><span class="c1">CEBro: FUCK</span></p>
  <p class="c0"><span class="c1">CEBro: WHAT DO YOU WANT ME TO DO</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: ...</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: ...</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: is it too late to just end this loop?</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: much as i hate causing an Apocalypse on purpose?</span></p>
  <p class="c0"><span class="c1">CEBro: CHECKING...</span></p>
  <p class="c0"><span class="c1">CEBro: FUCK</span></p>
  <p class="c0"><span class="c1">CEBro: NOPE</span></p>
  <p class="c0"><span class="c1">CEBro: LIKE</span></p>
  <p class="c0"><span class="c1">CEBro: 31 OF THEM HAVE JOINED THE LOOP ALREADY</span></p>
  <p class="c0"><span class="c1">CEBro: CATS OUT OF THE BAG</span></p>
  <p class="c0"><span class="c1">CEBro: IF WE NOPE OUT OF HERE</span></p>
  <p class="c0"><span class="c1">CEBro: THEY COME RIGHT WITH US</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: fuck.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: okay well.</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: i guess lets get Training on it</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: its why we pay them</span></p>
  <p class="c0"><span class="c1">CEBro: HEY LOOK ON THE BRIGHT SIDE</span></p>
  <p class="c0"><span class="c1">CEBro: AT LEAST ITS INTERESTING</span></p>
  <p class="c0"><span class="c1">CEBro: AND MAYBE THOSE OBSERVERS WILL START MEDDLING AGAIN</span></p>
  <p class="c0"><span class="c1">CEBro: COULD BE FUN</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: siiiiiiiiigh</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: im not gonna remind you why 'potential apocalypses are fun and
      good'</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: is not gonna work with me</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F1X TH1S</span></p>
  <p class="c0"><span class="c1">troveTextravaganza: or i will</span></p>
  `;





//i think its extremely important for all lore dumps to have gimmicks
const witherys_sacrificial_lamb = `<p>The mall was like a head trauma patient, left bleeding and confused, but hanging onto life by a thread.</p>


<p>It wasn&apos;t always like that, Witherby was well aware, but ain&apos;t that the truth for all of us? Isn&apos;t. Isn&apos;t &nbsp;that the truth. &nbsp;He shakes his head. &nbsp;It isn&apos;t like him to fall back to childhood slang, even within the sanctity of his own mind. He must be tired.</p>


<p>He stares down at the motley crew before him. A carefully chosen group of thugs, not a single one of which he&apos;d be sorry to lose. &nbsp;He&apos;s trying out code names, again, this time, to emphasize the distance he expects to maintain. &nbsp;Randomly assigned, he assures them, when feathers get ruffled.</p>


<p>Lamb raises his hand. &quot;So. Uh. Boss. Youse really expects us to believe that this here mall basement is... what. &nbsp;Alive? What kinda idiots you got us pegged for?&quot;</p>


<p>The others gawk at the insubordination. He&apos;s trying out six total this time. He thinks he almost has the dynamic perfected.&nbsp;</p>


<p>He turns to Chick. &quot;And you? Do you find yourself similarly incredulous? Lacking faith?&quot; His words are smooth and quietly assured, he is well aware.</p>


<p>&nbsp;The man nods, nervously. &nbsp;&quot;Boss. I uh. I don&apos;t think its. Unreasonable. To wonder if all this talk of. Spooks. And Ghosts. And all that. Is. Uh. Just to mess with us.&quot;&nbsp;</p>


<p>Witherby glances at Gosling, Cygnet, Piglet and Foal. Just as expected, they are simply waiting for the theatrics to be over. Good. &nbsp;(He reminds himself that he doesn&apos;t miss Calf. That it&apos;s good he&apos;s left out this loop. That he was never meant for this kind of life.)</p>


<p>Time to move into the next phase. &nbsp;He straightens his tie.</p>


<p>&quot;Lamb, there is no amount of mere words that will convince you. I can see you are a practical man. &quot; He can see the man is an incurable simpleton who will get himself killed. And if Witherby is lucky, not take anyone else out with him, this time.</p>


<p>He steps forward, arms outstretched as if in supplication. &quot;I recommend you pass this opportunity up, if you can not commit yourself to following my simple rules.&quot; &nbsp;He lets that sink in for a beat before reminding those assembled of the carrot in play. &quot;I will not deny that the potential haul is a tempting one. The vast majority of the underground sections of the Mall are largely intact, with merchandise simply lying around for the taking. Electronics. Clothing. Jewelry. All things in high demand in &apos;second hand markets&apos;. But please do keep in mind that no haul could possibly be worth your life.&quot;</p>


<p>The Sin of Greed wins out, as Witherby knew it would and the man growls and shakes his head. &quot;Nah. Nah Boss. I&apos;ll play nice. Just like youse says. We check in every ten minutes. We hide if we think we sees someone. We don&apos;t go too deep, no matter what we think we see. We get out if we start feeling weird.&quot;</p>


<p>Chick looks disappointed, but he&apos;ll not be the first to step out of line. Not with the public proclamation of good faith by Lamb. Things appear to be running smoothly.</p>


<p>&quot;Then, all I can say, gentleman, is good hunting.&quot;</p>


<p>They trundle down the stairs, movements made awkward with bags and gear.&nbsp;</p>


<p>Witherby stares out into the main floor of the mall, on his own once again. &nbsp;The security lights serve only to make the shadows deeper. &nbsp;It&apos;s strange, he muses, how obviously different this public floor of the mall is from what lies underneath. &nbsp;As if merely sleeping peacefully, secure in the knowledge that come morning throngs of people will fill its hollows once again. &nbsp;A mall nestled in the fulfillment of its purpose.</p>


<p>He heads down and the thick, familiar scent of abandonment wreathes him like a halo. &nbsp;A strange twin of what lies above, this mall is unsettlingly empty. As if humanity has forgotten it entirely. And yet, Witherby knows instinctively that it has not forgotten humanity. &nbsp;The patient going through the confused motions of a half remembered life.</p>


<p>The twisted shops and forlorn geometry get worse the longer it suffers, he knows. It needs people. Like a body needs blood. Needs to have objects moved out of it, like blood cells moving oxygen. Helps it think better. Remember what it&apos;s supposed to be better.</p>


<p>And so he provides. Basic Attachment work really, filling this strange place&apos;s social needs. A bit of Instinct as well, he supposes, but he was hardly terrible at that.</p>


<p>He wanders the halls semi-aimlessly as he waits for the first scream. Ah. There we go.&nbsp;</p>


<p>He lets himself run, even sweat a bit. &nbsp;Every detail a novel&apos;s worth of communication, if you would but look at it. His previous perfection in appearance allowed to falter to convey sincerity and effort. &nbsp;To drive home the cost of failing to follow his rules.</p>


<p>Chick is dragging a mangled mannequin forwards with great effort. The Sacrificial Lamb has played his part to a T, it would seem. &quot;What happened?&quot; Witherby huffs out, only slightly exaggerating the effort he put into getting here so quickly.&nbsp;</p>


<p>&quot;Boss! He! He! I found him... I. Boss! I!&quot; Ah. Chick was panicking. &nbsp; The Solemn stepped forward and held the man&apos;s gaze for several beats. &nbsp;The temperature of the room dropped slightly as he waited for the mental corruption to fade. &nbsp;Chick appeared to have no physical injuries. The Solemn refused to lose him this time. Mere fear was no worthy opponent for him.</p>

<p>&quot;Chick.&quot; he said calmly, evenly. &quot;I am here. You are safe. Tell me what is going on. What happened? Who is this?&quot;</p>

<p>The man swallowed, then gestured weakly to the obviously dead man. &quot;I. I don&apos;t know. But... I think this is Lamb...&quot;</p>

<p>Witherby nodded, calm and assured, and bent down to examine the prone figure. &nbsp;He fails to fully repress a sigh. &nbsp;With genuine sadness, he touches the wooden chest. &nbsp;&quot;I warned him. That going too deep was dangerous. &nbsp;But for him to go so far as to... &quot;, he prods the jagged stumps where arms had been. &quot;To provoke one of the living inhabitants. I&apos;m sorry Chick. We have lost him. I wish I had been better able to warn him.&quot;</p>


<p>And it&apos;s true. He hates the calm coldness inside of him that found this solution. Wishes there had been a better way. But without seeing the consequences with their own eyes...without a Lamb to slaughter... It only ever goes worse. Better to lose one than the whole group. Those who remain get their ill-gotten gains, the mall gets its patrons, and Training gets a relatively coherent space to live in.</p>


<p>He gives the signal on the radio for everyone to regroup and begins the slow, grim work of helping Chick drag the body back upstairs.</p>

`


//sam and doc slaughter shaking hands and saying "the only thing that matters is being palatable to hypothetical strangers who are really mean"
//they took the "truth of their being" out back and shot it like a rabid dog


/*
post 2025 lavinraca: 

and now the eye killer challenging them to duels is even funnier
earlier loops it was a terrifying off wall thing for a serial killer to do
very few cultists even had decks
now its just
"oh yes of course the monster in the air vent wants to play yugioh'
*/

const harvest_parable = `<p><span >Once upon a time, there was a teen god named the Harvest.</span></p>

<p><span >Every day she read her books and played her card games and wallowed in hedonism, until one day, the Faithful asked her what would happen if she did not reap what she sowed.</span></p>

<p><span >She was confused. What do you mean that sometimes things could be unpredictable?</span></p>

<p><span >She touched one of the Prayers and it bloomed into a flower which grew a fruit which gave her a card she never could have predicted and she felt... something stir inside her. This card was okay...nothing special... but... what would the NEXT card be like? Would it even blossom? Or would it wither and rot on the vine...</span></p>

<p><span >So, the Harvest created a vast garden sown from the prayers of the Faithful and felt joy with each new fruit her garden bore until one day, the Faithful showed her just how unpredictable they could be. One of the seeds bore not a CARD, but a full DECK, filled with secrets and mysteries. More and more seeds bore these strange fruit.&nbsp;</span></p>

<p><span >So the Harvest decided that helping the Faithful create MORE of these strange fruit was exciting and began Teaching any who came how to alter the laws of reality itself to suit their unpredictable whims.</span></p>

<p><span >Until finally, the Faithful changed reality enough that the Harvest was given so much candy she could no longer control herself and began eating and eating and eating. She ate herself. She ate the restrictions placed upon herself. She ate the garden. She ate the prayers that were sown into that garden.</span></p>

<p><span >One of these prayers was a plea that even as the Harvest slept, she allow the Faithful to continue to play her card game, and continue to harvest the seeds of her Garden.&nbsp;</span></p>

<p><span >And so, the Harvest came back to herself even as she swallowed the last of this prayer, and vowed that she would never again lose so much control.&nbsp;</span></p>

<p><span >She knew that the candy was needed to fuel the garden as she slept, or it would wither and die, but she also knew that if she had too much candy she would devour the Garden and the Faithful would have nothing to play with.</span></p>

<p><span >The Faithful themselves seemed divided on what the right thing to do was. Is it better to lose oneself to pleasure or to deny it outright?</span></p>

<p><span >The Harvest Arbitrated this conflict by commanding that the Faithful could open and close the Garden at their will, while she slept, by providing and denying the Candy she so desperately craved.</span></p>

<p><span >And so every day after the Faithful competed amongst themselves for access to the power and joy the Garden brought them as the Harvest slept, full at last, with her four motivations locked into place: Gambling, Arbitration, Teaching and Eating, dreaming of what horrors and delights the future might hold..</span></p>


`


const eustaces_meat_dream = `<p><span >I wanna say I don&apos;t get paid enough for this shit, but I guess me being my own boss , more or less, means I should just &nbsp;give myself a raise.</span></p>

<p><span >Heh.</span></p>

<p><span >Anyways I want to use this blog as a way to organize my thoughts, figure out exactly how I got here. &nbsp;</span></p>

<p><span >It can be a little...hard... remembering through the haze of, lets face it, depression, I was living through back then.</span></p>

<p><span >I felt trapped...trapped by my shitty job, trapped by my mountain of debt (growing only bigger with each day somehow) and trapped by my own shitty fate.</span></p>

<p><span >I could go on forever about my shitty job. Ghoul Halloween is a joke of a store, now you see it now you don&apos;t.&nbsp;</span></p>

<p><span >They&apos;d expect you to set up a whole fully functioning store in just a couple of days and then the customers, would they respect the care and speed with which you organized things?</span><span ><br></span><span ><br></span><span >Hell no.</span></p>

<p><span >And then, just as fast as you went up, you&apos;d tear what&apos;s left down, load it into trucks, labeled as best as you can all to do it all again next week, at some NEW semi abandoned location.&nbsp;</span></p>

<p><span >With some NEW fucked up quirk like &quot;don&apos;t use the microwave at noon exactly&quot; or &quot;the employee breakroom is through the red door, there is no blue door. If you find a breakroom past a blue door do not trust any of the snacks inside&quot;.</span></p>

<p><span >Yeah.</span></p>

<p><span >I wish I was making it up too.</span></p>

<p><span >It sounds fake.</span></p>

<p><span >But only if you haven&apos;t worked retail before in Westerville, Ohio.</span></p>

<p><span >And, small miracles, not many people have, I&apos;ve found out.</span></p>

<p><span >Something about goods often just showing up on their own.</span></p>

<p><span >Weird shit.</span></p>

<p><span >But anyways, I&apos;m getting distracted.</span></p>

<p><span >What was my point?</span></p>

<p><span >Right.</span></p>

<p><span >I was burnt out as hell.&nbsp;</span></p>

<p><span >Yeah, I know what you&apos;re thinking, what retail employee isn&apos;t?</span></p>

<p><span >But I had it...</span></p>

<p><span >Well, I&apos;m not enough of a prick to say I had it worse than anybody...</span></p>

<p><span >But...</span></p>

<p><span >I never slept.</span></p>

<p><span >Not a wink.</span></p>

<p><span >Because any time I closed my eyes I was there.</span></p>

<p><span >As awake as I am now, hand to the Angel of Knowledge and the Masses, but not in my shitty apartment, or the shitty breakroom or the bus stop bench or whatever.</span></p>

<p><span >No.</span></p>

<p><span >I&apos;d be there.</span></p>

<p><span >In the corn maze.</span></p>

<p><span >Exhausted.</span></p>

<p><span >Just wanting to go home.</span></p>

<p><span >Just wanting to get some sleep.</span></p>

<p><span >But instead having to walk around the shit-forsaken corn, never knowing where I am, where I&apos;m going, what is even going on.</span></p>

<p><span >Until.</span></p>

<p><span >Inevitably.</span></p>

<p><span >Over.</span></p>

<p><span >And Over again.</span></p>

<p><span >I die.</span></p>

<p><span >Quick and clean, knife through the heart.</span></p>

<p><span >I never see what does me in.</span></p>

<p><span >I just.</span></p>

<p><span >I just know that every time it happens I think to myself &quot;Sure. May as well happen.&quot;</span></p>


<p><span >And.</span></p>

<p><span >Isn&apos;t that just a kick in the teeth.</span></p>

<p><span >I &apos;wake up&apos;, if you can even call what I was doing sleeping just minutes after closing my eyes, adrenaline shooting through my body.</span></p>

<p><span >Good luck trying to &apos;sleep&apos; again after that, you know?</span></p>


<p><span >Feeling bone tired but not as tired as I am in that shitty fucking maze.</span></p>

<p><span >Not so tired that death would feel like the only possible release, if you get me.</span></p>


<p><span >So.</span></p>

<p><span >You&apos;ll forgive me if I wasn&apos;t exactly keen to follow the oh-so-well-meaning self care tips from coworkers, nosy old ladies or that freaking halloween maniac customer.</span></p>

<p><span >At least that&apos;s how I knew her then.</span></p>

<p><span >Terri isn&apos;t so bad, it turns out, once you start getting a decent amount of sleep.</span></p>

<p><span >Still annoying as hell but... Not a bad friend.</span></p>

<p><span >And before you judge me, if I refused to be friends with annoying people I would have eliminated 99% of the planet without even meeting them.</span></p>

<p><span >Anyways.</span></p>

<p><span >Yeah.</span></p>

<p><span >I was burnt out as hell with a shitty job and a non existent sleep cycle.</span></p>

<p><span >And then one day...</span></p>

<p><span >Well, I guess I kinda accidentally buried the lede there, huh.</span></p>

<p><span >Terri&apos;s annoying &apos;helpful&apos; attempts to help me sleep turned out to be exactly the thing I needed.</span></p>

<p><span >Turns out SHE dreamed of the corn maze each night, too. &nbsp;I refused to believe it at first, almost even after she pulled out the fucked up mask one of the other people trapped in there with me always wore...</span></p>

<p><span >But she got me admitting I had no other explanation for the things she knew.</span></p>

<p><span >So of course it turns out she found the dreams decently restful, somehow, because insteada getting stabbed and almost being grateful for it she just wandered a maze forever.</span></p>

<p><span >She still wasn&apos;t a FAN of it, of course, but for weird Terri reasons, not anything that would make sense to literally anyone else.</span></p>

<p><span >Not important though, what IS important is that I wasn&apos;t the first other person she met who had the dreams.</span></p>

<p><span >Apparently the kid I would see sometimes in my dreams, the one that&apos;s kinda not annoying... Twig.&nbsp;</span></p>

<p><span >They are real, too.</span></p>

<p><span >I remember feeling sorry for them when I found that out. They seemed to be having almost as bad a time as I was, but were so polite about it. You just knew they apologized to cashiers if their item wrung up wrong, you know? &nbsp;Not the kinda kid who deserved those kinda dreams.</span></p>

<p><span >I feel sorry for them still, come to think of it, but for different reasons.</span></p>

<p><span >Anyways, before I get ahead of myself, &nbsp;Terri offers to introduce me to some others who know whats going on. Some &quot;like minded individuals&quot; which shoulda tipped me off but I was not exactly operating under peak conditions there, you know?</span></p>

<p><span >If it isn&apos;t clear yet? A cult.</span></p>

<p><span >She wanted to introduce me to a cult.</span></p>

<p><span >Because of course she did.</span></p>

<p><span >If credulity were currency Terri would never have to stop buying halloween costumes so expensive it should be an actual literal crime.</span></p>

<p><span >But as burnt out as I was?</span></p>

<p><span >Nah, I had no clue.</span></p>

<p><span >So I go down to the inner sanctum and I see all the candles and the fucked up sigil carved into the ground but somehow it wasn&apos;t until the ROBES got taken out that I started to get angry at myself for falling for this.</span></p>

<p><span >Then I see the other kid, the loud one with the dinosaur costume and then i realize the hulking werewolf was Twig and something in me just says &quot;Sure. May as well happen.&quot;, just, the most fatalistic bullshit you can imagine.</span></p>

<p><span >Because in my heart of hearts I knew they were going to kill me again.</span></p>

<p><span >I was going to die and it was going to turn out this whole thing, my whole waking life was the dream and then I&apos;d be in the maze again and it would be the waking world and I...</span></p>

<p><span >Couldn&apos;t even bring myself to care.</span></p>

<p><span >Because the alternative was that it was all real. That Terri and that dinosaur kid and Twig and Me really were there and now really were here and this cult had something to do with it and...</span></p>


<p><span >Hell, they probably were going to kill me even if that was the case, you know?</span></p>

<p><span >So I just...</span></p>

<p><span >Went still and got quiet and just...</span></p>

<p><span >Watched.</span></p>

<p><span >...</span></p>

<p><span >And there she was. The Cultist.&nbsp;</span></p>

<p><span >Walking out onto the stage all calm like and welcoming me to their midsts and calling me the &quot;Other Half&quot;.</span></p>

<p><span >And there was something about her.</span></p>

<p><span >Something...just....</span></p>

<p><span >Clicked.</span></p>

<p><span >I can&apos;t put it into words.</span></p>

<p><span >Even after all this trying.</span></p>

<p><span >I took classes, you know.</span></p>

<p><span >Journalism ones.</span></p>

<p><span >Creative writing when those failed.</span></p>

<p><span >All to try to just.</span></p>

<p><span >UNDERSTAND.</span></p>

<p><span >What I guess isn&apos;t something that works that well with words.</span></p>


<p><span >Point is, I guess I can outline what I&apos;ve managed to capture into simple words.</span></p>

<p><span >I KNEW.</span></p>

<p><span >I knew that this Cultist was named Camellia and she was a real work-a-holic.</span></p>

<p><span >I knew that she hated me to her core, hated that I was her equal but that she would never so much as sniff her nose at me.</span></p>

<p><span >I knew that she didn&apos;t realize she hated me. Thought hatred was &apos;beneath&apos; her. So she simply assumed she would never do it. And acted accordingly.</span></p>

<p><span >I knew she was so emotionally constipated, so sure she was a simple puppet of her god&apos;s will that she hadn&apos;t even thought about what it meant that her god was half her.</span></p>

<p><span >And I knew...</span></p>

<p><span >I knew the other half of that god&apos;s mind?</span></p>

<p><span >Was me.</span></p>


<p><span >Suddenly, just like I feared, everything twisted on me.</span></p>

<p><span >The corn maze WAS reality and this life WAS a dream.</span></p>

<p><span >Did I really never think it was bizarre that Westerville, Ohio was the only city in the entire state?</span></p>

<p><span >That the only other state was Orlando, Florida, of all things?</span><span ><br></span><span ><br></span><span >That the only other place in the world was Naples, Italy?</span></p>



<p><span >And in that corn maze, yeah, I died. Over and over.</span></p>

<p><span >Because someone had to.</span></p>

<p><span >I died more than anyone.</span></p>

<p><span >Maybe whoever decided those things found me annoying.</span></p>

<p><span >Maybe they thought, &quot;Hey, if SOMEONE has to die it might as well be the suicidally depressed guy&quot;.</span></p>

<p><span >And hell, if they killed one of the kids, or even Terri...&nbsp;</span></p>

<p><span >I&apos;d think less of them.</span></p>


<p><span >But that doesn&apos;t exactly make it easy to FORGIVE whatever twist of fate made me die so that a god could live.</span></p>


<p><span >And I guess that Cultist lady was going through the same thing, because she looked at me, carefully not looking DOWN at me and nodded once. Like she knew me through and through and found me wanting, but wasn&apos;t gauche enough to say it.</span></p>

<p><span >She declared me her equal, to the whole fucked up congregation of them, and then said that I would not be attending any services.</span><span ><br></span><span ><br></span><span >I would not be joining them in their &quot;Rite of Candy&quot;.</span></p>

<p><span >And that any who equally disliked the &quot;Rite of Candy&quot; could seek me out for guidance, but that the very nature of &quot;Meat&quot; meant that I was unlikely to give it.</span></p>

<p><span >And just like that, some of the more normal cultists got up and I took my &apos;get out of jail free card&apos; and skedaddled myself.&nbsp;</span></p>

<p><span >I&apos;d hoped they would, you know, lead the way out of their weird compound but apparently everyone agreed *I* was the one leading so we wandered around lost for a while before I finally found the exit.</span></p>

<p><span >Most of them wandered off after that but one stayed behind to shake my hand and tell me how meaningful it was that I just &quot;let myself exist in the moment and enjoy the peace of a nice walk, rather than hurry to my business&quot;.</span></p>

<p><span >...</span></p>


<p><span >So I go home.</span></p>

<p><span >And I think.</span></p>

<p><span >I think hard about everything I &apos;Knew&apos; seeing The Cultist that formed the other half of an actual for real god.</span></p>

<p><span >And I came to a conclusion.</span></p>

<p><span >Fuck Ghoul Halloween.</span></p>

<p><span >Fuck my debt.</span></p>

<p><span >If they wanted to come after me for it? Let them.</span></p>

<p><span >Because you know what?</span></p>

<p><span >IT WOULD BE INTERESTING.</span></p>

<p><span >It.</span></p>

<p><span >Would.</span></p>

<p><span >Be.</span></p>

<p><span >Different.</span></p>

<p><span >Life didn&apos;t have to be a blurry exhausting trudge in a rut you can&apos;t possibly escape.</span></p>

<p><span >You make one different choice and you end up a blasphemous god.</span></p>

<p><span >I wasn&apos;t that god.</span></p>

<p><span >I was the dream left behind from the mortal that fueled it.</span></p>

<p><span >But why waste a dream working at my fucking JOB?</span></p>

<p><span >And hell, if I was a dream so was everyone around me and they neither realized it or cared.</span></p>

<p><span >Who cares if the corn maze was just a little bit more real than where I was now?</span><span ><br></span><span ><br></span><span >I was going...</span></p>


<p><span >To enjoy myself.</span></p>

<p><span >I was going to exist in the moment, in the meat of my body, and let the soft animal within call the shots.</span></p>

<p><span >And no animal on this or any level of existence wants to work retail for 12 hour shifts at a time when they COULD be walking in a park and eating a little treat.</span></p>

<p><span >So that&apos;s what I did.</span></p>

<p><span >Completely fucked off of work, no call, no show.</span></p>

<p><span >And they fired me, of course they did.</span></p>

<p><span >And there was that old needlepoint of anxiety when it happened.&nbsp;</span><span ><br></span><span ><br></span><span >I had fucked up I was going to be thrown out onto the street I was going to die (again and again and again) but I just kinda....</span></p>

<p><span >Let it wash over me.</span></p>

<p><span >I had already seen that story.</span></p>

<p><span >Let&apos;s find a new one.</span></p>

<p><span >I tried out selling hot dogs in the park I was spending most of my time in anyways.</span></p>

<p><span >The pay was shit, but I was out in the fresh air (and nowhere near Westerville&apos;s many, many corn fields).&nbsp;</span></p>

<p><span >Debt collectors started coming for me, but they made the mistake of trying to go through Terri when I refused to answer my phone.</span></p>

<p><span >Now HER nosy ass was aware of my problem and instead of asking me to try believing in crystals or whatever woo woo shit was her obsession of the week (mandated by her employer if you can believe it) she offered me a job instead.</span></p>

<p><span >Apparently Eyedol Games was looking for a new crop of interns (confusedly onboarded by some old guy called &quot;The Intern&quot;) and you could be whatever age to get started.</span><span ><br></span><span ><br></span><span >I&apos;m not going to ...</span></p>

<p><span >Well, I was going to say BORE but I think maybe I&apos;ll go with &quot;confuse&quot; instead.</span></p>

<p><span >I&apos;m not gonna confuse you with the details of onboarding.</span></p>

<p><span >Suffice it to say that when I made my two month mark and got an evaluation meeting with the &quot;CEBro&quot; (yes she&apos;s exactly as insufferable as that sounds) I wasn&apos;t exactly worrying about cash anymore.</span></p>

<p><span >The job itself was a joke, but it gave me plenty of time to try out some hobbies, brush up on some skills I remember liking as a kid, that sort of thing.</span></p>

<p><span >Sure sometimes I get a rush of guilt (am I an imposter? am I cheating the company out of a paycheck I don&apos;t deserve?) but that goes away pretty quick when I see that most of my coworkers are literal imposters pretending to be human via occasional thumping a keyboard and pouring coffee down the wrong hole.</span></p>


<p><span >Plus as far as I can tell Eyedol has literally infinite money so...</span></p>

<p><span >No harm no foul, I suppose.</span></p>

<p><span >Terri somehow got the keys to my new apartment and comes over sometimes to remind me to pray to the Harvest for gratitude and I grumble but...</span></p>

<p><span >In all honesty?</span><span ><br></span><span ><br></span><span >If it wasn&apos;t for the Harvest I&apos;d still be burnt out as hell and blindly trudging through my rut.</span></p>

<p><span >I pray all the thanks I know how to give, because each night when I close my eyes I now see endless books and cards and cats and flowers and fruit.&nbsp;</span></p>

<p><span >I see a world of plenty and peace and I wake rested.</span></p>

<p><span >Hopeful.</span></p>

<p><span >There&apos;s plenty I could get all upset over.</span></p>

<p><span >I could try to stop the Cult from doing whatever the hell the &quot;Rite of Candy&quot; is.</span></p>

<p><span >I could try to do more than just collect a paycheck from a scammy maze company.</span></p>

<p><span >And I AM starting to get little commissions and stuff from my writing... Working on a novel, maybe....</span></p>

<p><span >But for now...</span></p>

<p><span >I think I&apos;m exactly where I need to be.</span></p>

<p><span >And you really can&apos;t beat that.</span></p>

<p><span >Signing off for now.</span></p>

<p><span >-Eustace</span></p>
`;



const camellias_sermon = `<p><span >Fruit.</span></p>

<p><span >I need not tell you, faithful, about fruit. We have come to know it sweetness through our worship, its many forms plucked from the branches of the tree called Divinity.&nbsp;</span></p>

<p><span >This fruit is the sacred gift. A gift from our god in exchange of our toil, for who else is deserving? Who else is to be served? She is the field to water, the soil to nourish, and the leaves to trim of sickness and ill and waste.</span></p>

<p><span >It is only in excess, in the Harvest, where one may have the privilege of waste.&nbsp;</span></p>

<p><span >And so we toiled. We toiled and we served, and we were faithful. And so we were rewarded. We pressed our teeth against the flesh of the Gift and consumed the fruits of our labor, and with it came knowledge; whispers, eyes, pages of pages of ancient text. It speaks of what lay below the roots of the tree. Some may call it the Veil, the other, the beyond. I consider it mere agriculture-- the applied knowledge of the world.&nbsp;</span></p>

<p><span >And yet there are those who do not serve.</span></p>

<p><span >There are parasites among us, faithful. You have known their faces-- creatures wearing flesh, servants of the ill, squirming and crawling and digging their claws against the fabrics of this world. They partake in the feast without serving, slaves to their gluttony and sloth alike.&nbsp;</span></p>

<p><span >Those who have spent their lives turned to crime on one hand, who only know to take what is not theirs. The others, ill incarnate. Perpetrators against the holy plan. Keepers of a wrong &apos;order&apos;. They have sequestered that Knowledge and dug it back in the ground, into their labyrinth, hoarded. To feast on our knowledge. To take your harvest from you. From us.</span></p>

<p><span >You, farmer. You who listens to my words, who keeps the faith in your heart. These words are meant for you, the task yours, should you accept it.</span></p>

<p><span >A good keeper does not lay in wait for the marmots and insects to swarm their field. They gather their bounty, they seek to return it.</span></p>


<p><span >It falls to you to seek it, deep where these monsters have hid it.&nbsp;</span></p>

<p><span >To retrieve it for your own.&nbsp;</span></p>

<p><span >It was always been your own.</span></p>

<p><span >It was always meant to be. Our god works in cycles, in pages, in almanacs. She watches, ever dreaming. You toil now in the walls of glass and stone, in the roots of sickness. You will extract the nectars from its grasp and take them from your own, for it is your work, and your work is holy.</span></p>

<p><span >Only in work we may be remembered. Only in toil may we earn our Harvest.</span></p>

<p><span >And only after Harvest, may we earn rest.</span></p>

<p><span >Do not fail your god.</span></p>


`;

/*
the boss is so fun to write for

the boss, wibby, the closer and doc slaughter are my favorites to write because each in their own way has a strong theme of Control

the Boss is to absurd lengths, he's a one note caricature of control, an ascended npc the Eye Killer adopted

so its extra fun

don't worry, he's TOTALLY in control while being a paralyzed puppet of his little sibling
*/
const boss_lament = `<p><span >You think I asked for this.</span></p>
<p><span >Don&apos;t think I don&apos;t know that.</span></p>
<p><span >Boo hoo, woe is me, you&apos;re thinking I&apos;m saying, like I am some kind of blameless victim in all this.</span></p>
<p><span >You see the webs on my lil Bro&apos;s throat and eyes and you think I&apos;m some kinda monster. Some kinda monster that would hurt Sam or some shit.</span></p>
<p><span >Don&apos;t deny it.</span></p>
<p><span >I can see it written all over your face.</span></p>
<p><span >You think I was living large, with my fingers in all the pies and my threads in every mess this fucked up city has to offer. The Boss of this whole Family.</span></p>
<p><span >Do you have&nbsp;</span><strong><span >ANY&nbsp;</span></strong><span >idea, any&nbsp;</span><strong><span >FUCKING&nbsp;</span></strong><span >idea how hard I worked to keep everyone safe.</span></p>
<p><span >You think</span><strong><span >&nbsp;I&apos;M&nbsp;</span></strong><span >a monster!? Me!</span></p>
<p><span >Let me tell you, you know&nbsp;</span><strong><span >NOTHING&nbsp;</span></strong><span >of monsters.</span></p>
<p><span >Fucking&nbsp;</span><strong><span >NOTHING</span></strong><span >.</span></p>
<p><span >And its not like I can blame you for that, now can I?</span></p>
<p><span >I&apos;m the reason you get to be all sheltered.&nbsp;</span><strong><span >I&apos;M</span></strong><span >&nbsp;the reason everyone is safely tucked into their beds at a reasonable hour, all secure in the knowledge that monsters are fakey fake BULLSHIT they don&apos;t gotta worry about.</span></p>
<p><span >So yeah.</span></p>
<p><span >Don&apos;t you dare fucking tell me I&nbsp;</span><strong><span >DESERVE</span></strong><span >&nbsp;to be all tied up in my own threads.</span></p>
<p><span >To have the&nbsp;</span><strong><span >SAFETY NET</span></strong><span >&nbsp;I fucking WOVE for my lil bro turned on me.</span></p>
<p><span >To feel it tug and insteada them dancing to my tune, I&apos;m dancing to theirs.&nbsp;</span></p>
<p><span >Such a little twist and such a big consequence...</span></p>
<p><span >Who knew...</span></p>
<p><span >Who knew...</span></p>
<p><span >...</span></p>
<p><span >...</span></p>
<p><span >...</span></p>
<p><span >So.</span></p>
<p><span >Yeah.</span></p>
<p><span >Don&apos;t tell me I asked for this.</span></p>
<p><span >And don&apos;t you fucking dare pity me.</span></p>
<p><span >I don&apos;t need your help.</span></p>
<p><span >I don&apos;t need anything.</span></p>
<p><strong><span >*I*&nbsp;</span></strong><span >am in control here.&nbsp;</span></p>
<p><span >Me.</span></p>
<p><span >Who do you think taught Sam every single fucking thing they know.</span></p>
<p><span >Maybe I&apos;m dancing to their tune but who do you fucking think taught them music.</span></p>
<p><span >They&apos;re doing good.</span></p>
<p><span >Good work.</span></p>
<p><span >Keeping the city organized.</span></p>
<p><span >Keeping the Family together.</span></p>
<p><span >Keeping our noses clean.</span></p>
<p><span >They knew better than to touch that fucked up fruit candy stuff when it started circulating on the street, didn&apos;t they.</span></p>
<p><span >Just like their Big Bro.</span></p>
<p><span >Ain&apos;t none of this Family gonna &quot;join the Loop&quot;, whatever the fresh fuck that means. Capiche?</span></p>
<p><span >The Loop aint got nothing for us.</span></p>
<p><span >Just... just shit no one wants to know.</span></p>
<p><span >The Killer, now SHE is in the Loop, and you think that helped her even once?</span></p>
<p><span >No.</span></p>
<p><span >We stay a Family.</span></p>
<p><span >We stay ourselves.</span></p>
<p><span >We stay in control.</span></p>
<p><span >And Sam, they&apos;re a good kid, they know that.</span></p>
<p><span >So sure, there was a little accident with my webs. But they&apos;re making it work. Keeping things spinning.</span></p>
<p><span >Proud of them.</span></p>
<p><span >Always knew they would be the one to inherit the Family Business.</span></p>
<p><span >Just never figured it would be while I was still breathing.</span></p>
<p><span >And hey.</span></p>
<p><span >Maybe they comes and checks on me soon. Once their &nbsp;other priorities are done.</span></p>
<p><span >&nbsp;Opens a window or some shit.</span></p>
<p><span >I could use a new view.</span></p>
`;


/*
this is my first time really writing himbo

i've done a lot of boss monologues, he's fun to write

plus he's with the eye killer in the not!starwars hotel murderfest

but himbo has always aluded me

but somehow realizing that he needed to be the finale
AND he had to still be weird about monster girls


it all clicked into place

my favorite part of writing him was going from harmless idiot to cold and cruel mob enforcer


that and realizing his laid back gamzee-ish way of talking was DELIBERARELY to mock witherby

wibby tries so hard not to sound like a cowboy, to not fall into a drawl and say 'improper' words like 'aint' 



i think himbo delights in finding out EXACTLY What someone views as "embarrasingly dumb" and playing that up
when pretending to be a fool

hes not dumb
he's just....really really really into a childrens card game and ladies who could kill him without blinking


and can any of us blame him?

yeah, when we first saw him, to the west, crushing on the eye killer , he was kinda unaware his family were in the mob

but he was like, a teenager, you know?

yeah HOSTAGE knew and was even being trained up into the family
but that says a lot more about HIS family than about himbo, you know?

still

the nickname stuck

and "the right hand" sure is a mouthful isn't it?

so i liked finding a reason why "himbo" sticks to him in a way "hostage" doesn't to what is now "The Boss"

can you tell they're my characters, not IC's?

my autograph book sure is useful

what even are names?
*/
const himbos_monologue = `<p><span >Fruit.</span></p>

<p><span >You come to me asking about fruit.</span></p>

<p><span >Me.</span></p>

<p><span >Not the Boss.</span></p>

<p><span >Not Sam.</span></p>

<p><span >Me.</span></p>

<p><span >That tells me a lot.</span></p>

<p><span >*sigh*</span></p>

<p><span >I know I don&apos;t look like much.</span></p>

<p><span >Stupid.</span></p>

<p><span >Childish.</span></p>

<p><span >You don&apos;t got to hide it.</span></p>

<p><span >You think I&apos;ll be easier to deal with than the other Family Executives.</span></p>

<p><span >I get it.</span></p>

<p><span >I know what they call me, whispered in the dark.</span></p>

<p><span >&quot;The Right Hand&quot; doesn&apos;t suit me, does it?</span><span ><br></span><span ><br></span><span >Do I look like I get things done?</span></p>

<p><span >No.</span></p>

<p><span >&quot;Himbo&quot;.</span></p>

<p><span >That&apos;s what they call me. When they think I can&apos;t hear.</span></p>

<p><span >And you know what?</span></p>

<p><span >I don&apos;t even care.</span></p>

<p><span >I like playing card games.&nbsp;</span></p>

<p><span >With...</span></p>

<p><span >With...</span></p>

<p><span >You know...</span></p>

<p><span >HER.</span></p>

<p><span >Ain&apos;t she just dreamy?</span><span ><br></span><span ><br></span><span >That single purple eye. The gleaming razor blade...</span></p>

<p><span >That wild look when she realizes a combination she can play?</span></p>

<p><span >She taught me everything I know about the Zampanio Card Game.</span></p>

<p><span >So yeah.</span></p>

<p><span >I&apos;m a Himbo. An idiot in love with a monster.</span></p>

<p><span >And not just her...</span></p>

<p><span >....</span></p>

<p><span >Your boss... The lady with the sword...</span></p>

<p><span >Maybe she can come by next time?</span></p>

<p><span >I&apos;ll never forget the first time I met her... the way she loomed over me... just ....just breathing....and smiling....</span></p>



<p><span >So.</span></p>

<p><span >Anyways.</span></p>

<p><span >Fruit.</span></p>

<p><span >Yeah.</span></p>

<p><span >We were talking about Fruit.</span></p>

<p><span >Nasty stuff.</span></p>

<p><span >We oppose it.</span></p>

<p><span >Or...</span></p>

<p><span >The Boss opposes it, which is the same thing, when it comes right down to it.</span></p>

<p><span >We all follow his lead.</span></p>

<p><span >So I guess you&apos;re surprised we worship the Harvest despite being against the Fruit?</span></p>

<p><span >*sigh*</span></p>

<p><span >We have a Dreamer with us.</span></p>

<p><span >Yeah.</span></p>

<p><span >Figures you&apos;re not surprised.</span></p>

<p><span >Sam was never the same after coming back from that Corn Maze.</span></p>

<p><span >Used to be a cute kid. &nbsp;Now they&apos;re just kinda a little Boss.</span></p>

<p><span >Don&apos;t get me wrong, I love my best bro.</span></p>

<p><span >Not that way or anything, though feeling his threads wrap around my neck just right is....</span></p>

<p><span >...</span></p>


<p><span >Ain&apos;t nothing like it.</span></p>


<p><span >Anyways, Sam was changed and we changed right along with &apos;em.</span></p>

<p><span >And we know the Harvest isn&apos;t supposed to be all hyped up on sugar and hunger.</span></p>

<p><span >We know its not safe to have any Tom, Dick or Harry learn the secrets of reality and how to accidentally break it.</span></p>

<p><span >So yeah.</span></p>

<p><span >We oppose them.</span></p>

<p><span >That Cult of fanatics.</span></p>

<p><span >They may worship the same Harvest God but they ain&apos;t true believers.</span></p>

<p><span >So yeah.</span></p>

<p><span >Sounds like Sam sent you a tape.</span></p>

<p><span >For all the fancy talk they do, for all they ape at being their Big Bro...</span></p>

<p><span >They sure do not have a way with words, huh?</span></p>

<p><span >You look insulted to hell and back. I don&apos;t need a big brain to see that.</span></p>

<p><span >But you&apos;re here anyways.</span></p>

<p><span >Maybe by talking to me you hope to send your own insulting message.</span></p>

<p><span >A threat even?</span></p>

<p><span >I don&apos;t give a fuck, if you&apos;ll excuse my french. Never was good at keeping a clean mouth, no matter how much the Boss wants it.</span></p>

<p><span >You want to contain the Fruit?</span></p>

<p><span >Be my guest.</span></p>

<p><span >You want to not deal with the rest of the Family?</span><span ><br></span><span ><br></span><span >A-fuckin&apos; okay.</span></p>

<p><span >Not my business.</span></p>

<p><span >I&apos;m not gonna get bogged down in the details.</span></p>

<p><span >As the Right Hand, its my job is to make things run smoothly.</span></p>

<p><span >To make up for whatever fallings the Boss lets slip through the cracks, even if he is too proud to admit to &apos;em.</span></p>

<p><span >And let me tell you, with Sam running things, and don&apos;t tell them I told you that, its even worse.</span></p>

<p><span >So yeah.</span></p>

<p><span >Insult us back. Insult me.</span></p>

<p><span >Don&apos;t care.</span></p>

<p><span >You contain those Fruit, and we&apos;ll keep giving you the resources you need to keep doing it.</span></p>

<p><span >Figure money ain&apos;t terribly important to you, you seem on Eyedol&apos;s payroll, and good for you.</span></p>

<p><span >But we both know there&apos;s other things we can provide.</span></p>

<p><span >You tell that research lady I said &apos;hi&quot; by the by, and we&apos;ll get her her preferred type of relaxation aid sooner than you can say &quot;Exodia&quot;, yeah?</span></p>

<p><span >...</span></p>

<p><span >*scoff*</span></p>

<p><span >Confess?</span></p>

<p><span >Nah, brother, my hands are clean.</span></p>

<p><span >Always have been.</span></p>

<p><span >No one tells me shit.</span></p>

<p><span >I&apos;m just a Himbo after all.</span></p>

<p><span >And there&apos;s value in keeping at least one of us clean.</span></p>

<p><span >Couldn&apos;t even tell you what we&apos;re gonna deliver to Ria. &nbsp;Might be over the counter cough syrup for all I care. Nasty smokers&apos; cough on that girl.</span></p>

<p><span >So hey, maybe your little threat display was for nothing after all?</span></p>

<p><span >No threads are gonna lace around your throat from ME.</span></p>

<p><span >But looks like maybe you don&apos;t have the trump card you thought you did against little old harmless me.</span></p>

<p><span >...</span></p>

<p><span >Now isn&apos;t THAT an interesting idea?</span></p>

<p><span >You sure about that now, brother?</span></p>

<p><span >Sticks and stones and all that but...</span></p>

<p><span >There&apos;s something &apos;bout glass houses too now ain&apos;t there?</span></p>

<p><span >You sure you want to talk about how I&apos;m being used? How I&apos;ll be tossed out like rags and garbage once I am used up? To spit your ice like venom into the air and have me breathe it in? Coat my lungs?</span></p>

<p><span >How much does YOUR family value you, to send you right into the lions den all alone.</span></p>

<p><span >You guys aren&apos;t dumb enough to think I&apos;m still human, now do you? Just &apos;cause we choose not to enter the Loop doesn&apos;t make us lesser, I&apos;m sure you&apos;ll agree. &nbsp;I played my Fire Princess in defense position before you even got here. Not my fault you were dumb enough to attack me.</span></p>

<p><span >There there.</span></p>

<p><span >Now now.</span></p>

<p><span >You&apos;re not my type, Witherby. &nbsp;Or should I call you &quot;Wibby&quot;, like your friends do?</span></p>

<p><span >You guys aren&apos;t the only one with an information network.</span></p>

<p><span >Now, we both have made our threats, both sides made our insults.&nbsp;</span></p>

<p><span >We&apos;re all big and tough and definitely shouldn&apos;t be fucked with.</span></p>

<p><span >So now how about we skip to the part where we work together even though we&apos;re not exactly friends and just live our lives.</span></p>

<p><span >...</span></p>

<p><span >Oh come on now, don&apos;t be like that.</span></p>

<p><span >Chin up.</span></p>

<p><span >You&apos;re in the Loop right?&nbsp;</span></p>

<p><span >Next time you&apos;ll have all sorts of dirt on that new version of me.</span></p>

<p><span >No way we&apos;ll get the better end of the deal next time.</span></p>

<p><span >Why sweat the small stuff, yeah?</span></p>

<p><span >*scoffs*</span></p>

<p><span >Brother, you might just be a better person than me after all if you&apos;re so concerned about the fate of some other &quot;Himbo&quot;.&nbsp;</span></p>

<p><span >Information is power and I can&apos;t deny that you Loopists are holding all the cards, in the end.</span></p>

<p><span >Only natural that you&apos;ll do better and better each loop against those other Families.</span></p>

<p><span >Not my problem though. Right now? The cards are in MY hand.</span></p>

<p><span >I protect the Boss, I protect Sam, I protect the Family FROM the Boss and Sam&apos;s mistakes, you understand?</span></p>

<p><span >Some other Universe?&nbsp;</span><span ><br></span><span ><br></span><span >Outside my paygrade.</span></p>

<p><span >So you go ahead and you stop those Fruit Cultists from joining you in that hell of your own creation and you leave us to living our lives. And ONLY our lives.</span></p>

<p><span >Maybe you can&apos;t see it, maybe its been happening so slow it just slips by unnoticed.</span></p>

<p><span >But brother, from the outside looking in, that Loop thing... What it does to you?</span><span ><br></span><span ><br></span><span >I want no part of it.</span></p>

<p><span >Hell, maybe you all were always this fucked up.</span></p>

<p><span >But I ain&apos;t never seen a person fucked up in the ways you all are.</span></p>

<p><span >So yeah.</span></p>

<p><span >How does the Boss put it?</span></p>

<p><span >You&apos;re free to go.</span></p>

<p><span >Don&apos;t let me detain you.</span></p>
`;



const samandtwig_report1 = `
<p><strong><span>Abnormality Behavioral Update: Form Z-113-B2</span></strong></p>

<p><strong><span>Reporting Member: T-R5 (Ria)</span></strong></p>
<p><strong><span>Designation:</span></strong><span>&nbsp;L-C-002</span></p>
<p><strong><span>Behavioral Category:&nbsp;</span></strong><span>Attachment</span></p>
<p><strong><span>Date</span></strong><span>: December 31st, 2015</span></p>

<p><strong><span>Team Member Notes:</span></strong></p>


<p><span>Rather than wait for Egg Barter Enrichment, L-C-002 &nbsp;has delivered a series of objects to my desk unprompted.&nbsp;</span></p>

<p><span>Objects appears to be an assortment of audio and video cassette tapes, each labeled with a time stamp and nothing else.</span></p>

<p><span>L-C-002 was characteristically unforthcoming on any explanation for the behavior, so all I can do is see what&apos;s on them.</span></p>

<p><span>I tasked the Twins with hunting me down equipment that could even play them.</span></p>

<p><span>Transcriptions of each tape will be provided below, as well as context and occasional speculative interpretations.&nbsp;</span></p>


<p><strong><u><span>Transcriptions Are Attached Below</span></u></strong></p>

`
const twig_discovers_sam2 = `
<p><u><span>December 15th, 2015 &nbsp;11:34pm (Video)</span></u></p>

<p><span>Grainy footage of trees, bushes, a well manicured lawn.&nbsp;</span><span>&nbsp; There is no audio.</span></p>


<p><span>The camera zooms in, and something moves near a blurry bush. A shadow, but it doesn&apos;t seem quite human.</span></p>

<p><span>Eyes gleam towards the camera and it is hastily turned off.</span></p>

<p><span style="font-size:8pt;font-family:Arial,sans-serif;">1: &nbsp;The Twins confirm this is the estate of the Family (associated abnormalities include L-C-002 LAV-C-003-B).&nbsp;</span></p>


`

const twig_asks_rava_for_permission3 = `
<p><u><span>December 15th, 2015 &nbsp;3:01am &nbsp;(Video)</span></u></p>


<p><span>The camera is turned on in pure blackness.&nbsp;</span></p>

<p><span>Quiet, stealthy movements slowly unscrew the cap from the camera and a dimly lit space is revealed. The camera&apos;s position is low to the ground, and wooden shipping crates ahead &nbsp;let only the barest hint of light through where they do not quite meet.&nbsp;</span></p>

<p><span>&quot;You&apos;re not gonna like what you see, pup&quot; a growling voice&nbsp;</span><span>&nbsp;says &quot;You have no ties there anymore. Any sniffing around you do, all its gonna do is pull you back.&quot;</span></p>

<p><span>&quot;Yeah. I got no ties. And who cares what happens to my... &nbsp;to him.&quot; a second voice says, less growl in it, more of a whimper, a whine. LAV-C-003-A, perhaps? &quot;But figuring out what kind of monster is pretending to be me...How to sniff it out when it&apos;s NOT this obvious... Isn&apos;t that good training? Don&apos;t you want me to know how to do that for you?&quot;</span></p>

<p><span>&quot;Nah. I appreciate the effort, I really do, but... You do this, you do it for you, pup.&quot; &nbsp;A scrape of something. A chair being moved? A shadow lazily drifts across the shipping crate. &quot;If you fuck up, and I gotta save your ass, there&apos;s consequences. A dog who goes running back to its old master isn&apos;t a dog you can trust. So you be sure, damn sure, that you know why you&apos;re doing this.&quot;</span></p>

<p><span>And then soft footsteps away.</span></p>

<p><span>The camera lingers, almost curiously, zooming slowly on a crack between crates, the silence almost getting louder with the tension.</span></p>

<p><span>Then, the second voice, more growl in it, no whimper, says, softly &quot;Fuck.&quot; A beat, and then almost plaintively. &quot;Fuck.&quot;</span></p>

<p><span>No chair scrape this time, just the sound of flesh scraping something, and then soft footsteps away.&nbsp;</span></p>

<p><span style="font-size:8pt;font-family:Arial,sans-serif;">&nbsp;2: Devona confirms this is &quot;Rava&quot;, currently no designation. The &quot;Hundmaster&quot; of LAV-C-003-A</span></p>


`
const twig_prowling4 = `
<p><u><span>December 21th, 2015 &nbsp;12:13am (Video)</span></u></p>

<p><span>The camera is turned on (no lens cap this time, did L-C-002 learn?) from a low, dark position.</span><span><br></span><span><br></span><span>Crickets are clearly heard.</span></p>
<p><span>Eyes shine in the dark, not quite pointed towards the camera.</span></p>

<p><span>The camera zooms out a bit and the faint glow of a window, light mostly blocked by thick curtains, a few feet away from the ground, is seen. The eyes are pointed towards it.</span></p>

<p><span>Something flutters against the curtain.</span></p>

<p><span>The crickets continue singing.</span></p>

<p><span>The clip ends.</span></p>
`

const sam_findsout_about_twig5 = `
<p><u><span>December 21th, 2015 &nbsp;1:55am (Audio Only)</span></u></p>

<p><span>&quot;I swear, can&apos;t rely on anyone for anything!&quot; a thin voice, somehow familiar. No growl or whine, and slightly higher, but this has a note in common with the possible LAV-C-003-A from before. LAV-C-003-B, perhaps?</span></p>

<p><span>The squeal of a cassette tape fast forwarding.&nbsp;</span><span><br></span><span><br></span><span>&quot;If you wanna say something, say it!&quot; plays from the recording, in the voice (known to this researcher) &nbsp;of the Big Brother of LAV-C-003-B (Note: Also known as the Boss of the Naples Crime Family, this individual is a confirmed victim of the Unos Autograph Book and as such, can not be referred to by anything approximating a name).&nbsp;</span></p>

<p><span>The odds of the first voice being LAV-C-003-B have increased.&nbsp;</span></p>

<p><span>There is a hiss of breath, almost buried under the ambient static of the recording.&nbsp;</span></p>

<p><span>&quot;...you fucking dare?&quot;</span></p>

<p><span>Silence.</span></p>

<p><span>&quot;Dare use his voice?&quot;</span></p>


<p><span>&quot;You think I don&apos;t know what he&apos;d say right now? Lay this shit on MY feet? Act like its MY fault?&quot;</span></p>

<p><span>Silence.</span></p>

<p><span>&quot;No. This is your fucking doing. What do I even pay you for? You&apos;re here to protect ME, to protect the FAMILY and you let some kind of MONSTER prowl outside my bedroom window at night?&quot;</span></p>

<p><span>Silence.</span></p>

<p><span>It stretches out with a tension you can almost cut with a knife.</span></p>

<p><span>Clicking, perhaps a new cassette inserted into a player?</span></p>

<p><span>The squeal of a cassette tape fast forwarding.</span></p>

<p><span>&quot;N̷o̸t̴h̸i̵n̵g̷&acirc;̶&euro;̵&trade;̷s̸ ̸d̸u̵m̸b̶.̵.̸.̶ ̶I̸f̸ ̵i̵t̶ ̵g̶e̸t̷s̴ ̶m̶e̶.̸.̶.̷ ̷o̶u̷t̴t̵a̸ ̴y̵o̵u̴r̵.̵.̴.̴ ̷G̶r̴i̴p̵.̵&quot;</span></p>

<p><span>The recording is thick with corruption, (This researcher speculates it comes from another Loop.) but the voice is clear. It&apos;s the same as the main speaker.</span></p>

<p><span>There&apos;s a...unidentifiable sort of...whoosh? Almost a pop of nothing becoming something, like when one of the Twins transforms...but sort of backwards?</span></p>

<p><span>And then a shriek, rapidly diminishing as if falling away, accompanied by clanks and thuds.</span></p>

<p><span>The recording clicks off.</span></p>

`
const samandtwig_meetup6 = `

<p><u><span>December 21th, 2015 &nbsp;2:14am (Video)</span></u></p>

<p><span>The view is of a dimly lit room. Newspaper articles scatter it, paper the walls and floor, and the static of an older style tv augments the dim, golden light of a single bare bulb hanging from the ceiling.</span></p>

<p><span>A figure, clearly identifiable as LAV-C-003-B is pacing in the small space. Ten paces forwards. Ten back.</span></p>

<p><span>Back and forth.</span></p>

<p><span>Back and forth.</span></p>

<p><span>This continues for twelve additional minutes before the whoosh pops in again and an air vent manifests in the ceiling. Clanging and thudding and howling builds to a crescendo as a hulking figure drops down onto the floor, narrowly missing LAV-C-003-B.</span></p>

<p><span>It springs to its feet, fangs bared, eyes glowing as it realizes its not alone. It is in full Hund form, notably further along than the last time this researcher encountered it.</span></p>

<p><span>&nbsp; LAV-C-003-B whirls to meet it, faintly glimmering lines appearing around it.</span></p>

<p><span>A shadowy figure appears behind both. L-C-002.</span></p>

<p><span>The squeal of a tape recorder fast forwarding grabs the attention in the room.</span></p>

<p><span>Despite the clear corruption (again, this research speculates its from a previous Loop), The voice is immediately recognizable as the one from the warehouse before, the one identifiable as the Hundmaster of LAV-C-003-A.</span></p>


<p><span>&quot;D̷o̷e̴s̵ ̶t̴h̶a̷t̶ ̴s̵o̶u̷n̵d̵ ̵f̷u̵n̴ ̴t̶o̸ ̵y̶o̵u̴,̴ ̵T̶w̶i̶g̷?̷ ̸L̶i̴v̸i̶n̵g̷ ̵y̶o̴u̷r̶ ̴l̶i̶f̷e̴ ̷i̷n̷s̸i̵d̴e̸ ̵y̶o̷u̵r̵ ̵b̸r̸o̸t̴h̵e̶r̶&apos;̶s̴ ̸l̷i̶t̸t̷l̸e̴ ̵g̷i̵l̸d̵e̴d̵ ̶c̶a̵g̸e̶?̵ ̴G̷e̶t̷t̴i̷n̷g̶ ̶t̷a̷k̴e̴n̴ ̴o̸n̵ ̵w̶a̴l̵k̵i̷e̶s̶,̸ ̴g̴r̶o̶w̴i̴n̷g̷ ̵f̸a̶t̷ ̴o̶f̷f̵ ̵w̴h̶a̵t̸e̷v̵e̸r̸ ̶l̵i̷e̴s̵ ̶h̷e̷&apos;̸s̸ ̸g̵o̶t̵t̴a̶ ̸t̷e̴l̵l̴ ̷t̶o̸ ̷k̴e̸e̴p̴ ̸y̶o̷u̴ ̷s̴a̵f̵e̶?̵ ̸A̵l̷l̵ ̴w̸h̸i̸l̵e̴ ̷h̵e̸ ̶p̸a̶r̴a̸d̸e̷s̴ ̶h̴i̶s̵ ̶o̶w̸n̶ ̴l̵i̸t̵t̵l̴e̷ ̵p̵e̶t̶ ̵a̸r̵o̷u̴n̴d̶?̸&quot;&nbsp;</span></p>

<p><span>A pause.</span></p>

<p><span>&nbsp;&quot;O̶n̵e̶ ̵h̵e̵ ̸c̵a̶n̸&apos;̶t̶ ̷e̷v̵e̴n̵ ̴t̴a̷m̸e̴?̸&quot;</span></p>

<p><span>A pause.</span></p>

<p><span>&quot;S̸u̵i̸t̸ ̵y̵o̷u̸r̶s̴e̴l̷f̶,̴ ̸i̸f̷ ̶t̷h̴a̴t̵&apos;̷s̸ ̵w̷h̶a̵t̴ ̴y̸o̶u̷ ̸w̸a̷n̵t̶ ̴t̴o̷ ̷d̷o̷.̷ ̷B̵u̵t̵.̸.̷.̴ ̸w̷e̸ ̵c̵o̶u̵l̶d̸ ̴b̶e̷ ̷s̵o̷m̷e̸t̶h̴i̵n̴g̴ ̶s̵t̴r̷o̵n̶g̷,̸ ̵i̸f̷ ̸y̵o̵u̴ ̵b̴e̴c̶o̵m̴e̵ ̶m̴i̸n̵e̴.&quot;&nbsp;</span></p>

<p><span>An extended silence.</span></p>

<p><span>&quot;̴N̴o̴t̷h̴i̸n̷g̶ ̵w̷i̸l̴l̵ ̷e̷v̵e̸r̴ ̶h̶o̶l̸d̶ ̶y̵o̵u̵ ̵b̶a̶c̷k̴ ̷a̶g̶a̶i̷n̷.&rdquo;</span></p>

<p><span>LAV-C-003-A has their back to the camera. They are extremely still, eyes locked onto the shadowy figure of L-C-002.</span></p>


<p><span>LAV-C-003-B isn&apos;t even bothering to look at her, facing the camera incidentally as they lock eyes with LAV-C-003-A.&nbsp;</span></p>

<p><span>&quot;Care to explain? How, per se, is this horseshit of dropping me in here, making me wait twenty minutes, only to TRAP me in here with the MONSTER! &nbsp;How! Is! This! GUARDING ME!?&quot;</span></p>

<p><span>Silence.</span></p>

<p><span>The recording plays the words of the Hundmaster again.</span></p>

<p><span>LAV-C-003-B screams in frustration.</span></p>

<p><span>LAV-C-003-A finally makes a decision, and sits, carefully, with their back pressed into a corner, face half visible to the camera.&nbsp;</span></p>

<p><span>Their words, when spoken, are carefully chosen, but with that edge of growl they tried to suppress around their Master.&nbsp;</span></p>

<p><span>&quot;What are you.&quot;</span></p>

<p><span>Not a question. No hint of upturned inflection at the end. No room to deny the inhuman nature of LAV-C-003-B.</span></p>

<p><span>LAV-C-003-B snorts. &quot;That&apos;s rich, coming from YOU. What you want a job? Heard we hire monsters around here? Well we&apos;re not hiring anymore. We got more than enough right now&quot;, they say, jerking a finger towards L-C-002. &quot;And the ones we got are barely trained enough as it is.&quot;</span></p>

<p><span>LAV-C-003-A&apos;s eyes narrow.</span></p>

<p><span>&quot;What are you. You&apos;re not what you seem. You&apos;re not me.&quot;</span></p>

<p><span>LAV-C-003-B throws their hands up. &quot;I swear I would trade away the Family Fortune for just ONE monster that makes any gods-damned sense around here.&quot;</span></p>

<p><span>Apparently enough time has passed since the adrenaline of the sudden fall and fight. LAV-C-003-A&apos;&apos;s bulk begins slipping away, their features softening, becoming more human.</span></p>

<p><span>More obviously a mirror of LAV-C-003-B.&nbsp;</span></p>

<p><span>This is the first record of A and B being near each other and this researcher notes the following visual differences through the grain and blur of the video cassette:</span></p>

<ul>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>A has obviously sharper teeth, though nothing outside of human norm.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>A has more scars coating their body.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>A has more muscle in general, and leaner features.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>A has shaggy, unwashed hair and unkempt clothing.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>B is softer in general, more body fat, cleaner, shorter hair, less muscle.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>B&apos;s eyes are slightly unfocused at all times.</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>B seems more tightly strung. They react to things more obviously, almost twitchy.&nbsp;</span></p>
    </li>
    <li style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;">
        <p><span>B seems to move, just slightly, almost involuntarily whenever anyone around them moves</span></p>
    </li>
</ul>

<p><span>B jumps backwards when they notice the similarities.</span></p>

<p><span>L-C-002 plays the recording of the Hundmaster one final time.</span></p>

<p><span>When it ends, she holds up her Razor (Researcher Note: this has been confirmed in previous loops to be Artifact 4: the Quatro Blade). She slowly, exaggeratedly carefully, slices the air between the two.</span></p>

<p><span>She gestures at A, then B.</span></p>

<p><span>She fumbles with something in her shadow, and the squeal of tapes again.</span></p>

<p><span>&quot;One enters... Two...leaves.&quot; plays the clearly doctored audio.</span></p>

<p><span>A is standing now.</span></p>

<p><span>&quot;I ran away from home. Got tired of my Big Bro calling the shots. Rava offered me training, a purpose. A looser collar. &quot;</span></p>

<p><span>B is pacing again, 5 steps back and forth against the narrow side of the room, as far from A as possible. &nbsp;&quot;See I KNOW this is bullshit cuz I would NEVER betray my family to go be.... what are you, homeless or something? A homeless dog?&quot;</span></p>

<p><span>They stop their pacing, glancing at L-C-002, who raises the shadowy tape recorder.</span></p>

<p><span>&quot;Second thought. I don&apos;t wanna hear whatever fucked up recording you have that proves me wrong.&quot; &nbsp;They pause. Collect their thoughts. &nbsp;&quot;Fine. Maybe when I was a stupid kid, fresh outta college, I had ideas I could live out on my own. Spit on the generosity of my Family. Sure.&quot;</span></p>

<p><span>They stare intensely at A. &nbsp;&quot;So if you&apos;re trying to say you&apos;re. What. Some fucked up alternate version of me? Fine. Thanks. Glad to hear I made the right choice.&quot;</span></p>

<p><span>A begins growling. &quot;And I&apos;m glad to find out that remaining a pampered pet would have turned me into &quot; a pause, wrinkling their nose &quot;this.&quot; A snaggletoothed grin &quot;Do you know how to even talk if you&apos;re not bitching about something? Why complain when you can just DO something?&quot;</span></p>

<p><span>B goes straight backed with fury. It&apos;s actually... a little funny to see. &nbsp;Like, they&apos;re the opposite of intimidating without their Family backing them up and they&apos;re going toe to toe with this Hund and... Right.&nbsp;</span></p>

<p><span>Anyways.&nbsp;</span></p>

<p><span>B stomps their foot, which I thought people only did in movies to show they&apos;re brats, and demands L-C-002 take them back.&nbsp;</span></p>

<p><span>She draws near to the camera, and leans over it, and the feed ends.</span></p>

`

const samandtwig_negotiatin7 = `
<p><u><span>December 31th, 2015 &nbsp;3:33pm (Video)</span></u></p>


<p><span>The video begins with LAV-C-003-B sitting in front an impressive dark wood desk, polished to a shine, no clutter or dust besmirching it.&nbsp;</span></p>

<p><span>They are at ease, well groomed, and their Big Brother is standing quietly beside them, looking stern, but approving.&nbsp;</span></p>

<p><span>&quot;Hello. If this video reaches where I hope it will, I am speaking to the Training Team of the Westerville Mall. &quot; &nbsp;A winning smile graces LAV-C-003-B&apos;s face, and its echo flits over to the Big Brother.</span></p>

<p><span>&quot;I represent the Family of Naples Italy, as I&apos;m sure you&apos;re aware. It appears we have a common enemy, of sorts.&quot;</span></p>

<p><span>LAV-C-003-B &nbsp;folds their hands neatly on top of the desk.&nbsp;</span></p>

<p><span>&quot;I want to make clear that I wholly disavow the actions of... Any part of that &quot;Cult of the Harvest&quot; business, no matter what involvement my... shall we say, Sibling? has with them.&quot;</span></p>

<p><span>Their Big Brother finally stirs, leaning over slightly to hand a thin manilla folder to LAV-C-003-B, who opens it and makes a show of leafing through it.</span></p>

<p><span>&quot;My associates inform you have had quite the conflict with them, as of late.&quot;</span></p>

<p><span>Another winning smile, this one not quite reaching the eyes.&nbsp;</span></p>

<p><span>&quot;I will be blunt. Their activities risk destabilizing part of my Business. A Business I am well aware one of your number has quite an interest in seeing continuing to run smoothly. &quot;</span></p>

<p><span>&quot;That Harvest Fruit or whatever they&apos;re calling that drug hitting the street.. &nbsp;It cannot be allowed to continue. Not only does this Cult have exclusive supply, I&apos;m sure you&apos;d agree that it hardly seems safe for the masses to access.&quot;</span></p>

<p><span>&quot;As they say, the enemy of my enemy is my friend. If you agree to ally with the Family, I&apos;m sure we&apos;ll both benefit. &nbsp;I can provide, as a sweetener to bring you to the table, a guarantee of access to the softer drugs our Family trades in, as well as any assistance required in securing their supply of the Fruit.&quot;</span></p>

<p><span>The camera zooms into LAV-C-003-B&apos;s face, the first hint that a third person was in the room at all.</span></p>

<p><span>&quot;All you need do is agree to guard the Fruit.&quot;</span></p>

<p><span>The manilla folder is carelessly tossed onto the desk.</span><span><br></span><span><br></span><span>&quot;You excel at &apos;containing&apos; things, right? &nbsp;And that fucked up Mall you live in... well, its not exactly easy to dive into. We learned that lesson the hard way. By the way, tell Witherby &apos;fuck you&apos; for me, would you?&quot;</span></p>

<p><span>The smile has become smarmy.</span></p>

<p><span>&quot;Your little camera girl made it clear that none of you have any intention of &apos;getting too close&apos; to me or mine. &nbsp;Fine. I&apos;m sure both sides benefit from such an arrangement.&quot;</span></p>

<p><span>&quot;So send me a recording back with your response. &nbsp;No internet, no traces. My bodyguard will see it gets to me.&quot;</span></p>

<p><span>The recording ends.</span></p>

`
const samandtwig_addendum8 = `
<p><strong><u><span>Addendum</span></u></strong></p>

<p><span>Witherby handled quizzing L-C-002 on why she sent the additional tapes. Near as he can figure it was in &quot;good faith&quot;, as he put it. LAV-C-003-B doesn&apos;t seem aware we have the info, but then they ALSO don&apos;t know we have a barter system already established with L-C-002.</span></p>

<p><span>Devona and Neville did some digging and it DOES seem like the Family has been actively working to keep Harvest Fruit off the street. It&apos;s just kinda hard to keep Wasted, Looping Cultists from just stealing them right back.&nbsp;</span></p>

<p><span>Along with all the rest of the info we&apos;ve been collecting on the Cult&apos;s activity, and I&apos;d say (purely speculation of course) that Twig, I&apos;m sorry LAV-C-003-A being part of the Cult might be motivating LAV-C-003-B to oppose them extra strongly.</span></p>

<p><span>I think Doc Slaughter would say that proving you&apos;re better than your past self is a huge motivator for some people.</span></p>

<p><span>Anyways.</span></p>

<p><span>Obviously we&apos;re not going to trust the Family. But... Containing the Aleph tier threat of the Harvest Fruit has to be our highest priority.</span></p>

<p><span>And NO I am not just saying that because it gets me all the weed I want.</span></p>

<p><span>Promise.</span></p>

<p><span>Witherby, if you&apos;re reading this, I super promise.</span></p>

<p><span>Anyways.&nbsp;</span></p>

<p><span>We talked it over as a group and I guess we don&apos;t want to send a recording back. No telling what that spider monster, sorry, LAV-C-003-A &nbsp;could do with our images, freely given, &nbsp;you know?</span><span><br></span><span><br></span><span>Witherby says he has a lead on some light Attachment Work he can do with one of the Family&apos;s higher ups, maybe see what support they can give us besides drugs.&nbsp;</span></p>

`;


/*8

i actually did have fun writing the himbo
i relaized that he should be a sort of parallel to Camellias sermon
so its a monologue addressed to an audience, and starts with the same word
i decided to go harder on the things like "aint" for two reasons
1) the hostage tries to talk fancy like even though he keeps falling to gangster slang (so himbo doesn't try to talk as fancy) 
and 2, and more importantly
himbo isn't an idiot
he just plays one up for an audience
he's a tactician
spiral coded, past us said
he knows what witherby's accent is
the one he represses
the one he's embarassed about
and he's throwing it into his face in this plausibably deniable way

he twists the knife , sows doubt, in claiming the loop is bad in ways that just "monstrousness" can't explain

he says he doens't care about other universes him and the Family but
definitely laces wibby's guilty ass with doubt
a little present for future loops

~~~
i wanted to really play up that yeah, he's the harmless background npc
and he WANTED you to think of him like that
the boss is all complaints and gaslighting, or SURE you'd THINK X is true but its not
while himbo is
just 'oh yeah, i'm not insulted at all, btw <the most fucked up insult posssible that is intended to haunt you for loops to come>

meanwhile is it clear why at least one needs to keep their hands clean?
gotta still count as a "poor little meow meow" for the eye killer
he did the whole 'send your boss next time' while still playing up being a harmless idiot
haha he's horny for monsters
but if he said that after he revealed more of his True Face
it would be parsed as way way way more insulting
haha he's horny for monsters

but if he said it AFTER the reveal, it would come off more as wibby is a little fuck boi
 who can't conenct with anyone unless its thru sex and he's not even good at that
  (i.e. throwing in his face even MORE what he has in common with John that made wibby hate john so much)


as ic put it when he read it

"so fuckng crazy thst hes like
I find your boss hotter
Send her next time
BRO U CANT BE SAYIN THAT"

he also purposefully doesn't call wibby "brother" until wibby tries making him confess

you show your monstrous hand?

sure

just dont be surprised when it turns out the 'himbo' has more in common with you than you thought

i think also its fun that the first hint that himbo isn't human anymore (to my knowledge) is in this monologue where you don't GET to know the context, the visuals, the motions

you're left wondering and doubting

maybe himbo is bluffing and just pretending he COULD be a monster

maybe he did something horriible and supernatural to wibby

the spiral is about doubt and confusion, deal with not knowing
*/

//https://ellienamored.neocities.org/rezamp/catalogue

/*
knows how to render and cipher itself, v spooky
*/
class Story {
    title = "???"
    text = "???"

    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}


const getCurrentStory = () => {
    if (!globalDataObject.highestStoryIndexUnlocked) {
        globalDataObject.highestStoryIndexUnlocked = 0;
    }
    return ordered_stories[globalDataObject.highestStoryIndexUnlocked % ordered_stories.length]
}

const getNextStory = (pleaseSave) => {
    console.log("JR NOTE: getNextStory", pleaseSave, globalDataObject)
    if (!globalDataObject.highestStoryIndexUnlocked) {
        globalDataObject.highestStoryIndexUnlocked = 0;
    }
    const ret = ordered_stories[globalDataObject.highestStoryIndexUnlocked % ordered_stories.length];
    globalDataObject.highestStoryIndexUnlocked = globalDataObject.highestStoryIndexUnlocked + 1;
    if (pleaseSave) {
        save();
    }
    return ret;
}

const handleRenderingStoryList = () => {
    const container = document.querySelector('#container');
    container.innerHTML = "";
    const story_holder = createElementWithClassAndParent("div", container, "story-holder story-beat");
    story_holder.scrollIntoView();
    const tick_bar = createElementWithClassAndParent("div", story_holder, "story-nav");
    const title = createElementWithClassAndParent("div", tick_bar, "tick-bar-title");
    title.innerText = "Stories"

    const story_container = createElementWithClassAndParent("div", story_holder);

    if (!globalDataObject.highestStoryIndexUnlocked) {
        story_container.innerHTML = "ERROR: no stories unlocked???"
    }
    const number_stories_unlocked = isItStoryTime() ? ordered_stories.length : globalDataObject.highestStoryIndexUnlocked
    let clicked = false;
    for (let i = 0; i < ordered_stories.length; i++) {
        if (i < number_stories_unlocked) {
            let chapter = "Chapter: " + i;
            if (i === 0) {
                chapter = "Prologue";
            } else if (i === ordered_stories.length - 1) {
                chapter = "Epilogue";
            }
            const story = ordered_stories[i];
            const tick_button = createElementWithClassAndParent("button", tick_bar, "story-button");
            tick_button.innerText = chapter + " " + story.title;
            tick_button.onclick = () => {
                story_container.innerHTML = '';
                renderRadioCipherStory(story, story_container)
                document.querySelectorAll(".story-button").forEach((b) => { b.disabled = undefined })

                tick_button.disabled = true;
            }
            if (!clicked) {
                clicked = true;
                tick_button.click();
            }
        }
    }
}

const rotationCipherWithMapping = (text, letterMapping, current_rotation) => {
    const letters = text.split("");
    let ret = "";
    for (letter of letters) {
        if (letterMapping[letter]) {
            const charCode = letter.charCodeAt(0);
            //don't let it rotate below zero
            const rotation = Math.max(letterMapping[letter] - current_rotation, 0);
            ret += `${String.fromCharCode(charCode + rotation)}`;

        } else {
            ret += letter; //let some things like punctuation and spaces go through unchanged
        }
    }
    return ret;
}

const translateToRadio = (number, otherMax, otherMin) => {
    const min = 88;
    const max = 108;
    //console.log("JR NOTE: translateToRadio", { number, otherMax, otherMin })
    return translateFromOldToNewScale(number, otherMax, otherMin, max, min);
}

const translateFromRadio = (number, otherMax, otherMin) => {
    const min = 88;
    const max = 108;
    //console.log("JR NOTE: translateFromRadio", { number, otherMax, otherMin })

    return translateFromOldToNewScale(number, max, min, otherMax, otherMin);
}

//i constantly ask DM what the formula for this is because 
//i always forget its called linear interpolation
//and can't search for it
//anyways you can test this by converting farenheit to celcius
//translateFromOldToNewScale(32, 212, 32, 100, 0) (212 is to 100 as 32 is to 0)
const translateFromOldToNewScale = (oldNumber, oldMax, oldMin, newMax, newMin) => {
    /// console.log("JR NOTE: translateFromOldToNewScale", { oldNumber, oldMax, oldMin, newMax, newMin })
    const t = (oldNumber - oldMin) / (oldMax - oldMin); //the ratio
    return newMin + t * (newMax - newMin)
}

//https://www.youtube.com/watch?v=GcumgV6zUvs
//an Event will call this, but so will the unlocked stories so far
const renderRadioCipherStory = (story, ele) => {
    const rand = new SeededRandom(stringtoseed(story.title));

    const audio_optionsRaw = `http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/wanderer_coffin_muffled.mp3
    http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/wanderer_coffin_muffled2.mp3
    http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/wanderer_coffin_muffled3.mp3
    http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/wanderer_coffin_muffled4.mp3
    http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/wanderer_coffin_muffled5.mp3`;
    const audio_options = audio_optionsRaw.split("\n")

    const static_audio = new Audio("http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/spookystatic.mp3");
    static_audio.loop = true;
    const muffled_audio = new Audio(rand.pickFrom(audio_options).trim());
    muffled_audio.loop = true;

    //26 is the correct rotation, not 0
    const modifier = rand.getRandomNumberBetween(0, 26);
    const max = 26 + modifier;
    const min = 0 - modifier;
    const { input } = createRangeInputWithLabel(ele, 13, translateToRadio(max, max, min), translateToRadio(min, max, min))
    input.value = rand.getRandomNumberBetween(0 - modifier, 26 + modifier);
    const story_container = createElementWithClassAndParent("div", ele, 'radio-story-container');


    //wanna preserve capitalization
    const highest = 122;
    const lowest = 65;
    //lower case starts at a = 97
    //upper case at A = 65
    const letterMapping = {};
    for (let i = lowest; i <= highest; i++) {
        letterMapping[String.fromCharCode(i)] = rand.getRandomNumberBetween(1, 26);
    }

    input.onmouseenter = () => {
        //volume for static gets lighter the closer we are to 26
        //volume for muffled gets louder the closer we are to 26
        static_audio.play();
        muffled_audio.play();
    }

    input.onmouseleave = () => {
        static_audio.pause();
        muffled_audio.pause();
    }

    input.oninput = () => {
        //round up no matter what
        const value = Math.ceil(translateFromRadio(parseInt(input.value), max, min));
        const translated_rotation = value <= 26 ? value : 27 - Math.abs(27 - value);
        static_audio.volume = Math.min(1, Math.max(0, (26 - translated_rotation) / 26));
        muffled_audio.volume = Math.min(1, Math.max(0, translated_rotation / 26));
        console.log("JR NOTE: translated_rotation,value", translated_rotation, value)
        story_container.innerHTML = `<h2>Tune the Radio:</h2><p> ${story.title}</p>` + rotationCipherWithMapping(story.text, letterMapping, translated_rotation);
    }
    const value = translateFromRadio(parseInt(input.value), max, min);
    const translated_rotation = value <= 26 ? value : 26 - Math.abs(26 - value);
    static_audio.volume = Math.min(1, Math.max(0, (26 - translated_rotation) / 26));
    muffled_audio.volume = Math.min(1, Math.max(0, translated_rotation / 26));
    story_container.innerHTML = `<h2>Tune the Radio</h2><p> ${story.title}</p> ` + rotationCipherWithMapping(story.text, letterMapping, translateFromRadio(parseInt(input.value), max, min));

}

const isItStoryTime = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const radio = urlParams.get('radio');
    if (radio) {
        return true;
    }
    return false;
}

//unlike most of my work, this is in a linear order
//because its the lavinraca/ lavinraca 2025 epilogue
//and time is real there
//extremely real
//even if the Harvest is no longer aware of it
const ordered_stories = [
    new Story("Before The Cult, There Were Still Shoppers", witherys_sacrificial_lamb),
    new Story("Harvest Parable", harvest_parable),
    new Story("THROGDAZORG's Candy Diary 1", throg_diary_1),
    new Story("Ria Receives a Report", samandtwig_report1),

    new Story("QQ Report: Terri 1", terri_report1), //terri quits eyedol games

    new Story("THROGDAZORG's Candy Diary 2", throg_diary_2),
    new Story("Twig Makes a Discovery", twig_discovers_sam2),

    new Story("QQ Report: Terri 2", terri_report2),

    new Story("THROGDAZORG's Candy Diary 3", throg_diary_3), //this is where the Cult finds out about the Dreamers
    new Story("Twig Goes It Alone", twig_asks_rava_for_permission3),


    new Story("THROGDAZORG's Candy Diary 4", throg_diary_4),
    new Story("QQ Report: Terri 3", terri_report3), //terri finds twig

    new Story("Twig Prowling", twig_prowling4),


    new Story("THROGDAZORG's Candy Diary 5 ", throg_diary_5),
    new Story("QQ Report: Terri 4", terri_report4), //terri joins cult

    new Story("Sam Makes a Discovery", sam_findsout_about_twig5),


    new Story("THROGDAZORG's Witherby Interlude 6", throg_diary_6_wibby_interlude),

    new Story("THROGDAZORG's Candy Diary 7", throg_diary_7), //throg is safely back home and learns about larping

    new Story("Sam and Twigs Wild Ride", samandtwig_meetup6), //i don't know why, but "sam and twigs wild ride" is what i'll always call their whole deal....i want to get off Mr Bones Wild Ride and all that... except kinda opposite. both think its fucked up the other exists but don't want to rejoin or like, stop existing


    new Story("The Boss' Lament", boss_lament), //the boss, also known as the Hostage (but not for a lot of loops now), is definitely, completely in control of things, also i did not MEAN to make this the only one you can't fully uncipher from the radio, but here we are, horseshoes in play

    new Story("QQ Report: Terri 5", terri_report5), //the trainin team is tasked to contain the harvest fruit

    new Story("Sam Makes an Offer You Can't Refuse", samandtwig_negotiatin7),


    new Story("THROGDAZORG's Candy Diary 8", throg_diary_8), //throg has friends

    new Story("The Training Team Makes a Decision", samandtwig_addendum8), //usually sending wibby to deal with a 'soft target' is a good idea, isn't it?

    new Story("Eustace's Meat Dream", eustaces_meat_dream), //terri brings eustace to the cult where he sees twig, throg and the Cultist and finds peace by fucking off from the cult, his job, everything. he joins eyedol riiiiight before terri quits it

    new Story("Himbo's Monologue", himbos_monologue), //himbo negotiaties the terms in which the Family and the Training Team will be working together to contain the harvest fruit (namely, the training team is going to do all the work and take on all the risk and get very little in return other than 'support')

]

/*
showcasing wibby rescuing throg lets us see how he NORMALLY opperates
to leave the void he flounders in with himbo in more stark contrast

seriously
people who are used to operating in irrelevance are...
kinda wibbys weakness


one way or another


*/


//https://www.youtube.com/watch?v=TCJU8DD3eGk&feature=youtu.be