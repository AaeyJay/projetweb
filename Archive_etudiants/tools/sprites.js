// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL,posX,posY,ctx)
{
	image.img = new Image();
    image.img.src = imgURL;
    image.posX = posX;
    image.posY = posY;
    image.ctx = ctx; 
    return image;
}
// -----------------------------------------------------------------------------------
// Dessine l'image sur le canvas
// imge: graphics source
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
function drawCanvasImage(image,posX,posY)
{
    image.addEventListener("load",function loadImg(){this.ctx.drawImage(this.img,posX,posY);},false)
}
// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticallement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, widthTile, heightTile, nbXTiles, nbYTiles,ctx)
{
   this.spr_image = canvasImage(spriteImgURL,x,y,ctx);
   this.widthTile = widthTile;
   this.heightTile = heightTile;
   this.nbXTiles = nbXTiles;
   this.nbYTiles = nbYTiles;
}
// -----------------------------------------------------------------------------------
// Ajout d'une animation spécifique
// nameAnim : nom de l'animation
// tiles : tableau d'indices de tile
CanvasSprite.prototype.addAnimation = function(nameAnim, tiles)
{
    this.animation = {};
    this.animation[nameAnim] = tiles;
}
// -----------------------------------------------------------------------------------
// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function(nameAnim,loop)
{
    this.curr_anim = nameAnim;
    this.curr_tiles = 0;
    this.loop = false;
}
// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function()
{
	 if (this.animation.length < this.curr_tiles){
        this.drawTile(this.curr_tiles);
        this.curr_tiles += 1;
        return true 
     }
     else{
        return false;
     }
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function(tileIndex)
{
	return (tileIndex%this.nbXTiles)*this.widthTile;
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function(tileIndex)
{
	return (tileIndex/this.nbYTiles)*this.heightTile;
}
// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function(tileIndex)
{
    clearRect(tileX(tileIndex),tileY(tileIndex),widthTile,heightTile);
};
// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function(tps)
{   
    function loadimg(){
        ntile = nextTile();
        if(!ntile){
            if(this.curr_anim+1>this.animation.length){
                curr_anim++;
            }
            else{
                curr_anim = 0
            }
        }


    }
	inter = setInterval(loadimg,tps);
}
// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function()
{
	clearInterval(inter);
}
// ----------------------------------------------------------------------------------