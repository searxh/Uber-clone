import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import React, { useState } from 'react';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice';
import 'intl'
import 'intl/locale-data/jsonp/th'

const data = [
  {
    id:'Uber-X-123',
    title:'Uber X',
    multiplier:37,
    image:'https://links.papareact.com/3pn',
  },{
    id:'Uber-XL-456',
    title:'Uber XL',
    multiplier:44.4,
    image:'https://links.papareact.com/5w8',
  },{
    id:'Uber-LUX-789',
    title:'Uber LUX',
    multiplier:64.75,
    image:'https://links.papareact.com/7pf',
  },
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [ selected, setSelected ] = useState<any>(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('NavigateCard' as never)}
        style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}>
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item:{ id, title, multiplier, image },item }:any)=>(
          <TouchableOpacity 
          onPress={()=> setSelected(item)}
          style={tw`flex-row justify-between items-center px-5 ${id === selected?.id?'bg-gray-200':''}`}
          >
            <Image
              style={{
                width:80,
                height:80,
                resizeMode:'contain',
              }}
              source={{ uri:image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-lg`}>
              {new Intl.NumberFormat('th-TH',{
                style:'currency',
                currency:'THB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(
                (travelTimeInformation?.duration?.value * 
                  SURGE_CHARGE_RATE * multiplier)/100
              )}
            </Text>
          </TouchableOpacity>

        )}
      />
      <View>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 
        ${!selected?'bg-gray-300':''} rounded`}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
