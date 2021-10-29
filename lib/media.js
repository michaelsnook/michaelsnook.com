import supabase from '../lib/supabase-client'
// const image_base_url =

function filenameFromFile(file) {
  // e.g. 18f4b9 based on the time on the file
  const hash = Math.round(file.lastModified * 0.000001).toString(16)
  // e.g. ['pic-of-my-cat', 'jpg']
  let nameparts = file.name.split('.')
  const ext = nameparts.pop()
  // e.g.
  const path = `${nameparts.join('.')}-${hash}.${ext}`

  return path
}

export async function uploadImage(file) {
  const filename = filenameFromFile(file)

  const { error } = await supabase.storage
    .from('images')
    .upload(`public/${filename}`, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.log('errors in upload:', error)
    throw error
  }

  return filename
}
