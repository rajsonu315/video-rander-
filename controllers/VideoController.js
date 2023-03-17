const VideoModel = require("../models/Video.js")

  // const testFolder = './videos';
  // const fss = require('fs');

class VideoController {





  // Delete Document
  static deleteDocById = async (req, res) => {
    // console.log(req.params.id)
    try {

      const results = await VideoModel.deleteMany({
        Code: {
          $in: [
        

            '014435',
            '7025519',
            '7027000',
            '7030909',
            '7031871',
            '7035809',
            '7036207',
            '7036228',
            '7036290',
            '7036299',
            '7036338',
            '7036351',
            '7036402',
            '7036501',
            '7036523',
            '7036525',
            '7036527',
            '7036734',
            '7036786',
            '7036791',
            '7036889',
            '7036927',
            '7036934',
            '7036956',
            '7036976',
            '7036998',
            '7037028',
            '7037034',
            '7037079',
            '7037100',
            '7037175',
            '7037186',
            '7037340',
            '7037367',
            '7037455',
            '7037481',
            '7037508',
            '7037571',
           
           
           

          ]
        }
      });
      res.send("Deleted " + results.deletedCount + " documents")
      console.log("Deleted " + results.deletedCount + " documents");
    } catch (error) {
      console.log(error)
    }
  }



  static getAllDoc = async (req, res) => {
    try {
      const result = await VideoModel.find();

    

      //     fss.readdir(testFolder, (err, files) => {
      //     files.forEach(file => {


      // // // // //    // //res.send(file)
      //       console.log(file);
      //      });
      //    });


      res.render("index", { data: result })

      //res.send(result[15])

      //console.log(result.code);



    } catch (error) {
      console.log(error)
    }

  }

}

module.exports = VideoController

