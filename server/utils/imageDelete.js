const fs = require("fs").promises;

const deleteFile = async (filePath) => {
  try {
    const fullPath = path.join(__dirname, "..", filePath);
    await fs.access(fullPath);
    await fs.unlink(fullPath);
    console.log(`File deleted successfully: ${fullPath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`File not found, skipping delete: ${filePath}`);
    } else {
      console.error(`Error deleting file at ${filePath}:`, error);
      throw error;
    }
  }
};

module.exports = {
  deleteFile,
};
