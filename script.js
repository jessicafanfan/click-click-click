function getElementOffset(element) {
  let de = document.documentElement;
  let box = element.getBoundingClientRect();
  let top = box.top + window.pageYOffset - de.clientTop;
  let left = box.left + window.pageXOffset - de.clientLeft;
  return { top: top, left: left };
}
let boxes = document.querySelectorAll(".grid .box");
for (i = 0; i < boxes.length; i++) {
  let indexSpan = document.createElement("span");
  indexSpan.className = "index";
  indexSpan.textContent = `${i + 1}`;
  boxes[i].appendChild(indexSpan);
  boxes[i].id = `box${i + 1}`;
}
function assignColors() {
  const colors = [
    "#0052D2",
    "#13B9A1",
    "#FF78CA",
    "#D66052",
    "#202020",
    "#BEA5FF",
    "#0295FF",
    "#ED9B88",
    "#F2E4F7",
    "#2E5F3A",
    "#202020",
    "#CDDBFF",
    "#70F5FF",
    "#FFE77D",
    "#254F90",
    "#18D651",
    "#FF526F",
    "#06FBAA",
    "#D8FF6D",
    "#202020",
    "#754425",
    "#C9C9C9",
    "#202020"
  ];
  for (i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor =
      colors[Math.round(Math.random() * (colors.length - 1))];
  }
}

function generateUUID() {
  var d = new Date().getTime();

  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }

  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
}
let mydragg = (function() {
  return {
    move: function(divid, xpos, ypos) {
      divid.style.left = xpos + "px";
      divid.style.top = ypos + "px";
    },
    startMoving: function(divid, container, evt) {
      evt = evt || window.event;
      var posX = evt.clientX,
        posY = evt.clientY,
        divTop = divid.style.top,
        divLeft = divid.style.left,
        eWi = parseInt(divid.style.width),
        eHe = parseInt(divid.style.height),
        cWi = parseInt(document.getElementById(container).style.width),
        cHe = parseInt(document.getElementById(container).style.height);
      document.getElementById(container).style.cursor = "move";
      divTop = divTop.replace("px", "");
      divLeft = divLeft.replace("px", "");
      var diffX = posX - divLeft,
        diffY = posY - divTop;
      document.onmousemove = function(evt) {
        evt = evt || window.event;
        var posX = evt.clientX,
          posY = evt.clientY,
          aX = posX - diffX,
          aY = posY - diffY;
        if (aX < 0) aX = 0;
        if (aY < 0) aY = 0;
        if (aX + eWi > cWi) aX = cWi - eWi;
        if (aY + eHe > cHe) aY = cHe - eHe;
        mydragg.move(divid, aX, aY);
      };
    },
    stopMoving: function(container) {
      document.getElementById(container).style.cursor = "default";
      document.onmousemove = function() {};
    }
  };
})();

