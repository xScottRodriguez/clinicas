/** @format */

// Componente de nivel superior que maneja el reconocimiento de voz
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const SpeechRecognitionProvider = ({ children }) => {
  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);
  const {
    finalTranscript: transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      setTranscription(transcript);
    }
  }, [transcript, listening]);

  const startListening = () => {
    requestMicrophonePermission();
    if (!browserSupportsSpeechRecognition) {
      toast.error("Este navegador no soporta el reconocimiento de voz");
    }

    if (!isMicrophoneAvailable) {
      toast.error("El micrófono no está disponible");
    }
    setListening(true);
    SpeechRecognition.startListening({ language: "es-SV", continuous: false });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setListening(false);
  };

  const requestMicrophonePermission = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          console.log(stream.active);
        })
        .catch((error) => {
          console.error("Error accessing getUserMedia:", error);
        });
    } else {
      console.error("navigator.mediaDevices is not available");
    }
  };

  const speechRecognitionProps = {
    listening,
    transcription,
    startListening,
    stopListening,
  };

  return children(speechRecognitionProps);
};

export default SpeechRecognitionProvider;
