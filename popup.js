// Funktion för att skicka ett meddelande till background.js när en knapp klickas
function setupDownloadButton(buttonId, destinationUrl) {
    document.getElementById(buttonId).addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const videoUrl = tab.url;

            console.log(`✅ Knapp ${buttonId} klickad, skickar meddelande till background.js`);

            // Skicka ett meddelande till background.js för att öppna SaveFrom.net
            chrome.runtime.sendMessage({
                action: "download_video",
                videoUrl: videoUrl,
                destinationUrl: destinationUrl
            });
        } catch (err) {
            console.error("❌ Misslyckades att skicka meddelande till background.js:", err);
        }
    });
}

// 🎯 Koppla knapparna till rätt sidor
setupDownloadButton("download-youtube", "https://en1.savefrom.net/1-youtube-video-downloader-3vV/");
setupDownloadButton("download-instagram", "https://fastdl.app/en");
setupDownloadButton("download-facebook", "https://fdown.net/");