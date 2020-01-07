import { UserProfile } from '@core/models/user-profile';

export class GlobalObject {
  public nowpage = 'bc1';
  public menuPage = 'aa';
  public isShowMenu = true;
  public loading = false;
  public userData = {
    name: 'สมชาย ใจดี',
    position: 'นักวิชาการเงินและบัญชี',
    deapartment: 'สำนักงานเลขานุการกรม กรมพัฒนาพลังงานทดแทน&อนุร',
    username: '120050000110'
  };
  public userProfile: UserProfile;
}
