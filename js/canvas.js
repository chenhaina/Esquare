var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
var cubeW=20;  
var cubeArr=[[6,7,12,13],[7,8,11,12],[6,7,11,12],[7,12,17,18],[7,12,16,17],[7,12,17,22],[7,11,12,13]];  
var colorArr=['#ffc0cb','#dda0dd','#9370db','#6495ed','#fa8072','#ff8c00','#008000']; 
var imgsrc=['img/bainque.png','img/dianwanxiaozi.png','img/luban.png','img/minyue.png','img/sun.png','img/yase.png','img/zhenji.png','img/daji.png']
var rotateArr=[4,9,14,19,24,3,8,13,18,23,2,7,12,17,22,1,6,11,16,21,0,5,10,15,20];
var canW=200;
var canH=400;
var fcube={};
var juzhen=[];
var myinter;
var img;
var score=document.getElementsByClassName('scores')[0];

window.onload=function(){
	drawLine();
	for(var i=0;i<canW/cubeW;i++){
		juzhen[i]=[];
		for(var j=0;j<canH/cubeW;j++){
			juzhen[i][j]=0;
		}
	}
	fourCube();
	//myinter=setInterval('moveDown()',500);
}

function fourCube(){
	var index=Math.floor(Math.random()*cubeArr.length);
	fcube.cubeNow=cubeArr[index];
	fcube.point=[2,-1];
	fcube.index=index;
	//drawCube(colorArr[fcube.index]);	
	drawImg(imgsrc[fcube.index]);
}

function drawCube(color){
	var px,py;
	cxt.fillStyle=color;
	cxt.strokeStyle='#fff';
	for(var i=0;i<4;i++){
		px=fcube.point[0]+fcube.cubeNow[i]%5;
		py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5);
		cxt.fillRect(px*cubeW,py*cubeW,cubeW,cubeW);
		cxt.strokeRect(px*cubeW,py*cubeW,cubeW,cubeW);
	}	
}
function drawImg(isrc){
	img=new Image()
	img.src=isrc;
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        cxt.strokeStyle='#fff';
		for(var i=0;i<4;i++){
			px=fcube.point[0]+fcube.cubeNow[i]%5;
			py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5);
			cxt.drawImage(img,px*cubeW,py*cubeW,cubeW,cubeW);
			cxt.strokeRect(px*cubeW,py*cubeW,cubeW,cubeW);
		} 
        return; // 直接返回，不用再处理onload事件    
    }
    img.onload=function(){
    	cxt.strokeStyle='#fff';
		for(var i=0;i<4;i++){
			px=fcube.point[0]+fcube.cubeNow[i]%5;
			py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5);
			cxt.drawImage(img,px*cubeW,py*cubeW,cubeW,cubeW);
			cxt.strokeRect(px*cubeW,py*cubeW,cubeW,cubeW);
		}	
    }
}

function clearCube(){
	var px,py;
	cxt.strokeStyle='#ddd';
	for(var i=0;i<4;i++){
		var movex=fcube.cubeNow[i]%5;
		var movey=Math.floor(fcube.cubeNow[i]/5);
		px=movex+fcube.point[0];
		py=movey+fcube.point[1];
		cxt.clearRect(px*cubeW,py*cubeW,cubeW,cubeW);
		cxt.strokeRect(px*cubeW,py*cubeW,cubeW,cubeW);
	}	
}

function drawLine(){
	cxt.lineWidth=1;
	cxt.strokeStyle='#ddd';
	for(var i=1;i<=canW/cubeW;i++){
	   cxt.moveTo(i*cubeW,0);
	   cxt.lineTo(i*cubeW,canH);
	}
	cxt.stroke();
	for(var j=1;j<=canH/cubeW;j++){
	   cxt.moveTo(0,j*cubeW);
       cxt.lineTo(canW,j*cubeW);
	}
    cxt.stroke();
}

