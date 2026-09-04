const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00`));
}

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = `https://github.com/${repository.repository}`;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.repository;
  title.append(link);

  const description = document.createElement("p");
  description.textContent = repository.description;

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.className = "language";
  language.textContent = repository.language;

  const stars = document.createElement("span");
  stars.textContent = `${repository.stars.toLocaleString()} stars`;

  const starredAt = document.createElement("time");
  starredAt.dateTime = repository.starredAt;
  starredAt.textContent = `Starred ${formatDate(repository.starredAt)}`;

  metadata.append(language, stars, starredAt);
  item.append(title, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositories.forEach((repository) => {
      repositoryList.append(createRepositoryItem(repository));
    });
    statusMessage.remove();
  } catch (error) {
    statusMessage.textContent = "The starred repositories could not be loaded.";
    console.error(error);
  }
}

loadRepositories();
