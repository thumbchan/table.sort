var oTab=document.getElementById('tab');

//以下方法为表格独有
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;


//获取后台json字符串。
//实现数据绑定
var data=null;//存数据用


var xhr=new XMLHttpRequest;


xhr.open('get','tab.txt', false);

xhr.onreadystatechange=function(){
	if(xhr.readyState===4&&xhr.status===200){
	    var val=xhr.responseText;
		data=utils.jsonParse(val); //把json格式字符串转化为json
	}
}
xhr.send(null);
console.log(data)
function bind(){
	var frg=document.createDocumentFragment();
	for(var i=0;i<data.length;i++){
		var cur=data[i];
		
		var oTr=document.createElement("tr");
		for(var key in cur){
			var oTd=document.createElement("td");
			if(key==="sex"){
				oTd.innerHTML=cur[key]===0?"男":"女";
			}else{
				oTd.innerHTML=cur[key];
			}
			
			oTr.appendChild(oTd)
		}
		frg.appendChild(oTr)
	}
	tBody.appendChild(frg);
	frg=null;
}
bind();


//实现各行变色
function changeBg(){
	for(var i=0;i<oRows.length;i++){
		oRows[i].className=i%2===1?'bg':null;
	}
}
changeBg();

//实现年龄排序
function sort(n){//n是当前点击这列的索引
	var ary=utils.listToArray(oRows);
	//按照每行第二列的内容排序
	//先实现升降属性的自定义改变
	this.flag*=-1;
	var _this=this;
	ary.sort(function(a,b){
		var curIn=a.cells[n].innerHTML;
		var nexIn=b.cells[n].innerHTML;
		var curInNum=parseFloat(a.cells[n].innerHTML);
		var nexInNum=parseFloat(b.cells[n].innerHTML);
		if (isNaN(curInNum)||isNaN(nexInNum)) {
			return curIn.localeCompare(nexIn)*_this.flag;
		} 
		return (curInNum-nexInNum)*_this.flag;	
			
			
			
//	    return	(parseFloat(a.cells[n].innerHTML)-parseFloat(b.cells[n].innerHTML))*_this.flag
	});
	//按照ary中的最新顺序把每行重新添加到tbody中
	var frg=document.createDocumentFragment();
	for (var i=0;i<ary.length;i++) {
		frg.appendChild(ary[i]);
	}
	tBody.appendChild(frg);
	frg=null;
	//重新计算背景颜色,因为位置已经改变。
	changeBg();
}
//点击第二列实现排序
//点击前初始化一个自定义属性
//oThs[1].flag=-1;
//
//oThs[1].onclick=function(){
//	sort();
//}
//点击实现所有具有class="cursor"的排序
for(var i=0;i<oThs.length;i++){
	var curTh=oThs[i];
	curTh.index=i;
	curTh.flag=-1;
	if(curTh.className==="cursor"){
		curTh.onclick=function(){
			sort.call(this,this.index);
		}
	}
}




