import React, { useState } from 'react';
import './Translator.css'; // Import CSS for this component

function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Default source language: English
  const [targetLang, setTargetLang] = useState('es'); // Default target language: Spanish

  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ar', name: 'Arabic' },
  ];

  // Handle translation request
  const handleTranslate = async () => {
    if (!inputText) {
      setError('Please enter text to translate');
      return;
    }

    setError(''); // Clear previous errors

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await response.json();
      const translation = data.responseData.translatedText;
      setTranslatedText(translation);

    } catch (err) {
      setError('Error fetching translation. Please try again.');
    }
  };

  return (
    <div className="translator-container">
      <h1>Translator</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="language-select">
        <div>
          <label htmlFor="sourceLang">Source Language: </label>
          <select
            id="sourceLang"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="targetLang">Target Language: </label>
          <select
            id="targetLang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <textarea
        rows="4"
        placeholder="Enter text to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={handleTranslate}>Translate</button>

      {translatedText && (
        <div className="translation-result">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Translator;