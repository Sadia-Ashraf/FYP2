import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { SafeAreaView,View,Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,Image, Alert} from 'react-native';
import { MaterialCommunityIcons as Icon2} from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialIcons";

import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('Flood6.db')

function SignUp(props) {

    const [userName,setUserName]=useState(""); 
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const [secureEntry,setSecureEntry]=useState(true)
    const [iconName,setIconName]=useState('eye-off')
    let userlist=[];
    let userNameList=[];
    let userPasswordList=[];
   var id;
   const navigation=useNavigation();

    useEffect(
        ()=>{
createTable();

         }
    )

   const createTable=()=>{

        db.transaction((txn)=>{
            txn.executeSql(      //query takes query,values and callback method for response
                "SELECT NAME from sqlite_master WHERE type='table' AND name='table_user'",
                [],
                (tx,res) => {
                    
                    //console.log('item',res.rows.length);
                    if(res.rows.length==0){
                        txn.executeSql('DROP TABLE IF EXISTS table_user',[]);
                        txn.executeSql('CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, NAME VARCHAR(30),PASSWORD VARCHAR(20),EMAIL VARCHAR(25))',
                        [],);
                    }
                    // else
                    // {
                    
                    //     console.log('table already created');
                    // }
                }  
            )
        })

    }
   
const saveData=()=>{
    db.transaction(txn=>{
        txn.executeSql('INSERT INTO table_user(NAME,PASSWORD,EMAIL) VALUES (?,?,?)',
        [userName,password,email],
    
        (tex,res)=>{
            // if(res.rowsAffected==1)
            // {
                console.log(res);
                //console.log(res.insertId);
                id=res.insertId;
                // console.log(id);
    
                   
                
                
       //return res;
       
        },
        error=>{
            console.log(error);
        },
        )
    })
    
}

const displayData=()=>{
    db.transaction(txn=>{

        txn.executeSql(
            'SELECT * FROM table_user WHERE user_id=?',
            [id],
            (tx,res)=>{
                console.log('Data saved was',res.rows.item(0))
            },
             error=>{
                console.log(error);
            },
        )
    })
}

const displayFullTable=()=>{
    db.transaction(txn=>{
        txn.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx,res)=>{
                var i=0;
                console.log('Complete Table:');
                while (i<id)
                {
                    console.log(res.rows.item(i));
                   userlist.push(res.rows.item(i));
                //    console.log(userlist[i])
                   //navigation.navigate("Login",{userlist})
                    i=i+1;
                    
                }

                // console.log(id);
                // console.log(userlist);
                // navigation.navigate("Login",{userlist,id})
                
                    
            },
            error=>{
                console.log(error);
            },
        )
    })
}

const sendData=()=>{
    db.transaction(txn=>{
        txn.executeSql(
            'SELECT NAME FROM table_user',
            [],
            (tx,res)=>{
                var i=0;
                console.log('Complete Names:');
                while (i<id)
                {
                    console.log(res.rows.item(i));
                   userNameList.push(res.rows.item(i));
                //    console.log(userlist[i])
                   //navigation.navigate("Login",{userlist})
                    i=i+1;
                    
                }

                // console.log(id);
                // console.log(userlist);
                //navigation.navigate("Login",{userNameList,id})
                
                    
            },
            error=>{
                console.log(error);
            },
        )
        txn.executeSql(
            'SELECT PASSWORD FROM table_user',
            [],
            (tx,res)=>{
                var i=0;
                console.log('Complete Passwords:');
                while (i<id)
                {
                    console.log(res.rows.item(i));
                   userPasswordList.push(res.rows.item(i));
                //    console.log(userlist[i])
                   //navigation.navigate("Login",{userlist})
                    i=i+1;
                    
                }
               navigation.navigate("Login",{userNameList,userPasswordList,id})
                // console.log(id);
                // console.log(userlist);
                
                    
            },
            error=>{
                console.log(error);
            },
        )
        
    })
   
}



