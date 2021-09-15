import React, {useRef,useState, useEffect} from 'react';
import {View, FlatList, Text, Image, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../../../config'

const {serverHost, serverPort, serverEndPoint} = appConfig

const Carousel=(props)=>{
  const endPoint = `${serverHost}:${serverPort}/${serverEndPoint}`
  const display={width:parseInt(props.width)||300, height: parseInt(props.height)||300}
  const[data, setData]=useState([{title:'',image:''}])
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
    return (
      <View><Text>Getting Carousel Data</Text></View>
    )
  }
    return (
        <View style={styles.container, display}>
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                data={data}
                ref={flatListRef}
                keyExtractor={(item)=>item.title}
                onLayout={()=>flatListRef.current.scrollToIndex({index: index,animated: false})}
                renderItem={({item}) =>
                <View>
                  <Image key={item.title} style={styles.image, display} source={{uri: item.image}}/>
                  <Text style={styles.frame}>{item.title}</Text>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  frame:{
    textAlign: 'center'
  },
  image: {    
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent: 'space-evenly'
  },
  button:{
    borderColor: 'grey',
    margin: 5,
  }
});
export default Carousel