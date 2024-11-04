import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_API_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_TOKEN,
)

export default supabase
