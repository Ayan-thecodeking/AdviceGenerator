const adviceText = document.querySelector(".quote")
const  AdviceId = document.querySelector(".id")
const  quoteBtn = document.querySelector("button")
const voiceBtn= document.getElementById("voice");
const  copyBtn = document.querySelector("#copy")
const  twitterBtn = document.querySelector("#twitter")


var speech = new SpeechSynthesisUtterance();
console.log(speech);

const randomAdvice = async () => {
  const res = await fetch("https://api.adviceslip.com/advice")
  const result = await res.json()
  console.log(result)
  adviceText.innerText = result.slip.advice
  AdviceId.innerText = "Advice #" + `${result.slip.id}`
  const text = result.slip.advice;
  
  if (text.trim() != "") {
    speech.text = text;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
    speech.onend=()=>{
        alert("ended")
    }

  } else {
    alert("Unable To Read Please Try Again Later");
  }
}



if ("speechSynthesis" in window) {
  // Speech Synthesis supported 🎉
} else {
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}

function TexttoSpeech() {
  const text = adviceText.innerText;
  if (text.trim() != "") {
    speech.text = text;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
  } else {
    alert("Please Enter Text");
  }
}

voiceBtn.addEventListener("click", () => {
  TexttoSpeech();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(adviceText.innerText);
});
twitterBtn.addEventListener("click", () => {
 let tweetUrl = 'https://twitter.com/intent/tweet?url= $(adviceText.innerText)';
 window.open(tweetUrl,"_blank");
});



quoteBtn.addEventListener("click", randomAdvice)

