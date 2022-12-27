import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { LoadingScreen } from './LoadingScreen';

const {
  width,
} = Dimensions.get('screen');

const {
  height,
} = Dimensions.get('screen');

type SlidersComponentProps = {};

const Sliders: React.FunctionComponent<SlidersComponentProps> = () => {
  const [value, setValue] = useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [key, setKey] = useState(0);
  const [showLandingPage, setShowLanding] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };
  const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#4b0082'];

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    return `${minutes}:${seconds}`
  }

  return (
    <>
      {
        loading ? (
          <LoadingScreen />
        ) :
          (
            <View style={styles.container}>
              {showLandingPage &&
                <View style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', top: height * 0.32 }}>
                  <Image
                    style={{
                      width: width,
                      height: height * 0.4,
                      bottom: 120,
                      // height: '80%',
                      aspectRatio: 1,
                      resizeMode: 'stretch',
                      backgroundColor: '#000000'
                    }}
                    source={require("./assets/q2.png")}
                  />
                </View>
              }
              {showControls &&
                <View style={styles.playReset}>
                  <FontAwesome
                    name={isPlaying ? 'stop' : 'play'}
                    size={35}
                    color={isPlaying ? '#800080' : '#008000'}
                    onPress={() =>
                      setIsPlaying(prev => !prev)
                    }
                  />
                  <FontAwesome
                    name='repeat'
                    size={35}
                    color='#008000'
                    onPress={() =>
                      setKey(prevKey => prevKey + 1)
                    }
                  />
                </View>
              }
              {isPlaying &&
                <View style={styles.counterCircle}>
                  <CountdownCircleTimer
                    key={key}
                    isPlaying={isPlaying}
                    size={220}
                    duration={value}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 2 })}
                    updateInterval={1}
                  >
                    {({ remainingTime, color }) => (

                      <Text style={{ color, fontSize: 40 }}>
                        {Math.floor(remainingTime / 60)}: {remainingTime % 60}
                      </Text>
                    )}
                  </CountdownCircleTimer>
                </View>
              }
              <View style={styles.contentView}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={colors}
                  style={styles.linearGradient}>
                  <Slider
                    value={value}
                    onValueChange={(val) => {
                      setValue(val)
                      setShowLanding(false)
                      setIsPlaying(true)
                      setShowControls(true)
                    }}
                    maximumValue={100}
                    minimumValue={0}
                    step={1}
                    allowTouchTrack
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    thumbProps={{
                      children: (
                        <Icon
                          name="circle"
                          type="font-awesome"
                          size={20}
                          reverse
                          containerStyle={{ bottom: 20, right: 20 }}
                          color='black'
                        />
                      ),
                    }}
                  />
                </LinearGradient>
              </View>
            </View>
          )
      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  thumbStyle:
  {
    top: height * 0.014,
    width: width * 0.08,
    backgroundColor: 'transparent',
  },
  trackStyle:
  {
    height: 0,
    backgroundColor: 'transparent',
  },
  counterCircle: {
    top: height * 0.10,
    alignSelf: 'center',
  },
  playReset: {
    top: height * 0.53,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  thumb: {
    backgroundColor: '#f8a1d6',
    borderColor: '#a4126e',
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
  contentView: {
    // padding: 20,
    top: height * 0.38,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    height: 500,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
  linearGradient: {
    borderRadius: 20,
    height: 42,
    justifyContent: 'center',
  },
  brightThumb: {
    backgroundColor: 'grey',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    width: 20,
  },
});

export default Sliders;
