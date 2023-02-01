var bd = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
var cols = ["red","blue","green","lightblue","yellow","orange","black"];
var grid = 40;
var chs = 0;// 0:default, 1:mousePressed, 2:mouseReleased
var chp = [[],[]];
var di = -1
var goalk = [];
var goaln = [];
var rBlocks = [0,0,0,0,0,0];
var cItems = [0,0];//4,5
var maxBlocks = -1;

function setup() {
  var cv = createCanvas(360, 360);
  cv.style("position","absolute");
  textAlign(LEFT, TOP);
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
    var tmp2 = xty(more3(rtc(bd)));
    var tmp3 = concat2(tmp,tmp2);
    var tmp4 = getDouble(tmp3);
    console.log("tmp4 : ",tmp4);
    tmp3 = concat2(tmp3,tmp4);
    cb(tmp3);
    repaint();
    //console.log(tmp,tmp2);
    if(tmp.length == 0&&tmp2.length == 0){
      break;
    }
    await sleep(t);
    repaint();
  }
  if(goaln.reduce((sum, element) => sum + element, 0) == 0) {
    await sleep(500);
    showScores();
  }
  chs = 0;
}

function getDouble(arr) {
  var tmp = [[],[]];//x,y
  for(var a of arr) {
    tmp[0].push(a[0]);
    tmp[1].push(a[1]);
  }
  /*console.log("result1 is running")
  var result1 = [];
  for(var t in tmp[0]) {
    var num_flt = tmp[0].filter(function(value) {
      console.log(value,this[t],t,arr[t][3],(arr[t][3] == 0||arr[t][3] == 2));
      if(value == this[t]&&tmp[0].indexOf(this[t]) != tmp[0].lastIndexOf(this[t])) if(arr[t][3] == 0||arr[t][3] == 2) result1.push(t);
    },tmp[0]);
    //console.log("flt",num_flt);
    //result1 = result1.concat(num_flt);
  }
  console.log("result2 is running")
  var result2 = [];
  for(var t2 in tmp[1]) {
    var num_flt2 = tmp[1].filter(function(value) {
      console.log(value,this[t2],t2,arr[t2][3],(arr[t2][3] == 0||arr[t2][3] == 2));
      if(value == this[t2]&&tmp[1].indexOf(this[t2]) != tmp[1].lastIndexOf(this[t2])) if(arr[t2][3] == 0||arr[t2][3] == 2) result2.push(t2);
    },tmp[1]);
    //console.log("flt2",num_flt2);
    //result2 = result2.concat(num_flt2);
  }*/
  var r3 = [];
  for(var ts1 in arr) {
    for(var ts2 in arr) {
      if(arr[ts1][0] == arr[ts2][0]&&arr[ts1][1] == arr[ts2][1]&&ts1 != ts2&&(arr[ts1][3] == 0||arr[ts1][3] == 2)) {
        r3.push(ts1);
      }
    }
  }
  /*console.log("tmp", tmp);
  console.log("result1",result1)
  console.log("result2",result2)
  var r1 = result1.filter(function (x, i, self) {
    return self.indexOf(x) === i && i !== self.lastIndexOf(x);
  });
  var r2 = result2.filter(function (x, i, self) {
    return self.indexOf(x) === i && i !== self.lastIndexOf(x);
  });
  
  var rs = r1.concat(r2);
  
  var r3 = rs.filter(function (x, i, self) {
    return self.indexOf(x) === i && i !== self.lastIndexOf(x);
  });*/
  
  var xyr = [];
  
  if(r3.length >= 2) {
    xyr.push([arr[r3[0]][0],arr[r3[0]][1],20,-1]);
  }
  return xyr;
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function mousePressed() {
  if(chs == 0&&mouseX <= grid*9&&mouseX >= 0&&mouseY <= grid*9&&mouseY >= 0) {
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
      dropBlocks(350);
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
    
    if(isItem(p1)||isItem(p2)) {
      var n1 = getItemNum(p1,p2,10,20);
      var n2 = getItemNum(p1,p2,20,30);
      if(n1 != 0&&n2 != 0) {
        bd[chp[0][0]+t[1]][chp[0][1]+t[0]] = p1;
        bd[chp[0][0]][chp[0][1]] = p2;
        var tmp = more3(bd);
        var tmp2 = xty(more3(rtc(bd)));
        var tmp3 = concat2(tmp,tmp2);
        var tmp4 = getDouble(tmp3);
        console.log("tmp4:",tmp4);
        tmp3 = concat2(tmp3,tmp4);
        cb(tmp3);
        repaint();
      }
      if(n1 != 0) {
        if(n1 == 1) {
          runItem1(chp[0][0]+t[1],chp[0][1]+t[0]);
        }else {
          runItem1(chp[0][0],chp[0][1])
        }
      }else if(n2 != 0) {
        if(n2 == 1) {
          runItem2(chp[0][0]+t[1],chp[0][1]+t[0]);
        }else {
          runItem2(chp[0][0],chp[0][1])
        }
      }
    }else {
      var arr = JSON.parse(JSON.stringify(bd))
      //console.log(arr[chp[0][0]+t[1]][chp[0][1]+t[0]],arr[chp[0][0]][chp[0][1]],bd[chp[0][0]+t[1]][chp[0][1]+t[0]],bd[chp[0][0]][chp[0][1]]);
      arr[chp[0][0]+t[1]][chp[0][1]+t[0]] = p1;
      arr[chp[0][0]][chp[0][1]] = p2;
      //console.log(arr[chp[0][0]+t[1]][chp[0][1]+t[0]],arr[chp[0][0]][chp[0][1]],bd[chp[0][0]+t[1]][chp[0][1]+t[0]],bd[chp[0][0]][chp[0][1]]);
      var t1 = more3(arr);
      var t2 = xty(more3(rtc(arr)));

      if(t1.length != 0||t2.length != 0) {
        bd[chp[0][0]+t[1]][chp[0][1]+t[0]] = p1;
        bd[chp[0][0]][chp[0][1]] = p2;
      }
      repaint();

      var tmp = more3(bd);
      var tmp2 = xty(more3(rtc(bd)));
      var tmp3 = concat2(tmp,tmp2);
      var tmp4 = getDouble(tmp3);
      console.log("tmp4 : ",tmp4);
      tmp3 = concat2(tmp3,tmp4);
      cb(tmp3);
      repaint();
    }
  }
}

function concat2(array1, array2, axis){
  if(axis != 1) axis = 0;
  var array3 = [];
  if(axis == 0){  //　縦方向の結合
    array3 = array1.slice();
    for(var i = 0; i < array2.length; i++){
      array3.push(array2[i]);
    }
  }
  else{  //　横方向の結合
    for(var i = 0; i < array1.length; i++){
      array3[i] = array1[i].concat(array2[i]);
    }
  }
  return array3;
}

function runItem1(y,x) {
  var tf = true;
  var d = [[0,-1],[1,0],[0,1],[-1,0]];//x,y
  var xy = [[x,y],[x,y]];//EW or SN
  var ds = [-1,-1];
  var a = -1;
  if(di % 2 != 0) {//ew
    ds[0] = 1;
    ds[1] = 3;
    a = 0;
  }else {//sn
    ds[0] = 2;
    ds[1] = 0;
    a = 1;
  }
  var ts = [];
  while(tf) {
    var t = [[-1,-1,-1],[-1,-1,-1]];
    t[0][0] = xy[0][0];
    t[0][1] = xy[0][1];
    
    t[1][0] = xy[1][0];
    t[1][1] = xy[1][1];
    ts = ts.concat(t)
    if(xy[0][a] >= bd.length-1&&xy[1][a] <= 0) {
      break;
    }
    xy[0][a] += d[ds[0]][a];
    xy[1][a] += d[ds[1]][a];
    
  }
  //console.log(ts);
  cb(ts);
  repaint();
  cItems[0] = cItems[0]+1;
  
}

function runItem2(y,x) {
  var tf = true;
  var d = [[0,-1],[1,0],[0,1],[-1,0]];//x,y
  var xy = [[x,y],[x,y],[x,y],[x,y]];//EW or SN
  var ds = [0,3,2,1];
  var a = [1,0,1,0];
  var ts = [];
  while(tf) {
    var t = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
    t[0][0] = xy[0][0];
    t[0][1] = xy[0][1];
    
    t[1][0] = xy[1][0];
    t[1][1] = xy[1][1];
    
    t[2][0] = xy[2][0];
    t[2][1] = xy[2][1];
    
    t[3][0] = xy[3][0];
    t[3][1] = xy[3][1];
    
    ts = ts.concat(t)
    if(xy[0][a[0]] <= 0&&xy[1][a[1]] <= 0&&xy[2][a[2]] >= bd.length-1&&xy[3][a[3]] >= bd.length-1) {
      break;
    }
    xy[0][a[0]] += d[ds[0]][a[0]];
    xy[1][a[1]] += d[ds[1]][a[1]];
    xy[2][a[2]] += d[ds[2]][a[2]];
    xy[3][a[3]] += d[ds[3]][a[3]];
    
  }
  //console.log(ts);
  cb(ts);
  repaint();
  cItems[1] = cItems[1]+1;
}

function getItemNum(p1,p2,min,max) {
  if(p1 >= min&&p1 < max) {
    return 1;
  }else if(p2 >= min&&p2 < max) {
    return 2;
  }else {
    return 0;
  }
}

function isItem(i) {
  if(i >= 10) {
    return true;
  }
  return false;
}

function cb(arr) {
  /*var ki = [];
  for(var b of items) {
    bd[b[1]][b[0]] = b[2];
  }*/
  //console.log(arr);
  for(var a of arr) {
    //fill(cols[6])
    //circle(a[0]*grid, a[1]*grid, 10);
    if(a[0] >= 0&&a[1] >= 0&&a[0] < bd.length&&a[1] < bd.length) {
      //console.log(a);
      if(a[2] == -1) {
        var v = bd[a[1]][a[0]];
        if(v < 10) {
          var i2 = rBlocks[v];
          i2++;
          rBlocks[v] = i2;
        }
        if(goalk.indexOf(v) != -1) {
          if(goaln[goalk.indexOf(v)] > 0) {
            var i = goaln[goalk.indexOf(v)];
            i--;
            goaln[goalk.indexOf(v)] = i
            document.getElementById("goal"+String(goalk.indexOf(v)+1)).textContent = "x"+String(goaln[goalk.indexOf(v)]);
          }
        }
      }
      bd[a[1]][a[0]] = a[2];
    }
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
        m.push([dx1,dy1,-1,c]);
        c++;
      }else {
        if(arr[dy1][dx1] == n) {
          //console.log(n);
          l = m.length-1;
          m.push([dx1,dy1,-1,c]);
          c++;
        }else {
          if(c < 3) {
            for(var i = 0;i < c;i++) {
              m.pop();
            }
            c = 0;
            
          }else if(c == 4) {
            m.push([dx1-3,dy1,arr[dy1][dx1-3]+1*10,c]);
            c = 0;
          }else if(c == 5) {
            m.push([dx1-3,dy1,arr[dy1][dx1-3]+2*10,c]);
            c = 0;
          }else {
            c = 0;
          }
          m.push([dx1,dy1,-1,c]);
          c++;
        }
        //console.log("c",c,m.length);
        if(dx1 == 8) {
          //console.log("c",c)
          if(c < 3) {
            for(var i2 = 0;i2 < c;i2++) {
              m.pop();
            }
          }else if(c == 4) {
            m.push([dx1-3,dy1,arr[dy1][dx1-3]+1*10,c]);
            c = 0;
          }else if(c == 5) {
            m.push([dx1-3,dy1,arr[dy1][dx1-3]+2*10,c]);
            c = 0;
          }else {
            c = 0;
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
  var i = 0;
  while(goalk.length < 4) {
    var r = Math.floor(Math.random() * 6);
    var r2 = Math.floor(Math.random() * 8)+24;
    //var r2 = Math.floor(Math.random() * 8);
    if(goalk.indexOf(r) == -1) {
      i++;
      var rt = document.getElementById("rect"+String(i));
      var gl = document.getElementById("goal"+String(i));
      goalk.push(r);
      rt.style.color = cols[r];
      goaln.push(r2);
      gl.textContent = "x"+String(r2);
    }
  }
  maxBlocks = goaln.reduce((sum, element) => sum + element, 0);
  for(var dy = 0;dy < bd.length;dy++) {
    for(var dx = 0;dx < bd[dy].length;dx++) {
      bd[dy][dx] = -1;
    }
  }
  //----- test -----//
  /*
  bd[6][6] = 2
  bd[7][6] = 2
  bd[8][5] = 2
  bd[8][6] = 3
  bd[8][7] = 2
  bd[8][8] = 2
  
  bd[8][0] = 0
  bd[7][1] = 0
  bd[8][2] = 0
  bd[7][0] = 1
  bd[8][1] = 1
  bd[7][2] = 1
  */
  //----- end -----//
  dropBlocks(0);
}

function showScores() {
var scs = document.getElementById("myScore");
var ctx = document.getElementById("myRadarChart");
var myChart = new Chart(ctx.getContext('2d'), {
  type: 'bar',
  data: {
    labels: ["消した数","必要な数"],
    datasets: [{
      label: "値",
      data: [rBlocks.reduce((sum, element) => sum + element, 0),maxBlocks],
      backgroundColor: ['#4169e1']
    }],
  },
  options: {
    responsive: false
  }
});
var ctx2 = document.getElementById("myRadarChart2");
var myChart2 = new Chart(ctx2.getContext('2d'), {
  type: 'bar',
  data: {
    labels: ["カラフル球","ブラック球"],
    datasets: [{
      label: "値",
      data: [cItems[0],cItems[1]],
      backgroundColor: ['#ffa500']
    }],
  },
  options: {
    responsive: false
  }
});
var sumBlocks = rBlocks.reduce((sum, element) => sum + element, 0)
var s = Math.round(sumBlocks/maxBlocks*100)+parseInt(cItems[0]*6)+parseInt(cItems[1]*8);
scs.textContent = String(s)+"pt";

ctx.classList.remove("nov");
ctx2.classList.remove("nov");
scs.classList.remove("nov");

}

function repaint() {
  clear();
  for(var dy = 0;dy < bd.length;dy++) {
    for(var dx = 0;dx < bd[dy].length;dx++) {
      if(bd[dy][dx] != -1) {
        if(bd[dy][dx] >= 10&&bd[dy][dx] < 20) {
          fill(cols[bd[dy][dx]-10]);
          ellipse(dx*grid+grid/2,dy*grid+grid/2,grid-4);
        }else if(bd[dy][dx] >= 20&&bd[dy][dx] < 30) {
          //fill(cols[bd[dy][dx]-20]);
          fill("black");
          ellipse(dx*grid+grid/2,dy*grid+grid/2,grid-4);
        }else {
          //console.log(bd[dy][dx]);
          if(typeof bd[dy][dx] !== "undefined") {
            fill(cols[bd[dy][dx]]);
            rect(dx*grid+1,dy*grid+1,grid-2,grid-2);
          }
        }
      }
    }
  }
}

function disableScroll(event) {
  event.preventDefault();
}

// イベントと関数を紐付け
document.addEventListener('touchmove', disableScroll, { passive: false });

