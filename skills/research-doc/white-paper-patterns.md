# What makes a white paper persuasive

Patterns from white papers that technical buyers read to the end. Use them
when you outline and draft a white paper or solution brief. They don't
replace the template: they decide what goes in each section and how it's
shown.

The short version: explain how the work gets done before you explain the
network or product, show requirements and comparisons in tables, give every
idea that has a shape a figure, and prove the case with real-world data.

## Show, don't only tell

A paper that is all paragraphs is hard to scan and hard to trust. Aim for
at least one table or figure in every major section.

### Tables

Number every table, and put a short caption under it, in italics:
*Table 3. Wireless requirements for mobile robots.* Refer to it in the text
before it appears.

These table types work well. Pick the ones the topic needs.

| Table type | Columns | Use it to |
| --- | --- | --- |
| Evolution | Stage, systems, connectivity | Show how the industry got here, in the opening sections |
| Workload | Workload, type of data, network characteristic | Show what each machine or application sends |
| Requirements with verification | Requirement, what it means on site, how to verify it | Turn claims into tests a buyer can run |
| Planning ranges | Parameter, typical range, why it matters | Give engineers numbers to design with |
| Technology comparison | Criterion, then one column per option | Compare options fairly, including where the alternative wins |
| Fit by use case | One column per machine or use case, with a recommendation row | Tell the reader what to choose and when |
| Challenge and response | Challenge, what happens, design response | Show you know what goes wrong in the field |
| Real-world results | Site, what was deployed, measured result, source | Prove the case with data |
| Product roles | Product, environment, key capabilities, typical role | Map the product line to the reader's site |

### Figures

Number every figure, and put a caption under it, in italics:
*Figure 2. Scheduled access in private 5G compared with contention in
Wi-Fi.* Describe what the figure shows in the text too, for readers who
can't see it.

Plan a figure wherever an idea has a shape:

- **Architecture:** the layers from devices to applications.
- **Process or loop:** how a machine or workflow operates, such as sense,
  plan, act.
- **Data flow:** how one task or message travels through the system.
- **Site layout:** coverage, cell placement, or routes on a floor plan or
  yard plan.
- **How a technology works:** for example, contention compared with
  scheduling.
- **Real-world data:** a chart of measured results from the sources.

If you can't make the image, write a figure brief in its place: the
figure number, caption, what it shows, and the source of any data in it,
marked `TODO:` for a designer.

## Explain the work before the network

Readers buy outcomes, not radios. Before a section on network
requirements, explain how the work happens: how a forklift gets its next
task, how a robot decides its route, or how a container moves from ship to
truck. Then derive the network requirements from that work. A requirement
the reader can trace to their own operation is more convincing than a list
of specifications.

For each machine or use case, follow the same order:

1. What it is and what it does.
2. How it works, step by step, with a figure if it's a process.
3. What it needs from the network, and why.

## Prove it with real-world data

Real-world data is the strongest argument a white paper has. For every
major claim, look for:

- **Deployments:** named sites that have done this, what they deployed,
  and what they measured. Put them in a real-world results table.
- **Cost of the problem:** what downtime, delay, or failure costs in the
  reader's industry, from a named study.
- **Adoption or market data:** from analysts or official statistics, with
  the year.
- **Standards:** the standard that defines a requirement or capability,
  such as a 3GPP specification.

Rules:

- Give every figure its source and conditions, such as the site, year, and
  test setup.
- Prefer independent sources: regulators, governments, standards bodies,
  research papers, and the site operator's own statements.
- When a number is a planning figure or an illustration, not a
  measurement, say so in the text: "about 10 Mbps sustained (planning
  figure)."
- If a worked example uses made-up numbers, label it as an example.
- Report what went wrong in trials, too. Honest lessons make the rest of
  the paper more believable.

## Tell one story from start to finish

Include a short, concrete scenario that walks through a day or a shift
with the solution in place, as numbered steps: start of shift, normal
work, a busy period, a fault, and end of shift. Each step shows one
capability doing its job. Readers remember a story long after they forget
a specification table.

## Make the business case

End the argument with the money:

1. Two or three real data points that frame the stakes, such as the cost
   of downtime and the payback reported by adopters.
2. Where the return comes from, as a short list, with each source of value
   tied to a capability.
3. What the reader measures, so they can prove the return themselves.

Don't invent a return on investment. If no source gives one, say so, and
mark it `TODO:` for the writer.

## Be practical

Close the technical part with something the reader can use:

- **A deployment checklist or roadmap,** numbered, in the order the work
  happens.
- **Design responses,** not only problems: for each challenge, what to do
  about it.
- **Caveats in place,** next to the claim they limit, such as "the final
  radio count comes from an RF survey."
- **Coexistence,** when it's true: show how the solution works alongside
  what the reader already has, rather than replacing it.

## Introduce the vendor last

Keep the product out of the problem and requirements sections. When it
appears, show:

- How the approach fits the reader's site, in a few principles.
- A product roles table: which product goes where, and why.
- An architecture figure with the products in place.
