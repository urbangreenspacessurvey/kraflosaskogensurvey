let currentLanguage = 'en';
let map;
let placePins = [];
let lastMapAddAt = 0;

const bondItems = {
  en: [
    "When I spend time in Krafslösaskogen I feel a deep oneness with its nature.",
    "I would feel less attached to Krafslösaskogen if the native plants and animals that live there disappeared.",
    "I learn a lot about myself when spending time in Krafslösaskogen.",
    "I am very attached to Krafslösaskogen."
  ],
  sv: [
    "När jag tillbringar tid i Krafslösaskogen känner jag en djup samhörighet med dess natur.",
    "Jag skulle känna mig mindre anknuten till Krafslösaskogen om de inhemska växterna och djuren som lever där försvann.",
    "Jag lär mig mycket om mig själv när jag tillbringar tid i Krafslösaskogen.",
    "Jag känner en stark anknytning till Krafslösaskogen."
  ]
};

const funcItems = {
  en: [
    "Walking / Jogging / running",
    "Cycling",
    "Dog walking",
    "Relaxing / resting",
    "Nature observation (plants, wildlife)",
    "Picnicking",
    "Playing (with children or others)",
    "Photography",
    "Foraging / mushroom picking",
    "Berry picking",
    "Everyday recreation"
  ],
  sv: [
    "Promenader / jogga / löpning",
    "Cykling",
    "Hundrastning",
    "Avkoppling / vila",
    "Naturstudier (växter, djurliv)",
    "Picknick",
    "Lek (med barn eller andra)",
    "Fotografering",
    "Plocka svamp",
    "Plocka bär",
    "Vardagsrekreation"
  ]
};

const routineItems = {
  en: [
    "The forest contributes positively to my daily routines.",
    "The presence of Krafslösaskogen makes this area more attractive to live in.",
    "Living near Krafslösaskogen improves my overall quality of life.",
    "Access to Krafslösaskogen supports my physical health.",
    "Access to Krafslösaskogen supports my mental well-being.",
    "I feel more relaxed because of the nearby Krafslösaskogen.",
    "I feel connected to nature because of the nearby Krafslösaskogen.",
    "I value the natural beauty of Krafslösaskogen.",
    "Krafslösaskogen is a source of inspiration for me."
  ],
  sv: [
    "Skogen bidrar positivt till mina dagliga rutiner.",
    "Krafslösaskogen gör området mer attraktivt att bo i.",
    "Att bo nära Krafslösaskogen förbättrar min övergripande livskvalitet.",
    "Tillgång till Krafslösaskogen stödjer min fysiska hälsa.",
    "Tillgång till Krafslösaskogen stödjer mitt mentala välbefinnande.",
    "Jag känner mig mer avslappnad tack vare närheten till Krafslösaskogen.",
    "Jag känner mig mer förenad med naturen tack vare Krafslösaskogen.",
    "Jag värdesätter Krafslösaskogens naturliga skönhet.",
    "Krafslösaskogen är en källa till inspiration för mig."
  ]
};

const multiItems = {
  en: [
    "Krafslösaskogen equally benefits all species living here.",
    "Krafslösaskogen supports the well-being of all species living here.",
    "People and wildlife can coexist in Krafslösaskogen.",
    "The interconnectedness of human and non-human species can be easily seen in Krafslösaskogen.",
    "All species living in Krafslösaskogen are equally valuable.",
    "Krafslösaskogen equally protects all species living here.",
    "Krafslösaskogen is equally accessible to all species that want to be here.",
    "I believe that Kalmar city makes decisions that result in all species being protected in Krafslösaskogen.",
    "I believe all species in Krafslösaskogen are equally recognized in the city's decision-making.",
    "Rights of all species are equally recognized in decisions about the future of Krafslösaskogen.",
    "I think that the way Krafslösaskogen is governed recognizes the value of non-human species."
  ],
  sv: [
    "Krafslösaskogen gynnar alla arter som lever här i lika hög grad.",
    "Krafslösaskogen stödjer välbefinnandet hos alla arter som lever här.",
    "Människor och vilda djur kan samexistera i Krafslösaskogen.",
    "Sammanlänkningen mellan mänskliga och icke-mänskliga arter är tydlig i Krafslösaskogen.",
    "Alla arter som lever i Krafslösaskogen är lika värdefulla.",
    "Krafslösaskogen skyddar alla arter som lever här i lika hög grad.",
    "Krafslösaskogen är lika tillgänglig för alla arter som vill vara här.",
    "Jag anser att Kalmar kommun fattar beslut som leder till att alla arter skyddas i Krafslösaskogen.",
    "Jag anser att alla arter i Krafslösaskogen erkänns lika i stadens beslutsfattande.",
    "Alla arters rättigheter erkänns lika mycket i beslut om Krafslösaskogens framtid.",
    "Jag anser att förvaltningen av Krafslösaskogen tar hänsyn till värdet av icke-mänskliga arter."
  ]
};

