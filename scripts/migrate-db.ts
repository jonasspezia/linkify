import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function runMigration() {
    try {
        // Testar conexão
        const { data: versionData, error: versionError } = await supabase
            .rpc('version');

        if (versionError) {
            console.error('Failed to connect to Supabase:', versionError);
            process.exit(1);
        }

        console.log('Connected to Supabase:', versionData);

        // Criar tabelas uma por uma
        const migrationPath = path.join(process.cwd(), 'supabase/migrations/20250202_initial_schema.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Dividir o SQL em comandos individuais
        const commands = migrationSQL.split(';').filter(cmd => cmd.trim());

        for (const command of commands) {
            if (!command.trim()) continue;

            const { error } = await supabase.rpc('execute_sql', {
                query: command.trim()
            });

            if (error) {
                console.error('Migration command failed:', error);
                console.error('Command:', command.trim());
                process.exit(1);
            }
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

runMigration();
