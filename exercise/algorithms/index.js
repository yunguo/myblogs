const option=[
{value:'',text:"请选择"},
{value:"bubbling",text:"冒泡算法"},
{value:"insertion",text:"插入算法"}
]
const type ={bubbling,insertion};
function bubbling(arr) {
	arr.map(item=>{
		let low=0;
		let hight=arr.length-1;
		let temp=null;
		while(low<hight){
			for (let i = hight; i > low; i--) {
				if(arr[i]<arr[i-1]){
					temp=arr[i];
					arr[i]=arr[i-1];
					arr[i-1]=temp;
				}
			}
			low++;
			for (let i = low; i < hight; i++){
				if(arr[i]>arr[i+1]){
					temp=arr[i];
					arr[i]=arr[i+1];
					arr[i+1]=temp;
				}
			}
			hight--;
		}});

	return arr;
}
function insertion(arrs) {
	for (let i = 1; i < arrs.length; i++) {
		const key=arrs[i];
		let j=i-1;
		while(j>=0&&arrs[j]>key){
			arrs[j+1]=arrs[j];
			j--;
		}
		arrs[j+1]=key;
	}
	return arrs;
}
window.onload=function () {
	const algorithmOption=option.map(item=>`<option value="${item.value}">${item.text}</option>`);
	const sorting = document.querySelector("#sorting");
	const sortResult = document.querySelector("#sortResult");
	const algorithm = document.querySelector('#algorithm');
	const timeSelect = document.querySelector("#time");
	algorithm.innerHTML = algorithmOption;
	sorting.onclick=function(e){
		let inputDataValue=document.querySelector("#inputData").value;
		inputDataValue=JSON.parse(inputDataValue);
		if(util.objType(inputDataValue)!=="Array"){
			alert("请输入数组");
			return;
		}
		const algorithmValue = algorithm.options[algorithm.selectedIndex].value;
		const {result,time}=warp(type[algorithmValue],inputDataValue);
		sortResult.value=JSON.stringify(result);
		timeSelect.innerHTML=time+'ms';
	}
}
function warp(fn,arr){
	let result;
	let time=0;
	let startTime= 0;
	let endTime=0;
		startTime=new Date().getMilliseconds();
		console.time('2.改进后冒泡排序耗时');
		result=fn(arr);
		endTime=new Date().getMilliseconds();
		console.timeEnd('2.改进后冒泡排序耗时');
		time=endTime-startTime;
	return {result,time};
}
const util={
	objType(arg){
		return Object.prototype.toString.call(arg).replace(/^\[object ([a-zA-Z0-9]+)\]$/, '$1');
	}
}