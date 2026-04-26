/**
 * Framework catalog — 16 canonical thinking frameworks.
 *
 * Bilingual FR+EN by design (Critical Rule #1).
 * Source : spec §6 (vantage-frameworks v1.0) + curated content based on the
 * canonical literature for each framework. French strings are written by hand
 * (no machine translation) per Critical Rule #1 of mcp-standard.md.
 *
 * Each record exposes:
 *  - id : stable kebab-case identifier (matches FRAMEWORK_ID enum)
 *  - name / name_fr : display name
 *  - category : strategy | innovation | decision | communication
 *  - one_line / one_line_fr : ≤ 140 chars pitch
 *  - description / description_fr : 1-2 sentence intro used by get_framework
 *  - canvas.sections : ordered prompts that structure a working canvas
 *  - steps / steps_fr : execution loop
 *  - examples : EN seed examples (FR fallback handled by get_framework when
 *    locale=fr by translating section names through i18n keys when relevant).
 */
import type { FrameworkId, Category } from "../schemas/index.js";

export interface FrameworkExample {
  context: string;
  output: string;
}

export interface FrameworkCanvasSection {
  name: string;
  prompt: string;
  name_fr: string;
  prompt_fr: string;
}

export interface FrameworkRecord {
  id: FrameworkId;
  name: string;
  name_fr: string;
  category: Category;
  one_line: string;
  one_line_fr: string;
  description: string;
  description_fr: string;
  canvas: { sections: FrameworkCanvasSection[] };
  steps: string[];
  steps_fr: string[];
  examples: FrameworkExample[];
  examples_fr: FrameworkExample[];
}

