import { UserProfile } from "./user-profile.model";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userProfile: UserProfile;
}
