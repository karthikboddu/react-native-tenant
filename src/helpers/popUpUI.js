import { Platform } from 'react-native';

console.log("ASD")
async function successPopup() {
    var Popup = ''
    if (Platform.OS != 'web') {
        console.log("ASD")
        //Popup = lazy(() => import('popup-ui'))
    }
    Popup.show({
        type: 'Success',
        title: 'Payment Success',
        button: true,
        textBody: 'Congrats! Your payment is successfully completed',
        buttonText: 'Ok',
        callback: () => Popup.hide()
    })

}

async function failedPopup() {
    var Popup = ''
if (Platform.OS != 'web') {
    console.log("ASD")
    //Popup = lazy(() => import('popup-ui'))
}
    Popup.show({
        type: 'Warning',
        title: 'Payment Failed',
        button: true,
        textBody: 'Payment failed, Please try again',
        buttonText: 'Ok',
        callback: () => Popup.hide()
    })

}
export {
    successPopup,
    failedPopup
};
