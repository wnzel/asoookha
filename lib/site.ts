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

export type ShopProduct = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: "digital" | "external";
  price?: {
    currency: "USD";
    value: string;
  };
  image: string;
  badge: string;
  checkout: "paypal" | "external";
  href?: string;
};

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
    role: "primary DAW / sample chopping",
    logo: "/logos/fl-studio.svg",
    href: "https://www.image-line.com/fl-studio/"
  }
];

export const friends = [
  {
    name: "Wenzel",
    blurb: "wnzel.com",
    image: "/wenzel.jpg",
    href: "https://www.wnzel.com/"
  }
];

export const shopProducts: ShopProduct[] = [
  {
    id: "bandcamp-digital-release",
    title: "Digital release",
    subtitle: "Bandcamp / download",
    description:
      "Primary digital-release path for albums, collaborations, and older drops. Bandcamp stays the clean support route while direct downloads are decided.",
    type: "external",
    image: releases.find((release) => release.title === "Unity")?.coverArt ?? "",
    badge: "bandcamp",
    checkout: "external",
    href: "https://asoookha.bandcamp.com/"
  },
  {
    id: "asoookha-drumkit-01",
    title: "Drum kit",
    subtitle: "asoookha drumkit #1 ZIP",
    description:
      "The kit slot from the transcript: sample material, drums, and producer tools. Wired to PayPal for direct checkout once credentials and files are ready.",
    type: "digital",
    price: {
      currency: "USD",
      value: "10.00"
    },
    image: releases.find((release) => release.title === "Marigold")?.coverArt ?? "",
    badge: "native paypal",
    checkout: "paypal"
  },
  {
    id: "vinyl-physical",
    title: "Vinyl",
    subtitle: "physical media",
    description:
      "A physical-media slot for future vinyl runs. Opens elasticStage until Faketo Inc wants direct inventory inside the site.",
    type: "external",
    image:
      releases.find((release) => release.title === "The Faketo Files: Volume 4")?.coverArt ??
      "",
    badge: "elasticstage",
    checkout: "external",
    href: "https://elasticstage.com/asoookha"
  },
  {
    id: "cd-physical",
    title: "CD",
    subtitle: "physical media",
    description:
      "CD redirect slot, matching the transcript idea of a disc graphic that sends listeners to the physical drop.",
    type: "external",
    image: releases.find((release) => release.title === "desire to live")?.coverArt ?? "",
    badge: "elasticstage",
    checkout: "external",
    href: "https://elasticstage.com/asoookha"
  }
];

export const merchHighlights = [
  {
    title: "Digital release",
    description: "Bandcamp release path",
    href: "https://asoookha.bandcamp.com/"
  },
  {
    title: "Drum kit",
    description: "asoookha drumkit #1",
    href: "/shop"
  },
  {
    title: "Vinyl",
    description: "physical run via elasticStage",
    href: "https://elasticstage.com/asoookha"
  },
  {
    title: "CD",
    description: "disc drop via elasticStage",
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
    title: "process",
    kicker: "samples / vapor / jazz / hiphop",
    body:
      "Patreon describes the work as sample-based content, vaporwave, jazzy tunes, hiphop and more. The site keeps that handmade, crate-dug feeling visible.",
    meta: "tools: FL Studio, sets, kits, customs"
  },
  {
    title: "links",
    kicker: "radio / sets / shop paths",
    body:
      "Music routes through Spotify, SoundCloud, Bandcamp, YouTube, Patreon, and elasticStage, while the shop keeps digital products native and physical media external.",
    meta: "Crumpler Radio and Faketo FM belong here too"
  }
];
