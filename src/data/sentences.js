// C:\Users\thulp\.gemini\antigravity\scratch\sentence-surgeon\src\data\sentences.js

export const sentences = [
  // ================= LEVEL 1: Year 3/4 (ages 7–9) - Simple punctuation and apostrophes =================
  {
    id: 1,
    level: 1,
    difficulty: "Level 1: Year 3/4 (Ages 7-9)",
    originalText: "the cat sat on the mat and it were happy",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "A sentence always starts with a capital letter! Use the Punctuation Scalpel to fix 'the'.", explanation: "Sentences must start with a capital letter." },
      { text: "cat", original: "cat", correct: "cat", errorType: null },
      { text: "sat", original: "sat", correct: "sat", errorType: null },
      { text: "on", original: "on", correct: "on", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "mat", original: "mat", correct: "mat", errorType: null },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "it", original: "it", correct: "it", errorType: null },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "Look at the subject 'it'. Is it singular or plural? Use the Agreement Clamp or Tense Injector to match it with 'was'.", explanation: "Use 'was' for singular subjects like 'it'." },
      { text: "happy", original: "happy", correct: "happy.", errorType: "punctuation", hint: "Every complete sentence needs a full stop at the end. Use the Punctuation Scalpel on 'happy'.", explanation: "Sentences need ending punctuation like a full stop." }
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
      { text: "its", original: "its", correct: "It's", errorType: "apostrophe", hint: "This stands for 'It is'. It needs a capital 'I' and a contraction apostrophe. Use the Apostrophe Implant!", explanation: "Use an apostrophe for the contraction of 'it is' -> 'It's'." },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "lovely", original: "lovely", correct: "lovely", errorType: null },
      { text: "day", original: "day", correct: "day", errorType: null },
      { text: "today", original: "today", correct: "today,", errorType: "punctuation", hint: "Add a comma after 'today' to pause before the tag question. Use the Punctuation Scalpel.", explanation: "Use commas to separate clauses or tag questions." },
      { text: "isnt", original: "isnt", correct: "isn't", errorType: "apostrophe", hint: "This stands for 'is not'. Use the Apostrophe Implant to insert an apostrophe between 'n' and 't'.", explanation: "Use an apostrophe for the contraction of 'is not' -> 'isn't'." },
      { text: "it", original: "it", correct: "it?", errorType: "punctuation", hint: "This is a question! Grab the Punctuation Scalpel and add a question mark at the end.", explanation: "Questions must end with a question mark." }
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
      { text: "she", original: "she", correct: "She", errorType: "punctuation", hint: "Capitalize the first word of the sentence using the Punctuation Scalpel.", explanation: "Always capitalize the first word of a sentence." },
      { text: "dont", original: "dont", correct: "doesn't", errorType: "agreement", hint: "'She' is singular, so it needs 'doesn't' instead of 'dont'. Clamp them together or inject the verb!", explanation: "'She' requires the singular verb form 'doesn't' (does not)." },
      { text: "like", original: "like", correct: "like", errorType: null },
      { text: "chocolate", original: "chocolate", correct: "chocolate", errorType: null },
      { text: "cake", original: "cake", correct: "cake", errorType: null },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "all", original: "all", correct: "all.", errorType: "punctuation", hint: "We need a full stop at the end. Use the Punctuation Scalpel.", explanation: "Sentences end with a punctuation mark, like a period." }
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
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Make sure 'the' starts with a capital T.", explanation: "Capitalize the first word." },
      { text: "dog", original: "dog", correct: "dog", errorType: null },
      { text: "barked", original: "barked", correct: "barked", errorType: null },
      { text: "at", original: "at", correct: "at", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "mailmans", original: "mailmans", correct: "mailman's", errorType: "apostrophe", hint: "The bag belongs to the mailman! Use the Apostrophe Implant to show possession.", explanation: "Use possessive apostrophe for singular owner -> 'mailman's'." },
      { text: "bag", original: "bag", correct: "bag.", errorType: "punctuation", hint: "Finish the sentence with a full stop using the Punctuation Scalpel.", explanation: "A declarative sentence ends with a period." }
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
      { text: "wow", original: "wow", correct: "Wow!", errorType: "punctuation", hint: "This is an exclamation of surprise! Capitalize it and add an exclamation mark.", explanation: "Exclamations of strong emotion end with an exclamation mark." },
      { text: "that", original: "that", correct: "That", errorType: "punctuation", hint: "The previous word ended with an exclamation mark, so this starts a new sentence. Capitalize it!", explanation: "Start a new sentence with a capital letter." },
      { text: "is", original: "is", correct: "is", errorType: null },
      { text: "a", original: "a", correct: "a", errorType: null },
      { text: "very", original: "very", correct: "very", errorType: null },
      { text: "tall", original: "tall", correct: "tall", errorType: null },
      { text: "building", original: "building", correct: "building.", errorType: "punctuation", hint: "Place a period at the end of the sentence with the Punctuation Scalpel.", explanation: "Every sentence must have ending punctuation." }
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
      { text: "where", original: "where", correct: "Where", errorType: "punctuation", hint: "Capitalize the first word of the question.", explanation: "Capitalize the first word of a sentence." },
      { text: "is", original: "is", correct: "is", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "doctors", original: "doctors", correct: "doctor's", errorType: "apostrophe", hint: "The office belongs to the doctor. Use the Apostrophe Implant.", explanation: "Use a possessive apostrophe for singular owner -> 'doctor's'." },
      { text: "office", original: "office", correct: "office", errorType: null },
      { text: "located", original: "located", correct: "located?", errorType: "punctuation", hint: "This is an inquiry. Add a question mark at the end.", explanation: "Questions end with a question mark." }
    ],
    characterWound: "gap_arm",
    theme: "General Surgery"
  },

  // ================= LEVEL 2: Year 4/5 (ages 8–10) - Tense errors and word order =================
  {
    id: 7,
    level: 2,
    difficulty: "Level 2: Year 4/5 (Ages 8-10)",
    originalText: "Yesterday I goes to the park with my friend",
    words: [
      { text: "Yesterday", original: "Yesterday", correct: "Yesterday,", errorType: "punctuation", hint: "Add a comma after introductory time phrases like 'Yesterday'.", explanation: "Use a comma after an introductory adverbial phrase." },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "goes", original: "goes", correct: "went", errorType: "tense", hint: "The action happened 'Yesterday' (past). Inject the correct past tense of 'go' into 'goes'.", explanation: "Use past tense ('went') for past events." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "park", original: "park", correct: "park", errorType: null },
      { text: "with", original: "with", correct: "with", errorType: null },
      { text: "my", original: "my", correct: "my", errorType: null },
      { text: "friend", original: "friend", correct: "friend.", errorType: "punctuation", hint: "Place a full stop at the very end of the sentence.", explanation: "Sentences end with a period." }
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
      { text: "Running", original: "Running", correct: "The", errorType: "wordorder", hint: "The word order is scrambled. Use the Forceps to put 'The' at the start.", explanation: "Subject-Verb-Object is the standard English word order." },
      { text: "fast", original: "fast", correct: "dog", errorType: "wordorder", hint: "Reorder: The dog was running...", explanation: "Rearrange to make the active subject clear." },
      { text: "was", original: "was", correct: "was", errorType: null },
      { text: "the", original: "the", correct: "running", errorType: "wordorder", hint: "Move 'running' next to 'was' to form 'was running'.", explanation: "Keep auxiliary verbs next to their participle." },
      { text: "dog", original: "dog", correct: "fast", errorType: "wordorder", hint: "Move 'fast' to describe how the dog was running.", explanation: "Place adverbs close to the verb they modify." },
      { text: "down", original: "down", correct: "down", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "street", original: "street", correct: "street.", errorType: "punctuation", hint: "Add a period at the end of 'street'.", explanation: "Add ending punctuation." }
    ],
    correctOrder: [3, 4, 2, 0, 1, 5, 6, 7], // "The dog was running fast down the street."
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
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "'They' is a plural subject. Use the Agreement Clamp or Injector to change 'was' to 'were'.", explanation: "Plural subjects ('They') take plural verbs ('were')." },
      { text: "playing", original: "playing", correct: "playing", errorType: null },
      { text: "football", original: "football", correct: "football", errorType: null },
      { text: "in", original: "in", correct: "in", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "rain", original: "rain", correct: "rain.", errorType: "punctuation", hint: "Use the Scalpel to place a full stop at the end.", explanation: "End with a period." }
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
      { text: "visited", original: "visited", correct: "will visit", errorType: "tense", hint: "'Tomorrow' indicates the future. Inject the future tense 'will visit' into 'visited'.", explanation: "Use future tense ('will visit') for upcoming events." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "science", original: "science", correct: "science", errorType: null },
      { text: "museum", original: "museum", correct: "museum.", errorType: "punctuation", hint: "Add a full stop at the end of the sentence.", explanation: "Declarative sentences require a period." }
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
      { text: "Delicious", original: "Delicious", correct: "My", errorType: "wordorder", hint: "Start the sentence with the subject 'My mother'.", explanation: "Subject goes before verb in standard declarative sentences." },
      { text: "cooked", original: "cooked", correct: "mother", errorType: "wordorder", hint: "Move 'mother' right after 'My'.", explanation: "Noun phrases group qualifiers together." },
      { text: "my", original: "my", correct: "cooked", errorType: "wordorder", hint: "Arrange: 'My mother cooked...'", explanation: "Verb follows the subject." },
      { text: "mother", original: "mother", correct: "a", errorType: "wordorder", hint: "Next is the article 'a'.", explanation: "Articles go before their nouns." },
      { text: "a", original: "a", correct: "delicious", errorType: "wordorder", hint: "Adjective 'delicious' should describe the pizza.", explanation: "Adjectives go before the nouns they describe." },
      { text: "giant", original: "giant", correct: "giant", errorType: null },
      { text: "pizza", original: "pizza", correct: "pizza.", errorType: "punctuation", hint: "Add a period at the end of 'pizza'.", explanation: "End sentences with a period." }
    ],
    correctOrder: [2, 3, 1, 4, 0, 5, 6], // "My mother cooked a delicious giant pizza."
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
      { text: "wrote", original: "wrote", correct: "written", errorType: "tense", hint: "After 'has', we use the past participle. Inject 'written' into 'wrote'.", explanation: "Use the past participle form ('written') after the auxiliary 'has'." },
      { text: "three", original: "three", correct: "three", errorType: null },
      { text: "letters", original: "letters", correct: "letters", errorType: null },
      { text: "already", original: "already", correct: "already.", errorType: "punctuation", hint: "Add a full stop at the end.", explanation: "End with a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Time Travel Lab"
  },

  // ================= LEVEL 3: Year 5/6 (ages 9–11) - Subject-verb agreement & complex punctuation =================
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
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "The subject is 'team' (singular), not 'players' (plural). Clamp 'team' and 'were' to find the singular verb 'was'.", explanation: "Collective nouns like 'team' are treated as singular subjects." },
      { text: "arguing", original: "arguing", correct: "arguing", errorType: null },
      { text: "about", original: "about", correct: "about", errorType: null },
      { text: "their", original: "their", correct: "their", errorType: null },
      { text: "scores", original: "scores", correct: "scores.", errorType: "punctuation", hint: "End the sentence with a period.", explanation: "Apply ending punctuation." }
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
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "With 'neither/nor', the verb matches the closer subject ('students', plural). Clamp them to change 'was' to 'were'.", explanation: "In 'neither/nor' sentences, the verb agrees with the closest subject noun." },
      { text: "ready", original: "ready", correct: "ready.", errorType: "punctuation", hint: "Make sure you cap it off with a full stop.", explanation: "Standard sentences end with a period." }
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
      { text: "runned", original: "runned", correct: "ran", errorType: "tense", hint: "'Runned' is not a word. Inject the correct irregular past tense 'ran' with the syringe.", explanation: "The past tense of the irregular verb 'run' is 'ran'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "school", original: "school", correct: "school", errorType: null },
      { text: "because", original: "because", correct: "because", errorType: null },
      { text: "he", original: "he", correct: "he", errorType: null },
      { text: "were", original: "were", correct: "was", errorType: "agreement", hint: "'He' is singular. Clamp or inject it to change 'were' to 'was'.", explanation: "Singular pronouns ('he') take singular verbs ('was')." },
      { text: "late", original: "late", correct: "late.", errorType: "punctuation", hint: "Seal the sentence with a period.", explanation: "Use a full stop at the end." }
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
      { text: "its", original: "its", correct: "It's", errorType: "apostrophe", hint: "Needs a capital I and a contraction apostrophe. Use the Apostrophe Implant.", explanation: "'It's' represents the contraction 'it is'." },
      { text: "crucial", original: "crucial", correct: "crucial", errorType: null },
      { text: "that", original: "that", correct: "that", errorType: null },
      { text: "we", original: "we", correct: "we", errorType: null },
      { text: "pack", original: "pack", correct: "pack", errorType: null },
      { text: "maps", original: "maps", correct: "maps,", errorType: "punctuation", hint: "This is a list! Add a comma after 'maps' with the Punctuation Scalpel.", explanation: "Separate items in a list with commas." },
      { text: "compasses", original: "compasses", correct: "compasses,", errorType: "punctuation", hint: "Add a comma after 'compasses' to separate the list items.", explanation: "Use commas to separate listed nouns." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "water", original: "water", correct: "water.", errorType: "punctuation", hint: "Close with a full stop.", explanation: "Always close a sentence with proper ending punctuation." }
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
      { text: "Alisons", original: "Alisons", correct: "Alison's", errorType: "apostrophe", hint: "The books belong to Alison! Implant an apostrophe before 's'.", explanation: "Use a possessive apostrophe for an owner's name." },
      { text: "library", original: "library", correct: "library", errorType: null },
      { text: "books", original: "books", correct: "books", errorType: null },
      { text: "is", original: "is", correct: "are", errorType: "agreement", hint: "The subject 'books' is plural. Clamp or inject 'is' to change it to 'are'.", explanation: "Plural subject nouns ('books') require plural verbs ('are')." },
      { text: "overdue", original: "overdue", correct: "overdue", errorType: null },
      { text: "since", original: "since", correct: "since", errorType: null },
      { text: "last", original: "last", correct: "last", errorType: null },
      { text: "monday", original: "monday", correct: "Monday.", errorType: "punctuation", hint: "'Monday' is a proper noun (day of the week). Capitalize and add a period.", explanation: "Proper nouns must be capitalized, and sentences must end with punctuation." }
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
      { text: "gone", original: "gone", correct: "go", errorType: "tense", hint: "After the helper verb 'will', use the base verb 'go'. Inject the correct form.", explanation: "Use the base form verb ('go') after modal auxiliary verbs like 'will'." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "cinema", original: "cinema", correct: "cinema", errorType: null },
      { text: "if", original: "if", correct: "if", errorType: null },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "finish", original: "finish", correct: "finish", errorType: null },
      { text: "my", original: "my", correct: "my", errorType: null },
      { text: "work", original: "work", correct: "work.", errorType: "punctuation", hint: "Put a period at the end.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Deep Space Station"
  },

  // ================= LEVEL 4: Year 7/8 (ages 11–13) - Mixed errors, more complex sentences =================
  {
    id: 19,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "Each of the boys have finished there homework early",
    words: [
      { text: "Each", original: "Each", correct: "Each", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "boys", original: "boys", correct: "boys", errorType: null },
      { text: "have", original: "have", correct: "has", errorType: "agreement", hint: "The subject is 'Each' (singular), not 'boys'. Clamp or inject 'have' -> 'has'.", explanation: "Pronouns like 'each' are singular and require a singular verb ('has')." },
      { text: "finished", original: "finished", correct: "finished", errorType: null },
      { text: "there", original: "there", correct: "their", errorType: "punctuation", hint: "This shows possession (belongs to them). Replace 'there' with 'their' using the Punctuation Scalpel.", explanation: "Use 'their' (possessive) instead of 'there' (place) or 'they're' (contraction)." },
      { text: "homework", original: "homework", correct: "homework", errorType: null },
      { text: "early", original: "early", correct: "early.", errorType: "punctuation", hint: "Add a full stop at the end.", explanation: "End with a period." }
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
      { text: "what", original: "what", correct: "that", errorType: "punctuation", hint: "Use the relative pronoun 'that' (or 'which') to describe objects, not 'what'. Use the Scalpel.", explanation: "Use 'that' or 'which' for relative clauses referring to non-human subjects." },
      { text: "was", original: "was", correct: "were", errorType: "agreement", hint: "In formal writing, 'data' is the plural of 'datum'. Change 'was' to 'were'.", explanation: "'Data' is plural and takes a plural verb ('were')." },
      { text: "collected", original: "collected", correct: "collected", errorType: null },
      { text: "show", original: "show", correct: "show", errorType: null },
      { text: "interesting", original: "interesting", correct: "interesting", errorType: null },
      { text: "results", original: "results", correct: "results.", errorType: "punctuation", hint: "Put a full stop at the end.", explanation: "End sentences with a period." }
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
      { text: "I", original: "I", correct: "me,", errorType: "punctuation", hint: "'Between' is a preposition, so it needs the object pronoun 'me' and a comma after the phrase.", explanation: "Use object pronouns ('me') after prepositions, and set off introductory phrases with a comma." },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "answer", original: "answer", correct: "answer", errorType: null },
      { text: "are", original: "are", correct: "is", errorType: "agreement", hint: "'Answer' is singular. Change 'are' to 'is'.", explanation: "Singular subject ('answer') agrees with singular verb ('is')." },
      { text: "obvious", original: "obvious", correct: "obvious.", errorType: "punctuation", hint: "Add a period at the end.", explanation: "End with a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Underwater Oasis"
  },
  {
    id: 22,
    level: 4,
    difficulty: "Level 4: Year 7/8 (Ages 11-13)",
    originalText: "Having eaten dinner the dishes were washed by me",
    words: [
      { text: "Having", original: "Having", correct: "I", errorType: "wordorder", hint: "Dangling modifier! It sounds like the dishes ate dinner. Start the main clause with 'I'.", explanation: "Avoid dangling modifiers by matching the opening phrase with the correct subject." },
      { text: "eaten", original: "eaten", correct: "washed", errorType: "wordorder", hint: "Reorder to make it active: 'I washed the dishes...'", explanation: "Active voice is clearer and avoids dangling modifiers." },
      { text: "dinner", original: "dinner", correct: "the", errorType: "wordorder", hint: "Move articles and nouns to form 'the dishes'.", explanation: "Place articles before the nouns they modify." },
      { text: "the", original: "the", correct: "dishes", errorType: "wordorder", hint: "Arrange the words to say: 'I washed the dishes after eating dinner.'", explanation: "Reordering creates a clear, logical sequence." },
      { text: "dishes", original: "dishes", correct: "after", errorType: "wordorder", hint: "Use 'after' to connect eating dinner.", explanation: "Prepositions connect action phrases." },
      { text: "were", original: "were", correct: "eating", errorType: "wordorder", hint: "Connect 'eating' with 'dinner'.", explanation: "Keep gerund clauses together." },
      { text: "washed", original: "washed", correct: "dinner.", errorType: "punctuation", hint: "End with 'dinner.' and a full stop.", explanation: "Always end sentences with ending punctuation." },
      { text: "by", original: "by", correct: "", errorType: "delete", hint: "The passive voice word 'by' is no longer needed. Drag it to delete or clear it.", explanation: "Delete unnecessary words in active voice rephrasing." },
      { text: "me", original: "me", correct: "", errorType: "delete", hint: "The passive voice word 'me' is no longer needed.", explanation: "Eliminating passive agents makes sentences punchy." }
    ],
    correctOrder: [0, 6, 3, 4, 1, 5, 2], // "I washed the dishes after eating dinner." (deleting by, me)
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
      { text: "which", original: "which", correct: "who", errorType: "punctuation", hint: "Use 'who' instead of 'which' to refer to human subjects. Use the Punctuation Scalpel.", explanation: "Use 'who' for relative clauses referring to people." },
      { text: "wrote", original: "wrote", correct: "wrote", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "essay", original: "essay", correct: "essay", errorType: null },
      { text: "got", original: "got", correct: "got", errorType: null },
      { text: "an", original: "an", correct: "an", errorType: null },
      { text: "A", original: "A", correct: "A.", errorType: "punctuation", hint: "Finish the sentence with a period.", explanation: "Use ending punctuation." }
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
      { text: "of", original: "of", correct: "have", errorType: "tense", hint: "'Would of' is a common speech error. The correct written form is 'would have'. Inject 'have'.", explanation: "Use the auxiliary verb 'have' (not the preposition 'of') with helper modals." },
      { text: "helped", original: "helped", correct: "helped", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "if", original: "if", correct: "if", errorType: null },
      { text: "you", original: "you", correct: "you", errorType: null },
      { text: "had", original: "had", correct: "had", errorType: null },
      { text: "asked", original: "asked", correct: "asked.", errorType: "punctuation", hint: "Close the sentence with a period.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Underwater Oasis"
  },

  // ================= LEVEL 5: Surgeon General (challenge) - Multiple errors per sentence =================
  {
    id: 25,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "Yesterday me and my friend goes to a museum and we seen a really big dinosaur skeleton who were millions of years old",
    words: [
      { text: "Yesterday", original: "Yesterday", correct: "Yesterday,", errorType: "punctuation", hint: "Add a comma after the introductory time word 'Yesterday'.", explanation: "Use a comma to separate introductory phrases." },
      { text: "me", original: "me", correct: "my friend", errorType: "wordorder", hint: "Polite and correct ordering! Change 'me and my friend' to 'my friend and I'. Drag them with Forceps.", explanation: "Always place other subjects before yourself, and use the subject pronoun 'I' -> 'my friend and I'." },
      { text: "and", original: "and", correct: "and", errorType: null },
      { text: "my", original: "my", correct: "I", errorType: "wordorder", hint: "Reorder: 'my friend and I...'", explanation: "Reorder compound subjects correctly." },
      { text: "friend", original: "friend", correct: "went", errorType: "tense", hint: "This happened 'Yesterday' (past). Inject the correct past tense 'went' into 'goes'.", explanation: "Use past tense ('went') for past events." },
      { text: "goes", original: "goes", correct: "to", errorType: "wordorder", hint: "Ensure 'to' comes after 'went'.", explanation: "Prepositional phrases follow action verbs." },
      { text: "to", original: "to", correct: "a", errorType: null },
      { text: "a", original: "a", correct: "museum,", errorType: "punctuation", hint: "Use a comma before the conjunction 'and' to separate the clauses. Use the Scalpel.", explanation: "Use a comma before coordinating conjunctions separating independent clauses." },
      { text: "museum", original: "museum", correct: "and", errorType: null },
      { text: "and", original: "and", correct: "we", errorType: null },
      { text: "we", original: "we", correct: "saw", errorType: "tense", hint: "'We seen' is incorrect. Inject the simple past tense 'saw' with the syringe.", explanation: "Use simple past tense 'saw' instead of the past participle 'seen' without an auxiliary." },
      { text: "seen", original: "seen", correct: "a", errorType: null },
      { text: "a", original: "a", correct: "really", errorType: null },
      { text: "really", original: "really", correct: "big", errorType: null },
      { text: "big", original: "big", correct: "dinosaur", errorType: null },
      { text: "dinosaur", original: "dinosaur", correct: "skeleton", errorType: null },
      { text: "skeleton", original: "skeleton", correct: "which", errorType: "punctuation", hint: "A skeleton is an object. Replace relative pronoun 'who' with 'which' or 'that'.", explanation: "Use 'which' or 'that' for non-human relative clauses." },
      { text: "who", original: "who", correct: "was", errorType: "agreement", hint: "'Skeleton' is singular. Change the verb 'were' to 'was'.", explanation: "Singular noun ('skeleton') requires a singular verb ('was')." },
      { text: "were", original: "were", correct: "millions", errorType: null },
      { text: "millions", original: "millions", correct: "of", errorType: null },
      { text: "of", original: "of", correct: "years", errorType: null },
      { text: "years", original: "years", correct: "old.", errorType: "punctuation", hint: "Cap off this long operation with a final full stop!", explanation: "All sentences end with proper ending punctuation." },
      { text: "old", original: "old", correct: "", errorType: null }
    ],
    // This is a compound problem with multiple errors, we can treat it as a series of edits (Scalpel, Injector, Forceps, Clamp)
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 26,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "if i was you I would have went to the doctors immediately",
    words: [
      { text: "if", original: "if", correct: "If", errorType: "punctuation", hint: "Capitalize the first letter.", explanation: "Start a sentence with a capital letter." },
      { text: "i", original: "i", correct: "I", errorType: "punctuation", hint: "The pronoun 'I' must always be capitalized.", explanation: "Always capitalize the personal pronoun 'I'." },
      { text: "was", original: "was", correct: "were", errorType: "tense", hint: "This is a hypothetical condition (subjunctive mood). Inject 'were' into 'was'.", explanation: "Use the subjunctive 'were' in hypothetical statements ('If I were you')." },
      { text: "you", original: "you", correct: "you,", errorType: "punctuation", hint: "Add a comma at the end of the introductory conditional clause.", explanation: "Set off an introductory dependent clause with a comma." },
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "would", original: "would", correct: "would", errorType: null },
      { text: "have", original: "have", correct: "have", errorType: null },
      { text: "went", original: "went", correct: "gone", errorType: "tense", hint: "After 'would have', use the past participle 'gone'. Inject it with the syringe.", explanation: "Use the past participle ('gone') in conditional perfect constructions." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "doctors", original: "doctors", correct: "doctor's", errorType: "apostrophe", hint: "Implant an apostrophe in 'doctors' to show possession.", explanation: "Use possessive apostrophe for singular owner -> 'doctor's'." },
      { text: "immediately", original: "immediately", correct: "immediately.", errorType: "punctuation", hint: "Add a period at the very end.", explanation: "End with a period." }
    ],
    characterWound: "glitching_chest",
    theme: "Robo-Clinic"
  },
  {
    id: 27,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "the dog wagged its tail when its owners comes home",
    words: [
      { text: "the", original: "the", correct: "The", errorType: "punctuation", hint: "Capitalize the first word.", explanation: "Sentences begin with a capital letter." },
      { text: "dog", original: "dog", correct: "dog", errorType: null },
      { text: "wagged", original: "wagged", correct: "wagged", errorType: null },
      { text: "its", original: "its", correct: "its", errorType: null }, // correct possessive (no apostrophe)
      { text: "tail", original: "tail", correct: "tail", errorType: null },
      { text: "when", original: "when", correct: "when", errorType: null },
      { text: "its", original: "its", correct: "its", errorType: null },
      { text: "owners", original: "owners", correct: "owner", errorType: "agreement", hint: "The dog belongs to one owner in this context. Clamp/inject 'owners' to singular 'owner'.", explanation: "Align subject number with the verb context." },
      { text: "comes", original: "comes", correct: "came", errorType: "tense", hint: "The main verb 'wagged' is in the past. Match the tense and inject 'came' into 'comes'.", explanation: "Keep verb tenses consistent throughout the sentence." },
      { text: "home", original: "home", correct: "home.", errorType: "punctuation", hint: "End with a period.", explanation: "End with a period." }
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
      { text: "every", original: "every", correct: "Every", errorType: "punctuation", hint: "Capitalize 'Every' using the Scalpel.", explanation: "Capitalize the first word of a sentence." },
      { text: "one", original: "one", correct: "one", errorType: null },
      { text: "of", original: "of", correct: "of", errorType: null },
      { text: "the", original: "the", correct: "the", errorType: null },
      { text: "students", original: "students", correct: "students", errorType: null },
      { text: "need", original: "need", correct: "needs", errorType: "agreement", hint: "The subject 'every one' is singular. Clamp or inject 'need' to singular 'needs'.", explanation: "'Every one' is a singular subject requiring a singular verb ('needs')." },
      { text: "to", original: "to", correct: "to", errorType: null },
      { text: "bring", original: "bring", correct: "bring", errorType: null },
      { text: "their", original: "their", correct: "his or her", errorType: "agreement", hint: "Singular antecedent 'every one' traditionally takes 'his or her' (or singular 'their' in modern usage, let's correct it to singular match).", explanation: "Ensure singular pronouns match singular antecedents." },
      { text: "own", original: "own", correct: "own", errorType: null },
      { text: "pen", original: "pen", correct: "pen.", errorType: "punctuation", hint: "Add a full stop at the end.", explanation: "Declarative sentences require a period." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Robo-Clinic"
  },
  {
    id: 29,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "having finished the exam a happy sigh was let out by him",
    words: [
      { text: "having", original: "having", correct: "He", errorType: "wordorder", hint: "Dangling modifier. Reorder to put 'He' as the subject who finished the exam.", explanation: "The introductory modifier must refer directly to the active subject." },
      { text: "finished", original: "finished", correct: "let", errorType: "wordorder", hint: "Reorder to: 'He let out a happy sigh...'", explanation: "Active subject-verb construction is preferred." },
      { text: "the", original: "the", correct: "out", errorType: "wordorder", hint: "Move 'out' to follow 'let'.", explanation: "Keep phrasal verbs together." },
      { text: "exam", original: "exam", correct: "a", errorType: "wordorder", hint: "Next is article 'a'.", explanation: "Articles go before adjectives/nouns." },
      { text: "a", original: "a", correct: "happy", errorType: null },
      { text: "happy", original: "happy", correct: "sigh", errorType: null },
      { text: "sigh", original: "sigh", correct: "after", errorType: "wordorder", hint: "Connect it: '...after finishing the exam.'", explanation: "Use connective prepositions for chronological clauses." },
      { text: "was", original: "was", correct: "finishing", errorType: "wordorder", hint: "Change verb to gerund 'finishing'.", explanation: "Match the action modifier clause." },
      { text: "let", original: "let", correct: "the", errorType: null },
      { text: "out", original: "out", correct: "exam.", errorType: "punctuation", hint: "End with 'exam.' and a period.", explanation: "Always end with proper punctuation." },
      { text: "by", original: "by", correct: "", errorType: "delete", hint: "Delete passive 'by'.", explanation: "Delete passive voice words." },
      { text: "him", original: "him", correct: "", errorType: "delete", hint: "Delete passive 'him'.", explanation: "Remove passive actors when rephrased to active." }
    ],
    correctOrder: [0, 8, 9, 4, 5, 6, 7, 1, 2, 3], // "He let out a happy sigh after finishing the exam."
    characterWound: "limbs_scrambled",
    theme: "Robo-Clinic"
  },
  {
    id: 30,
    level: 5,
    difficulty: "Level 5: Surgeon General (Challenge)",
    originalText: "I has not never seen no dinosaur fossil before",
    words: [
      { text: "I", original: "I", correct: "I", errorType: null },
      { text: "has", original: "has", correct: "have", errorType: "agreement", hint: "'I' takes the verb form 'have'. Change 'has' to 'have' with the clamp/injector.", explanation: "The first-person singular pronoun 'I' takes 'have'." },
      { text: "not", original: "not", correct: "not", errorType: null },
      { text: "never", original: "never", correct: "ever", errorType: "agreement", hint: "Double negative! 'not never' is a double negative. Change 'never' to 'ever'.", explanation: "Avoid double negatives by pairing 'not' with 'ever' instead of 'never'." },
      { text: "seen", original: "seen", correct: "seen", errorType: null },
      { text: "no", original: "no", correct: "a", errorType: "agreement", hint: "Another double negative! Change 'no' to 'a' or 'any'.", explanation: "Avoid multiple negative determiners in a single clause." },
      { text: "dinosaur", original: "dinosaur", correct: "dinosaur", errorType: null },
      { text: "fossil", original: "fossil", correct: "fossil", errorType: null },
      { text: "before", original: "before", correct: "before.", errorType: "punctuation", hint: "Finish the operation with a final full stop.", explanation: "Use ending punctuation." }
    ],
    characterWound: "cracked_ribcage",
    theme: "Robo-Clinic"
  }
];
