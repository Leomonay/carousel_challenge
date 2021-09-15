import React, {useState, useEffect} from 'react';
import { Text, Image, View, StyleSheet, Button, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../../../config'

const {serverHost, serverPort, serverEndPoint} = appConfig
const carouselWidth = 200

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    carouselImage: {
        position: 'absolute',
        top: 0,
        height: carouselWidth,
        resizeMode: "center"
      },
      carouselInternal: {
        position: 'absolute',
        right: 10,
        width: 180,
        height: carouselWidth,
        backgroundColor: 'black'
      },
      });


const Carousel = () => {
    const endPoint = `${serverHost}:${serverPort}/${serverEndPoint}`
    const [loading, setLoading]=useState(true)
    const [carouselSource, setCarouselSource]=useState([])
    const [index, setIndex] = useState(0)
    const [innerWidthFirst, setInnerWidthFirst] = useState (new Animated.Value(0))
    const [innerRightFirst, setInnerRightFirst] = useState (new Animated.Value(0))
    const [innerWidthSecond, setInnerWidthSecond] = useState (new Animated.Value(0))
    const [innerRightSecond, setInnerRightSecond] = useState (new Animated.Value(0))
    const [innerWidthThird, setInnerWidthThird] = useState (new Animated.Value(0))
    const [innerRightThird, setInnerRightThird] = useState (new Animated.Value(0))
  
    async function getIndex(){
        try{
            const previousIndex = parseInt( await AsyncStorage.getItem('carouselSourceIndex'))
            if(previousIndex){
                console.log('previousIndex',previousIndex)
                setIndex(previousIndex)
                console.log('hook', index)
            }
        }catch(e){
            console.error(e.message)
        }
    }
    useEffect(()=>{getIndex()},[])

    function Animation (w1, r1, w2, r2, w3, r3){
        Animated.timing(innerWidthFirst, {
            toValue: w1,
            duration: 1000,
            useNativeDriver:false
        }).start();
        Animated.timing(innerRightFirst, {
            toValue: r1,
            duration: 1000,
            useNativeDriver:false
          }).start();
          Animated.timing(innerWidthSecond, {
            toValue: w2,
            duration: 1000,
            useNativeDriver:false
        }).start();
        Animated.timing(innerRightSecond, {
            toValue: r2,
            duration: 1000,
            useNativeDriver:false
          }).start();
        Animated.timing(innerWidthThird, {
            toValue: w3,
            duration: 1000,
            useNativeDriver:false
        }).start();
        Animated.timing(innerRightThird, {
            toValue: r3,
            duration: 1000,
            useNativeDriver:false
          }).start();
    }

    function moveImage(){
        console.log
        switch (index){
            case 0:
                Animation(carouselWidth, 0, 0, 0, 0, 0  )
            break;
            case 1:
                Animation(0, 0, carouselWidth, 0, 0, 0  )                
            break;
            case 2:
                Animation(0, 0,0, 0, carouselWidth, 0 )                
            break;
            default:
        }
    }
    useEffect(()=>{moveImage()},[index])
    
    function getImages(){
        setLoading(true)
        try{
            fetch(endPoint)
            .then(res=>res.json())
            .then(res=>{
                setCarouselSource(res)
                setLoading(false)
                console.log('hook', res)
            })
        }catch(e){
            console.error(e.message)
        }
    }    

    useEffect(()=>{getImages()},[])

    useEffect(()=>{AsyncStorage.setItem('carouselSourceIndex', JSON.stringify(index))},[index])

    if(loading){
        return (
            <View><Text>Getting Carousel Source</Text></View>
        )
    }
    console.log
    return (
        <View>
            <View style={styles.container}>
                <Button
                    onPress={()=>{setIndex(index-1)}}
                    title="Prev"
                    color= "#29B026"
                    disabled={index===0}
                />
                <View style={{flexDirection: 'row'}}>
                    <Animated.Image id='View1'
                            source={{uri: carouselSource[0].image}}
                            style={styles.carouselImage,
                            {right: innerRightFirst,
                            width: innerWidthFirst,
                            height: carouselWidth,
                            backgroundColor: 'black'}}>
                    </Animated.Image>
                    <Animated.Image id='View2'
                            source={{uri: carouselSource[1].image}}
                            style={styles.carouselImage,{
                            right: innerRightSecond,
                            width: innerWidthSecond,
                            height: carouselWidth}}/>
                    <Animated.Image id='View3'
                            source={{uri: carouselSource[2].image}}
                            style={styles.carouselImage,
                            {right: innerRightThird,
                            width: innerWidthThird,
                            height: carouselWidth,
                            backgroundColor: 'black'}
                        }/>
                </View>
                <Button
                    onPress={()=>{setIndex(index+1)}}
                    title="Next"
                    color= "#29B026"
                    disabled={index===carouselSource.length-1} 
                />
            </View>
        </View>
    );
}

export default Carousel;