const emotionsEn = [
  'Happiness / Joy','Contentment','Pleasure','Excitement','Pride','Love / Affection','Compassion / Empathy','Gratitude','Hope / Optimism','Inspiration','Amusement','Awe / Wonder','Curiosity / Interest','Relief','Serenity / Calmness',
  'Sadness','Grief','Disappointment','Loneliness','Fear','Anxiety','Apprehension','Terror','Anger','Frustration','Annoyance','Rage','Disgust','Revulsion','Contempt','Loathing','Guilt / Shame','Embarrassment','Regret','Jealousy / Envy','Resentment','Confusion'
];
const emotionsSv = [
  'Lycka / glädje','Tillfredsställelse','Njutning','Upphetsning','Stolthet','Kärlek / tillgivenhet','Medkänsla / empati','Tacksamhet','Hopp / optimism','Inspiration','Underhållning','Förundran / vördnad','Nyfikenhet / intresse','Lättnad','Sinnesro / lugn',
  'Ledsen','Sorgsen','Besvikelse','Ensamhet','Rädsla','Ångest','Oro','Skräck','Ilska','Frustration','Irritation','Raseri','Avsky','Motvilja','Förakt','Hat','Skuld / skam','Pinsamhet','Ånger','Svartsjuka / avund','Bitterhet','Förvirring'
];

