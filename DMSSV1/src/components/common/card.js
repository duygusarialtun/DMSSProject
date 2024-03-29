import React from 'react';
import { StyleSheet, View,Button } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.cardWrapper}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    height: 80,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    fontSize: 10,
    alignItems: 'flex-end',

  },
});

export { Card };
