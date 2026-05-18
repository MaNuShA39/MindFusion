export const LABELS = ['Minimum', 'Mild', 'Moderate', 'Severe']

export const LABEL_COLORS = {
  Minimum:  '#10b981',
  Mild:     '#f59e0b',
  Moderate: '#ef4444',
  Severe:   '#7c3aed',
}

export const LABEL_BG = {
  Minimum:  'rgba(16,185,129,0.1)',
  Mild:     'rgba(245,158,11,0.1)',
  Moderate: 'rgba(239,68,68,0.1)',
  Severe:   'rgba(124,58,237,0.1)',
}

export const LABEL_BORDER = {
  Minimum:  'rgba(16,185,129,0.35)',
  Mild:     'rgba(245,158,11,0.35)',
  Moderate: 'rgba(239,68,68,0.35)',
  Severe:   'rgba(124,58,237,0.35)',
}

export const LABEL_DESC = {
  Minimum:  'No significant depression indicators detected. The language patterns suggest a generally stable emotional state.',
  Mild:     'Some mild depression-related language patterns are present. The text shows early indicators that may warrant gentle self-care attention.',
  Moderate: 'Moderate depression indicators detected. The text contains several patterns associated with moderate-level depressive language.',
  Severe:   'Significant depression-related language detected. The text shows strong patterns associated with severe depressive expression.',
}

export const LABEL_ADVICE = {
  Minimum:  'The text shows no significant depression indicators. Continue maintaining healthy habits and social connections.',
  Mild:     'Consider speaking with a trusted person about how you are feeling. Self-care and social support can be very helpful.',
  Moderate: 'Professional mental health support may be beneficial. Speaking with a counsellor or therapist is recommended.',
  Severe:   'Please consider reaching out to a mental health professional as soon as possible. You are not alone.',
}

export const SAMPLE_TEXTS = {
  minimum: "Today was actually a really good day. I finished my project, went for a walk, and had dinner with friends. Feeling grateful and genuinely content with where things are heading.",
  mild:    "I've been feeling a bit off lately. Some days are harder than others and I find myself losing motivation for things I used to enjoy. Not sure what's going on with me recently.",
  moderate:"I can barely get out of bed most days. Everything feels heavy and pointless. I go through the motions but nothing feels real anymore. I've stopped talking to most of my friends.",
  severe:  "I hate myself and everything around me. I feel like disappearing and ending everything. Nothing will ever get better and I don't see any reason to keep going. I'm completely hopeless.",
}

export const MODEL_INFO = [
  { name: 'BERT',       color: '#4f8ef7', desc: 'General language understanding' },
  { name: 'MentalBERT', color: '#10b981', desc: 'Mental health domain-specific' },
  { name: 'RoBERTa',    color: '#f97316', desc: 'Robustly optimised pretraining' },
]
