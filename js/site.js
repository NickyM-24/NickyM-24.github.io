/* ============================================================
   Site navigation — single source of truth.
   To add a new page: duplicate template.html, fill it in, then
   add one entry below. It will show up in the nav on every page
   automatically — no need to touch anything else.
   ============================================================ */

const NAV = [
  { title: "Home", href: "index.html" },
  { title: "Portfolio", href: "profotilio.html", children: [
    { title: "Framing Your Design", href: "profotilio-framing-your-design.html" },
  ]},
  { title: "Internship", href: "internship.html", children: [
    { title: "Timesheet", href: "internship-timesheet.html" },
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
    { title: "Generating Ideas", href: "inspiration-generating-ideas.html" },
    { title: "Selecting an Idea", href: "inspiration-selecting-an-idea.html" },
    { title: "Rapid Prototype", href: "inspiration-rapid-prototype.html" },
    { title: "Gather Feedback", href: "inspiration-gather-feedback.html" },
    { title: "Integrate", href: "inspiration-integrate.html" },
  ]},
];

function currentFile() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function buildList(items, current) {
  const ul = document.createElement("ul");
  ul.className = "nav-list";
  items.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.title;
    if (item.href === current) a.classList.add("active");
    li.appendChild(a);
    if (item.children) {
      li.appendChild(buildList(item.children, current));
    }
    ul.appendChild(li);
  });
  return ul;
}

function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const current = currentFile();

  const brand = document.createElement("div");
  brand.className = "nav-brand";
  brand.innerHTML = 'Nicky Dominique Malone<span>HCD Portfolio</span>';
  mount.appendChild(brand);

  mount.appendChild(buildList(NAV, current));
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
