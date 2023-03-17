// Import dependencies
const Jimp = require("jimp");

const express = require('express')
const connectDB = require("./db/connectdb.js");

const { join } = require('path')
const web = require("./routes/web.js");


const VideoModel = require("./models/Video.js")



const app = express();
const fs = require("fs-extra");
const pathToFfmpeg = require("ffmpeg-static");
const util = require('util');

const exec = util.promisify(require('child_process').exec);

// app.get('/', (req , res) =>{
//     res.send("data ")
// })
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/videoedit";

// Database Connection
connectDB(DATABASE_URL);

app.use(express.urlencoded({ extended: false }))

app.use('/Video', express.static(join(process.cwd(), "public")))
app.use('/Video/edit', express.static(join(process.cwd(), "public")))

// Set Template Engine
app.set("view engine", "ejs");



// Load Routes
app.use("/Video", web);



app.get('/Video/startrander', async (req, res) => {



    try {
      const result = await VideoModel.find();
      res.send("start video render")


       // res.render("index", { data: result })

        

        // program to display numbers from 1 to 5
        //   const n = 3;



        //  for (let i = 1; i <= n; i++) {
           


        //   }
          
          //tempimage(result[1])
//var datas = tempimage(result[0])


 await  tempimage(result[1]);


        //code video rander


        

        async function tempimage(data) {
            //console.log(data.Code);



            try {
                const videoEncoder = 'h264';
                const inputFile = 'm.mp4';
                //var number = Math.floor(Math.random()*randomImage.length); 


                const outputFile = '7014008' + '.mp4';

                const inputFolder = 'temp/raw-frames';
                const outputFolder = 'temp/edited-frames';
                // Create temporary folders
                console.log('Initialize temp files');
                await fs.mkdir('temp');
                await fs.mkdir(inputFolder);
                await fs.mkdir(outputFolder);

                // Decode MP4 video and resize it to width 1080 and height auto (to keep the aspect ratio)
                console.log('Decoding');
                await exec(`"${pathToFfmpeg}" -i ${inputFile} -vf scale=720:-1 ${inputFolder}/%d.png`);

                // Edit each frame
                console.log('Rendering');
                const frames = fs.readdirSync(inputFolder);
                let currentProgress = 0;
                function checkProgress(currentFrame, totalFrames) {
                
                    const progress = currentFrame / totalFrames * 100;
                    if (progress > (currentProgress + 10)) {
                        const displayProgress = Math.floor(progress);
                        console.log(`Progress: ${displayProgress}%`);
                        currentProgress = displayProgress;
        
        
                    }
                };

                for (let frameCount = 1; frameCount <= frames.length; frameCount++) {

                    // Check and log progress
                    checkProgress(frameCount, frames.length);

                    // Read the current frame
                    let frame = await Jimp.read(`${inputFolder}/${frameCount}.png`);

                    // Modify frame
                    frame = await modifyFrame(data, frame);

                    // Save the frame
                    await frame.writeAsync(`${outputFolder}/${frameCount}.png`);
                }

                // Encode video from PNG frames to MP4 (no audio)
                console.log('Encoding');
                await exec(`"${pathToFfmpeg}" -start_number 1 -i ${outputFolder}/%d.png -vcodec ${videoEncoder} -pix_fmt yuv420p temp/no-audio.mp4`);

                // Copy audio from original video
                console.log('Adding audio');
                await exec(`"${pathToFfmpeg}" -i temp/no-audio.mp4 -i ${inputFile} -c copy -map 0:v:0 -map 1:a:0? ${outputFile}`);

                // Remove temp folder
                console.log('Cleaning up');
                await fs.remove('temp');

 

            } catch (e) {
                console.log("An error occurred:", e);

                // Remove temp folder
                console.log('Cleaning up');
                await fs.remove('temp');
            }
        };
       

        



        //////

    } catch (error) {
        console.log(error)
    }



})

// Video editor settings


