import {ViewStyle} from 'react-native';

interface IDropdown {
  maxHeight?: number;
  buttonContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  listItemContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  data: any;
  renderButton: () => JSX.Element;
  renderItem: ({
    item,
    onSelectedItem,
  }: {
    item: any;
    onSelectedItem: () => void;
  }) => JSX.Element;
  rightIcon: () => JSX.Element;
  ItemSeparatorComponent?: () => JSX.Element;
}

interface IDropdownController {
  maxHeight: number;
}

export type {IDropdown, IDropdownController};
