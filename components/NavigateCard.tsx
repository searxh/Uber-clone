import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import React, { useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { selectDestinationFill } from '../slices/fillSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from '../components/NavFavorites'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  const placesRef = useRef<any>(null)
  const destinationFill = useSelector(selectDestinationFill)
  useEffect(()=>{
    if (!destinationFill) return;
    placesRef.current.setAddressText(destinationFill)
    placesRef.current.focus()
  },[destinationFill])

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Good Morning, Search!
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            ref={placesRef}
            placeholder='Where to?'
            styles={toInputBoxStyles}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data,details = null)=>{
              dispatch(
                setDestination({
                location: details?.geometry.location,
                description: data.description,
              }))
              navigation.navigate('RideOptionsCard' as never)
            }}
            textInputProps={{returnKeyType:'search'}}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language:'en',
            }}
          />
        </View>
        <NavFavorites set='destination'/>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    paddingTop:20,
    flex:0,
  },
  textInput:{
    backgroundColor:'#DDDDDF',
    borderRadius:0,
    fontSize:18,
  },
  textInputContainer: {
    paddingHorizontal:20,
    paddingBottom:0,
  }
})
