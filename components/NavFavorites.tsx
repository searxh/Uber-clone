import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setOriginFill, setDestinationFill } from '../slices/fillSlice'

interface RenderItemTypes {
    item:{
        id:string
        icon:string
        location:string
        destination:string
    }
}
interface ItemTypes {
    id:string
    icon:string
    location:string
    destination:string
}
interface NavFavoritesProps {
    set:string
}
const data = [
    {
        id:'123',
        icon:'home',
        location:'Home',
        destination: 'Code Street, London, UK',
    },
    {
        id:'456',
        icon:'briefcase',
        location:'Work',
        destination:'London Eye, London, UK',
    },
]
const NavFavorites = ({set}:NavFavoritesProps) => {
    const placesRef = useRef<any>(null)
    const dispatch = useDispatch()
    return (
        <FlatList
            data={data}
            keyExtractor={(item:ItemTypes)=>item.id}
            ItemSeparatorComponent={()=>(
                <View style={[tw`bg-gray-200`,{height:0.5}]}></View>
            )}
            renderItem={({item:{ location, destination, icon }}:RenderItemTypes)=>(
                <TouchableOpacity 
                    style={tw`flex-row items-center p-5`}
                    onPress={()=>{
                        if (set==='origin') {
                            dispatch(
                                setOriginFill(destination)
                            )
                        } else if (set=='destination') {
                            dispatch(
                                setDestinationFill(destination)
                            )
                        }
                    }}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type='ionicon'
                        color='white'
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>
                            {location}
                        </Text>
                        <Text style={tw`text-gray-500`}>
                            {destination}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            />
    );
};

export default NavFavorites;

const styles = StyleSheet.create({});
