export function upload(selector, options = {}) {
  const uploaderInput = document.querySelector(selector);
  const openBtn = document.createElement('button');
  openBtn.classList.add('uploader__btn', '--o');
  openBtn.textContent = 'Открыть';
  uploaderInput.insertAdjacentElement('afterend', openBtn);

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
    console.log(event.target.files);
    if (!event.target.files.length) {//если нет файлов
      return;//то ничего не делаем
    }

    const arrFiles = Array.from(event.target.files);
    arrFiles.forEach(file => {
      if (!file.type.match('image')) {//работаем только с изображениями
        return;
      }

      const reader = new FileReader();
    });
  };

  openBtn.addEventListener('click', triggerUploaderInput);

  uploaderInput.addEventListener('change', handlerChangeUploaderInput);
}