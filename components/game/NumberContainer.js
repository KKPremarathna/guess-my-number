import { View, Text,StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

export default function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.NumberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:4,
        borderColor:Colors.primary600,
        justifyContent:"center",
        alignItems:"center",
        padding:20,
        marginVertical:24,
        marginHorizontal:48,
        borderRadius:10,
    },
    NumberText:{
        color:Colors.primary600,
        fontSize:32,
        fontWeight:"bold",      
    }
})