import type {NativeStackScreenProps} from '@react-navigation/native-stack';

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
  Home: undefined;
  ChatRoom: undefined;
  Modal: undefined;
  NotFound: undefined;
  UsersScreen: {authUser: AuthUser};
  GroupInfoScreen: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  imageUri: string;
  token: string;
}
