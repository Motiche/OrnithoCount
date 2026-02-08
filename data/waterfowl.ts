import { Species } from '../types';

export const WATERFOWL: Species[] = [
// --- Gaviidae (Loons/Divers) ---
  { id: '1', name: 'Black-throated Loon', abbreviation: 'BLALOO', family: 'Gaviidae' },
  { id: '2', name: 'Red-throated Loon', abbreviation: 'RETLOO', family: 'Gaviidae' },
  { id: '3', name: 'Gavia species', abbreviation: 'GAVSPP', family: 'Gaviidae' },

  // --- Podicipedidae (Grebes) ---
  { id: '4', name: 'Red-necked Grebe', abbreviation: 'RENGRE', family: 'Podicipedidae' },
  { id: '5', name: 'Great Crested Grebe', abbreviation: 'GRECRE', family: 'Podicipedidae' },
  { id: '6', name: 'Horned Grebe', abbreviation: 'HORGRE', family: 'Podicipedidae' },
  { id: '7', name: 'Black-necked Grebe', abbreviation: 'BLAGRE', family: 'Podicipedidae' },
  { id: '8', name: 'Little Grebe', abbreviation: 'LITGRE', family: 'Podicipedidae' },
  { id: '9', name: 'Grebe species', abbreviation: 'PODSPP', family: 'Podicipedidae' },

  // --- Pelecanidae (Pelicans) ---
  { id: '10', name: 'Great White Pelican', abbreviation: 'GREPEL', family: 'Pelecanidae' },
  { id: '11', name: 'Dalmatian Pelican', abbreviation: 'DALPEL', family: 'Pelecanidae' },
  { id: '12', name: 'Pelican species', abbreviation: 'PELSPP', family: 'Pelecanidae' },

  // --- Phalacrocoracidae (Cormorants) ---
  { id: '13', name: 'Cormorant species', abbreviation: 'PHASPP', family: 'Phalacrocoracidae' },
  { id: '14', name: 'Pygmy Cormorant', abbreviation: 'PYGCOR', family: 'Phalacrocoracidae' },
  { id: '15', name: 'Great Cormorant', abbreviation: 'GRECOR', family: 'Phalacrocoracidae' },
  { id: '16', name: 'Socotra Cormorant', abbreviation: 'SOCCOR', family: 'Phalacrocoracidae' },
  { id: '17', name: 'Phalacrocorax species', abbreviation: 'PHASPP', family: 'Phalacrocoracidae' },

  // --- Anhingidae (Darters) ---
  { id: '18', name: 'African Darter', abbreviation: 'AFRDAR', family: 'Anhingidae' },

  // --- Ardeidae (Herons, Egrets, Bitterns) ---
  { id: '19', name: 'Grey Heron', abbreviation: 'GREHER', family: 'Ardeidae' },
  { id: '20', name: 'Goliath Heron', abbreviation: 'GOLHER', family: 'Ardeidae' },
  { id: '21', name: 'Purple Heron', abbreviation: 'PURHER', family: 'Ardeidae' },
  { id: '22', name: 'Great Egret', abbreviation: 'GREEGR', family: 'Ardeidae' },
  { id: '23', name: 'Western Reef Heron', abbreviation: 'WESHER', family: 'Ardeidae' },
  { id: '24', name: 'Little Egret', abbreviation: 'LITEGR', family: 'Ardeidae' },
  { id: '25', name: 'Cattle Egret', abbreviation: 'CATEGR', family: 'Ardeidae' },
  { id: '26', name: 'Squacco Heron', abbreviation: 'SQUHER', family: 'Ardeidae' },
  { id: '27', name: 'Indian Pond Heron', abbreviation: 'INDHER', family: 'Ardeidae' },
  { id: '28', name: 'Striated Heron', abbreviation: 'STRHER', family: 'Ardeidae' },
  { id: '29', name: 'Black-crowned Night Heron', abbreviation: 'BLAHER', family: 'Ardeidae' },
  { id: '30', name: 'Little Bittern', abbreviation: 'LITBIT', family: 'Ardeidae' },
  { id: '31', name: 'Eurasian Bittern', abbreviation: 'EURBIT', family: 'Ardeidae' },
  { id: '32', name: 'Ardeidae species', abbreviation: 'ARDSPP', family: 'Ardeidae' },
  { id: '33', name: 'Egret species', abbreviation: 'EGRSPP', family: 'Ardeidae' },

  // --- Ciconiidae (Storks) ---
  { id: '34', name: 'Black Stork', abbreviation: 'BLASTO', family: 'Ciconiidae' },
  { id: '35', name: 'White Stork', abbreviation: 'WHISTO', family: 'Ciconiidae' },
  { id: '36', name: 'Woolly-necked Stork', abbreviation: 'WOOSTO', family: 'Ciconiidae' },
  { id: '37', name: 'Stork species', abbreviation: 'CICSSP', family: 'Ciconiidae' },

  // --- Threskiornithidae (Ibises, Spoonbills) ---
  { id: '38', name: 'African Sacred Ibis', abbreviation: 'AFRIBI', family: 'Threskiornithidae' },
  { id: '39', name: 'Glossy Ibis', abbreviation: 'GLOIBI', family: 'Threskiornithidae' },
  { id: '40', name: 'Eurasian Spoonbill', abbreviation: 'EURSPO', family: 'Threskiornithidae' },

  // --- Phoenicopteridae (Flamingos) ---
  { id: '41', name: 'Greater Flamingo', abbreviation: 'GREFLA', family: 'Phoenicopteridae' },
  { id: '42', name: 'Lesser Flamingo', abbreviation: 'LESFLA', family: 'Phoenicopteridae' },

  // --- Anatidae (Ducks, Geese, Swans) ---
  { id: '43', name: 'Bean Goose', abbreviation: 'BEAGOO', family: 'Anatidae' },
  { id: '44', name: 'Greater White-fronted Goose', abbreviation: 'GREGOO', family: 'Anatidae' },
  { id: '45', name: 'Lesser White-fronted Goose', abbreviation: 'LESGOO', family: 'Anatidae' },
  { id: '46', name: 'Greylag Goose', abbreviation: 'GREGOO', family: 'Anatidae' },
  { id: '47', name: 'Red-breasted Goose', abbreviation: 'REDGOO', family: 'Anatidae' },
  { id: '48', name: 'Barnacle Goose', abbreviation: 'BARGOO', family: 'Anatidae' },
  { id: '49', name: 'Anser species', abbreviation: 'ANSSPP', family: 'Anatidae' },
  { id: '50', name: 'Whooper Swan', abbreviation: 'WHOSWA', family: 'Anatidae' },
  { id: '51', name: 'Bewicks Swan', abbreviation: 'BEWSWA', family: 'Anatidae' },
  { id: '52', name: 'Mute Swan', abbreviation: 'MUTSWA', family: 'Anatidae' },
  { id: '53', name: 'Swan species', abbreviation: 'CYGSPP', family: 'Anatidae' },
  { id: '54', name: 'Ruddy Shelduck', abbreviation: 'RUDSHE', family: 'Anatidae' },
  { id: '55', name: 'Common Shelduck', abbreviation: 'COMSHE', family: 'Anatidae' },
  { id: '56', name: 'Cotton Pygmy Goose', abbreviation: 'COTGOO', family: 'Anatidae' },
  { id: '57', name: 'Eurasian Wigeon', abbreviation: 'EURWIG', family: 'Anatidae' },
  { id: '58', name: 'Gadwall', abbreviation: 'GADWAL', family: 'Anatidae' },
  { id: '59', name: 'Common Teal', abbreviation: 'COMTEA', family: 'Anatidae' },
  { id: '60', name: 'Mallard', abbreviation: 'MALLAR', family: 'Anatidae' },
  { id: '61', name: 'Northern Pintail', abbreviation: 'NORPIN', family: 'Anatidae' },
  { id: '62', name: 'Garganey', abbreviation: 'GARGAN', family: 'Anatidae' },
  { id: '63', name: 'Northern Shoveler', abbreviation: 'NORSHO', family: 'Anatidae' },
  { id: '64', name: 'Marbled Duck', abbreviation: 'MARDUC', family: 'Anatidae' },
  { id: '65', name: 'Red-crested Pochard', abbreviation: 'REDPOC', family: 'Anatidae' },
  { id: '66', name: 'Common Pochard', abbreviation: 'COMPOC', family: 'Anatidae' },
  { id: '67', name: 'Ferruginous Duck', abbreviation: 'FERDUC', family: 'Anatidae' },
  { id: '68', name: 'Tufted Duck', abbreviation: 'TUFDUC', family: 'Anatidae' },
  { id: '69', name: 'Greater Scaup', abbreviation: 'GRESCA', family: 'Anatidae' },
  { id: '70', name: 'Long-tailed Duck', abbreviation: 'LONDUC', family: 'Anatidae' },
  { id: '71', name: 'Common Scoter', abbreviation: 'COMSCO', family: 'Anatidae' },
  { id: '72', name: 'Velvet Scoter', abbreviation: 'VELSCO', family: 'Anatidae' },
  { id: '73', name: 'Common Goldeneye', abbreviation: 'COMGOL', family: 'Anatidae' },
  { id: '74', name: 'Smew', abbreviation: 'SMEW', family: 'Anatidae' },
  { id: '75', name: 'Red-breasted Merganser', abbreviation: 'REDMER', family: 'Anatidae' },
  { id: '76', name: 'Common Merganser', abbreviation: 'COMMER', family: 'Anatidae' },
  { id: '77', name: 'White-headed Duck', abbreviation: 'WHIDUC', family: 'Anatidae' },
  { id: '78', name: 'Anatinae species', abbreviation: 'ANASPP', family: 'Anatidae' },

  // --- Gruidae (Cranes) ---
  { id: '79', name: 'Common Crane', abbreviation: 'COMCRA', family: 'Gruidae' },
  { id: '80', name: 'Siberian Crane', abbreviation: 'SIBCRA', family: 'Gruidae' },
  { id: '81', name: 'White-naped Crane', abbreviation: 'WHICRA', family: 'Gruidae' },

  // --- Rallidae (Rails, Crakes, Coots) ---
  { id: '82', name: 'Water Rail', abbreviation: 'WATRAI', family: 'Rallidae' },
  { id: '83', name: 'Little Crake', abbreviation: 'LITCRA', family: 'Rallidae' },
  { id: '84', name: 'Baillons Crake', abbreviation: 'BAICRA', family: 'Rallidae' },
  { id: '85', name: 'Spotted Crake', abbreviation: 'SPOCRA', family: 'Rallidae' },
  { id: '86', name: 'Common Moorhen', abbreviation: 'COMMOO', family: 'Rallidae' },
  { id: '87', name: 'Purple Swamphen', abbreviation: 'PURSWA', family: 'Rallidae' },
  { id: '88', name: 'Eurasian Coot', abbreviation: 'EURCOO', family: 'Rallidae' },
  { id: '89', name: 'Corn Crake', abbreviation: 'CORCRA', family: 'Rallidae' },
  { id: '90', name: 'Rail species', abbreviation: 'RALSPP', family: 'Rallidae' },

  // --- Dromadidae (Crab-plover) ---
  { id: '91', name: 'Crab-plover', abbreviation: 'CRAPLO', family: 'Dromadidae' },

  // --- Haematopodidae (Oystercatchers) ---
  { id: '92', name: 'Eurasian Oystercatcher', abbreviation: 'EUROYS', family: 'Haematopodidae' },

  // --- Recurvirostridae (Stilts, Avocets) ---
  { id: '93', name: 'Black-winged Stilt', abbreviation: 'BLASTI', family: 'Recurvirostridae' },
  { id: '94', name: 'Pied Avocet', abbreviation: 'PIEAVO', family: 'Recurvirostridae' },

  // --- Burhinidae (Thick-knees) ---
  { id: '95', name: 'Eurasian Stone-curlew', abbreviation: 'EURSTO', family: 'Burhinidae' },
  { id: '96', name: 'Great Stone-curlew', abbreviation: 'GRESTO', family: 'Burhinidae' },

  // --- Glareolidae (Pratincoles, Coursers) ---
  { id: '97', name: 'Cream-colored Courser', abbreviation: 'CRECOU', family: 'Glareolidae' },
  { id: '98', name: 'Collared Pratincole', abbreviation: 'COLPRA', family: 'Glareolidae' },
  { id: '99', name: 'Black-winged Pratincole', abbreviation: 'BLAPRA', family: 'Glareolidae' },

  // --- Charadriidae (Plovers, Lapwings) ---
  { id: '100', name: 'Northern Lapwing', abbreviation: 'NORLAP', family: 'Charadriidae' },
  { id: '101', name: 'Spur-winged Lapwing', abbreviation: 'SPULAP', family: 'Charadriidae' },
  { id: '102', name: 'Sociable Lapwing', abbreviation: 'SOCLAP', family: 'Charadriidae' },
  { id: '103', name: 'White-tailed Lapwing', abbreviation: 'WHILAP', family: 'Charadriidae' },
  { id: '104', name: 'Red-wattled Lapwing', abbreviation: 'REDLAP', family: 'Charadriidae' },
  { id: '105', name: 'Eurasian Golden Plover', abbreviation: 'EURPLO', family: 'Charadriidae' },
  { id: '106', name: 'Pacific Golden Plover', abbreviation: 'PACPLO', family: 'Charadriidae' },
  { id: '107', name: 'Grey Plover', abbreviation: 'GREPLO', family: 'Charadriidae' },
  { id: '108', name: 'Common Ringed Plover', abbreviation: 'COMPLO', family: 'Charadriidae' },
  { id: '109', name: 'Little Ringed Plover', abbreviation: 'LITPLO', family: 'Charadriidae' },
  { id: '110', name: 'Kentish Plover', abbreviation: 'KENPLO', family: 'Charadriidae' },
  { id: '111', name: 'Lesser Sand Plover', abbreviation: 'LESPLO', family: 'Charadriidae' },
  { id: '112', name: 'Greater Sand Plover', abbreviation: 'GREPLO', family: 'Charadriidae' },
  { id: '113', name: 'Caspian Plover', abbreviation: 'CASPLO', family: 'Charadriidae' },
  { id: '114', name: 'Charadrius species', abbreviation: 'CHASPP', family: 'Charadriidae' },
  { id: '115', name: 'Eurasian Dotterel', abbreviation: 'EURDOT', family: 'Charadriidae' },

  // --- Scolopacidae (Sandpipers, Snipes) ---
  { id: '116', name: 'Black-tailed Godwit', abbreviation: 'BLAGOD', family: 'Scolopacidae' },
  { id: '117', name: 'Bar-tailed Godwit', abbreviation: 'BARGOD', family: 'Scolopacidae' },
  { id: '118', name: 'Whimbrel', abbreviation: 'WHIMBR', family: 'Scolopacidae' },
  { id: '119', name: 'Slender-billed Curlew', abbreviation: 'SLECUR', family: 'Scolopacidae' },
  { id: '120', name: 'Eurasian Curlew', abbreviation: 'EURCUR', family: 'Scolopacidae' },
  { id: '121', name: 'Spotted Redshank', abbreviation: 'SPORED', family: 'Scolopacidae' },
  { id: '122', name: 'Common Redshank', abbreviation: 'COMRED', family: 'Scolopacidae' },
  { id: '123', name: 'Marsh Sandpiper', abbreviation: 'MARSAN', family: 'Scolopacidae' },
  { id: '124', name: 'Common Greenshank', abbreviation: 'COMGRE', family: 'Scolopacidae' },
  { id: '125', name: 'Green Sandpiper', abbreviation: 'GRESAN', family: 'Scolopacidae' },
  { id: '126', name: 'Wood Sandpiper', abbreviation: 'WOOSAN', family: 'Scolopacidae' },
  { id: '127', name: 'Terek Sandpiper', abbreviation: 'TERSAN', family: 'Scolopacidae' },
  { id: '128', name: 'Tringa species', abbreviation: 'TRISPP', family: 'Scolopacidae' },
  { id: '129', name: 'Common Sandpiper', abbreviation: 'COMSAN', family: 'Scolopacidae' },
  { id: '130', name: 'Ruddy Turnstone', abbreviation: 'RUDTUR', family: 'Scolopacidae' },
  { id: '131', name: 'Red-necked Phalarope', abbreviation: 'REDPHA', family: 'Scolopacidae' },
  { id: '132', name: 'Indian Cormorant', abbreviation: 'INDCOR', family: 'Phalacrocoracidae' }, // Note: Included here as per original list order
  { id: '133', name: 'Eurasian Woodcock', abbreviation: 'EURWOO', family: 'Scolopacidae' },
  { id: '134', name: 'Solitary Snipe', abbreviation: 'SOLSNI', family: 'Scolopacidae' },
  { id: '135', name: 'Pin-tailed Snipe', abbreviation: 'PINSNI', family: 'Scolopacidae' },
  { id: '136', name: 'Great Snipe', abbreviation: 'GRESNI', family: 'Scolopacidae' },
  { id: '137', name: 'Common Snipe', abbreviation: 'COMSNI', family: 'Scolopacidae' },
  { id: '138', name: 'Jack Snipe', abbreviation: 'JACSNI', family: 'Scolopacidae' },
  { id: '139', name: 'Great Knot', abbreviation: 'GREKNO', family: 'Scolopacidae' },
  { id: '140', name: 'Red Knot', abbreviation: 'REDKNO', family: 'Scolopacidae' },
  { id: '141', name: 'Sanderling', abbreviation: 'SANDER', family: 'Scolopacidae' },
  { id: '142', name: 'Little Stint', abbreviation: 'LITSTI', family: 'Scolopacidae' },
  { id: '143', name: 'Temmincks Stint', abbreviation: 'TEMSTI', family: 'Scolopacidae' },
  { id: '144', name: 'Dunlin', abbreviation: 'DUNLIN', family: 'Scolopacidae' },
  { id: '145', name: 'Curlew Sandpiper', abbreviation: 'CURSAN', family: 'Scolopacidae' },
  { id: '146', name: 'Broad-billed Sandpiper', abbreviation: 'BROSAN', family: 'Scolopacidae' },
  { id: '147', name: 'Ruff', abbreviation: 'RUFF', family: 'Scolopacidae' },
  { id: '148', name: 'Wader species', abbreviation: 'WADSPP', family: 'Scolopacidae' },

  // --- Stercorariidae (Skuas) ---
  { id: '149', name: 'Pomarine Skua', abbreviation: 'POMSKU', family: 'Stercorariidae' },
  { id: '150', name: 'Arctic Tern', abbreviation: 'ARCTER', family: 'Laridae' }, // Corrected family for Sterna paradisaea

  // --- Laridae (Gulls, Terns) ---
  { id: '151', name: 'White-eyed Gull', abbreviation: 'WHIGUL', family: 'Laridae' },
  { id: '152', name: 'Sooty Gull', abbreviation: 'SOOGUL', family: 'Laridae' },
  { id: '153', name: 'Mew Gull', abbreviation: 'MEWGUL', family: 'Laridae' },
  { id: '154', name: 'Great Black-backed Gull', abbreviation: 'GREGUL', family: 'Laridae' },
  { id: '155', name: 'Armenian Gull', abbreviation: 'ARMGUL', family: 'Laridae' },
  { id: '156', name: 'Caspian Gull', abbreviation: 'CASGUL', family: 'Laridae' },
  { id: '157', name: 'Lesser Black-backed Gull', abbreviation: 'LESGUL', family: 'Laridae' },
  { id: '158', name: 'Heuglins Gull', abbreviation: 'HEUGUL', family: 'Laridae' },
  { id: '159', name: 'Pallas Gull', abbreviation: 'PALGUL', family: 'Laridae' },
  { id: '160', name: 'Brown-headed Gull', abbreviation: 'BROGUL', family: 'Laridae' },
  { id: '161', name: 'Black-headed Gull', abbreviation: 'BLAGUL', family: 'Laridae' },
  { id: '162', name: 'Slender-billed Gull', abbreviation: 'SLEGUL', family: 'Laridae' },
  { id: '163', name: 'Mediterranean Gull', abbreviation: 'MEDGUL', family: 'Laridae' },
  { id: '164', name: 'Little Gull', abbreviation: 'LITGUL', family: 'Laridae' },
  { id: '165', name: 'Glaucous Gull', abbreviation: 'GLAGUL', family: 'Laridae' },
  { id: '166', name: 'Black-legged Kittiwake', abbreviation: 'BLAKIT', family: 'Laridae' },
  { id: '167', name: 'Gull species', abbreviation: 'LARSPP', family: 'Laridae' },
  { id: '168', name: 'Whiskered Tern', abbreviation: 'WHITER', family: 'Laridae' },
  { id: '169', name: 'White-winged Tern', abbreviation: 'WHITER', family: 'Laridae' },
  { id: '170', name: 'Black Tern', abbreviation: 'BLATER', family: 'Laridae' },
  { id: '171', name: 'Gull-billed Tern', abbreviation: 'GULTER', family: 'Laridae' },
  { id: '172', name: 'Caspian Tern', abbreviation: 'CASTER', family: 'Laridae' },
  { id: '173', name: 'Common Tern', abbreviation: 'COMTER', family: 'Laridae' },
  { id: '174', name: 'White-cheeked Tern', abbreviation: 'WHITER', family: 'Laridae' },
  { id: '175', name: 'Little Tern', abbreviation: 'LITTER', family: 'Laridae' },
  { id: '176', name: 'Sandwich Tern', abbreviation: 'SANTER', family: 'Laridae' },
  { id: '177', name: 'Greater Crested Tern', abbreviation: 'GRETER', family: 'Laridae' },
  { id: '178', name: 'Lesser Crested Tern', abbreviation: 'LESTER', family: 'Laridae' },
  { id: '179', name: 'Saunders Tern', abbreviation: 'SAUTER', family: 'Laridae' },
  { id: '180', name: 'Bridled Tern', abbreviation: 'BRITER', family: 'Laridae' },
  { id: '181', name: 'River Tern', abbreviation: 'RIVTER', family: 'Laridae' },
  { id: '182', name: 'Tern species', abbreviation: 'STESPP', family: 'Laridae' },

  // --- Rynchopidae (Skimmers) ---
  { id: '183', name: 'Indian Skimmer', abbreviation: 'INDSKI', family: 'Rynchopidae' },
];