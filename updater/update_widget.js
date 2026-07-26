import artworks from "../artworks.json" with { type: "json" };
import config from "./config.json" with { type: "json" };
import axios from "axios";

const slots = ["Main", "1", "2", "3", "4"];

const dynamic = [];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
slots.forEach((slot, index) => {
  const art = artworks[index];

  if (!art) return;

  const parts = art.filename.split("-");

  const year = parts[0];
  const monthNumber = parseInt(parts[1]);

  const date = `${months[monthNumber - 1]} ${year}`;

  dynamic.push({
    type: 1,
    name: `name${slot}`,
    value: art.title,
  });

  dynamic.push({
    type: 1,
    name: `date${slot}`,
    value: date,
  });

  dynamic.push({
    type: 3,
    name: `img${slot}`,
    value: {
      url: `${config.githubPages}/images/${art.filename}`,
    },
  });
});

console.log(`data: ${dynamic}`);

await axios.patch(
  `https://discord.com/api/v9/applications/${config.applicationId}/users/${config.userId}/identities/0/profile`,

  {
    data: {
      dynamic,
    },
  },

  {
    headers: {
      Authorization: `Bot ${config.botToken}`,
    },
  },
);
