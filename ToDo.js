import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
    /*
      👆 before we would copy and paste the text from props by running _startEditing
      by this way, we can grab the text right way when the component loaded so user
      can edit when as soon as the component render
    */
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    unCompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  };

  // state = {
  //   isEditing: false,
  //   // isCompleted: false,
  //   toDoValue: ""
  // };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, deleteToDo, isCompleted, id } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.unCompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
              // when cliking outside of textInput area, editing is done
              underlineColorAndroid={"transparent"}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        { isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={event => {
                event.stopPropagation;
                deleteToDo(id);
              }}
            >
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = event => {
    event.stopPropagation();
    const { isCompleted, id, completeToDo, unCompleteToDo } = this.props;
    if (isCompleted) {
      unCompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };

// the reason not toggle this state is we need to save todos in App.js if we do, it'll be complicated
  _startEditing = event => {
    event.stopPropagation();
    this.setState({ isEditing: true });
  };

  _finishEditing = event => {
    event.stopPropagation();
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({ isEditing: false });
  };

  _controlInput = text => {
    this.setState({
      toDoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through'
  },
  unCompletedText: {
    color: '#353839'
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2
  },
  actions: {
    flexDirection: 'row'
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
    // so those icons can be pressed around fat figers!!
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5
  }
});
