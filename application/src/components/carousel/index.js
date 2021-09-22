import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useRef, useState } from 'react'
import { View, Animated, StyleSheet, Button, Image, Text } from 'react-native'
import appConfig from '../../../config'

const {serverHost, serverPort, serverEndPoint} = appConfig

export default function Carousel (props){
  const endPoint = `${serverHost}:${serverPort}/${serverEndPoint}`

  const [timing, setTiming]=useState(0)
  const [current,setCurrent] = useState(1)
  const [position,setPosition] = useState(0)
  const [source, setSource]=useState([{'':''}])
  const moveAnim = useRef(new Animated.Value(0)).current

  async function getCurrent(){
      let previousCurrent = await AsyncStorage.getItem('carouselSourceIndex')
      if(previousCurrent){
        setCurrent(parseInt (previousCurrent))
      }else{
        setCurrent(1)
      }
      try{
      fetch(endPoint)
        .then(res=>res.json())
        .then(res=>{
            setSource(res)
            setTiming(700)
        })
        .catch(e=>{
          console.error(e)
          setTiming(700)
        })
      }catch(e){
        console.error(e)
      }
  }

  useEffect(()=>{getCurrent()},[])

  const animatedStyle = {
    transform: [{translateX: moveAnim}]
  }
  
  useEffect(()=>{
    Animated.timing(
      moveAnim,{
        toValue: position,
        duration: timing,
        useNativeDriver:true
      }).start();
  },[position])

  function calculatePosition(){
    let width = innerStyles.carouselImage.width 
    let margin = innerStyles.carouselImage.margin
    let viewerWidth = innerStyles.frame.width
    let border = innerStyles.frame.borderWidth
    if (current == 0)return (viewerWidth/2-(width/2+margin))-border
    let firstStep = -(3*margin+1.5*width-viewerWidth/2)-border
    if (current == 1) return firstStep
    if (current==source.length-1) return -((width+2*margin)*(current-1)-firstStep-3*margin)
    return firstStep-(width+2*margin)*(current-1)
  }

  function next(){
    setCurrent(current+1)
  }
  function previous(){
    setCurrent(current-1)
  }
  async function newCurrent(){
    setPosition(calculatePosition())
    await AsyncStorage.setItem('carouselSourceIndex', JSON.stringify(current))
  }
  useEffect(() => {newCurrent()}, [current])
  
  const innerStyles = StyleSheet.create({
    frame:{
      overflow: 'hidden',
      width: props.width||350,
      height: props.height||350,
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 10,
      borderRadius: 10,
      borderBottomWidth: 0
    },
    innerFrame:{
      position: 'absolute',
      left: timing==0?position:0,
      height: props.height-50||300,
      alignItems : 'center',
      flexDirection: 'row',
    },
    carouselImage:{
      width: props.width-70||260,
      height: props.height-120||180,
      top: 0,
      margin: 2,
      marginBottom:0,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={innerStyles.frame}>
        <Animated.View style={
          timing==0?
          innerStyles.innerFrame
          :[innerStyles.innerFrame,animatedStyle]}
        >
          {source.map((item,index)=>{
            if(!item.image){
              return <View key={'noImage'+index}
              style={[innerStyles.carouselImage,
              {backgroundColor: '#E5E8E8',
              alignItems: 'center',
              justifyContent: 'center' },
              ]}>
                <Text>No image source detected</Text>
              </View>}
          return <View key={'view'+index} 
            style={{transform: [{ scale: index==current?1:.9 }]}}>
          
              <Image
                key={'image'+index}
                style={[innerStyles.carouselImage]}
                source={{uri: item.image}}/>
              <Text key={'title'+index} style={styles.imageText}>{item.title}</Text>
            </View>
          }
          )}
        </Animated.View>
        <View style={styles.buttons}>
          <Button
            title='PREVIOUS'
            onPress={()=>previous()}
            disabled={current==0}
            />
          <Button
            title='     NEXT     '
            onPress={()=>next()}
            disabled={current==source.length-1}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#0D0D0D',
    alignSelf: 'center',
  },
  imageText:{
    padding:2,
    backgroundColor: '#E5E8E8',
    margin: 2,
    marginTop:0,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});


