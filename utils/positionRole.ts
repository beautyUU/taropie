
import { PositionRole } from '../types';
import { ROLE_KEYWORDS_MAP } from '../constants';

export const inferPositionRole = (name: string): PositionRole => {
  for (const [key, role] of Object.entries(ROLE_KEYWORDS_MAP)) {
    if (name.includes(key)) return role;
  }
  return PositionRole.UNKNOWN;
};
