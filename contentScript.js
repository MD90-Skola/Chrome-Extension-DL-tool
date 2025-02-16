(() => {
    let youtubeLeftControls;
    
    const waitForYouTubeUI = setInterval(() => {
        if ((youtubeLeftControls = document.querySelector(".ytp-left-controls"))) {
            clearInterval(waitForYouTubeUI);
            if (!document.querySelector(".bookmark-btn")) createDownloadButton();
        }
    }, 1000);

    const createDownloadButton = () => {
        console.log("✅ YouTube UI hittat, skapar knapp...");
        const bookmarkBtn = document.createElement("img");

        Object.assign(bookmarkBtn, {
            src: chrome.runtime.getURL("assets/download.png"),  // Uppdaterad ikon till "download.png"
            className: "ytp-button bookmark-btn",
            title: "Ladda ner video"
        });

        bookmarkBtn.style.cssText = `
            width: 36px !important;
            height: 36px !important;
            padding: 6px;
            cursor: pointer;
            pointer-events: auto;
            z-index: 9999;
            opacity: 1;
            display: block !important;
            position: relative;
        `;

        youtubeLeftControls.appendChild(bookmarkBtn);

        // ✅ Fixad: Anropar asynkron funktion korrekt med en anonym async-funktion
        bookmarkBtn.addEventListener("click", async () => {
            await copyUrlAndOpenDownloadPage();
        });

        console.log("✅ Knapp skapad och event registrerat.");
    };

    const copyUrlAndOpenDownloadPage = async () => {
        const videoUrl = window.location.href;

        try {
            await navigator.clipboard.writeText(videoUrl);
            console.log("✅ URL kopierad:", videoUrl);
        } catch (err) {
            console.error("❌ Misslyckades att kopiera URL:", err);
        }

        // Vänta 200ms innan sidan öppnas för att säkerställa att kopieringen hinner klart
        setTimeout(() => {
            const downloadUrl = `https://en1.savefrom.net/1-youtube-video-downloader-3vV/?url=${encodeURIComponent(videoUrl)}`;
            console.log("✅ Öppnar nedladdningssida:", downloadUrl);
            window.open(downloadUrl, "_blank");
        }, 200);
    };
})();