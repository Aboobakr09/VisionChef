import React, { useState, useEffect } from 'react';
import { Play, Repeat, RotateCcw, Mic, MicOff } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceCommandButtonsProps {
  onNextStep: () => void;
  onRepeat: () => void;
  onStartOver: () => void;
}

const VoiceCommandButtons = ({
  onNextStep,
  onRepeat,
  onStartOver,
}: VoiceCommandButtonsProps) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase().includes('next step')) {
      onNextStep();
      resetTranscript();
    } else if (transcript.toLowerCase().includes('repeat')) {
      onRepeat();
      resetTranscript();
    } else if (transcript.toLowerCase().includes('start over')) {
      onStartOver();
      resetTranscript();
    }
  }, [transcript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
        Your browser doesn't support voice commands. Please try using Chrome.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`relative flex items-center justify-center h-12 w-12 rounded-full ${
            isListening
              ? 'bg-primary-100 text-primary-500'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isListening ? (
            <>
              <Mic size={24} />
              <span className="absolute inset-0 rounded-full border-4 border-primary-500 animate-pulse"></span>
            </>
          ) : (
            <MicOff size={24} />
          )}
        </div>
        <div>
          <div className="font-medium text-gray-900">
            {isListening ? 'Listening...' : 'Voice Commands'}
          </div>
          <div className="text-sm text-gray-500">
            {isListening
              ? transcript || 'Say a command like "next step"'
              : 'Click to enable voice commands'}
          </div>
        </div>
        <button
          onClick={toggleListening}
          className={`ml-auto py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isListening
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isListening ? 'Stop' : 'Enable'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onNextStep}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors"
        >
          <Play size={20} className="text-primary-500 mb-1" />
          <span className="text-xs font-medium text-primary-900">Next Step</span>
        </button>
        <button
          onClick={onRepeat}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <Repeat size={20} className="text-gray-500 mb-1" />
          <span className="text-xs font-medium text-gray-900">Repeat</span>
        </button>
        <button
          onClick={onStartOver}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <RotateCcw size={20} className="text-gray-500 mb-1" />
          <span className="text-xs font-medium text-gray-900">Start Over</span>
        </button>
      </div>
    </div>
  );
};

export default VoiceCommandButtons;