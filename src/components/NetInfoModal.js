import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

const Button = ({ children, ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const Modals = ({ show, onRetry, isRetrying }) => {
  const [state, setState] = React.useState({
    isVisible: true
  })

  // hide show modal
  const displayModal = (show) => {
    console.log(show)
    setState({ isVisible: show })

  }


  return (
    <View>
      <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Connection Error</Text>
          <Text style={styles.modalText}>
            Oops! Looks like your device is not connected to the Internet.
          </Text>
          <Button onPress={onRetry} disabled={isRetrying}>
            Try Again
          </Button>
        </View>
      </Modal>
    </View>
  )
}

export default Modals

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  }
});
