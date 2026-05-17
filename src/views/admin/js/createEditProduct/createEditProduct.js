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

    if (product.images && product.images.length > 0) {
      document.getElementById('productImage').value = '';
      if (product.images[0].file) {
        document.getElementById('imagePreviewImg').src = getImageDataUrl(product.images[0].file, product.images[0].name);
        document.getElementById('imagePreview').style.display = 'block';
      }
    }
  }

  const productImageInput = document.getElementById('productImage');
  if (productImageInput) {
    productImageInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const preview = document.getElementById('imagePreview');
          const img = document.getElementById('imagePreviewImg');
          preview.style.display = 'block';
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
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
    const imageInput = document.getElementById('productImage');
    const deleteImagesInput = document.getElementById('deleteImages');

    const name = nameInput.value.trim();
    const price = priceInput.value;
    const categoryId = categoryInput.value;
    const description = descriptionInput.value.trim();
    const showToClients = showToClientsInput.checked;
    const outStock = outStockInput.checked;
    const imageFile = imageInput.files[0];

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

    if (imageFile) {
      if (imageFile.size > 2 * 1024 * 1024) {
        alert('La imagen no puede ser mayor a 2MB');
        return;
      }
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(imageFile.type)) {
        alert('Solo se permiten imágenes JPG, PNG, GIF y WebP');
        return;
      }
    }

    const deleteIds = deleteImagesInput.value
      .split(',')
      .map(id => id.trim())
      .filter(Boolean);

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

      if (imageFile) {
        formData.append('images', imageFile);
      }

      const additionalFiles = document.getElementById('productImages').files;
      if (additionalFiles && additionalFiles.length) {
        for (const file of additionalFiles) {
          formData.append('images', file);
        }
      }

      if (deleteIds.length) {
        formData.append('deleteImages', JSON.stringify(deleteIds));
      }

      const response = await fetch(requestUrl, {
        method: requestMethod,
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert('Producto ' + (title.includes('Create') ? 'creado' : 'actualizado') + ' exitosamente');
        window.location.reload();
      } else {
        alert('Error al ' + (title.includes('Create') ? 'crear' : 'actualizar') + ' producto: ' + (result.message || ''));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error al enviar el formulario. Revisa la consola para más detalles.');
    }
  });
})();
