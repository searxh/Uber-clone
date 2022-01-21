import { View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 h-full`}>
        <Image style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
        }}
        source={{
            uri:'https://links.papareact.com/gzs',
        }}/>
        <NavOptions/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
