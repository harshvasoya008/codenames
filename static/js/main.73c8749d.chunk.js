(this["webpackJsonpreact-codenames"]=this["webpackJsonpreact-codenames"]||[]).push([[0],{13:function(E,e,A){E.exports=A(36)},18:function(E,e,A){},28:function(E,e,A){},29:function(E,e,A){},30:function(E,e,A){},31:function(E,e,A){"use strict";A.r(e);var t=A(12);window.Ably=new t.Realtime("3tgmIg.8CP_lQ:ozjSCWBHfR578D7j")},36:function(E,e,A){"use strict";A.r(e);var t=A(0),R=A.n(t),O=A(10),a=A.n(O),T=(A(18),A(1)),n=A(3),I=A(5),S=A(4),N=A(11),L=A.n(N),C=A(2),r=A.n(C),s=A(7),o=(A(28),function(E){var e="word-card";if(E.data.isChosen||E.isSpyMaster)switch(E.data.type){case"RED_AGENT":e+=" red-card";break;case"BLUE_AGENT":e+=" blue-card";break;case"TAN_BYSTANDER":e+=" tan-card";break;case"BLACK_ASSASSIN":e+=" black-card"}return R.a.createElement("button",{className:"".concat(e),onClick:E.onClick},E.data.word)}),l=(A(29),function(E){Object(I.a)(A,E);var e=Object(S.a)(A);function A(E){var t;return Object(T.a)(this,A),(t=e.call(this,E)).createBoard=t.createBoard.bind(Object(s.a)(t)),t}return Object(n.a)(A,[{key:"createBoard",value:function(E,e){for(var A=[],t=0,O=0;O<E;O+=1){for(var a=[],T=0;T<e;T+=1)a.push(this.renderCard(t++));A.push(R.a.createElement("div",{key:O,className:"board-row"},a))}return A}},{key:"renderCard",value:function(E){var e=this;return R.a.createElement(o,{key:E,data:this.props.cards[E],isSpyMaster:this.props.isSpyMaster,onClick:function(){return e.props.onClick(E)}})}},{key:"render",value:function(){return R.a.createElement("div",{className:"board"},this.createBoard(5,5))}}]),A}(t.Component)),i=function E(){Object(T.a)(this,E)};i.publish=function(E){var e=Ably.channels.get(E);e.publish(arguments.length<=1?void 0:arguments[1],arguments.length<=2?void 0:arguments[2],arguments.length<=3?void 0:arguments[3])},i.subscribe=function(E){var e=Ably.channels.get(E);e.subscribe(arguments.length<=1?void 0:arguments[1])};var c=function(E){E&&console.log("Unable to publish message; err = "+E.message)},P=function(E){Object(I.a)(A,E);var e=Object(S.a)(A);function A(E){var t;return Object(T.a)(this,A),(t=e.call(this,E)).createBoard=function(){var E=t.categorizeWords(t.props.words);i.publish(t.props.gameChannel,"event_new_board",{board:E},c)},t.categorizeWords=function(E){for(var e=0===Math.floor(Math.random()+.5)?9:8,A=[],t=0;t<E.length;t+=1){var R={word:E[t]};R.type=t<e?"RED_AGENT":t<17?"BLUE_AGENT":t<24?"TAN_BYSTANDER":"BLACK_ASSASSIN",A.push(R)}return{words:r.a.shuffle(A),redCount:e,blueCount:17-e,turn:9===e?"Red":"Blue"}},t.state={board:[],teamRed:[],teamBlue:[],turn:"Nobody",isGameOver:!1},t.myTeam=E.playerMap[E.myUuid].team,t.redCount=0,t.blueCount=0,t.winner=null,t}return Object(n.a)(A,[{key:"componentDidMount",value:function(){this.prepareTeams(),this.subscribeToChannel(),this.props.isRoomCreator&&this.createBoard()}},{key:"prepareTeams",value:function(){var E=this,e=r.a.filter(Object.keys(this.props.playerMap),(function(e){return"Red"===E.props.playerMap[e].team})),A=r.a.filter(Object.keys(this.props.playerMap),(function(e){return"Blue"===E.props.playerMap[e].team}));this.setState({teamRed:e,teamBlue:A,isSpyMaster:this.props.myUuid===e[0]||this.props.myUuid===A[0]})}},{key:"subscribeToChannel",value:function(){var E=this;i.subscribe(this.props.gameChannel,(function(e){var A=e.name,t=e.data;if("event_new_board"===A)E.redCount=t.board.redCount,E.blueCount=t.board.blueCount,E.setState({board:t.board.words,turn:t.board.turn});else if("event_card_click"===A){E.redCount=t.redCount,E.blueCount=t.blueCount;var R=E.state.board;"BLACK_ASSASSIN"===R[t.index].type?E.blackCardClicked():(R[t.index].isChosen=!0,E.setState({board:R,turn:t.turn}),E.checkForWinner())}else"event_turn_pass"===A&&E.setState({turn:t.turn})}))}},{key:"handleCardClick",value:function(E){var e=this.state.board,A=this.state.turn;if(!e[E].isChosen&&A===this.myTeam&&!this.state.isSpyMaster){e[E].isChosen=!0,this.setState({board:e});var t=A;switch(e[E].type){case"RED_AGENT":this.redCount-=1,t="Red";break;case"BLUE_AGENT":this.blueCount-=1,t="Blue";break;case"TAN_BYSTANDER":t="Red"===A?"Blue":"Red";break;case"BLACK_ASSASSIN":t="Nobody",this.blackCardClicked()}this.setState({turn:t}),i.publish(this.props.gameChannel,"event_card_click",{index:E,turn:t,redCount:this.redCount,blueCount:this.blueCount},c),this.checkForWinner()}}},{key:"blackCardClicked",value:function(){var E=this.state.turn;"Red"===E?this.winner="Blue":"Blue"===E&&(this.winner="Red"),this.declareWinner()}},{key:"checkForWinner",value:function(){0===this.redCount?(this.winner="Red",this.declareWinner()):0===this.blueCount&&(this.winner="Blue",this.declareWinner())}},{key:"declareWinner",value:function(){for(var E=this.state.board,e=0;e<E.length;e++)E[e].isChosen=!0;this.setState({board:E,isGameOver:!0})}},{key:"endTurn",value:function(){var E="Red"===this.state.turn?"Blue":"Red";this.setState({turn:E}),i.publish(this.props.gameChannel,"event_turn_pass",{turn:E},c)}},{key:"render",value:function(){var E=this;return R.a.createElement("div",null,R.a.createElement("div",{className:"team-map"},R.a.createElement("div",null,R.a.createElement("span",null,"Team Red: "),R.a.createElement("span",null,this.state.teamRed.map((function(e){return E.props.playerMap[e].name})).join(","))),R.a.createElement("div",null,R.a.createElement("span",null,"Team Blue: "),R.a.createElement("span",null,this.state.teamBlue.map((function(e){return E.props.playerMap[e].name})).join(","))),R.a.createElement("div",null,R.a.createElement("div",null,"Cards remaining (Red-Blue): ",this.redCount,"-",this.blueCount),this.state.isGameOver?R.a.createElement("div",null,this.winner," won!"):R.a.createElement("div",null,this.state.turn,"'s turn",R.a.createElement("button",{disabled:this.state.turn!==this.myTeam,onClick:function(){return E.endTurn()}},"End Turn")))),25===this.state.board.length&&R.a.createElement("div",{className:"game"},R.a.createElement("div",null,R.a.createElement(l,{cards:this.state.board,isSpyMaster:this.state.isSpyMaster,onClick:function(e){return E.handleCardClick(e)}}))))}}]),A}(t.Component),u=["ACE","ACNE","ACRE","ADDENDUM","ADVERTISE","AFRICA","AGENT","AIR","AIRCRAFT","AISLE","ALASKA","ALIEN","ALLIGATOR","ALPHABETIZE","ALPS","AMAZON","AMBULANCE","AMERICA","ANCHOR","ANGEL","ANKLE","ANT","ANTARCTICA","ANTHEM","APATHY","APPLAUSE","APPLE","APPLESAUC","APPLICATION","APRON","ARCHAEOLOGIST","ARISTOCRAT","ARM","ARMADA","ARMOR","ARMY","ASH","ASLEEP","ASTRONAUT","ATHLETE","ATLANTIS","ATTIC","AUNT","AUSTRALIA","AVALANCHE","AVOCADO","AXE","AZTEC","BABY","BABY-SITTER","BACK","BACKBONE","BACON","BAG","BAGUETTE","BALD","BALL","BALLOON","BANANA","BAND","BANISTER","BANK","BAR","BARBECUE","BARK","BASEBALL","BASEBOARDS","BASKETBALL","BASS","BAT","BATH","BATTERY","BATTLE","BATTLESHIP","BAY","BEACH","BEAM","BEAN","BEANSTALK","BEAR","BEARD","BEAT","BED","BEDBUG","BEE","BEER","BEETHOVEN","BEIJING","BELL","BELT","BENCH","BERLIN","BERMUDA","BERRY","BIB","BICYCLE","BIG","BIG BANG","BIG BEN","BIKE","BILL","BILLBOARD","BIRD","BIRTHDAY","BISCUIT","BITE","BLACKSMITH","BLADE","BLANKET","BLEACH","BLIMP","BLIND","BLIZZARD","BLOCK","BLOSSOM","BLUEPRINT","BLUES","BLUNT","BLUR","BOA","BOARD","BOAT","BOB","BOBSLED","BODY","BOIL","BOLT","BOMB","BOND","BONNET","BONSAI","BOOK","BOOM","BOOT","BOOTH","BOSS","BOTTLE","BOW","BOWL","BOWLER","BOWTIE","BOX","BOXER","BOY","BRAIN","BRAINSTORM","BRAND","BRASS","BRAVE","BRAZIL","BREAD","BREAK","BRICK","BRIDE","BRIDGE","BROCCOLI","BROKEN","BROOM","BROTHER","BRUISE","BRUNETTE","BRUSH","BUBBLE","BUCK","BUCKET","BUDDY","BUFFALO","BUG","BUGLE","BULB","BUNK","BUNNY","BUS","BUTTER","BUTTERFLY","BUTTON","BUY","CABIN","CABLE","CAESAR","CAFETERIA","CAKE","CALCULATOR","CALF","CAMP","CAMPSITE","CAN","CANADA","CANDLE","CANDY","CANE","CAP","CAPE","CAPITAL","CAPITALISM","CAPTAIN","CAR","CARD","CARDBOARD","CARROT","CARTOGRAPHY","CASINO","CAST","CASTLE","CAT","CAVE","CD","CEILING","CELL","CENTAUR","CENTER","CENTURY","CHAIN","CHAIR","CHALK","CHAMPION","CHANGE","CHARGE","CHARGER","CHECK","CHEERLEADER","CHEESE","CHEF","CHERRY","CHESS","CHEST","CHEW","CHICK","CHICKEN","CHIME","CHINA","CHIP","CHOCOLATE","CHRISTMAS","CHURCH","CIRCLE","CIRCUS","CLAY","CLEOPATRA","CLIFF","CLOAK","CLOCK","CLOCKWORK","CLOUD","CLOWN","CLUB","CLUE","COACH","COAL","COAST","COASTER","CODE","COFFEE","COG","COLD","COLLAR","COLLEGE","COLUMBUS","COMB","COMET","COMFORT","COMIC","COMPOUND","COMPUTER","CONCERT","CONDUCTOR","CONE","CONSTRICTOR","CONTINUUM","CONTRACT","CONVERSATION","COOK","COOP","COPPER","CORD","CORDUROY","COT","COTTON","COUGH","COUNTRY","COURT","COVER","COW","COWBOY","CRAB","CRAFT","CRANE","CRASH","CRAYON","CREAM","CRICKET","CRISP","CRITICIZE","CROSS","CROW","CROWN","CRUISE","CRUMB","CRUSADER","CRUST","CRYSTAL","CUCKOO","CUFF","CURRY","CURTAIN","CUTICLE","CYCLE","CZAR","CZECH","DAD","DANCE","DART","DASH","DATE","DAWN","DAY","DEATH","DECK","DEEP","DEFECT","DEGREE","DELTA","DENT","DENTIST","DESK","DIAMOND","DICE","DICTIONARY","DIMPLE","DINOSAUR","DIRECTOR","DIRTY","DISEASE","DISK","DISMANTLE","DITCH","DIVER","DOCTOR","DOG","DOGHOUSE","DOLL","DOLLAR","DOMINOES","DOOR","DOT","DRAFT","DRAGON","DRAIN","DRAW","DRAWING","DREAM","DRESS","DRESSING","DRILL","DRINK","DRIP","DRIVER","DRONE","DROP","DRUM","DRUMS","DRYER","DUCK","DUMP","DUNK","DUST","DWARF","EAGLE","EAR","EARTH","EARTHQUAKE","EASTER","EAT","EBONY","EDEN","EGG","EGYPT","EINSTEIN","ELBOW","ELECTRICITY","ELEPHANT","ELEVATOR","ELF","ELM","EMBASSY","ENGINE","ENGLAND","ERGONOMIC","ESCALATOR","EUREKA","EUROPE","EVOLUTION","EXTENSION","EYE","EYEBROW","FACE","FAIR","FALL","FAN","FANCY","FARM","FAST","FEAST","FENCE","FEUDALISM","FEVER","FIDDLE","FIELD","FIGHTER","FIGMENT","FIGURE","FILE","FILM","FINGER","FIRE","FIRST","FISH","FISHING","FIX","FIZZ","FLAG","FLAGPOLE","FLANNEL","FLASHLIGHT","FLAT","FLOCK","FLOOD","FLOOR","FLOTSAM","FLOWER","FLU","FLUSH","FLUTE","FLUTTER","FLY","FOAM","FOG","FOIL","FOOT","FOOTBALL","FORCE","FOREHEAD","FOREST","FOREVER","FORK","FORTNIGHT","FRANCE","FRECKLE","FREIGHT","FRINGE","FROG","FROST","FROWN","FUEL","GALLOP","GAME","GANGSTER","GARBAGE","GARDEN","GAS","GASOLINE","GEAR","GEM","GENIE","GENIUS","GERMANY","GHOST","GIANT","GINGER","GINGERBREAD","GIRL","GLACIER","GLASS","GLASSES","GLOVE","GOAT","GOBLIN","GOLD","GOLDILOCKS","GOLF","GOODBYE","GOVERNOR","GRACE","GRANDPA","GRAPE","GRASS","GRATITUDE","GRAY","GREECE","GREEN","GREENHOUSE","GROOM","GROUND","GUITAR","GUM","GUMBALL","GYMNAST","HAIR","HALF","HALLOWEEN","HAM","HAMBURGER","HAMMER","HAND","HANDLE","HANDWRITING","HANG","HAPPY","HAT","HATCH","HAWAII","HAWK","HEAD","HEADACHE","HEART","HEDGE","HELICOPTER","HELMET","HEM","HERCULES","HIDE","HILL","HIMALAYAS","HIT","HOCKEY","HOLE","HOLLYWOOD","HOMER","HOMEWORK","HONEY","HONK","HOOD","HOOK","HOPSCOTCH","HORN","HORSE","HORSESHOE","HOSE","HOSPITAL","HOT","HOTEL","HOUSE","HOUSEBOAT","HUG","HUMIDIFIER","HUNGRY","HURDLE","HURT","HUT","ICE","ICE AGE","ICE CREAM","ICELAND","IGLOO","IMPLODE","INDIA","INK","INN","INQUISITION","INTERN","INTERNET","INVITATION","IRON","IRONIC","IVORY","IVY","JACK","JADE","JAIL","JAM","JAPAN","JEANS","JELLY","JELLYFISH","JET","JEWELER","JIG","JOAN OF ARC","JOCKEY","JOG","JOKER","JOURNAL","JUDGE","JUMP","JUMPER","JUPITER","KANGAROO","KETCHUP","KEY","KICK","KID","KILLER","KILOGRAM","KILT","KING","KING ARTHUR","KISS","KITCHEN","KITE","KIWI","KNEE","KNEEL","KNIFE","KNIGHT","KNOT","KOALA","KUNG FU","LAB","LACE","LADDER","LADYBUG","LAG","LANDFILL","LAP","LASER","LAUGH","LAUNDRY","LAW","LAWN","LAWNMOWER","LAWYER","LEAD","LEAF","LEAK","LEATHER","LEG","LEMON","LEMONADE","LEPRECHAUN","LETTER","LEVEL","LIFE","LIFESTYLE","LIGAMENT","LIGHT","LIGHTNING","LIGHTSABER","LIME","LIMOUSINE","LINE","LINK","LION","LIP","LITTER","LIZARD","LOCH NESS","LOCK","LOCUST","LOG","LOITERER","LOLLIPOP","LONDON","LOVE","LOVESEAT","LOYALTY","LUCK","LUMBERJACK","LUNCH","LUNCHBOX","LYRICS","MACHINE","MACHO","MAGAZINE","MAGICIAN","MAIL","MAILBOX","MAKEUP","MAMMOTH","MANICURE","MAP","MAPLE","MARACAS","MARATHON","MARBLE","MARCH","MARK","MARS","MASCOT","MASS","MAST","MATCH","MATCHSTICK","MATE","MATTRESS","MEDIC","MEMORY","MERCURY","MESS","METER","MEXICO","MICROSCOPE","MICROWAVE","MIDSUMMER","MILE","MILK","MILL","MILLIONAIRE","MINE","MINOTAUR","MINT","MINUTE","MIRROR","MISS","MISSILE","MISTAKE","MODEL","MODERN","MOHAWK","MOLD","MOLE","MOM","MONA LISA","MONDAY","MONEY","MONITOR","MONKEY","MONSTER","MOOCH","MOON","MOP","MOSCOW","MOSES","MOSQUITO","MOTH","MOTHER","MOTORCYCLE","MOUNT","MOUNTAIN","MOUNTIE","MOUSE","MOUTH","MOWER","MUD","MUG","MUMMY","MUSIC","MUSKETEER","MUSTARD","MUTE","NAIL","NAPOLEON","NATURE","NEEDLE","NEGOTIATE","NEIGHBOR","NERVE","NEST","NET","NEUTRON","NEW YORK","NEWTON","NIECE","NIGHT","NIGHTMARE","NINJA","NOAH","NOSE","NOTE","NOTRE DAME","NOVEL","NURSE","NUT","NYLON","OAR","OASIS","OBSERVATORY","OCTOPUS","OFFICE","OIL","OLD","OLIVE","OLYMPIAN","OLYMPUS","ONION","OPAQUE","OPENER","OPERA","ORANGE","ORBIT","ORGAN","ORGANIZE","OUTER","OUTSIDE","OVATION","OVERTURE","PACIFIC","PAD","PADDLE","PAGE","PAIL","PAINT","PAJAMAS","PALACE","PALM","PAN","PANTS","PAPER","PARACHUTE","PARADE","PARK","PARODY","PARROT","PART","PARTY","PASS","PASSWORD","PASTE","PASTRY","PATIENT","PAWN","PEA","PEACH","PEANUT","PEAR","PEARL","PEN","PENCIL","PENDULUM","PENGUIN","PENNY","PENTAGON","PEPPER","PERSONAL","PEW","PHILOSOPHER","PHOENIX","PHONE","PHOTOGRAPH","PIANO","PICNIC","PIE","PIG","PIGPEN","PILLOW","PILOT","PIN","PINCH","PINE","PING","PINWHEEL","PIPE","PIRATE","PISTOL","PIT","PITCH","PITCHER","PIZZA","PLAID","PLAN","PLANE","PLANK","PLASTIC","PLATE","PLATYPUS","PLAY","PLAYGROUND","PLOT","PLOW","PLUMBER","POCKET","POEM","POINT","POISON","POLE","POLICE","POLISH","POLO","POMP","PONG","POOL","POP","POPCORN","POPSICLE","POPULATION","PORT","PORTFOLIO","POSITIVE","POST","POTATO","POTTER","POUND","POWDER","PRESS","PRINCESS","PROCRASTINATE","PROTESTANT","PSYCHOLOGIST","PUBLISHER","PUMPKIN","PUNK","PUPIL","PUPPET","PUPPY","PURSE","PUSH","PUZZLE","PYRAMID","QUACK","QUARANTINE","QUARTER","QUEEN","QUICKSAND","QUIET","RABBIT","RACE","RACKET","RADIO","RAFT","RAG","RAIL","RAINBOW","RAINWATER","RAM","RANCH","RANDOM","RAT","RAY","RAZOR","RECORD","RECYCLE","RED","REGRET","REIMBURSEMENT","REINDEER","RETALIATE","REVOLUTION","RIB","RICE","RIDDLE","RIFLE","RIM","RING","RINK","RIP","RIVER","ROAD","ROBIN","ROBOT","ROCK","RODEO","ROLL","ROLLER","ROME","ROOM","ROOT","ROPE","ROSE","ROULETTE","ROUND","ROUNDABOUT","ROW","RUBBER","RULER","RUNG","RUNT","RUSSIA","RUST","RUT","SACK","SAD","SADDLE","SAFE","SAHARA","SAIL","SALAD","SALMON","SALOON","SALSA","SALT","SAND","SANDBOX","SANDCASTLE","SANDWICH","SANTA","SASH","SATELLITE","SATURN","SAW","SCALE","SCAR","SCARECROW","SCARED","SCHOOL","SCIENTIST","SCORPION","SCOUNDREL","SCRAMBLE","SCRATCH","SCREEN","SCROLL","SCUBA DIVER","SCUFF","SEAL","SEASHELL","SEASON","SECOND","SENTENCE","SEQUINS","SERVER","SET","SHADOW","SHAFT","SHAKESPEARE","SHALLOW","SHAMPOO","SHARK","SHED","SHEEP","SHEET","SHEETS","SHELL","SHERIFF","SHERLOCK","SHERWOOD","SHIP","SHIPWRECK","SHIRT","SHOE","SHOELACE","SHOOT","SHOP","SHORT","SHORTS","SHOT","SHOULDER","SHOWER","SHRINK","SICK","SIESTA","SIGN","SILHOUETTE","SILK","SINGER","SINK","SIP","SISTER","SKATE","SKATES","SKATING","SKI","SKULL","SKYSCRAPER","SLAM","SLED","SLEEP","SLING","SLIP","SLIPPER","SLOTH","SLOW","SLUG","SLUMP","SMELL","SMITH","SMOKE","SMOOTHIE","SMUGGLER","SNAKE","SNAP","SNEEZE","SNOW","SNOWMAN","SNUGGLE","SOAP","SOCK","SOLDIER","SONG","SOUL","SOUND","SOUP","SPACE","SPARE","SPEAKERS","SPELL","SPHINX","SPIDER","SPIKE","SPINE","SPIRIT","SPIT","SPONGE","SPOOL","SPOON","SPOT","SPRAY","SPRING","SPRINKLER","SPURS","SPY","SQUARE","SQUASH","SQUINT","SQUIRREL","ST.PATRICK","STABLE","STADIUM","STAFF","STAIRS","STAMP","STANDING","STAR","STATE","STEAM","STEEL","STEP","STETHOSCOPE","STICK","STICKER","STOCK","STOCKHOLDER","STOPLIGHT","STORM","STORY","STOUT","STOVE","STOWAWAY","STRAW","STREAM","STREAMLINE","STREET","STRIKE","STRING","STRIPE","STUDENT","SUB","SUGAR","SUIT","SUMO","SUN","SUNBURN","SUPERHERO","SUSHI","SWAMP","SWARM","SWEAT","SWEATER","SWIMMING","SWING","SWITCH","SWORD","TABLE","TABLET","TACHOMETER","TAG","TAIL","TALK","TANK","TAP","TASTE","TATTOO","TAXI","TEA","TEACHER","TEAM","TEAPOT","TEAR","TEENAGER","TELEPHONE","TELESCOPE","TELEVISION","TEMPLE","TEN","TENNIS","TEXAS","THEATER","THIEF","THINK","THRONE","THROUGH","THUMB","THUNDER","TICK","TIDE","TIE","TIGER","TIME","TIN","TINTING","TIP","TIPI","TIPTOE","TIPTOP","TIRED","TISSUE","TOAST","TOILET","TOKYO","TOOL","TOOTH","TOOTHBRUSH","TORCH","TORNADO","TOURNAMENT","TOWER","TRACK","TRACTOR","TRAIN","TRASH","TREASURE","TREE","TRIANGLE","TRICK","TRIP","TROLL","TRUCK","TRUNK","TUB","TUBA","TUBE","TUNNEL","TURKEY","TURTLE","TUTOR","TUTU","TUXEDO","TWANG","TWIG","TWITTERPATED","TYPE","UNDERTAKER","UNEMPLOYED","UNICORN","UNIVERSITY","UPGRADE","VACUUM","VALENTINE","VAMPIRE","VAN","VENUS","VEST","VET","VIKING","VIOLET","VIRUS","VISION","VOLCANO","VOLUME","WAG","WAGON","WAITRESS","WAKE","WALL","WALRUS","WAR","WASHER","WASHINGTON","WATCH","WATER","WATERMELON","WAVE","WAX","WEB","WEDDING","WEED","WELDER","WELL","WEREWOLF","WHALE","WHATEVER","WHEEL","WHEELCHAIR","WHIP","WHIPLASH","WHISK","WHISTLE","WHITE","WIG","WILL","WIND","WINDMILL","WINDOW","WING","WINTER","WISH","WITCH","WIZARD","WOLF","WONDERLAND","WOOD","WOOL","WORLD","WORM","WRISTWATCH","YARD","YARDSTICK","YELLOWSTONE","ZAMBONI","ZEN","ZERO","ZIPPER","ZOMBIE","ZONE","ZOO"],U=(A(30),function(E){Object(I.a)(A,E);var e=Object(S.a)(A);function A(E){var t;return Object(T.a)(this,A),(t=e.call(this,E)).subscribeToChannel=function(E){null!=E&&i.subscribe(E,(function(E){var e=E.name,A=E.data;"event_join"===e&&t.state.isRoomCreator?(console.log(A.name+" joined"),t.setState({count:t.state.count+1}),t.players.push({uuid:A.uuid,name:A.name})):"event_start"===e&&(t.playerMap=A.teams,t.setState({isPlaying:!0}))}))},t.onPressCreate=function(){t.state.roomId&&t.state.name?(t.lobbyChannel="codenames:::"+t.state.roomId,t.setState({isDisabled:!0,isRoomCreator:!0}),t.subscribeToChannel(t.lobbyChannel),t.words=r.a.shuffle(u).slice(0,25)):alert("Nickname and Room fields cannot be empty")},t.onPressJoin=function(){t.state.roomId&&t.state.name?(t.lobbyChannel="codenames:::"+t.state.roomId,i.publish(t.lobbyChannel,"event_join",{uuid:t.uuid,name:t.state.name},c),t.subscribeToChannel(t.lobbyChannel)):alert("Nickname and Room fields cannot be empty")},t.onPressStartGame=function(){t.players.push({uuid:t.uuid,name:t.state.name});var E={},e=!0;r.a.shuffle(t.players).forEach((function(A){A.team=e?"Red":"Blue",E[A.uuid]=A,e=!e})),i.publish(t.lobbyChannel,"event_start",{teams:E},c)},t.handleNicknameInputChange=function(E){t.setState({name:E.target.value})},t.handleRoomIdInputChange=function(E){t.setState({roomId:E.target.value})},t.uuid=L.a.generate().substring(0,6),t.state={isPlaying:!1,isDisabled:!1,isRoomCreator:!1,count:1},t.lobbyChannel=null,t.words=[],t.players=[],t.playerMap=null,t}return Object(n.a)(A,[{key:"render",value:function(){return R.a.createElement("div",null,!this.state.isPlaying&&R.a.createElement("div",{class:"d-md-flex h-md-100 align-items-center"},R.a.createElement("div",{className:"heading heading-left bg-primary-color"},R.a.createElement("i",{class:"fas fa-code"}),R.a.createElement("h1",null,"code")),R.a.createElement("div",{className:"heading heading-right"},R.a.createElement("h1",null,"names")),R.a.createElement("div",{class:"col-md-6 p-0 h-md-100 align-items-center",style:{background:"#ebeeef"}},R.a.createElement("div",{className:"d-md-flex p-5"},R.a.createElement("div",{className:"login-box shadow"},R.a.createElement("div",{className:"login-box-title"},R.a.createElement("span",null,"Welcome!")),R.a.createElement("form",{className:"mt-3 p-4"},R.a.createElement("div",{class:"form-group row"},R.a.createElement("label",{for:"inputNickname",class:"col-4 col-form-label"},"Nickname"),R.a.createElement("div",{class:"col-8"},R.a.createElement("input",{type:"text",class:"form-control",id:"inputNickname"}))),R.a.createElement("div",{class:"form-group row"},R.a.createElement("label",{for:"inputRoomId",class:"col-4 col-form-label"},"Room name"),R.a.createElement("div",{class:"col-8"},R.a.createElement("input",{type:"text",class:"form-control",id:"inputRoomId"}))),R.a.createElement("div",{class:"form-group row"},R.a.createElement("div",{class:"col"},R.a.createElement("button",{type:"submit",class:"rounded-pill btn btn-outline-dark btn-block"},"Create")),R.a.createElement("div",{class:"col"},R.a.createElement("button",{type:"submit",class:"rounded-pill btn btn-outline-dark btn-block"},"Join"))),this.state.isRoomCreator&&this.state.count>=4&&R.a.createElement("div",{class:"form-group row"},R.a.createElement("div",{class:"col"},R.a.createElement("button",{type:"submit",class:"rounded-pill btn btn-outline-success btn-block"},"Start Game!"))))))),R.a.createElement("div",{class:"col-md-6 p-0 bg-primary-color h-md-100"})),this.state.isPlaying&&R.a.createElement(P,{gameChannel:this.lobbyChannel,playerMap:this.playerMap,myUuid:this.uuid,isRoomCreator:this.state.isRoomCreator,words:this.words}))}}]),A}(t.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));A(31),a.a.render(R.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(E){E.unregister()})).catch((function(E){console.error(E.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.73c8749d.chunk.js.map