const modifyFrame = async (data, frame) => {



    // Calculate the new height for 9:16 aspect ratio based on the current video width
    let newHeight = 12 * frame.bitmap.width / 16;
    // Video height must be an even number
    newHeight = newHeight % 1 === 0 ? newHeight : (newHeight + 1);

    // Create new image width current width, new height and white background
    const newImage = new Jimp(frame.bitmap.width, newHeight, 'white',);

    // Add watermark
    const font16 = await Jimp.loadFont('footersmall.fnt');
    // const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const font = await Jimp.loadFont('header.fnt');
    const footerfirst = await Jimp.loadFont('footerfirst.fnt');



    const fonts = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    //Jimp.loadFont('assets/pokedex.fnt').then(font => {

    //header text

    var w = newImage.bitmap.width;
    var h = newImage.bitmap.height - 480;
    let textS = "DSP Cement Available : " + "9008070806"

    let text = textS.slice(0, 92);
    var textWidth = Jimp.measureText(font, text);
    var textHight = Jimp.measureTextHeight(font, text);
    newImage
        .print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2,
            {
                text: text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_TOP,
            }, textWidth, textHight)



    //footer text

    var wh = newImage.bitmap.width;
    var hha = newImage.bitmap.height - -450;
    let footer = 'NADAF TRADERS'
    var textWidth = Jimp.measureText(footerfirst, footer);
    var textHight = Jimp.measureTextHeight(footerfirst, footer);
    newImage
        .print(footerfirst, wh / 2 - textWidth / 2, hha / 2 - textHight / 2,
            {
                text: footer,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
            }, textWidth, textHight)



    //footer last


    // var wa = newImage.bitmap.width;
    // var ha = newImage.bitmap.height - -500;
    let footerlast = "NADAF TRADERS, MUDHOL ROAD, LOKAPUR, Bagalkot - 587122"
    //let footerlast = 'KUMAR & SONS, KALATHODE,THRISSUR,THRISSUR, PIN: 680651, MOB: 9388374476'
    ///69 first lenth

    //let length = footerlast.length;
   
    let footerlastresult = footerlast.slice(0, 82);
    
    let extraresult = footerlast.slice(82);




    
    /////////////////////////////////////////////////////////////////
    var ww = newImage.bitmap.width;
    var hh = newImage.bitmap.height - -520;

    var textWidth = Jimp.measureText(font16, footerlastresult);
    var textHight = Jimp.measureTextHeight(font16, footerlastresult);
    newImage
        .print(font16, ww / 2 - textWidth / 2, hh / 2 - textHight / 2,
            {
                text: footerlastresult,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
            }, textWidth, textHight)





    ////////////////////////////////////////////////////////////////
     var wa = newImage.bitmap.width;
     var ha = newImage.bitmap.height - -520;
    var textWidth = Jimp.measureText(font16, extraresult);
    var textHight = Jimp.measureTextHeight(font16, extraresult);
    newImage
        .print(font16, wa / 2 - textWidth / 2, ha / 2 - textHight / 2,
            {
                text: extraresult,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
            }, textWidth, textHight)






    // let headertext = ' DSP Cement Available : 9381771006 '
    //let footer = '  BASAVACHETAN STEELS '

    // let footerlast = 'NEAR TRANITY CHURCH, MARUTI NAGAR DANDEL, DANDELI, North Kannada - 581325'
    // let length = footerlast.length;
    //console.log(length);
    // let footerlastresult = footerlast.slice(0, 50);
    // let extraresult = footerlast.slice(50);
    // if (length == 68) {  
    // }


    // newImage.print(font, 25, newImage.bitmap.height - 1250, ' 140-A , Opp- Bank of India ,Hirebagewa,   Belgaum, Belgaum - 591109');
    // newImage.print( fonts, 300, newImage.bitmap.height - 90, footer  );
    //  newImage.print(font, 200, newImage.bitmap.height - 40, footerlast);
    //newImage.print(font, 25, newImage.bitmap.height - 90, extraresult);
    //  newImage.color([{ apply: "blue", params: [1000], FontSize:600  }]);



    // await newImage.rotate(45);
    // Center the video in the current 9:16 image
    newImage.composite(frame, 0, (newHeight / 2.1) - (frame.bitmap.height / 2));
    return newImage;




};




app.listen(5000, () => {
    console.log(`working my project`);
})



