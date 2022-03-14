import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const blue = '#3777f0';
const grey = 'lightgrey';

const Message = ({message, authUser}) => {
  const [content, setContent] = useState(message.content);
  const [isMe, setIsMe] = useState<boolean | null>(null);

  // check if message sender is me.
  useEffect(() => {
    if (!authUser || !message) {
      return;
    }

    setIsMe(message.userID === authUser.id);
  }, [message, authUser]);

  return (
    <Pressable
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}>
      <View style={styles.row}>
        <Text style={{color: isMe ? 'black' : 'white'}}>{content}</Text>
      </View>
    </Pressable>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  leftContainer: {
    backgroundColor: blue,
    marginLeft: 10,
    marginRight: 'auto',
  },
  rightContainer: {
    backgroundColor: grey,
    marginLeft: 'auto',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageReply: {
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 5,
  },
});
