(function () {
  var StackCards = function (element) {
    this.element = element;
    this.items = this.element.getElementsByClassName("js-stack-cards__item");
    this.scrollingFn = false;
    this.scrolling = false;
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
    // Use passive scroll listener for touch responsiveness
    window.addEventListener("scroll", element.scrollingFn, { passive: true });
  }

  function stackCardsScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  }

  function setStackCards(element) {
    // Read CSS property for gap
    element.marginY = getComputedStyle(element.element).getPropertyValue("--stack-cards-gap");
    getIntegerFromProperty(element); // Convert gap value

    element.elementHeight = element.element.offsetHeight;

    if (!element.items.length) return;

    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue("top")));
    element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue("height")));
    element.windowHeight = window.innerHeight;

    // Set padding and base transform
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
    if (isNaN(this.marginY)) {
      this.scrolling = false;
      return;
    }

    // Use boundingClientRect.top for precision on all devices
    var top = this.element.getBoundingClientRect().top;

    var exitCondition = this.cardTop -
      top +
      this.element.windowHeight -
      this.elementHeight -
      this.cardHeight +
      this.marginY +
      this.marginY * this.items.length;

    if (exitCondition > 0) {
      this.scrolling = false;
      return;
    }

    for (var i = 0; i < this.items.length; i++) {
      var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
      if (scrolling > 0) {
        var scaling =
          i === this.items.length - 1
            ? 1
            : (this.cardHeight - scrolling * 0.008) / this.cardHeight; // was 0.015
    
        scaling = Math.max(0.92, Math.min(scaling, 1)); // was 0.85
        const newTransform = `translateY(${this.marginY * i}px) scale(${scaling})`;
      } else {
        const newTransform = `translateY(${this.marginY * i}px)`;
      }
    
      // Avoid layout thrashing by only applying if it changed
      if (this.items[i].style.transform !== newTransform) {
        this.items[i].style.transform = newTransform;
      }
    }
    

    this.scrolling = false;
  }

  // Bootstrapping the cards
  var stackCards = document.getElementsByClassName("js-stack-cards"),
    intersectionObserverSupported =
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype,
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
    var stackCardsArray = [];
    for (var i = 0; i < stackCards.length; i++) {
      stackCardsArray.push(new StackCards(stackCards[i]));
    }

    var resizingId = false;
    var customEvent = new CustomEvent("resize-stack-cards");

    window.addEventListener("resize", function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(function () {
        for (var i = 0; i < stackCardsArray.length; i++) {
          stackCardsArray[i].element.dispatchEvent(customEvent);
        }
      }, 50);
    });
  }
})();
