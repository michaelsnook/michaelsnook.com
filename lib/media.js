import supabase from '../lib/supabase-client'

export async function uploadImage(data) {
  const file = data.image_upload[0]
  const filename = `public/${file.name}-${file.lastModified}`

  const { data: resData, error: resError } = await supabase.storage
    .from('images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: true,
    })
  if (resError) {
    console.log('errors in upload:', resError)
    throw resError
  }

  const { publicURL, error: publicURLError } = supabase.storage
    .from('images')
    .getPublicUrl(filename)
  if (publicURLError) {
    console.log('errors getting public URL:', publicURLError)
    throw publicURLError
  }
  return publicURL
}
