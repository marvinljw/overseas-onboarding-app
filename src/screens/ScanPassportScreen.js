import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import MaskedView from "@react-native-masked-view/masked-view";
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from "expo-image-picker"
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
const maskRowHeight = Math.round((windowHeight - 700) / 10);
const maskColWidth = (windowWidth - 300) / 2;

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

    const handleGotItPress = async () => {
        const data = await camera.takePictureAsync();
        navigation.push('PassportFailed')
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
            <Camera style={styles.camera} type={type} ratio="1:1" ref={(e) => setCamera(e)} >
                <View style={styles.maskOutter}>
                    <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
                        <View style={[{ flex: 30 }, styles.maskCenter]}>
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        <View style={styles.maskInner} />
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                    </View>
                    <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                </View>
            </Camera>

            <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
                    <Text style={styles.buttonText}>Take Picture</Text>
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
    maskOutter: {
        position: 'absolute',
        top: -windowHeight/20,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',  
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { 
        flexDirection: 'row' 
    },
    camera: { 
        aspectRatio: 1,
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