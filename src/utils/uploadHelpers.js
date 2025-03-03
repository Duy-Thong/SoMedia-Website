import { put } from "@vercel/blob";

const BLOB_TOKEN = 'vercel_blob_rw_vuBTDxs1Af4OyipF_7ktfANNunJPJCY1OsqLo4fevvrPM6A';
window.BLOB_READ_WRITE_TOKEN = BLOB_TOKEN;

export const uploadToBlob = async (file, folder = 'departments') => {
    try {
        const { url } = await put(
            `SoMedia/assets/${folder}/${file.name}`,
            file,
            {
                access: 'public',
                token: BLOB_TOKEN
            }
        );
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
