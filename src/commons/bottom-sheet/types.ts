import {ImageSourcePropType, TouchableOpacityProps} from 'react-native';

export type BottomSheetOption = {
  icon: ImageSourcePropType;
  title: string;
  subtitle?: string;
};

export type BottomSheetRef = {
  open: () => void;
  dismiss: () => void;
};

export type BottomSheetProps = {
  options: BottomSheetOption[];
  onSelectOption: (option: BottomSheetOption) => void;
};

export type BottomSheetOptionProps = {
  option: BottomSheetOption;
  isFirst: boolean;
  isLast: boolean;
} & TouchableOpacityProps;
