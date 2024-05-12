import React, { Fragment, useRef, useState,useEffect } from "react";
import JoditEditor from "jodit-react";
import  SpeechRecognition,  {useSpeechRecognition}  from  "react-speech-recognition"
import Alertas from "../../../../services/Alertas";


export default function Diagnostico() {
  const editor = useRef(null);

  const [content, setContent] = useState("");
  
  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };
  useEffect(
    () =>
      setContent(
        content
      ),
    [content]
  );

  //comando
  const commands =[
    {
      command: "Comando limpiar",
      callback:({resetTranscript})=> resetTranscript()
    },
    {
         command: "comando abrir *",
        callback: (site)=>{
          window.open('http://'+site)
        }
    }

  ]


  //configuracion para el boton con el microfono
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({commands});


  const startListening = () => SpeechRecognition.startListening({ language: "es-SV"});
  

  if(!isMicrophoneAvailable){
    return Alertas.warning("para usar esta funcionalidad necesita permiso de microfono").then((res)=>{
       if(res){
        window.location.href="/lab_clinico/diagnostico"
       }
     })

  }

  if (!browserSupportsSpeechRecognition) {
    return Alertas.warning("Este navegado no es compatible con el reconocimiento de voz");
  }

  
  return (
    <Fragment>
      <div className="card mb">
        <div className="card card-header">Diagnostico</div>
        <div className="card-body">
          <div className="d-grid justify-content-md-end" style={{ marginRight: "5px" }}>
           {
              listening 
              ?
              <button onClick={SpeechRecognition.stopListening} className="btn btn-danger"><i className="fas fa-microphone-slash"/>Detener</button>
              :
              <button onClick={startListening}  className="btn btn-primary"><i className="fas fa-microphone"/>Hablar</button>
            } 
          </div>
         <div className="">
            <JoditEditor
              ref={editor}
              value={transcript}
              config={config}
              onBlur={(newContent) => setContent(newContent)} 
              onChange={(newContent) => {}}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
