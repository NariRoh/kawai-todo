import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };

  render() {
    const { isCompleted } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.unCompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hello</Text>
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
    borderWidth: 3
  },
  completedCircle: {
    borderColor: '#999'
  },
  unCompletedCircle: {
    borderColor: '#F23657'
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20
  }
});