document.addEventListener(
  "DOMContentLoaded",
  function() {
    assignColors();
    let isShow = false;
    document.querySelector("#box1 .checker-wrapper button").addEventListener(
      "click",
      e => {
        isShow = !isShow;
        document.querySelector("#box1 .near-sighted").style.opacity = isShow
          ? "1"
          : "0";
      },
      false
    );
    document.querySelector("#box2 img").addEventListener(
      "click",
      e => {
        assignColors();
      },
      false
    );
    document.querySelector("#box4 div").addEventListener(
      "mousedown",
      e => {
        document.querySelector("#box4 div").innerHTML = "😝";
      },
      false
    );
    document.querySelector("#box4 div").addEventListener(
      "mouseup",
      e => {
        document.querySelector("#box4 div").innerHTML = "😜";
      },
      false
    );
    let clickTimes = 1.3;
    document.querySelector("#box5 svg").addEventListener("click", e => {
      if (clickTimes > 6) {
        document.querySelector("#box5 svg").style.transform = `scale(1.3)`;
        clickTimes = 1.3;
        return;
      }
      clickTimes = clickTimes + 0.5;
      document.querySelector(
        "#box5 svg"
      ).style.transform = `scale(1.3, ${clickTimes})`;
    });
    document.querySelector("#secret-key").addEventListener("click", e => {
      let key = generateUUID();
      document.querySelector("#key").value = key;
    });
    let clicked = true;
    document
      .querySelector("#box7 .shape-holder")
      .addEventListener("click", e => {
        if (clicked) {
          document
            .querySelector("#box7 .shape-holder")
            .classList.add("move-shapes");
        } else {
          document
            .querySelector("#box7 .shape-holder")
            .classList.remove("move-shapes");
        }
        clicked = !clicked;
      });
    document.querySelector("#box8").addEventListener("click", e => {
      let div = document.createElement("div");
      div.className = "circle";
      div.style.left = `${e.pageX -
        getElementOffset(document.querySelector("#box8")).left}px`;
      div.style.top = `${e.pageY -
        getElementOffset(document.querySelector("#box8")).top}px`;
      document.querySelector("#box8").appendChild(div);
      setTimeout(function() {
        div.className += " fade-out";
        setTimeout(function() {
          div.remove();
        }, 1000);
      }, 1000);
    });
    let boxClicked = true;
    document.querySelector("#box9").addEventListener("click", e => {
      if (boxClicked) {
        document.querySelector("#box9").classList.add("shuffle");
      } else {
        document.querySelector("#box9").classList.remove("shuffle");
      }
      boxClicked = !boxClicked;
    });
    let movieTicketPurchased = false;
    document.querySelector("#box10 button").addEventListener("click", e => {
      movieTicketPurchased = true;
      alert(
        "You have successfully bought a movie ticket, go to box #14 to enjoy the movie."
      );
    });
    let barClicked = true;
    document.querySelector("#box11 .bar").addEventListener("click", e => {
      barClicked
        ? document.querySelector("#box11 .bar").classList.add("rotate")
        : document.querySelector("#box11 .bar").classList.remove("rotate");
      barClicked = !barClicked;
    });
    let stars = document.querySelectorAll("#stars li");
    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener("mouseover", e => {
        let onStar = i + 1;
        for (let i = 0; i < stars.length; i++) {
          let currentIndex = i;
          if (currentIndex < onStar) {
            stars[i].classList.add("hover");
          } else {
            stars[i].classList.remove("hover");
          }
        }
      });
    }
    document.querySelector("#stars").addEventListener("mouseout", e => {
      for (var i = 0; i < stars.length; i++) {
        stars[i].classList.remove("hover");
      }
    });

    for (let i = 0; i < stars.length; i++) {
      let clickedStar = i + 1;
      stars[i].addEventListener("click", e => {
        for (i = 0; i < stars.length; i++) {
          stars[i].classList.remove("selected");
        }
        for (i = 0; i < clickedStar; i++) {
          stars[i].classList.add("selected");
        }
      });
    }

    particlesJS("box13", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 2, color: "#000000" },
          polygon: { nb_sides: 8 },
          image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
          value: 1,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 20,
          random: false,
          anim: {
            enable: false,
            speed: 60,
            size_min: 4,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 0,
          color: "#ffffff",
          opacity: 1,
          width: 0
        },
        move: {
          enable: true,
          speed: 9,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "bounce",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: false
    });
    document.querySelector("#box14").addEventListener("click", e => {
      if (!movieTicketPurchased) {
        alert("Please buy a movie ticket at box #10 before proceeding.");
        return;
      }
    });

    document.querySelector("#movieButton").addEventListener("click", e => {
      if (!movieTicketPurchased) {
        return;
      }
      togglePlayPause();
    });
    function togglePlayPause() {
      let movie = document.getElementById("movie");
      let button = document.getElementById("movieButton");
      if (movie.paused) {
        movie.play();
        button.innerHTML = "Pause";
      } else {
        movie.pause();
        button.innerHTML = "Play";
      }
    }

    let box16Clicked = false;
    document.querySelector("#box16").addEventListener("click", e => {
      box16Clicked
        ? document.querySelector("#box16 .square").classList.add("round")
        : document.querySelector("#box16 .square").classList.remove("round");
      box16Clicked = !box16Clicked;
    });
    let box18Clicked = false;
    document
      .querySelector("#box18 .img-wrapper")
      .addEventListener("click", e => {
        box18Clicked
          ? document.querySelector("#box18 .img-wrapper").classList.add("blur")
          : document
              .querySelector("#box18 .img-wrapper")
              .classList.remove("blur");
        box18Clicked = !box18Clicked;
      });
    document.querySelector("#box22 button").addEventListener("click", e => {
      let circleElem = document.querySelector("#box23 .circles .circle");
      document.querySelector("#box23 .circles").removeChild(circleElem);
    });
    document.querySelector("#box24 button").addEventListener("click", e => {
      let circle = document.createElement("div");
      circle.className = "circle";
      document.querySelector("#box23 .circles").appendChild(circle);
    });
    let box25Clicked = false;
    document.querySelector("#box25 div").addEventListener("click", e => {
      document.body.style.transformOrigin = "left center";
      box25Clicked
        ? (document.body.style.transform = "scale(2)")
        : (document.body.style.transform = "scale(1)");
      box25Clicked = !box25Clicked;
    });
    let box26Clicked = false;
    document.querySelector("#box26 div").addEventListener("click", e => {
      box26Clicked
        ? document.body.classList.add("hideBoxes")
        : document.body.classList.remove("hideBoxes");
      box26Clicked = !box26Clicked;
    });
    document.querySelector("#box27 div").addEventListener("click", e => {
      window.location.reload(true);
    });
    let box28Clicked = false;
    document.querySelector("#box28").addEventListener("click", e => {
      box28Clicked
        ? document.querySelector("#box28 .circle").classList.add("moved")
        : document.querySelector("#box28 .circle").classList.remove("moved");
      box28Clicked = !box28Clicked;
    });
    document.querySelector("#box29 button").addEventListener("click", e => {
      let audio = document.querySelector("#box29 audio");
      let button = document.querySelector("#box29 button");
      if (audio.paused) {
        audio.play();
        button.innerHTML = "Pause";
      } else {
        audio.pause();
        button.innerHTML = "Play";
      }
    });
    document.querySelector("#box30").addEventListener("click", e => {
      let name = prompt("Please enter your name", "");
      if (name != null) {
        document.querySelector("#box30 .greetings").innerHTML =
          "Hi, " + name + "! How's it going?";
      }
    });
    document.querySelector("#box31").addEventListener("click", e => {
      let country31 = prompt("Guess the country this flag belongs to", "");
      if (country31 == "Argentina") {
        alert("You're correct!");
      } else {
        alert("You're wrong!");
      }
    });
    document.querySelector("#box32").addEventListener("click", e => {
      let country32 = prompt("Guess the country this flag belongs to", "");
      console.log(country32);
      if (country32 == "South Africa") {
        alert("You're correct!");
      } else {
        alert("You're wrong!");
      }
    });
    document.querySelector("#box33").addEventListener("click", e => {
      let country32 = prompt("Guess the country this flag belongs to", "");
      console.log(country32);
      if (country32 == "South Africa") {
        alert("You're correct!");
      } else {
        alert("You're wrong!");
      }
    });
    let hitCounter = 0;
    document.querySelector("#box36").addEventListener("click", e => {
      hitCounter++;
      document.querySelector(
        "#box36 div"
      ).innerHTML = `You've hit me ${hitCounter} times!`;
    });
    document.querySelector("#box38").addEventListener("click", e => {
      emojisplosion();
    });
    document.querySelector("#box37").addEventListener("mousedown", e => {
      document.querySelector("#box39 button").classList.add("active");
    });
    document.querySelector("#box37").addEventListener("mouseup", e => {
      document.querySelector("#box39 button").classList.remove("active");
    });
    document.querySelector("#box39").addEventListener("mousedown", e => {
      document.querySelector("#box37 button").classList.add("active");
    });
    document.querySelector("#box39").addEventListener("mouseup", e => {
      document.querySelector("#box37 button").classList.remove("active");
    });
    document.querySelector("#box40").addEventListener("mousedown", e => {
      document.querySelector("#box40").classList.add("option1");
      document.querySelector("#box41").classList.add("option1");
      document.querySelector("#box42").classList.add("option1");
    });
    document.querySelector("#box40").addEventListener("mouseup", e => {
      document.querySelector("#box40").classList.remove("option1");
      document.querySelector("#box41").classList.remove("option1");
      document.querySelector("#box42").classList.remove("option1");
    });
    document.querySelector("#box41").addEventListener("mousedown", e => {
      document.querySelector("#box40").classList.add("option2");
      document.querySelector("#box41").classList.add("option2");
      document.querySelector("#box42").classList.add("option2");
    });
    document.querySelector("#box41").addEventListener("mouseup", e => {
      document.querySelector("#box40").classList.remove("option2");
      document.querySelector("#box41").classList.remove("option2");
      document.querySelector("#box42").classList.remove("option2");
    });
    document.querySelector("#box42").addEventListener("mousedown", e => {
      document.querySelector("#box40").classList.add("option3");
      document.querySelector("#box41").classList.add("option3");
      document.querySelector("#box42").classList.add("option3");
    });
    document.querySelector("#box42").addEventListener("mouseup", e => {
      document.querySelector("#box40").classList.remove("option3");
      document.querySelector("#box41").classList.remove("option3");
      document.querySelector("#box42").classList.remove("option3");
    });
    let box43Clicked = false;
    document.querySelector("#box43").addEventListener("click", e => {
      box43Clicked
        ? document.querySelector("#box43 .panel-holder").classList.add("flip")
        : document
            .querySelector("#box43 .panel-holder")
            .classList.remove("flip");
      box43Clicked = !box43Clicked;
    });
    let box47ClickCounter = 0;
    document.querySelector("#box47").addEventListener("click", e => {
      let txt = ["I ", "am ", "out ", "⟶"];
      if (box47ClickCounter < txt.length) {
        document.querySelector("#box47 div").innerHTML +=
          txt[box47ClickCounter];
        box47ClickCounter++;
      }
    });
    let box48ClickCounter = 0;
    document.querySelector("#box48").addEventListener("click", e => {
      let txt = ["of ", "ideas", "."];
      if (box48ClickCounter < txt.length) {
        document.querySelector("#box48 div").innerHTML +=
          txt[box48ClickCounter];
        box48ClickCounter++;
      }
    });
    document.querySelector("#box50").addEventListener("click", e => {
      document.querySelector("#box1").scrollIntoView({
        behavior: "smooth"
      });
    });
  },
  false
);
