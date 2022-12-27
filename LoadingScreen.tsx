import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const {
    width,
} = Dimensions.get('screen');

const {
    height,
} = Dimensions.get('screen');

export const LoadingScreen = () => {

    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: width,
                    height: height * 0.4,
                    aspectRatio: 1,
                    resizeMode: 'stretch',
                    backgroundColor: '#000000'
                }}
                source={require("./assets/sapiensys.png")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        // top: height * 0.32
    },
})