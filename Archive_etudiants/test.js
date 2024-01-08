// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL, posX, posY, ctx) {
    const image = {
        img: new Image(),
        posX: posX,
        posY: posY,
        ctx: ctx
    };

    image.img.src = imgURL;

    return image;
}

// -----------------------------------------------------------------------------------
// Dessine l'image sur le canvas
// imge: graphics source
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
function drawCanvasImage(image, posX, posY) {
    image.img.onload = function loadImg() {
        image.ctx.drawImage(image.img, posX, posY);
    };
}

// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticalement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, widthTile, heightTile, nbXTiles, nbYTiles, ctx) {
    this.spr_image = canvasImage(spriteImgURL, x, y, ctx);
    this.widthTile = widthTile;
    this.heightTile = heightTile;
    this.nbXTiles = nbXTiles;
    this.nbYTiles = nbYTiles;
    this.animation = {}; // Change to an object to store multiple animations
    this.curr_anim = null;
    this.curr_tiles = 0;
    this.loop = false;
}

// -----------------------------------------------------------------------------------
// Ajout d'une animation spécifique
// nameAnim : nom de l'animation
// tiles : tableau d'indices de tile
CanvasSprite.prototype.addAnimation = function (nameAnim, tiles) {
    this.animation[nameAnim] = tiles;
};

// -----------------------------------------------------------------------------------
// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function (nameAnim, loop) {
    this.curr_anim = nameAnim;
    this.curr_tiles = 0;
    this.loop = loop || false;
};

// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function () {
    if (this.curr_anim && this.animation[this.curr_anim] && this.curr_tiles < this.animation[this.curr_anim].length) {
        this.drawTile(this.curr_tiles);
        this.curr_tiles += 1;
        return true;
    } else {
        return false;
    }
};

// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function (tileIndex) {
    return (tileIndex % this.nbXTiles) * this.widthTile;
};

// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function (tileIndex) {
    return Math.floor(tileIndex / this.nbXTiles) * this.heightTile;
};

// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function (tileIndex) {
    const x = this.tileX(tileIndex);
    const y = this.tileY(tileIndex);
    this.spr_image.ctx.clearRect(x, y, this.widthTile, this.heightTile);
    this.spr_image.ctx.drawImage(this.spr_image.img, x, y, this.widthTile, this.heightTile, x, y, this.widthTile, this.heightTile);
};

// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function (tps) {
    const that = this;

    function loadimg() {
        const ntile = that.nextTile();
        if (!ntile) {
            if (that.loop) {
                that.curr_tiles = 0;
            } else {
                if (that.curr_anim) {
                    const animKeys = Object.keys(that.animation);
                    const currentIndex = animKeys.indexOf(that.curr_anim);
                    if (currentIndex !== -1 && currentIndex < animKeys.length - 1) {
                        that.curr_anim = animKeys[currentIndex + 1];
                        that.curr_tiles = 0;
                    }
                }
            }
        }
    }

    this.inter = setInterval(loadimg, tps);
};

// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function () {
    clearInterval(this.inter);
};
// ----------------------------------------------------------------------------------
