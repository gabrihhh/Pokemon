
var up = 38,down = 40,left = 37,right = 39;
var cnv = document.querySelector("canvas"); var ctx = cnv.getContext("2d");
var spriteSheet = new Image();
spriteSheet.src = "./img/download.png";
var p1 = new spritedown(spriteSheet);

    window.addEventListener('keydown',keydownHandler);
    window.addEventListener('keyup',keyupHandler);

    function keydownHandler(e){
        switch(e.keyCode){
            case right:
                p1.movedireita = true;
                p1.moveesquerda = false;
                p1.movecima = false;
                p1.movebaixo = false;
                break;
            case left:
                p1.movedireita = false;
                p1.moveesquerda = true;
                p1.movecima = false;
                p1.movebaixo = false;
                break;
            case up:
                p1.movedireita = false;
                p1.moveesquerda = false;
                p1.movecima = true;
                p1.movebaixo = false;
                break;
            case down:
                p1.movedireita = false;
                p1.moveesquerda = false;
                p1.movecima = false;
                p1.movebaixo = true;
                break;
        }
    }


    function keyupHandler(e){
        switch(e.keyCode){
            case right:
                p1.movedireita = false;
                break;
            case left:
                p1.moveesquerda = false;
                break;
            case up:
                p1.movecima = false;    
                break;
            case down:
                p1.movebaixo = false;               
                break;
        }
    }

    spriteSheet.onload = function(){
        init();
    }
    function init(){
        loop();
    }
    function update(){
    
        p1.move();
    }
    function draw(){
        ctx.clearRect(0,0,cnv.width,cnv.height);
        p1.draw(ctx);  
               
    }

    function loop(){
        window.requestAnimationFrame(loop,cnv);
        update();
        draw();
    }

    function spritedown(img){
        this.posLastX = this.posLastY = 0;
        this.movedireita = this.moveesquerda = this.movecima = movebaixo = false;
        this.srcX = this.srcY = 0;
        this.width = 64;
        this.height = 64;
        this.posX = this.posY = 0;
        this.img = img;
        this.speed = 3;
        this.countAnim = 0;
        var cnv = document.querySelector("canvas");
    
    window.addEventListener('keyup',(e)=>{
        if(e.key == 'ArrowRight'){
            this.srcX = 0;
            this.srcY = this.height * 2
        }
        if(e.key == 'ArrowDown'){
            this.srcX = 0;
            this.srcY = this.height * 0
        }
        if(e.key == 'ArrowUp'){
            this.srcX = 0;
            this.srcY = this.height * 3
        }
        if(e.key == 'ArrowLeft'){
            this.srcX = 0;
            this.srcY = this.height * 1
        }
    })

    this.movimentation = function(horizonal,posDestino){
        if(horizonal){
            
         this.movedireita = true
            
        }
        
    }

    this.draw = function(ctx){
        ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height);
        this.animation();
    }

    this.move = function(){
        if(this.moveesquerda){
            this.posLastX = this.posX
            this.posX -= this.speed;
            this.srcY = this.height * 1;
        }
        if(this.movedireita){
            this.posLastX = this.posX
            this.posX += this.speed;
            this.srcY = this.height * 2;
        }
        if(this.movecima){
            this.posLastY = this.posY
            this.posY -= this.speed;
            this.srcY = this.height * 3
        }
        if(this.movebaixo){
            this.posLastY = this.posY
            this.posY += this.speed;
            this.srcY = this.height * 0;
        }


        // LIMITE DO MAPA
        if(this.posX < 0){this.posX = 0}
        if(this.posX+64 > cnv.width){this.posX = cnv.width-64}

        if(this.posY < 0){this.posY = 0}
        if(this.posY+64>cnv.height){this.posY = cnv.height-64}

        // COLISÃO
        // ctx.fillRect(90,100,190,290); 
        if(this.posX+64 > 90 && this.posX < 280-15 && this.posY + 64 > 100 && this.posY + 64< 390){
            this.posX = this.posLastX
            this.posY = this.posLastY

        }
        
        console.log(this.posX,this.posLastX,this.posY,this.posLastY)
    }
    this.animation = function(){
        if(this.movebaixo || this.movecima || this.movedireita || this.moveesquerda){
            this.countAnim++;
            if(this.countAnim >= 40){
                this.countAnim = 0;
            }
            this.srcX =  Math.floor(this.countAnim / 10) * this.width;
        }
    }
}