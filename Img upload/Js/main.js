const KiB = 1024;
const MiB = 1048576;

function printFileSize(fileSize) {
  const [divided, unit] =
    fileSize >= MiB ? [fileSize / MiB, "MiB"] : [fileSize / KiB, "KiB"];
  const string = toFixed(divided).padStart(4, " ");
  return `${string}\u00a0${unit}`;
}

function toFixed(n) {
  const s1 = n.toFixed(2);
  if (s1.length <= 4) {
    return s1;
  }

  const s2 = n.toFixed(1);
  if (s2.length <= 4) {
    return s2;
  }

  return n.toFixed(0);
}

const variations = [
  "",
  "image/*",
  "image/jpeg",
  "image/png",
  "image/jpeg,image/png",
  ".heic",
  ".heif",
  ".heic,.heif",
  "image/jpeg,.heic,.heif",
];

const properties = ["name", "type", "size", "lastModified", "preview"];

for (const accept of variations) {
  for (const multiple of [false, true]) {
    const h2 = document.createElement("h2");
    h2.textContent = multiple
      ? `accept="${accept}" multiple`
      : `accept="${accept}"`;

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.append(tbody);
    table.hidden = true;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.addEventListener("input", (event) => {
      table.hidden = false;
      for (const file of input.files) {
        for (const property of properties) {
          const tr = document.createElement("tr");
          const th = document.createElement("th");
          const td = document.createElement("td");
          th.textContent = property;
          switch (property) {
            case "lastModified":
              td.textContent = new Date(
                file.lastModified
              ).toLocaleString();
              break;

            case "size":
              td.textContent = printFileSize(file.size);
              break;

            case "preview": {
              const img = document.createElement("img");
              img.src = URL.createObjectURL(file);
              td.append(img);
              break;
            }

            default:
              td.textContent = file[property];
          }
          tr.append(th, td);
          tbody.append(tr);
        }
      }
    });
    const p = document.createElement("p");
    p.append(input);

    document.body.append(h2, p, table);
  }
}
