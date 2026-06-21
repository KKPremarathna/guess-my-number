import { StyleSheet,View } from "react-native";

import Colors from "../utils/Colors";

export default function Card({children}){
    return(
        <View style={styles.InputConatainer}>{children}</View>
    );
}

const styles = StyleSheet.create({
    InputConatainer: {
    alignItems: "center",
    backgroundColor: Colors.primary600,
    marginTop: 50,
    padding: 8,
    marginHorizontal: 25,
    borderRadius: 8,
    //android shadow
    elevation: 10,
    //iOS shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
})