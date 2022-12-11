export interface IUser {
  id?: number;
  avatar?: string | IUploadFile;
  first_name?: string;
  username?: string;
  second_name?: string;
  email?: string;
  header?: string;
  description?: string;
  plan?: string;
  plan_end_date?: Date;
  is_blocked?: boolean;
  stripe_customer_id?: string;
  website_link?: string;
  background_image?: string | IUploadFile;
  followers?: [{ id: number }]
}

export interface IVideoResponse {
  id: number;
  link: string;
  title: string;
  product_title: string;
  product_image_link: string;
  product_link: string;
  price: string;
  hashtag: string;
  isTranding: boolean;
  likes: number;
  created_at: Date;
  userId: number;
  user: IUser;
  followers: Array<{ id: number }> | [];
  user_liked: Array<{ id: number }> | [];
}

export interface ISubscriptionResponse {
  followerId: number;
  id: number | null;
  userId: number;
}

export interface ILikesResponse {
  likes: number;
  videoId: number;
}

export interface IVideoRecord {
  duration: number;
  path: string;
}

export interface IProducts {
  id: number;
  image_link: string;
  title: string;
  link: string;
  price: number;
  status: string;
  created_at: Date;
  user: IUser;
}

export interface IVideo {
  id: number;
  link: string;
  title: string;
  product_title: string;
  product_image_link: string;
  product_link: string;
  price: number;
  hashtag: string;
  isTranding: boolean;
  likes: number;
  created_at: string;
  userId: number;
}

export interface IProfile {
  id: number;
  first_name: string;
  second_name: string;
  username: string;
  email: string;
  avatar: string;
  header: string;
  description: string;
  website_link: string;
  background_image: string;
  plan: string | null;
  plan_end_date: string;
  is_blocked: boolean;
  stripe_customer_id: string;
  videos: IVideo[];
  marketplaces: [];
  followers: [];
  following: [];
  marketplaceCount: number;
  videosCount: number;
  followersCount: number;
  followingCount: number;
}

export interface IUploadFile {
  name: string;
  type: string;
  uri: string;
}
export interface IUserImage {
  avatar?: IUploadFile;
  background_image?: IUploadFile;
}

export interface ISocialLoginParams {
  user_id: string
  email: string
  avatar_url?: string
  name?: string
  surname?: string
}

export interface IAppleLoginParams {
  email: string
  id_token: string | null
}

export interface IChatListItem {
  id: number
  creator: IUser
  companion: IUser
  last_message: string
}
export interface INotificationsSettings {
  newFollower: boolean,
  newMessage: boolean,
  newLike: boolean,
}

export interface INotification {
  id: number,
  type: NotificationTypeEnum,
  message: string,
  userId: number,
  eventId: number,
  createdAt: Date,
  user: IUser,
  lastLikedUsers?: IUser[],
  likeCount?: number,
  parent?: INotification
}

export enum NotificationTypeEnum {
  LikeType = 'likes',
  FollowType = 'following',
  messageType = 'message',
}

export interface IMessage {
  id: number
  message: string
  created_at: Date
  author: IUser
}