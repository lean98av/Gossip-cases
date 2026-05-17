/**
 * Helper functions for handling product images with base64 encoding
 */

function getImageMimeType(filename) {
  const ext = filename?.split('.').pop()?.toLowerCase();
  const types = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  return types[ext] || 'image/jpeg';
}

/**
 * Get product image source
 * @param {Object} product - Product object with image or images property
 * @returns {string} - Image source URL (data URI or file path)
 */
function getProductImageSource(product) {
  if (product.images && product.images.length > 0) {
    return `data:${getImageMimeType(product.images[0].name)};base64,${product.images[0].file}`;
  } else if (product.image) {
    return `/images/${product.image}`;
  }
  return '/images/no-image.png';
}

// Expose to window for EJS templates
window.getProductImageSource = getProductImageSource;
window.getImageMimeType = getImageMimeType;