export const FRAMEWORKS: FrameworkRecord[] = [
  {
    id: "design-thinking",
    name: "Design Thinking",
    name_fr: "Design Thinking",
    category: "innovation",
    one_line: "Human-centered five-stage loop to discover, frame, and prototype solutions.",
    one_line_fr: "Boucle en cinq étapes centrée utilisateur pour explorer, cadrer et prototyper des solutions.",
    description: "An empathy-first innovation method (IDEO / Stanford d.school) that moves from user research to validated prototypes through Empathize, Define, Ideate, Prototype and Test.",
    description_fr: "Méthode d'innovation centrée empathie (IDEO / Stanford d.school) qui va de la recherche utilisateur aux prototypes validés à travers Empathie, Définition, Idéation, Prototypage et Test.",
    canvas: {
      sections: [
        { name: "Empathize", name_fr: "Empathie", prompt: "Who is the user, what do they live, what do they say vs feel?", prompt_fr: "Qui est l'utilisateur, que vit-il, que dit-il par rapport à ce qu'il ressent ?" },
        { name: "Define", name_fr: "Définition", prompt: "Reframe the insight into a single Point-of-View statement.", prompt_fr: "Reformule l'insight en un énoncé de Point-de-Vue unique." },
        { name: "Ideate", name_fr: "Idéation", prompt: "Generate 20+ divergent ideas before converging on three.", prompt_fr: "Génère 20+ idées divergentes avant d'en retenir trois." },
        { name: "Prototype", name_fr: "Prototype", prompt: "Build the cheapest artefact that lets users react.", prompt_fr: "Construis l'artefact le moins coûteux qui permet aux utilisateurs de réagir." },
        { name: "Test", name_fr: "Test", prompt: "Observe real reactions, capture surprises, decide next iteration.", prompt_fr: "Observe les réactions réelles, capture les surprises, décide de la prochaine itération." },
      ],
    },
    steps: [
      "Run 5-7 user interviews and capture verbatim quotes.",
      "Distill a single Point-of-View statement (User + Need + Insight).",
      "Brainstorm 20+ ideas, dot-vote, keep the top 3.",
      "Build a low-fidelity prototype within a day.",
      "Test with 5 users, log delights and frustrations, iterate.",
    ],
    steps_fr: [
      "Mène 5 à 7 entretiens utilisateurs et recueille les verbatims.",
      "Formule un énoncé de Point-de-Vue (Utilisateur + Besoin + Insight).",
      "Brainstorme 20+ idées, vote par gommettes, garde les 3 meilleures.",
      "Construis un prototype basse fidélité en une journée.",
      "Teste avec 5 utilisateurs, note plaisirs et frustrations, itère.",
    ],
    examples: [
      { context: "Banking app onboarding feels confusing for seniors.", output: "POV: 'Retired users need a guided first session because they fear breaking something.' Prototype: paper-walkthrough with a coach screen. Test: 4/5 complete onboarding unaided." },
    ],
    examples_fr: [
      { context: "L'onboarding d'une appli bancaire perd les seniors.", output: "POV : « Les retraités ont besoin d'une première session guidée car ils craignent de tout casser. » Prototype : parcours papier avec écran-coach. Test : 4/5 finissent seuls." },
    ],
  },
  {
    id: "lean-startup",
    name: "Lean Startup",
    name_fr: "Lean Startup",
    category: "innovation",
    one_line: "Build-Measure-Learn cycle to validate startup hypotheses with minimum waste.",
    one_line_fr: "Cycle Construire-Mesurer-Apprendre pour valider des hypothèses startup avec un minimum de gâchis.",
    description: "Eric Ries' framework that treats every product idea as a hypothesis tested through a Minimum Viable Product, validated learning, and pivot-or-persevere decisions.",
    description_fr: "Méthode d'Eric Ries qui traite chaque idée produit comme une hypothèse testée via un MVP, un apprentissage validé et une décision pivoter-ou-persévérer.",
    canvas: {
      sections: [
        { name: "Hypothesis", name_fr: "Hypothèse", prompt: "What customer + problem + value proposition are we betting on?", prompt_fr: "Sur quel client + problème + proposition de valeur parions-nous ?" },
        { name: "MVP", name_fr: "MVP", prompt: "What is the smallest experiment that can falsify the hypothesis?", prompt_fr: "Quelle est la plus petite expérience capable de réfuter l'hypothèse ?" },
        { name: "Metrics", name_fr: "Métriques", prompt: "Which actionable, accessible, auditable metric do we track?", prompt_fr: "Quelle métrique actionnable, accessible, auditable suivons-nous ?" },
        { name: "Learn", name_fr: "Apprendre", prompt: "What did the data tell us vs what we expected?", prompt_fr: "Que disent les données par rapport à ce que nous attendions ?" },
        { name: "Pivot or Persevere", name_fr: "Pivoter ou Persévérer", prompt: "Do we change course, scale, or kill the idea?", prompt_fr: "Changeons-nous de cap, passons-nous à l'échelle, ou abandonnons-nous ?" },
      ],
    },
    steps: [
      "Write the riskiest hypothesis as a falsifiable statement.",
      "Design an MVP that can be shipped within 2 weeks.",
      "Pick one actionable metric tied to the hypothesis.",
      "Run the experiment with at least 50 users / data points.",
      "Decide: pivot, persevere, or kill, with the team in the room.",
    ],
    steps_fr: [
      "Formule l'hypothèse la plus risquée de façon réfutable.",
      "Conçois un MVP livrable en moins de deux semaines.",
      "Choisis une seule métrique actionnable liée à l'hypothèse.",
      "Lance l'expérience avec au moins 50 utilisateurs / points de données.",
      "Tranche : pivoter, persévérer ou arrêter, en équipe.",
    ],
    examples: [
      { context: "B2B SaaS unsure if SMB plumbers will pay $49/mo.", output: "MVP: Stripe checkout + Loom demo. Metric: paid conversion. Result: 2% on 200 visitors → pivot to per-job pricing." },
    ],
    examples_fr: [
      { context: "Un SaaS B2B se demande si des plombiers TPE paieront 49 €/mois.", output: "MVP : Stripe + démo Loom. Métrique : taux de conversion payant. Résultat : 2 % sur 200 visiteurs → pivot vers une tarification à la mission." },
    ],
  },
  {
    id: "swot",
    name: "SWOT Analysis",
    name_fr: "Analyse SWOT",
    category: "strategy",
    one_line: "Four-quadrant scan of internal Strengths/Weaknesses and external Opportunities/Threats.",
    one_line_fr: "Analyse en quatre quadrants des Forces/Faiblesses internes et Opportunités/Menaces externes.",
    description: "A foundational strategic snapshot that maps internal capabilities against external context to derive offensive, defensive, adjustment and survival moves.",
    description_fr: "Snapshot stratégique fondamental qui croise capacités internes et contexte externe pour produire des mouvements offensifs, défensifs, d'ajustement et de survie.",
    canvas: {
      sections: [
        { name: "Strengths", name_fr: "Forces", prompt: "Which internal capabilities give us a real edge today?", prompt_fr: "Quelles capacités internes nous donnent un vrai avantage aujourd'hui ?" },
        { name: "Weaknesses", name_fr: "Faiblesses", prompt: "What internal gaps consistently slow us down?", prompt_fr: "Quelles lacunes internes nous ralentissent systématiquement ?" },
        { name: "Opportunities", name_fr: "Opportunités", prompt: "Which external trends could we ride in the next 12 months?", prompt_fr: "Quelles tendances externes pourrions-nous saisir d'ici 12 mois ?" },
        { name: "Threats", name_fr: "Menaces", prompt: "What external forces could erode our position?", prompt_fr: "Quelles forces externes pourraient éroder notre position ?" },
      ],
    },
    steps: [
      "List 3-5 items per quadrant with evidence, not opinions.",
      "Cross S×O for offensive moves, W×T for survival actions.",
      "Cross S×T for defenses, W×O for capability investments.",
      "Pick the two highest-leverage moves and assign owners.",
      "Re-run quarterly to detect drift.",
    ],
    steps_fr: [
      "Liste 3 à 5 items par quadrant, preuves à l'appui, pas d'opinions.",
      "Croise F×O pour les coups offensifs, f×M pour les actions de survie.",
      "Croise F×M pour les défenses, f×O pour les investissements en capacités.",
      "Choisis les deux mouvements à plus fort effet de levier et assigne des responsables.",
      "Refais l'exercice chaque trimestre pour détecter les dérives.",
    ],
    examples: [
      { context: "Boutique consultancy planning 2026.", output: "S: senior bench. W: no marketing engine. O: AI services demand. T: big-4 dumping prices. → Move 1: package AI offer. Move 2: monthly content engine." },
    ],
    examples_fr: [
      { context: "Cabinet de conseil boutique en planification 2026.", output: "F : équipe senior. f : pas de moteur marketing. O : demande en services IA. M : big-4 cassent les prix. → Action 1 : packager une offre IA. Action 2 : moteur de contenu mensuel." },
    ],
  },
  {
    id: "okr",
    name: "OKR (Objectives & Key Results)",
    name_fr: "OKR (Objectifs et Résultats Clés)",
    category: "strategy",
    one_line: "One inspiring objective + 3-5 measurable key results per quarter, top to bottom.",
    one_line_fr: "Un objectif inspirant + 3 à 5 résultats clés mesurables par trimestre, du sommet à la base.",
    description: "Andy Grove / John Doerr framework that aligns the organisation behind ambitious objectives quantified by binary, time-boxed key results.",
    description_fr: "Cadre d'Andy Grove et John Doerr qui aligne l'organisation derrière des objectifs ambitieux quantifiés par des résultats clés binaires et bornés dans le temps.",
    canvas: {
      sections: [
        { name: "Objective", name_fr: "Objectif", prompt: "Write one qualitative, time-bound, inspiring statement.", prompt_fr: "Rédige un énoncé qualitatif, daté, inspirant." },
        { name: "Key Result 1", name_fr: "Résultat Clé 1", prompt: "Numeric outcome, ambitious yet realistic (60-70% confidence).", prompt_fr: "Résultat chiffré, ambitieux mais réaliste (60-70 % de confiance)." },
        { name: "Key Result 2", name_fr: "Résultat Clé 2", prompt: "Independent metric covering a different facet of success.", prompt_fr: "Métrique indépendante couvrant une autre facette du succès." },
        { name: "Key Result 3", name_fr: "Résultat Clé 3", prompt: "Counter-balancing metric to avoid gaming.", prompt_fr: "Métrique de contre-poids pour éviter de tricher." },
        { name: "Initiatives", name_fr: "Initiatives", prompt: "What are the 3-5 bets that should move the KRs?", prompt_fr: "Quelles 3 à 5 initiatives doivent faire bouger les RC ?" },
      ],
    },
    steps: [
      "Draft objective: aspirational, qualitative, no numbers.",
      "Write 3-5 KRs that are binary at quarter end.",
      "Score draft confidence 0-1 ; aim 0.6-0.7.",
      "Cascade by negotiation, not assignment.",
      "Review weekly, grade at quarter-end on 0.0-1.0 scale.",
    ],
    steps_fr: [
      "Rédige l'objectif : aspirationnel, qualitatif, sans chiffre.",
      "Écris 3 à 5 RC binaires en fin de trimestre.",
      "Note la confiance entre 0 et 1 ; vise 0,6-0,7.",
      "Cascade par négociation, pas par décret.",
      "Revue hebdomadaire, scoring 0,0-1,0 en fin de trimestre.",
    ],
    examples: [
      { context: "Series A SaaS Q3 plan.", output: "O: Become the default tool for European HR teams. KR1: 200 paying teams. KR2: NPS 50+. KR3: < 2% monthly churn." },
    ],
    examples_fr: [
      { context: "SaaS en série A, plan Q3.", output: "O : Devenir l'outil par défaut des équipes RH européennes. RC1 : 200 équipes payantes. RC2 : NPS 50+. RC3 : < 2 % de churn mensuel." },
    ],
  },
  {
    id: "mece",
    name: "MECE (Mutually Exclusive, Collectively Exhaustive)",
    name_fr: "MECE (Mutuellement Exclusif, Collectivement Exhaustif)",
    category: "communication",
    one_line: "Structuring principle that splits a problem into non-overlapping, complete buckets.",
    one_line_fr: "Principe de structuration qui divise un problème en catégories non chevauchantes et exhaustives.",
    description: "Barbara Minto / McKinsey core discipline that forces a problem decomposition where each branch is mutually exclusive and the whole tree exhausts the problem space.",
    description_fr: "Discipline fondatrice de Barbara Minto / McKinsey qui force une décomposition où chaque branche est mutuellement exclusive et où l'arbre complet couvre tout le problème.",
    canvas: {
      sections: [
        { name: "Top question", name_fr: "Question chapeau", prompt: "What is the single question we must answer?", prompt_fr: "Quelle est la question unique à laquelle il faut répondre ?" },
        { name: "Cuts", name_fr: "Découpes", prompt: "Which 3-5 dimensions partition the answer?", prompt_fr: "Quelles 3 à 5 dimensions partitionnent la réponse ?" },
        { name: "Exclusivity check", name_fr: "Test d'exclusivité", prompt: "Can any item belong to two branches at once?", prompt_fr: "Un même item peut-il appartenir à deux branches à la fois ?" },
        { name: "Exhaustivity check", name_fr: "Test d'exhaustivité", prompt: "Have we forgotten any case at the boundaries?", prompt_fr: "Avons-nous oublié un cas aux frontières ?" },
      ],
    },
    steps: [
      "State the top question crisply.",
      "Pick a single cutting dimension per level.",
      "Test each branch against the ME and CE criteria.",
      "Iterate until every leaf is testable.",
      "Map each leaf to evidence and an owner.",
    ],
    steps_fr: [
      "Pose la question chapeau de façon nette.",
      "Choisis une seule dimension de découpe par niveau.",
      "Teste chaque branche selon les critères ME et CE.",
      "Itère jusqu'à ce que chaque feuille soit testable.",
      "Associe chaque feuille à une preuve et un responsable.",
    ],
    examples: [
      { context: "Why is revenue down?", output: "Cuts: volume vs price ; new vs existing ; product line A/B/C. Each leaf yields a measurable hypothesis." },
    ],
    examples_fr: [
      { context: "Pourquoi le chiffre d'affaires baisse-t-il ?", output: "Découpes : volume vs prix ; nouveaux vs existants ; gammes A/B/C. Chaque feuille donne une hypothèse mesurable." },
    ],
  },
  {
    id: "first-principles",
    name: "First Principles",
    name_fr: "Premiers Principes",
    category: "innovation",
    one_line: "Reduce a problem to its irreducible truths, then rebuild from scratch.",
    one_line_fr: "Réduis un problème à ses vérités irréductibles, puis reconstruis à partir de zéro.",
    description: "Aristotelian reasoning, popularised in tech by Elon Musk: question every assumption, isolate fundamental physics/economics/constraints, and re-derive the solution.",
    description_fr: "Raisonnement aristotélicien, popularisé en tech par Elon Musk : remettre en cause chaque hypothèse, isoler la physique/l'économie/les contraintes fondamentales, et redériver la solution.",
    canvas: {
      sections: [
        { name: "Assumptions list", name_fr: "Liste des hypothèses", prompt: "What 'truths' are we just inheriting from the industry?", prompt_fr: "Quelles « vérités » héritons-nous simplement du secteur ?" },
        { name: "Fundamentals", name_fr: "Fondamentaux", prompt: "Strip to physics, math, contracts, regulation, biology.", prompt_fr: "Réduis à la physique, aux mathématiques, aux contrats, à la régulation, à la biologie." },
        { name: "Re-derivation", name_fr: "Redérivation", prompt: "Rebuild the solution from those fundamentals only.", prompt_fr: "Reconstruis la solution uniquement à partir de ces fondamentaux." },
        { name: "Comparison", name_fr: "Comparaison", prompt: "How does it diverge from the inherited solution?", prompt_fr: "En quoi diverge-t-elle de la solution héritée ?" },
      ],
    },
    steps: [
      "List every assumption stakeholders treat as fixed.",
      "For each, ask: is this physics or convention?",
      "Keep only the conventions that are actually mandatory.",
      "Re-derive the solution from the remaining constraints.",
      "Compare cost/perf with the legacy answer.",
    ],
    steps_fr: [
      "Liste chaque hypothèse considérée comme acquise.",
      "Pour chacune, demande : est-ce de la physique ou de la convention ?",
      "Ne garde que les conventions réellement obligatoires.",
      "Redérive la solution à partir des contraintes restantes.",
      "Compare coût et performance avec la solution héritée.",
    ],
    examples: [
      { context: "Battery packs cost too much.", output: "Strip: nickel + cobalt + carbon = $80/kWh raw. Re-build supply chain → reach $80/kWh at scale, not $600." },
    ],
    examples_fr: [
      { context: "Les packs batterie coûtent trop cher.", output: "Réduction : nickel + cobalt + carbone = 80 $/kWh à l'état brut. Reconstruction de la chaîne d'appro → atteindre 80 $/kWh à l'échelle, pas 600." },
    ],
  },
  {
    id: "5-whys",
    name: "5 Whys",
    name_fr: "5 Pourquoi",
    category: "decision",
    one_line: "Iterative root-cause questioning: ask 'why' five times to reach the actionable cause.",
    one_line_fr: "Questionnement itératif de la cause racine : demande « pourquoi » cinq fois pour atteindre la cause actionnable.",
    description: "Toyota Production System tool that drills past symptoms by chaining 'why' questions until a process or systemic root cause emerges, ready to be fixed.",
    description_fr: "Outil du Toyota Production System qui dépasse les symptômes en enchaînant les « pourquoi » jusqu'à faire émerger une cause racine processus ou systémique, prête à être corrigée.",
    canvas: {
      sections: [
        { name: "Problem statement", name_fr: "Énoncé du problème", prompt: "Describe the symptom in one factual sentence.", prompt_fr: "Décris le symptôme en une phrase factuelle." },
        { name: "Why 1", name_fr: "Pourquoi 1", prompt: "Why did this happen?", prompt_fr: "Pourquoi cela s'est-il produit ?" },
        { name: "Why 2", name_fr: "Pourquoi 2", prompt: "Why did the previous answer occur?", prompt_fr: "Pourquoi la réponse précédente s'est-elle produite ?" },
        { name: "Why 3", name_fr: "Pourquoi 3", prompt: "Drill one layer deeper.", prompt_fr: "Descends d'une couche supplémentaire." },
        { name: "Why 4", name_fr: "Pourquoi 4", prompt: "Approach the systemic layer.", prompt_fr: "Approche la couche systémique." },
        { name: "Why 5", name_fr: "Pourquoi 5", prompt: "Root cause — actionable, not personal.", prompt_fr: "Cause racine — actionnable, jamais personnelle." },
        { name: "Countermeasure", name_fr: "Contre-mesure", prompt: "What process change addresses the root?", prompt_fr: "Quel changement de processus traite la racine ?" },
      ],
    },
    steps: [
      "Write a factual symptom (no blame).",
      "Ask why exactly 5 times — stop earlier only if root is reached.",
      "Validate each answer with evidence.",
      "Define a process-level countermeasure (not 'be more careful').",
      "Schedule a 30-day verification.",
    ],
    steps_fr: [
      "Décris un symptôme factuel (sans blâme).",
      "Pose « pourquoi » exactement 5 fois — n'arrête plus tôt que si la racine est atteinte.",
      "Valide chaque réponse avec des preuves.",
      "Définis une contre-mesure au niveau processus (pas « faire attention »).",
      "Planifie une vérification à 30 jours.",
    ],
    examples: [
      { context: "Production deploy failed.", output: "5x why → secrets rotation script never ran in CI. Countermeasure: add CI step + alert on missing rotation log." },
    ],
    examples_fr: [
      { context: "Le déploiement en production a échoué.", output: "5x pourquoi → le script de rotation des secrets n'a jamais tourné en CI. Contre-mesure : ajouter une étape CI + alerte sur l'absence de log de rotation." },
    ],
  },
  {
    id: "eisenhower",
    name: "Eisenhower Matrix",
    name_fr: "Matrice d'Eisenhower",
    category: "decision",
    one_line: "Sort tasks across Urgent/Important quadrants to decide do/schedule/delegate/drop.",
    one_line_fr: "Classe les tâches selon les quadrants Urgent/Important pour décider faire/planifier/déléguer/supprimer.",
    description: "President Eisenhower's two-axis matrix for personal and team prioritisation: importance on one axis, urgency on the other, four action verbs in the corners.",
    description_fr: "Matrice à deux axes du président Eisenhower pour la priorisation personnelle et d'équipe : importance sur un axe, urgence sur l'autre, quatre verbes d'action dans les coins.",
    canvas: {
      sections: [
        { name: "Q1 Urgent + Important", name_fr: "Q1 Urgent + Important", prompt: "Crises and deadlines — DO now.", prompt_fr: "Crises et deadlines — FAIRE tout de suite." },
        { name: "Q2 Important not Urgent", name_fr: "Q2 Important non Urgent", prompt: "Strategic work — SCHEDULE.", prompt_fr: "Travail stratégique — PLANIFIER." },
        { name: "Q3 Urgent not Important", name_fr: "Q3 Urgent non Important", prompt: "Interruptions — DELEGATE.", prompt_fr: "Interruptions — DÉLÉGUER." },
        { name: "Q4 Neither", name_fr: "Q4 Ni l'un ni l'autre", prompt: "Distractions — DROP.", prompt_fr: "Distractions — SUPPRIMER." },
      ],
    },
    steps: [
      "List all tasks competing for attention this week.",
      "Place each in exactly one quadrant.",
      "Block calendar time for Q2 first, then Q1.",
      "Assign Q3 to someone else explicitly.",
      "Delete Q4 without guilt.",
    ],
    steps_fr: [
      "Liste toutes les tâches qui se disputent ton attention cette semaine.",
      "Place chacune dans un seul quadrant.",
      "Bloque d'abord du temps calendrier pour Q2, puis Q1.",
      "Délègue Q3 à quelqu'un d'autre explicitement.",
      "Supprime Q4 sans culpabilité.",
    ],
    examples: [
      { context: "Founder week with 30 open items.", output: "Q1: investor update. Q2: hiring plan. Q3: vendor calls → COO. Q4: Twitter scrolls." },
    ],
    examples_fr: [
      { context: "Semaine de fondateur avec 30 tâches ouvertes.", output: "Q1 : update investisseurs. Q2 : plan de recrutement. Q3 : appels fournisseurs → COO. Q4 : scroll Twitter." },
    ],
  },
  {
    id: "raci",
    name: "RACI Matrix",
    name_fr: "Matrice RACI",
    category: "communication",
    one_line: "Map every deliverable to who is Responsible, Accountable, Consulted, Informed.",
    one_line_fr: "Associe chaque livrable à qui est Réalisateur, Approbateur, Consulté, Informé.",
    description: "Cross-functional clarity tool that prevents decision paralysis by assigning, for each task, exactly one Accountable plus distinct Responsible/Consulted/Informed roles.",
    description_fr: "Outil de clarté inter-équipes qui prévient la paralysie décisionnelle en assignant, pour chaque tâche, exactement un Approbateur unique plus des rôles Réalisateur/Consulté/Informé distincts.",
    canvas: {
      sections: [
        { name: "Tasks", name_fr: "Tâches", prompt: "List the deliverables, not the meetings.", prompt_fr: "Liste les livrables, pas les réunions." },
        { name: "Roles", name_fr: "Rôles", prompt: "List people / roles across the columns.", prompt_fr: "Liste les personnes / rôles dans les colonnes." },
        { name: "Assign R/A/C/I", name_fr: "Assigner R/A/C/I", prompt: "Exactly one A per row ; multiple R allowed.", prompt_fr: "Un seul A par ligne ; plusieurs R autorisés." },
        { name: "Validation", name_fr: "Validation", prompt: "Walk each role through their column to surface friction.", prompt_fr: "Passe en revue chaque colonne avec son rôle pour détecter les frictions." },
      ],
    },
    steps: [
      "List deliverables vertically.",
      "List roles horizontally.",
      "Fill cells with R, A, C, or I (only one A per row).",
      "Review with each named person in real time.",
      "Publish in the project space, refresh on every scope change.",
    ],
    steps_fr: [
      "Liste les livrables verticalement.",
      "Liste les rôles horizontalement.",
      "Remplis les cases avec R, A, C ou I (un seul A par ligne).",
      "Revue en temps réel avec chaque personne nommée.",
      "Publie dans l'espace projet, rafraîchis à chaque changement de périmètre.",
    ],
    examples: [
      { context: "Product launch.", output: "Spec doc — A: PM, R: Tech Lead, C: Design, I: Marketing. Pricing — A: CEO, R: PM, C: Sales, I: Finance." },
    ],
    examples_fr: [
      { context: "Lancement produit.", output: "Spec — A : PM, R : Tech Lead, C : Design, I : Marketing. Prix — A : CEO, R : PM, C : Sales, I : Finance." },
    ],
  },
  {
    id: "ooda",
    name: "OODA Loop",
    name_fr: "Boucle OODA",
    category: "decision",
    one_line: "Observe → Orient → Decide → Act, faster than the adversary's loop.",
    one_line_fr: "Observer → Orienter → Décider → Agir, plus vite que la boucle de l'adversaire.",
    description: "Colonel John Boyd's combat decision loop, applied to business and crisis ops: outcompete by tightening the cycle of perception, framing, choice and action.",
    description_fr: "Boucle de décision en combat du colonel John Boyd, appliquée au business et aux crises : surclasser l'adversaire en serrant le cycle perception, cadrage, choix et action.",
    canvas: {
      sections: [
        { name: "Observe", name_fr: "Observer", prompt: "What raw signals are coming in right now?", prompt_fr: "Quels signaux bruts arrivent en ce moment ?" },
        { name: "Orient", name_fr: "Orienter", prompt: "Through which mental models do we read them?", prompt_fr: "À travers quels modèles mentaux les lisons-nous ?" },
        { name: "Decide", name_fr: "Décider", prompt: "Which option do we commit to, with what cut-off?", prompt_fr: "Quelle option choisissons-nous, avec quel point de bascule ?" },
        { name: "Act", name_fr: "Agir", prompt: "Execute, then immediately feed the next Observe.", prompt_fr: "Exécute, puis alimente immédiatement le prochain Observer." },
      ],
    },
    steps: [
      "Capture raw observations without filtering.",
      "Surface the assumptions / mental models in play.",
      "Pick the option with shortest reversibility.",
      "Act, then observe again within minutes.",
      "Score loop speed each cycle.",
    ],
    steps_fr: [
      "Capture des observations brutes sans filtrer.",
      "Mets en évidence les hypothèses / modèles mentaux à l'œuvre.",
      "Choisis l'option avec la réversibilité la plus courte.",
      "Agis, puis ré-observe en quelques minutes.",
      "Mesure la vitesse de la boucle à chaque tour.",
    ],
    examples: [
      { context: "Outage in production.", output: "Observe alerts → orient: 'is it DB or network?' → decide: rollback. Act in 4 min. Loop again on metrics." },
    ],
    examples_fr: [
      { context: "Incident en production.", output: "Observer les alertes → orienter : « base de données ou réseau ? » → décider : rollback. Agir en 4 min. Reboucler sur les métriques." },
    ],
  },
  {
    id: "bcg-matrix",
    name: "BCG Growth-Share Matrix",
    name_fr: "Matrice BCG Croissance-Part",
    category: "strategy",
    one_line: "Plot business units across market growth and relative market share to allocate cash.",
    one_line_fr: "Place les unités d'affaires selon la croissance du marché et la part de marché relative pour allouer le cash.",
    description: "Boston Consulting Group's portfolio matrix to classify products into Stars, Cash Cows, Question Marks and Dogs, and assign invest/milk/divest moves.",
    description_fr: "Matrice de portefeuille du Boston Consulting Group pour classer les produits en Étoiles, Vaches à lait, Dilemmes et Poids morts, et assigner investir/traire/céder.",
    canvas: {
      sections: [
        { name: "Stars (high growth, high share)", name_fr: "Étoiles (croissance forte, part forte)", prompt: "Invest aggressively to hold leadership.", prompt_fr: "Investis agressivement pour conserver le leadership." },
        { name: "Cash Cows (low growth, high share)", name_fr: "Vaches à lait (croissance faible, part forte)", prompt: "Milk for cash, fund stars and question marks.", prompt_fr: "Trais pour générer du cash, finance les étoiles et dilemmes." },
        { name: "Question Marks (high growth, low share)", name_fr: "Dilemmes (croissance forte, part faible)", prompt: "Pick winners to invest in or divest.", prompt_fr: "Choisis les gagnants à financer ou cède." },
        { name: "Dogs (low growth, low share)", name_fr: "Poids morts (croissance faible, part faible)", prompt: "Divest, harvest, or repurpose.", prompt_fr: "Cède, exploite ou réoriente." },
      ],
    },
    steps: [
      "Define market boundaries first (the trickiest step).",
      "Compute relative market share vs largest competitor.",
      "Place each BU in its quadrant with bubble size = revenue.",
      "Decide invest / milk / fix / divest for each.",
      "Re-balance funding flows accordingly.",
    ],
    steps_fr: [
      "Définis d'abord les frontières du marché (l'étape la plus délicate).",
      "Calcule la part de marché relative au plus gros concurrent.",
      "Place chaque BU dans son quadrant avec une bulle = chiffre d'affaires.",
      "Décide investir / traire / corriger / céder pour chacune.",
      "Rééquilibre les flux de financement en conséquence.",
    ],
    examples: [
      { context: "Software vendor with 4 product lines.", output: "Stars: AI suite. Cash Cow: legacy ERP. Question Mark: vertical CRM. Dog: on-prem reporting → divest." },
    ],
    examples_fr: [
      { context: "Éditeur logiciel avec 4 gammes.", output: "Étoile : suite IA. Vache à lait : ERP historique. Dilemme : CRM vertical. Poids mort : reporting on-prem → céder." },
    ],
  },
  {
    id: "porter-5-forces",
    name: "Porter's Five Forces",
    name_fr: "5 Forces de Porter",
    category: "strategy",
    one_line: "Score five competitive forces to read the structural attractiveness of an industry.",
    one_line_fr: "Note cinq forces concurrentielles pour lire l'attractivité structurelle d'un secteur.",
    description: "Michael Porter's industry analysis : new entrants, substitutes, buyer power, supplier power, and rivalry — diagnose where margins come from and how durable they are.",
    description_fr: "Analyse sectorielle de Michael Porter : nouveaux entrants, substituts, pouvoir des acheteurs, pouvoir des fournisseurs et rivalité — diagnostiquer d'où viennent les marges et leur durabilité.",
    canvas: {
      sections: [
        { name: "Threat of new entrants", name_fr: "Menace des nouveaux entrants", prompt: "How high are the barriers to entry?", prompt_fr: "Quelle est la hauteur des barrières à l'entrée ?" },
        { name: "Threat of substitutes", name_fr: "Menace des substituts", prompt: "What alternatives can replace our value?", prompt_fr: "Quelles alternatives peuvent remplacer notre valeur ?" },
        { name: "Buyer power", name_fr: "Pouvoir des acheteurs", prompt: "Can buyers force prices down?", prompt_fr: "Les acheteurs peuvent-ils faire baisser les prix ?" },
        { name: "Supplier power", name_fr: "Pouvoir des fournisseurs", prompt: "Can suppliers squeeze our margins?", prompt_fr: "Les fournisseurs peuvent-ils réduire nos marges ?" },
        { name: "Industry rivalry", name_fr: "Rivalité sectorielle", prompt: "How intense is the price/feature war?", prompt_fr: "Quelle est l'intensité de la guerre prix / fonctionnalités ?" },
      ],
    },
    steps: [
      "Define the industry boundary precisely.",
      "Score each force on a 1-5 intensity scale, with evidence.",
      "Identify the dominant force and its driver.",
      "Choose moves that mute the dominant force.",
      "Re-score yearly or after a structural shift.",
    ],
    steps_fr: [
      "Définis précisément les frontières du secteur.",
      "Note chaque force de 1 à 5 avec preuves à l'appui.",
      "Identifie la force dominante et son moteur.",
      "Choisis des mouvements qui atténuent la force dominante.",
      "Renote chaque année ou après un changement structurel.",
    ],
    examples: [
      { context: "DTC mattress brand.", output: "Rivalry HIGH (10+ brands), substitutes MEDIUM (legacy retail), supplier LOW. Move: vertical retail to lower buyer power." },
    ],
    examples_fr: [
      { context: "Marque de matelas DTC.", output: "Rivalité ÉLEVÉE (10+ marques), substituts MOYENS (retail historique), fournisseurs FAIBLES. Action : retail verticalisé pour baisser le pouvoir acheteur." },
    ],
  },
  {
    id: "pareto",
    name: "Pareto 80/20",
    name_fr: "Pareto 80/20",
    category: "decision",
    one_line: "80% of effects come from 20% of causes — find that 20% and double down.",
    one_line_fr: "80 % des effets viennent de 20 % des causes — trouve ce 20 % et double la mise.",
    description: "Vilfredo Pareto's empirical principle, weaponised by Joseph Juran for management: identify the vital few inputs that drive most of the output, ignore the trivial many.",
    description_fr: "Principe empirique de Vilfredo Pareto, transformé en outil de gestion par Joseph Juran : identifier les rares entrées qui produisent l'essentiel des sorties, ignorer la masse insignifiante.",
    canvas: {
      sections: [
        { name: "Outcome", name_fr: "Résultat", prompt: "What output do we want to maximise?", prompt_fr: "Quel résultat voulons-nous maximiser ?" },
        { name: "Inputs ranked", name_fr: "Entrées classées", prompt: "Rank causes / customers / features by contribution.", prompt_fr: "Classe causes / clients / fonctionnalités par contribution." },
        { name: "Vital few", name_fr: "Quelques essentiels", prompt: "Mark the top 20% that explain 80%.", prompt_fr: "Marque les 20 % du haut qui expliquent 80 %." },
        { name: "Reallocation", name_fr: "Réallocation", prompt: "Move resources from the trivial many to the vital few.", prompt_fr: "Transfère les ressources de la masse vers les essentiels." },
      ],
    },
    steps: [
      "Pick the outcome metric (revenue, bugs, time, etc.).",
      "Rank contributors by share of that metric.",
      "Compute cumulative share, find the 80% line.",
      "Reallocate budget/time toward the top 20%.",
      "Re-measure after one cycle.",
    ],
    steps_fr: [
      "Choisis la métrique de résultat (revenu, bugs, temps, etc.).",
      "Classe les contributeurs par part de cette métrique.",
      "Calcule la part cumulée, repère la ligne des 80 %.",
      "Réalloue budget/temps vers les 20 % du haut.",
      "Re-mesure après un cycle.",
    ],
    examples: [
      { context: "SaaS support tickets.", output: "5 features generate 78% of tickets. Fix top 5, deflection drops 60%." },
    ],
    examples_fr: [
      { context: "Tickets support d'un SaaS.", output: "5 fonctionnalités génèrent 78 % des tickets. Corrige le top 5, déflection -60 %." },
    ],
  },
  {
    id: "hofstede",
    name: "Hofstede Cultural Dimensions",
    name_fr: "Dimensions Culturelles de Hofstede",
    category: "communication",
    one_line: "Compare cultures across six dimensions to design cross-border products and teams.",
    one_line_fr: "Compare les cultures selon six dimensions pour concevoir produits et équipes transfrontaliers.",
    description: "Geert Hofstede's six-axis model (power distance, individualism, masculinity, uncertainty avoidance, long-term orientation, indulgence) used to anticipate cultural friction.",
    description_fr: "Modèle à six axes de Geert Hofstede (distance hiérarchique, individualisme, masculinité, contrôle de l'incertitude, orientation long terme, indulgence) pour anticiper les frictions culturelles.",
    canvas: {
      sections: [
        { name: "Power distance", name_fr: "Distance hiérarchique", prompt: "How accepted is unequal distribution of power?", prompt_fr: "Dans quelle mesure une distribution inégale du pouvoir est-elle acceptée ?" },
        { name: "Individualism vs collectivism", name_fr: "Individualisme vs collectivisme", prompt: "Are decisions framed by 'I' or 'we'?", prompt_fr: "Les décisions sont-elles cadrées en « je » ou en « nous » ?" },
        { name: "Masculinity vs femininity", name_fr: "Masculinité vs féminité", prompt: "Achievement-driven vs care-driven culture?", prompt_fr: "Culture orientée performance ou soin ?" },
        { name: "Uncertainty avoidance", name_fr: "Contrôle de l'incertitude", prompt: "How tolerated is ambiguity?", prompt_fr: "Quelle est la tolérance à l'ambiguïté ?" },
        { name: "Long-term orientation", name_fr: "Orientation long terme", prompt: "Pragmatic patience vs short-term tradition?", prompt_fr: "Patience pragmatique ou tradition court-termiste ?" },
        { name: "Indulgence vs restraint", name_fr: "Indulgence vs retenue", prompt: "Are gratifications encouraged or contained?", prompt_fr: "Les gratifications sont-elles encouragées ou contenues ?" },
      ],
    },
    steps: [
      "Pull Hofstede scores for each target country.",
      "Compute deltas vs your home culture.",
      "Identify the 2 axes with the largest gap.",
      "Design product / management adaptations on those axes.",
      "Validate with local hires before scaling.",
    ],
    steps_fr: [
      "Récupère les scores Hofstede pour chaque pays cible.",
      "Calcule les écarts avec ta culture d'origine.",
      "Identifie les 2 axes avec l'écart le plus grand.",
      "Conçois des adaptations produit / management sur ces axes.",
      "Valide avec des recrues locales avant de passer à l'échelle.",
    ],
    examples: [
      { context: "French SaaS expanding to Japan.", output: "High UAI in Japan → ship deeper docs and slower release cycles. High power distance → adjust support escalation paths." },
    ],
    examples_fr: [
      { context: "SaaS français qui s'étend au Japon.", output: "UAI élevé au Japon → docs plus poussées et cycles de release plus lents. Distance hiérarchique forte → adapter les chemins d'escalade support." },
    ],
  },
  {
    id: "cynefin",
    name: "Cynefin Framework",
    name_fr: "Framework Cynefin",
    category: "decision",
    one_line: "Classify a situation as Clear, Complicated, Complex, Chaotic or Confused — then react accordingly.",
    one_line_fr: "Classe une situation en Clair, Compliqué, Complexe, Chaotique ou Confus — puis agis en conséquence.",
    description: "Dave Snowden's sense-making framework that matches each domain to a different decision style: best practice, expertise, probe-sense-respond, act-sense-respond, or first stabilise.",
    description_fr: "Cadre de sense-making de Dave Snowden qui associe chaque domaine à un style de décision différent : bonne pratique, expertise, sonder-sentir-répondre, agir-sentir-répondre, ou stabiliser d'abord.",
    canvas: {
      sections: [
        { name: "Clear", name_fr: "Clair", prompt: "Cause/effect obvious — apply best practice.", prompt_fr: "Cause/effet évidents — applique la bonne pratique." },
        { name: "Complicated", name_fr: "Compliqué", prompt: "Cause/effect knowable by experts — analyse, then respond.", prompt_fr: "Cause/effet connaissables par des experts — analyse, puis réponds." },
        { name: "Complex", name_fr: "Complexe", prompt: "Cause/effect only in retrospect — probe, sense, respond.", prompt_fr: "Cause/effet seulement après coup — sonde, sens, réponds." },
        { name: "Chaotic", name_fr: "Chaotique", prompt: "No knowable cause/effect — act, sense, respond.", prompt_fr: "Aucune relation cause/effet connaissable — agis, sens, réponds." },
        { name: "Confused", name_fr: "Confus", prompt: "Cannot classify yet — break the situation into pieces.", prompt_fr: "Impossible à classer encore — découpe la situation en morceaux." },
      ],
    },
    steps: [
      "Describe the situation in 2-3 lines.",
      "Place it in one Cynefin domain with evidence.",
      "Adopt the matching decision pattern.",
      "If chaotic, stabilise first ; if confused, decompose.",
      "Re-classify after each major event.",
    ],
    steps_fr: [
      "Décris la situation en 2-3 lignes.",
      "Place-la dans un domaine Cynefin avec preuves.",
      "Adopte le schéma décisionnel correspondant.",
      "Si chaotique, stabilise d'abord ; si confus, décompose.",
      "Reclasse après chaque événement majeur.",
    ],
    examples: [
      { context: "Sudden DDoS attack.", output: "Chaotic → act (block traffic), sense (isolate vector), respond (route to scrubbing center)." },
    ],
    examples_fr: [
      { context: "Attaque DDoS soudaine.", output: "Chaotique → agir (bloquer le trafic), sentir (isoler le vecteur), répondre (router vers un centre de nettoyage)." },
    ],
  },
  {
    id: "mckinsey-7s",
    name: "McKinsey 7S",
    name_fr: "McKinsey 7S",
    category: "strategy",
    one_line: "Diagnose organisational alignment across 7 interlocking elements.",
    one_line_fr: "Diagnostique l'alignement organisationnel sur 7 éléments interconnectés.",
    description: "Peters & Waterman's diagnostic that links Strategy, Structure, Systems, Shared Values, Skills, Style and Staff — change one and the others must follow.",
    description_fr: "Diagnostic de Peters et Waterman qui relie Stratégie, Structure, Systèmes, Valeurs partagées, Compétences, Style et Personnel — changer l'un implique de bouger les autres.",
    canvas: {
      sections: [
        { name: "Strategy", name_fr: "Stratégie", prompt: "How do we plan to win?", prompt_fr: "Comment prévoyons-nous de gagner ?" },
        { name: "Structure", name_fr: "Structure", prompt: "How is the org chart laid out?", prompt_fr: "Comment l'organigramme est-il bâti ?" },
        { name: "Systems", name_fr: "Systèmes", prompt: "Which processes & tools run the company?", prompt_fr: "Quels processus et outils font tourner l'entreprise ?" },
        { name: "Shared Values", name_fr: "Valeurs partagées", prompt: "What is the central belief everyone owns?", prompt_fr: "Quelle est la croyance centrale partagée par tous ?" },
        { name: "Skills", name_fr: "Compétences", prompt: "Which collective competencies are distinctive?", prompt_fr: "Quelles compétences collectives sont distinctives ?" },
        { name: "Style", name_fr: "Style", prompt: "How does leadership behave day-to-day?", prompt_fr: "Comment le leadership se comporte-t-il au quotidien ?" },
        { name: "Staff", name_fr: "Personnel", prompt: "Who do we hire, develop, and retain?", prompt_fr: "Qui recrutons-nous, développons-nous et retenons-nous ?" },
      ],
    },
    steps: [
      "Score each S today on a 1-5 scale.",
      "Score each S in the desired future state.",
      "Identify the largest gap and its dependencies.",
      "Sequence interventions starting with Shared Values.",
      "Re-score every 6 months.",
    ],
    steps_fr: [
      "Note chaque S aujourd'hui de 1 à 5.",
      "Note chaque S dans l'état cible souhaité.",
      "Identifie l'écart le plus grand et ses dépendances.",
      "Séquence les interventions en commençant par les Valeurs partagées.",
      "Renote tous les 6 mois.",
    ],
    examples: [
      { context: "Scale-up moving from 50 to 200 employees.", output: "Gap on Systems and Style. Action: install OKR + manager training before doubling headcount." },
    ],
    examples_fr: [
      { context: "Scale-up qui passe de 50 à 200 collaborateurs.", output: "Écart sur Systèmes et Style. Action : installer des OKR + formation des managers avant de doubler les effectifs." },
    ],
  },
];

export function getFrameworkById(id: FrameworkId): FrameworkRecord | undefined {
  return FRAMEWORKS.find((f) => f.id === id);
}

export function getFrameworksByCategory(category: Category | "all"): FrameworkRecord[] {
  if (category === "all") return FRAMEWORKS;
  return FRAMEWORKS.filter((f) => f.category === category);
}
