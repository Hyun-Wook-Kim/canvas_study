const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

console.log(ctx)

window.addEventListener('resize', () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

const mouse = {
    x : null,
    y : null
}

canvas.addEventListener('click',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    
    for(let i = 0; i < 10; i ++){
        particlesArray.push(new Particle())
    }


})

canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    particlesArray.push(new Particle())
    console.log(particlesArray.length)
})



class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5 
        this.color =`hsl(${hue}, 100%, 50%)`
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size >= 0.2){
            this.size -= 0.05
        }
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.lineWidth = 5; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 360);
        ctx.fill()
    }


    check(){
        const left = this.x - (this.size / 2)
        const right = this.x + (this.size / 2)
        const top = this.y + (this.size / 2)
        const bottom = this.y - (this.size / 2)
        if(left <= 0 || right >= canvas.width){
            this.speedX = this.speedX * -1
        }
        if(bottom <= 0 || top >= canvas.height){
            this.speedY = this.speedY * -1
        }
    }
}


// function init(){
//     for (let i = 0; i < 100; i++){
//         particlesArray.push(new Particle())
//     }
// }

// init()

function handleParticle(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        particlesArray[i].check();
        // console.log(particlesArray.length)


        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance <= 150){
                ctx.beginPath();
                ctx.strokeStyle =particlesArray[i].color
                ctx.lineWidth = '0.2'
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
                ctx.closePath();
            }

        }

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1)
            i--;
        }

    }
}
handleParticle();



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticle()
    hue += 0.5;
    requestAnimationFrame(animate);

}

animate()


