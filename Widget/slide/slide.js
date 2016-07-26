var binnie = {};

(function(document){
	binnie.slideFun = function(data){
		// 图片宽高
		var imageWidth = data.width,imageHeight = data.height,slideImageLen = data.images.length;

		/**
		 * imageBox 图片盒子
		 */
		var imageBox = document.createElement('ul');
		imageBox.id = 'slide';
		var imageLi,images;
		for(var i = 0;i <= slideImageLen;i++){
			imageLi = document.createElement('li');
			imageLi.className = i+1;
			imageLi.style = "display: inline-block;list-style: none;width: "+ imageWidth +"px;height: 100%;font-size: 16px;margin: auto 0;";
			images = document.createElement('img');
			if(i == slideImageLen){
				images.src = data.images[0].src;
			}else{
				images.src = data.images[i].src;
			}
			images.style = "width: 100%;height:100%;";
			imageLi.appendChild(images);
			imageBox.appendChild(imageLi);
		}
		document.getElementById(data.box).appendChild(imageBox);

		/**
		 * slideImageLen 轮播图片数
		 * pageBox 页数盒子
		 */
		// var slideImageLen = data.images.length;
		var pageBox = document.createElement('ul');
		pageBox.id = 'page';
		var pageLi;
		for(var i = 0;i < slideImageLen;i++){
			pageLi = document.createElement('li');
			pageLi.className = 'page'+i;
			pageLi.style = "display: inline-block;width: 16px;height: 16px;background-color: #BBBABA;border-radius: 50%;margin: 5px;";
			pageBox.appendChild(pageLi);
		}
		document.getElementById(data.box).appendChild(pageBox);
		var pageBoxWidth = (26*slideImageLen)/2;
		
		/**
		 * buttonBox 左右切换按钮
		 */
		var buttonBox = document.createElement('div');
		buttonBox.id = 'left';
		buttonBox.innerText = '<';
		document.getElementById(data.box).appendChild(buttonBox);
		buttonBox = document.createElement('div');
		buttonBox.id = 'right';
		buttonBox.innerText = '>';
		document.getElementById(data.box).appendChild(buttonBox);

		/**
		 * 样式定义
		 */
		document.getElementById(data.box).style = "position: relative;width:"+ imageWidth +"px;height:"+ imageHeight +"px;overflow: hidden;cursor: default;";
		document.getElementById('slide').style = "position: relative;left: 0;width: 9999px;height:"+ imageHeight +"px;font-size: 0;";
		document.getElementById('page').style = "position: absolute;bottom: 10px;left: 50%;margin-left: -"+pageBoxWidth+"px;";
		document.getElementById('left').style = "position: absolute;left: 10px;top: 50%;margin-top:-34px;border: none;background-color: transparent;font-size: 60px;font-weight: bold;color: #9C9B9B;";
		document.getElementById('right').style = "position: absolute;right: 10px;top: 50%;margin-top:-34px;border: none;background-color: transparent;font-size: 60px;font-weight: bold;color: #9C9B9B;";


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
			if(e.target.className.slice(4) != ''){
				now = parseInt(e.target.className.slice(4),10);
				nowLeft = curLeft = (now*pagewidth)*-1;
				document.getElementById('slide').style.left = nowLeft + 'px';
				for(var i = 0;i < slideImageLen;i++){
					document.getElementsByClassName('page'+i)[0].style.backgroundColor = '#BBBABA';
				}
				document.getElementsByClassName('page'+now)[0].style.backgroundColor = '#423C3C';
			}
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
	}
	
})(document,binnie);
