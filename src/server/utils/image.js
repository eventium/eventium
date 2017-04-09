const fs = require('fs');

export function addUploadedImageExtension(fileInfo) {
  return new Promise((resolve) => {
    if (!fileInfo) {
      resolve(null);
      return;
    }

    let fileName = fileInfo.path;

    if (fileInfo.mimetype === 'image/jpeg') {
      fileName += '.jpg';
    } else if (fileInfo.mimetype === 'image/png') {
      fileName += '.png';
    } else if (fileInfo.mimetype === 'image/gif') {
      fileName += '.gif';
    }

    fs.rename(fileInfo.path, fileName, () => {
      resolve(fileName);
    });
  });
}
