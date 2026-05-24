// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\data\sentences.js
// FULLY CORRECTED - All errorTypes, correct values, and tool assignments verified

export const sentences = [
  // ================= LEVEL 1: Year 3/4 (ages 7–9) =================
  {
    id: 1,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "the cat sat on the mat and it were happy",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Sentences always start with a capital letter. Use the Scalpel → 'Aa Capitalise'.", explanation: "Sentences must start with a capital letter." },
      { text: "cat", original: "cat", correct: "cat", errorType: null },
      { text: "sat", original: "sat", correct: "sat", errorType: null },
      { text: "on", original: "on", correct: "on", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "mat", original: "mat", correct: "mat", errorType: null },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "it", original: "it", correct: "it", errorType: null },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "The subject 'it' is singular. Clamp 'it' and 'were' → choose 'was'.", explanation: "Use 'was' for singular subjects like 'it'." },
      { text: "happy", original: "happy", correct: "happy.", errorType: "punctuation", hint: "Every sentence needs a full stop at the end. Use the Scalpel and select '.'.", explanation: "Sentences need ending punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "General Surgery"
  },
  {
    id: 2,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "its a lovely day today isnt it",
    words: [
      { text: "its", original: "its", correct: "It's", errorType: "apostrophe", hint: "'its' = 'it is' here. Use the Apostrophe Implant and pick 'It's'.", explanation: "Use an apostrophe for the contraction 'it is' → 'It's'." },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "lovely", original: "lovely", correct: "lovely", errorType: null },
      { text: "day", original: "day", correct: "day", errorType: null },
      { text: "today", original: "today", correct: "today,", errorType: "punctuation", hint: "Add a comma after 'today' before the tag question. Scalpel → ','.", explanation: "Use commas to separate clauses." },
      { text: "isnt", original: "isnt", correct: "isn't", errorType: "apostrophe", hint: "'isnt' = 'is not'. Use the Apostrophe Implant → 'isn't'.", explanation: "Contraction of 'is not' → 'isn't'." },
      { text: "it", original: "it", correct: "it?", errorType: "punctuation", hint: "This is a question! Scalpel → '?'.", explanation: "Questions end with a question mark." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },
  {
    id: 3,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "she dont like chocolate cake at all",
    words: [
      { text: "she", original: "she", correct: "She", errorType: "punctuation", hint: "Capitalize the first word. Scalpel → 'Aa Capitalise'.", explanation: "Always capitalize the first word of a sentence." },
      { text: "dont", original: "dont", correct: "doesn't", errorType: "apostrophe", hint: "'she' is singular — it needs 'doesn't'. Use the Apostrophe Implant → 'doesn't'.", explanation: "'She' requires 'doesn't' (does not)." },
      { text: "like", original: "like", correct: "like", errorType: null },
      { text: "chocolate", original: "chocolate", correct: "chocolate", errorType: null },
      { text: "cake", original: "cake", correct: "cake", errorType: null },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "all", original: "all", correct: "all.", errorType: "punctuation", hint: "End with a full stop. Scalpel → '.'.", explanation: "Sentences end with punctuation." }
    ],
    characterWound: "cracked_ribcage",
    theme: "General Surgery"
  },
  {
    id: 4,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "the dog barked at the mailmans bag",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Capital 'T' at the start. Scalpel → 'Aa Capitalise'.", explanation: "Capitalize the first word." },
      { text: "dog", original: "dog", correct: "dog", errorType: null },
      { text: "barked", original: "barked", correct: "barked", errorType: null },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "mailmans", original: "mailmans", correct: "mailman's", errorType: "apostrophe", hint: "The bag belongs to the mailman. Apostrophe Implant → 'mailman's'.", explanation: "Possessive apostrophe for singular owner → 'mailman's'." },
      { text: "bag", original: "bag", correct: "bag.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Declarative sentence ends with a period." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },
  {
    id: 5,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "wow that is a very tall building",
    words: [
      { text: "wow", original: "wow", correct: "Wow!", errorType: "punctuation", hint: "Capitalize and add '!'. Scalpel → 'Aa Capitalise' then '!'.", explanation: "Exclamations need a capital letter and exclamation mark." },
      { text: "that", original: "that", correct: "That", errorType: "punctuation", hint: "New sentence after '!'. Capitalize 'that'. Scalpel → 'Aa Capitalise'.", explanation: "Start a new sentence with a capital letter." },
      { text: "is", original: "is", correct: "is", errorType: null },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "very", original: "very", correct: "very", errorType: null },
      { text: "tall", original: "tall", correct: "tall", errorType: null },
      { text: "building", original: "building", correct: "building.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Every sentence needs ending punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "General Surgery"
  },
  {
    id: 6,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "where is the doctors office located",
    words: [
      { text: "where", original: "where", correct: "Where", errorType: "punctuation", hint: "Capitalize the first word. Scalpel → 'Aa Capitalise'.", explanation: "Capitalize the first word of a sentence." },
      { text: "is", original: "is", correct: "is", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "doctors", original: "doctors", correct: "doctor's", errorType: "apostrophe", hint: "The office belongs to the doctor. Apostrophe Implant → 'doctor's'.", explanation: "Possessive apostrophe → 'doctor's'." },
      { text: "office", original: "office", correct: "office", errorType: null },
      { text: "located", original: "located", correct: "located?", errorType: "punctuation", hint: "This is a question. Scalpel → '?'.", explanation: "Questions end with a question mark." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },

  // ================= LEVEL 2: Year 4/5 (ages 8–10) =================
  {
    id: 7,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "Yesterday I goes to the park with my friend",
    words: [
      { text: "Yesterday", original: "Yesterday", correct: "Yesterday,", errorType: "punctuation", hint: "Add a comma after introductory 'Yesterday'. Scalpel → ','.", explanation: "Use a comma after an introductory time phrase." },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "goes", original: "goes", correct: "went", errorType: "tense", hint: "Past time word 'Yesterday' needs past tense. Injector → 'went'.", explanation: "Use past tense ('went') for past events." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "park", original: "park", correct: "park", errorType: null },
      { text: "with", original: "with", correct: "with", errorType: null },
      { text: "my", original: "my", correct: "my", errorType: null },
      { text: "friend", original: "friend", correct: "friend.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Sentences end with a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Time Travel Lab"
  },
  {
    id: 8,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "Running fast was the dog down the street",
    words: [
      { text: "Running", original: "Running", correct: "The", errorType: "wordorder", hint: "Drag 'Running' and put 'The' at the start. Use Forceps to reorder.", explanation: "Subject-Verb-Object is the standard English word order." },
      { text: "fast", original: "fast", correct: "dog", errorType: "wordorder", hint: "Reorder: The dog was running...", explanation: "Rearrange to make the active subject clear." },
      { text: "was", original: "was", correct: "was", errorType: null },
      { text: "the", original: "the", correct: "running", errorType: "wordorder", hint: "Move 'running' next to 'was'.", explanation: "Keep auxiliary verbs next to their participle." },
      { text: "dog", original: "dog", correct: "fast", errorType: "wordorder", hint: "Move 'fast' to describe how the dog ran.", explanation: "Place adverbs close to the verb they modify." },
      { text: "down", original: "down", correct: "down", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "street", original: "street", correct: "street.", errorType: "punctuation", hint: "Add a period at the end. Scalpel → '.'.", explanation: "Add ending punctuation." }
    ],
    correctOrder: [3, 4, 2, 0, 1, 5, 6, 7],
    characterWound: "limbs_scrambled",
    theme: "Time Travel Lab"
  },
  {
    id: 9,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "They was playing football in the rain",
    words: [
      { text: "They", original: "They", correct: "They", errorType: null },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "'They' is plural. Clamp 'They'+'was' → choose 'were'.", explanation: "Plural subjects ('They') take plural verbs ('were')." },
      { text: "playing", original: "playing", correct: "playing", errorType: null },
      { text: "football", original: "football", correct: "football", errorType: null },
      { text: "in", original: "in", correct: "in", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "rain", original: "rain", correct: "rain.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Time Travel Lab"
  },
  {
    id: 10,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "Tomorrow we visited the science museum",
    words: [
      { text: "Tomorrow", original: "Tomorrow", correct: "Tomorrow", errorType: null },
      { text: "we", original: "we", correct: "we", errorType: null },
      { text: "visited", original: "visited", correct: "will visit", errorType: "tense", hint: "'Tomorrow' is in the future. Injector → 'will visit'.", explanation: "Use future tense ('will visit') for upcoming events." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "science", original: "science", correct: "science", errorType: null },
      { text: "museum", original: "museum", correct: "museum.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Time Travel Lab"
  },
  {
    id: 11,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "Delicious cooked my mother a giant pizza",
    words: [
      { text: "Delicious", original: "Delicious", correct: "My", errorType: "wordorder", hint: "Start with the subject 'My mother'. Use Forceps to drag words.", explanation: "Subject goes before verb in standard declarative sentences." },
      { text: "cooked", original: "cooked", correct: "mother", errorType: "wordorder", hint: "Move 'mother' right after 'My'.", explanation: "Noun phrases group qualifiers together." },
      { text: "my", original: "my", correct: "cooked", errorType: "wordorder", hint: "'My mother cooked...'", explanation: "Verb follows the subject." },
      { text: "mother", original: "mother", correct: "a", errorType: "wordorder", hint: "Article 'a' goes next.", explanation: "Articles go before their nouns." },
      { text: "a", original: "a", correct: "delicious", errorType: "wordorder", hint: "Adjective 'delicious' describes the pizza.", explanation: "Adjectives go before the nouns they describe." },
      { text: "giant", original: "giant", correct: "giant", errorType: null },
      { text: "pizza", original: "pizza", correct: "pizza.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End sentences with a period." }
    ],
    correctOrder: [2, 3, 1, 4, 0, 5, 6],
    characterWound: "limbs_scrambled",
    theme: "Time Travel Lab"
  },
  {
    id: 12,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "She has wrote three letters already",
    words: [
      { text: "She", original: "She", correct: "She", errorType: null },
      { text: "has", original: "has", correct: "has", errorType: null },
      { text: "wrote", original: "wrote", correct: "written", errorType: "tense", hint: "After 'has', use the past participle. Injector → 'written'.", explanation: "Use past participle ('written') after auxiliary 'has'." },
      { text: "three", original: "three", correct: "three", errorType: null },
      { text: "letters", original: "letters", correct: "letters", errorType: null },
      { text: "already", original: "already", correct: "already.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Time Travel Lab"
  },

  // ================= LEVEL 3: Year 5/6 (ages 9–11) =================
  {
    id: 13,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "The team of players were arguing about their scores",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "team", original: "team", correct: "team", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "players", original: "players", correct: "players", errorType: null },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "The subject 'team' is singular. Clamp 'team'+'were' → choose 'was'.", explanation: "Collective nouns like 'team' are singular subjects." },
      { text: "arguing", original: "arguing", correct: "arguing", errorType: null },
      { text: "about", original: "about", correct: "about", errorType: null },
      { text: "their", original: "their", correct: "their", errorType: null },
      { text: "scores", original: "scores", correct: "scores.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Apply ending punctuation." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Deep Space Station"
  },
  {
    id: 14,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "Neither the teacher nor the students was ready",
    words: [
      { text: "Neither", original: "Neither", correct: "Neither", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "teacher", original: "teacher", correct: "teacher", errorType: null },
      { text: "nor", original: "nor", correct: "nor", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "students", original: "students", correct: "students", errorType: null },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "With 'neither/nor', verb matches the closest subject ('students', plural). Clamp → 'were'.", explanation: "Verb agrees with the closest subject in 'neither/nor'." },
      { text: "ready", original: "ready", correct: "ready.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Standard sentences end with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Deep Space Station"
  },
  {
    id: 15,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "He runned to school because he were late",
    words: [
      { text: "He", original: "He", correct: "He", errorType: null },
      { text: "runned", original: "runned", correct: "ran", errorType: "tense", hint: "'Runned' is not a word. Injector → 'ran'.", explanation: "Past tense of irregular verb 'run' is 'ran'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "school", original: "school", correct: "school", errorType: null },
      { text: "because", original: "because", correct: "because", errorType: null },
      { text: "he", original: "he", correct: "he", errorType: null },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "'He' is singular. Clamp 'he'+'were' → choose 'was'.", explanation: "Singular pronouns ('he') take singular verbs ('was')." },
      { text: "late", original: "late", correct: "late.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Use a full stop at the end." }
    ],
    characterWound: "glitching_chest",
    theme: "Deep Space Station"
  },
  {
    id: 16,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "its crucial that we pack maps compasses and water",
    words: [
      { text: "its", original: "its", correct: "It's", errorType: "apostrophe", hint: "'its' = 'it is'. Apostrophe Implant → 'It's'.", explanation: "'It's' is the contraction of 'it is'." },
      { text: "crucial", original: "crucial", correct: "crucial", errorType: null },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "we", original: "we", correct: "we", errorType: null },
      { text: "pack", original: "pack", correct: "pack", errorType: null },
      { text: "maps", original: "maps", correct: "maps,", errorType: "punctuation", hint: "List! Add comma after 'maps'. Scalpel → ','.", explanation: "Separate items in a list with commas." },
      { text: "compasses", original: "compasses", correct: "compasses,", errorType: "punctuation", hint: "Add comma after 'compasses'. Scalpel → ','.", explanation: "Use commas to separate listed nouns." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "water", original: "water", correct: "water.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Always close a sentence with proper ending punctuation." }
    ],
    characterWound: "gap_arm",
    theme: "Deep Space Station"
  },
  {
    id: 17,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "Alisons library books is overdue since last monday",
    words: [
      { text: "Alisons", original: "Alisons", correct: "Alison's", errorType: "apostrophe", hint: "Books belong to Alison. Apostrophe Implant → 'Alison's'.", explanation: "Possessive apostrophe for an owner's name." },
      { text: "library", original: "library", correct: "library", errorType: null },
      { text: "books", original: "books", correct: "books", errorType: null },
      { text: "is", original: "is", correct: "are", errorType: "agreement", hint: "'Books' is plural. Clamp 'books'+'is' → choose 'are'.", explanation: "Plural subjects ('books') require plural verbs ('are')." },
      { text: "overdue", original: "overdue", correct: "overdue", errorType: null },
      { text: "since", original: "since", correct: "since", errorType: null },
      { text: "last", original: "last", correct: "last", errorType: null },
      { text: "monday", original: "monday", correct: "Monday.", errorType: "punctuation", hint: "'Monday' is a proper noun — capitalize it and add a period. Scalpel → 'Aa Capitalise' then '.'.", explanation: "Proper nouns must be capitalized; sentences end with punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "Deep Space Station"
  },
  {
    id: 18,
    level: 3,
    difficulty: "Level 3: Year 5/6 (Ages 9-11)",
    originalText: "I will gone to the cinema if I finish my work",
    words: [
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "will", original: "will", correct: "will", errorType: null },
      { text: "gone", original: "gone", correct: "go", errorType: "tense", hint: "After modal 'will', use the base verb. Injector → 'go'.", explanation: "Use the base form verb ('go') after modal auxiliary 'will'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "cinema", original: "cinema", correct: "cinema", errorType: null },
      { text: "if", original: "if", correct: "if", errorType: null },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "finish", original: "finish", correct: "finish", errorType: null },
      { text: "my", original: "my", correct: "my", errorType: null },
      { text: "work", original: "work", correct: "work.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Deep Space Station"
  },

  // ================= LEVEL 4: Year 7/8 (ages 11–13) =================
  {
    id: 19,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "Each of the boys have finished their homework early",
    words: [
      { text: "Each", original: "Each", correct: "Each", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "boys", original: "boys", correct: "boys", errorType: null },
      { text: "have", original: "have", correct: "has", errorType: "agreement", hint: "The subject 'Each' is singular. Clamp 'Each'+'have' → choose 'has'.", explanation: "'Each' is singular → requires 'has'." },
      { text: "finished", original: "finished", correct: "finished", errorType: null },
      { text: "their", original: "their", correct: "their", errorType: null },
      { text: "homework", original: "homework", correct: "homework", errorType: null },
      { text: "early", original: "early", correct: "early.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },
  {
    id: 20,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "The data what was collected show interesting results",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "data", original: "data", correct: "data", errorType: null },
      { text: "what", original: "what", correct: "that", errorType: "punctuation", hint: "Use relative pronoun 'that' for objects, not 'what'. Scalpel → type 'that' or use word replace.", explanation: "Use 'that' or 'which' for relative clauses referring to non-human subjects." },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "'Data' is plural. Clamp 'data'+'was' → choose 'were'.", explanation: "'Data' is plural → takes plural verb 'were'." },
      { text: "collected", original: "collected", correct: "collected", errorType: null },
      { text: "show", original: "show", correct: "show", errorType: null },
      { text: "interesting", original: "interesting", correct: "interesting", errorType: null },
      { text: "results", original: "results", correct: "results.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End sentences with a period." }
    ],
    characterWound: "shoulder_gash",
    theme: "Underwater Oasis"
  },
  {
    id: 21,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "Between you and I the answer are obvious",
    words: [
      { text: "Between", original: "Between", correct: "Between", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "I", original: "I", correct: "me,", errorType: "punctuation", hint: "After the preposition 'between', use object pronoun 'me' and add a comma. Scalpel → type 'me,'.", explanation: "Object pronouns follow prepositions. Set off intro phrase with comma." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "answer", original: "answer", correct: "answer", errorType: null },
      { text: "are", original: "are", correct: "is", errorType: "agreement", hint: "'Answer' is singular. Clamp 'answer'+'are' → choose 'is'.", explanation: "Singular subject ('answer') agrees with singular verb ('is')." },
      { text: "obvious", original: "obvious", correct: "obvious.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },
  {
    id: 22,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "Having eaten dinner I washed the dishes",
    words: [
      { text: "Having", original: "Having", correct: "Having", errorType: null },
      { text: "eaten", original: "eaten", correct: "eaten", errorType: null },
      { text: "dinner,", original: "dinner,", correct: "dinner,", errorType: null },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "washed", original: "washed", correct: "washed", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "dishes", original: "dishes", correct: "dishes", errorType: null },
      { text: "quickly", original: "quickly", correct: "quickly.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Sentences need ending punctuation." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Underwater Oasis"
  },
  {
    id: 23,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "The student which wrote the essay got an A",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "student", original: "student", correct: "student", errorType: null },
      { text: "which", original: "which", correct: "who", errorType: "punctuation", hint: "Use 'who' for people in relative clauses, not 'which'. Scalpel → word replace 'who'.", explanation: "Use 'who' for people in relative clauses." },
      { text: "wrote", original: "wrote", correct: "wrote", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "essay", original: "essay", correct: "essay", errorType: null },
      { text: "got", original: "got", correct: "got", errorType: null },
      { text: "an", original: "an", correct: "an", errorType: null },
      { text: "A", original: "A", correct: "A.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Use ending punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "Underwater Oasis"
  },
  {
    id: 24,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "I would of helped you if you had asked",
    words: [
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "would", original: "would", correct: "would", errorType: null },
      { text: "of", original: "of", correct: "have", errorType: "tense", hint: "'Would of' is wrong. Correct form is 'would have'. Injector → 'have'.", explanation: "Use auxiliary 'have' not preposition 'of' with modals." },
      { text: "helped", original: "helped", correct: "helped", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "if", original: "if", correct: "if", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "had", original: "had", correct: "had", errorType: null },
      { text: "asked", original: "asked", correct: "asked.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Underwater Oasis"
  },

  // ================= LEVEL 5: Surgeon General Challenge =================
  {
    id: 25,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "yesterday me and my friend goes to a museum and we seen a dinosaur who were very old",
    words: [
      { text: "yesterday", original: "yesterday", correct: "Yesterday,", errorType: "punctuation", hint: "Capitalize 'yesterday' and add a comma after it. Scalpel → 'Aa Capitalise' then ','.", explanation: "Capitalize the first word and add comma after introductory phrase." },
      { text: "me", original: "me", correct: "my", errorType: "wordorder", hint: "Use 'my friend and I' — not 'me and my friend'. Use Forceps to reorder.", explanation: "Place others before yourself and use subject pronoun 'I'." },
      { text: "and", original: "and", correct: "friend", errorType: "wordorder", hint: "Drag to form 'my friend and I'.", explanation: "Rearrange compound subjects." },
      { text: "my", original: "my", correct: "and", errorType: "wordorder", hint: "Reorder to: 'my friend and I'.", explanation: "Keep conjunction 'and' between the two subjects." },
      { text: "friend", original: "friend", correct: "I", errorType: "wordorder", hint: "Use subject pronoun 'I' at the end.", explanation: "Use 'I' as subject pronoun." },
      { text: "goes", original: "goes", correct: "went", errorType: "tense", hint: "Past event needs past tense. Injector → 'went'.", explanation: "Use past tense 'went' for past events." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "museum", original: "museum", correct: "museum,", errorType: "punctuation", hint: "Add comma before 'and' joining two independent clauses. Scalpel → ','.", explanation: "Use comma before coordinating conjunction between clauses." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "we", original: "we", correct: "we", errorType: null },
      { text: "seen", original: "seen", correct: "saw", errorType: "tense", hint: "'Seen' needs an auxiliary. Use simple past 'saw'. Injector → 'saw'.", explanation: "Use simple past 'saw' without auxiliary." },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "dinosaur", original: "dinosaur", correct: "dinosaur", errorType: null },
      { text: "who", original: "who", correct: "that", errorType: "punctuation", hint: "Use 'that' for non-human things. Scalpel → word replace 'that'.", explanation: "Use 'that' or 'which' for non-human relative clauses." },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "'Dinosaur' is singular. Clamp 'dinosaur'+'were' → choose 'was'.", explanation: "Singular noun requires singular verb 'was'." },
      { text: "very", original: "very", correct: "very", errorType: null },
      { text: "old", original: "old", correct: "old.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "All sentences end with proper punctuation." }
    ],
    correctOrder: [0, 3, 2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 26,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "if i was you I would have went to the doctors immediately",
    words: [
      { text: "if", original: "if", correct: "If", errorType: "punctuation", hint: "Capitalize the first letter. Scalpel → 'Aa Capitalise'.", explanation: "Start a sentence with a capital letter." },
      { text: "i", original: "i", correct: "I", errorType: "punctuation", hint: "The pronoun 'I' is always capitalized. Scalpel → 'Aa Capitalise'.", explanation: "Always capitalize the personal pronoun 'I'." },
      { text: "was", original: "was", correct: "were", errorType: "tense", hint: "Hypothetical 'If I were you' — subjunctive mood. Injector → 'were'.", explanation: "Use subjunctive 'were' in hypothetical statements." },
      { text: "you", original: "you", correct: "you,", errorType: "punctuation", hint: "Add comma after the introductory conditional clause. Scalpel → ','.", explanation: "Set off introductory dependent clause with a comma." },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "would", original: "would", correct: "would", errorType: null },
      { text: "have", original: "have", correct: "have", errorType: null },
      { text: "went", original: "went", correct: "gone", errorType: "tense", hint: "After 'would have', use past participle. Injector → 'gone'.", explanation: "Use past participle ('gone') in conditional perfect constructions." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "doctors", original: "doctors", correct: "doctor's", errorType: "apostrophe", hint: "Possession: the office/place belongs to the doctor. Apostrophe Implant → 'doctor's'.", explanation: "Possessive apostrophe → 'doctor's'." },
      { text: "immediately", original: "immediately", correct: "immediately.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Robo-Clinic"
  },
  {
    id: 27,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "the dog wagged its tail when its owner comes home",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Capitalize the first word. Scalpel → 'Aa Capitalise'.", explanation: "Sentences begin with a capital letter." },
      { text: "dog", original: "dog", correct: "dog", errorType: null },
      { text: "wagged", original: "wagged", correct: "wagged", errorType: null },
      { text: "its", original: "its", correct: "its", errorType: null },
      { text: "tail", original: "tail", correct: "tail", errorType: null },
      { text: "when", original: "when", correct: "when", errorType: null },
      { text: "its", original: "its", correct: "its", errorType: null },
      { text: "owner", original: "owner", correct: "owner", errorType: null },
      { text: "comes", original: "comes", correct: "came", errorType: "tense", hint: "Main verb 'wagged' is past. Keep tense consistent. Injector → 'came'.", explanation: "Keep verb tenses consistent." },
      { text: "home", original: "home", correct: "home.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "shoulder_gash",
    theme: "Robo-Clinic"
  },
  {
    id: 28,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "every one of the students need to bring their own pen",
    words: [
      { text: "every", original: "every", correct: "Every", errorType: "punctuation", hint: "Capitalize 'Every'. Scalpel → 'Aa Capitalise'.", explanation: "Capitalize the first word of a sentence." },
      { text: "one", original: "one", correct: "one", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "students", original: "students", correct: "students", errorType: null },
      { text: "need", original: "need", correct: "needs", errorType: "agreement", hint: "Subject 'every one' is singular. Clamp 'one'+'need' → choose 'needs'.", explanation: "'Every one' is singular → requires 'needs'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "bring", original: "bring", correct: "bring", errorType: null },
      { text: "their", original: "their", correct: "their", errorType: null },
      { text: "own", original: "own", correct: "own", errorType: null },
      { text: "pen", original: "pen", correct: "pen.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Robo-Clinic"
  },
  {
    id: 29,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "I has not never seen a dinosaur fossil before",
    words: [
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "has", original: "has", correct: "have", errorType: "agreement", hint: "'I' takes 'have' not 'has'. Clamp 'I'+'has' → choose 'have'.", explanation: "First-person pronoun 'I' takes 'have'." },
      { text: "not", original: "not", correct: "not", errorType: null },
      { text: "never", original: "never", correct: "ever", errorType: "agreement", hint: "Double negative! 'not never' is wrong. Clamp 'not'+'never' → choose 'ever'.", explanation: "Avoid double negatives: 'not ever' not 'not never'." },
      { text: "seen", original: "seen", correct: "seen", errorType: null },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "dinosaur", original: "dinosaur", correct: "dinosaur", errorType: null },
      { text: "fossil", original: "fossil", correct: "fossil", errorType: null },
      { text: "before", original: "before", correct: "before.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "Use ending punctuation." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Robo-Clinic"
  },
  {
    id: 30,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "She dont know nothing about the science project",
    words: [
      { text: "She", original: "She", correct: "She", errorType: null },
      { text: "dont", original: "dont", correct: "doesn't", errorType: "apostrophe", hint: "'She' needs 'doesn't'. Apostrophe Implant → 'doesn't'.", explanation: "'She' requires singular 'doesn't' (does not)." },
      { text: "know", original: "know", correct: "know", errorType: null },
      { text: "nothing", original: "nothing", correct: "anything", errorType: "agreement", hint: "Double negative with 'doesn't'! Change 'nothing' to 'anything'. Clamp → 'anything'.", explanation: "'Doesn't' + 'nothing' = double negative. Use 'anything'." },
      { text: "about", original: "about", correct: "about", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "science", original: "science", correct: "science", errorType: null },
      { text: "project", original: "project", correct: "project.", errorType: "punctuation", hint: "Full stop at the end. Scalpel → '.'.", explanation: "End with a period." }
    ],
    characterWound: "shoulder_gash",
    theme: "Robo-Clinic"
  },

  // ================= LEVEL 6: Advanced (Ages 13-15) =================
  {
    id: 31,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "The recipe calls for: flour sugar and eggs",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "recipe", original: "recipe", correct: "recipe", errorType: null },
      { text: "calls", original: "calls", correct: "calls", errorType: null },
      { text: "for:", original: "for:", correct: "for", errorType: "comma", hint: "Remove unnecessary colon after preposition. Comma Scissors → 'Remove Punctuation'.", explanation: "Do not place colons immediately after prepositions." },
      { text: "flour", original: "flour", correct: "flour,", errorType: "comma", hint: "Add comma to separate list items. Comma Scissors → 'Add Comma'.", explanation: "Use commas to separate items in a list." },
      { text: "sugar", original: "sugar", correct: "sugar,", errorType: "comma", hint: "Add Oxford comma before 'and'. Comma Scissors → 'Add Comma'.", explanation: "Add comma before coordinating conjunction in a list." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "eggs", original: "eggs", correct: "eggs.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "End with a period." }
    ],
    characterWound: "shoulder_gash",
    theme: "General Surgery"
  },
  {
    id: 32,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "I went to the store, I bought some milk",
    words: [
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "went", original: "went", correct: "went", errorType: null },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "store,", original: "store,", correct: "store;", errorType: "comma", hint: "Comma splice! Replace with semicolon. Comma Scissors → 'Replace with Semicolon'.", explanation: "Fix comma splices using a semicolon to link independent clauses." },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "bought", original: "bought", correct: "bought", errorType: null },
      { text: "some", original: "some", correct: "some", errorType: null },
      { text: "milk", original: "milk", correct: "milk.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Sentences need ending punctuation." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },
  {
    id: 33,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "She recieved the package on Wenesday",
    words: [
      { text: "She", original: "She", correct: "She", errorType: null },
      { text: "recieved", original: "recieved", correct: "received", errorType: "spelling", hint: "Spelling error: 'received'. Spell Scanner → 'received'.", explanation: "Spelling: 'received' (e before i except after c)." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "package", original: "package", correct: "package", errorType: null },
      { text: "on", original: "on", correct: "on", errorType: null },
      { text: "Wenesday", original: "Wenesday", correct: "Wednesday.", errorType: "spelling", hint: "Spelling error: Wednesday has a silent 'd'. Spell Scanner → 'Wednesday.'.", explanation: "Spelling: 'Wednesday'." }
    ],
    characterWound: "glitching_chest",
    theme: "General Surgery"
  },
  {
    id: 34,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "The childrens toys were scattered, everywhere around the room",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "childrens", original: "childrens", correct: "children's", errorType: "apostrophe", hint: "Implant possessive apostrophe. Apostrophe Implant → 'children's'.", explanation: "Possessive form of children is 'children's'." },
      { text: "toys", original: "toys", correct: "toys", errorType: null },
      { text: "were", original: "were", correct: "were", errorType: null },
      { text: "scattered,", original: "scattered,", correct: "scattered", errorType: "comma", hint: "Unnecessary comma between verb and adverb. Comma Scissors → 'Remove Comma'.", explanation: "Do not separate verb and adverbial modifier with a comma." },
      { text: "everywhere", original: "everywhere", correct: "everywhere", errorType: null },
      { text: "around", original: "around", correct: "around", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "room", original: "room", correct: "room.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "All sentences require ending punctuation." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },
  {
    id: 35,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "Its definately going to rain tommorrow",
    words: [
      { text: "Its", original: "Its", correct: "It's", errorType: "apostrophe", hint: "Contraction of 'It is' → 'It's'. Apostrophe Implant → 'It's'.", explanation: "Use apostrophe for contraction 'it is'." },
      { text: "definately", original: "definately", correct: "definitely", errorType: "spelling", hint: "Spelling error: 'definitely'. Spell Scanner → 'definitely'.", explanation: "Spelling: 'definitely' (has 'finite' inside)." },
      { text: "going", original: "going", correct: "going", errorType: null },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "rain", original: "rain", correct: "rain", errorType: null },
      { text: "tommorrow", original: "tommorrow", correct: "tomorrow.", errorType: "spelling", hint: "Spelling error: 'tomorrow'. Spell Scanner → 'tomorrow.'.", explanation: "Spelling: 'tomorrow' (one m, two r's)." }
    ],
    characterWound: "glitching_chest",
    theme: "General Surgery"
  },
  {
    id: 36,
    level: 6,
    difficulty: "Level 6: Advanced (Ages 13-15)",
    originalText: "Me and him went to the libary together",
    words: [
      { text: "Me", original: "Me", correct: "He", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'He'.", explanation: "Subject pronoun must be 'He'." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "him", original: "him", correct: "I", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'I'.", explanation: "Subject pronoun must be 'I' in the final position." },
      { text: "went", original: "went", correct: "went", errorType: null },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "libary", original: "libary", correct: "library", errorType: "spelling", hint: "Spelling error: 'library'. Spell Scanner → 'library'.", explanation: "Spelling: 'library'." },
      { text: "together", original: "together", correct: "together.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Sentences end with punctuation." }
    ],
    characterWound: "cracked_ribcage",
    theme: "General Surgery"
  },

  // ================= LEVEL 7: Expert (Ages 14-16) =================
  {
    id: 37,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "Between you and I, the committie made their decision",
    words: [
      { text: "Between", original: "Between", correct: "Between", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "I,", original: "I,", correct: "me,", errorType: "pronoun", hint: "Object pronoun after preposition 'between'. Pronoun Tweezers → 'me,'.", explanation: "Prepositions take object pronouns ('me' not 'I')." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "committie", original: "committie", correct: "committee", errorType: "spelling", hint: "Spelling error: 'committee'. Spell Scanner → 'committee'.", explanation: "Spelling: 'committee' (double m, double t, double e)." },
      { text: "made", original: "made", correct: "made", errorType: null },
      { text: "their", original: "their", correct: "its", errorType: "agreement", hint: "Collective noun 'committee' is singular here. Clamp 'committee'+'their' → choose 'its'.", explanation: "Collective nouns take singular pronouns ('its') when acting as one unit." },
      { text: "decision", original: "decision", correct: "decision.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "End with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },
  {
    id: 38,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "Everyone should bring their own supplies; however everyone forgets",
    words: [
      { text: "Everyone", original: "Everyone", correct: "Everyone", errorType: null },
      { text: "should", original: "should", correct: "should", errorType: null },
      { text: "bring", original: "bring", correct: "bring", errorType: null },
      { text: "their", original: "their", correct: "his or her", errorType: "pronoun", hint: "Singular subject 'everyone' needs singular pronoun. Pronoun Tweezers → 'his or her'.", explanation: "'Everyone' is singular and grammatically requires a singular pronoun." },
      { text: "own", original: "own", correct: "own", errorType: null },
      { text: "supplies;", original: "supplies;", correct: "supplies;", errorType: null },
      { text: "however", original: "however", correct: "however,", errorType: "comma", hint: "Add a comma after conjunctive adverb 'however'. Comma Scissors → 'Add Comma'.", explanation: "Conjunctive adverbs like 'however' are followed by a comma." },
      { text: "everyone", original: "everyone", correct: "everyone", errorType: null },
      { text: "forgets", original: "forgets", correct: "forgets.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Declarative sentences require ending punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "Underwater Oasis"
  },
  {
    id: 39,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "Him and me was talking about who's book it is",
    words: [
      { text: "Him", original: "Him", correct: "He", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'He'.", explanation: "Subject pronouns are required for compound subjects." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "me", original: "me", correct: "I", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'I'.", explanation: "Use 'I' in the subject position." },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "Plural compound subject ('He and I') takes plural verb. Clamp subject+verb → choose 'were'.", explanation: "Plural compound subjects take plural verbs ('were')." },
      { text: "talking", original: "talking", correct: "talking", errorType: null },
      { text: "about", original: "about", correct: "about", errorType: null },
      { text: "who's", original: "who's", correct: "whose", errorType: "apostrophe", hint: "Whose book (possession) not who's (who is). Apostrophe Implant → 'whose'.", explanation: "Use possessive pronoun 'whose' for ownership." },
      { text: "book", original: "book", correct: "book", errorType: null },
      { text: "it", original: "it", correct: "it", errorType: null },
      { text: "is", original: "is", correct: "is.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },
  {
    id: 40,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "The goverment announced that its responsability to protect the enviroment",
    words: [
      { text: "The", original: "The", correct: "The", errorType: null },
      { text: "goverment", original: "goverment", correct: "government", errorType: "spelling", hint: "Spelling error: 'government' has a silent 'n'. Spell Scanner → 'government'.", explanation: "Spelling: 'government' (govern + ment)." },
      { text: "announced", original: "announced", correct: "announced", errorType: null },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "its", original: "its", correct: "it's", errorType: "apostrophe", hint: "it is = it's. Apostrophe Implant → 'it's'.", explanation: "Use apostrophe for contraction 'it's'." },
      { text: "responsability", original: "responsability", correct: "responsibility", errorType: "spelling", hint: "Spelling error: 'responsibility'. Spell Scanner → 'responsibility'.", explanation: "Spelling: 'responsibility' (with 'i')." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "protect", original: "protect", correct: "protect", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "enviroment", original: "enviroment", correct: "environment.", errorType: "spelling", hint: "Spelling error: 'environment'. Spell Scanner → 'environment.'.", explanation: "Spelling: 'environment' (environ + ment)." }
    ],
    characterWound: "glitching_chest",
    theme: "Underwater Oasis"
  },
  {
    id: 41,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "She sung beautifuly at the rehersal yesterday",
    words: [
      { text: "She", original: "She", correct: "She", errorType: null },
      { text: "sung", original: "sung", correct: "sang", errorType: "tense", hint: "Simple past of sing is sang. Tense Injector → 'sang'.", explanation: "Use past tense 'sang' for completed actions." },
      { text: "beautifuly", original: "beautifuly", correct: "beautifully", errorType: "spelling", hint: "Spelling error: 'beautifully'. Spell Scanner → 'beautifully'.", explanation: "Spelling: 'beautifully' (beautiful + ly)." },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "rehersal", original: "rehersal", correct: "rehearsal", errorType: "spelling", hint: "Spelling error: 'rehearsal'. Spell Scanner → 'rehearsal'.", explanation: "Spelling: 'rehearsal' (contains 'hear')." },
      { text: "yesterday", original: "yesterday", correct: "yesterday.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Sentences require ending punctuation." }
    ],
    characterWound: "shoulder_gash",
    theme: "Underwater Oasis"
  },
  {
    id: 42,
    level: 7,
    difficulty: "Level 7: Expert (Ages 14-16)",
    originalText: "Neither the principle nor the teachers was informed of the occurance",
    words: [
      { text: "Neither", original: "Neither", correct: "Neither", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "principle", original: "principle", correct: "principal", errorType: "spelling", hint: "School leader is 'principal', not 'principle'. Spell Scanner → 'principal'.", explanation: "Homophone: 'principal' is the head of a school." },
      { text: "nor", original: "nor", correct: "nor", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "teachers", original: "teachers", correct: "teachers", errorType: null },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "Verb agrees with the closer subject 'teachers' (plural). Clamp teachers+was → 'were'.", explanation: "In 'neither/nor', verb agrees with plural subject closer to it." },
      { text: "informed", original: "informed", correct: "informed", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "occurance", original: "occurance", correct: "occurrence.", errorType: "spelling", hint: "Spelling: 'occurrence'. Spell Scanner → 'occurrence.'.", explanation: "Spelling: 'occurrence' (double r, double c, ending in ence)." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },

  // ================= LEVEL 8: Surgeon General Ultimate =================
  {
    id: 43,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "the boy which dont never do his homework proper has went home",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Capitalize the first word. Scalpel → 'Aa Capitalise'.", explanation: "Sentences begin with capital letters." },
      { text: "boy", original: "boy", correct: "boy", errorType: null },
      { text: "which", original: "which", correct: "who", errorType: "pronoun", hint: "Use 'who' for people, not 'which'. Pronoun Tweezers → 'who'.", explanation: "Use relative pronoun 'who' for people." },
      { text: "dont", original: "dont", correct: "doesn't", errorType: "apostrophe", hint: "Singular subject 'boy' needs 'doesn't'. Apostrophe Implant → 'doesn't'.", explanation: "Subject agreements require third-person singular contraction 'doesn't'." },
      { text: "never", original: "never", correct: "ever", errorType: "agreement", hint: "Double negative: 'doesn't never'. Clamp doesn't+never → choose 'ever'.", explanation: "Avoid double negatives ('doesn't ever')." },
      { text: "do", original: "do", correct: "do", errorType: null },
      { text: "his", original: "his", correct: "his", errorType: null },
      { text: "homework", original: "homework", correct: "homework", errorType: null },
      { text: "proper", original: "proper", correct: "properly", errorType: "spelling", hint: "Adverb spelling: 'properly'. Spell Scanner → 'properly'.", explanation: "Spelling: 'properly' (adverb modifying 'do')." },
      { text: "has", original: "has", correct: "has", errorType: null },
      { text: "went", original: "went", correct: "gone", errorType: "tense", hint: "After 'has', use past participle 'gone'. Tense Injector → 'gone'.", explanation: "Use past participle 'gone' with auxiliary 'has'." },
      { text: "home", original: "home", correct: "home.", errorType: "punctuation", hint: "End with a period. Scalpel → '.'", explanation: "Sentences require ending punctuation." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 44,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "alot of people beleive that grammer dont matter in everyday speach",
    words: [
      { text: "alot", original: "alot", correct: "A lot", errorType: "spelling", hint: "Spelling error: 'a lot' is two words. Spell Scanner → 'A lot'.", explanation: "Spelling: 'a lot' is always written as two words." },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "people", original: "people", correct: "people", errorType: null },
      { text: "beleive", original: "beleive", correct: "believe", errorType: "spelling", hint: "Spelling error: 'believe'. Spell Scanner → 'believe'.", explanation: "Spelling: 'believe' (i before e)." },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "grammer", original: "grammer", correct: "grammar", errorType: "spelling", hint: "Spelling error: 'grammar' ends in ar. Spell Scanner → 'grammar'.", explanation: "Spelling: 'grammar'." },
      { text: "dont", original: "dont", correct: "doesn't", errorType: "apostrophe", hint: "Singular subject 'grammar' takes 'doesn't'. Apostrophe Implant → 'doesn't'.", explanation: "Third-person singular 'grammar' requires 'doesn't'." },
      { text: "matter", original: "matter", correct: "matter", errorType: null },
      { text: "in", original: "in", correct: "in", errorType: null },
      { text: "everyday", original: "everyday", correct: "everyday", errorType: null },
      { text: "speach", original: "speach", correct: "speech.", errorType: "spelling", hint: "Spelling: 'speech'. Spell Scanner → 'speech.'.", explanation: "Spelling: 'speech'." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 45,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "her and me seen a wierd looking animal who were running threw the forrest",
    words: [
      { text: "her", original: "her", correct: "She", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'She'.", explanation: "Use subject pronoun 'She'." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "me", original: "me", correct: "I", errorType: "pronoun", hint: "Subject pronoun error. Pronoun Tweezers → 'I'.", explanation: "Use subject pronoun 'I'." },
      { text: "seen", original: "seen", correct: "saw", errorType: "tense", hint: "Use past tense 'saw' instead of participle 'seen'. Tense Injector → 'saw'.", explanation: "Use simple past 'saw'." },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "wierd", original: "wierd", correct: "weird", errorType: "spelling", hint: "Spelling error: 'weird' is an exception. Spell Scanner → 'weird'.", explanation: "Spelling: 'weird' (e before i, exception to the rule)." },
      { text: "looking", original: "looking", correct: "looking", errorType: null },
      { text: "animal", original: "animal", correct: "animal", errorType: null },
      { text: "who", original: "who", correct: "that", errorType: "pronoun", hint: "Use relative pronoun 'that' or 'which' for animals. Pronoun Tweezers → 'that'.", explanation: "Use 'that' or 'which' for non-human subjects." },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "Singular subject 'animal' takes 'was'. Clamp animal+were → 'was'.", explanation: "Singular animal requires singular verb 'was'." },
      { text: "running", original: "running", correct: "running", errorType: null },
      { text: "threw", original: "threw", correct: "through", errorType: "spelling", hint: "Homophone error: 'through' not 'threw'. Spell Scanner → 'through'.", explanation: "Homophone: 'through' denotes movement, 'threw' is past tense of throw." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "forrest", original: "forrest", correct: "forest.", errorType: "spelling", hint: "Spelling error: 'forest' has one r. Spell Scanner → 'forest.'.", explanation: "Spelling: 'forest'." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 46,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "acording to the proffessor the experiment which he has ran succesfully prooves his hypothesus",
    words: [
      { text: "acording", original: "acording", correct: "According", errorType: "spelling", hint: "Spelling error: 'according'. Spell Scanner → 'According'.", explanation: "Spelling: 'According'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "proffessor", original: "proffessor", correct: "professor,", errorType: "spelling", hint: "Spelling: 'professor' (one f). Add a comma. Spell Scanner → 'professor,'.", explanation: "Spelling: 'professor'." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "experiment", original: "experiment", correct: "experiment,", errorType: "comma", hint: "Add a comma to separate parenthetical relative clause. Comma Scissors → 'Add Comma'.", explanation: "Add comma after relative clause." },
      { text: "which", original: "which", correct: "which", errorType: null },
      { text: "he", original: "he", correct: "he", errorType: null },
      { text: "has", original: "has", correct: "has", errorType: null },
      { text: "ran", original: "ran", correct: "run", errorType: "tense", hint: "Use past participle 'run' after 'has'. Tense Injector → 'run'.", explanation: "Past participle of run is 'run'." },
      { text: "succesfully", original: "succesfully", correct: "successfully,", errorType: "spelling", hint: "Spelling: 'successfully' (double c, double s, double l). Add comma. Spell Scanner → 'successfully,'.", explanation: "Spelling: 'successfully'." },
      { text: "prooves", original: "prooves", correct: "proves", errorType: "spelling", hint: "Spelling error: 'proves' (one o). Spell Scanner → 'proves'.", explanation: "Spelling: 'proves'." },
      { text: "his", original: "his", correct: "his", errorType: null },
      { text: "hypothesus", original: "hypothesus", correct: "hypothesis.", errorType: "spelling", hint: "Spelling error: 'hypothesis'. Spell Scanner → 'hypothesis.'.", explanation: "Spelling: 'hypothesis'." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 47,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "the comittee have reccomended that the goverment adress the enviromental crisis immediatly",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Capitalize the first word. Scalpel → 'Aa Capitalise'.", explanation: "Sentences begin with a capital letter." },
      { text: "comittee", original: "comittee", correct: "committee", errorType: "spelling", hint: "Spelling error: 'committee'. Spell Scanner → 'committee'.", explanation: "Spelling: 'committee'." },
      { text: "have", original: "have", correct: "has", errorType: "agreement", hint: "Singular collective noun 'committee' takes singular 'has'. Clamp committee+have → 'has'.", explanation: "Singular collective nouns take singular verbs ('has')." },
      { text: "reccomended", original: "reccomended", correct: "recommended", errorType: "spelling", hint: "Spelling: 'recommended' (one c, double m). Spell Scanner → 'recommended'.", explanation: "Spelling: 'recommended'." },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "goverment", original: "goverment", correct: "government", errorType: "spelling", hint: "Spelling: 'government' (silent n). Spell Scanner → 'government'.", explanation: "Spelling: 'government'." },
      { text: "adress", original: "adress", correct: "address", errorType: "spelling", hint: "Spelling: 'address' (double d). Spell Scanner → 'address'.", explanation: "Spelling: 'address'." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "enviromental", original: "enviromental", correct: "environmental", errorType: "spelling", hint: "Spelling: 'environmental' (silent n). Spell Scanner → 'environmental'.", explanation: "Spelling: 'environmental'." },
      { text: "crisis", original: "crisis", correct: "crisis", errorType: null },
      { text: "immediatly", original: "immediatly", correct: "immediately.", errorType: "spelling", hint: "Spelling: 'immediately' (retains e). Spell Scanner → 'immediately.'.", explanation: "Spelling: 'immediately'." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 48,
    level: 8,
    difficulty: "Level 8: Surgeon General (Ultimate)",
    originalText: "its unfortunate that neither him nor her were able to recieve there diplomas at the ceramony",
    words: [
      { text: "its", original: "its", correct: "It's", errorType: "apostrophe", hint: "It is = It's. Apostrophe Implant → 'It's'.", explanation: "Contraction 'it is' requires apostrophe → 'It's'." },
      { text: "unfortunate", original: "unfortunate", correct: "unfortunate", errorType: null },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "neither", original: "neither", correct: "neither", errorType: null },
      { text: "him", original: "him", correct: "he", errorType: "pronoun", hint: "Subject pronoun after 'neither'. Pronoun Tweezers → 'he'.", explanation: "Use subject pronoun 'he' in subject position." },
      { text: "nor", original: "nor", correct: "nor", errorType: null },
      { text: "her", original: "her", correct: "she", errorType: "pronoun", hint: "Subject pronoun after 'nor'. Pronoun Tweezers → 'she'.", explanation: "Use subject pronoun 'she' in subject position." },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "Singular closer subject 'she' requires singular verb. Clamp she+were → 'was'.", explanation: "Subject-verb agreement: singular closer subject requires singular 'was'." },
      { text: "able", original: "able", correct: "able", errorType: null },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "recieve", original: "recieve", correct: "receive", errorType: "spelling", hint: "Spelling error: 'receive'. Spell Scanner → 'receive'.", explanation: "Spelling: 'receive'." },
      { text: "there", original: "there", correct: "their", errorType: "pronoun", hint: "Possessive pronoun 'their' not place 'there'. Pronoun Tweezers → 'their'.", explanation: "Homophone: possessive 'their' denotes ownership." },
      { text: "diplomas", original: "diplomas", correct: "diplomas", errorType: null },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "ceramony", original: "ceramony", correct: "ceremony.", errorType: "spelling", hint: "Spelling: 'ceremony'. Spell Scanner → 'ceremony.'.", explanation: "Spelling: 'ceremony'." }
    ],
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  }
];

