import RangeSlider from "react-native-fast-range-slider/src";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {
    clamp, interpolate,
    interpolateColor, runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";


const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 60;
const THUMB_SIZE = 32;


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
};

const RangeSlider1 = ({
                          min = 0,
                          max = 100,
                          initialMin = 20,
                          initialMax = 80,
                          onValuesChange,
                          step = 1,
                      }: Props) => {

    const isTrackPressed = useSharedValue(false);
    const trackScale = useSharedValue(1);
    const selectedTrackOpacity = useSharedValue(1);


    const isMinActive = useSharedValue(false);
    const minThumbPosition = useSharedValue(((initialMin - min) / (max - min)) * SLIDER_WIDTH);
    const minThumbScale = useSharedValue(1);
    const minThumbRotation = useSharedValue(0);


    const isMaxActive = useSharedValue(false);
    const maxThumbPosition = useSharedValue(((initialMax - min) / (max - min)) * SLIDER_WIDTH);
    const maxThumbScale = useSharedValue(1);
    const maxThumbRotation = useSharedValue(0);

    const updateValues = (minVal, maxVal) => {
        console.log(minVal, maxVal,)
        onValuesChange && onValuesChange(minVal, maxVal);
    };


    const positionToValue = (position) => {
        'worklet';
        const percentage = clamp(position / SLIDER_WIDTH, 0, 1);
        const value = min + percentage * (max - min);
        return Math.round(value / step) * step;
    };

    const valueToPosition = (value) => {
        'worklet';
        return ((value - min) / (max - min)) * SLIDER_WIDTH;
    };

    const trackTapGesture = Gesture.Tap()
        .onBegin(() => {
            isTrackPressed.value = true;
            trackScale.value = withTiming(0.98, {duration: 100});
        })
        .onStart((event) => {
            const tapX = event.x;
            const minDistance = Math.abs(tapX - minThumbPosition.value);
            const maxDistance = Math.abs(tapX - maxThumbPosition.value);


            if (minDistance < maxDistance) {
                const newPosition = clamp(tapX, 0, maxThumbPosition.value - valueToPosition(step));
                minThumbPosition.value = withSpring(newPosition, {
                    damping: 15,
                    stiffness: 150,
                });

                // Animate thumb briefly
                minThumbScale.value = withSpring(1.2, {damping: 10, stiffness: 200});
                minThumbScale.value = withSpring(1, {damping: 15, stiffness: 300});

                const newValue = positionToValue(newPosition);
                const currentMaxValue = positionToValue(maxThumbPosition.value);
                runOnJS(updateValues)(newValue, currentMaxValue);
            } else {
                const newPosition = clamp(tapX, minThumbPosition.value + valueToPosition(step), SLIDER_WIDTH);
                maxThumbPosition.value = withSpring(newPosition, {
                    damping: 15,
                    stiffness: 150,
                });

                maxThumbScale.value = withSpring(1.2, {damping: 10, stiffness: 200});
                maxThumbScale.value = withSpring(1, {damping: 15, stiffness: 300});

                const newValue = positionToValue(newPosition);
                const currentMinValue = positionToValue(minThumbPosition.value);
                runOnJS(updateValues)(currentMinValue, newValue);
            }
        })
        .onFinalize(() => {
            isTrackPressed.value = false;
            trackScale.value = withTiming(1, {duration: 150});
        });


    const minPanGesture = Gesture.Pan().onBegin(() => {
        minThumbScale.value = withSpring(1.3, {damping: 12, stiffness: 200});
        // minThumbRotation.value = withTiming(15, {duration: 200});

    }).onChange((event) => {
        if (event.changeX < 0) minThumbRotation.value = withTiming(-15, {duration: 200});
        else if (event.changeX > 0) minThumbRotation.value = withTiming(15, {duration: 200});

        const newPosition = clamp(
            minThumbPosition.value + event.changeX,
            0,
            maxThumbPosition.value - valueToPosition(step)
        );

        minThumbPosition.value = newPosition;

        // Color and opacity changes based on position
        // selectedTrackOpacity.value = interpolate(
        //     newPosition,
        //     [0, SLIDER_WIDTH / 2, SLIDER_WIDTH],
        //     [0.6, 1, 0.8]
        // );

        const minVal = positionToValue(newPosition);
        const maxVal = positionToValue(maxThumbPosition.value);

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
            minThumbPosition.value + valueToPosition(step),
            SLIDER_WIDTH
        );

        maxThumbPosition.value = newPosition;

        // Color and opacity changes based on position
        // selectedTrackOpacity.value = interpolate(
        //     newPosition,
        //     [0, SLIDER_WIDTH / 2, SLIDER_WIDTH],
        //     [0.6, 1, 0.8]
        // );

        const minVal = positionToValue(minThumbPosition.value);
        const maxVal = positionToValue(newPosition);

        runOnJS(updateValues)(minVal, maxVal);
    })

        .onFinalize(() => {
            maxThumbScale.value = withSpring(1, {damping: 15, stiffness: 300});
            maxThumbRotation.value = withTiming(0, {duration: 300});
        })


    // const composedGesture = Gesture.Simultaneous(
    //     minPanGesture,
    //     maxPanGesture,
    //     // Gesture.Exclusive(
    //     //     minPanGesture,
    //     //     maxPanGesture,
    //     //     // trackTapGesture
    //     // ),
    //     // longPressGesture
    // );

    const trackContainerStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            isTrackPressed.value ? 1 : 0,
            [0, 1],
            ['transparent', 'rgba(0, 122, 255, 0.1)']
        );

        return {
            transform: [{scale: trackScale.value}],
            backgroundColor,
        };
    });

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
            ],
            backgroundColor,
            borderColor: isMinActive.value ? '#FF6B6B' : 'white',
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
            ],
            backgroundColor,
            borderColor: isMaxActive.value ? '#FF6B6B' : 'white',
        };
    });

    const selectedTrackStyle = useAnimatedStyle(() => {
        const width = maxThumbPosition.value - minThumbPosition.value;
        const backgroundColor = interpolateColor(
            width / SLIDER_WIDTH,
            [0, 0.5, 1],
            ['#FF6B6B', '#4ECDC4', '#45B7D1']
        );

        return {
            left: minThumbPosition.value,
            width,
            backgroundColor,
            opacity: selectedTrackOpacity.value,
        };
    });


    return (
        <GestureHandlerRootView>
            <View className={"gap-0"}>
                <View style={styles.sliderContainer}>
                    {/* Background track */}
                    <View style={styles.track}/>

                    {/* Selected track */}
                    <Animated.View style={[styles.selectedTrack, selectedTrackStyle]}/>

                    {/* Min thumb */}
                    <GestureDetector gesture={minPanGesture}>
                        <Animated.View style={[styles.thumb, minThumbStyle]}>
                            <View style={styles.thumbInner}/>
                            <Text style={styles.thumbLabel}>MIN</Text>
                        </Animated.View>
                    </GestureDetector>

                    {/* Max thumb */}
                    <GestureDetector gesture={maxPanGesture}>
                        <Animated.View style={[styles.thumb, maxThumbStyle]}>
                            <View style={styles.thumbInner}/>
                            <Text style={styles.thumbLabel}>MAX</Text>
                        </Animated.View>
                    </GestureDetector>
                </View>
                <View className={"bg-amber-800"} style={styles.scale}>
                    {[min, Math.round((min + max) * 0.25), Math.round((min + max) * 0.5), Math.round((min + max) * 0.75), max].map((value, index) => (
                        <View key={index} style={styles.scaleMarker}>
                            <View style={styles.scaleMarkerLine}/>
                            <Text style={styles.scaleText}>{value}</Text>
                        </View>
                    ))}
                </View>

            </View>
        </GestureHandlerRootView>
    )
        ;
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: 60,
        width: SLIDER_WIDTH,
        justifyContent: 'center',
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    thumb: {
        position: 'absolute',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    thumbInner: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        position: 'absolute',
    },
    thumbLabel: {
        position: 'absolute',
        bottom: -18,
        fontSize: 8,
        fontWeight: 'bold',
        color: '#7f8c8d',
        letterSpacing: 0.5,
    },
    track: {
        width: '100%',
        height: 6,
        backgroundColor: '#bdc3c7',
        borderRadius: 3,
    },
    selectedTrack: {
        position: 'absolute',
        height: 6,
        borderRadius: 3,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
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
export default RangeSlider1;
