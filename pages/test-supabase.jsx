
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TestSupabase() {
    const [status, setStatus] = useState('Testing...')

    useEffect(() => {
        async function checkConnection() {
            try {
                const { data, error } = await supabase.from('test').select('*').limit(1)
                if (error && error.code !== 'PGRST116' && error.code !== '42P01') { // Ignore missing table error
                    console.error('Supabase error:', error)
                    setStatus(`Error: ${error.message}`)
                } else {
                    setStatus('Supabase client initialized successfully! (Connection verified)')
                }
            } catch (err) {
                console.error('Unexpected error:', err)
                setStatus(`Unexpected error: ${err.message}`)
            }
        }
        checkConnection()
    }, [])

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Supabase Integration Test</h1>
            <p className="text-lg">{status}</p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
                <p><strong>Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Missing'}</p>
            </div>
        </div>
    )
}
