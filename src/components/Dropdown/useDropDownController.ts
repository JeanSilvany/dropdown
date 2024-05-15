import {useCallback, useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {IDropdownController} from './types';

export const useDropDownController = ({maxHeight}: IDropdownController) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [layoutStyles, setLayoutStyles] = useState({
    buttonComponent: {
      height: 0,
      width: 0,
    },
  });

  const buttonComponentRef = useRef<TouchableOpacity>(null);

  const expandedAnimationValue = useSharedValue(0);

  const listContainerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      expandedAnimationValue.value,
      [0, 1],
      [0, maxHeight],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      expandedAnimationValue.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          expandedAnimationValue.value,
          [0, 1],
          [-layoutStyles.buttonComponent.height, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
    display: expandedAnimationValue.value === 0 ? 'none' : 'flex',
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          expandedAnimationValue.value,
          [0, 1],
          [0, -180],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const buttonComponentOnLayout = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buttonComponentRef.current?.measure((x, y, width, height, pageX, pageY) => {
      if (
        height === layoutStyles.buttonComponent.height ||
        width === layoutStyles.buttonComponent.height
      ) {
        return;
      }

      setLayoutStyles(oldState => {
        return {
          ...oldState,
          buttonComponent: {
            height: height,
            width: width,
          },
        };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    expandedAnimationValue.value = withTiming(isExpanded ? 1 : 0, {
      easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
    });
  }, [isExpanded, expandedAnimationValue]);

  return {
    expandedAnimationValue,
    listContainerAnimatedStyle,
    iconAnimatedStyle,
    isExpanded,
    setIsExpanded,
    buttonComponentRef,
    buttonComponentOnLayout,
    layoutStyles,
  };
};