const translations = {
  en: {
    title: 'Krafslösaskogen Survey',
    main_title: 'KRAFLÖSASKOGEN / SNURROM SURVEY',
    welcome_1: 'Welcome!',
    welcome_2: 'We are students at Linnaeus University who are working with a project about Krafslösaskogen in one of our courses. We would be grateful for your opinion to better understand how people use and value the area around Snurrom and Värsnäs Golfbana.',
    welcome_3: 'We want to understand your relationship with local nature and how it factors into your daily routine. Your answer will help us understand how and if Krafslösaskogen contributes to the city of Kalmar.',
    welcome_4: 'By continuing, you agree that your answers will be collected anonymously for scientific purposes only. Thank you for taking the time to share your opinions.',
    contacts: 'Students: Josefin Grandin, Kexin Zhang, Miro Lyly, Helena Wittke.\n\nSupervisors: Marianna Strzelecka, Arash Akhshik — arash.akhshik@lnu.se; 0765602704',
    consent_title: 'Consent to participate in research',
    consent_label: 'Please read the statements below.',
    consent_1: 'I confirm that I have received and understood the information contained in the project statement.',
    consent_2: 'I confirm that I have had the opportunity to obtain satisfactory answers to additional questions regarding my participation in the planned research.',
    consent_3: 'I confirm that I am not coerced or otherwise unauthorisedly induced to participate in the planned research.',
    consent_4: 'I agree to participate in this research.',
    sec1_title: 'Connection to the forest',
    q1_title: 'How interconnected are you with nature? Please choose which of the following illustrations best describes your relationship with nature.',
    q1_hint: 'Select a drawing from A to G from the illustration above.',
    img_fallback: 'Add your illustration image file as nature-connectedness.jpg in the public folder.',
    bond_title: 'Nature bonding',
    func_title: 'General perception of forest functionality',
    func_desc: 'The questions below ask about your perception of how Krafslösaskogen is being used.',
    routine_title: 'Forest contribution to daily life and well-being',
    multi_title: 'The role of the green space for various forms of life and living beings',
    map_title: 'Please mark locations on the map below',
    map_instructions_title: 'Important places',
    map_instructions_p: 'Mark places you like to visit, rest, walk, or simply enjoy in and around Krafslösaskogen. After clicking on the map, add the activity or experience first, then choose the feeling connected to that place.',
    pin_rule: 'Add at least 1 point',
    pins_added: 'Pins added',
    clear_pins: 'Clear pins',
    remove_last_pin: 'Remove last pin',
    map_hint: 'After clicking on the map, a box should open automatically. If it does not, tap the marker once.',
    demo_title: 'Demographics',
    thanks_title: 'Thank you for participating in this survey.',
    thanks_p: 'Your input is a crucial step toward more inclusive, equitable green space planning for all urban inhabitants, human and otherwise.',
    submit: 'Submit Survey',
    scale7_hint: 'Please answer on a scale from 1 - strongly disagree to 7 - strongly agree.',
    scale5_hint: 'Please answer on a scale from 1 - strongly disagree to 5 - strongly agree.',
    activity: 'Activity or experience',
    emotion: 'Feeling',
    note: 'Short note (optional)',
    save: 'Save',
    delete: 'Delete pin',
    err_required: 'Please answer all required questions.',
    err_pins: 'Please add at least one pin on the map.',
    success: 'Survey submitted. Thank you!',
    error: 'Something went wrong while submitting. Please try again.',
    distance: 'How far do you live from Krafslösaskogen?',
    age: 'Age',
    gender: 'Gender',
    education: 'Education level',
    frequency: 'How often do you visit this place?',
    export_title: 'Download survey data',
    export_hint: 'Download each table as a CSV file. CSV files can be opened directly in Excel.',
    export_responses: 'Download responses CSV',
    export_pins: 'Download map pins CSV'
  },
  sv: {
    title: 'Krafslösaskogen enkät',
    main_title: 'KRAFLÖSASKOGEN / SNURROM ENKÄT',
    welcome_1: 'Välkommen!',
    welcome_2: 'Vi är studenter på Linnéuniversitetet och arbetar med ett projekt om Krafslösaskogen i en av våra kurser. Vi hade varit tacksamma för er åsikt för att bättre förstå hur människor använder och värdesätter området kring Snurrom och Värsnäs Golfbana.',
    welcome_3: 'Vi vill förstå er relation till den lokala naturen och hur den påverkar er dagliga rutin. Era svar kommer att hjälpa oss att förstå hur och om Krafslösaskogen bidrar till staden Kalmar.',
    welcome_4: 'Genom att fortsätta accepterar du att dina svar samlas in anonymt och endast i vetenskapligt syfte. Tack för att du tar dig tid att dela med dig av dina åsikter.',
    contacts: 'Studenter: Josefin Grandin, Kexin Zhang, Miro Lyly, Helena Wittke.\n\nHandledare: Marianna Strzelecka, Arash Akhshik — arash.akhshik@lnu.se; 0765602704',
    consent_title: 'Samtycke till deltagande i forskning',
    consent_label: 'Vänligen läs påståendena nedan.',
    consent_1: 'Jag bekräftar att jag har mottagit och förstått informationen som fanns i projektbeskrivningen.',
    consent_2: 'Jag bekräftar att jag har haft möjlighet att få fullgoda svar på ytterligare frågor om min medverkan i det planerade forskningsprojektet.',
    consent_3: 'Jag bekräftar att jag inte är tvingad eller på annat otillbörligt sätt förmådd att medverka i det planerade forskningsprojektet.',
    consent_4: 'Jag samtycker till att medverka i detta forskningsprojekt.',
    sec1_title: 'Anknytning till skogen',
    q1_title: 'Hur sammankopplad känner du dig med naturen? Välj den illustration som bäst beskriver din relation till naturen.',
    q1_hint: 'Välj en illustration från A till G i bilden ovan.',
    img_fallback: 'Lägg till bildfilen som nature-connectedness.jpg i public-mappen.',
    bond_title: 'Naturanknytning till den omgivande naturen/miljön',
    func_title: 'Allmän uppfattning om skogens funktionalitet',
    func_desc: 'Frågorna nedan handlar om din uppfattning om hur Krafslösaskogen används.',
    routine_title: 'Skogens bidrag till vardagsliv och välbefinnande',
    multi_title: 'Den gröna ytans roll för olika livsformer och levande varelser',
    map_title: 'Markera platser på kartan nedan',
    map_instructions_title: 'Viktiga platser',
    map_instructions_p: 'Markera platser som du tycker om att besöka, vila, promenera i eller helt enkelt njuta av i och runt Krafslösaskogen. När du klickar på kartan, ange först aktivitet eller upplevelse och välj sedan känslan som är kopplad till platsen.',
    pin_rule: 'Lägg till minst 1 punkt',
    pins_added: 'Antal punkter',
    clear_pins: 'Rensa punkter',
    remove_last_pin: 'Ta bort senaste punkt',
    map_hint: 'Efter att du klickat på kartan ska en ruta öppnas automatiskt. Om den inte gör det, tryck en gång på markören.',
    demo_title: 'Demografi',
    thanks_title: 'Tack för att du deltog i denna enkät.',
    thanks_p: 'Ditt bidrag är ett viktigt steg mot en mer inkluderande och rättvis planering av grönområden för alla stadens invånare – både människor och andra arter.',
    submit: 'Skicka in enkäten',
    scale7_hint: 'Vänligen svara på en skala från 1 - instämmer inte alls till 7 - instämmer helt.',
    scale5_hint: 'Vänligen svara på en skala från 1 - instämmer inte alls till 5 - instämmer helt.',
    activity: 'Aktivitet eller upplevelse',
    emotion: 'Känsla',
    note: 'Kort notering (valfritt)',
    save: 'Spara',
    delete: 'Ta bort punkt',
    err_required: 'Vänligen besvara alla obligatoriska frågor.',
    err_pins: 'Vänligen lägg till minst en punkt på kartan.',
    success: 'Enkäten har skickats. Tack!',
    error: 'Något gick fel vid inskickning. Försök igen.',
    distance: 'Hur långt bor du från Krafslösaskogen?',
    age: 'Ålder',
    gender: 'Kön',
    education: 'Utbildningsnivå',
    frequency: 'Hur ofta besöker du denna plats?',
    export_title: 'Ladda ner enkätdata',
    export_hint: 'Ladda ner varje tabell som en CSV-fil. CSV-filer kan öppnas direkt i Excel.',
    export_responses: 'Ladda ner svar som CSV',
    export_pins: 'Ladda ner kartpunkter som CSV'
  }
};

