// JavaScript Document
//运动框架
function css(obj, attr, value)
{
	if(arguments.length==2)
	{
		var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr=='opacity')
		{
			return parseInt(parseFloat(sCur)*100);
		}
		else
		{
			return parseInt(sCur);
		}
	}
	else if(arguments.length==3)
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var MIAOV_MOVE_TYPE={
	BUFFER: 1,
	FLEX: 2,
	FAST: 3,
	SLOW: 4,
	NORMAL: 5
};
function StartMove(obj, oTarget, iType, fnCallBack, fnDuring)
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)
	{
		case MIAOV_MOVE_TYPE.BUFFER:
			fnMove=DoMoveBuffer;
			break;
		case MIAOV_MOVE_TYPE.FLEX:
			fnMove=DoMoveFlex;
			break;
		case MIAOV_MOVE_TYPE.CONSTANT:
			fnMove=DoMoveConstant;
			break;
	}
	
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
		
		var now=(new Date()).getTime();
		obj.lastMove=now;
	}, 30);
	
	if(!obj.lastMove)
	{
		obj.lastMove=0;
	}
	
	var now=(new Date()).getTime();
	if(now-obj.lastMove>30)
	{
		fnMove(obj, oTarget, fnCallBack, fnDuring);
		
		var now=(new Date()).getTime();
		obj.lastMove=now;
	}
}
//缓冲运动
function DoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		oTarget[attr]=parseInt(oTarget[attr]);
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			
			speed=(oTarget[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}
//弹性运动
function DoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1)
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/3;
			obj.oSpeed[attr]*=0.5;
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}
//匀速运动 Constant
function DoMoveConstant(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		oTarget[attr]=parseInt(oTarget[attr]);
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			(oTarget[attr]-cur)>=0?speed=10:speed=-10;
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		if(fnCallBack)fnCallBack.call(obj);
	}
}
function stopMove(obj){
	clearInterval(obj.timer);
}