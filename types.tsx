import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Home: {authUser: AuthUser | undefined};
  ChatRoom: {
    authUser: AuthUser;
    chatroomId: string;
    userId: string | undefined;
  };
  Modal: undefined;
  NotFound: undefined;
  UsersScreen: {authUser: AuthUser};
  GroupInfoScreen: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackSNavigationProps<
  ScreenName extends keyof RootStackParamList,
> = NativeStackNavigationProp<RootStackParamList, ScreenName>;

export type RootStackRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  imageUri: string;
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  imageUri: string;
}

export interface Chatroom {
  id: string;
  name: string;
  imageUri: string;
  newMessages: Number;
  users: [User];
  messages: [Message];
  lastMessage: Message;
  createdAt: String;
  updatedAt: String;
}

export interface Message {
  id: string;
  content: string;
  audio: string;
  image: string;
  status: {type: String; enum: ['SENT', 'DELIVERED', 'READ']};
  chatroomID: string;
  userID: string;
  forUserID: string;
  createdAt: Date;
}
