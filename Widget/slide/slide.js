(function(){
	// 图片宽高
	var imageWidth = 700,imageHeight = 450;
	/**
	 * slideImageLen 轮播图片数
	 * pageBox 页数盒子
	 */
	var slideImageLen = document.getElementById('slide').children.length;
	var pageBox = document.createElement('ul');
	pageBox.id = 'page';
	var pageLi;
	for(var i = 0;i < slideImageLen;i++){
		pageLi = document.createElement('li');
		pageLi.className = 'page'+i;
		pageLi.style = "display: inline-block;width: 8px;height: 8px;background-color: #BBBABA;border-radius: 50%;margin: 10px;";
		pageBox.appendChild(pageLi);
	}
	document.getElementById('slide-box').appendChild(pageBox);

	/**
	 * imageBox 末尾新增图片实现环状
	 */
	var imageTpl = document.getElementById('slide').children[0];
	var imageBox = imageTpl.cloneNode(true);
	imageBox.className = slideImageLen+1;
	document.getElementById('slide').appendChild(imageBox);
	imageTpl = document.getElementById('slide').children;
	for(var i = 0;i < imageTpl.length;i++){
		imageTpl[i].style = "display: inline-block;list-style: none;width: "+ imageWidth +"px;height: 100%;font-size: 16px;margin: auto 0;";
		imageTpl[i].children[0].style = "width: 100%;height:100%;";
	}
	
	/**
	 * buttonBox 左右切换按钮
	 */
	var buttonBox = document.createElement('button');
	buttonBox.id = 'left';
	buttonBox.innerText = '<';
	document.getElementById('slide-box').appendChild(buttonBox);
	buttonBox = document.createElement('button');
	buttonBox.id = 'right';
	buttonBox.innerText = '>';
	document.getElementById('slide-box').appendChild(buttonBox);

	/**
	 * 样式定义
	 */
	document.getElementById('slide-box').style = "position: relative;width:"+ imageWidth +"px;height:"+ imageHeight +"px;overflow: hidden;";
	document.getElementById('slide').style = "position: relative;left: 0;width: 9999px;height:"+ imageHeight +"px;font-size: 0;";
	document.getElementById('page').style = "position: absolute;bottom: 10px;left: 50%;margin-left: -59px;";
	document.getElementById('left').style = "position: absolute;left: 10px;top: 300px;";
	document.getElementById('right').style = "position: absolute;right: 10px;top: 300px;";


	/**
	 * 变量定义
	 * now Number 当前页数
	 * curLeft Number 当前left值
	 * nowLeft Number 页面正确left值
	 * t Number setTimeout的id
	 */
	var now = 0,curLeft,nowLeft,t,pagewidth = imageWidth;
	document.getElementsByClassName('page'+now)[0].style.backgroundColor = '#423C3C';

	/**
	 * 向左滑动函数
	 */
	function left(){
		// 清除定时事件
		clearTimeout(t);
		curLeft = (now*pagewidth)*-1;
		now -= 1;
		if(now < 0){
			now = slideImageLen; 
			curLeft = (now*pagewidth)*-1;
			now -= 1;
		}
		nowLeft = (now*pagewidth)*-1;
		for(var i = 0;i < slideImageLen;i++){
			document.getElementsByClassName('page'+i)[0].style.backgroundColor = '#BBBABA';
		}
		document.getElementsByClassName('page'+now)[0].style.backgroundColor = '#423C3C';
		var a = function(){
			if(curLeft != nowLeft){
				curLeft = curLeft + 10;
				document.getElementById('slide').style.left = curLeft + 'px';
				setTimeout(a,10);
			}else{
				t = setTimeout(auto,5000);
			}
		}
		setTimeout(a,10);
		
	}

	/**
	 * 向右滑动函数
	 */
	function right(){
		// 清除定时事件
		clearTimeout(t);
		curLeft = (now*pagewidth)*-1;
		now += 1;
		if(now > slideImageLen){
			now = slideImageLen;
		}
		nowLeft = (now*pagewidth)*-1;
		for(var i = 0;i < slideImageLen;i++){
			document.getElementsByClassName('page'+i)[0].style.backgroundColor = '#BBBABA';
		}
		
		
		var a = function(){
			if(curLeft != nowLeft){
				curLeft = curLeft - 10;
				document.getElementById('slide').style.left = curLeft + 'px';
				setTimeout(a,10);
			}else{
				t = setTimeout(auto,5000);
			}
		}
		setTimeout(a,10);
		if(now == slideImageLen){
			now = 0;
		}
		document.getElementsByClassName('page'+now)[0].style.backgroundColor = '#423C3C';
		
	}

	/**
	 * 自动轮播函数
	 */
	function auto(){
		right();
	}

	/**
	 * 初始定时事件
	 * @type {[type]}
	 */
	t = setTimeout(auto,5000);

	/**
	 * 监听对应页数的小按钮
	 */
	document.getElementById('page').addEventListener('click',function(e){
		now = parseInt(e.target.className.slice(4),10);
		nowLeft = curLeft = (now*pagewidth)*-1;
		document.getElementById('slide').style.left = nowLeft + 'px';
		for(var i = 0;i < slideImageLen;i++){
			document.getElementsByClassName('page'+i)[0].style.backgroundColor = '#BBBABA';
		}
		document.getElementsByClassName('page'+now)[0].style.backgroundColor = '#423C3C';
	});

	/**
	 * 监听左滑按钮
	 */
	document.getElementById('left').addEventListener('click',function(e){
		left();
	});

	/**
	 * 监听右滑按钮
	 */
	document.getElementById('right').addEventListener('click',function(e){
		right();
	});
})();
