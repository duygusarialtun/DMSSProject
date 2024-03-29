import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import {sendManager} from '../actions';
import {sendID} from '../actions';
import Confetti from 'react-native-confetti';


class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email:'',
      password:'',
      loginResponse:'',
      userID: '',
      isManager: '',
      loading: false,
      error: ''
    }
  }

  onLoginClicked(){
    console.log("On Login clicked.");
    if(this.state.email == "" || this.state.password == ""){
      this.setState({
        error: 'Giriş yapılamadı lütfen boşlukları doldurunuz.',
        loading: true
      })
      Alert.alert("Giriş yapılamadı lütfen boşlukları doldurunuz.");

      return
    }
    else if(this.state.email.split('@')[1] != "kw.com"){
      this.setState({
        error: 'Keller Williams emailiniz ile giriş yapınız.',
        loading: true
      })
      Alert.alert("Keller Williams emailiniz ile giriş yapınız.");

      return
    }
    this.setState({
      error: '',
      loading: true
    })
      axios({
        method: 'post',
        url: 'http://192.168.1.26:8086/user',
        data: {
            email: this.state.email,
            password: this.state.password,
        }
       }).then((response) => 
      {console.log("LOGIN:", this.state)
        this.setState({
      loginResponse: response.data["res"],
      userID: response.data["userID"],
      isManager: response.data["isManager"]
       })  
      // Buraya store a atılacak verileri yazacağız.
      console.log("MANAGER ID'Sİ: ", response.data["userID"] )
      this.props.sendID(response.data["userID"])
      this.props.sendManager(response.data["isManager"])

      if(this.state.loginResponse == 1 && this.state.isManager == false)
        Actions.MyComponent();
      else if(this.state.loginResponse == 1 && this.state.isManager == true)
        Actions.MyComponentMan();
      else if (response.status != 200){
        this.setState({
          error: 'Authentication failed',
          loading: false
        })
      }
      })
    
  }

  onClickListener () {
    Alert.alert("Şifrenizi unuttuysanız yöneticinize başvurunuz.");
  }

  onRegisterClicked(){
    Actions.Register();
  }

  onNewPwdClicked(){
    Actions.NewPwd();
  }

  render() {
    return (

      <View style={styles.container}>
        <Image source={require('../images/kw_logo_mini.png')} />
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Şifre"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onLoginClicked.bind(this)}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.textContainer} onPress={() => this.onNewPwdClicked.bind(this)}>
            <Text style={{fontSize: 16}}>Şifrenizi mi unuttunuz?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.textContainer} onPress={this.onRegisterClicked.bind(this)}>
            <Text style={{fontSize: 16}}>Hesabınız Yok Mu?</Text>
        </TouchableHighlight>
      </View>
    
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
    sendManager: (text) =>dispatch(sendManager(text)),
    sendID: (userID) => dispatch(sendID(userID))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
      borderBottomColor: '#000000',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      fontSize: 16
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginBottom:30,
    width:150,
    borderRadius:30,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width:150,
    borderRadius:30
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    fontSize: 16
  }
});

export default connect(null, mapDispatchToProps)(LoginView);