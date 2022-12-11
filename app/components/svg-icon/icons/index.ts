//slider icons
import Logo from './slider/logo';
import LogoSign from './slider/logoSign';
import LogoDescription from './slider/logoDescription';

//tab icons
import HomeTab from './tabs/home';
import BasketTab from './tabs/basket';
import AddTab from './tabs/add';
import InboxTab from './tabs/inbox';
import ProfileTab from './tabs/profile';

//camera
import CameraFlash from './camera/cameraFlash';
import CameraSwitch from './camera/cameraSwitch';

//general
import Help from './help';
import Info from './info';
import ArrowLeft from './arrowLeft';
import Facebook from './facebook';
import Twitter from './twitter';
import Google from './google';
import Apple from './apple';
import Close from './close';
import ArrowLink from './arrowLink';
import Bookmark from './bookmark';
import SuccessCircle from './successCircle';
import Music from './music';
import Like from './like';
import Message from './message';
import DotsHorizontal from './dotsHorizontal';
import DotsVertical from './dotsVerical';
import Settings from './settings';
import Search from './search';
import Plus from './plus';
import ArrowRight from './arrowRight';
import LikeFilled from './likeFilled';
import Hashtag from './hashtag';
import Basket from './basket';
import Delete from './delete';
import Upload from './upload';
import Send from './send';
import Card from './card';
import Phone from './phone';

export const icons = {
  //slider icons
  logo: Logo,
  logoSign: LogoSign,
  logoDescription: LogoDescription,
  //tab icons
  homeTab: HomeTab,
  basketTab: BasketTab,
  addTab: AddTab,
  inboxTab: InboxTab,
  profileTab: ProfileTab,
  //camera
  cameraFlash: CameraFlash,
  cameraSwitch: CameraSwitch,
  //general
  help: Help,
  info: Info,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  facebook: Facebook,
  twitter: Twitter,
  google: Google,
  apple: Apple,
  phone: Phone,
  close: Close,
  arrowLink: ArrowLink,
  bookmark: Bookmark,
  successCircle: SuccessCircle,
  music: Music,
  like: Like,
  likeFilled: LikeFilled,
  message: Message,
  dotsHorizontal: DotsHorizontal,
  dotsVertical: DotsVertical,
  settings: Settings,
  search: Search,
  plus: Plus,
  hashtag: Hashtag,
  basket: Basket,
  delete: Delete,
  upload: Upload,
  send: Send,
  card: Card,
};
export type IconTypes = keyof typeof icons;
