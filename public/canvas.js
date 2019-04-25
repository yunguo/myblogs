const main=()=>{
    const canvas =document.getElementById("myCanvas");
     const gl = canvas.getContext(canvas);
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element')
    }
    gl.clearColor(0.0,0.0,0.0,1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
    // 获取绘制二维图像的绘图上下文
    const ctx=canvas.getContext('2d');

    // 绘制蓝色矩形
    ctx.fillStyle='rgba(0,0,255,0.6)';
    ctx.fillRect(120,10,150,150);
}