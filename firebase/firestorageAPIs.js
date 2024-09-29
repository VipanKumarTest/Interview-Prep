import { storage } from "./firebaseConfig";

export const uploadFile = async (uri, path) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = storage.ref(path);
        await ref.put(blob);
        return await ref.getDownloadURL();
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error;
    }
};

export const deleteFile = async (path) => {
    try {
        const ref = storage.ref(path);
        await ref.delete();
    } catch (error) {
        console.error("Error deleting file: ", error);
        throw error;
    }
};