function t(k) {
  return translations[currentLanguage][k] || k;
}

function updateStaticTexts() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.title = t('title');
  document.getElementById('lang-en').classList.toggle('active', currentLanguage === 'en');
  document.getElementById('lang-sv').classList.toggle('active', currentLanguage === 'sv');
}

function renderQ1() {
  const c = document.getElementById('q1-overlap');
  c.innerHTML = '';
  ['A','B','C','D','E','F','G'].forEach(letter => {
    const l = document.createElement('label');
    l.innerHTML = `<input type="radio" name="nature_overlap" value="${letter}" required> ${letter}`;
    c.appendChild(l);
  });
}

function renderLikertList(id, items, prefix, max) {
  const c = document.getElementById(id);
  c.innerHTML = '';
  items[currentLanguage].forEach((txt, idx) => {
    const q = document.createElement('div');
    q.className = 'question';
    q.innerHTML = `<p class="question-title">${idx + 1}. ${txt}</p>`;
    const opts = document.createElement('div');
    opts.className = 'likert';
    for (let i = 1; i <= max; i++) {
      let labelText = String(i);
      if (i === 1) labelText = currentLanguage === 'sv' ? '1 - instämmer inte alls' : '1 - strongly disagree';
      else if (i === max) labelText = currentLanguage === 'sv' ? `${max} - instämmer helt` : `${max} - strongly agree`;
      const l = document.createElement('label');
      l.innerHTML = `<input type="radio" name="${prefix}${idx + 1}" value="${i}" required> ${labelText}`;
      opts.appendChild(l);
    }
    q.appendChild(opts);
    c.appendChild(q);
  });
}

function renderFunctionality() {
  const c = document.getElementById('func-section');
  c.innerHTML = '';
  funcItems[currentLanguage].forEach((txt, idx) => {
    const card = document.createElement('div');
    card.className = 'matrix-card';
    const title = document.createElement('div');
    title.className = 'matrix-title';
    title.textContent = `${idx + 1}. ${txt}`;
    const opts = document.createElement('div');
    opts.className = 'matrix-options';
    for (let i = 1; i <= 5; i++) {
      let labelText = String(i);
      if (i === 1) labelText = currentLanguage === 'sv' ? '1 - instämmer inte alls' : '1 - strongly disagree';
      if (i === 5) labelText = currentLanguage === 'sv' ? '5 - instämmer helt' : '5 - strongly agree';
      const l = document.createElement('label');
      l.innerHTML = `<input type="radio" name="func_${idx + 1}" value="${i}" required> ${labelText}`;
      opts.appendChild(l);
    }
    card.appendChild(title);
    card.appendChild(opts);
    c.appendChild(card);
  });
}