function moveDown(){
	var length,isempty=true,px,py,py_max=0; 
	for(var i=0;i<4;i++){
		if(fcube.cubeNow[i]>py_max)py_max=fcube.cubeNow[i];
	}
	length=Math.floor(py_max/5);
	for(var i=0;i<4;i++){
		py=fcube.point[1]+1+Math.floor(fcube.cubeNow[i]/5) ;
		px=fcube.point[0]+fcube.cubeNow[i]%5;
		if(juzhen[px][py]==1){
			isempty=false;
			break;
		}
	}
	if(isempty&&(fcube.point[1]+length+1)<(canH/cubeW)){		
		clearCube();
		fcube.point[1]=fcube.point[1]+1;		
		//drawCube(colorArr[fcube.index]);
		drawImg(imgsrc[fcube.index]);
   }
	else{			
		for(var i=0;i<4;i++){			
			py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5) ;
			px=fcube.point[0]+fcube.cubeNow[i]%5;
			juzhen[px][py]=1;
		}	
		//drawCube('#555');
		drawImg(imgsrc[7]);
		checkfullLine();
	}
}
function checkfullLine(){
	var changeScore=false;
	var isfullLine=true;
	for(var i=0;i<canW/cubeW;i++){
		if(juzhen[i][0]==1){
			
			clearInterval(myinter);
			tempstop()
			alert("游戏结束啦!");
			return;
		}
	}
	console.log("finish check outside");
	for(var j=(canH/cubeW)-1;j>=0;j--){
		isfullLine=true;
		for(var i=0;i<canW/cubeW;i++){
			if(juzhen[i][j]==0){
				isfullLine=false;
			}			
		}
		if(isfullLine){
			score.innerText=parseInt(score.innerText)+10;
			changeScore=true;
			for(var s=j;s>=0;s--) {  
	            for (var i = 0; i < (canW / cubeW); i++) {  
	                (s- 1) >= 0 ? juzhen[i][s] = juzhen[i][s - 1] : juzhen[i][s] = 0;  
	            }  
	        }  
		}
	}
	console.log(fcube.cubeNow);
	if(changeScore){
		cxt.clearRect(0,0,canW,canH);
		drawLine();
		//cxt.fillStyle="#555";
		cxt.strokeStyle="#fff";
		img=new Image()
		img.src='img/daji.png';
//		if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
//		for(var i=0;i<canW/cubeW;i++){
//			for(var j=0;j<canH/cubeW;j++){
//				if(juzhen[i][j]==1){
//					//cxt.fillRect(i*cubeW,j*cubeW,cubeW,cubeW);
//					cxt.drawImage(this,i*cubeW,j*cubeW,cubeW,cubeW)
//					cxt.strokeRect(i*cubeW,j*cubeW,cubeW,cubeW);
//				}
//			}
//		}		
//    return;
//  }
		img.onload=function(){
			for(var i=0;i<canW/cubeW;i++){
			for(var j=0;j<canH/cubeW;j++){
				if(juzhen[i][j]==1){
					//cxt.fillRect(i*cubeW,j*cubeW,cubeW,cubeW);
					cxt.drawImage(this,i*cubeW,j*cubeW,cubeW,cubeW)
					cxt.strokeRect(i*cubeW,j*cubeW,cubeW,cubeW);
				}
			}
		}		
		}		
	}
	fourCube();
}
function moveLeft(){
	var left=4;
	var isempty=true;
	var px,py;
	for(var i=0;i<4;i++){
		if(fcube.cubeNow[i]%5<left)
		left=fcube.cubeNow[i]%5;
		py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5) ;
		px=fcube.point[0]-1+fcube.cubeNow[i]%5;
		if(juzhen[px][py]==1){
			isempty=false;
			break;
		}
	}
	if(fcube.point[0]+left>0&&isempty){	
	clearCube();
	fcube.point[0]=fcube.point[0]-1;
	//drawCube(colorArr[fcube.index]);
	drawImg(imgsrc[fcube.index]);
   }
}
function rotate(){
	var left=4;
	var isempty=true;
	var px,py;
	var tempRotate=[0,0,0,0];
	for(var i=0;i<4;i++){
		tempRotate[i]=rotateArr[fcube.cubeNow[i]];	
		px=fcube.point[0]+tempRotate[i]%3;  
        py=fcube.point[1]+Math.floor(tempRotate[i]/3); 
		if(juzhen[px][py]==1){
			isempty=false;
			break;
		}
	}
	if(isempty){	
	clearCube();
	fcube.cubeNow=tempRotate.concat();	
	//drawCube(colorArr[fcube.index]);
	drawImg(imgsrc[fcube.index]);
   }
}
function moveRight(){
	var right=0;
	var isempty=true;
	var px,py;
	for(var i=0;i<4;i++){
		if(fcube.cubeNow[i]%5>right)
		right=fcube.cubeNow[i]%5;
		py=fcube.point[1]+Math.floor(fcube.cubeNow[i]/5);
		px=fcube.point[0]+1+fcube.cubeNow[i]%5;
		if(juzhen[px][py]==1){
			isempty=false;
			break;
		}
	}
	if((fcube.point[0]+right+1)<(canW/cubeW)&&isempty){	
    clearCube();
	fcube.point[0]=fcube.point[0]+1;
	//drawCube(colorArr[fcube.index]);
	drawImg(imgsrc[fcube.index]);
   }
}
function tempstop(){
	clearInterval(myinter);
}
function start(){
	myinter=setInterval("moveDown()",1000);
}
var start1=document.getElementsByClassName('start')[0];
var stop1=document.getElementsByClassName('stop')[0];
var up1=document.getElementsByClassName('up')[0];
var dowm1=document.getElementsByClassName('down')[0];
var left1=document.getElementsByClassName('left')[0];
var right1=document.getElementsByClassName('right')[0];

