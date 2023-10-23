import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import MaskedView from "@react-native-masked-view/masked-view";
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const PREVIEW_SIZE = 325
const PREVIEW_RECT = {
    minX: (windowWidth - PREVIEW_SIZE) / 2,
    minY: PREVIEW_SIZE/4,
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE*1.8,
}

const ScanPassportScreen = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [scaleAnim] = useState(new Animated.Value(1));

    const handleGotItPress = () => {
        navigation.push('Splash')
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // [TODO] Check on Camera Animation
    useEffect(() => {
        // Animate the camera scaling up
        Animated.timing(scaleAnim, {
          toValue: 1.2, // You can adjust the scaling factor
          duration: 1000, // Animation duration in milliseconds
          useNativeDriver: true, // Use the native driver for performance
        }).start();
    }, []);

    // [TODO] Reconsider the need for a Image Picker
    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 1
        });
        if (route.params.updateProfile) return navigation.navigate("profile", { image: data.uri })
        else return navigation.navigate("register", { image: data.uri })
    }

    const clickPicture = async () => {
        const data = await camera.takePictureAsync();
        //[TODO] Replace code after picture is taken -> Scanning passport
        if (route.params.updateProfile) return navigation.navigate("profile", { image: data.uri })
        else return navigation.navigate("register", { image: data.uri })
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <MaskedView style={StyleSheet.absoluteFill} maskElement={<View style={styles.mask} />} >
                <Camera style={styles.camera} type={type} ratio="4:3" ref={(e) => setCamera(e)} />
            </MaskedView>

            <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
                    <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mask: {
      borderRadius: PREVIEW_SIZE / 10,
      height: PREVIEW_RECT.height,
      width: PREVIEW_RECT.width,
      marginTop: PREVIEW_RECT.minY,
      alignSelf: "center",
      backgroundColor: "black",
    },
    camera: { 
        flex: 1, 
        aspectRatio: 1,
        marginTop: PREVIEW_RECT.minY,
        width: windowWidth, // Adjust the width as needed
        height: windowHeight, // Adjust the height as needed    
    },
    btmButton: {
        ...BUTTONS.btmButton
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
        padding: SIZES.small,
        fontSize: SIZES.medium,
    }
})

export default ScanPassportScreen