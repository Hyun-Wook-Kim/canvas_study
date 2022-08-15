function copyImageToCanvas(){
    const image = document.querySelector('img');
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        image, 0, 0,
        100, 100,
        0, 0,
        64, 64
    )

}

// setTimeout(()=>{
//     copyImageToCanvas();
// }, 3000)

window.addEventListener('scroll',() => {
    copyImageToCanvas();
})