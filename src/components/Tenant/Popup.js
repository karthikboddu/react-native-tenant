import React from 'react'
import { Alert, Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../../constants'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const Popup = ({config}) => {
    const [state, setState] = [
        {
            title: config.title,
			type: config.type,
			icon: config.icon !== undefined ? config.icon : false,
			textBody: config.textBody,
			button: config.button !== undefined ? config.button : true,
			buttonText: config.buttonText || 'Ok',
			callback: config.callback !== undefined ? config.callback : defaultCallback(),
			background: config.background || 'rgba(0, 0, 0, 0.5)',
			timing: config.timing,
			autoClose: config.autoClose !== undefined ? config.autoClose : false,
            positionView: new Animated.Value(HEIGHT),
            opacity: new Animated.Value(0),
            positionPopup: new Animated.Value(HEIGHT),
            popupHeight: 0
           }
    ]
    React.useEffect(() => {
        start(config);
        hidePopup()
    }, [])


    
    console.log(config)
	const handleImage = (type) => {
		switch (type) {
			case 'Success': return icons.successImage
			case 'Danger': return icons.ErrorImage
			case 'Warning': return icons.WarningImage
		}
	}

    function show  ({ ...config })  {
        start(config);
    }

    const hide = async() => {
        hidePopup()
    }
    
    console.log(state)

    function defaultCallback () {
		return Alert.alert(
			'Callback!',
			'Callback complete!',
			[
				{ text: 'Ok', onPress: () => hidePopup() }
			]
		)
	}

    // function defaultHide () {
    //     console.log(state);
    //     hidePopup() 
    // }
    const  hidePopup  =() => {
        
        const positionPopup = new Animated.Value(HEIGHT);
        const opacity = new Animated.Value(0);
        const positionView= new Animated.Value(HEIGHT);
        console.log("ASD" ,positionView)
		Animated.sequence([
			Animated.timing(positionPopup, {
				toValue: HEIGHT,
				duration: 250,
				useNativeDriver: true
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.timing(positionView, {
				toValue: HEIGHT,
				duration: 100,
				useNativeDriver: false
			})
		]).start()
	}

    const start = ({ ...config }) => {
        

		Animated.sequence([
			Animated.timing(state.positionView, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}),
			Animated.timing(state.opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.spring(state.positionPopup, {
				toValue: (HEIGHT / 2) - (state.popupHeight / 2),
				bounciness: 15,
				useNativeDriver: true
			})
		]).start()

		if (config.autoClose && config.timing !== 0) {
			const duration = config.timing > 0 ? config.timing : 5000
			setTimeout(() => {
				hidePopup()
			}, duration)
		}
    }

    let el = null;
    if (state.button) {
        el = <TouchableOpacity style={[styles.Button, styles[state.type]]} onPress={hidePopup()}>
            <Text style={styles.TextButton}>{state.buttonText}</Text>
        </TouchableOpacity>
    }
    else {
        el = <Text></Text>
    }

  return (
    <View style={{flex :1}}>
      <Animated.View
				style={[styles.Container, {
					backgroundColor: 'transparent',
					opacity: state.opacity,
					transform: [
						{ translateY: state.positionView }
					]
				}]}>
				<Animated.View

					style={[styles.Message, {
                        transform: [
							{ translateY: state.positionPopup }
						]
					}]}

				>
					<View style={styles.Header} />
					{
						false ? (false) :
							<Image
								source={handleImage('Success')}
								resizeMode="contain"
								style={styles.Image}
							/>
					}
					<View style={styles.Content}>
						<Text style={styles.Title}>{state.title}</Text>
						<Text style={styles.Desc}>{state.textBody}</Text>
                        {el}
					</View>
				</Animated.View>
			</Animated.View>
    </View>
  )
}

export default Popup

const styles = StyleSheet.create({
    Container: {
		position: 'absolute',
		zIndex: 99999,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignItems: 'center',
		top: 0,
		left: 0
	},
	Message: {
		maxWidth: 300,
		width: 230,
		minHeight: 300,
		backgroundColor: '#fff',
		borderRadius: 30,
		alignItems: 'center',
		overflow: 'hidden',
		position: 'absolute',
	},
	Content: {
		padding: 20,
		alignItems: 'center'
	},
	Header: {
		height: 230,
		width: 230,
		backgroundColor: '#FBFBFB',
		borderRadius: 100,
		marginTop: -120
	},
	Image: {
		width: 150,
		height: 80,
		position: 'absolute',
		top: 20
	},
	Title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#333'
	},
	Desc: {
		textAlign: 'center',
		color: '#666',
		marginTop: 10
	},
	Button: {
		borderRadius: 50,
		height: 40,
		width: 130,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30
	},
	TextButton: {
		color: '#fff',
		fontWeight: 'bold'
	},
	Success: {
		backgroundColor: '#AAF577',
		shadowColor: "#AAF577",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	Danger: {
		backgroundColor: '#F29091',
		shadowColor: "#F29091",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	Warning: {
		backgroundColor: '#fbd10d',
		shadowColor: "#fbd10d",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	}
})