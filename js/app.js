import {upload} from './uploader.js';

upload('#uploaderFile', {
  multi: true,
  accept: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
});