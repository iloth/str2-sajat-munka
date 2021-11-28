import Ajax from "./ajax.js";

class Language {
  code;
  name;
  dataUrl;
  flagUrl;

  constructor(code, name, dataUrl, flagUrl) {
    this.code = code;
    this.name = name;
    this.dataUrl = dataUrl;
    this.flagUrl = flagUrl;
  }
}

class LocaleText {
  id;
  text;
}

class Localization {
  languages;
  localeTexts = [];

  constructor() {
    this.languages = new Map();
    this.languages.set('en', new Language('en', 'English', 'http://localhost:3000/lang_en', './assets/img/flag_gb.png'));
    this.languages.set('hu', new Language('hu', 'Magyar', 'http://localhost:3000/lang_hu', './assets/img/flag_gb.png'));
  }

  async load(lang) {
    const language = this.languages.get(lang);
    if (!language) {
      throw new Error('Unknown language code: ' + lang);
    }

    this.localeTexts = await Ajax.getJson(language.dataUrl);
  }

  translate(code) {
    let text = this.localeTexts.find((text) => text.id === code);
    return text ? text.text : `[${code}]`;
  }
}

export default Localization;