let lastX, lastY;
const imageElement = document.getElementById("direction");

document.addEventListener("mousemove", function (event) {
  if (lastX && lastY) {
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    if (deltaX === 0 && deltaY === 0) {
      console.log("No movement");
    } else {
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      if (angle >= -22.5 && angle < 22.5) {
        //RIGHT
        imageElement.src = "media/cr.png";
        console.log("Right");
      } else if (angle >= 22.5 && angle < 67.5) {
        //DOWN-RIGHT
        imageElement.src = "media/dr.png";
        console.log("Down-right");
      } else if (angle >= 67.5 && angle < 112.5) {
        //DOWN
        imageElement.src = "media/dc.png";
        console.log("Down");
      } else if (angle >= 112.5 && angle < 157.5) {
        //DOWN-LEFT
        imageElement.src = "media/dl.png";
        console.log("Down-left");
      } else if (
        (angle >= 157.5 && angle <= 180) ||
        (angle >= -180 && angle < -157.5)
      ) {
        //LEFT
        imageElement.src = "media/cl.png";
        console.log("Left");
      } else if (angle >= -157.5 && angle < -112.5) {
        //UP-LEFT
        imageElement.src = "media/ul.png";
        console.log("Up-left");
      } else if (angle >= -112.5 && angle < -67.5) {
        //UP
        imageElement.src = "media/uc.png";
        console.log("Up");
      } else if (angle >= -67.5 && angle < -22.5) {
        //UP-RIGHT
        imageElement.src = "media/ur.png";
        console.log("Up-right");
      }
    }
  }
  lastX = event.clientX;
  lastY = event.clientY;
  c;
});
