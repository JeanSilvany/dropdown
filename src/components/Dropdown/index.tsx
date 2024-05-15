import React, {FC} from 'react';
import {ListRenderItemInfo, TouchableOpacity, View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {styles} from './styles';

import {useDropDownController} from './useDropDownController';

import {IDropdown} from './types';

export const Dropdown: FC<IDropdown> = ({
  maxHeight = 300,
  buttonContainerStyle,
  contentContainerStyle,
  listItemContainerStyle,
  showsVerticalScrollIndicator,
  data,
  renderButton,
  renderItem,
  rightIcon,
  ItemSeparatorComponent,
}) => {
  const {
    listContainerAnimatedStyle,
    iconAnimatedStyle,
    setIsExpanded,
    buttonComponentRef,
    buttonComponentOnLayout,
    layoutStyles,
  } = useDropDownController({maxHeight});

  const renderButtonItem = () => {
    if (!renderButton) {
      return;
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        ref={buttonComponentRef}
        onLayout={buttonComponentOnLayout}
        style={[styles.buttonItemStyles, buttonContainerStyle]}
        onPress={() => setIsExpanded(oldState => !oldState)}>
        {renderButton()}

        {rightIcon ? (
          <Animated.View style={[iconAnimatedStyle]}>
            {rightIcon()}
          </Animated.View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderFlatListItem = <T,>({item}: ListRenderItemInfo<T>) => {
    return renderItem({
      item,
      onSelectedItem: () => {
        setIsExpanded(false);
      },
    });
  };

  return (
    <View style={styles.container}>
      {renderButtonItem()}
      <Animated.View
        style={[
          {
            top: layoutStyles.buttonComponent.height,
            width: layoutStyles.buttonComponent.width,
          },
          listContainerAnimatedStyle,
          styles.flatListContainer,
          listItemContainerStyle,
        ]}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          renderItem={renderFlatListItem}
          contentContainerStyle={[{zIndex: 1}, contentContainerStyle]}
          ItemSeparatorComponent={ItemSeparatorComponent}
          nestedScrollEnabled
        />
      </Animated.View>
    </View>
  );
};
