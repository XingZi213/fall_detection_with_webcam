import labels from "./labels.json";

/**
 * Render prediction boxes
 * @param {React.MutableRefObject} canvasRef canvas tag reference
 * @param {number} threshold threshold number
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 */
const music = new Audio('public/alert.wav');
var d = new Date();
window.time =0;
console.log(d);
export const renderBoxes = (canvasRef, threshold, boxes_data, scores_data, classes_data) => {
  const ctx = canvasRef.current.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

  // font configs
  const font = "18px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  for (let i = 0; i < scores_data.length; ++i) {
    if (scores_data[i] > threshold) {
      const klass = labels[classes_data[i]];
      const score = (scores_data[i] * 100).toFixed(1);

      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= canvasRef.current.width;
      x2 *= canvasRef.current.width;
      y1 *= canvasRef.current.height;
      y2 *= canvasRef.current.height;
      const width = x2 - x1;
      const height = y2 - y1;

      // Draw the bounding box.
     
      ctx.lineWidth = 2;

      //   ctx.fillStyle = "rgba(227,23,13,0.5)";
      // ctx.fillRect(x1, y1, width, height);
      // Draw the label background.
	  if(klass=="upright")
	  {
          ctx.fillStyle = "rgba(63,227,13,0.4)";
          ctx.fillRect(x1, y1, width, height);
		  ctx.fillStyle = "rgba(63,227,13,1)";
		   ctx.strokeStyle = "rgba(63,227,13,0.5)";
          window.time = window.time - 10
          if (window.time<0){
              window.time=0;
          }
	  }
      else if (klass == "fall")
	  {
          ctx.fillStyle = "rgba(227,23,13,0.4)";
          ctx.fillRect(x1, y1, width, height);
		  ctx.fillStyle = "rgba(227,23,13,1)";
          ctx.strokeStyle = "rgba(227,23,13,0.5)";
          window.time = window.time + 1
          if (window.time >100){
              music.play();
              music.loop =true;
              console.log(alert)
          }
	  }
      if (window.time<100){
          music.pause();
      }
      console.log(window.time)

      const textWidth = ctx.measureText(klass + " - " + score + "%").width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x1 - 1, y1 - (textHeight + 2), textWidth + 2, textHeight + 2);

      // Draw labels
      ctx.fillStyle = "#ffffff";
      ctx.fillText(klass + " - " + score + "%", x1 - 1, y1 - (textHeight + 2));
    }
  }
};
