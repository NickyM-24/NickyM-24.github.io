/* ============================================================
   Site navigation — single source of truth.
   To add a new page: duplicate template.html, fill it in, then
   add one entry below. It will show up in the nav on every page
   automatically — no need to touch anything else.
   ============================================================ */

const NAV = [
  { title: "Home", href: "index.html" },
  { title: "About Me", href: "profotilio.html", children: [
    { title: "Framing Your Design", href: "profotilio-framing-your-design.html" },
  ]},
  { title: "Internship", href: "internship.html", children: [
    { title: "Timesheet", href: "internship-timesheet.html" },
    { title: "Timesheet #2", href: "internship-timesheet-2.html" },
    { title: "Treasure Hunt", href: "internship-treasure-hunt.html" },
    { title: "Brainstorm", href: "internship-brainstorm.html" },
  ]},
  { title: "HCD", href: "hcd.html" },
  { title: "Inspiration", href: "inspiration.html", children: [
    { title: "Design Challenge", href: "inspiration-design-challenge.html", children: [
      { title: "Secondary Research", href: "inspiration-design-challenge-secondary-research.html", children: [
        { title: "Recruitment Strategy", href: "inspiration-design-challenge-secondary-research-recruitment-strategy.html" },
      ]},
    ]},
    { title: "Secondary Research", href: "inspiration-seconday-research.html" },
    { title: "Survey / Interview Guide", href: "inspiration-surveyinterview-guide.html", children: [
      { title: "Recruitment Strategy", href: "inspiration-surveyinterview-guide-recruitment-staregy.html" },
    ]},
    { title: "Survey", href: "inspiration-survey.html", children: [
      { title: "Interview and Data", href: "inspiration-survey-interview-and-data.html" },
    ]},
    { title: "Recruitment Strategy", href: "inspiration-recruitment-strategy.html" },
    { title: "Survey and Interview Data", href: "inspiration-survey-and-interview-datadata.html" },
    { title: "Capture Your Learning", href: "inspiration-capture-your-learning.html" },
  ]},
  { title: "Ideation", href: "ideation.html", children: [
    { title: "Generating Ideas", href: "inspiration-generating-ideas.html" },
    { title: "Selecting an Idea", href: "inspiration-selecting-an-idea.html" },
    { title: "Rapid Prototype", href: "inspiration-rapid-prototype.html" },
    { title: "Gather Feedback", href: "inspiration-gather-feedback.html" },
    { title: "Integrate", href: "inspiration-integrate.html" },
  ]},
  { title: "Implementation", href: "implementation.html", children: [
    { title: "Roadmap to Success", href: "implementation-roadmap-to-success.html" },
    { title: "Funding Strategy", href: "implementation-funding-strategy.html" },
    { title: "Monitor and Evaluate", href: "implementation-monitor-and-evaluate.html" },
    { title: "Pilot", href: "implementation-pilot.html" },
    { title: "Sustainable Revenue", href: "implementation-sustainable-revenue.html" },
    { title: "Creating Partnerships", href: "implementation-creating-partnerships.html" },
    { title: "Optimize and Adapt", href: "implementation-optimize-and-adapt.html" },
    { title: "Exploring Scalability", href: "implementation-exploring-scalability.html" },
  ]},
  { title: "Project Conclusion", href: "project-conclusion.html", children: [
    { title: "Project Summary", href: "project-conclusion-project-summary.html" },
    { title: "Project Presentation", href: "project-conclusion-project-presentation.html" },
  ]},
  { title: "Program Outcomes", href: "program-outcomes.html", children: [
    { title: "Program Overview", href: "program-outcomes-program-overview.html" },
    { title: "Education in Society", href: "program-outcomes-education-in-society.html" },
    { title: "Act of Learning", href: "program-outcomes-act-of-learning.html" },
    { title: "Identity as an Educator", href: "program-outcomes-identity-as-an-educator.html" },
    { title: "Communication and Collaboration", href: "program-outcomes-communication-and-collaboration.html" },
    { title: "Leadership, Advocacy, and Innovation", href: "program-outcomes-leadership-advocacy-and-innovation.html" },
  ]},
];

function currentFile() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function flatten(items, depth, out) {
  items.forEach(item => {
    out.push({ title: item.title, href: item.href, depth: depth });
    if (item.children) flatten(item.children, depth + 1, out);
  });
  return out;
}

function containsCurrent(item, current) {
  if (item.href === current) return true;
  if (!item.children) return false;
  return item.children.some(c => containsCurrent(c, current));
}

function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const current = currentFile();

  const bar = document.createElement("div");
  bar.className = "nav-bar";

  const brand = document.createElement("a");
  brand.className = "nav-brand";
  brand.href = "index.html";
  brand.innerHTML = 'Nicky Dominique Malone<span>HCD Portfolio</span>';
  bar.appendChild(brand);

  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-label", "Toggle menu");
  toggle.innerHTML = "&#9776;";
  bar.appendChild(toggle);

  const menu = document.createElement("ul");
  menu.className = "nav-menu";

  NAV.forEach(item => {
    const li = document.createElement("li");
    if (item.children) li.className = "has-children";

    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.title;
    if (containsCurrent(item, current)) a.classList.add("active");
    li.appendChild(a);

    if (item.children) {
      const caret = document.createElement("span");
      caret.className = "caret";
      caret.innerHTML = "&#9662;";
      a.appendChild(caret);

      const drop = document.createElement("ul");
      drop.className = "dropdown";
      flatten(item.children, 0, []).forEach(sub => {
        const sli = document.createElement("li");
        const sa = document.createElement("a");
        sa.href = sub.href;
        sa.textContent = sub.title;
        sa.style.paddingLeft = (0.9 + sub.depth * 0.9) + "rem";
        if (sub.href === current) sa.classList.add("active");
        sli.appendChild(sa);
        drop.appendChild(sli);
      });
      li.appendChild(drop);
    }
    menu.appendChild(li);
  });

  bar.appendChild(menu);
  mount.appendChild(bar);

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll(".has-children > a").forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 820) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.textContent = `Last built ${year} — migrated from Google Sites.`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
