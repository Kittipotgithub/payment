import { UserProfileService } from './user-profile.service';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

export const services: any[] = [ApiService, LocalStorageService, UserProfileService];

export * from './api.service';
export * from './local-storage.service';
export * from './user-profile.service';
