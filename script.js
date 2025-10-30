const imageElement = document.getElementById("direction");

document.addEventListener(
  "mousemove",
  function (event) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const deltaX = event.clientX - viewportCenterX;
    const deltaY = event.clientY - viewportCenterY;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    if (angle >= -22.5 && angle < 22.5) {
      imageElement.src = "media/cr.png";
      console.log("Right");
    } else if (angle >= 22.5 && angle < 67.5) {
      imageElement.src = "media/dr.png";
      console.log("Down-right");
    } else if (angle >= 67.5 && angle < 112.5) {
      imageElement.src = "media/dc.png";
      console.log("Down");
    } else if (angle >= 112.5 && angle < 157.5) {
      imageElement.src = "media/dl.png";
      console.log("Down-left");
    } else if (
      (angle >= 157.5 && angle <= 180) ||
      (angle >= -180 && angle < -157.5)
    ) {
      imageElement.src = "media/cl.png";
      console.log("Left");
    } else if (angle >= -157.5 && angle < -112.5) {
      imageElement.src = "media/ul.png";
      console.log("Up-left");
    } else if (angle >= -112.5 && angle < -67.5) {
      imageElement.src = "media/uc.png";
      console.log("Up");
    } else if (angle >= -67.5 && angle < -22.5) {
      imageElement.src = "media/ur.png";
      console.log("Up-right");
    }
  },
  100
);
