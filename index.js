// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', ()=>{
		
	resize(); // Resizes the canvas once the window loads
	document.addEventListener('mousedown', startPainting);
	document.addEventListener('mouseup', stopPainting);
	document.addEventListener('mousemove', sketch);
	window.addEventListener('resize', resize);
});
	
const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');




// Resizes the canvas to the available size of the window.
function resize(){
ctx.canvas.width = 1000;
ctx.canvas.height = 500;
}
	
// Stores the initial position of the cursor
let coord = {x:0 , y:0};

// This is the flag that we are going to use to
// trigger drawing
let paint = false;
	
//variables for marker and pencil status
let markerClicked = false;
let pencilClicked = true;


// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event){
coord.x = event.clientX - canvas.offsetLeft;
coord.y = event.clientY - canvas.offsetTop;
}




// The following functions toggle the flag to start
// and stop drawing
function startPainting(event){
paint = true;
getPosition(event);
}
function stopPainting(){
paint = false;
}




function sketch(event){
if (!paint) return;
ctx.beginPath();

//if statement to test if marker or pencil was clicked
if(markerClicked){
ctx.lineWidth = 4;
}
else{
	ctx.lineWidth = 1;
}

// Sets the end of the lines drawn
// to a round shape.
ctx.lineCap = 'round';
	
ctx.strokeStyle = 'black';
	
// The cursor to start drawing
// moves to this coordinate
ctx.moveTo(coord.x, coord.y);

// The position of the cursor
// gets updated as we move the
// mouse around.
getPosition(event);

// A line is traced from start
// coordinate to this coordinate
ctx.lineTo(coord.x , coord.y);
	
// Draws the line.
ctx.stroke();
}
//pencil clicked

function pencil_click(clicked){
	markerClicked = false;
	pencilClicked = true;
}

//marker clicked

function marker_click(clicked){
	pencilClicked = false;
	markerClicked = true;
}


//clear button clicked

function clear_click(clicked){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//fill button clicked

function fill_click(clicked){
	ctx.fillStyle = 'rgb(120, 0, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//download functionality
const btnDownload = document.querySelector("#btnDownload");

btnDownload.addEventListener("click", function(){
	//for i/e or edge
	if (window.navigator.msSaveBlob){
		window.navigator.msSaveBlob(canvas.msToBlob(), "image.png");
		}
	//other browsers
	else {
		const a = document.createElement("a");
		document.body.appendChild(a);
		a.href = canvas.toDataURL();
		a.download = "image.png";
		a.click();
		document.body.removeChild(a);
	}
});
 
