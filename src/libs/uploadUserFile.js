import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.js'
import sharp from 'sharp'

export async function uploadUserFile (file) {
    let fileBuffer = await sharp(file.buffer)
    .resize({width:200, height:200, fit: 'cover'})
    .toBuffer()

    const fileRef = ref(storage, `files/users/${file.originalname} ${Date.now()}`)

    const fileMetadata = {
        contentType: file.mimetype
    }
//Ojo con es fileUploadPromise, se puede hacer mas pequeño.

    const fileUploadPromise = uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetadata
    )
    await fileUploadPromise;

    const fileDownloadUrl = await getDownloadURL(fileRef);

    console.log("Carga de archivo exitosa. Referencia de archivo:", fileRef);

    return { ref: fileRef, downloadURL: fileDownloadUrl };

};