const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 560;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background/background.png'
})

const shop = new Sprite({
    position: {
        x: 730,
        y: 233
    },
    imageSrc: './assets/background/shop_anim.png',
    scale: 2.25,
    framesMax: 6
})

// player 1 sprite
const player = new Fighter({
    position: {
        x: 124,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/player1/Sprites/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './assets/player1/Sprites/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './assets/player1/Sprites/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/player1/Sprites/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/player1/Sprites/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/player1/Sprites/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './assets/player1/Sprites/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './assets/player1/Sprites/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: 50
        },
        width: 175,
        height: 50
    }
});

// enemy sprite
const enemy = new Fighter({
    position: {
        x: 840,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './assets/player2/Sprites/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './assets/player2/Sprites/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './assets/player2/Sprites/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/player2/Sprites/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/player2/Sprites/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/player2/Sprites/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './assets/player2/Sprites/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/player2/Sprites/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 150,
        height: 50
    }
});

// declaring keys used (that need changing)
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer();

// loops updates and checks keys etc...
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, .15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player 1 movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

    // player 1 jump
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

    // enemy jump
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // detect collision for player 1 & enemy hit
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.framesCurrent === 4) {
        enemy.takeHit();
        player.isAttacking = false;
        document.getElementById('enemy-health').style.width = enemy.health + '%';
    }

    // if player 1 misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    // data collision for enemy & player 1 hit
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking && enemy.framesCurrent === 2) {
        player.takeHit();
        enemy.isAttacking = false;
        document.getElementById('player-health').style.width = player.health + '%';
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId});
    }
}

// for looping it by calling it infinitely
animate();

// player keys
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        // player1 keys
        switch (event.key) {
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'w':
                player.velocity.y = -20;
                break;
            case 's':
                player.attack();
                break;
        }
    }

    if (!enemy.dead) {
        switch (event.key) {
            // enemy keys
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
    }
});

// player controls
window.addEventListener('keyup', (event) => {
    // player1 controls
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }

    // enemy controls
    switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
})