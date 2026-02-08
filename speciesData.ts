import { Species } from './types';
import { RAPTORS } from './data/raptors';
import { PASSERINES } from './data/passerines';
import { WATERFOWL } from './data/waterfowl';

const OTHER: Species[] = [
	// --- Alcedinidae (Kingfishers) ---
    { id: '189', name: 'Common Kingfisher', abbreviation: 'COMKIN', family: 'Alcedinidae' },
    { id: '190', name: 'White-throated Kingfisher', abbreviation: 'WHIKIN', family: 'Alcedinidae' },
    { id: '191', name: 'Pied Kingfisher', abbreviation: 'PIEKIN', family: 'Alcedinidae' },
 
  // --- Motacillidae (Wagtails) ---
    { id: '192', name: 'White Wagtail', abbreviation: 'WHIWAG', family: 'Motacillidae' },
    { id: '193', name: 'Citrine Wagtail', abbreviation: 'CITWAG', family: 'Motacillidae' },
    { id: '194', name: 'Water Pipit', abbreviation: 'WATPIP', family: 'Motacillidae' },

  // --- Emberizidae (Buntings) ---
    { id: '195', name: 'Common Reed Bunting', abbreviation: 'COMBUN', family: 'Emberizidae' }
    { id: '310', name: 'Common Wood Pigeon', abbreviation: 'WOOPIG', family: 'Columbidae' },
    { id: '301', name: 'Common Swift', abbreviation: 'COMSWI', family: 'Apodidae' },
    { id: '302', name: 'European Bee-eater', abbreviation: 'EURBEE', family: 'Meropidae' },
];

export const DEFAULT_SPECIES: Species[] = [
  ...RAPTORS,
  ...PASSERINES,
  ...WATERFOWL,
  ...OTHER
].sort((a,b) => a.name.localeCompare(b.name));         


