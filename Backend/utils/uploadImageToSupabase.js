const supabase = require("../config/supabase"); // Import Supabase client
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

// Upload image to Supabase storage
const uploadImageToSupabase = async (
  fileBuffer,
  fileName,
  bucketName = "PlateFull"
) => {
  try {
    // Generate a unique file name using UUID
    const uniqueFileName = `${uuidv4()}-${fileName}`;

    // Upload the file to the specified bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, fileBuffer);

    if (error) {
      throw error;
    }

    // Get the public URL of the uploaded file
    const { publicUrl } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadImageToSupabase;
