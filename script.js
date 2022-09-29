//generate color picker

var colored = document.querySelector("#ColorSelect");
var current = document.querySelector("#Current");
var frag2 = document.createDocumentFragment();
var mode = "color"; // for darken/lighten

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#ffffff', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#000000', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6'];

colorArray.forEach(ColorGrid);

function ColorGrid(color){

    let GridItem = document.createElement("div");
      GridItem.style.display = "inline";
      GridItem.style.border = "1px solid black";
      GridItem.style.backgroundColor = `${color}`;
      GridItem.style.height = "20px";
      GridItem.addEventListener('click', function(){
        mode = "color";
        current.innerHTML="";
        current.style.backgroundColor = `${color}`;
        sessionStorage.setItem("current", color);
    });
      GridItem.style.cursor = "pointer";
      frag2.appendChild(GridItem);
}
colored.appendChild(frag2);

// prompt grid and create grid

var grid = document.querySelector("#grid");
var frag = document.createDocumentFragment();
function Create() {

    var checkNum = false;
    let x=0;
    while(!checkNum){
        x = prompt("Please enter the number of columns/rows you want", "20");
        if (x>64 || x<5 || isNaN(x) ) alert("min number is 5, max number is 64 / input is not a number");
        else checkNum = true;
    }

  grid.innerHTML = "";
  resetGrid(x);
}

function resetGrid(x) {
  let n = Number(x);
  alert("grid is set to " + n + "x" +n);
  grid.style.gridTemplateColumns = `repeat(auto-fill, calc(${960/n}px))`;
  grid.style.gridGap = "0px";

  for (let z = 0; z < n; z++) {
    for (let y = 0; y < n; y++) {
      let GridItem = document.createElement("div");
      GridItem.style.display = "inline";
      GridItem.style.border = "1px solid black";
      GridItem.ondragstart = function() { return false; }; //prevent div from dragging and causing errors
      var pressed = false;
      GridItem.setAttribute('darkshift', 0);
      GridItem.addEventListener('mousedown', function(){
        pressed = true;
            if(mode == "lighten"){
                GridItem.setAttribute('darkshift',  Number(GridItem.getAttribute('darkshift'))+1);
                GridItem.style.filter = `brightness(calc(${1+(0.2*GridItem.getAttribute('darkshift'))}))`;
            }
            else if(mode =="darken"){
                GridItem.setAttribute('darkshift',  Number(GridItem.getAttribute('darkshift'))-1);
                GridItem.style.filter = `brightness(calc(${1+(0.2*GridItem.getAttribute('darkshift'))}))`;
            }
            else{
            let color = sessionStorage.getItem("current");
            GridItem.style.backgroundColor = `${color}`;
            GridItem.style.filter = "brightness(1)";
            }
        });
        
        GridItem.addEventListener('mouseup', function(){
            pressed = false;
        });

        GridItem.addEventListener('mouseover', function(){
        if (pressed){
            if(mode == "lighten"){
                GridItem.setAttribute('darkshift', Number(GridItem.getAttribute('darkshift'))+1);
                GridItem.style.filter = `brightness(calc(${1+(0.2*GridItem.getAttribute('darkshift'))}))`;
            }
            else if(mode =="darken"){
                GridItem.setAttribute('darkshift',  Number(GridItem.getAttribute('darkshift'))-1);
                GridItem.style.filter = `brightness(calc(${1+(0.2*GridItem.getAttribute('darkshift'))}))`;
            }
            else{
            let color = sessionStorage.getItem("current");
            GridItem.style.backgroundColor = `${color}`;
            GridItem.style.filter = "brightness(1)";
        }
    }
      });

    GridItem
      frag.appendChild(GridItem);
    }
  }
  grid.appendChild(frag);
  gridReset = false;
}


//lighten and darken


function lighten(){
    mode = "lighten";
    current.style.backgroundColor = "white";
    var text = document.createTextNode("Lightening");
    current.innerHTML="";
    current.appendChild(text);
}

function darken(){
    mode = "darken";
    current.style.backgroundColor = "white";
    current.innerHTML="";
    var text = document.createTextNode("Darkening");
    current.appendChild(text);
}

