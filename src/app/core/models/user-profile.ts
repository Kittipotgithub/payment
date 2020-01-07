import { UserData } from './user-data';
import { PersonalPermission } from './personal-permission';
import { ReportPermission } from './report-permission';

export interface UserProfile {
  DATELOGIN: Date;
  userdata: UserData;
}
