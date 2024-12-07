import { createContext} from 'react';
import { ProfileContextType } from '../types/profile';

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
