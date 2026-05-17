(function () {
  const data = window.createEditProductData || {};
  const title = data.title || '';
  const categories = data.categories || [];
  const product = data.product || null;

  const categorySelect = document.getElementById('productCategoryId');
  if (categorySelect) {
    categories.forEach(cat => {
      categorySelect.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
  }

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

  function getImageDataUrl(base64Data, filename) {
    return `data:${getImageMimeType(filename)};base64,${base64Data}`;
  }

  if (product) {
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productPrice').value = product.price ?? '';
    document.getElementById('productCategoryId').value = product.categoryId ?? '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('showToClients').checked = Boolean(product.showToClients);
    document.getElementById('outStock').checked = Boolean(product.outStock);

    // Set existing images with their order numbers
    for (let i = 0; i < Math.min(4, product.images.length); i++) {
      const imgInput = document.getElementById(`productImage${i + 1}`);
      const previewContainer = document.getElementById(`imagePreview${i + 1}`);
      const previewImg = document.getElementById(`imagePreviewImg${i + 1}`);

      if (imgInput && product.images[i].file) {
        imgInput.value = ''; // Clear the file input
        previewImg.src = getImageDataUrl(product.images[i].file, product.images[i].name);
        previewContainer.style.display = 'block';
      } else {
        previewContainer.style.display = 'none';
      }
    }
  }

  // Add event listeners for all 4 image inputs
  for (let i = 1; i <= 4; i++) {
    const imgInput = document.getElementById(`productImage${i}`);
    if (imgInput) {
      imgInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const previewContainer = document.getElementById(`imagePreview${i}`);
            const previewImg = document.getElementById(`imagePreviewImg${i}`);
            previewContainer.style.display = 'block';
            previewImg.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

   const form = document.getElementById('productForm');
  if (!form) {
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const categoryInput = document.getElementById('productCategoryId');
    const descriptionInput = document.getElementById('productDescription');
    const showToClientsInput = document.getElementById('showToClients');
    const outStockInput = document.getElementById('outStock');
    const deleteImagesInput = document.getElementById('deleteImages');

    const name = nameInput.value.trim();
    const price = priceInput.value;
    const categoryId = categoryInput.value;
    const description = descriptionInput.value.trim();
    const showToClients = showToClientsInput.checked;
    const outStock = outStockInput.checked;

    nameInput.classList.remove('is-invalid');
    priceInput.classList.remove('is-invalid');
    categoryInput.classList.remove('is-invalid');
    descriptionInput.classList.remove('is-invalid');

    if (!name) {
      nameInput.classList.add('is-invalid');
      return;
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      priceInput.classList.add('is-invalid');
      return;
    }

    if (!categoryId) {
      categoryInput.classList.add('is-invalid');
      return;
    }

    if (!description) {
      descriptionInput.classList.add('is-invalid');
      return;
    }

    const isEdit = Boolean(product && product.id);
    const requestUrl = isEdit ? `/admin/products/${product.id}` : '/admin/products';
    const requestMethod = isEdit ? 'PUT' : 'POST';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('categoryId', categoryId);
      formData.append('description', description);
      formData.append('showToClients', String(showToClients));
      formData.append('outStock', String(outStock));

      // Imagen 1
      const img1 = document.getElementById('productImage1');
      if (img1 && img1.files.length > 0) {
        const file = img1.files[0];
        if (file.size > 2 * 1024 * 1024) {
          alert('La imagen 1 no puede ser mayor a 2MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          alert('Solo se permiten imágenes JPG, PNG, GIF y WebP en la imagen 1');
          return;
        }
        formData.append('images', file);
      }

      // Imagen 2
      const img2 = document.getElementById('productImage2');
      if (img2 && img2.files.length > 0) {
        const file = img2.files[0];
        if (file.size > 2 * 1024 * 1024) {
          alert('La imagen 2 no puede ser mayor a 2MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          alert('Solo se permiten imágenes JPG, PNG, GIF y WebP en la imagen 2');
          return;
        }
        formData.append('images', file);
      }

      // Imagen 3
      const img3 = document.getElementById('productImage3');
      if (img3 && img3.files.length > 0) {
        const file = img3.files[0];
        if (file.size > 2 * 1024 * 1024) {
          alert('La imagen 3 no puede ser mayor a 2MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          alert('Solo se permiten imágenes JPG, PNG, GIF y WebP en la imagen 3');
          return;
        }
        formData.append('images', file);
      }

      // Imagen 4
      const img4 = document.getElementById('productImage4');
      if (img4 && img4.files.length > 0) {
        const file = img4.files[0];
        if (file.size > 2 * 1024 * 1024) {
          alert('La imagen 4 no puede ser mayor a 2MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          alert('Solo se permiten imágenes JPG, PNG, GIF y WebP en la imagen 4');
          return;
        }
        formData.append('images', file);
      }

      const response = await fetch(requestUrl, {
        method: requestMethod,
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        window.location.href = '/admin/products';
      } else {
        alert('Error al ' + (title.includes('Create') ? 'crear' : 'actualizar') + ' producto: ' + (result.message || ''));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error al enviar el formulario. Revisa la consola para más detalles.');
    }
  });
})();
