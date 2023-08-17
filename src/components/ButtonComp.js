// import liraries
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

function ButtonComp({
  text = 'DONE',
  onPress = () => { },
  disabled = false,
  btnStyle = {},
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: !disabled ? '#D7654D' : 'grey',
        ...btnStyle,

      }}
      disabled={disabled}
    >
      {isLoading ? <ActivityIndicator size="small" /> : <Text style={styles.textStyle}>{text}</Text>}

    </TouchableOpacity>
  );
}

// make this component available to the app
export default ButtonComp;
