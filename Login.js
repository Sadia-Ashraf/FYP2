import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native';
import { useState ,useEffect} from 'react';
import {useNavigation,useRoute } from '@react-navigation/native';

import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import SignUp from './SignUp';
 function Login(props) {

  const navigation=useNavigation();

  const [userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const [secureEntry,setSecureEntry]=useState(true)
  const [iconName,setIconName]=useState('eye-off')
  const route=useRoute();


    const list=route.params?.userNameList;
    const list2=route.params?.userPasswordList
    const id2=route.params?.id;
  


const matchingData=()=>{
 
  var j=0;

while(j<id2)
  {
    var str="";
    var str2="";
  a=JSON.stringify(list[j])
  // console.log(a)
  b=JSON.stringify(list2[j])
  // console.log(b)
  // console.log(typeof(a))
  // console.log(a.length) 
  var k=9;
  while(k<a.length-2){
    // console.log(a[k])
    str+=a[k]
    k=k+1;
  }
 var l=13;
 while(l<b.length-2)
  {
  // console.log(b[l])
  str2+=b[l]
  l=l+1
 }
 // console.log('String1',str)
 // console.log('String2',str2)
 // console.log(userName)
 if(userName.length>0 && password.length>0)
 { 
  if(userName==str){
    console.log('User Name matched')
    if(password==str2)
    {
      console.log('Password matched')
      navigation.navigate('UserHome')
      break;
    }
    else
    {
      console.log('Password is incorrect')
    }
   
  }
  else 
  {
    console.log("User Name is incorrect. No further processing.")
    
  }
}
else
{
  console.log('Empty entry')
}
// if(a.includes(userName))
// {
//   navigation.navigate('UserHome')
// }
// else
// {
//   console.log('User Name is incorrect')
// }
j=j+1
  }
  // console.log(list2)
}

 
const onIconPress=()=>{
  setIconName(secureEntry?'eye-off':'eye')
  setSecureEntry(!secureEntry)
 
}

  return (
   

    <View style={styles.container}>
      <Text style={styles.title}>Flood Monitoring System</Text>
      <Image style ={styles.homeIcon} source={require('../../assets/floodicon.jpeg')}></Image>
      
      <Image style={styles.thermometer} source={require('../../assets/temperatureicon.png')}></Image>
      <Image style={styles.level} source={require('../../assets/levelicon.png')}></Image>
      
      <View style={styles.input}>
    
      <TextInput
          placeholder="User Name"
          style={{ flex: 1, fontSize: 18,left:10 }}
         value={userName}
         onChangeText={(text)=>setUserName(text)}

        ></TextInput>
      </View>
      
      <View style={styles.input2}>
    
      <TextInput
          placeholder="Password"
          style={{ flex: 1, fontSize: 18 ,left:10}}
          secureTextEntry={secureEntry}
      
             value={password}
            onChangeText={(text)=>setPassword(text)}

        ></TextInput>
        <TouchableOpacity onPress={()=>onIconPress()} style={{position:"absolute",right:10}}>
          <Icon name={iconName} size={30} />
        </TouchableOpacity>
       
      </View>
      <TouchableOpacity activeOpacity={0.6} style={styles.Login} onPress={()=>{{matchingData()}}}>
        <Text style={{fontSize:25,fontWeight:"bold"}}>
          LOGIN
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity activeOpacity={0.6} style={styles.SignUp} onPress={()=>{{console.log('Create an account');navigation.navigate("SignUp")}}}>
        <Text style={{fontSize:25,fontWeight:"bold"}}>SIGN UP</Text>
      </TouchableOpacity> */}
      <TouchableOpacity activeOpacity={0.7} style={styles.GuestButton} onPress={()=>navigation.navigate('UserHome')}>
                    <View style={{width:25,height:12,borderStyle:"solid",borderWidth:1.5}}>
                      <View style={{flex:1,backgroundColor:"white"}}></View>
                    {/* <Image style={{width:"100%",height:"100%"}} source={require('../../assets/waterBackground2.jpg')}></Image> */}
                    </View>
                </TouchableOpacity>
                <Text style={{top:690,position:"absolute" ,left:40,fontSize:30,fontFamily:"Roboto",fontWeight:"900"}}>LOGIN AS GUEST</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    position:"absolute",top:75, fontSize:30
  },
  homeIcon:{
    position:"absolute",height:120,width:120, top:120
  },
  Login:{
    width:"70%",
    height:50,
    backgroundColor:"aqua",
    position:"absolute",
    top:560,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  },
 
  thermometer:{
    width:90,
    height:90,
    position:"absolute",
    top:430,
    left:100
    
  },
  level:{
    width:100,
    height:100,
    position:"absolute",
    top:420,
    right:100
  },
  input:{
    backgroundColor:"white",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    //borderRadius: 5,
    height:50,
    width:250,
    position:"absolute",
    top:270,
 
    //top:400,
   
  },
  input2:
  {
    backgroundColor:"white",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    //borderRadius: 5,
    height:50,
    width:250,
    position:"absolute",
    top:350,
    
    justifyContent:"center"
    //top:400,

  },
  GuestButton:{
    width:90,
    height:80,
    backgroundColor:"lime",
    borderRadius:60,
    borderStyle:"dashed",
    borderWidth:6,
    borderColor:"black",
    borderTop:100,
    left:130,
    marginTop:570,
    alignItems:"center",justifyContent:"center"

},


});
export default Login;
