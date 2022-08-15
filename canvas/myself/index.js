const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
})

let particlesArray = []
let hue = 0;



class Particle{
    constructor(){
        this.size = Math.random() * 10 + 1;
        this.color =`hsl(${hue}, 100%, 50%)`
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.x = mouse.x;
        this.y = mouse.y;
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 360);
        ctx.fill();
        ctx.fillStyle = this.color;
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.05
    }


}

let mouse = {
    x : null,
    y : null
}

canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x
    mouse.y = e.y
    particlesArray.push(new Particle())
    console.log(particlesArray.length)
})

canvas.addEventListener('click',(e)=>{
    particlesArray.push(new Particle())
    
})



function handleParticles(){
    for(let i = 0; i<particlesArray.length; i++){
        particlesArray[i].draw()
        particlesArray[i].move()




        for (let j = i; j<particlesArray.length; j++){
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

        if(particlesArray[i].x < 0 || particlesArray[i].x > canvas.width || particlesArray[i].y < 0 || particlesArray[i].y >= canvas.height || particlesArray[i].size < 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    hue++;
    handleParticles();
    requestAnimationFrame(animate)
}

animate()