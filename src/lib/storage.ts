import {supabase} from "./supabaseClient"

export async function uploadFile(bucket: string, key: string, file: File): Promise<{url: string; provider: string}> {
  const {data: uploadData, error: uploadError} = await supabase.storage.from(bucket).upload(key, file)

  if (uploadError || !uploadData) 
    throw uploadError || new Error("Upload Failed")
  
  const {data: urlData} = supabase
  .storage
  .from(bucket)
  .getPublicUrl(uploadData.path)

  if (!urlData) {
    throw new Error("Failed to generate public URL")
  }


  return {url: urlData.publicUrl, provider: "supabase"}
}

//When you need another provider, add a new branch to this function and choose by env var.