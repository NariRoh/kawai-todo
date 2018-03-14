import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';
import ToDo from './ToDo';

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedTodos: false
  }

  componentDidMount() {
    this._loadTodos();
  }

  render() {
    const { newToDo, loadedTodos } = this.state;

    if( !loadedTodos ) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
           />
           <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hi I'm new To Do"}/>
           </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadTodos = () => {
    this.setState({
      loadedTodos: true
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState({
        newToDo: ""
      });
      // 👇 toDos: prevState.toDos + newToDo
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          todos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb'
  },
  toDos: {
    alignItems: 'center'
  }
});
