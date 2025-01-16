const supabase = require("../config/supabase");
const { v4: uuidv4 } = require("uuid");

const uploadImageToSupabase = async (
  fileBuffer,
  fileName,
  bucketName = "Images"
) => {
  try {
    // Input validation
    if (!fileBuffer || !fileName) {
      throw new Error("File buffer and file name are required");
    }

    // Sanitize the filename and enforce image extension
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");
    const fileExt = cleanFileName.split(".").pop().toLowerCase();

    // Validate file type
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    if (!allowedExtensions.includes(fileExt)) {
      throw new Error("Invalid file type. Only images are allowed.");
    }

    // Generate a unique file name using UUID
    const uniqueFileName = `${uuidv4()}-${cleanFileName}`;

    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, fileBuffer, {
        contentType: `image/${fileExt}`, // Set correct content type
        upsert: false, // Prevent overwriting existing files
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    if (!data || !data.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    // Get the public URL - note the lowercase 'publicUrl'
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(data.path);

    if (!publicUrl) {
      throw new Error("Failed to generate public URL");
    }
    return publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw new Error(err.message || "Image upload failed");
  }
};

module.exports = uploadImageToSupabase;
