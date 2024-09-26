class Escena1 extends Phaser.Scene {
    constructor() {
        super("Escena1");
        this.jugador= null;
        this.grupoMeteoros= null;
        this.cursors = null;
    }

    preload() {
        this.load.image('cielo', '/public/resource/cielo.png'); 
        this.load.image('nave', '../public/resource/nave3.png'); 
        this.load.image('meteoro', '../public/resource/meteoro2.png'); 
    }

    create() {
        this.add.image(400, 300, 'cielo'); 
        this.jugador = this.physics.add.sprite(400, 550, 'nave'); // Creando la nave 
        this.jugador.setCollideWorldBounds(true); // Evita que salga de la pantalla 

        this.grupoMeteoros = this.physics.add.group(); // Creando el grupo de meteoritos 
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true }); 

        this.cursors = this.input.keyboard.createCursorKeys();// Configurando los controles

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this); //colision game over
    }

    generarMeteoros() { 
        const x = Phaser.Math.Between(0, 800); // Posición aleatoria en el eje X 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro'); // Crear un meteorito 
        meteoro.setVelocityY(200); // Velocidad vertical hacia abajo 
    }

    update() {
        this.jugador.setVelocityX(0); // Detener la nave 
        
        if (this.cursors.left.isDown) { 
            this.jugador.setVelocityX(-300); // Mover a la izquierda 
        } else if (this.cursors.right.isDown) { 
            this.jugador.setVelocityX(300); 
        }
    }

    gameOver(jugador) { 
        this.physics.pause(); // Pausar el juego 
        jugador.setTint(0xff0000); // Cambiar color para indicar el choque 
        console.log('Game Over'); 
    }
}

export default Escena1;