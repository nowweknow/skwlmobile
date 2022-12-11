import help from 'app/components/svg-icon/icons/help';
import { FULL_HEIGHT } from 'app/variables/common-styles';
import { ImageStyle, ViewStyle } from 'react-native';
import { colors } from 'theme';

export const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  backgroundColor:'white',
};

export const BTN: ViewStyle = {
  height: '10%',
  width: 52,
  justifyContent: 'center',
  alignItems: 'center',
};

export const AVATAR: ImageStyle = {
  width: 32,
  height: 32,
};

export const CHAT_BOX: ViewStyle = {
flex:1,
marginBottom:20
};

export const BUBBLE = {

}

export const BUBBLE_TEXT = {
  right: {
    color: colors.black,
  },
}

export const TIME_TEXT = {
  left: {
    color: colors.black,
  },
  right: {
    color: colors.black,
  },
}

export const MESSAGE = {
  
  
}
export const MESSAGEE = {

  
}

export const DAY_CONTAINER: ViewStyle = {
  marginBottom: 18,
}

export const INPUT_CONT: ViewStyle = {
  width: '82%',
  paddingHorizontal: 20,
  height: '85%',
  maxHeight:130,
}
