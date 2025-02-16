// Kontrollera att TabControl.js laddas
console.log("✅ TabControl.js laddad!");

// Funktion för att hantera flikar och klistra in URL i sökrutan
function openTabAndPasteURL(buttonId, destinationUrl, searchFieldSelector, searchButtonSelector) {
    document.getElementById(buttonId).addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const videoUrl = tab.url;

            console.log(`✅ Knapp ${buttonId} klickad, URL:`, videoUrl);

            // Kopiera URL till urklippet
            await navigator.clipboard.writeText(videoUrl);
            console.log("✅ URL kopierad till urklippet:", videoUrl);

            // Öppna ny flik
            chrome.tabs.create({ url: destinationUrl }, (newTab) => {
                chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === newTab.id && changeInfo.status === "complete") {
                        chrome.tabs.onUpdated.removeListener(listener);

                        console.log("✅ Fliken laddad, kör executeScript...");

                        // 🔥 Direkt testa om executeScript körs
                        chrome.scripting.executeScript({
                            target: { tabId: newTab.id },
                            func: () => console.log("✅ ExecuteScript körs på sidan!")
                        });

                        // 🔥 Kör executeScript för att klistra in URL
                        chrome.scripting.executeScript({
                            target: { tabId: newTab.id },
                            func: (videoUrl, searchFieldSelector, searchButtonSelector) => {
                                setTimeout(() => {
                                    console.log("🔍 Letar efter inputfält...");
                                    const inputField = document.querySelector(searchFieldSelector);
                                    if (inputField) {
                                        inputField.value = videoUrl;
                                        inputField.dispatchEvent(new Event("input", { bubbles: true }));
                                        console.log("✅ URL inklistrad:", videoUrl);

                                        if (searchButtonSelector) {
                                            const searchButton = document.querySelector(searchButtonSelector);
                                            if (searchButton) {
                                                setTimeout(() => {
                                                    searchButton.click();
                                                    console.log("✅ Sökknapp klickad.");
                                                }, 500);
                                            }
                                        }
                                    } else {
                                        console.warn("⏳ Väntar på att inputfältet ska laddas...");
                                    }
                                }, 1000);
                            },
                            args: [videoUrl, searchFieldSelector, searchButtonSelector]
                        });
                    }
                });
            });
        } catch (err) {
            console.error("❌ Misslyckades att kopiera URL eller klistra in:", err);
        }
    });
}

// 🎯 Lägg till funktionalitet för YouTube, Instagram och Facebook
openTabAndPasteURL("download-youtube", "https://en1.savefrom.net/1-youtube-video-downloader-3vV/", "input[name='sf_url']", "button[type='submit']");
openTabAndPasteURL("download-instagram", "https://fastdl.app/en", "input[name='url']", null);
openTabAndPasteURL("download-facebook", "https://fdown.net/", "input[name='url']", null);