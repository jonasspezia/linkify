import { Client } from 'minio';

export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT!.replace('https://', '').replace('http://', ''),
    port: 443,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
    region: 'us-east-1' // Região padrão
});

export const BUCKET_NAME = process.env.MINIO_BUCKET!;

// Função helper para upload de arquivos
export async function uploadFile(file: Buffer, fileName: string, contentType: string) {
    try {
        await minioClient.putObject(BUCKET_NAME, fileName, file, {
            'Content-Type': contentType,
        });
        return `https://${process.env.MINIO_S3_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}
