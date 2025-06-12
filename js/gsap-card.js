var StackCards = function (element) {
  this.element = element;
  this.items = this.element.getElementsByClassName("js-stack-cards__item");
  this.scrollingFn = false;
  this.scrolling = false;
  /*console.log("StackCards instance created", this.items.length, "items");*/ /*Log to check if StackCArds are created*/
  initStackCardsEffect(this);
  initStackCardsResize(this);
};

function initStackCardsEffect(element) {
  setStackCards(element); // Store cards CSS properties

  var observer = new IntersectionObserver(stackCardsCallback.bind(element), {
    threshold: [0, 1]
  });

  observer.observe(element.element);
}

function initStackCardsResize(element) {
  element.element.addEventListener("resize-stack-cards", function () {
    setStackCards(element);
    animateStackCards.bind(element);
  });
}

function stackCardsCallback(entries) {
  /*console.log("Intersection observer triggered", entries[0].isIntersecting);*/  /*Log to check if observer are triggered*/
  if (entries[0].isIntersecting) {
    if (this.scrollingFn) return;
    stackCardsInitEvent(this);
  } else {
    if (!this.scrollingFn) return;
    window.removeEventListener("scroll", this.scrollingFn);
    this.scrollingFn = false;
  }
}

function stackCardsInitEvent(element) {
  element.scrollingFn = stackCardsScrolling.bind(element);
  window.addEventListener("scroll", element.scrollingFn, { passive: true });
}

function stackCardsScrolling() {
  if (this.scrolling) return;
  this.scrolling = true;
  window.requestAnimationFrame(animateStackCards.bind(this));
}

function setStackCards(element) {
  element.marginY = getComputedStyle(element.element).getPropertyValue("--stack-cards-gap");
  getIntegerFromProperty(element);

  element.elementHeight = element.element.offsetHeight;

  // Exit if there are no items to animate
  if (element.items.length === 0) return;

  var cardStyle = getComputedStyle(element.items[0]);
  element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue("top")));
  element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue("height")));
  element.windowHeight = window.innerHeight;

  if (isNaN(element.marginY)) {
    element.element.style.paddingBottom = "0px";
  } else {
    element.element.style.paddingBottom = (element.marginY * (element.items.length - 1)) + "px";
  }

  for (var i = 0; i < element.items.length; i++) {
    element.items[i].style.transform =
      "translateY(" + (isNaN(element.marginY) ? 0 : element.marginY * i) + "px)";
  }
}

function getIntegerFromProperty(element) {
  var node = document.createElement("div");
  node.setAttribute(
    "style",
    "opacity:0; visibility: hidden; position: absolute; height:" + element.marginY
  );
  document.body.appendChild(node);
  element.marginY = parseInt(getComputedStyle(node).getPropertyValue("height"));
  document.body.removeChild(node);
}

function animateStackCards() {
  console.log("Animating cards...");  /*Log to check if animate were executed*/
  if (isNaN(this.marginY)) {
    this.scrolling = false;
    return;
  }

  /*console.log(
  "cardTop:", this.cardTop,
  "top:", this.element.getBoundingClientRect().top,
  "cardHeight:", this.cardHeight,
  "marginY:", this.marginY
);*/  /*Log to check if value of animation*/

  var top = this.element.getBoundingClientRect().top;

  if (this.cardTop - top + this.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY * this.items.length > 0) {
    this.scrolling = false;
    return;
  }

  for (var i = 0; i < this.items.length; i++) {
    var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
    /*console.log("Item", i, "scrolling:", scrolling);*/ /*logging scrolling item*/

    var newTransform = '';
    if (scrolling > 0) {
      var scaling = i === this.items.length - 1 ? 1 : (this.cardHeight - scrolling * 0.008) / this.cardHeight;
      scaling = Math.max(0.92, Math.min(scaling, 1));
      newTransform = `translateY(${this.marginY * i}px) scale(${scaling})`;
    } else {
      newTransform = `translateY(${this.marginY * i}px)`;
    }

    if (this.items[i].style.transform !== newTransform) {
      /*console.log("Setting transform for item", i, ":", newTransform);*/ /*log which item are set to transfer*/
      this.items[i].style.transform = newTransform;
    }

    if (this.items[i].style.transform !== newTransform) {
      this.items[i].style.transform = newTransform;
    }
  }

  this.scrolling = false;
}

/**
 * NEW FUNCTION: This function will be called manually after cards are loaded.
 */
function initializeCardAnimation() {
  /*console.log('Called initializeCardAnimation');*/ /*Log to check if the cardanimation were initialized*/

  var stackCards = document.getElementsByClassName("js-stack-cards"),
    intersectionObserverSupported =
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype,
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /*console.log("Stack card elements found:", stackCards.length);*/ /*Log to check length of stackCards*/


    if (stackCards.length > 0) {
    // Check for cards inside the container
    var cardItems = stackCards[0].getElementsByClassName('js-stack-cards__item');
    console.log('Number of .js-stack-cards__item:', cardItems.length);
  } else {
    console.log('No stackCards container found');
  }


  if (stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
    var stackCardsArray = [];
    for (var i = 0; i < stackCards.length; i++) {
        // Ensure we don't initialize the same element twice
        if (!stackCards[i].hasAttribute('data-stack-cards-initialized')) {
            stackCardsArray.push(new StackCards(stackCards[i]));
            stackCards[i].setAttribute('data-stack-cards-initialized', 'true');
        }
    }

    // This part is for handling window resize, it can be set up once
    if (!window.stackCardsResizeInitialized) {
        var resizingId = false;
        var customEvent = new CustomEvent("resize-stack-cards");
        window.addEventListener("resize", function () {
            clearTimeout(resizingId);
            resizingId = setTimeout(function () {
                for (var i = 0; i < stackCardsArray.length; i++) {
                    stackCardsArray[i].element.dispatchEvent(customEvent);
                }
            }, 250);
        });
        window.stackCardsResizeInitialized = true;
    }
  }
  console.log("Init card animation")
}