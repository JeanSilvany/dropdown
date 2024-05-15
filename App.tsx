import React, {useCallback, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Dropdown} from './src/components/Dropdown';

export const App = () => {
  const RightIcon = useCallback(
    () => (
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/120/120890.png',
        }}
        style={{width: 20, height: 20}}
      />
    ),
    [],
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={{height: 1, backgroundColor: '#DDD'}} />,
    [],
  );

  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}>
          <Dropdown
            data={data}
            renderButton={() => (
              <View style={{padding: 10}}>
                <Text>{selectedValue ?? 'Select a value'}</Text>
              </View>
            )}
            buttonContainerStyle={{
              width: '50%',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              borderColor: '#DDD',
            }}
            listItemContainerStyle={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#DDD',
            }}
            renderItem={({item, onSelectedItem}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(item);
                  onSelectedItem();
                }}
                style={{
                  padding: 10,
                  backgroundColor: '#FFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemSeparatorComponent}
            maxHeight={300}
            showsVerticalScrollIndicator
            rightIcon={RightIcon}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
