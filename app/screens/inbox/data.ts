import {IComment, IFollow, ILike} from 'types';

export const messages = [
  {
    id: '1',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '2',
    profileName: 'Billy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '3',
    profileName: 'Jameson Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '4',
    profileName: 'Carl Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '5',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '6',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing edfdfsdfsdfsdfsdfsdflit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '7',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '8',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    id: '9',
    profileName: 'Jimmy Melanson',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
];

export const notifications: Array<IFollow | ILike | IComment> = [
  {
    type: 'follow',
    profileName: 'Profile Name',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'like',
    profiles: ['Profile Name', 'Profile Name', 'Profile Name', 'Profile Name'],
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'like',
    profiles: ['Profile Name'],
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'comment',
    profileName: 'Profile Name',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'comment',
    profileName: 'Profile Name',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'comment',
    profileName: 'Profile Name',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'follow',
    profileName: 'Profile Name',
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
  {
    type: 'like',
    profiles: ['Profile Name', 'Profile Name', 'Profile Name', 'Profile Name'],
    img: 'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',
  },
];