function renderDemographics() {
  const c = document.getElementById('demographics');
  const sets = currentLanguage === 'sv'
    ? {
        distance: ['Inom 1 km','1–5 km','5–10 km','Mer än 10 km'],
        age: ['Under 18','18–24','25–34','35–44','45–54','55–64','65+'],
        gender: ['Kvinna','Man','Icke-binär','Vill inte uppge','Annat'],
        education: ['Grundskola','Gymnasium','Yrkeshögskola / Eftergymnasial utbildning','Universitet / högskola','Doktorand / doktorsexamen','Annat'],
        frequency: ['Dagligen','Flera gånger i veckan','En gång i veckan','Några gånger i månaden','Sällan','Detta är mitt första besök']
      }
    : {
        distance: ['Within 1 km','1–5 km','5–10 km','More than 10 km'],
        age: ['Under 18','18–24','25–34','35–44','45–54','55–64','65+'],
        gender: ['Woman','Man','Non-binary','Prefer not to say','Other'],
        education: ['Primary school','Upper secondary school','Post-secondary / vocational education','University / college','Doctoral level','Other'],
        frequency: ['Daily','Several times a week','Once a week','A few times a month','Rarely','This is my first visit']
      };

  c.innerHTML = '';
  [
    ['distance_from_forest', t('distance'), sets.distance],
    ['age_group', t('age'), sets.age],
    ['gender', t('gender'), sets.gender],
    ['education_level', t('education'), sets.education],
    ['visit_frequency', t('frequency'), sets.frequency]
  ].forEach(([name, label, options]) => {
    const field = document.createElement('div');
    field.className = 'field question';
    field.innerHTML = `<label>${label}</label>`;
    const select = document.createElement('select');
    select.name = name;
    select.required = true;
    const first = document.createElement('option');
    first.value = '';
    first.textContent = currentLanguage === 'sv' ? 'Välj...' : 'Select...';
    select.appendChild(first);
    options.forEach(op => {
      const o = document.createElement('option');
      o.value = op;
      o.textContent = op;
      select.appendChild(o);
    });
    field.appendChild(select);
    c.appendChild(field);
  });
}

function updatePinCount() {
  document.getElementById('pin-count').textContent = placePins.length;
}

function removePin(id) {
  const idx = placePins.findIndex(p => p.id === id);
  if (idx >= 0) {
    const pin = placePins[idx];
    if (pin._marker) map.removeLayer(pin._marker);
    placePins.splice(idx, 1);
    updatePinCount();
  }
}

function clearPins() {
  placePins.slice().forEach(p => removePin(p.id));
}

function removeLastPin() {
  if (placePins.length) removePin(placePins[placePins.length - 1].id);
}

function makePopupContent(pin) {
  const wrap = document.createElement('div');
  wrap.style.minWidth = '260px';

  const aLabel = document.createElement('div');
  aLabel.textContent = t('activity');
  const activity = document.createElement('input');
  activity.type = 'text';
  activity.value = pin.activity || '';
  activity.placeholder = t('activity');
  activity.style.width = '100%';

  const eLabel = document.createElement('div');
  eLabel.style.marginTop = '8px';
  eLabel.textContent = t('emotion');
  const select = document.createElement('select');
  select.style.width = '100%';
  (currentLanguage === 'sv' ? emotionsSv : emotionsEn).forEach(e => {
    const o = document.createElement('option');
    o.value = e;
    o.textContent = e;
    if (pin.emotion === e) o.selected = true;
    select.appendChild(o);
  });

  const note = document.createElement('input');
  note.type = 'text';
  note.value = pin.note || '';
  note.placeholder = t('note');
  note.style.width = '100%';
  note.style.marginTop = '8px';

  const save = document.createElement('button');
  save.type = 'button';
  save.textContent = t('save');
  save.style.marginTop = '10px';

  const del = document.createElement('button');
  del.type = 'button';
  del.textContent = t('delete');
  del.style.margin = '10px 0 0 8px';

  save.onclick = () => {
    pin.activity = activity.value.trim();
    pin.emotion = select.value;
    pin.note = note.value.trim();
    pin._marker.closePopup();
  };
  del.onclick = () => removePin(pin.id);

  wrap.append(aLabel, activity, eLabel, select, note, save, del);
  L.DomEvent.disableClickPropagation(wrap);
  L.DomEvent.disableScrollPropagation(wrap);
  return wrap;
}

