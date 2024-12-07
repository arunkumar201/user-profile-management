import { TProfile } from "../schema";


export interface ProfileContextType {
  profile: TProfile | null;
  setProfile: (profile: TProfile | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}
