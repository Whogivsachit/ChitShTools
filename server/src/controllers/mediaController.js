const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const archiver = require('archiver');

const outputDirectory = path.resolve(__dirname, '../downloads');
const downloadTemplate = `[ChitShTools] | %(title)s.%(ext)s`;

// Create archive file for playlist downloading
const createArchive = async (files, archivePath, fileType) => {
    const output = fs.createWriteStream(archivePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            fs.readFile(archivePath, (err, data) => {
                if (err) return reject(err);
                const base64Data = data.toString('base64');
                resolve(base64Data);
            });
        });

        archive.on('error', reject);
        archive.pipe(output);

        (async () => {
            for (const file of files) {
                const filePath = path.join(outputDirectory, file);
                const transcodedFilePath = path.join(outputDirectory, `${path.parse(file).name}.${fileType}`);
                
                try {
                    await new Promise((resolve, reject) => {
                        // If the file is already in the desired format, just copy it
                        if (path.parse(file).ext === `.${fileType}`) {
                            fs.copyFile(filePath, transcodedFilePath, (err) => {
                                if (err) return reject(err);
                                archive.file(transcodedFilePath, { name: `${path.parse(file).name}.${fileType}` });
                                resolve();
                            });
                        }
                        ffmpeg(filePath)
                            .toFormat(fileType)
                            .audioBitrate(128)
                            .videoBitrate(1024)
                            .on('end', () => {
                                fs.unlinkSync(filePath);
                                archive.file(transcodedFilePath, { name: `${path.parse(file).name}.${fileType}` });
                                resolve();
                            })
                            .on('error', reject)
                            .save(transcodedFilePath);
                    });
                } catch (err) {
                    return reject(err);
                }
            }
            await archive.finalize();
        })();
    });
};

// Download a single file for media downloading
const handleSingleFile = async (link, downloadOptions, fileType, res) => {
    const response = await youtubedl(link, downloadOptions);
    const inputFile = path.join(outputDirectory, response);
    const outputFile = path.join(outputDirectory, `${path.parse(response).name}.${fileType}`);
    const outputName = `${path.parse(response).name}.${fileType}`;

    ffmpeg(inputFile)
        .toFormat(fileType)
        .audioBitrate(128)
        .videoBitrate(1024)
        .on('end', () => {
            fs.unlinkSync(inputFile);
            fs.readFile(outputFile, (err, data) => {
                if (err) return res.status(500).json({ message: 'Error reading the converted file.' });

                res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
                res.setHeader('Content-Type', `audio/${fileType}`);
                res.json({ message: outputName, file: data.toString('base64'), playlist: false });

                fs.unlinkSync(outputFile);
            });
        })
        .on('error', (err) => {
            console.log('An error occurred during transcoding: ' + err.message);
            res.status(500).json({ message: 'An error occurred during transcoding.' });
        })
        .save(outputFile);
};



exports.downloadMedia = async (req, res) => {
    console.log(`Request received to download media. Link: ${req.body.link}`); // echos for debug

    const { link, fileType, format, quality } = req.body;
    const downloadOptions = {
        format: format === 'audio' ? 'bestaudio' : 'bestvideo+bestaudio/best',
        audioQuality: quality === 'best' ? 0 : 9,
        addMetadata: format !== 'audio',
        continue: true,
        sleepInterval: 5,
        noSimulate: true,
        print: downloadTemplate,
        output: path.join(outputDirectory, downloadTemplate),
        externalDownloader: 'aria2c', // Use aria2c for faster downloads
        externalDownloaderArgs: [
            '-x', '16', // Number of connections per download
            '-s', '16', // Number of segments per download
            '-j', '6',  // Number of parallel downloads
            '--file-allocation=none', // Skip file allocation to speed up the process
            '--min-split-size=1M', // Minimum size of each segment
            '--max-connection-per-server=16', // Max connections per server
            '--split=16' // Split each file into 16 segments
        ],

    };

    try {

        const mediaJson = await youtubedl(link, { dumpSingleJson: true });
        const isPlaylist = mediaJson._type === 'playlist' || '';

        if (isPlaylist) {
            if(mediaJson.entries.length > 16) return res.send({ status: 413, message: 'Playlist is too large. Please download individual files or use a smaller playlist. [Max: 16]' });

            await youtubedl(link, downloadOptions);
            const files = fs.readdirSync(outputDirectory).filter(file => file.startsWith('[ChitShTools]'));
            const archivePath = path.join(outputDirectory, '[ChitShTools] playlist.zip');
            const base64Data = await createArchive(files, archivePath, fileType);

            res.setHeader('Content-Disposition', 'attachment; filename="[ChitShTools] playlist.zip"');
            res.setHeader('Content-Type', 'application/zip');
            res.json({ message: '[ChitShTools] playlist.zip', file: base64Data, playlist: true });

            // Delete files
            const convertedFiles = files.map(file => path.join(outputDirectory, `${path.parse(file).name}.${fileType}`));
            convertedFiles.forEach(file => fs.unlinkSync(file));
            fs.unlinkSync(archivePath);

        } else {
            await handleSingleFile(link, downloadOptions, fileType, res);
        }
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
                res.json({ status: 200, message: outputName, file: data.toString('base64')})

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
                res.json({ status: 200, message: outputName, file: data.toString('base64')})

                fs.unlinkSync(outputFile);
            })
        })
        .on('error', (err) => {
            console.log('An error occurred during transcoding: ' + err.message);
            res.status(500).json({ message: 'An error occurred during transcoding.' });
        })
        .save(outputFile)

}
