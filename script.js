async function loadGallery() {
  const gallery = document.getElementById("gallery");
  const response = await fetch("artworks.json");
  const artworks = await response.json();

  // Sort newest to oldest based on filename date
  // artworks.sort((a, b) => b.filename.localeCompare(a.filename));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  artworks.forEach((art) => {
    // Extract date from filename
    // Example: 2026-07-cafe-wedding.webp
    const parts = art.filename.split("-");

    const year = parts[0];
    const monthNumber = parseInt(parts[1]);

    const date = `${months[monthNumber - 1]} ${year}`;

    // Generate title if not provided
    let title = art.title;

    if (!title) {
      title = parts
        .slice(2)
        .join(" ")
        .replace(".webp", "")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    gallery.innerHTML += `

    <article class="art-post">

        <div class="art-image">

            <img 
                src="images/${art.filename}" 
                alt="${title}"
                loading="lazy"
            >

            <div class="overlay">

                <h2>${title}</h2>

                <p class="date">
                    ${date}
                </p>

            </div>

        </div>


        ${
          art.caption
            ? `
            <div class="caption">
                <p>${art.caption}</p>
            </div>
            `
            : ""
        }


        ${
          art.tags && art.tags.length
            ? `
            <div class="tags">
                ${art.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            `
            : ""
        }

    </article>

    `;
  });
}

loadGallery();
