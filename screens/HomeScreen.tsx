import { View, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import { selectOriginFill } from '../slices/fillSlice'
import NavFavorites from '../components/NavFavorites'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const placesRef = useRef<any>(null)
  const originFill = useSelector(selectOriginFill)
  useEffect(()=>{
    if (!originFill) return;
    placesRef.current.setAddressText(originFill)
    placesRef.current.focus()
  },[originFill])

   return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
        }}
        source={{
            uri:'https://links.papareact.com/gzs',
        }}/>
        <GooglePlacesAutocomplete 
          ref={placesRef}
          placeholder='Where From?'
          styles={{
            container:{
              flex: 0,
            },
            textInput:{
              fontSize: 18,
            },
          }}
          onPress={(data,details=null)=>{
            dispatch(
              setOrigin({
              location: details?.geometry.location,
              description: data.description,
            }))
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          textInputProps={{returnKeyType:'search'}}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />
      </View>
      <View style={tw`p-5`}>
        <NavOptions/>
        <NavFavorites set='origin'/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
