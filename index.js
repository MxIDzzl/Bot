import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// Fecha inicial: 1 enero 2024
const startDate = moment("2024-01-01");

// Fecha final: hoy
const endDate = moment();

const makeCommits = async () => {
  let current = startDate.clone();

  while (current.isSameOrBefore(endDate)) {
    const dateStr = current.format();

    const data = { date: dateStr };

    // Guarda data.json
    await jsonfile.writeFile(path, data);

    console.log("Commit:", dateStr);

    // Commit con fecha
    await simpleGit().add([path]).commit(dateStr, { "--date": dateStr });

    // Avanza al siguiente día
    current.add(1, "day");
  }

  // Push final
  await simpleGit().push();
};

makeCommits();
