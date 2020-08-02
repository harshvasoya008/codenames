(this["webpackJsonpreact-codenames"]=this["webpackJsonpreact-codenames"]||[]).push([[0],{14:function(e,a,E){e.exports=E(35)},19:function(e,a,E){},29:function(e,a,E){},30:function(e,a,E){"use strict";E.r(a);var t=E(13);window.Ably=new t.Realtime("3tgmIg.8CP_lQ:ozjSCWBHfR578D7j")},35:function(e,a,E){"use strict";E.r(a);var t=E(0),A=E.n(t),n=E(10),R=E.n(n),O=(E(19),E(11)),r=E(1),s=E(2),T=E(5),N=E(4),l=E(3),S=E(12),I=E.n(S),i=E(6),L=E.n(i),C=function(e){var a="card-dimension word-card text-center";if(e.data.isSpyMaster)switch(e.data.type){case"RED_AGENT":a+=" red-card-light";break;case"BLUE_AGENT":a+=" blue-card-light";break;case"TAN_BYSTANDER":a+=" tan-card-light";break;case"BLACK_ASSASSIN":a+=" black-card"}if(e.data.isChosen)switch(e.data.type){case"RED_AGENT":a+=" red-card";break;case"BLUE_AGENT":a+=" blue-card";break;case"TAN_BYSTANDER":a+=" tan-card";break;case"BLACK_ASSASSIN":a+=" black-card"}else e.isChosen&&"BLACK_ASSASSIN"!==e.data.type||(a+=" shadow");return A.a.createElement("div",{className:"".concat(a),onClick:e.onClick},e.data.word)},o=function(e){Object(N.a)(E,e);var a=Object(l.a)(E);function E(e){var t;return Object(r.a)(this,E),(t=a.call(this,e)).createBoard=t.createBoard.bind(Object(T.a)(t)),t}return Object(s.a)(E,[{key:"createBoard",value:function(e,a){for(var E=[],t=0,n=0;n<e;n+=1){for(var R=[],O=0;O<a;O+=1)R.push(this.renderCard(t++));E.push(A.a.createElement("div",{key:n,className:"board-row d-flex"},R))}return E}},{key:"renderCard",value:function(e){var a=this;return A.a.createElement(C,{key:e,data:this.props.cards[e],isSpyMaster:this.props.isSpyMaster,onClick:function(){return a.props.onClick(e)}})}},{key:"render",value:function(){return A.a.createElement("div",null,this.createBoard(5,5))}}]),E}(t.Component),c=function e(){Object(r.a)(this,e)};c.publish=function(e){var a=Ably.channels.get(e);a.publish(arguments.length<=1?void 0:arguments[1],arguments.length<=2?void 0:arguments[2],arguments.length<=3?void 0:arguments[3])},c.subscribe=function(e){var a=Ably.channels.get(e);a.subscribe(arguments.length<=1?void 0:arguments[1])};var m=function(e){e&&console.log("Unable to publish message; err = "+e.message)},u=function(e){Object(N.a)(E,e);var a=Object(l.a)(E);function E(e){var t;return Object(r.a)(this,E),(t=a.call(this,e)).state={teamRed:[],teamBlue:[]},t}return Object(s.a)(E,[{key:"componentDidMount",value:function(){this.prepareTeams()}},{key:"componentDidUpdate",value:function(e){e.playerMap!==this.props.playerMap&&this.prepareTeams()}},{key:"prepareTeams",value:function(){var e=this,a=L.a.filter(Object.keys(this.props.playerMap),(function(a){return"Red"===e.props.playerMap[a].team})),E=L.a.filter(Object.keys(this.props.playerMap),(function(a){return"Blue"===e.props.playerMap[a].team}));this.setState({teamRed:a,teamBlue:E})}},{key:"getSpyView",value:function(e,a){for(var E=[],t=0,n=this.props.cards.map((function(e){return e.type.toLowerCase().replace("_","-")})),R=0;R<e;R+=1){for(var O=[],r=0;r<a;r+=1){var s="card-dimension rounded-pill bg-"+n[t];O.push(A.a.createElement("div",{key:t,className:s},"!")),t++}E.push(A.a.createElement("div",{className:"d-flex"},O))}return E}},{key:"render",value:function(){var e=this,a=this.props.isSpyMaster?"":"disabled";return A.a.createElement("div",{className:"panel"},A.a.createElement("div",{className:"py-3"},A.a.createElement("span",{className:"role-label"},"Role: "),A.a.createElement("span",{className:this.props.playerTeam.toLowerCase()+"-agent role-value"},this.props.isSpyMaster?"Spymaster":"Field Operative")),A.a.createElement("div",null,A.a.createElement("ul",{className:"nav nav-tabs nav-justified",id:"panelTabs",role:"tablist"},A.a.createElement("li",{className:"nav-item"},A.a.createElement("a",{className:"nav-link active",id:"player-view-tab","data-toggle":"tab",href:"#player-view",role:"tab","aria-controls":"player-view","aria-selected":"true"},"Operatives")),A.a.createElement("li",{className:"nav-item"},A.a.createElement("a",{className:"nav-link "+a,id:"spy-view-tab","data-toggle":"tab",href:"#spy-view",role:"tab","aria-controls":"spy-view","aria-selected":"false"},"Spy View"))),A.a.createElement("div",{className:"tab-content",id:"panelTabsContent"},A.a.createElement("div",{className:"tab-pane fade show active",id:"player-view",role:"tabpanel","aria-labelledby":"player-view-tab"},A.a.createElement("div",{className:"d-flex p-2"},A.a.createElement("div",{className:"col-6 border-right p-2"},this.state.teamRed.map((function(a){return e.props.isSpyMaster?A.a.createElement("div",{className:"red-agent"},"[",e.props.playerMap[a].name,"]"):A.a.createElement("div",{className:"red-agent"},e.props.playerMap[a].name)}))),A.a.createElement("div",{className:"col-6 p-2"},this.state.teamBlue.map((function(a){return e.props.isSpyMaster?A.a.createElement("div",{className:"blue-agent"},"[",e.props.playerMap[a].name,"]"):A.a.createElement("div",{className:"blue-agent"},e.props.playerMap[a].name)}))))),this.props.isSpyMaster&&25===this.props.cards.length&&A.a.createElement("div",{class:"tab-pane fade",id:"spy-view",role:"tabpanel","aria-labelledby":"spy-view-tab"},A.a.createElement("div",{className:"p-4"},this.getSpyView(5,5))))))}}]),E}(t.Component),d=function(e){Object(N.a)(E,e);var a=Object(l.a)(E);function E(e){var t;return Object(r.a)(this,E),(t=a.call(this,e)).createBoard=function(){var e=t.categorizeWords(t.props.words);c.publish(t.props.gameChannel,"event_new_board",{board:e},m)},t.categorizeWords=function(e){for(var a=0===Math.floor(Math.random()+.5)?9:8,E=[],t=0;t<e.length;t+=1){var A={word:e[t]};A.type=t<a?"RED_AGENT":t<17?"BLUE_AGENT":t<24?"TAN_BYSTANDER":"BLACK_ASSASSIN",E.push(A)}return{words:L.a.shuffle(E),redCount:a,blueCount:17-a,turn:9===a?"Red":"Blue"}},t.state={board:[],turn:"Nobody",isSpyMaster:!1,hasGameStarted:!1,isGameOver:!1},t.myTeam=e.playerMap[e.myUuid].team,t.redCount=0,t.blueCount=0,t.winner=null,console.log("in"),t}return Object(s.a)(E,[{key:"componentDidMount",value:function(){this.subscribeToChannel(),this.props.isRoomCreator&&this.createBoard()}},{key:"subscribeToChannel",value:function(){var e=this;c.subscribe(this.props.gameChannel,(function(a){var E=a.name,t=a.data;if("event_new_board"===E)e.redCount=t.board.redCount,e.blueCount=t.board.blueCount,e.setState({board:t.board.words,turn:t.board.turn});else if("event_card_click"===E){e.redCount=t.redCount,e.blueCount=t.blueCount;var A=e.state.board;"BLACK_ASSASSIN"===A[t.index].type?e.blackCardClicked():(A[t.index].isChosen=!0,e.setState({board:A,turn:t.turn}),e.checkForWinner())}else"event_turn_pass"===E&&e.setState({turn:t.turn})}))}},{key:"handleCardClick",value:function(e){var a=this.state.board,E=this.state.turn;if(!a[e].isChosen&&E===this.myTeam&&!this.state.isSpyMaster){a[e].isChosen=!0,this.setState({board:a});var t=E;switch(a[e].type){case"RED_AGENT":this.redCount-=1,t="Red";break;case"BLUE_AGENT":this.blueCount-=1,t="Blue";break;case"TAN_BYSTANDER":t="Red"===E?"Blue":"Red";break;case"BLACK_ASSASSIN":t="Nobody",this.blackCardClicked()}this.setState({turn:t}),c.publish(this.props.gameChannel,"event_card_click",{index:e,turn:t,redCount:this.redCount,blueCount:this.blueCount},m),this.checkForWinner()}}},{key:"blackCardClicked",value:function(){var e=this.state.turn;"Red"===e?this.winner="Blue":"Blue"===e&&(this.winner="Red"),this.declareWinner()}},{key:"checkForWinner",value:function(){0===this.redCount?(this.winner="Red",this.declareWinner()):0===this.blueCount&&(this.winner="Blue",this.declareWinner())}},{key:"declareWinner",value:function(){for(var e=this.state.board,a=0;a<e.length;a++)e[a].isChosen=!0;this.setState({board:e,isGameOver:!0})}},{key:"endTurn",value:function(){var e="Red"===this.state.turn?"Blue":"Red";this.setState({turn:e}),c.publish(this.props.gameChannel,"event_turn_pass",{turn:e},m)}},{key:"render",value:function(){var e=this;return A.a.createElement("div",{className:"p-3 text-center full-height"},A.a.createElement("div",{className:"row mx-0 mt-3 mb-4"},A.a.createElement("div",{className:"col-2 text-left"},A.a.createElement("h5",null,"Hello, ",this.props.playerMap[this.props.myUuid].name,"!")),A.a.createElement("div",{className:"col-8"},A.a.createElement("h4",null,"Codenames")),A.a.createElement("div",{className:"col-2 p-0"},A.a.createElement("button",{className:"btn btn-outline-primary btn-sm px-3"},"New Game"),A.a.createElement("button",{className:"float-right btn btn-outline-danger btn-sm px-3"},"Leave Game"))),A.a.createElement("div",{className:"mt-3"},A.a.createElement("div",{className:"row m-0"},A.a.createElement("div",{className:"col-9"},A.a.createElement("div",{className:"row game-status mb-3"},A.a.createElement("div",{className:"col-4 d-flex pl-0"},A.a.createElement("div",{className:"red-agent ml-3 mr-1"},this.redCount),A.a.createElement("div",null,"-"),A.a.createElement("div",{className:"blue-agent mx-1"},this.blueCount)),A.a.createElement("div",{className:"col-4"},A.a.createElement("div",{className:"Red"===this.state.turn?"red-agent":"blue-agent"},this.state.isGameOver?this.winner.toLowerCase()+" won!":this.state.turn.toLowerCase()+"'s turn")),A.a.createElement("div",{className:"col-4 text-right align-top"},A.a.createElement("button",{className:"btn btn-outline-dark btn-sm px-3",style:{marginRight:"0.5%"},disabled:this.state.turn!==this.myTeam,onClick:function(){return e.endTurn()}},"End Turn"))),this.state.hasGameStarted&&25===this.state.board.length&&A.a.createElement(o,{cards:this.state.board,isSpyMaster:this.state.isSpyMaster,onClick:function(a){return e.handleCardClick(a)}})),A.a.createElement("div",{className:"col-3 pr-0"},A.a.createElement(u,{cards:this.state.board,playerMap:this.props.playerMap,playerTeam:this.myTeam,isSpyMaster:this.state.isSpyMaster})))))}}]),E}(t.Component),P=["ACE","ACNE","ACRE","ADDENDUM","ADVERTISE","AFRICA","AGENT","AIR","AIRCRAFT","AISLE","ALASKA","ALIEN","ALLIGATOR","ALPHABETIZE","ALPS","AMAZON","AMBULANCE","AMERICA","ANCHOR","ANGEL","ANKLE","ANT","ANTARCTICA","ANTHEM","APATHY","APPLAUSE","APPLE","APPLESAUC","APPLICATION","APRON","ARCHAEOLOGIST","ARISTOCRAT","ARM","ARMADA","ARMOR","ARMY","ASH","ASLEEP","ASTRONAUT","ATHLETE","ATLANTIS","ATTIC","AUNT","AUSTRALIA","AVALANCHE","AVOCADO","AXE","AZTEC","BABY","BABY-SITTER","BACK","BACKBONE","BACON","BAG","BAGUETTE","BALD","BALL","BALLOON","BANANA","BAND","BANISTER","BANK","BAR","BARBECUE","BARK","BASEBALL","BASEBOARDS","BASKETBALL","BASS","BAT","BATH","BATTERY","BATTLE","BATTLESHIP","BAY","BEACH","BEAM","BEAN","BEANSTALK","BEAR","BEARD","BEAT","BED","BEDBUG","BEE","BEER","BEETHOVEN","BEIJING","BELL","BELT","BENCH","BERLIN","BERMUDA","BERRY","BIB","BICYCLE","BIG","BIG BANG","BIG BEN","BIKE","BILL","BILLBOARD","BIRD","BIRTHDAY","BISCUIT","BITE","BLACKSMITH","BLADE","BLANKET","BLEACH","BLIMP","BLIND","BLIZZARD","BLOCK","BLOSSOM","BLUEPRINT","BLUES","BLUNT","BLUR","BOA","BOARD","BOAT","BOB","BOBSLED","BODY","BOIL","BOLT","BOMB","BOND","BONNET","BONSAI","BOOK","BOOM","BOOT","BOOTH","BOSS","BOTTLE","BOW","BOWL","BOWLER","BOWTIE","BOX","BOXER","BOY","BRAIN","BRAINSTORM","BRAND","BRASS","BRAVE","BRAZIL","BREAD","BREAK","BRICK","BRIDE","BRIDGE","BROCCOLI","BROKEN","BROOM","BROTHER","BRUISE","BRUNETTE","BRUSH","BUBBLE","BUCK","BUCKET","BUDDY","BUFFALO","BUG","BUGLE","BULB","BUNK","BUNNY","BUS","BUTTER","BUTTERFLY","BUTTON","BUY","CABIN","CABLE","CAESAR","CAFETERIA","CAKE","CALCULATOR","CALF","CAMP","CAMPSITE","CAN","CANADA","CANDLE","CANDY","CANE","CAP","CAPE","CAPITAL","CAPITALISM","CAPTAIN","CAR","CARD","CARDBOARD","CARROT","CARTOGRAPHY","CASINO","CAST","CASTLE","CAT","CAVE","CD","CEILING","CELL","CENTAUR","CENTER","CENTURY","CHAIN","CHAIR","CHALK","CHAMPION","CHANGE","CHARGE","CHARGER","CHECK","CHEERLEADER","CHEESE","CHEF","CHERRY","CHESS","CHEST","CHEW","CHICK","CHICKEN","CHIME","CHINA","CHIP","CHOCOLATE","CHRISTMAS","CHURCH","CIRCLE","CIRCUS","CLAY","CLEOPATRA","CLIFF","CLOAK","CLOCK","CLOCKWORK","CLOUD","CLOWN","CLUB","CLUE","COACH","COAL","COAST","COASTER","CODE","COFFEE","COG","COLD","COLLAR","COLLEGE","COLUMBUS","COMB","COMET","COMFORT","COMIC","COMPOUND","COMPUTER","CONCERT","CONDUCTOR","CONE","CONSTRICTOR","CONTINUUM","CONTRACT","CONVERSATION","COOK","COOP","COPPER","CORD","CORDUROY","COT","COTTON","COUGH","COUNTRY","COURT","COVER","COW","COWBOY","CRAB","CRAFT","CRANE","CRASH","CRAYON","CREAM","CRICKET","CRISP","CRITICIZE","CROSS","CROW","CROWN","CRUISE","CRUMB","CRUSADER","CRUST","CRYSTAL","CUCKOO","CUFF","CURRY","CURTAIN","CUTICLE","CYCLE","CZAR","CZECH","DAD","DANCE","DART","DASH","DATE","DAWN","DAY","DEATH","DECK","DEEP","DEFECT","DEGREE","DELTA","DENT","DENTIST","DESK","DIAMOND","DICE","DICTIONARY","DIMPLE","DINOSAUR","DIRECTOR","DIRTY","DISEASE","DISK","DISMANTLE","DITCH","DIVER","DOCTOR","DOG","DOGHOUSE","DOLL","DOLLAR","DOMINOES","DOOR","DOT","DRAFT","DRAGON","DRAIN","DRAW","DRAWING","DREAM","DRESS","DRESSING","DRILL","DRINK","DRIP","DRIVER","DRONE","DROP","DRUM","DRUMS","DRYER","DUCK","DUMP","DUNK","DUST","DWARF","EAGLE","EAR","EARTH","EARTHQUAKE","EASTER","EAT","EBONY","EDEN","EGG","EGYPT","EINSTEIN","ELBOW","ELECTRICITY","ELEPHANT","ELEVATOR","ELF","ELM","EMBASSY","ENGINE","ENGLAND","ERGONOMIC","ESCALATOR","EUREKA","EUROPE","EVOLUTION","EXTENSION","EYE","EYEBROW","FACE","FAIR","FALL","FAN","FANCY","FARM","FAST","FEAST","FENCE","FEUDALISM","FEVER","FIDDLE","FIELD","FIGHTER","FIGMENT","FIGURE","FILE","FILM","FINGER","FIRE","FIRST","FISH","FISHING","FIX","FIZZ","FLAG","FLAGPOLE","FLANNEL","FLASHLIGHT","FLAT","FLOCK","FLOOD","FLOOR","FLOTSAM","FLOWER","FLU","FLUSH","FLUTE","FLUTTER","FLY","FOAM","FOG","FOIL","FOOT","FOOTBALL","FORCE","FOREHEAD","FOREST","FOREVER","FORK","FORTNIGHT","FRANCE","FRECKLE","FREIGHT","FRINGE","FROG","FROST","FROWN","FUEL","GALLOP","GAME","GANGSTER","GARBAGE","GARDEN","GAS","GASOLINE","GEAR","GEM","GENIE","GENIUS","GERMANY","GHOST","GIANT","GINGER","GINGERBREAD","GIRL","GLACIER","GLASS","GLASSES","GLOVE","GOAT","GOBLIN","GOLD","GOLDILOCKS","GOLF","GOODBYE","GOVERNOR","GRACE","GRANDPA","GRAPE","GRASS","GRATITUDE","GRAY","GREECE","GREEN","GREENHOUSE","GROOM","GROUND","GUITAR","GUM","GUMBALL","GYMNAST","HAIR","HALF","HALLOWEEN","HAM","HAMBURGER","HAMMER","HAND","HANDLE","HANDWRITING","HANG","HAPPY","HAT","HATCH","HAWAII","HAWK","HEAD","HEADACHE","HEART","HEDGE","HELICOPTER","HELMET","HEM","HERCULES","HIDE","HILL","HIMALAYAS","HIT","HOCKEY","HOLE","HOLLYWOOD","HOMER","HOMEWORK","HONEY","HONK","HOOD","HOOK","HOPSCOTCH","HORN","HORSE","HORSESHOE","HOSE","HOSPITAL","HOT","HOTEL","HOUSE","HOUSEBOAT","HUG","HUMIDIFIER","HUNGRY","HURDLE","HURT","HUT","ICE","ICE AGE","ICE CREAM","ICELAND","IGLOO","IMPLODE","INDIA","INK","INN","INQUISITION","INTERN","INTERNET","INVITATION","IRON","IRONIC","IVORY","IVY","JACK","JADE","JAIL","JAM","JAPAN","JEANS","JELLY","JELLYFISH","JET","JEWELER","JIG","JOAN OF ARC","JOCKEY","JOG","JOKER","JOURNAL","JUDGE","JUMP","JUMPER","JUPITER","KANGAROO","KETCHUP","KEY","KICK","KID","KILLER","KILOGRAM","KILT","KING","KING ARTHUR","KISS","KITCHEN","KITE","KIWI","KNEE","KNEEL","KNIFE","KNIGHT","KNOT","KOALA","KUNG FU","LAB","LACE","LADDER","LADYBUG","LAG","LANDFILL","LAP","LASER","LAUGH","LAUNDRY","LAW","LAWN","LAWNMOWER","LAWYER","LEAD","LEAF","LEAK","LEATHER","LEG","LEMON","LEMONADE","LEPRECHAUN","LETTER","LEVEL","LIFE","LIFESTYLE","LIGAMENT","LIGHT","LIGHTNING","LIGHTSABER","LIME","LIMOUSINE","LINE","LINK","LION","LIP","LITTER","LIZARD","LOCH NESS","LOCK","LOCUST","LOG","LOITERER","LOLLIPOP","LONDON","LOVE","LOVESEAT","LOYALTY","LUCK","LUMBERJACK","LUNCH","LUNCHBOX","LYRICS","MACHINE","MACHO","MAGAZINE","MAGICIAN","MAIL","MAILBOX","MAKEUP","MAMMOTH","MANICURE","MAP","MAPLE","MARACAS","MARATHON","MARBLE","MARCH","MARK","MARS","MASCOT","MASS","MAST","MATCH","MATCHSTICK","MATE","MATTRESS","MEDIC","MEMORY","MERCURY","MESS","METER","MEXICO","MICROSCOPE","MICROWAVE","MIDSUMMER","MILE","MILK","MILL","MILLIONAIRE","MINE","MINOTAUR","MINT","MINUTE","MIRROR","MISS","MISSILE","MISTAKE","MODEL","MODERN","MOHAWK","MOLD","MOLE","MOM","MONA LISA","MONDAY","MONEY","MONITOR","MONKEY","MONSTER","MOOCH","MOON","MOP","MOSCOW","MOSES","MOSQUITO","MOTH","MOTHER","MOTORCYCLE","MOUNT","MOUNTAIN","MOUNTIE","MOUSE","MOUTH","MOWER","MUD","MUG","MUMMY","MUSIC","MUSKETEER","MUSTARD","MUTE","NAIL","NAPOLEON","NATURE","NEEDLE","NEGOTIATE","NEIGHBOR","NERVE","NEST","NET","NEUTRON","NEW YORK","NEWTON","NIECE","NIGHT","NIGHTMARE","NINJA","NOAH","NOSE","NOTE","NOTRE DAME","NOVEL","NURSE","NUT","NYLON","OAR","OASIS","OBSERVATORY","OCTOPUS","OFFICE","OIL","OLD","OLIVE","OLYMPIAN","OLYMPUS","ONION","OPAQUE","OPENER","OPERA","ORANGE","ORBIT","ORGAN","ORGANIZE","OUTER","OUTSIDE","OVATION","OVERTURE","PACIFIC","PAD","PADDLE","PAGE","PAIL","PAINT","PAJAMAS","PALACE","PALM","PAN","PANTS","PAPER","PARACHUTE","PARADE","PARK","PARODY","PARROT","PART","PARTY","PASS","PASSWORD","PASTE","PASTRY","PATIENT","PAWN","PEA","PEACH","PEANUT","PEAR","PEARL","PEN","PENCIL","PENDULUM","PENGUIN","PENNY","PENTAGON","PEPPER","PERSONAL","PEW","PHILOSOPHER","PHOENIX","PHONE","PHOTOGRAPH","PIANO","PICNIC","PIE","PIG","PIGPEN","PILLOW","PILOT","PIN","PINCH","PINE","PING","PINWHEEL","PIPE","PIRATE","PISTOL","PIT","PITCH","PITCHER","PIZZA","PLAID","PLAN","PLANE","PLANK","PLASTIC","PLATE","PLATYPUS","PLAY","PLAYGROUND","PLOT","PLOW","PLUMBER","POCKET","POEM","POINT","POISON","POLE","POLICE","POLISH","POLO","POMP","PONG","POOL","POP","POPCORN","POPSICLE","POPULATION","PORT","PORTFOLIO","POSITIVE","POST","POTATO","POTTER","POUND","POWDER","PRESS","PRINCESS","PROCRASTINATE","PROTESTANT","PSYCHOLOGIST","PUBLISHER","PUMPKIN","PUNK","PUPIL","PUPPET","PUPPY","PURSE","PUSH","PUZZLE","PYRAMID","QUACK","QUARANTINE","QUARTER","QUEEN","QUICKSAND","QUIET","RABBIT","RACE","RACKET","RADIO","RAFT","RAG","RAIL","RAINBOW","RAINWATER","RAM","RANCH","RANDOM","RAT","RAY","RAZOR","RECORD","RECYCLE","RED","REGRET","REIMBURSEMENT","REINDEER","RETALIATE","REVOLUTION","RIB","RICE","RIDDLE","RIFLE","RIM","RING","RINK","RIP","RIVER","ROAD","ROBIN","ROBOT","ROCK","RODEO","ROLL","ROLLER","ROME","ROOM","ROOT","ROPE","ROSE","ROULETTE","ROUND","ROUNDABOUT","ROW","RUBBER","RULER","RUNG","RUNT","RUSSIA","RUST","RUT","SACK","SAD","SADDLE","SAFE","SAHARA","SAIL","SALAD","SALMON","SALOON","SALSA","SALT","SAND","SANDBOX","SANDCASTLE","SANDWICH","SANTA","SASH","SATELLITE","SATURN","SAW","SCALE","SCAR","SCARECROW","SCARED","SCHOOL","SCIENTIST","SCORPION","SCOUNDREL","SCRAMBLE","SCRATCH","SCREEN","SCROLL","SCUBA DIVER","SCUFF","SEAL","SEASHELL","SEASON","SECOND","SENTENCE","SEQUINS","SERVER","SET","SHADOW","SHAFT","SHAKESPEARE","SHALLOW","SHAMPOO","SHARK","SHED","SHEEP","SHEET","SHEETS","SHELL","SHERIFF","SHERLOCK","SHERWOOD","SHIP","SHIPWRECK","SHIRT","SHOE","SHOELACE","SHOOT","SHOP","SHORT","SHORTS","SHOT","SHOULDER","SHOWER","SHRINK","SICK","SIESTA","SIGN","SILHOUETTE","SILK","SINGER","SINK","SIP","SISTER","SKATE","SKATES","SKATING","SKI","SKULL","SKYSCRAPER","SLAM","SLED","SLEEP","SLING","SLIP","SLIPPER","SLOTH","SLOW","SLUG","SLUMP","SMELL","SMITH","SMOKE","SMOOTHIE","SMUGGLER","SNAKE","SNAP","SNEEZE","SNOW","SNOWMAN","SNUGGLE","SOAP","SOCK","SOLDIER","SONG","SOUL","SOUND","SOUP","SPACE","SPARE","SPEAKERS","SPELL","SPHINX","SPIDER","SPIKE","SPINE","SPIRIT","SPIT","SPONGE","SPOOL","SPOON","SPOT","SPRAY","SPRING","SPRINKLER","SPURS","SPY","SQUARE","SQUASH","SQUINT","SQUIRREL","ST.PATRICK","STABLE","STADIUM","STAFF","STAIRS","STAMP","STANDING","STAR","STATE","STEAM","STEEL","STEP","STETHOSCOPE","STICK","STICKER","STOCK","STOCKHOLDER","STOPLIGHT","STORM","STORY","STOUT","STOVE","STOWAWAY","STRAW","STREAM","STREAMLINE","STREET","STRIKE","STRING","STRIPE","STUDENT","SUB","SUGAR","SUIT","SUMO","SUN","SUNBURN","SUPERHERO","SUSHI","SWAMP","SWARM","SWEAT","SWEATER","SWIMMING","SWING","SWITCH","SWORD","TABLE","TABLET","TACHOMETER","TAG","TAIL","TALK","TANK","TAP","TASTE","TATTOO","TAXI","TEA","TEACHER","TEAM","TEAPOT","TEAR","TEENAGER","TELEPHONE","TELESCOPE","TELEVISION","TEMPLE","TEN","TENNIS","TEXAS","THEATER","THIEF","THINK","THRONE","THROUGH","THUMB","THUNDER","TICK","TIDE","TIE","TIGER","TIME","TIN","TINTING","TIP","TIPI","TIPTOE","TIPTOP","TIRED","TISSUE","TOAST","TOILET","TOKYO","TOOL","TOOTH","TOOTHBRUSH","TORCH","TORNADO","TOURNAMENT","TOWER","TRACK","TRACTOR","TRAIN","TRASH","TREASURE","TREE","TRIANGLE","TRICK","TRIP","TROLL","TRUCK","TRUNK","TUB","TUBA","TUBE","TUNNEL","TURKEY","TURTLE","TUTOR","TUTU","TUXEDO","TWANG","TWIG","TWITTERPATED","TYPE","UNDERTAKER","UNEMPLOYED","UNICORN","UNIVERSITY","UPGRADE","VACUUM","VALENTINE","VAMPIRE","VAN","VENUS","VEST","VET","VIKING","VIOLET","VIRUS","VISION","VOLCANO","VOLUME","WAG","WAGON","WAITRESS","WAKE","WALL","WALRUS","WAR","WASHER","WASHINGTON","WATCH","WATER","WATERMELON","WAVE","WAX","WEB","WEDDING","WEED","WELDER","WELL","WEREWOLF","WHALE","WHATEVER","WHEEL","WHEELCHAIR","WHIP","WHIPLASH","WHISK","WHISTLE","WHITE","WIG","WILL","WIND","WINDMILL","WINDOW","WING","WINTER","WISH","WITCH","WIZARD","WOLF","WONDERLAND","WOOD","WOOL","WORLD","WORM","WRISTWATCH","YARD","YARDSTICK","YELLOWSTONE","ZAMBONI","ZEN","ZERO","ZIPPER","ZOMBIE","ZONE","ZOO"],M=(E(29),function(e){Object(N.a)(E,e);var a=Object(l.a)(E);function E(e){var t;return Object(r.a)(this,E),(t=a.call(this,e)).subscribeToChannel=function(e){null!=e&&c.subscribe(e,(function(a){var E=a.name,A=a.data;if("event_join"===E&&t.state.isRoomCreator)A.team=t.assignTeam(),t.setState((function(e){return{playerList:e.playerList.concat(A)}})),c.publish(e,"event_player_list",{playerList:t.state.playerList},m);else if("event_player_list"===E){var n=t.generatePlayerMap(A.playerList);t.setState({playerList:A.playerList,playerMap:n})}}))},t.onPressCreate=function(){if(t.state.roomId&&t.state.name){t.lobbyChannel="codenames:::"+t.state.roomId,t.setState({isRoomCreator:!0}),t.subscribeToChannel(t.lobbyChannel),t.words=L.a.shuffle(P).slice(0,25);var e=t.assignTeam(),a=[{uuid:t.uuid,name:t.state.name,team:e}],E=t.generatePlayerMap(a);t.setState({playerList:a,playerMap:E})}else alert("Nickname and Room fields cannot be empty")},t.onPressJoin=function(){t.state.roomId&&t.state.name?(t.lobbyChannel="codenames:::"+t.state.roomId,c.publish(t.lobbyChannel,"event_join",{uuid:t.uuid,name:t.state.name},m),t.subscribeToChannel(t.lobbyChannel)):alert("Nickname and Room fields cannot be empty")},t.uuid=I.a.generate().substring(0,6),t.state={isRoomCreator:!1,playerList:[],playerMap:{}},t.onPressCreate=t.onPressCreate.bind(Object(T.a)(t)),t.onPressJoin=t.onPressJoin.bind(Object(T.a)(t)),t.handleInputChange=t.handleInputChange.bind(Object(T.a)(t)),t.lobbyChannel=null,t.words=[],t.teamFlag=!1,t}return Object(s.a)(E,[{key:"componentDidMount",value:function(){0}},{key:"generatePlayerMap",value:function(e){var a={};return e.forEach((function(e){return a[e.uuid]=e})),a}},{key:"assignTeam",value:function(){return this.teamFlag=!this.teamFlag,this.teamFlag?"Red":"Blue"}},{key:"handleInputChange",value:function(e){var a=e.target,E=a.name,t=a.value;this.setState(Object(O.a)({},E,t))}},{key:"render",value:function(){return A.a.createElement("div",null,!this.state.playerList.length&&A.a.createElement("div",{className:"d-md-flex full-height align-items-center"},A.a.createElement("div",{className:"heading heading-left bg-split-ui-dark"},A.a.createElement("h1",null,"code")),A.a.createElement("div",{className:"heading heading-right bg-split-ui-light"},A.a.createElement("h1",null,"names")),A.a.createElement("div",{className:"col-md-6 p-0 bg-split-ui-light full-height align-items-center"},A.a.createElement("div",{className:"p-5"},A.a.createElement("div",{className:"box login-box shadow"},A.a.createElement("div",{className:"box-title"},A.a.createElement("span",null,"Welcome!")),A.a.createElement("div",{className:"mt-3 p-4"},A.a.createElement("div",{className:"form-group row"},A.a.createElement("label",{className:"col-4 col-form-label"},"Nickname"),A.a.createElement("div",{className:"col-8"},A.a.createElement("input",{name:"name",type:"text",className:"form-control",onChange:this.handleInputChange}))),A.a.createElement("div",{className:"form-group row"},A.a.createElement("label",{className:"col-4 col-form-label"},"Room name"),A.a.createElement("div",{className:"col-8"},A.a.createElement("input",{name:"roomId",type:"text",className:"form-control",onChange:this.handleInputChange}))),A.a.createElement("div",{className:"form-group row"},A.a.createElement("div",{className:"col"},A.a.createElement("button",{type:"button",className:"rounded-pill btn btn-outline-dark btn-block",onClick:this.onPressCreate},"Create")),A.a.createElement("div",{className:"col"},A.a.createElement("button",{type:"button",className:"rounded-pill btn btn-outline-dark btn-block",onClick:this.onPressJoin},"Join"))))))),A.a.createElement("div",{className:"col-md-6 p-0 bg-split-ui-dark full-height"})),this.state.playerList.length&&A.a.createElement(d,{gameChannel:this.lobbyChannel,playerMap:this.state.playerMap,playerList:this.state.playerList,myUuid:this.uuid,isRoomCreator:this.state.isRoomCreator,words:this.words}))}}]),E}(t.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));E(30),R.a.render(A.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.0b4eb75d.chunk.js.map