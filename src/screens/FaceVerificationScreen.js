import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector"
import { Alert, Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { contains } from "../assets/components/contains";
import MaskedView from "@react-native-masked-view/masked-view";

const { width: windowWidth } = Dimensions.get("window");

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

const instructionsText = {
  initialPrompt: "Position your face in the circle",
  performActions: "Keep the device still and perform the following actions:",
  tooClose: "You're too close. Hold the device further.",
};

const detections = {
  BLINK: { instruction: "Blink both eyes", minProbability: 0.3 },
  TURN_HEAD_LEFT: { instruction: "Turn head left", maxAngle: -10 },
  TURN_HEAD_RIGHT: { instruction: "Turn head right", minAngle: 10 },
  NOD: { instruction: "Nod", minDiff: 1.5 },
  SMILE: { instruction: "Smile", minProbability: 0.7 },
};

const detectionsList = ["BLINK", "TURN_HEAD_LEFT", "TURN_HEAD_RIGHT", "NOD", "SMILE"];

const initialState = {
  faceDetected: "no",
  faceTooBig: "no",
  detectionsList,
  currentDetectionIndex: 0,
  progressFill: 0,
  processComplete: false,
};

const detectionReducer = (state, action) => {
  switch (action.type) {
    case "FACE_DETECTED":
      if (action.payload === "yes") {
        return {
          ...state,
          faceDetected: action.payload,
          progressFill: 100 / (state.detectionsList.length + 1),
        };
      } else {
        // Reset
        return initialState;
      }
    case "FACE_TOO_BIG":
      return { ...state, faceTooBig: action.payload };
    case "NEXT_DETECTION":
      const nextDetectionIndex = state.currentDetectionIndex + 1;
      const progressMultiplier = nextDetectionIndex + 1;
      const newProgressFill = (100 / (state.detectionsList.length + 1)) * progressMultiplier;
      if (nextDetectionIndex === state.detectionsList.length) {
        return {
          ...state,
          processComplete: true,
          progressFill: newProgressFill,
        };
      }
      return {
        ...state,
        currentDetectionIndex: nextDetectionIndex,
        progressFill: newProgressFill,
      };
    default:
      throw new Error("Unexpected action type.");
  }
};

export default function FaceVerificationScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [state, dispatch] = useReducer(detectionReducer, initialState);
  const rollAngles = useRef([]);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  const onFacesDetected = (result) => {
    if (result.faces.length !== 1) {
      dispatch({ type: "FACE_DETECTED", payload: "no" });
      return;
    }

    const face = result.faces[0];
    const faceRect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height,
    };

    const edgeOffset = 50;
    const faceRectSmaller = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2,
    };
    const previewContainsFace = contains({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller,
    });
    if (!previewContainsFace) {
      dispatch({ type: "FACE_DETECTED", payload: "no" });
      return;
    }

    if (state.faceDetected === "no") {
      const faceMaxSize = PREVIEW_SIZE - 90;
      if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
        dispatch({ type: "FACE_TOO_BIG", payload: "yes" });
        return;
      }

      if (state.faceTooBig === "yes") {
        dispatch({ type: "FACE_TOO_BIG", payload: "no" });
      }
    }

    if (state.faceDetected === "no") {
      dispatch({ type: "FACE_DETECTED", payload: "yes" });
    }

    const detectionAction = state.detectionsList[state.currentDetectionIndex];

    switch (detectionAction) {
      case "BLINK":
        const leftEyeClosed = face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rightEyeClosed = face.rightEyeOpenProbability <= detections.BLINK.minProbability;
        if (leftEyeClosed && rightEyeClosed) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "NOD":
        rollAngles.current.push(face.rollAngle);
        if (rollAngles.current.length > 10) {
          rollAngles.current.shift();
        }
        if (rollAngles.current.length < 10) return;
        const rollAnglesExceptCurrent = [...rollAngles.current].splice(0, rollAngles.current.length - 1);
        const rollAnglesSum = rollAnglesExceptCurrent.reduce((prev, curr) => {
          return prev + Math.abs(curr);
        }, 0);
        const avgAngle = rollAnglesSum / rollAnglesExceptCurrent.length;
        const diff = Math.abs(avgAngle - Math.abs(face.rollAngle));
        if (diff >= detections.NOD.minDiff) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "TURN_HEAD_LEFT":
        if (face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "TURN_HEAD_RIGHT":
        if (face.yawAngle >= detections.TURN_HEAD_RIGHT.minAngle) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "SMILE":
        if (face.smilingProbability >= detections.SMILE.minProbability) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
    }
  };

  useEffect(() => {
    if (state.processComplete) {
      Alert.alert("Liveness", "Liveness check passed");
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }
  }, [state.processComplete]);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <MaskedView style={StyleSheet.absoluteFill} maskElement={<View style={styles.mask} />}>
        <Camera
          style={StyleSheet.absoluteFill}
          type={Camera.Constants.Type.front}
          onFacesDetected={onFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 125,
            tracking: false,
          }}
        >
          <AnimatedCircularProgress
            style={styles.circularProgress}
            size={PREVIEW_SIZE}
            width={5}
            backgroundWidth={7}
            fill={state.progressFill}
            tintColor="#3485FF"
            backgroundColor="#e8e8e8"
          />
        </Camera>
      </MaskedView>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          {state.faceDetected === "no" && state.faceTooBig === "no" && instructionsText.initialPrompt}

          {state.faceTooBig === "yes" && instructionsText.tooClose}

          {state.faceDetected === "yes" && state.faceTooBig === "no" && instructionsText.performActions}
        </Text>
        <Text style={styles.action}>
          {state.faceDetected === "yes" && state.faceTooBig === "no" && detections[state.detectionsList[state.currentDetectionIndex]].instruction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mask: {
    borderRadius: PREVIEW_SIZE / 10,
    height: PREVIEW_SIZE * 1.5,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: "center",
    backgroundColor: "white",
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE * 2,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    top: 25,
    position: "absolute",
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
  },
  action: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});
