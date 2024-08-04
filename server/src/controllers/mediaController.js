const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.downloadMedia = async (req, res) => {
    console.log(`Request received to download media. Link: ${req.body.link}`) // echos for debug
    
    const { link, fileType, format, quality } = req.body
    const outputDirectory = path.resolve(__dirname, '../downloads');
    const downloadTemplate = `[ChitShTools] | %(title)s.%(ext)s`;

    try {
        const downloadOptions = {
            format: format === 'audio' ? 'bestaudio' : 'bestvideo+bestaudio/best',
            audioQuality: quality === 'best' ? 0 : 9,
            addMetadata: format === 'audio' ? false : true,
            continue: true,
            sleepInterval: 10,
            noSimulate: true,
            print: downloadTemplate,
            output: path.join(outputDirectory, downloadTemplate),
        };

        // Download media
        const response = await youtubedl(link, downloadOptions);
        const inputFile = path.join(outputDirectory, response);
        const outputFile = path.join(outputDirectory, `${path.parse(response).name}.${fileType}`);
        const outputName = `${path.parse(response).name}.${fileType}`;

        // Transcode media
        ffmpeg(inputFile)
            .toFormat(fileType)
            .audioBitrate(128)
            .videoBitrate(1024)
            .on('end', () => {
                fs.unlinkSync(inputFile);
                fs.readFile(outputFile, (err, data) => {
                    if (err) return res.status(500).json({ message: 'Error reading the converted file.' });

                    // Set appropriate headers and send the file buffer
                    res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
                    res.setHeader('Content-Type', `audio/${fileType}`);
                    res.json({ message: outputName, file: data.toString('base64')})

                    fs.unlinkSync(outputFile);
                });
            })

            .on('error', (err) => {
                console.log('An error occurred during transcoding: ' + err.message);
                res.status(500).json({ message: 'An error occurred during transcoding.' });
            })

            .save(outputFile);

    } catch (error) {
        console.error('An error occurred while downloading the media:', error);
        res.status(500).json({ message: 'An error occurred while downloading the media.' });
    }

}

exports.convertImage = async (req, res) => {
    const outputFormat = req.body.format;
    const inputFile = path.join(__dirname, `../downloads/${req.file.filename}`);
    const outputFile = path.join(__dirname, `../downloads/${req.file.filename}.${outputFormat}`);
    const outputName = `${req.file.filename}.${outputFormat}`;

    sharp(inputFile)
        .toFormat(outputFormat)
        .toFile(outputFile)
        .then(() => {
            fs.unlinkSync(inputFile);

            fs.readFile(outputFile, (err, data) => {
                if (err) return res.status(500).json({ message: 'Error reading the converted file.' });

                res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
                res.setHeader('Content-Type', `image/${outputFormat}`);
                res.json({ message: outputName, file: data.toString('base64')})

                fs.unlinkSync(outputFile);
            });
        })
        .catch((err) => {
            console.log('An error occurred during transcoding: ' + err.message);
            res.status(500).json({ message: 'An error occurred during transcoding.' });
        });
}

exports.convertVideo = async (req, res) => {
    let outputFormat = req.body.format;
    const inputFile = path.join(__dirname, `../downloads/${req.file.filename}`);
    const outputFile = path.join(__dirname, `../downloads/${req.file.filename}.${outputFormat}`);
    const outputName = `${req.file.filename}.${outputFormat}`;

    if(outputFormat === 'mp4' || outputFormat === 'webm' || outputFormat === 'ogg') {
        outputFormat = outputFormat;
    } else if (outputFormat === 'mkv') {
        outputFormat = 'matroska';
    }

    ffmpeg(inputFile)
        .toFormat(outputFormat)
        .on('end', () => {
            fs.unlinkSync(inputFile);

            fs.readFile(outputFile, (err, data) => {
                if (err) return res.status(500).json({ message: 'Error reading the converted file.' });
                console.log('Output File Does Exist');

                res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
                res.setHeader('Content-Type', `video/${outputFormat}`);
                res.json({ message: outputName, file: data.toString('base64')})

                fs.unlinkSync(outputFile);
            })
        })
        .on('error', (err) => {
            console.log('An error occurred during transcoding: ' + err.message);
            res.status(500).json({ message: 'An error occurred during transcoding.' });
        })
        .save(outputFile)

}