function bindAndOpenPinPopup(pin) {
  const marker = pin._marker;
  marker.bindPopup(makePopupContent(pin), {
    autoClose: false,
    closeOnClick: false,
    keepInView: true,
    maxWidth: 320
  });
  setTimeout(() => marker.openPopup(), 80);
}

function addPinFromMapClick(e) {
  const now = Date.now();
  if (now - lastMapAddAt < 550) return;
  lastMapAddAt = now;

  const pin = {
    id: String(Date.now()) + Math.random().toString(16).slice(2),
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    activity: '',
    emotion: '',
    note: ''
  };

  const marker = L.marker([pin.lat, pin.lng], { keyboard: false }).addTo(map);
  pin._marker = marker;
  placePins.push(pin);
  updatePinCount();

  marker.on('click', ev => {
    if (ev.originalEvent) {
      ev.originalEvent.preventDefault();
      ev.originalEvent.stopPropagation();
    }
    bindAndOpenPinPopup(pin);
  });

  bindAndOpenPinPopup(pin);
}

function initMap() {
  map = L.map('map', {
    tap: true,
    bounceAtZoomLimits: false,
    doubleClickZoom: false
  }).setView([56.69, 16.39], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.doubleClickZoom.disable();
  map.on('click', addPinFromMapClick);
}

function switchLanguage(lang) {
  currentLanguage = lang;
  updateStaticTexts();
  renderQ1();
  renderLikertList('bond-section', bondItems, 'bond_', 7);
  renderFunctionality();
  renderLikertList('routine-section', routineItems, 'routine_', 7);
  renderLikertList('multi-section', multiItems, 'multi_', 7);
  renderDemographics();
}

function showMessage(text, type) {
  const m = document.getElementById('message');
  m.className = type;
  m.textContent = text;
  m.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validate() {
  if (placePins.length < 1) {
    showMessage(t('err_pins'), 'error');
    return false;
  }
  const requiredNames = [...new Set([...document.querySelectorAll('#survey-form input[type="radio"][required], #survey-form select[required]')].map(i => i.name))];
  for (const name of requiredNames) {
    const inputs = document.querySelectorAll(`[name="${name}"]`);
    if (!inputs.length) continue;
    if (inputs[0].tagName === 'SELECT') {
      if (!inputs[0].value) {
        showMessage(t('err_required'), 'error');
        return false;
      }
    } else if (!document.querySelector(`input[name="${name}"]:checked`)) {
      showMessage(t('err_required'), 'error');
      return false;
    }
  }
  return true;
}

function collectData() {
  const data = { language: currentLanguage, responses: {} };
  data.nature_overlap = document.querySelector('input[name="nature_overlap"]:checked')?.value || null;
  document.querySelectorAll('#survey-form input[type="radio"]:checked').forEach(inp => {
    if (inp.name !== 'nature_overlap') data.responses[inp.name] = inp.value;
  });
  ['distance_from_forest','age_group','gender','education_level','visit_frequency'].forEach(name => {
    const el = document.querySelector(`[name="${name}"]`);
    data[name] = el ? el.value : null;
  });
  data.place_pins = placePins.map(p => ({
    lat: p.lat,
    lng: p.lng,
    activity: p.activity || '',
    emotion: p.emotion || '',
    note: p.note || ''
  }));
  return data;
}

async function submitForm() {
  if (!validate()) return;
  const data = collectData();
  try {
    const res = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const out = await res.json();
    if (out.success) {
      showMessage(t('success'), 'success');
      document.getElementById('survey-form').reset();
      clearPins();
      switchLanguage(currentLanguage);
    } else {
      showMessage(out.error || t('error'), 'error');
    }
  } catch (e) {
    showMessage(t('error'), 'error');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  updateStaticTexts();
  renderQ1();
  renderLikertList('bond-section', bondItems, 'bond_', 7);
  renderFunctionality();
  renderLikertList('routine-section', routineItems, 'routine_', 7);
  renderLikertList('multi-section', multiItems, 'multi_', 7);
  renderDemographics();
  initMap();
});
