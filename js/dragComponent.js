(function(w, d) {
	function Drag(setting) { //setting : data,stageEle,
		this.setting = {}
		for(val in setting) {
			this.setting[val] = setting[val];
		}

		if(this.setting.data != null && this.setting.stageEle != null) {
			var i = 0,
				len = this.setting.data.length,
				str = null,
				stageEleHtml = this.setting.stageEle.innerHTML;

			for(; i < len; i++) {
				var str = '<div class="dragVal">' + this.setting.data[i] + '</div>';
				stageEleHtml = stageEleHtml + str;
			}

			this.setting.stageEle.innerHTML = stageEleHtml;

		}

	}

	Drag.prototype.drag = function(dragEle) {
		console.log("进来了");
		var _this = this;
		if(!this.setting.stageEle) {
			throw Error("this is not defined stageEle");
		} else {
			dragEle.addEventListener("mousedown", function(e) {

				var e = e || event;
				var disx = e.clientX - this.offsetLeft;
				var disy = e.clientY - this.offsetTop;
				var dragging = true;

				//如果提供了事件对象，则这是一个非IE浏览器 
				if(e && e.preventDefault) {
					//阻止默认浏览器动作(W3C) 
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				//如果提供了事件对象，则这是一个非IE浏览器
				if(e && e.stopPropagation) {
					//因此它支持W3C的stopPropagation()方法
					e.stopPropagation();
				} else {
					//否则，我们需要使用IE的方式来取消事件冒泡 
					window.event.cancelBubble = true;
				}

				d.addEventListener("mousemove", function(e) {
					if(dragging) {
						var e = e || event;
						var Left = e.clientX - disx;
						var Top = e.clientY - disy;

						if(Left < 2) {
							Left = 2;
						} else if(Left > _this.setting.stageEle.clientWidth - dragEle.offsetWidth - 2) {
							Left = _this.setting.stageEle.clientWidth - dragEle.offsetWidth - 2;
						}

						if(Top < 2) {
							Top = 2;
						} else if(Top > _this.setting.stageEle.clientHeight - dragEle.offsetHeight - 2) {
							Top = _this.setting.stageEle.clientHeight - dragEle.offsetHeight - 2;
						}

						dragEle.style.left = Left + 'px';
						dragEle.style.top = Top + 'px';
					}
				});

				document.addEventListener("mouseup", function() {
					dragging = false;
				});

			});
		}

	}

	window.Drag = Drag;

})(window, document)