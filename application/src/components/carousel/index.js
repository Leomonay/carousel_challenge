import React, {useRef,useState, useEffect} from 'react';
import {View, FlatList, Text, Image, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../../../config'
import loadingGif from '../../../assets/loading.gif'

const {serverHost, serverPort, serverEndPoint} = appConfig

const Carousel=(props)=>{

  const endPoint = `${serverHost}:${serverPort}/${serverEndPoint}`
  const display={width:parseInt(props.width)||300,height: parseInt(props.height)||300}
  const imageDisplay={width: display.width,height:parseInt(props.height-30)*.7}
  const imageFoot={width: display.width,height:parseInt(props.height-30)*.3}
  const[data, setData]=useState([{title:'', image:null},{title:'', image:null},{title:'', image:null}])
  const[index, setIndex]=useState(0)
  const[loading, setLoading] = useState(true)

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
  useEffect(()=>{AsyncStorage.setItem('carouselSourceIndex', JSON.stringify(index))},[index])

    function getImages(){
      setLoading(true)
      try{
        fetch(endPoint)
        .then(res=>res.json())
        .then(res=>{
            setData(res)
            setLoading(false)
        })
      }catch(e){
        console.error(e.message)
      }
    }    

    let flatListRef = useRef(null);
    
    const scrollNext = () => {
      if (index !== data.length - 1) {
        flatListRef.current.scrollToIndex({
          index: index + 1,
          animated: true,
        });
      }
      setIndex(index+1)
    };
    const scrollPrevious = () => {
      if (index !== 0) {
        flatListRef.current.scrollToIndex({
          index: index - 1,
          animated: true,
        });
      }

      setIndex(index-1)

    };
    useEffect(()=>console.log('index',index),[index])
    useEffect(()=>{getImages()},[])
    if(loading){
      return <View style={[display, styles.imageDisplay]}>
        <Image style={imageDisplay}></Image>
        <Text>Loading Images Source</Text>
      </View>  
    }
    return (
        <View style={display}>
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                data={data}
                ref={flatListRef}
                keyExtractor={(item, index)=>item.title+index}
                onLayout={()=>flatListRef.current.scrollToIndex({index: index,animated: false})}
                renderItem={({item}) =>
                <View>
                  {item.image?<Image key={item.title} style={[styles.imageDisplay,imageDisplay]} source={{uri: item.image}}/>
                  :<View style={[styles.imageDisplay,imageDisplay]} key={item.title}><Text style={styles.noSourceText}>No images source</Text></View>}
                  <Text style={[styles.imageFoot, imageFoot]}>
                    {item.title}
                  </Text>
                </View>
                }
            />
            <View style={styles.buttonContainer}>
            <Button style={styles.button}
            onPress={()=>scrollPrevious()} 
            disabled={index===0} 
            title='PREV'/>
            <Button style={styles.button}
            onPress={()=>scrollNext()}
            disabled={index === data.length - 1} 
            title='NEXT'/>
            </View>
        </View>
    );    




}
export default Carousel

const styles = StyleSheet.create({
  frame:{
    textAlign: 'center',
    backgroundColor: 'darkgrey',
    color: 'white',
    borderRadius: 10,
    height:40
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    marginTop: 5,
    height: 30
  },
  imageDisplay:{
    marginBottom:0,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSourceText:{
    color: 'silver',
    fontSize: 20,
    fontWeight: 'bold'
  },
  imageFoot:{
    color: 'white',
    backgroundColor: 'grey',
  }
});