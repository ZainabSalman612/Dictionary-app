const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            // Check if the phonetics array has a valid audio file
            const audioUrl = data[0].phonetics[0]?.audio;
            if (audioUrl) {
                sound.setAttribute("src", audioUrl); // Use the audio URL directly
            } else {
                sound.removeAttribute("src"); // Clear the src if no audio is available
                console.log("No audio available");
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Word not found</h3>`;
        });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No pronunciation available for this word.");
    }
}
