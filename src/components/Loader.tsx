import { useEffect, useRef } from "react";
import { Animated, Easing, Image, View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import { SplashIcon } from "../../assets/svg/SplashIcon";

export const Loader = ({ showLoader }) => {

    const {width, height} = useWindowDimensions()
    const loaderWidth = new Animated.Value(360)
    const loaderHeight = new Animated.Value(600)
    const scale = useRef(new Animated.Value(1)).current;

    const startAnimation = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
    
      useEffect(() => {
        startAnimation()
      }, [showLoader === true]);

      const animatedScale = scale.interpolate({
        inputRange: [1, 1.2],
        outputRange: [1, 1.2],
      });

    return (
        <Modal
            isVisible={showLoader}
            // onBackdropPress={() => {setShowLoader(false)}}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={.8}
            deviceWidth={width}
            deviceHeight={height}
            // onSwipeComplete={(gestureState) => setShowLoader(false)}
        >
            <Animated.View style={{alignSelf: 'center', transform: [{ scale: scale }] }}>
                <SplashIcon />
            </Animated.View>
        </Modal>
    )
}