const onIconPress=()=>{
    setIconName(secureEntry?'eye-off':'eye')
    setSecureEntry(!secureEntry)
   
  }

    return (
        
            <ImageBackground style={styles.background} source={require('../../assets/waterBackground2.jpg')}>
                 {/* <TouchableOpacity
        style={{ top: 40, left: 20, position: "absolute" }}
        activeOpacity={0.8}
        onPress={navigation.goBack}
      >
        <Icon name="arrow-back-ios" size={35} color={"black"} />
      </TouchableOpacity> */}
                <Text numberOfLines={3} style={styles.titletext}>HELLO,                              ALL READY TO                  GET ON BOARD</Text>
                
                <Text style={styles.username}>USERNAME</Text>
                <View style={styles.box1}>
                    <TextInput style={{flex:1,fontSize:23,color:"white"}} value={userName} onChangeText={(text)=>setUserName(text)}></TextInput>
                </View>

                <Text style={styles.password}>PASSWORD</Text>
                <View style={styles.box2}>
                    <TextInput style={{flex:1,fontSize:23,color:"white"}}  value={password}  secureTextEntry={secureEntry} onChangeText={(text)=>setPassword(text)}></TextInput>
                    <TouchableOpacity onPress={()=>onIconPress()} style={{position:"absolute",right:10}}>
          <Icon2 name={iconName} size={30} color={'white'} />
        </TouchableOpacity>
                </View>

                <Text style={styles.email}>EMAIL</Text>
                <View style={styles.box3}>
                <TextInput style={{flex:1,fontSize:23,color:"white"}} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.RegisterButton} onPress={()=>{{saveData();displayData();displayFullTable(); Alert.alert('Your account created');}}}>
                    <Text style={{fontSize:25,fontFamily:"monospace",color:"white"}}>REGISTER</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.SignInButton} onPress={()=>{{saveData();displayData();displayFullTable();sendData(); }}}>
                    <Text style={{fontSize:25,fontFamily:"monospace",color:"white"}}>SIGN IN</Text>
                </TouchableOpacity>

            </ImageBackground>
            
       
    );
}

const styles = StyleSheet.create({
    
    background:{
        width:"100%",height:"100%"
    },
    
    titletext:{
        fontSize:35,
        fontFamily:'monospace',
        //letterSpacing:0,
        fontWeight:"900",
        position:"absolute",
        left:60,
        right:20,
        top:35,
        color:"navy"
        //textAlign:"left",
    },
    
    username:{
        fontSize:22,
        fontFamily:"Roboto",
        fontWeight:"700",
        marginTop:200,
        left:40,
    },

    box1:{
        width:"80%",
        height:50,
        backgroundColor:'rgba(0,0,128, 0.5)',   //navy color 0.5 is opacity
        //opacity:0.6,
        left:40
    },

    password:{
        fontSize:22,
        fontFamily:"Roboto",
        fontWeight:"700",
        marginTop:30,
        left:40,
    },

    box2:{
        width:"80%",
        height:50,
        backgroundColor:'rgba(0,0,128, 0.5)',   //navy color 0.5 is opacity
        left:40,
        justifyContent:"center"
    },

    email:{
        fontSize:22,
        fontFamily:"Roboto",
        fontWeight:"700",
        marginTop:30,
        left:40,
    },

    box3:{
        width:"80%",
        height:50,
        backgroundColor:'rgba(0,0,128, 0.5)',   //navy color 0.5 is opacity
        left:40
    },

    RegisterButton:{
        width:250,
        height:50,
        backgroundColor:"midnightblue",
        marginTop:70,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:20,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"black"
    },
SignInButton:{
    width:250,
    height:50,
    backgroundColor:"midnightblue",
    marginTop:50,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    borderRadius:20,
    borderStyle:"solid",
    borderWidth:2,
    borderColor:"black"

},
 
})

export default SignUp;