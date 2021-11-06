/* eslint-disable no-underscore-dangle */
export default {
  images: [
    { src: 'pexels-albert-white-361104.jpg', caption: 'pexels-albert-white-361104' },
    { src: 'pexels-eberhard-grossgasteiger-572897.jpg', caption: 'pexels-eberhard-grossgasteiger-572897' },
    { src: 'pexels-eberhard-grossgasteiger-691668.jpg', caption: 'pexels-eberhard-grossgasteiger-691668' },
    { src: 'pexels-pixabay-355747.jpg', caption: 'pexels-pixabay-355747' },
    { src: 'pexels-pixabay-414171.jpg', caption: 'pexels-pixabay-414171' },
    { src: 'pexels-pixabay-417173.jpg', caption: 'pexels-pixabay-417173' },
    { src: 'pexels-stephan-seeber-1054218.jpg', caption: 'pexels-stephan-seeber-1054218' },
    { src: 'pexels-tim-gouw-291732.jpg', caption: 'pexels-tim-gouw-291732' },
  ],

  sliderHeight: '400px',
  changeDelaySecons: 3,

  _mainElement: undefined,
  _imagesPath: 'assets/img/gallery/',
  _currentImageIndex: -1,
  _timer: undefined,

  init(outerSelector) {
    this._mainElement = document.createElement('div');
    this._mainElement.classList.add('slider__main');

    this._createImageElements();
    this._createCaptionElement();
    this._createCounterElement();
    this._createDotElements();
    this._createChevronElements();

    document.querySelector(outerSelector).appendChild(this._mainElement);

    this.changePicture(0);
  },

  shiftPicture(plus) {
    let index = this._currentImageIndex;
    if (plus) {
      if (this._currentImageIndex < this.images.length - 1) {
        index = this._currentImageIndex + 1;
      } else {
        index = 0;
      }
    } else if (this._currentImageIndex > 0) {
      index = this._currentImageIndex - 1;
    } else {
      index = this.images.length - 1;
    }

    this.changePicture(index);
  },

  changePicture(index) {
    if (Number.isInteger(index) && index >= 0 && index < this.images.length) {
      this._currentImageIndex = index;
    } else if (this._currentImageIndex < this.images.length - 1) {
      this._currentImageIndex += 1;
    } else {
      this._currentImageIndex = 0;
    }

    const images = [...this._mainElement.querySelectorAll('.slider__image')];
    images.forEach((image) => image.classList.remove('slider__image--current'));

    const currImg = images.find((img) => img.dataset.index === this._currentImageIndex.toString());
    if (currImg) currImg.classList.add('slider__image--current');

    const dots = [...this._mainElement.querySelectorAll('.slider__dot')];
    dots.forEach((dot) => {
      dot.classList.replace('fas', 'far');
    });

    const currDot = dots.find((dot) => dot.dataset.index === this._currentImageIndex.toString());
    if (currDot) currDot.classList.replace('far', 'fas');

    const caption = this._mainElement.querySelector('.slider__caption');
    caption.textContent = this.images[this._currentImageIndex].caption;

    const counter = this._mainElement.querySelector('.slider__counter');
    counter.textContent = `${this._currentImageIndex + 1} / ${this.images.length}`;

    if (this.changeDelaySecons > 0) {
      clearInterval(this._timer);
      this._timer = setTimeout(() => {
        this.changePicture();
      }, this.changeDelaySecons * 1000);
    }
  },

  _createImageElements() {
    const imageHolderElement = document.createElement('div');
    imageHolderElement.classList.add('slider__images');
    imageHolderElement.style.height = this.sliderHeight;
    this.images.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = `${this._imagesPath}${image.src}`;
      imgElement.alt = image.caption;
      imgElement.classList.add('slider__image');
      imgElement.dataset.index = index;

      imageHolderElement.appendChild(imgElement);
    });
    this._mainElement.appendChild(imageHolderElement);
  },

  _createCounterElement() {
    const counterElement = document.createElement('div');
    counterElement.classList.add('slider__counter');

    this._mainElement.appendChild(counterElement);
  },

  _createCaptionElement() {
    const captionElement = document.createElement('div');
    captionElement.classList.add('slider__caption');
    this._mainElement.appendChild(captionElement);
  },

  _createDotElements() {
    const dotHolderElement = document.createElement('div');
    dotHolderElement.classList.add('slider__dots');
    this.images.forEach((image, index) => {
      const dotElement = document.createElement('i');
      dotElement.classList.add('slider__dot', 'far', 'fa-circle');
      dotElement.addEventListener('click', () => this.changePicture(index));
      dotElement.dataset.index = index;
      dotHolderElement.appendChild(dotElement);
    });

    this._mainElement.appendChild(dotHolderElement);
  },

  _createChevronElement(to) {
    const chevreonElement = document.createElement('i');
    chevreonElement.classList.add('fas', `fa-chevron-${to}`);
    chevreonElement.addEventListener('click', () => this.shiftPicture(to === 'right'));

    const chevreonDivElement = document.createElement('div');
    chevreonDivElement.classList.add('slider__chevron', `slider__chevron--${to}`);
    chevreonDivElement.appendChild(chevreonElement);

    this._mainElement.appendChild(chevreonDivElement);
  },

  _createChevronElements() {
    this._createChevronElement('left');
    this._createChevronElement('right');
  },
};
