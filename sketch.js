var bd = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
var cols = ["red","blue","green","lightblue","yellow","orange"];
var grid = 40;
var chs = 0;// 0:default, 1:mousePressed, 2:mouseReleased
var chp = [[],[]];

function setup() {
  createCanvas(360, 360);
  settings();
}

function draw() {
  //background(220);
}

function mousePressed() {
  if(chs == 0) {
    chp[0] = tile(mouseX,mouseY);
    //console.log(chp[0]);
    chs = 1;
  }
}

function mouseReleased() {
  if(chs == 1) {
    chp[1] = tile(mouseX,mouseY);
    //console.log(chp[1]);
    chs = 2;
    changeTile();
  }
}

function changeTile() {
  if(chp[0][0] == chp[1][0]&&chp[0][1] == chp[1][1]) {
    //console.log("同じマスです");
  }else {
    var ty = (abs(chp[0][0]-chp[1][0]) == 1);
    var tx = (abs(chp[0][1]-chp[1][1]) == 1);
    //console.log(ty,tx);
    if(ty != tx) {
      var p1 = bd[chp[0][0]][chp[0][1]];
      var p2 = bd[chp[1][0]][chp[1][1]];
      
      bd[chp[1][0]][chp[1][1]] = p1;
      bd[chp[0][0]][chp[0][1]] = p2;
      
      repaint();
    }
  }
  chs = 0;
}

function tile(x,y) {
  var arr = [Math.floor(y/grid),Math.floor(x/grid)];
  return arr;//y,x
}

function settings() {
  for(var dy = 0;dy < bd.length;dy++) {
    for(var dx = 0;dx < bd[dy].length;dx++) {
      var r = Math.floor(Math.random() * 6);
      bd[dy][dx] = r;
    }
  }
  repaint();
}

function repaint() {
  for(var dy = 0;dy < bd.length;dy++) {
    for(var dx = 0;dx < bd[dy].length;dx++) {
      /*switch(bd[dy][dx]) {
        case 0:
          fill("black")
          rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
          break;
        case 1:
          fill("red")
          rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
          break;
        case 2:
          fill("blue")
          rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
          break;
        
      }*/
      //console.log(bd[dy][dx])
      fill(cols[bd[dy][dx]]);
      rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
    }
  }
}

$('#off').on('click', function(){
   $('body').addClass('no_scroll');
});
 
$('#on').on('click', function(){
   $('body').removeClass('no_scroll');
});
