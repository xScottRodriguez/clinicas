/** @format */

export * from './hot-toast.plugin';
export * from './sweetAlert.plugin';
export default class SpeechToText {
  constructor(
    onFinalised,
    onEndEvent,
    onAnythingSaid,
    onErrorEvent,
    language = 'es-ES'
  ) {
    // Check to see if this browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error(
        "This browser doesn't support speech recognition. Try Google Chrome."
      );
    }

    this.onFinalised = onFinalised;
    this.onEndEvent = onEndEvent;
    this.onAnythingSaid = onAnythingSaid;
    this.onErrorEvent = onErrorEvent;

    const SpeechRecognition = window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = !!onAnythingSaid;
    this.recognition.lang = language;

    let finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcriptionPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptionPiece;
          this.onFinalised(finalTranscript);
          finalTranscript = '';
        } else if (this.recognition.interimResults) {
          interimTranscript += transcriptionPiece;
          this.onAnythingSaid(interimTranscript);
        }
      }
    };

    this.recognition.onend = () => {
      this.onEndEvent();
    };

    this.recognition.onerror = (error) => {
      this.onErrorEvent(error);
    };
  }

  startListening() {
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }
}
