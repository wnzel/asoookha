import metadata from "@/research/asoookha-metadata.json";

export type ArtistIdentity = "asoookha" | "faketo";

export type Release = {
  identity: ArtistIdentity;
  title: string;
  type: string;
  date: string;
  spotifyAlbumId: string;
  spotifyUrl: string;
  artistCredit: string;
  trackCount: number;
  coverArt: string;
  copyright: string[];
  alternateSpotifyAlbumIds?: Array<{
    spotifyAlbumId: string;
    spotifyUrl: string;
    date: string;
    copyright: string[];
    note: string;
  }>;
};

export type ShopCategory = "digital" | "cd" | "vinyl" | "drumkit";

export type ShopProduct = {
  id: string;
  title: string;
  category: ShopCategory;
  type: "digital" | "external";
  price?: {
    currency: "USD";
    value: string;
  };
  image: string;
  checkout: "paypal" | "external";
  href?: string;
};

export const shopCategories: Array<{ value: ShopCategory | "all"; label: string }> = [
  { value: "all", label: "view all" },
  { value: "digital", label: "digital releases" },
  { value: "cd", label: "cds" },
  { value: "vinyl", label: "vinyls" },
  { value: "drumkit", label: "drum kits" }
];

export const siteMeta = {
  title: "Faketo Inc",
  description:
    "A dark pine-green web shrine for Faketo Inc, asoookha, faketo, releases, merch, and blog notes.",
  mastheadVideo:
    "https://videos.pexels.com/video-files/13062514/13062514-hd_1920_1080_30fps.mp4",
  mastheadVideoCredit:
    "Temporary free-stock skate footage from Pexels, wired as a replaceable placeholder.",
  accentColor: "#0e2920"
};

export const spotifyArtists = metadata.spotifyArtists;

export const releases = [...(metadata.spotifyReleases as Release[])].sort(
  (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
);

export const featuredReleases = releases.filter((release) =>
  ["Unity", "The Faketo Files: Volume 4", "pegi 16 (thriving)", "Marigold"].includes(
    release.title
  )
);

export const topTracks = metadata.spotifyTopTracks;

export const qobuzCatalog = metadata.qobuzFaketoIncCatalog;

export const socialLinks = [
  {
    label: "Spotify: asoookha",
    href: "https://open.spotify.com/artist/5d1n0kBkkvnk1r5CnaWOWe",
    shortLabel: "spotify a",
    kind: "music"
  },
  {
    label: "Spotify: faketo",
    href: "https://open.spotify.com/artist/0aOATjHZnwuKxdHRcgRptR",
    shortLabel: "spotify f",
    kind: "music"
  },
  {
    label: "SoundCloud: asoookha",
    href: "https://soundcloud.com/asoookha",
    shortLabel: "soundcloud",
    kind: "music"
  },
  {
    label: "Bandcamp",
    href: "https://asoookha.bandcamp.com/",
    shortLabel: "bandcamp",
    kind: "shop"
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCCdtu5PnGQsssiwJVdrG7Zw",
    shortLabel: "youtube",
    kind: "video"
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/asoookha",
    shortLabel: "x",
    kind: "social"
  },
  {
    label: "Patreon",
    href: "https://www.patreon.com/c/asoookha",
    shortLabel: "patreon",
    kind: "support"
  },
  {
    label: "elasticStage",
    href: "https://elasticstage.com/asoookha",
    shortLabel: "elastic",
    kind: "physical"
  }
];

export const tools = [
  {
    name: "FL Studio",
    logo: "/logos/fl-studio.png"
  }
];

export type Friend = {
  name: string;
  image?: string;
  href?: string;
};

export const friends: Friend[] = [
  {
    name: "wenzel",
    image: "/wenzel.jpg",
    href: "https://www.wnzel.com/"
  },
  {
    name: "maromi!",
    image: "/maromi.jpg"
  },
  {
    name: "themme",
    image: "/themme.jpg"
  },
  {
    name: "yungteytey",
    image: "/yungteytey.jpg"
  }
];

export const shopProducts: ShopProduct[] = [
  {
    id: "bandcamp-digital-release",
    title: "Digital release",
    category: "digital",
    type: "external",
    price: {
      currency: "USD",
      value: "2.00"
    },
    image: releases.find((release) => release.title === "Unity")?.coverArt ?? "",
    checkout: "external",
    href: "https://asoookha.bandcamp.com/"
  },
  {
    id: "asoookha-drumkit-01",
    title: "Drum kit",
    category: "drumkit",
    type: "digital",
    price: {
      currency: "USD",
      value: "2.00"
    },
    image: releases.find((release) => release.title === "Marigold")?.coverArt ?? "",
    checkout: "paypal"
  },
  {
    id: "vinyl-physical",
    title: "Vinyl",
    category: "vinyl",
    type: "external",
    price: {
      currency: "USD",
      value: "2.00"
    },
    image:
      releases.find((release) => release.title === "The Faketo Files: Volume 4")?.coverArt ??
      "",
    checkout: "external",
    href: "https://elasticstage.com/asoookha"
  },
  {
    id: "cd-physical",
    title: "CD",
    category: "cd",
    type: "external",
    price: {
      currency: "USD",
      value: "2.00"
    },
    image: releases.find((release) => release.title === "desire to live")?.coverArt ?? "",
    checkout: "external",
    href: "https://elasticstage.com/asoookha"
  }
];

export function formatPrice(value: string) {
  return `$${value.replace(/\.00$/, "")}`;
}

const coverArt = (title: string) =>
  releases.find((release) => release.title === title)?.coverArt ?? "";

export const merchHighlights = [
  {
    title: "Digital release",
    image: coverArt("Unity"),
    href: "https://asoookha.bandcamp.com/"
  },
  {
    title: "Drum kit",
    image: coverArt("Marigold"),
    href: "/shop"
  },
  {
    title: "Vinyl",
    image: coverArt("The Faketo Files: Volume 4"),
    href: "https://elasticstage.com/asoookha"
  },
  {
    title: "CD",
    image: coverArt("desire to live"),
    href: "https://elasticstage.com/asoookha"
  }
];

export const recentVideos = metadata.recentYouTubeVideos;

export const introPanels = [
  {
    title: "introduction",
    kicker: "",
    body:
      "hello, im asoookha. i am also faketo. enjoy the sounds. This corner treats the two names as connected rooms inside one label world.",
    meta: "Melbourne sample-based beatmaker"
  },
  {
    title: "asoookha",
    kicker: "samples / vapor / jazz / hiphop",
    body:
      "asoookha is the main name: sample-based beats built out of vaporwave, jazzy loops, and hiphop drums.",
    meta: "sample-based content, customs, and kits"
  },
  {
    title: "faketo",
    kicker: "faketo inc / the files",
    body:
      "faketo is the other side of the same room, home to the Faketo Files series and everything running under faketo inc.",
    meta: "Faketo FM broadcasts from the HQ"
  }
];