start1.addEventListener('click',function(e){
		e.stopPropagation();
	    var e = e || window.event;        //e是IE事件，window.event是dom事件       
	    if(e.preventDefault){    
	      e.preventDefault();            //DOM中取消事件的方法  
	       } else {    
	        e.returnValue = false;       //IE中取消事件的方法  
	       }    
	    start()
},false);
stop1.addEventListener('click',function(e){
		e.stopPropagation();
	    var e = e || window.event;        //e是IE事件，window.event是dom事件       
	    if(e.preventDefault){    
	      e.preventDefault();            //DOM中取消事件的方法  
	       } else {    
	        e.returnValue = false;       //IE中取消事件的方法  
	       }     
	    tempstop()
},false);
up1.addEventListener('click',function(e){
		e.stopPropagation();
	    var e = e || window.event;        //e是IE事件，window.event是dom事件       
	    if(e.preventDefault){    
	      e.preventDefault();            //DOM中取消事件的方法  
	       } else {    
	        e.returnValue = false;       //IE中取消事件的方法  
	       }      
		rotate()
},false);

dowm1.addEventListener('click',function(e){
	    e.stopPropagation();
	    var e = e || window.event;        //e是IE事件，window.event是dom事件       
	    if(e.preventDefault){    
	      e.preventDefault();            //DOM中取消事件的方法  
	       } else {    
	        e.returnValue = false;       //IE中取消事件的方法  
	       }    
		moveDown()
},false);
left1.addEventListener('click',function(e){
	    e.stopPropagation();
	    var e = e || window.event;        //e是IE事件，window.event是dom事件       
	    if(e.preventDefault){    
	      e.preventDefault();            //DOM中取消事件的方法  
	       } else {    
	        e.returnValue = false;       //IE中取消事件的方法  
	       }      
	    moveLeft()
},false);
right1.addEventListener('click',function(e){	    
	    e.preventDefault();
	    moveRight()
},false);
//start1.addEventListener('click',start(event),false);

window.onkeydown=function(event){
	switch(event.keyCode){
		case 37:moveLeft(); break;
		case 38:rotate();break;
		case 39:moveRight();break;
		case 40:moveDown();break;
		case 66:tempstop();break;//b
		case 65:start();break;//a
	}	
}

