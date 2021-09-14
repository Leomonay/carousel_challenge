import React, {useState, useEffect} from 'react';
import { Text, Image, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../../../config'

const {serverHost, serverPort, serverEndPoint} = appConfig

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    carouselImage: {
      width: 150,
      height: 150,
    },
    button:{
        width:15,
        height: 100,
        justifyContent: 'flex-end'
    },
  });


const Carousel = () => {
    const endPoint = `${serverHost}:${serverPort}/${serverEndPoint}`
    const [loading, setLoading]=useState(true)
    const [carouselSource, setCarouselSource]=useState([])
    const [index, setIndex] = useState(0)
    
    async function getIndex(){
        try{
            const previousIndex = parseInt( await AsyncStorage.getItem('carouselSourceIndex'))
            if(previousIndex)setIndex(previousIndex)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{getIndex()},[])

    useEffect(()=>{
        try{
        setLoading(true)
        fetch(endPoint)
        .then(res=>res.json())
        .then(res=>{
            setCarouselSource(res)
            setLoading(false)
        })
        }catch(e){
            console.error(e)
        }
    },[])

    useEffect(()=>{AsyncStorage.setItem('carouselSourceIndex', JSON.stringify(index))},[index])

    if(loading){
        return (
            <View><Text>Getting Carousel Source</Text></View>
        )
    }
    return (
        <View>
            <View style={styles.container}>
                <Button
                    onPress={()=>{setIndex(index-1)}}
                    title="Prev"
                    color= "#29B026"
                    buttonStyle={styles.button}
                    disabled={index===0}
                />
                <View>
                    <Image
                    style ={styles.carouselImage}
                    source={{uri: carouselSource[index].image}}
                    />            
                </View>
                <Button
                    onPress={()=>{setIndex(index+1)}}
                    color= "#29B026"
                    buttonStyle={styles.button}
                    title="Next"
                    disabled={index===carouselSource.length-1} 
                />
            </View>
        </View>
    );
}

export default Carousel;