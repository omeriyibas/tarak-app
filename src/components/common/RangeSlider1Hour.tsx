import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {
    clamp, interpolate,
    interpolateColor, runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";


const THUMB_SIZE = 32;
const SLIDER_WIDTH = 200; // Fixed width for calculations


type Props = {
    min?: number;
    max?: number;
    initialMin?: number;
    initialMax?: number;
    onValuesChange?: (minValue: number, maxValue: number) => void;
    step?: number;
    trackHeight?: number;
    enableHaptics?: boolean;
    animationDuration?: number;
    rotate?: boolean;
    thumbColor?: string;
    rangeColor?: string;
    prefix?: string;
    suffix?: string;
};

const RangeSlider1Hour = ({
                          min = 0,
                          max = 100,
                          initialMin = 20,
                          initialMax = 80,
                          onValuesChange,
                          step = 1,
                          thumbColor = "bg-secondary-500",
                          rangeColor = "bg-secondary-500",
                          prefix,
                          suffix
                      }: Props) => {

    const [minValue, setMinValue] = useState("10:00")
    const [maxValue, setMaxValue] = useState("22:00")
    const [containerWidth, setContainerWidth] = useState(null) // Will be set by onLayout

    const isMinActive = useSharedValue(false);
    const minThumbPosition = useSharedValue(((initialMin - min) / (max - min)) * containerWidth);
    const minThumbScale = useSharedValue(1);
    const minThumbRotation = useSharedValue(0);


    const isMaxActive = useSharedValue(false);
    const maxThumbPosition = useSharedValue(((initialMax - min) / (max - min)) * containerWidth);
    const maxThumbScale = useSharedValue(1);
    const maxThumbRotation = useSharedValue(0);

    // Update thumb positions when containerWidth changes
    useEffect(() => {
        if (containerWidth && containerWidth > 0) {
            minThumbPosition.value = ((initialMin - min) / (max - min)) * containerWidth;
            maxThumbPosition.value = ((initialMax - min) / (max - min)) * containerWidth;
        }
    }, [containerWidth, initialMin, initialMax, min, max]);

    function percenToTime(yuzde) {
        const baslangic = 6;    // 06:00
        const toplamSaat = 20;  // 20 saatlik aralık

        // yüzdeden geçen saat
        const gecenSaat = (yuzde / 100) * toplamSaat;
        let saat = baslangic + Math.floor(gecenSaat);
        let dakika = Math.round((gecenSaat % 1) * 60);

        // Eğer saat 24'ü geçerse (gece 00-02), 24 çıkart
        if (saat >= 24) {
            saat -= 24;
        }

        // 2 haneli format
        const pad = (n) => n.toString().padStart(2, "0");

        return `${pad(saat)}:${pad(dakika)}`;
    }

    const updateValues = (minVal, maxVal) => {
        onValuesChange && onValuesChange(minVal, maxVal);

        const newMinValue=percenToTime(minVal)
        const newMaxValue=percenToTime(maxVal)
        setMinValue(newMinValue)
        setMaxValue(newMaxValue)

    };


    const positionToValue = (position, containerWidth) => {
        'worklet';
        const percentage = clamp(position / containerWidth, 0, 1);
        const value = min + percentage * (max - min);
        return Math.round(value / step) * step;
    };

    const valueToPosition = (value, containerWidth) => {
        'worklet';
        return ((value - min) / (max - min)) * containerWidth;
    };

    const minPanGesture = Gesture.Pan().onBegin(() => {
        minThumbScale.value = withSpring(1.3, {damping: 12, stiffness: 200});
        // minThumbRotation.value = withTiming(15, {duration: 200});

    }).onChange((event) => {
        if (event.changeX < 0) minThumbRotation.value = withTiming(-15, {duration: 200});
        else if (event.changeX > 0) minThumbRotation.value = withTiming(15, {duration: 200});

        const newPosition = clamp(
            minThumbPosition.value + event.changeX,
            0,
            maxThumbPosition.value - valueToPosition(step, containerWidth)
        );

        minThumbPosition.value = newPosition;

        // Color and opacity changes based on position
        // selectedTrackOpacity.value = interpolate(
        //     newPosition,
        //     [0, containerWidth / 2, containerWidth],
        //     [0.6, 1, 0.8]
        // );

        const minVal = positionToValue(newPosition, containerWidth);
        const maxVal = positionToValue(maxThumbPosition.value, containerWidth);

        runOnJS(updateValues)(minVal, maxVal);
    })

        .onFinalize(() => {
            minThumbScale.value = withSpring(1, {damping: 15, stiffness: 300});
            minThumbRotation.value = withTiming(0, {duration: 300});
        })


    const maxPanGesture = Gesture.Pan().onBegin(() => {
        maxThumbScale.value = withSpring(1.3, {damping: 12, stiffness: 200});
        // minThumbRotation.value = withTiming(15, {duration: 200});

    }).onChange((event) => {
        if (event.changeX < 0) maxThumbRotation.value = withTiming(-15, {duration: 200});
        else if (event.changeX > 0) maxThumbRotation.value = withTiming(15, {duration: 200});

        const newPosition = clamp(
            maxThumbPosition.value + event.changeX,
            minThumbPosition.value + valueToPosition(step, containerWidth),
            containerWidth
        );

        maxThumbPosition.value = newPosition;

        // Color and opacity changes based on position
        // selectedTrackOpacity.value = interpolate(
        //     newPosition,
        //     [0, containerWidth / 2, containerWidth],
        //     [0.6, 1, 0.8]
        // );

        const minVal = positionToValue(minThumbPosition.value, containerWidth);
        const maxVal = positionToValue(newPosition, containerWidth);

        runOnJS(updateValues)(minVal, maxVal);
    })

        .onFinalize(() => {
            maxThumbScale.value = withSpring(1, {damping: 15, stiffness: 300});
            maxThumbRotation.value = withTiming(0, {duration: 300});
        })

    const minThumbStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            isMinActive.value ? 1 : 0,
            [0, 1],
            ['#007AFF', '#0051D5']
        );

        return {
            transform: [
                {translateX: minThumbPosition.value - THUMB_SIZE / 2},
                {scale: minThumbScale.value},
                {rotate: `${minThumbRotation.value}deg`},
            ] as any,
            // backgroundColor,
            // borderColor: isMinActive.value ? '#FF6B6B' : 'white',
        };
    });

    const maxThumbStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            isMaxActive.value ? 1 : 0,
            [0, 1],
            ['#007AFF', '#0051D5']
        );

        return {
            transform: [
                {translateX: maxThumbPosition.value - THUMB_SIZE / 2},
                {scale: maxThumbScale.value},
                {rotate: `${maxThumbRotation.value}deg`},
            ] as any,
            // backgroundColor,
            // borderColor: isMaxActive.value ? '#FF6B6B' : 'white',
        };
    });

    const selectedTrackStyle = useAnimatedStyle(() => {
        const width = maxThumbPosition.value - minThumbPosition.value;
        // const backgroundColor = interpolateColor(
        //     width / SLIDER_WIDTH,
        //     [0, 0.5, 1],
        //     ['#FF6B6B', '#4ECDC4', '#45B7D1']
        // );


        return {
            left: minThumbPosition.value,
            width,
            // backgroundColor,
            // opacity: selectedTrackOpacity.value,
        };
    });


    return (<GestureHandlerRootView
        style={styles.sliderContainer}
        onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
        }}
    >


            <View style={styles.track}/>


            <Animated.View className={rangeColor} style={[styles.selectedTrack, selectedTrackStyle]}/>

            {/* Min thumb */}
            <GestureDetector gesture={minPanGesture}>
                <Animated.View  style={[styles.thumb, minThumbStyle]}>
                    <View className={thumbColor} style={styles.thumbInner}/>
                    <Text style={styles.thumbLabel}>{prefix}{minValue}{suffix}</Text>
                </Animated.View>
            </GestureDetector>

            {/* Max thumb */}
            <GestureDetector gesture={maxPanGesture}>
                <Animated.View style={[styles.thumb, maxThumbStyle]}>
                    <View className={thumbColor} style={styles.thumbInner}/>
                    <Text style={styles.thumbLabel}>{prefix}{maxValue}{suffix}</Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>

    )
        ;
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 30,


        // paddingHorizontal: 20,
        // marginHorizontal: 50,
    },
    thumb: {
        position: 'absolute',
        width: THUMB_SIZE+20,
        // height: THUMB_SIZE,
        // borderRadius: THUMB_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 3,
        // elevation: 6,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 3},
        // shadowOpacity: 0.3,
        // shadowRadius: 4.65,
    },
    thumbInner: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderWidth: 3,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        borderColor:"white"
    },
    thumbLabel: {
        position: 'absolute',
        bottom: -32,
        fontSize: 18,
        // fontWeight: 'bold',
        color: '#7f8c8d',
        letterSpacing: 0.5,
    },
    track: {
        width: '100%',
        height: 10,
        backgroundColor: '#bdc3c7',
        borderRadius: 10,
    },
    selectedTrack: {
        position: 'absolute',
        height: 10,
        borderRadius: 3,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // left: 100,


    },
    scale: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        marginTop: 20,
    },
    scaleMarker: {
        alignItems: 'center',
    },
    scaleMarkerLine: {
        width: 1,
        height: 8,
        backgroundColor: '#95a5a6',
        marginBottom: 4,
    },
    scaleText: {
        fontSize: 12,
        color: '#7f8c8d',
        fontWeight: '500',
    },
})
export default RangeSlider1Hour;
