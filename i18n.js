(() => {
  const enToDe = {
    'Focus': 'Fokus',
    'Projects': 'Projekte',
    'Publications': 'Publikationen',
    'Clinical precision,': 'Klinische Präzision,',
    'built into software.': 'in Software übersetzt.',
    'I’m Maximilian Grohmann — medical physicist and medical informatics specialist working where radiotherapy, patient safety, ARIA database queries, DICOM workflows, HL7/FHIR interfaces, web services, clinical networking, automation and applied AI meet real clinical constraints.': 'Ich bin Maximilian Grohmann — Medizinphysiker und Medical Informatics Specialist an der Schnittstelle von Strahlentherapie, Patientensicherheit, ARIA-Datenbankabfragen, DICOM-Workflows, HL7/FHIR-Schnittstellen, Webservices, klinischer Netzwerktechnik, Automatisierung und angewandter KI.',
    'View GitHub': 'GitHub ansehen',
    'clinical-automation.sh': 'klinische-automatisierung.sh',
    'Build practical tools that make clinical workflows safer, clearer and more reproducible.': 'Praktische Werkzeuge bauen, die klinische Abläufe sicherer, klarer und reproduzierbarer machen.',
    'Medical physics × informatics': 'Medizinphysik × Informatik',
    'Almost a decade in clinical medical physics, now focused on department IT, digitalization, system interfaces, automation and AI-enabled workflows.': 'Fast ein Jahrzehnt klinische Medizinphysik, heute mit Fokus auf Abteilungs-IT, Digitalisierung, Systemschnittstellen, Automatisierung und KI-gestützte Workflows.',
    'Current base': 'Aktueller Standort',
    'Clinical roots': 'Klinische Wurzeln',
    'Education': 'Ausbildung',
    'Focus areas': 'Schwerpunkte',
    'Hands-on engineering for clinical environments: pragmatic, safety-aware and close to real radiotherapy, IT and integration workflows.': 'Hands-on Engineering für klinische Umgebungen: pragmatisch, sicherheitsbewusst und nah an realen Strahlentherapie-, IT- und Integrationsworkflows.',
    'Radiotherapy automation': 'Strahlentherapie-Automatisierung',
    'Workflow tooling around treatment planning, plan review, dose metrics, SRS analytics, RayStation/TPS scripting and operational quality checks.': 'Workflow-Tools rund um Bestrahlungsplanung, Planprüfung, Dosismetriken, SRS-Analysen, RayStation/TPS-Scripting und operative Qualitätschecks.',
    'DICOM & medical imaging': 'DICOM & medizinische Bildgebung',
    'Clinical data pipelines for DICOM-RT, RTSTRUCT, dose grids, image geometry, ARIA SQL queries, export/import and robust data handling.': 'Klinische Datenpipelines für DICOM-RT, RTSTRUCT, Dosisraster, Bildgeometrie, ARIA-SQL-Abfragen, Export/Import und robuste Datenverarbeitung.',
    'AI with guardrails': 'KI mit Leitplanken',
    'Applied AI and coding-assistant workflows with attention to validation, privacy, reproducibility and patient safety.': 'Angewandte KI und Coding-Assistant-Workflows mit Fokus auf Validierung, Datenschutz, Reproduzierbarkeit und Patientensicherheit.',
    'Department IT': 'Abteilungs-IT',
    'Connecting clinical reality with maintainable software, interface design, department-to-hospital system integration, automation, documentation and data strategy.': 'Klinische Realität mit wartbarer Software, Schnittstellendesign, Systemintegration zwischen Abteilung und Klinik, Automatisierung, Dokumentation und Datenstrategie verbinden.',
    'Clinical interoperability': 'Klinische Interoperabilität',
    'Digitalization in a hospital department is often less about one perfect system and more about reliable bridges between many imperfect ones.': 'Digitalisierung in einer Klinikabteilung bedeutet oft nicht ein perfektes System, sondern zuverlässige Brücken zwischen vielen unperfekten Systemen.',
    'ARIA database work': 'ARIA-Datenbankarbeit',
    'SQL-based querying and reporting around ARIA data, turning clinical system data into usable operational insight.': 'SQL-basierte Abfragen und Reports aus ARIA-Daten, um klinische Systemdaten in nutzbare operative Erkenntnisse zu übersetzen.',
    'Interfaces & web services': 'Schnittstellen & Webservices',
    'Creating interfaces between departmental, clinical and surrounding hospital systems — including HL7, FHIR and service-based integrations.': 'Schnittstellen zwischen Abteilungs-, Klinik- und umgebenden Krankenhaussystemen schaffen — inklusive HL7, FHIR und servicebasierter Integrationen.',
    'Clinical networking': 'Klinische Netzwerktechnik',
    'Protocol-aware troubleshooting and coordination for real clinical communication: port releases, routing, firewalls and services across DICOM, SMB and other protocols.': 'Protokollbewusstes Troubleshooting und Koordination realer klinischer Kommunikation: Portfreigaben, Routing, Firewalls und Dienste über DICOM, SMB und andere Protokolle.',
    'CV snapshot': 'CV-Kurzprofil',
    'A compact public overview. Details can grow over time, while project and publication data are refreshed automatically.': 'Kompakte öffentliche Übersicht. Details können wachsen, während Projekt- und Publikationsdaten automatisch aktualisiert werden.',
    'Now': 'Heute',
    'Before': 'Davor',
    'Medical Physicist · University Medical Center Hamburg-Eppendorf': 'Medizinphysik-Experte · Universitätsklinikum Hamburg-Eppendorf',
    'Department IT, digitalization, clinical system interfaces, ARIA database/SQL work, HL7/FHIR and web-service integration, network/protocol coordination, automation and AI-focused tooling in Leipzig.': 'Abteilungs-IT, Digitalisierung, klinische Systemschnittstellen, ARIA-Datenbank/SQL-Arbeit, HL7/FHIR- und Webservice-Integration, Netzwerk-/Protokollkoordination, Automatisierung und KI-fokussierte Tools in Leipzig.',
    'Clinical medical physics experience in radiotherapy with strong links to patient safety, TPS scripting, DICOM/SMB/networked workflows and technical workflow improvement.': 'Klinische Medizinphysik-Erfahrung in der Strahlentherapie mit engem Bezug zu Patientensicherheit, TPS-Scripting, DICOM/SMB/netzwerkbasierten Workflows und technischer Prozessverbesserung.',
    'M.Sc. Medical Physics · Martin Luther University Halle-Wittenberg': 'M.Sc. Medizinische Physik · Martin-Luther-Universität Halle-Wittenberg',
    'Formal background in medical physics, bridging physics, medicine, computation and quality assurance.': 'Formaler Hintergrund in Medizinphysik — an der Schnittstelle von Physik, Medizin, Informatik und Qualitätssicherung.',
    'Selected projects': 'Ausgewählte Projekte',
    'Automatically refreshed from public GitHub repositories. Domain-relevant clinical tooling is prioritized.': 'Automatisch aus öffentlichen GitHub-Repositories aktualisiert. Domänenrelevante klinische Tools werden priorisiert.',
    'public non-fork repositories': 'öffentliche Non-Fork-Repositories',
    'highlighted projects': 'hervorgehobene Projekte',
    'data refresh cadence': 'Aktualisierungsrhythmus',
    'Recent publications': 'Aktuelle Publikationen',
    'Automatically refreshed from ORCID. Selected work covers radiation oncology, SBRT/SRS, AI autocontouring, patient safety and clinical practice.': 'Automatisch aus ORCID aktualisiert. Ausgewählte Arbeiten zu Radioonkologie, SBRT/SRS, KI-Autokonturierung, Patientensicherheit und klinischer Praxis.',
    'Connect': 'Kontakt',
    'If radiotherapy automation, medical imaging, interoperability, clinical networking, patient safety or clinical AI workflows overlap with your work, these are the best public entry points.': 'Wenn Strahlentherapie-Automatisierung, medizinische Bildgebung, Interoperabilität, klinische Netzwerktechnik, Patientensicherheit oder klinische KI-Workflows zu deiner Arbeit passen, sind das die besten öffentlichen Einstiegspunkte.',
    'Open-source projects, utilities and clinical workflow tooling.': 'Open-Source-Projekte, Utilities und klinische Workflow-Tools.',
    'Professional profile and network.': 'Berufliches Profil und Netzwerk.',
    'Research identity and publication record.': 'Research Identity und Publikationsliste.',
    'Built as a static GitHub Pages site.': 'Statische GitHub-Pages-Seite.'
  };

  const deToEn = Object.fromEntries(Object.entries(enToDe).map(([en, de]) => [de, en]));
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();

  function replaceText(root, dict) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const key = normalize(node.nodeValue);
      if (dict[key]) node.nodeValue = node.nodeValue.replace(key, dict[key]);
      if (document.documentElement.lang === 'de') {
        node.nodeValue = node.nodeValue.replace('updated ', 'aktualisiert ');
        [['Jan ', 'Jan. '], ['Feb ', 'Feb. '], ['Mar ', 'März '], ['Apr ', 'Apr. '], ['May ', 'Mai '], ['Jun ', 'Juni '], ['Jul ', 'Juli '], ['Oct ', 'Okt. '], ['Dec ', 'Dez. ']].forEach(([en, de]) => { node.nodeValue = node.nodeValue.replaceAll(en, de); });
      }
      if (document.documentElement.lang !== 'de') {
        node.nodeValue = node.nodeValue.replace('aktualisiert ', 'updated ');
        [['Jan. ', 'Jan '], ['Feb. ', 'Feb '], ['März ', 'Mar '], ['Apr. ', 'Apr '], ['Mai ', 'May '], ['Juni ', 'Jun '], ['Juli ', 'Jul '], ['Okt. ', 'Oct '], ['Dez. ', 'Dec ']].forEach(([de, en]) => { node.nodeValue = node.nodeValue.replaceAll(de, en); });
      }
    });
  }

  function setLanguage(lang) {
    const current = document.documentElement.lang === 'de' ? 'de' : 'en';
    document.documentElement.lang = lang;
    if (current !== lang) replaceText(document.body, lang === 'de' ? enToDe : deToEn);
    localStorage.setItem('siteLang', lang);
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.textContent = lang === 'de' ? 'EN' : 'DE';
      toggle.setAttribute('aria-label', lang === 'de' ? 'Switch language to English' : 'Sprache auf Deutsch umschalten');
    }
  }

  function initLanguage() {
    const preferred = localStorage.getItem('siteLang') || (navigator.language?.startsWith('de') ? 'de' : 'en');
    document.getElementById('langToggle')?.addEventListener('click', () => setLanguage(document.documentElement.lang === 'de' ? 'en' : 'de'));
    setLanguage(preferred);
    new MutationObserver(() => {
      if (document.documentElement.lang === 'de') replaceText(document.body, enToDe);
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLanguage);
  else initLanguage();
})();
