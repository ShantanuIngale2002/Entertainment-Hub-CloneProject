let movies = [
    {
      name: "Falcon and the winter soldier",
      des:
        "It is the second television series in the Marvel Cinematic Universe (MCU) produced by Marvel Studios,sharing continuity with the films of the franchise, and is set six months after Sam Wilson was handed the mantle of Captain America in the film Avengers: Endgame (2019).",
  
      image: "images/slider 2.png"
    },
    {
      name: "Loki",
      des:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime,omnis ratione. Dicta iste magni ducimus?",
  
      image: "images/slider 1.png"
    },
    {
      name: "Wanda vision",
      des:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime,omnis ratione. Dicta iste magni ducimus?",
  
      image: "images/slider 3.png"
    },
    {
      name: "raya and the last dragon",
      des:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.</br> Maxime,omnis ratione. Dicta iste magni ducimus?",
      image: "images/slider 4.png"
    },
    {
      name: "luca",
      des:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.</br> Maxime,omnis ratione. Dicta iste magni ducimus?",
      image: "images/slider 5.png"
    }
  ];
  
  const caraousel = document.querySelector(".caraousel");
  let sliders = [];
  
  let slideIndex = 0; //track the current slide
  
  const createSlide = () => {
    if (slideIndex >= movies.length) {
      slideIndex = 0;
    }
  
    let slide = document.createElement("div");
    var imgElement = document.createElement("img");
    let content = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
  
    //attaching all the element
    imgElement.appendChild(document.createTextNode(""));
    h1.appendChild(document.createTextNode(movies[slideIndex].name));
    p.appendChild(document.createTextNode(movies[slideIndex].des));
    content.appendChild(h1);
    content.appendChild(p);
    slide.appendChild(content);
    slide.appendChild(imgElement);
    caraousel.appendChild(slide);
  
    //setting up a images
    imgElement.src = movies[slideIndex].image;
    slideIndex++;
  
    //setting element classnames
    slide.className = "slider";
    content.className = "slide-content";
    h1.className = "movie-title";
    p.className = "movie-des";
  
    sliders.push(slide);
  
    if (sliders.length) {
      sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
        30 * (sliders.length - 2)
      }px)`;
    }
  };
  
  for (let i = 0; i < 3; i++) {
    createSlide();
  }
  
  setInterval(() => {
    createSlide();
  }, 3000);
  
  //video cards
  const videoCards = [...document.querySelectorAll(".video-card")];
  
  videoCards.forEach((item) => {
    item.addEventListener("mouseover", () => {
      let video = item.children[1];
      video.play();
    });
    item.addEventListener("mouseleave", () => {
      let video = item.children[1];
      video.pause();
    });
  });
  
  //card sliders
  let cardContainers = [...document.querySelectorAll(".card-container")];
  let preBtns = [...document.querySelectorAll(".pre-btn")];
  let nxtBtns = [...document.querySelectorAll(".nxt-btn")];
  
  cardContainers.forEach((item, i) => {
    let containerDiamensions = item.getBoundingClientRect();
    let containerWidth = containerDiamensions.width;
  
    nxtBtns[i].addEventListener("click", () => {
      item.scrollLeft += containerWidth - 200;
    });
  
    preBtns[i].addEventListener("click", () => {
      item.scrollLeft -= containerWidth + 200;
    });
  });
  