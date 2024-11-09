import { createClient } from '@supabase/supabase-js'
import type { Database } from 'types/supabase'

const supabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_API_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_TOKEN,
)

export default supabase
