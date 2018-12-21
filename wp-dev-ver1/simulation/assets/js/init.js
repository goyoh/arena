var copy_svg_to_canvas = function( style ){
	var svg = $('svg').prop('outerHTML');
	var canvas = $('<canvas>').get(0);
	canvg(canvas, svg,{
		ignoreMouse:true,
		ignoreAnimation: true,
		renderCallback:function(){
			window.localStorage.removeItem('style' + style, base64);
			var base64 = canvas.toDataURL();
			// 画像化したデータを、style(1～5)の名前でlocalstrage保存
			window.localStorage.setItem('style' + style, base64);
            
            var canvas = document.getElementById('canvas_style' + style);
            var ctx = canvas.getContext('2d');
            var base64 = window.localStorage.getItem('style1' + style);
            var image = new Image();
            image.src = base64;
            image.onload = function(){
              // 画像の読み込みが終わったら、Canvasに画像を反映する。
              ctx.drawImage(image, 10, -10, 70, 125);
            }
		}
	});
}


