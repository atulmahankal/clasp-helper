const fs = require('fs').promises;
module.exports.createDirectory = async function createDirectory(directoryPath) {
  try {
    // Use the mkdir function to create the directory
    await fs.mkdir(directoryPath, { recursive: true });

    console.log('Directory created successfully.');
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

module.exports.createFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content);
    console.log(`File created successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error creating file: ${error.message}`);
  }
}

module.exports.moveFileAsync = async (sourcePath, destinationPath) => {
  try {
    await fs.rename(sourcePath, destinationPath);
    console.log(`File moved successfully: ${sourcePath} -> ${destinationPath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: Source file '${sourcePath}' does not exist.`);
    } else {
      console.error(`Error moving file: ${error.message}`);
    }
  }
}

// Export the function
// module.exports.createDirectory = createDirectory;
