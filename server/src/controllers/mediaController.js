const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

exports.downloadMedia = async (req, res) => {
    console.log(`Request received to download media. Link: ${req.body.link}`) // echos for debug
    const { link, fileType, format, quality } = req.body

    try {
        const response = await youtubedl(link, {
            format: format === 'audio' ? 'bestaudio' : 'bestvideo+bestaudio/best',
            audioQuality: quality === 'best' ? 0 : 9,
            addMetadata: format === 'audio' ? false : true,
            // maxFileSize: ? 
            continue: true,
            sleepInterval: 10,
            noSimulate: true,
            print: `[${this.$appName}] | %(title)s.%(ext)s`,
            output: `./src/downloads/[${this.$appName}] | %(title)s.%(ext)s`,
        })

        const inputFile = `./src/downloads/${response}`;
        const outputFile = `../client/public/downloads/${response.split('.')[0]}.${fileType}`;
        const outputName = `${response.split('.')[0]}.${fileType}`;

        ffmpeg(inputFile)
            .toFormat(fileType)
            .audioBitrate(128)
            .videoBitrate(1024)
            .save(outputFile)
            .on('end', () => {
                console.log('Conversion ended successfully');
                fs.unlinkSync(inputFile);

                res.status(200).json({ 
                    status: 200, 
                    message: 'Media downloaded successfully.', 
                    name: outputName,
                    file: `http://localhost:5173/downloads/${outputName}`
                })
            })
            .on('error', (err) => {
                console.log('An error occurred during transcoding: ' + err.message);
                res.status(500).json({ message: 'An error occurred during transcoding.' });
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while downloading the media.' })
    }

}