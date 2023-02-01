var cnv = require('canvas');
const fs = require('fs');

//TODO: Load fonts in App.js
function loadFonts(){
    cnv.registerFont(__dirname + '/ressources/fonts/ARLRDBD.TTF',{family: "Arial"});
    cnv.registerFont(__dirname + '/ressources/fonts/comic.ttf',{family: "Comic Sans"});
    cnv.registerFont(__dirname + '/ressources/fonts/cour.ttf',{family: "Courier"});
    cnv.registerFont(__dirname + '/ressources/fonts/impact.ttf',{family: "Impact"});
}

//Renders meme and returns filepath
//@Param captions: Array of caption objects {xPosition, yPosition, text, fontSize, color}
//
async function render(url, captions, filename){


        //create empty canvas
        const canvas = cnv.createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');

        //Load (template) image
        const background = await cnv.loadImage(__dirname + '/public' + url);

        //resize canvas to background image
        canvas.width = background.width;
        canvas.height = background.height;

        //draw image
        ctx.drawImage(background,0,0);


        //Add Text
        //TODO: Make sure Text is on Canvas
        for (cap of captions){
        
        ctx.font = cap.fontSize + "px" + " Impact";
        ctx.textAlign = "center";

        //Start with Outline
        ctx.strokeStyle = "black";
        ctx.miterLimit = 2;
        ctx.lineJoin = 'circle';
        ctx.lineCap = 'round';
        ctx.lineWidth = cap.fontSize/14;
        ctx.strokeText(cap.text, cap.xPosition * canvas.width, cap.yPosition * canvas.height);

        //Fill in Text
        ctx.fillStyle = cap.color;
        ctx.fillText(cap.text, cap.xPosition * canvas.width, cap.yPosition * canvas.height);

        }


        //check if image with that name already exists
        let filepath = __dirname + '/public/images/usercontent/' + filename + '.png';
        if(fs.existsSync(filepath)){
            
            console.log("Filename already in use!")
            throw "Filename already in use!";
        };

        //create image file
        const out = fs.createWriteStream(filepath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () =>  console.log('The PNG file was created.'));

        return filename + '.png';
        }

module.exports = {render, loadFonts}
