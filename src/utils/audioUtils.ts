export function speakText(text: string, enabled: boolean, shouldNotOverride?: boolean): void {
  /**
   * @param text: The text to be spoken
   * @param enabled: User setting if audio is enabled
   * @param shouldNotOverride: If true, the current audio will be not stopped
   * @returns void
   *
   * @description This function uses the Web Speech API to speak the given text.
   *
   */
  if (!enabled || !text || !window.speechSynthesis) return;

  if (!shouldNotOverride) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 0.5;

  const loadVoices = () => {
    return new Promise<SpeechSynthesisVoice[]>((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    });
  };

  loadVoices().then((voices) => {
    const storedLanguage = localStorage.getItem("audioLanguage");
    const selectedVoice = voices.find((voice) => voice.name === storedLanguage);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      const englishVoice = voices.find((voice) => voice.name.includes("Google") && voice.lang.startsWith("en"));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  });
}
