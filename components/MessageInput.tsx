import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmojiSelector from 'react-native-emoji-selector';
import {gql, useMutation} from '@apollo/client';

const SENDMESSAGE_MUTATION = gql`
  mutation sendMessage($chatroomId: String, $content: String) {
    sendMessage(chatroomId: $chatroomId, content: $content) {
      id
    }
  }
`;

const MessageInput = ({chatroom}) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const [sendMessageMutation, {data, loading, error}] = useMutation(
    SENDMESSAGE_MUTATION,
    {
      onCompleted: data => {
        console.log('sendMessageMutation completed');
      },
      onError: error => {
        console.log('sendMessageMutation error: ', error);
      },
    },
  );

  const sendMessage = async () => {
    sendMessageMutation({
      variables: {chatroomId: chatroom.id, content: message},
    });

    resetFields();
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const resetFields = () => {
    setMessage('');
    setIsEmojiPickerOpen(false);
  };

  const onPlusClicked = () => {
    console.warn('On plus clicked');
  };

  return (
    <KeyboardAvoidingView
      style={
        (styles.root, {height: isEmojiPickerOpen ? '50%' : 'auto', padding: 10})
      }
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiPickerOpen(currentValue => !currentValue);
            }}>
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="grey"
              style={styles.icon}
            />
          </Pressable>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Signal message ..."
          />
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={emoji => {
            setMessage(currentMessage => currentMessage + emoji);
          }}
          columns={8}
        />
      )}
    </KeyboardAvoidingView>
  );
};
export default MessageInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  sendImageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    flex: 1,
    padding: 5,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#3777f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
