import React from 'react';
import {Text,SafeAreaView,View,TouchableOpacity,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

function UserHome(props) {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
        style={{ top: 50, left: 20, position: "absolute" }}
        activeOpacity={0.8}
        onPress={navigation.goBack}
      >
        <Icon name="arrow-back-ios" size={35} color={"black"} />
      </TouchableOpacity>

            <Text style={styles.Text1}>Welcome to the real-time Flood Monitoring Portal</Text>
            
            <TouchableOpacity activeOpacity={0.8} style={styles.Button1} onPress={()=>navigation.navigate('Level1')}> 
            {/* onPress={()=>navigation.navigate('Level1')} */}
                <View style={{backgroundColor:"white",height:60,width:60,borderRadius:50,left:10,position:"absolute",alignItems:"center",justifyContent:"center"}}>
                    <Image style={{height:60,width:60,borderRadius:50}} source={require('../../assets/waterdrop.jpg')}/>
                </View>
                <Text style={styles.Button1Text}>Water Information</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.Button2} onPress={()=>navigation.navigate("Precautions")}>
            <View style={{backgroundColor:"white",height:60,width:60,borderRadius:50,left:10,position:"absolute",alignItems:"center",justifyContent:"center"}}>
              <Image style={{height:60,width:60,borderRadius:50,resizeMode:"center"}} source={require('../../assets/precautionsign.jpg')}/>
            </View>
                <Text style={styles.Button2Text} >Precautions</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.Button3} onPress={()=>navigation.navigate('Map')}>
            {/* onPress={()=>navigation.navigate('Map')} */}
            <View style={{backgroundColor:"white",height:60,width:60,borderRadius:50,left:10,position:"absolute",alignItems:"center",justifyContent:"center"}}>
            <Image style={{height:55,width:55,borderRadius:50,resizeMode:"contain"}} source={require('../../assets/map2.jpg')}/>
            </View>
                <Text style={styles.Button3Text}>Map</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:'#EEF5FF'
        //justifyContent:"center"
    },

    Text1:{
       position:"absolute", 
        left:55,
        top:50,
        fontSize:25,
        color:"grey",
        textAlign:"center"
    },

    Button1:{
        marginTop:200,
        width:"80%",
        height:80,
        backgroundColor:'#176B87',
        borderRadius:50,
        justifyContent:"center",
        //alignItems:"center"
    },

    Button1Text:{
        fontSize:25,
        marginLeft:80,
        color:"white"
    },

    Button2:{
        marginTop:100,
        width:"80%",
        height:80,
        backgroundColor:'#5C5470',
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },

    Button2Text:{
        fontSize:25,
        marginLeft:20,
        color:"white"
    },
    
    Button3:{
        marginTop:100,
        width:"80%",
        height:80,
        backgroundColor:"#164863",
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },

    Button3Text:{
        fontSize:25,
        marginLeft:20,
        color:"white"
    },

})

export default UserHome;