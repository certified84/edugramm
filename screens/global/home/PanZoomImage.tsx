import React, { useRef } from 'react';
import { View, PanResponder, Animated, Image } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const PanZoomImage = ({ route }) => {
  const source = route.params.source
  const imageRef = useRef();
  // const baseScale = useRef(new Animated.Value(1)).current;
  // const pinchScale = useRef(new Animated.Value(1)).current;
  // const scale = Animated.multiply(baseScale, pinchScale);
  // const pan = useRef(new Animated.ValueXY()).current;
  // const lastScale = useRef(1);
  // const isPannable = useRef(false);

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => isPannable.current,
  //   onPanResponderMove: (_, gestureState) => {
  //     pan.setValue({
  //       x: gestureState.dx,
  //       y: gestureState.dy,
  //     });
  //   },
  //   onPanResponderRelease: (_, gestureState) => {
  //     pan.flattenOffset();
  //   },
  // });

  // const onPinchGestureEvent = Animated.event(
  //   [{ nativeEvent: { scale: pinchScale } }],
  //   { useNativeDriver: false }
  // );

  // const onPinchHandlerStateChange = (event) => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     lastScale.current *= event.nativeEvent.scale;
  //     baseScale.setValue(lastScale.current);
  //     pinchScale.setValue(1);

  //     // Update pannable based on zoom level
  //     isPannable.current = lastScale.current > 1;
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <Animated.View
          style={[
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        > */}
          <Image
            ref={imageRef}
            style={{ width: '100%', height: '100%' }}
            source={{ uri: source }}
          />
        {/* </Animated.View>
      </PinchGestureHandler> */}
    </View>
  );
};

export default PanZoomImage;
