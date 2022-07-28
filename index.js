$(document).ready(function () {

   //call to initialize canvas
   initialize();
   
   //call for clear canvas button
   clearCanvas();

   //call for fill canvas button
   fillCanvas();
 });

 function getPosition(mouseEvent, sigCanvas) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
       x = mouseEvent.pageX;
       y = mouseEvent.pageY;
    } else {
       x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
       y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
 }

 function initialize() {
    var sigCanvas = document.getElementById("canvasSignature");
    var context = sigCanvas.getContext("2d");

   context.strokeStyle = 'Black';

    var is_touch_device = 'ontouchstart' in document.documentElement;

    if (is_touch_device) {
       var drawer = {
          isDrawing: false,
          touchstart: function (coors) {
             context.beginPath();
             context.moveTo(coors.x, coors.y);
             this.isDrawing = true;
          },
          touchmove: function (coors) {
             if (this.isDrawing) {
                context.lineTo(coors.x, coors.y);
                context.stroke();
             }
          },
          touchend: function (coors) {
             if (this.isDrawing) {
                this.touchmove(coors);
                this.isDrawing = false;
             }
          }
       };

       function draw(event) {
          var coors = {
             x: event.targetTouches[0].pageX,
             y: event.targetTouches[0].pageY
          };

          var obj = sigCanvas;

          if (obj.offsetParent) {
             do {
                coors.x -= obj.offsetLeft;
                coors.y -= obj.offsetTop;
             }

             while ((obj = obj.offsetParent) != null);
          }

          drawer[event.type](coors);
       }
       sigCanvas.addEventListener('touchstart', draw, false);
       sigCanvas.addEventListener('touchmove', draw, false);
       sigCanvas.addEventListener('touchend', draw, false);

       sigCanvas.addEventListener('touchmove', function (event) {
          event.preventDefault();
       }, false);
       
    }
    else {

       $("#canvasSignature").mousedown(function (mouseEvent) {
          var position = getPosition(mouseEvent, sigCanvas);

          context.moveTo(position.X, position.Y);
          context.beginPath();

          $(this).mousemove(function (mouseEvent) {
             drawLine(mouseEvent, sigCanvas, context);
          }).mouseup(function (mouseEvent) {
             finishDrawing(mouseEvent, sigCanvas, context);
          }).mouseout(function (mouseEvent) {
             finishDrawing(mouseEvent, sigCanvas, context);
          });
       });

    }
 }

 function drawLine(mouseEvent, sigCanvas, context) {

    var position = getPosition(mouseEvent, sigCanvas);

    context.lineTo(position.X, position.Y);
    context.stroke();
 }

 function finishDrawing(mouseEvent, sigCanvas, context) {
    drawLine(mouseEvent, sigCanvas, context);

    context.closePath();
    $(sigCanvas).unbind("mousemove")
                .unbind("mouseup")
                .unbind("mouseout");
 }

 function clearCanvas(){
   var sigCanvas = document.getElementById("canvasSignature");
   var context = sigCanvas.getContext("2d");

   document.getElementById('clear').addEventListener('click', function () {
      context.clearRect(0, 0, canvasSignature.width, canvasSignature.height);
  }, false);


   }

function fillCanvas(){
   var sigCanvas = document.getElementById("canvasSignature");
   var context = sigCanvas.getContext("2d");

   context.fillStyle = 'rgb(120, 0, 200)';
   
   document.getElementById('fill').addEventListener('click', function () {
      context.fillRect(0, 0, canvasSignature.width, canvasSignature.height);
  }, false);
}

