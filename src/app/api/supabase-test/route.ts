import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Teste simples de conexão
        const { data, error } = await supabase
            .from('auth')
            .select('count')
            .limit(1)
            .single();

        if (error) {
            console.error('Erro ao conectar com Supabase:', error);
            return NextResponse.json({
                status: 'erro',
                mensagem: error.message,
                detalhes: {
                    codigo: error.code,
                    dica: error.hint,
                    detalhes: error.details
                }
            }, { status: 500 });
        }

        return NextResponse.json({
            status: 'sucesso',
            conexao: 'estabelecida',
            dados: data
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        return NextResponse.json({
            status: 'erro',
            mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}
