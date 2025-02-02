/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
        MINIO_BUCKET: process.env.MINIO_BUCKET,
        MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
        MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
        MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
        MINIO_S3_ENDPOINT: process.env.MINIO_S3_ENDPOINT,
        REDIS_URL: process.env.REDIS_URL,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    },
    images: {
        domains: [
            'backend.laciavision.com',
            'bucket.laciavision.com',
            'buckets3.laciavision.com'
        ],
    },
}
