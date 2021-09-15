import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import Slogan from '../assets/splashprova.png';
import Slogan from "../assets/splash.png";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const Splash = () => {
  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 5000 });
  }, []);

  const splashAnimation = useSharedValue(0);

  const splahStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0,25,50], [0, 0.3,1], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={splahStyle}>
        <Slogan />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
