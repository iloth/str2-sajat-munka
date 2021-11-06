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

  mainElement: undefined,
  imagesPath: 'assets/img/gallery/',
  changeDelaySecons: 3,
  currentImageIndex: -1,
  timer: undefined,

  init(outerSelector) {
    this.mainElement = document.createElement('div');
    this.mainElement.classList.add('slider__main');

    this.createImageElements();
    this.createCaptionElement();
    this.createDotElements();
    this.createChevronElements();

    document.querySelector(outerSelector).appendChild(this.mainElement);

    this.changePicture(0);
  },

  shiftPicture(plus) {
    let index = this.currentImageIndex;
    if (plus) {
      if (this.currentImageIndex < this.images.length - 1) {
        index = this.currentImageIndex + 1;
      } else {
        index = 0;
      }
    } else {
      if (this.currentImageIndex > 0) {
        index = this.currentImageIndex - 1;
      } else {
        index = this.images.length - 1;
      }
    }

    this.changePicture(index);
  },

  changePicture(index) {
    if (Number.isInteger(index) && index >= 0 && index < this.images.length) {
      this.currentImageIndex = index;
    } else if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex += 1;
    } else {
      this.currentImageIndex = 0;
    }

    const images = [...this.mainElement.querySelectorAll('.slider__image')];
    images.forEach((image) => image.classList.remove('slider__image--current'));

    const currImg = images.find((img) => img.dataset.index === this.currentImageIndex.toString());
    if (currImg) currImg.classList.add('slider__image--current');

    const dots = [...this.mainElement.querySelectorAll('.slider__dot')];
    dots.forEach((dot) => {
      dot.classList.replace('fas', 'far');
    });

    const currDot = dots.find((dot) => dot.dataset.index === this.currentImageIndex.toString());
    if (currDot) currDot.classList.replace('far', 'fas');

    const caption = this.mainElement.querySelector('.slider__caption');
    caption.textContent = this.images[this.currentImageIndex].caption;

    if (this.changeDelaySecons > 0) {
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        this.changePicture();
      }, this.changeDelaySecons * 1000);
    }
  },

  createImageElements() {
    const imageHolderElement = document.createElement('div');
    imageHolderElement.classList.add('slider__images');
    this.images.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = `${this.imagesPath}${image.src}`;
      imgElement.alt = image.caption;
      imgElement.classList.add('slider__image');
      imgElement.dataset.index = index;

      imageHolderElement.appendChild(imgElement);
    });
    this.mainElement.appendChild(imageHolderElement);
  },

  createCaptionElement() {
    const captionElement = document.createElement('div');
    captionElement.classList.add('slider__caption');
    this.mainElement.appendChild(captionElement);
  },

  createDotElements() {
    const dotHolderElement = document.createElement('div');
    dotHolderElement.classList.add('slider__dots');
    this.images.forEach((image, index) => {
      const dotElement = document.createElement('i');
      dotElement.classList.add('slider__dot', 'far', 'fa-circle');
      dotElement.addEventListener('click', () => this.changePicture(index));
      dotElement.dataset.index = index;
      dotHolderElement.appendChild(dotElement);
    });

    this.mainElement.appendChild(dotHolderElement);
  },

  createChevronElement(to) {
    const chevreonElement = document.createElement('i');
    chevreonElement.classList.add('fas', `fa-chevron-${to}`);
    chevreonElement.addEventListener('click', () => this.shiftPicture(to === 'right'));

    const chevreonDivElement = document.createElement('div');
    chevreonDivElement.classList.add('slider__chevron', `slider__chevron--${to}`);
    chevreonDivElement.appendChild(chevreonElement);

    this.mainElement.appendChild(chevreonDivElement);
  },

  createChevronElements() {
    this.createChevronElement('left');
    this.createChevronElement('right');
  },
};
