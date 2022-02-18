export function createElement(tag, classes = [], content) {
  const element = document.createElement(tag);

  if (classes.length) {
    element.classList.add(...classes);//Spread оператор раскладывает массивы строчкой
  }

  if (content) {
    element.textContent = content;
  }

  return element;
}