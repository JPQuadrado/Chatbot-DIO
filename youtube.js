const YouTube = require('youtube-node');
const config = require('./yt-chave');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoURL(message, queryText){
    return new Promise((resolve, reject)=> {
        youtube.search(`Exercicio em casa para biceps ${queryText}`, 2, function(error, results){
            if(!error){
                const videoIds = result.items.map((item)=> item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.joins(`, `)}`);
            }
            else{
                reject('Deu erro!!!')
            }
        });
    })
}

module.exports.searchVideoURL = searchVideoURL;