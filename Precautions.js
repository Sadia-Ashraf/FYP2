import React from 'react';
import { SafeAreaView,View,Text,StyleSheet ,Image,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

function Precautions(props) {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            
            <TouchableOpacity
        style={{ top: 20, left: 20, position: "absolute" }}
        activeOpacity={0.8}
        onPress={navigation.goBack}
      >
        <Icon name="arrow-back-ios" size={30} color={"black"} />
      </TouchableOpacity>
            
                <Image style={styles.pic1} source={require('../../assets/picture1.jpg')}></Image>
            
            <View style={styles.intro}>
                <Text style={styles.floodtitle}>FLOOD</Text>
                
                <Text numberOfLines={5} style={styles.floodtext}>A flood is an overflow of water that submerges land
                that is usually dry. In the sense of "flowing water", the word may also be applied to the inflow of the tide.</Text>

                
                <Image style={styles.pic2} source={require('../../assets/rising.png')}></Image>
            </View>
            
            <Image style={styles.road} source={require('../../assets/road.jpg')}></Image>

            <Text style={styles.title2}>WHAT TO DO</Text>

            <Text style={styles.subtitle1}>BEFORE</Text>

            <View style={{top:250,width:"95%"}}>
                <FlatList 
                data={[{key:"Build an emergency kit and make a family communication plan."},
                {key:"Avoid building in a floodplain unless you elevate and reinforce your home."},
            {key:"Elevate the furnace, water heater and electrical panel in your home if you live in an area that has a high flood risk."}]}
                renderItem={({item})=>{return (
                    <View >
                        <Text style={{color:"white",fontSize:14,fontWeight:"600"}}>{`\u2022 ${item.key}`}</Text>
                    </View>
                )}}/>

            </View>
           
            <Text style={styles.subtitle2}>DURING</Text>

            <View style={{top:250,width:"95%"}}>
                <FlatList 
                data={[{key:"Listen to the radio or television for information."},
                {key:"Be aware that flash flooding can occur. If there is any possibility of a flash flood, move immediately to higher ground. Do not wait for instructions to move."},
            {key:"Be aware of stream, drainage channels, canyons and other areas known to flood suddenly."}]}
                renderItem={({item})=>{return (
                    <View >
                        <Text style={{color:"white",fontSize:14,fontWeight:"600"}}>{`\u2022 ${item.key}`}</Text>
                    </View>
                )}}/>

            </View>

            <Text style={styles.subtitle3}>AFTER</Text>

            <View style={{top:250,width:"95%"}}>
                <FlatList 
                data={[{key:"Be aware of areas where floodwaters have receded. Roads may have weakened and could collapse under the weight of a car."},
                {key:"Stay out of any building if it is surrounded by floodwaters."},
            {key:"Use extreme caution when entering buildings; there may be hidden damage, particularly in foundations."}]}
                renderItem={({item})=>{return (
                    <View >
                        <Text style={{color:"white",fontSize:14,fontWeight:"600"}}>{`\u2022 ${item.key}`}</Text>
                    </View>
                )}}/>

            </View>

       
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"steelblue",
    alignItems:"center"
  
},
pic1:{
width:"100%",
height:180,
resizeMode:"stretch",
//position:"absolute",
top:50

},
intro:{
    height:140,
    width:"100%",
    top:240,
    backgroundColor:"powderblue",
    position:"absolute",
    left:0,
    

},
floodtitle:{
    fontSize:35,
    fontWeight:"900",
    color:"steelblue",
    left:20,
    //top:5
},
floodtext:{
    fontSize:15,
    fontWeight:"500",
    //alignSelf:"center",
    //alignContent:"center",
   textAlign:"center",
    top:45,
    left:10,
    right:160,
    position:"absolute"
},
pic2:{
    height:100,
    width:150,
    position:"absolute",
    bottom:20,
    right:0,
   //resizeMode:"stretch"
},
road:{
    height:30,
    width:"100%",
    resizeMode:"stretch",
    top:205,
    
},
title2:{
    fontSize:32,
    fontWeight:"900",
    color:"powderblue",
    position:"absolute",
    left:20,
    top:415
},
subtitle1:{
    color:"white",
    fontSize:20,
    fontWeight:"900",
    top:250
},
subtitle2:{
    color:"white",
    fontSize:20,
    fontWeight:"900",
    top:250
},
subtitle3:{
    color:"white",
    fontSize:20,
    fontWeight:"900",
    top:250
},
    
})

export default Precautions;