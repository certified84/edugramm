import { useEffect, useRef } from "react";
import { Image, View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";

export const ImageDialog = ({ showImageDialog, setShowImageDialog, image, }) => {

    const {width, height} = useWindowDimensions()

    return (
        <Modal
            isVisible={showImageDialog}
            onBackdropPress={() => setShowImageDialog(false)}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={.4}
            deviceWidth={width}
            deviceHeight={height}
            onSwipeComplete={(gestureState) => setShowImageDialog(false)}
        >
            <Image source={{ uri: image }} style={{ width: width * .9, height: height * .55 }}/>
        </Modal>
    )
}