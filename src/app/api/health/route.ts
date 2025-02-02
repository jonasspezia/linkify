import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { minioClient } from '@/lib/minio';
import redis from '@/lib/redis';
import { geminiModel } from '@/lib/gemini';

const isDev = process.env.NODE_ENV === 'development';

export async function GET() {
    const health = {
        status: 'checking',
        environment: isDev ? 'development' : 'production',
        services: {
            supabase: 'checking',
            minio: isDev ? 'skipped' : 'checking',
            redis: isDev ? 'skipped' : 'checking',
            gemini: 'checking'
        }
    };

    try {
        // Testar Supabase
        try {
            const { data, error } = await supabase.rpc('version');
            health.services.supabase = error ? 'error' : 'connected';
        } catch (e) {
            health.services.supabase = 'error';
            console.error('Supabase error:', e);
        }

        // Testar MinIO (apenas em produção)
        if (!isDev) {
            try {
                await minioClient.bucketExists('laciavision');
                health.services.minio = 'connected';
            } catch (e) {
                health.services.minio = 'error';
                console.error('MinIO error:', e);
            }
        }

        // Testar Redis (apenas em produção)
        if (!isDev) {
            try {
                await redis.ping();
                health.services.redis = 'connected';
            } catch (e) {
                health.services.redis = 'error';
                console.error('Redis error:', e);
            }
        }

        // Testar Gemini
        try {
            health.services.gemini = geminiModel ? 'available' : 'unavailable';
        } catch (e) {
            health.services.gemini = 'error';
            console.error('Gemini error:', e);
        }

        // Verificar status geral (ignorar serviços pulados em desenvolvimento)
        const serviceStatuses = Object.entries(health.services)
            .filter(([_, status]) => status !== 'skipped')
            .map(([_, status]) => status);
            
        const hasErrors = serviceStatuses.some(status => status === 'error');
        health.status = hasErrors ? 'unhealthy' : 'healthy';

        return NextResponse.json(health);
    } catch (error) {
        console.error('Health check failed:', error);
        return NextResponse.json({
            status: 'unhealthy',
            environment: isDev ? 'development' : 'production',
            error: error instanceof Error ? error.message : 'Unknown error',
            services: health.services
        }, { status: 500 });
    }
}
