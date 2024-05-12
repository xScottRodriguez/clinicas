/** @format */

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SpeechRecognition from "react-speech-recognition";

const useCustomSpeechRecognition = () => {
  const [transcription, setTranscription] = useState("");
  const {
    finalTranscript: transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    startListening: startRecognition,
    stopListening: stopRecognition,
    resetTranscript,
  } = SpeechRecognition.useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      setTranscription(transcript);
    }
  }, [transcript, listening]);

  const startListening = () => {
    if (!isMicrophoneAvailable) {
      return toast((t) => (
        <span className="row">
          <div className="col-md-8">
            El <b>micrófono</b> no está disponible
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-outline-dark mx-1"
              onClick={() => toast.dismiss(t.id)}
            >
              Cerrar
            </button>
          </div>
        </span>
      ));
    }
    if (!browserSupportsSpeechRecognition) {
      toast((t) => (
        <span>
          <div className="row">
            <div className="col-md-8">
              Este navegador no soporta el <b>Reconocimiento de voz</b>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </span>
      ));
      return;
    }
    startRecognition({ language: "es-SV" });
  };

  const stopListening = () => {
    stopRecognition();
    resetTranscript();
  };

  return {
    listening,
    transcription,
    startListening,
    stopListening,
  };
};

export default useCustomSpeechRecognition;
