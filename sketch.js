var bd = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
var cols = ["red","blue","green","lightblue","yellow","orange","black"];
var grid = 40;
var chs = 0;// 0:default, 1:mousePressed, 2:mouseReleased
var chp = [[],[]];
var di = -1


function setup() {
  createCanvas(360, 360);
  settings();
}

function draw() {
  
}

async function dropBlocks(t) {
  await sleep(t)
  while(true) {
    //console.log(bd.length,bd[0].length);
    for(var dy = 0;dy < bd.length;dy++) {
      var ru = false;
      for(var dx = 0;dx < bd[dy].length;dx++) {
        if(bd[dy][dx] == -1) {
          for(var i = dy;i >= 0;i--) {
            if(i-1 >= 0) {
              if(bd[i-1][dx] != -1) {
                bd[i][dx] = bd[i-1][dx];
              }
            }else {
              var r = Math.floor(Math.random() * 6);
              bd[i][dx] = r;
            }
          }
          ru = true;
        }
      }
      if(ru) {
        await sleep(t);
        repaint();
      }
    }
    //await sleep(t);
    var tmp = more3(bd);
    cb(tmp);
    var tmp2 = xty(more3(rtc(bd)));
    cb(tmp2);
    //console.log(tmp,tmp2);
    if(tmp.length == 0&&tmp2.length == 0){
      break;
    }
    await sleep(t);
    repaint();
  }
  chs = 0;
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
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
    if(di != -1) {
      chp[1] = tile(mouseX,mouseY);
      //console.log(chp[1]);
      chs = 2;
      changeTile();
      dropBlocks(750);
    }
  }
}

function mouseDragged() {
  di = getD(chp[0][1]*grid,chp[0][0]*grid,mouseX,mouseY);
  //console.log(di);
}

function getD(x1,y1,x2,y2) {
  //console.log(x1,y1,x2,y2);
  if(abs(x1-x2) > abs(y1-y2)) {//x
    if(abs(x1-x2) >= 25) {
      if(x1 > x2) {//west
        return 3;
      }else {//east
        return 1;
      }
    }else {
      return -1;
    }
  }else if(abs(y1-y2) >= 25) {
    if(y1 > y2) {//north
      return 0;
    }else {//south
      return 2;
    }
  }else {
    return -1;
  }
}

function changeTile() {
  var d = [[0,-1],[1,0],[0,1],[-1,0]];
  if(chp[0][0] == chp[1][0]&&chp[0][1] == chp[1][1]) {
    //console.log("同じマスです");
    //console.log(dire4(chp[0][1],chp[0][0]))
  }else if(di != -1) {
    //console.log(ty,tx);
    var t = d[di];
    //console.log(t);
    var p1 = bd[chp[0][0]][chp[0][1]];
    var p2 = bd[chp[0][0]+t[1]][chp[0][1]+t[0]];
    
    var arr = JSON.parse(JSON.stringify(bd))
    console.log(arr[chp[0][0]+t[1]][chp[0][1]+t[0]],arr[chp[0][0]][chp[0][1]],bd[chp[0][0]+t[1]][chp[0][1]+t[0]],bd[chp[0][0]][chp[0][1]]);
    arr[chp[0][0]+t[1]][chp[0][1]+t[0]] = p1;
    arr[chp[0][0]][chp[0][1]] = p2;
    console.log(arr[chp[0][0]+t[1]][chp[0][1]+t[0]],arr[chp[0][0]][chp[0][1]],bd[chp[0][0]+t[1]][chp[0][1]+t[0]],bd[chp[0][0]][chp[0][1]]);
    var t1 = more3(arr);
    var t2 = xty(more3(rtc(arr)));
    
    if(t1.length != 0||t2.length != 0) {
      bd[chp[0][0]+t[1]][chp[0][1]+t[0]] = p1;
      bd[chp[0][0]][chp[0][1]] = p2;
    }
    repaint();
    
    var tmp = more3(bd);
    cb(tmp);
    var tmp2 = xty(more3(rtc(bd)));
    cb(tmp2);
    repaint();
  }
}

function cb(arr) {
  console.log(arr);
  for(var a of arr) {
    //fill(cols[6])
    //circle(a[0]*grid, a[1]*grid, 10);
    bd[a[1]][a[0]] = -1;
  }
}

function rtc(arr) {
  var result = [];
  for(var i = 0;i < arr[0].length;i++) {
    result.push([...Array(arr.length)]);
  }
  for(var dy = 0;dy < arr.length;dy++) {
    for(var dx = 0;dx < arr[dy].length;dx++) {
      result[dy][dx] = arr[dx][dy];      
    }
  }
  
  return result;
}

function xty(arr) {
  for(var a in arr) {
    var x = arr[a][0];
    var y = arr[a][1];
    
    arr[a][0] = y;
    arr[a][1] = x;
  }
  
  return arr;
}

function more3(arr) {
  
  var m = [];
  for(var dy1 = 0;dy1 < arr.length;dy1++) {
    var n = -10;
    var c = 0;
    var l = -1;
    //console.log(String(dy1+1)+"行目")
    for(var dx1 = 0;dx1 < arr[dy1].length;dx1++) {
      if(n == -10) {
        n = arr[dy1][dx1];
        l = m.length-1;
        m.push([dx1,dy1]);
        c++;
      }else {
        if(arr[dy1][dx1] == n) {
          //console.log(n);
          l = m.length-1;
          m.push([dx1,dy1]);
          c++;
        }else {
          if(c < 3) {
            for(var i = 0;i < c;i++) {
              m.pop();
            }
            c = 0;
          }else {
            c = 0;
          }
          m.push([dx1,dy1]);
          c++;
        }
        //console.log("c",c,m.length);
        if(dx1 == 8) {
          //console.log("c",c)
          if(c < 3) {
            for(var i2 = 0;i2 < c;i2++) {
              m.pop();
            }
          }
        }
        
        n = arr[dy1][dx1];
      }
      
    }
  }
  
  return m;
}

function dire4(x,y) {
  var d = [[0,-1],[1,0],[0,1],[-1,0]];//x,y
  var t = [];
  var n = bd[y][x];
  for(var i of d) {
    if(!(x+i[0] < 0||x+i[0] >= bd[0].length||y+i[1] < 0||y+i[1] >= bd.length)) {
      if(n == bd[y+i[1]][x+i[0]]) {
        t.push([x+i[0],y+i[1]]);
      }
    }
  }
  return t
}

function tile(x,y) {
  var arr = [Math.floor(y/grid),Math.floor(x/grid)];
  return arr;//y,x
}

function settings() {
  for(var dy = 0;dy < bd.length;dy++) {
    for(var dx = 0;dx < bd[dy].length;dx++) {
      bd[dy][dx] = -1;
    }
  }
  dropBlocks(0);
}

function repaint() {
  clear();
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
      if(bd[dy][dx] != -1) {
        fill(cols[bd[dy][dx]]);
        rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
      }
    }
  }
}

function disableScroll(event) {
  event.preventDefault();
}

// イベントと関数を紐付け
document.addEventListener('touchmove', disableScroll, { passive: false });

