(this["webpackJsonpreact-codenames"]=this["webpackJsonpreact-codenames"]||[]).push([[0],{14:function(e,E,t){e.exports=t(37)},19:function(e,E,t){},29:function(e,E,t){},30:function(e,E,t){},31:function(e,E,t){},32:function(e,E,t){"use strict";t.r(E);var A=t(13);window.Ably=new A.Realtime("3tgmIg.8CP_lQ:ozjSCWBHfR578D7j")},37:function(e,E,t){"use strict";t.r(E);var A=t(0),a=t.n(A),R=t(10),O=t.n(R),n=(t(19),t(11)),T=t(2),I=t(4),S=t(1),N=t(6),r=t(5),C=t(12),L=t.n(C),s=t(3),l=t.n(s),o=(t(29),function(e){var E="word-card";if(e.data.isChosen||e.isSpyMaster)switch(e.data.type){case"RED_AGENT":E+=" red-card";break;case"BLUE_AGENT":E+=" blue-card";break;case"TAN_BYSTANDER":E+=" tan-card";break;case"BLACK_ASSASSIN":E+=" black-card"}return a.a.createElement("button",{className:"".concat(E),onClick:e.onClick},e.data.word)}),i=(t(30),function(e){Object(N.a)(t,e);var E=Object(r.a)(t);function t(e){var A;return Object(T.a)(this,t),(A=E.call(this,e)).createBoard=A.createBoard.bind(Object(S.a)(A)),A}return Object(I.a)(t,[{key:"createBoard",value:function(e,E){for(var t=[],A=0,R=0;R<e;R+=1){for(var O=[],n=0;n<E;n+=1)O.push(this.renderCard(A++));t.push(a.a.createElement("div",{key:R,className:"board-row"},O))}return t}},{key:"renderCard",value:function(e){var E=this;return a.a.createElement(o,{key:e,data:this.props.cards[e],isSpyMaster:this.props.isSpyMaster,onClick:function(){return E.props.onClick(e)}})}},{key:"render",value:function(){return a.a.createElement("div",{className:"board"},this.createBoard(5,5))}}]),t}(A.Component)),c=function e(){Object(T.a)(this,e)};c.publish=function(e){var E=Ably.channels.get(e);E.publish(arguments.length<=1?void 0:arguments[1],arguments.length<=2?void 0:arguments[2],arguments.length<=3?void 0:arguments[3])},c.subscribe=function(e){var E=Ably.channels.get(e);E.subscribe(arguments.length<=1?void 0:arguments[1])};var P=function(e){e&&console.log("Unable to publish message; err = "+e.message)},u=function(e){Object(N.a)(t,e);var E=Object(r.a)(t);function t(e){var A;return Object(T.a)(this,t),(A=E.call(this,e)).createBoard=function(){var e=A.categorizeWords(A.props.words);c.publish(A.props.gameChannel,"event_new_board",{board:e},P)},A.categorizeWords=function(e){for(var E=0===Math.floor(Math.random()+.5)?9:8,t=[],A=0;A<e.length;A+=1){var a={word:e[A]};a.type=A<E?"RED_AGENT":A<17?"BLUE_AGENT":A<24?"TAN_BYSTANDER":"BLACK_ASSASSIN",t.push(a)}return{words:l.a.shuffle(t),redCount:E,blueCount:17-E,turn:9===E?"Red":"Blue"}},A.state={board:[],teamRed:[],teamBlue:[],turn:"Nobody",isGameOver:!1},A.myTeam=e.playerMap[e.myUuid].team,A.redCount=0,A.blueCount=0,A.winner=null,A}return Object(I.a)(t,[{key:"componentDidMount",value:function(){this.prepareTeams(),this.subscribeToChannel(),this.props.isRoomCreator&&this.createBoard()}},{key:"prepareTeams",value:function(){var e=this,E=l.a.filter(Object.keys(this.props.playerMap),(function(E){return"Red"===e.props.playerMap[E].team})),t=l.a.filter(Object.keys(this.props.playerMap),(function(E){return"Blue"===e.props.playerMap[E].team}));this.setState({teamRed:E,teamBlue:t,isSpyMaster:this.props.myUuid===E[0]||this.props.myUuid===t[0]})}},{key:"subscribeToChannel",value:function(){var e=this;c.subscribe(this.props.gameChannel,(function(E){var t=E.name,A=E.data;if("event_new_board"===t)e.redCount=A.board.redCount,e.blueCount=A.board.blueCount,e.setState({board:A.board.words,turn:A.board.turn});else if("event_card_click"===t){e.redCount=A.redCount,e.blueCount=A.blueCount;var a=e.state.board;"BLACK_ASSASSIN"===a[A.index].type?e.blackCardClicked():(a[A.index].isChosen=!0,e.setState({board:a,turn:A.turn}),e.checkForWinner())}else"event_turn_pass"===t&&e.setState({turn:A.turn})}))}},{key:"handleCardClick",value:function(e){var E=this.state.board,t=this.state.turn;if(!E[e].isChosen&&t===this.myTeam&&!this.state.isSpyMaster){E[e].isChosen=!0,this.setState({board:E});var A=t;switch(E[e].type){case"RED_AGENT":this.redCount-=1,A="Red";break;case"BLUE_AGENT":this.blueCount-=1,A="Blue";break;case"TAN_BYSTANDER":A="Red"===t?"Blue":"Red";break;case"BLACK_ASSASSIN":A="Nobody",this.blackCardClicked()}this.setState({turn:A}),c.publish(this.props.gameChannel,"event_card_click",{index:e,turn:A,redCount:this.redCount,blueCount:this.blueCount},P),this.checkForWinner()}}},{key:"blackCardClicked",value:function(){var e=this.state.turn;"Red"===e?this.winner="Blue":"Blue"===e&&(this.winner="Red"),this.declareWinner()}},{key:"checkForWinner",value:function(){0===this.redCount?(this.winner="Red",this.declareWinner()):0===this.blueCount&&(this.winner="Blue",this.declareWinner())}},{key:"declareWinner",value:function(){for(var e=this.state.board,E=0;E<e.length;E++)e[E].isChosen=!0;this.setState({board:e,isGameOver:!0})}},{key:"endTurn",value:function(){var e="Red"===this.state.turn?"Blue":"Red";this.setState({turn:e}),c.publish(this.props.gameChannel,"event_turn_pass",{turn:e},P)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("div",{className:"team-map"},a.a.createElement("div",null,a.a.createElement("span",null,"Team Red: "),a.a.createElement("span",null,this.state.teamRed.map((function(E){return e.props.playerMap[E].name})).join(","))),a.a.createElement("div",null,a.a.createElement("span",null,"Team Blue: "),a.a.createElement("span",null,this.state.teamBlue.map((function(E){return e.props.playerMap[E].name})).join(","))),a.a.createElement("div",null,a.a.createElement("div",null,"Cards remaining (Red-Blue): ",this.redCount,"-",this.blueCount),this.state.isGameOver?a.a.createElement("div",null,this.winner," won!"):a.a.createElement("div",null,this.state.turn,"'s turn",a.a.createElement("button",{disabled:this.state.turn!==this.myTeam,onClick:function(){return e.endTurn()}},"End Turn")))),25===this.state.board.length&&a.a.createElement("div",{className:"game"},a.a.createElement("div",null,a.a.createElement(i,{cards:this.state.board,isSpyMaster:this.state.isSpyMaster,onClick:function(E){return e.handleCardClick(E)}}))))}}]),t}(A.Component),U=["ACE","ACNE","ACRE","ADDENDUM","ADVERTISE","AFRICA","AGENT","AIR","AIRCRAFT","AISLE","ALASKA","ALIEN","ALLIGATOR","ALPHABETIZE","ALPS","AMAZON","AMBULANCE","AMERICA","ANCHOR","ANGEL","ANKLE","ANT","ANTARCTICA","ANTHEM","APATHY","APPLAUSE","APPLE","APPLESAUC","APPLICATION","APRON","ARCHAEOLOGIST","ARISTOCRAT","ARM","ARMADA","ARMOR","ARMY","ASH","ASLEEP","ASTRONAUT","ATHLETE","ATLANTIS","ATTIC","AUNT","AUSTRALIA","AVALANCHE","AVOCADO","AXE","AZTEC","BABY","BABY-SITTER","BACK","BACKBONE","BACON","BAG","BAGUETTE","BALD","BALL","BALLOON","BANANA","BAND","BANISTER","BANK","BAR","BARBECUE","BARK","BASEBALL","BASEBOARDS","BASKETBALL","BASS","BAT","BATH","BATTERY","BATTLE","BATTLESHIP","BAY","BEACH","BEAM","BEAN","BEANSTALK","BEAR","BEARD","BEAT","BED","BEDBUG","BEE","BEER","BEETHOVEN","BEIJING","BELL","BELT","BENCH","BERLIN","BERMUDA","BERRY","BIB","BICYCLE","BIG","BIG BANG","BIG BEN","BIKE","BILL","BILLBOARD","BIRD","BIRTHDAY","BISCUIT","BITE","BLACKSMITH","BLADE","BLANKET","BLEACH","BLIMP","BLIND","BLIZZARD","BLOCK","BLOSSOM","BLUEPRINT","BLUES","BLUNT","BLUR","BOA","BOARD","BOAT","BOB","BOBSLED","BODY","BOIL","BOLT","BOMB","BOND","BONNET","BONSAI","BOOK","BOOM","BOOT","BOOTH","BOSS","BOTTLE","BOW","BOWL","BOWLER","BOWTIE","BOX","BOXER","BOY","BRAIN","BRAINSTORM","BRAND","BRASS","BRAVE","BRAZIL","BREAD","BREAK","BRICK","BRIDE","BRIDGE","BROCCOLI","BROKEN","BROOM","BROTHER","BRUISE","BRUNETTE","BRUSH","BUBBLE","BUCK","BUCKET","BUDDY","BUFFALO","BUG","BUGLE","BULB","BUNK","BUNNY","BUS","BUTTER","BUTTERFLY","BUTTON","BUY","CABIN","CABLE","CAESAR","CAFETERIA","CAKE","CALCULATOR","CALF","CAMP","CAMPSITE","CAN","CANADA","CANDLE","CANDY","CANE","CAP","CAPE","CAPITAL","CAPITALISM","CAPTAIN","CAR","CARD","CARDBOARD","CARROT","CARTOGRAPHY","CASINO","CAST","CASTLE","CAT","CAVE","CD","CEILING","CELL","CENTAUR","CENTER","CENTURY","CHAIN","CHAIR","CHALK","CHAMPION","CHANGE","CHARGE","CHARGER","CHECK","CHEERLEADER","CHEESE","CHEF","CHERRY","CHESS","CHEST","CHEW","CHICK","CHICKEN","CHIME","CHINA","CHIP","CHOCOLATE","CHRISTMAS","CHURCH","CIRCLE","CIRCUS","CLAY","CLEOPATRA","CLIFF","CLOAK","CLOCK","CLOCKWORK","CLOUD","CLOWN","CLUB","CLUE","COACH","COAL","COAST","COASTER","CODE","COFFEE","COG","COLD","COLLAR","COLLEGE","COLUMBUS","COMB","COMET","COMFORT","COMIC","COMPOUND","COMPUTER","CONCERT","CONDUCTOR","CONE","CONSTRICTOR","CONTINUUM","CONTRACT","CONVERSATION","COOK","COOP","COPPER","CORD","CORDUROY","COT","COTTON","COUGH","COUNTRY","COURT","COVER","COW","COWBOY","CRAB","CRAFT","CRANE","CRASH","CRAYON","CREAM","CRICKET","CRISP","CRITICIZE","CROSS","CROW","CROWN","CRUISE","CRUMB","CRUSADER","CRUST","CRYSTAL","CUCKOO","CUFF","CURRY","CURTAIN","CUTICLE","CYCLE","CZAR","CZECH","DAD","DANCE","DART","DASH","DATE","DAWN","DAY","DEATH","DECK","DEEP","DEFECT","DEGREE","DELTA","DENT","DENTIST","DESK","DIAMOND","DICE","DICTIONARY","DIMPLE","DINOSAUR","DIRECTOR","DIRTY","DISEASE","DISK","DISMANTLE","DITCH","DIVER","DOCTOR","DOG","DOGHOUSE","DOLL","DOLLAR","DOMINOES","DOOR","DOT","DRAFT","DRAGON","DRAIN","DRAW","DRAWING","DREAM","DRESS","DRESSING","DRILL","DRINK","DRIP","DRIVER","DRONE","DROP","DRUM","DRUMS","DRYER","DUCK","DUMP","DUNK","DUST","DWARF","EAGLE","EAR","EARTH","EARTHQUAKE","EASTER","EAT","EBONY","EDEN","EGG","EGYPT","EINSTEIN","ELBOW","ELECTRICITY","ELEPHANT","ELEVATOR","ELF","ELM","EMBASSY","ENGINE","ENGLAND","ERGONOMIC","ESCALATOR","EUREKA","EUROPE","EVOLUTION","EXTENSION","EYE","EYEBROW","FACE","FAIR","FALL","FAN","FANCY","FARM","FAST","FEAST","FENCE","FEUDALISM","FEVER","FIDDLE","FIELD","FIGHTER","FIGMENT","FIGURE","FILE","FILM","FINGER","FIRE","FIRST","FISH","FISHING","FIX","FIZZ","FLAG","FLAGPOLE","FLANNEL","FLASHLIGHT","FLAT","FLOCK","FLOOD","FLOOR","FLOTSAM","FLOWER","FLU","FLUSH","FLUTE","FLUTTER","FLY","FOAM","FOG","FOIL","FOOT","FOOTBALL","FORCE","FOREHEAD","FOREST","FOREVER","FORK","FORTNIGHT","FRANCE","FRECKLE","FREIGHT","FRINGE","FROG","FROST","FROWN","FUEL","GALLOP","GAME","GANGSTER","GARBAGE","GARDEN","GAS","GASOLINE","GEAR","GEM","GENIE","GENIUS","GERMANY","GHOST","GIANT","GINGER","GINGERBREAD","GIRL","GLACIER","GLASS","GLASSES","GLOVE","GOAT","GOBLIN","GOLD","GOLDILOCKS","GOLF","GOODBYE","GOVERNOR","GRACE","GRANDPA","GRAPE","GRASS","GRATITUDE","GRAY","GREECE","GREEN","GREENHOUSE","GROOM","GROUND","GUITAR","GUM","GUMBALL","GYMNAST","HAIR","HALF","HALLOWEEN","HAM","HAMBURGER","HAMMER","HAND","HANDLE","HANDWRITING","HANG","HAPPY","HAT","HATCH","HAWAII","HAWK","HEAD","HEADACHE","HEART","HEDGE","HELICOPTER","HELMET","HEM","HERCULES","HIDE","HILL","HIMALAYAS","HIT","HOCKEY","HOLE","HOLLYWOOD","HOMER","HOMEWORK","HONEY","HONK","HOOD","HOOK","HOPSCOTCH","HORN","HORSE","HORSESHOE","HOSE","HOSPITAL","HOT","HOTEL","HOUSE","HOUSEBOAT","HUG","HUMIDIFIER","HUNGRY","HURDLE","HURT","HUT","ICE","ICE AGE","ICE CREAM","ICELAND","IGLOO","IMPLODE","INDIA","INK","INN","INQUISITION","INTERN","INTERNET","INVITATION","IRON","IRONIC","IVORY","IVY","JACK","JADE","JAIL","JAM","JAPAN","JEANS","JELLY","JELLYFISH","JET","JEWELER","JIG","JOAN OF ARC","JOCKEY","JOG","JOKER","JOURNAL","JUDGE","JUMP","JUMPER","JUPITER","KANGAROO","KETCHUP","KEY","KICK","KID","KILLER","KILOGRAM","KILT","KING","KING ARTHUR","KISS","KITCHEN","KITE","KIWI","KNEE","KNEEL","KNIFE","KNIGHT","KNOT","KOALA","KUNG FU","LAB","LACE","LADDER","LADYBUG","LAG","LANDFILL","LAP","LASER","LAUGH","LAUNDRY","LAW","LAWN","LAWNMOWER","LAWYER","LEAD","LEAF","LEAK","LEATHER","LEG","LEMON","LEMONADE","LEPRECHAUN","LETTER","LEVEL","LIFE","LIFESTYLE","LIGAMENT","LIGHT","LIGHTNING","LIGHTSABER","LIME","LIMOUSINE","LINE","LINK","LION","LIP","LITTER","LIZARD","LOCH NESS","LOCK","LOCUST","LOG","LOITERER","LOLLIPOP","LONDON","LOVE","LOVESEAT","LOYALTY","LUCK","LUMBERJACK","LUNCH","LUNCHBOX","LYRICS","MACHINE","MACHO","MAGAZINE","MAGICIAN","MAIL","MAILBOX","MAKEUP","MAMMOTH","MANICURE","MAP","MAPLE","MARACAS","MARATHON","MARBLE","MARCH","MARK","MARS","MASCOT","MASS","MAST","MATCH","MATCHSTICK","MATE","MATTRESS","MEDIC","MEMORY","MERCURY","MESS","METER","MEXICO","MICROSCOPE","MICROWAVE","MIDSUMMER","MILE","MILK","MILL","MILLIONAIRE","MINE","MINOTAUR","MINT","MINUTE","MIRROR","MISS","MISSILE","MISTAKE","MODEL","MODERN","MOHAWK","MOLD","MOLE","MOM","MONA LISA","MONDAY","MONEY","MONITOR","MONKEY","MONSTER","MOOCH","MOON","MOP","MOSCOW","MOSES","MOSQUITO","MOTH","MOTHER","MOTORCYCLE","MOUNT","MOUNTAIN","MOUNTIE","MOUSE","MOUTH","MOWER","MUD","MUG","MUMMY","MUSIC","MUSKETEER","MUSTARD","MUTE","NAIL","NAPOLEON","NATURE","NEEDLE","NEGOTIATE","NEIGHBOR","NERVE","NEST","NET","NEUTRON","NEW YORK","NEWTON","NIECE","NIGHT","NIGHTMARE","NINJA","NOAH","NOSE","NOTE","NOTRE DAME","NOVEL","NURSE","NUT","NYLON","OAR","OASIS","OBSERVATORY","OCTOPUS","OFFICE","OIL","OLD","OLIVE","OLYMPIAN","OLYMPUS","ONION","OPAQUE","OPENER","OPERA","ORANGE","ORBIT","ORGAN","ORGANIZE","OUTER","OUTSIDE","OVATION","OVERTURE","PACIFIC","PAD","PADDLE","PAGE","PAIL","PAINT","PAJAMAS","PALACE","PALM","PAN","PANTS","PAPER","PARACHUTE","PARADE","PARK","PARODY","PARROT","PART","PARTY","PASS","PASSWORD","PASTE","PASTRY","PATIENT","PAWN","PEA","PEACH","PEANUT","PEAR","PEARL","PEN","PENCIL","PENDULUM","PENGUIN","PENNY","PENTAGON","PEPPER","PERSONAL","PEW","PHILOSOPHER","PHOENIX","PHONE","PHOTOGRAPH","PIANO","PICNIC","PIE","PIG","PIGPEN","PILLOW","PILOT","PIN","PINCH","PINE","PING","PINWHEEL","PIPE","PIRATE","PISTOL","PIT","PITCH","PITCHER","PIZZA","PLAID","PLAN","PLANE","PLANK","PLASTIC","PLATE","PLATYPUS","PLAY","PLAYGROUND","PLOT","PLOW","PLUMBER","POCKET","POEM","POINT","POISON","POLE","POLICE","POLISH","POLO","POMP","PONG","POOL","POP","POPCORN","POPSICLE","POPULATION","PORT","PORTFOLIO","POSITIVE","POST","POTATO","POTTER","POUND","POWDER","PRESS","PRINCESS","PROCRASTINATE","PROTESTANT","PSYCHOLOGIST","PUBLISHER","PUMPKIN","PUNK","PUPIL","PUPPET","PUPPY","PURSE","PUSH","PUZZLE","PYRAMID","QUACK","QUARANTINE","QUARTER","QUEEN","QUICKSAND","QUIET","RABBIT","RACE","RACKET","RADIO","RAFT","RAG","RAIL","RAINBOW","RAINWATER","RAM","RANCH","RANDOM","RAT","RAY","RAZOR","RECORD","RECYCLE","RED","REGRET","REIMBURSEMENT","REINDEER","RETALIATE","REVOLUTION","RIB","RICE","RIDDLE","RIFLE","RIM","RING","RINK","RIP","RIVER","ROAD","ROBIN","ROBOT","ROCK","RODEO","ROLL","ROLLER","ROME","ROOM","ROOT","ROPE","ROSE","ROULETTE","ROUND","ROUNDABOUT","ROW","RUBBER","RULER","RUNG","RUNT","RUSSIA","RUST","RUT","SACK","SAD","SADDLE","SAFE","SAHARA","SAIL","SALAD","SALMON","SALOON","SALSA","SALT","SAND","SANDBOX","SANDCASTLE","SANDWICH","SANTA","SASH","SATELLITE","SATURN","SAW","SCALE","SCAR","SCARECROW","SCARED","SCHOOL","SCIENTIST","SCORPION","SCOUNDREL","SCRAMBLE","SCRATCH","SCREEN","SCROLL","SCUBA DIVER","SCUFF","SEAL","SEASHELL","SEASON","SECOND","SENTENCE","SEQUINS","SERVER","SET","SHADOW","SHAFT","SHAKESPEARE","SHALLOW","SHAMPOO","SHARK","SHED","SHEEP","SHEET","SHEETS","SHELL","SHERIFF","SHERLOCK","SHERWOOD","SHIP","SHIPWRECK","SHIRT","SHOE","SHOELACE","SHOOT","SHOP","SHORT","SHORTS","SHOT","SHOULDER","SHOWER","SHRINK","SICK","SIESTA","SIGN","SILHOUETTE","SILK","SINGER","SINK","SIP","SISTER","SKATE","SKATES","SKATING","SKI","SKULL","SKYSCRAPER","SLAM","SLED","SLEEP","SLING","SLIP","SLIPPER","SLOTH","SLOW","SLUG","SLUMP","SMELL","SMITH","SMOKE","SMOOTHIE","SMUGGLER","SNAKE","SNAP","SNEEZE","SNOW","SNOWMAN","SNUGGLE","SOAP","SOCK","SOLDIER","SONG","SOUL","SOUND","SOUP","SPACE","SPARE","SPEAKERS","SPELL","SPHINX","SPIDER","SPIKE","SPINE","SPIRIT","SPIT","SPONGE","SPOOL","SPOON","SPOT","SPRAY","SPRING","SPRINKLER","SPURS","SPY","SQUARE","SQUASH","SQUINT","SQUIRREL","ST.PATRICK","STABLE","STADIUM","STAFF","STAIRS","STAMP","STANDING","STAR","STATE","STEAM","STEEL","STEP","STETHOSCOPE","STICK","STICKER","STOCK","STOCKHOLDER","STOPLIGHT","STORM","STORY","STOUT","STOVE","STOWAWAY","STRAW","STREAM","STREAMLINE","STREET","STRIKE","STRING","STRIPE","STUDENT","SUB","SUGAR","SUIT","SUMO","SUN","SUNBURN","SUPERHERO","SUSHI","SWAMP","SWARM","SWEAT","SWEATER","SWIMMING","SWING","SWITCH","SWORD","TABLE","TABLET","TACHOMETER","TAG","TAIL","TALK","TANK","TAP","TASTE","TATTOO","TAXI","TEA","TEACHER","TEAM","TEAPOT","TEAR","TEENAGER","TELEPHONE","TELESCOPE","TELEVISION","TEMPLE","TEN","TENNIS","TEXAS","THEATER","THIEF","THINK","THRONE","THROUGH","THUMB","THUNDER","TICK","TIDE","TIE","TIGER","TIME","TIN","TINTING","TIP","TIPI","TIPTOE","TIPTOP","TIRED","TISSUE","TOAST","TOILET","TOKYO","TOOL","TOOTH","TOOTHBRUSH","TORCH","TORNADO","TOURNAMENT","TOWER","TRACK","TRACTOR","TRAIN","TRASH","TREASURE","TREE","TRIANGLE","TRICK","TRIP","TROLL","TRUCK","TRUNK","TUB","TUBA","TUBE","TUNNEL","TURKEY","TURTLE","TUTOR","TUTU","TUXEDO","TWANG","TWIG","TWITTERPATED","TYPE","UNDERTAKER","UNEMPLOYED","UNICORN","UNIVERSITY","UPGRADE","VACUUM","VALENTINE","VAMPIRE","VAN","VENUS","VEST","VET","VIKING","VIOLET","VIRUS","VISION","VOLCANO","VOLUME","WAG","WAGON","WAITRESS","WAKE","WALL","WALRUS","WAR","WASHER","WASHINGTON","WATCH","WATER","WATERMELON","WAVE","WAX","WEB","WEDDING","WEED","WELDER","WELL","WEREWOLF","WHALE","WHATEVER","WHEEL","WHEELCHAIR","WHIP","WHIPLASH","WHISK","WHISTLE","WHITE","WIG","WILL","WIND","WINDMILL","WINDOW","WING","WINTER","WISH","WITCH","WIZARD","WOLF","WONDERLAND","WOOD","WOOL","WORLD","WORM","WRISTWATCH","YARD","YARDSTICK","YELLOWSTONE","ZAMBONI","ZEN","ZERO","ZIPPER","ZOMBIE","ZONE","ZOO"],H=(t(31),function(e){Object(N.a)(t,e);var E=Object(r.a)(t);function t(e){var A;return Object(T.a)(this,t),(A=E.call(this,e)).subscribeToChannel=function(e){null!=e&&c.subscribe(e,(function(E){var t=E.name,a=E.data;"event_join"===t&&A.state.isRoomCreator?(console.log(a.name+" joined"),A.setState({count:A.state.count+1}),A.setState((function(e){return{players:e.players.concat(a)}})),c.publish(e,"event_player_list",{playerList:A.state.players},P)):"event_player_list"===t?A.setState({players:a.playerList}):"event_start"===t&&(A.playerMap=a.teams,A.setState({isPlaying:!0}))}))},A.onPressCreate=function(){A.state.roomId&&A.state.name?(A.lobbyChannel="codenames:::"+A.state.roomId,A.setState({isDisabled:!0,isRoomCreator:!0}),A.subscribeToChannel(A.lobbyChannel),A.state.players.push({uuid:A.uuid,name:A.state.name}),A.words=l.a.shuffle(U).slice(0,25),console.log("Room created")):alert("Nickname and Room fields cannot be empty")},A.onPressJoin=function(){A.state.roomId&&A.state.name?(A.lobbyChannel="codenames:::"+A.state.roomId,c.publish(A.lobbyChannel,"event_join",{uuid:A.uuid,name:A.state.name},P),A.subscribeToChannel(A.lobbyChannel)):alert("Nickname and Room fields cannot be empty")},A.onPressStartGame=function(){var e={},E=!0;l.a.shuffle(A.state.players).forEach((function(t){t.team=E?"Red":"Blue",e[t.uuid]=t,E=!E})),c.publish(A.lobbyChannel,"event_start",{teams:e},P)},A.uuid=L.a.generate().substring(0,6),A.state={isPlaying:!1,isDisabled:!1,isRoomCreator:!1,count:1,players:[]},A.handleInputChange=A.handleInputChange.bind(Object(S.a)(A)),A.onPressCreate=A.onPressCreate.bind(Object(S.a)(A)),A.onPressJoin=A.onPressJoin.bind(Object(S.a)(A)),A.onPressStartGame=A.onPressStartGame.bind(Object(S.a)(A)),A.lobbyChannel=null,A.words=[],A.playerMap=null,A}return Object(I.a)(t,[{key:"handleInputChange",value:function(e){var E=e.target,t=E.name,A=E.value;this.setState(Object(n.a)({},t,A))}},{key:"render",value:function(){var e=this;return a.a.createElement("div",null,!this.state.isPlaying&&a.a.createElement("div",{className:"d-md-flex h-md-100 align-items-center"},a.a.createElement("div",{className:"heading heading-left bg-primary-color"},a.a.createElement("h1",null,"code")),a.a.createElement("div",{className:"heading heading-right"},a.a.createElement("h1",null,"names")),a.a.createElement("div",{className:"col-md-6 p-0 h-md-100 align-items-center",style:{background:"#ebeeef"}},a.a.createElement("div",{className:"p-5"},a.a.createElement("div",{className:"login-box shadow"},a.a.createElement("div",{className:"box-title"},a.a.createElement("span",null,"Welcome!")),a.a.createElement("div",{className:"mt-3 p-4"},a.a.createElement("div",{className:"form-group row"},a.a.createElement("label",{className:"col-4 col-form-label"},"Nickname"),a.a.createElement("div",{className:"col-8"},a.a.createElement("input",{name:"name",type:"text",className:"form-control",onChange:this.handleInputChange}))),a.a.createElement("div",{className:"form-group row"},a.a.createElement("label",{className:"col-4 col-form-label"},"Room name"),a.a.createElement("div",{className:"col-8"},a.a.createElement("input",{name:"roomId",type:"text",className:"form-control",onChange:this.handleInputChange}))),a.a.createElement("div",{className:"form-group row"},a.a.createElement("div",{className:"col"},a.a.createElement("button",{type:"button",className:"rounded-pill btn btn-outline-dark btn-block",onClick:this.onPressCreate},"Create")),a.a.createElement("div",{className:"col"},a.a.createElement("button",{type:"button",className:"rounded-pill btn btn-outline-dark btn-block",onClick:this.onPressJoin},"Join"))),this.state.isRoomCreator&&this.state.count>=2&&a.a.createElement("div",{className:"form-group row"},a.a.createElement("div",{className:"col"},a.a.createElement("button",{type:"button",className:"rounded-pill btn btn-outline-success btn-block",onClick:this.onPressStartGame},"Start Game!"))))),this.state.players.length>0&&a.a.createElement("div",{className:"players-box shadow mt-5"},a.a.createElement("div",{className:"box-title"},a.a.createElement("span",null,"Secret Operatives")),a.a.createElement("div",{className:"p-4"},this.state.players.map((function(E,t){var A=E.name,R=e.state.players[t+1]?e.state.players[t+1].name:"";return t%2===0?a.a.createElement("div",{className:"d-flex"},a.a.createElement("div",{className:"w-50 text-center"},A),a.a.createElement("div",{className:"w-50 text-center"},R)):""})))))),a.a.createElement("div",{className:"col-md-6 p-0 bg-primary-color h-md-100"})),this.state.isPlaying&&a.a.createElement(u,{gameChannel:this.lobbyChannel,playerMap:this.playerMap,myUuid:this.uuid,isRoomCreator:this.state.isRoomCreator,words:this.words}))}}]),t}(A.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(32),O.a.render(a.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.005248b2.chunk.js.map