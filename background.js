chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Meddelande mottaget i background.js:", message);

    if (message.action === "download_video") {
        console.log("Trigger från knappen mottagen!");

        chrome.tabs.create({
            url: `https://en1.savefrom.net/1-youtube-video-downloader-3vV/?url=${encodeURIComponent(message.videoUrl)}`
        });
    }
});