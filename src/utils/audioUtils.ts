export function speakText(text: string, enabled: boolean) {
  if (!enabled || !text || !window.speechSynthesis) return;
  console.log("tts:", text);

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.2;
  utterance.pitch = 1;
  utterance.volume = 1;
  // Ensure clear enunciation
  // utterance.enqueue = true;
  // Use a more natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
}
