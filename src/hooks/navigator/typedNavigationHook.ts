import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export const useTypedNavigation = () => {
  const navigator = useNavigation<StackNavigationProp<ParamListBase>>;
  return navigator();
};
