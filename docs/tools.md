# Tools — L2 reference

> Placeholder L2 documentation. Populated alongside T6.A.3 (real tool handlers).

## list_frameworks

- Input : `{ category?, locale? }`
- Output : `{ frameworks[], count, fetchedAt }`
- See `src/tools/list_frameworks.ts`.

## get_framework

- Input : `{ id, locale?, include_examples? }`
- Output : `{ id, name, name_fr, description, description_fr, canvas, steps, steps_fr, examples?, fetchedAt }`
- See `src/tools/get_framework.ts`.

## apply_framework

- Input : `{ framework_id, problem, locale?, depth? }`
- Output : `{ framework, problem, analysis[], recommendation, caveats[], fetchedAt }`
- See `src/tools/apply_framework.ts`.

## suggest_framework

- Input : `{ context, goal, locale? }`
- Output : `{ suggestions[<=3], fetchedAt }`
- See `src/tools/suggest_framework.ts`.

## compose_workflow

- Input : `{ frameworks[2..3], problem, locale? }`
- Output : `{ workflow[], final_synthesis, fetchedAt }`
- See `src/tools/compose_workflow.ts`.
