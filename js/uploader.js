import { bytesToSize } from './bytes-to-size.js';
import { createElement } from './create-element.js';

export function uploader(selector, options = {}) {
  let arrFiles = [];

  function noop() { };
  const onUpload = options.onUpload ?? noop;

  const uploaderInput = document.querySelector(selector);
  const openBtn = createElement('button', ['uploader__btn', '--o'], 'Открыть');
  uploaderInput.insertAdjacentElement('afterend', openBtn);

  const previewImages = createElement('div', ['uploader__preview']);
  openBtn.insertAdjacentElement('afterend', previewImages);

  const uploadBtn = createElement('button', ['uploader__btn', '--upload', '--hidden'], 'Загрузить');
  openBtn.insertAdjacentElement('afterend', uploadBtn);

  if (options.multi) {
    uploaderInput.setAttribute('multiple', true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    uploaderInput.setAttribute('accept', options.accept.join(','));
  }

  const triggerUploaderInput = () => {
    uploaderInput.click();
  };

  const handlerChangeUploaderInput = (event) => {
    if (!event.target.files.length) {//если нет файлов
      return;//то ничего не делаем
    }

    previewImages.innerHTML = '';

    arrFiles = Array.from(event.target.files);
    arrFiles.forEach(file => {
      if (!file.type.match('image')) {//работаем только с изображениями
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        previewImages.insertAdjacentHTML('afterbegin', `
          <div class="uploader__preview-item">
            <button class="uploader__preview-item-remove" data-file-name="${file.name}">&times;</button>
            <img src="${e.target.result}" alt="${file.name}" class="uploader__preview-item-img">
            <div class="uploader__preview-item-title"><p>${file.name}</p><p>${bytesToSize(file.size)}</p></div>
          </div>
        `);
      }

      reader.readAsDataURL(file);
    });

    uploadBtn.classList.remove('--hidden');
  };

  const handlerRemoveImage = event => {
    let fileName;
    if (fileName = event.target.dataset.fileName) {
      arrFiles = arrFiles.filter(file => file.name !== fileName);

      if (!arrFiles.length) {
        uploadBtn.classList.add('--hidden');
      }

      const previewItem = previewImages.querySelector(`[data-file-name="${fileName}"]`).closest('.uploader__preview-item');
      previewItem.classList.add('--removing');
      setTimeout(() => { previewItem.remove(); }, 300);
    } else {
      return;//если не происходит присваивание имени файла то ничего не обрабатываем
    }
  }

  const clearPreviewImagesTitles = (el) => {
    el.insertAdjacentHTML('afterend', `<div class="uploader__preview-item-progress"></div>`);
    el.remove();
  } 

  const handlerUploadImages = () => {
    previewImages.querySelectorAll('.uploader__preview-item-remove').forEach(el => { el.remove(); });
    const previewImagesTitleAll = previewImages.querySelectorAll('.uploader__preview-item-title');
    previewImagesTitleAll.forEach(clearPreviewImagesTitles);
    onUpload(arrFiles);
  }

  openBtn.addEventListener('click', triggerUploaderInput);

  uploaderInput.addEventListener('change', handlerChangeUploaderInput);

  previewImages.addEventListener('click', handlerRemoveImage);

  uploadBtn.addEventListener('click', handlerUploadImages);

}