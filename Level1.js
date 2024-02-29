import React from 'react';
import { useState,useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
// import { LiquidGauge } from 'react-native-liquid-gauge';
import { Canvas, Circle, Group, Path, Skia,Text as GT,useFont} from "@shopify/react-native-skia";
import { area, scaleLinear } from "d3";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";


import Svg, { Circle as C, Rect,Line } from 'react-native-svg';
// import { Svg } from 'react-native-svg';

import axios from 'axios';


const Thermometer = ({ temperature, length }) => {
 
  const circle_radius = 17;
  const MAX_TEMP = 100;
  const thermometerHeight = length;
  const mercuryHeight = (temperature / MAX_TEMP) * thermometerHeight;

  // Generate temperature scale labels
  const scaleLabels = [];
  for (let i = 0; i <= MAX_TEMP; i += 10) {
    scaleLabels.push(
      <Text
        key={i}
        style={{
          position: 'absolute',
          top: ((thermometerHeight / MAX_TEMP) * (100 - i))-10,
          right: 45,
          fontSize:14,
        }}
      >
        {i}°C
      </Text>
    );
  }

  // Generate temperature scale lines
  const scaleLines = [];
  for (let i = 0; i <= MAX_TEMP; i += 10) {
    scaleLines.push(
      <Line
        key={i}
        x1="5"
        y1={((thermometerHeight / MAX_TEMP) * (100 - i))}
        x2="40"
        y2={((thermometerHeight / MAX_TEMP) * (100 - i))}
        stroke="#000"
        strokeWidth="2"
      />
    );
  }

  return (
    <Svg height={thermometerHeight + circle_radius} width="200">
      {/* Thermometer */}
      <Rect x="40" y="0" width="20" height={thermometerHeight} fill="#666" />
      {/* Mercury */}
      <Rect
        x="40"
        y={thermometerHeight-mercuryHeight}
        width="20"
        height={mercuryHeight}
        fill="red"
      />

      {/* Temperature Scale */}
      <Svg width="30" height={thermometerHeight}>
        {scaleLabels}
        {scaleLines}
      </Svg>

      {/* Circle */}
      <C
        cx="50"
        cy={thermometerHeight}
        r={circle_radius}
        fill="red"
        
      />
    </Svg>
  );

};





const LiquidGaugeProgress = ({ size, value }) => {
  
  const radius = size * 0.5; // outer circle
  const circleThickness = radius * 0.09; // 0.05 just coefficient can be anything you like

  const circleFillGap = 0.08 * radius; // 0.05 just coefficient can be anything you like
  const fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleRadius = radius - fillCircleMargin; // inner circle radius

  const minValue = 0; // min possible value
  const maxValue = 100; // max possible value
  const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue; // percent of how much progress filled 

  const waveCount = 1; // how many full waves will be seen in the circle
  const waveClipCount = waveCount + 1; // extra wave for translate x animation
  const waveLength = (fillCircleRadius * 2) / waveCount; // wave length base on wave count 
  const waveClipWidth = waveLength * waveClipCount; // extra width for translate x animation
  const waveHeight = fillCircleRadius * 0.08; // wave height relative to the circle radius, if we change component size it will look same

  const fontSize = radius / 2; // font size is half of the radius
const font = useFont(require('../../assets/fonts/Roboto-Bold.ttf'), fontSize); // create font with font file and size
const text = `${value}`; // convert value to string
const textWidth = font?.getTextWidth(text) ?? 0; // get text width
const textTranslateX = radius - textWidth * 0.5; // calculate text X position to center it horizontally
const textTransform = [{ translateY: size * 0.5 - fontSize * 0.7 }]; // calculate vertical center position. Half canvas size - half font size. But since characters isn't centered inside font rect we do 0.7 instead of 0.5.


  // Data for building the clip wave area.
  // we have 40 points per wave
  // we generate as many points as 40 * waveClipCount
  const data = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push([i / (40 * waveClipCount), i / 40]);
  }

  const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth 
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveHeight

  // area take our data points 
  // output area with points (x, y0) and (x, y1)
  const clipArea = area()
    .x(function (d) {
      return waveScaleX(d[0]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth 
    })
    .y0(function (d) {
      // interpolate value between 0 and 1 to value between 0 and waveHeight
      return waveScaleY(
        Math.sin(d[1] * 2 * Math.PI),
      );
    })
    .y1(function (_d) {
      // same y1 value for each point 
      return fillCircleRadius * 2 + waveHeight;
    });

    const clipSvgPath = clipArea(data); // convert data points as wave area and output as svg path string 
    // const clipPath = Skia.Path.MakeFromSVGString(clipSvgPath); // convert svg path string to skia format path
    // const transformMatrix = Skia.Matrix(); // create Skia tranform matrix 
    // transformMatrix.translate(
    //   0, // translate x to 0, basically do nothing
    //   fillCircleMargin + (1 - fillPercent) * fillCircleRadius * 2 - waveHeight, // translate y to position where lower point of the wave in the innerCircleHeight * fillPercent
    // );
    // clipPath.transform(transformMatrix); // apply transform matrix to our clip path
    
    
    const translateXAnimated = useSharedValue(0); // animated value translate wave horizontally
    const translateYPercent = useSharedValue(0); // animated value translate wave vertically
    const textValue = useSharedValue(0); // animated value for text
  
    useEffect(() => {
    translateXAnimated.value = withRepeat(
      // repeat animation
      withTiming(1, {
        // animate from 0 to 1
        duration: 3000, // animation duration
        easing: Easing.linear, // easing function
      }),
      -1, // repeat forever
    );

  }, []);

  useEffect(() => {
    translateYPercent.value = withTiming(fillPercent, { // timing animation from 0 to `fillPercent`
      duration: 1000, // animation duration
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillPercent]);

  const clipPath = useDerivedValue(() => {
    // animated value for clip wave path
    const clipP = Skia.Path.MakeFromSVGString(clipSvgPath); // convert svg path string to skia format path
    const transformMatrix = Skia.Matrix(); // create Skia tranform matrix
    transformMatrix.translate(
      fillCircleMargin - waveLength * translateXAnimated.value, // translate left from start of the first wave to the length of first wave
      fillCircleMargin + (1 - translateYPercent.value) * fillCircleRadius * 2 - waveHeight, // translate y to position where lower point of the wave in the innerCircleHeight * fillPercent
    );
    clipP.transform(transformMatrix); // apply transform matrix to our clip path
    return clipP;
  }, [translateXAnimated]);

  useEffect(() => {
    textValue.value = withTiming(value, { // animate from 0 to `value`
      duration: 1000, // duration of animation
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
 
 
  const derivedText = useDerivedValue(() => { // derived value for the Text component
    return `${textValue.value.toFixed(0)}`; // convert to string 
  }, [textValue]);

  






  return (
    <Canvas style={{ width: size, height: size,alignItems:"center",justifyContent:"center" }}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - circleThickness * 0.5}
        color="#178BCA"
        style="stroke"
        strokeWidth={circleThickness}
      />
<GT
        x={textTranslateX}
        y={fontSize}
        text={derivedText}
        font={font}
        color="#045681"
        transform={textTransform}
      />

      {/* clip everything inside this group with clip path */}
      <Group clip={clipPath}> 
        <Circle cx={radius} cy={radius} r={fillCircleRadius} color="#178BCA" />
        <GT
x={textTranslateX}
y={fontSize}
text={text}
font={font}
color="#A4DBf8"

transform={textTransform}
    />
      </Group>
    </Canvas>
  );
};



  

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     {sensorData ? (
  //       <Text>{JSON.stringify(sensorData)}</Text>
  //     ) : (
  //       <Text>Loading data...</Text>
  //     )}
  //   </View>
  // );




function Level1(props) {
  const navigation = useNavigation();
  const [water_value, setWV] = useState(35);
  const [temperature, setTemperature] = useState(50);
  //const [sensorData, setSensorData] = useState(null);
 
  const [sensorData, setSensorData] = useState(null);
  var a,b,c,d;
  const fetchData = async () => {
    try {
      const response = await axios.get('https://io.adafruit.com/api/v2/rabeet/feeds/ultrasonic');
      // Assuming the response data is an array of sensor readings
      setSensorData(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    return sensorData;
  };

  useEffect(() => {
    
    fetchData();
    console.log(sensorData)
    // console.log(sensorData)
    //  a=JSON.stringify(sensorData);
    //  console.log(a)
  //   b=JSON.parse(a)
  // // // console.log(b)
  //   c=b.last_value;
  //  d=parseInt(c);
  //   console.log(d)
  // //   //  setWV(d)
  });

//   const conversion=()=>{

// console.log(sensorData)
//      a=JSON.stringify(sensorData);
//      console.log(a)
//     b=JSON.parse(a)
//   // // console.log(b)
//     c=b.last_value;
//    d=parseInt(c);
//     console.log(d)
//   //   //  setWV(d)


//   }
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('https://io.adafruit.com/api/v2/rabeet/feeds/ultrasonic');
//         //  Assuming the response data is an array of sensor readings
//         setSensorData(response.data);
//         // setSensorData(response.data);
//         return sensorData;
          
//           // console.log(typeof(sensorData))
//           // // console.log(typeof(a))
//           // const a=JSON.stringify(sensorData);
//           // // console.log(a)
//           // const b=JSON.parse(a)
//           // // console.log(b)
//           // const c=b.last_value;
//           // const d=parseInt(c);
//           // console.log(d)
//           // console.log(typeof(d))
//           // console.log(typeof(water_value))
//           // setWV(d)
//           // setWV(c)
//           // console.log(water_value)
// //           var i=0;
// //           while(i<10){
// //             console.log(a[i])
// // i=i+1;
// //           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
  
//       fetchData();
      
//       console.log(sensorData);
//     },
    
//      []);
  
    
  

  return (
    <SafeAreaView style={styles.container}>

<View style={styles.wl}> 
<TouchableOpacity
        style={{ top: 50, left: 20, position: "absolute" }}
        activeOpacity={0.8}
        onPress={navigation.goBack}
      >
        <Icon name="arrow-back-ios" size={35} color={"black"} />
      </TouchableOpacity>
<LiquidGaugeProgress size={250} value={water_value}/>
{/* <Text onPress={()=>conversion()} >UPDATE</Text> */}
</View>
    
      {/* <Text style={styles.text1} onPress={() => setWV(40)}>UPDATE</Text> */}
<View style={styles.temp}>
<Thermometer temperature={temperature} length={300}></Thermometer>
{/* <TouchableOpacity style={{position:"absolute",top:10, width:50,height:50,backgroundColor:"green" }} onPress={()=>console.log(sensorData)}></TouchableOpacity> */}
{/* onPress={()=>App()} */}
</View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
    alignItems: "center",
   
  },
  wl: {
    width:"100%",
    height: "50%",
    position: "absolute",
    top:0,
    alignItems: "center",
    justifyContent: "center",
   
  },
  text1: {
    marginTop: 400,
    fontSize: 25,
    color: "blue"
  },
  temp:{
    width:"100%",
    height: "50%",
    position: "absolute",
    bottom:50,
    left:50,
    alignItems: "center",
    justifyContent: "center",
 
  }
});

export default Level1;