const voice = {

recognition:null,

enabled:false,

state:"IDLE",

init(){

const SR=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SR){

console.warn("Speech Recognition tidak didukung");

return;

}

this.recognition=new SR();

this.recognition.lang="id-ID";

this.recognition.continuous=true;

this.recognition.interimResults=false;

this.recognition.maxAlternatives=1;

const mic=document.getElementById("btn-voice");

const input=document.getElementById("chat-input");

mic.onclick=()=>{

if(this.enabled){

this.disable();

}else{

this.enable();

}

};

this.recognition.onstart=()=>{

this.state="LISTENING";

mic.classList.add("mic-active");

input.placeholder="🎤 Mendengarkan...";

if(window.app){

app.toggleListening(true);

}

};

this.recognition.onresult=(event)=>{

if(this.state!=="LISTENING"){

return;

}

let text="";

for(

let i=event.resultIndex;

i<event.results.length;

i++

){

if(event.results[i].isFinal){

text+=event.results[i][0].transcript;

}

}

text=text.trim();

if(!text){

return;

}

input.value=text;

/* Mic dimatikan sebelum AI berpikir */

this.pause();

setTimeout(()=>{

app.sendMessage(text);

},100);

};

        this.recognition.onerror = (event) => {

            console.log("VOICE:", event.error);

            if (
                event.error === "aborted"
            ) {
                return;
            }

            if (
                event.error === "no-speech"
            ) {

                if (this.enabled) {

                    setTimeout(() => {

                        this.startListening();

                    }, 500);

                }

                return;

            }

            if (
                event.error === "audio-capture" ||
                event.error === "not-allowed" ||
                event.error === "service-not-allowed"
            ) {

                this.disable();

            }

        };

        this.recognition.onend = () => {

            const mic =
                document.getElementById("btn-voice");

            const input =
                document.getElementById("chat-input");

            mic.classList.remove("mic-active");

            input.placeholder = "Ketik pesan...";

            if (window.app) {

                app.toggleListening(false);

            }

            /* Jangan restart kalau AI sedang bicara */

            if (
                !this.enabled ||
                this.state === "SPEAKING" ||
                this.state === "THINKING"
            ) {

                return;

            }

            setTimeout(() => {

                this.startListening();

            }, 400);

        };

    },

    enable() {

        this.enabled = true;

        this.startListening();

    },

    disable() {

        this.enabled = false;

        this.state = "IDLE";

        try {

            this.recognition.abort();

        } catch (e) {}

    },

    startListening() {

        if (!this.enabled) return;

        if (this.state === "LISTENING") return;

        this.state = "LISTENING";

        try {

            this.recognition.start();

        } catch (e) {}

    },

    pause() {

        this.state = "THINKING";

        try {

            this.recognition.abort();

        } catch (e) {}

    },

    startSpeaking() {

        this.state = "SPEAKING";

        try {

            this.recognition.abort();

        } catch (e) {}

    },

    stopSpeaking() {

        if (!this.enabled) {

            this.state = "IDLE";

            return;

        }

        this.state = "LISTENING";

        setTimeout(() => {

            this.startListening();

        }, 600);

    },

    isListening() {

        return this.state === "LISTENING";

    },

    isSpeaking() {

        return this.state === "SPEAKING";

    }

};

document.addEventListener("DOMContentLoaded", () => {

    voice.init();

});

window.voice = voice;
