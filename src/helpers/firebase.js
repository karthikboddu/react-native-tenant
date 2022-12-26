// import storage from '@react-native-firebase/storage';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';


export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
} 

export async function pickProfileImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    return result;
} 

export async function openCameraProfileImage() {
    //let result = await ImagePicker.openCamera({
        //    width: 1200,
       //     height: 780,
        //    cropping: true,
        //});

        //return result;
}
export async function pickImageFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      return result;
}
export async function askForPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

export async function getFileInfo (fileURI) {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
 }
 
 export async function isLessThanTheMB (fileSize, smallerThanSizeMB) {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
 }

// export async function uploadImage(uri, path, fName) {
//     // Why are we using XMLHttpRequest? See:
//     // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//     // const blob = await new Promise((resolve, reject) => {
//     //     const xhr = new XMLHttpRequest();
//     //     xhr.onload = function () {
//     //         resolve(xhr.response);
//     //     };
//     //     xhr.onerror = function (e) {
//     //         console.log(e);
//     //         reject(new TypeError("Network request failed"));
//     //     };
//     //     xhr.responseType = "blob";
//     //     xhr.open("GET", uri, true);
//     //     xhr.send(null);
//     // });


//     if (uri == null) {
//         return null;
//     }
//     const uploadUri = uri;
//     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

//     // Add timestamp to File Name
//     const extension = filename.split('.').pop();
//     const name = filename.split('.').slice(0, -1).join('.');
//     filename = name + Date.now() + '.' + extension;

//     const fileName = filename;
//     const storageRef = storage().ref(`${path}/${fileName}`);

//     const task = storageRef.putFile(uploadUri);


//     // Set transferred state
//     task.on('state_changed', (taskSnapshot) => {
//         console.log(
//             `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
//         );
//     });

//     try {
//         await task;
//         const url = await storageRef.getDownloadURL();
//         return { url, fileName };
//     } catch (error) {
//         console.log(e);
//         return null;
//     }
    

// }