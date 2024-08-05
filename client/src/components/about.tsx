function About() {
  return (
    <div style={styles.main}>
      <div style={styles.about}>
        {aboutList.map((item) => (
          <AboutItem key={item.title} title={item.title} />
        ))}
      </div>
      <div style={styles.year}>
        <span>English</span>
        <span>© 2024 SocialApp</span>
      </div>
    </div>
  );
}

export default About;

function AboutItem({ title, url }: any) {
  const styles = {
    main: {
      color: "grey",
      textDecoration: "none",
      margin: 10,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <a
      href={url}
      style={styles.main}
      onMouseEnter={(e) => {
        e.currentTarget.style.textDecoration = "underline";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textDecoration = "none";
      }}
    >
      {title}
    </a>
  );
}

const styles = {
  main: {
    marginTop: "auto",
    marginBottom: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  about: {
    marginTop: 75,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: 13,
    color: "grey",
  } as React.CSSProperties,

  year: {
    margin: 10,
    width: 175,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 13,
    color: "grey",
  } as React.CSSProperties,
};

const aboutList = [
  {
    title: "SocialApp",
    url: null,
  },
  {
    title: "About",
    url: null,
  },
  {
    title: "Blog",
    url: null,
  },
  {
    title: "Business Opportunities",
    url: null,
  },
  {
    title: "Help",
    url: null,
  },
  {
    title: "API",
    url: null,
  },
  {
    title: "Privacy",
    url: null,
  },
  {
    title: "Terms",
    url: null,
  },
  {
    title: "Locations",
    url: null,
  },
  {
    title: "SocialApp Verifed",
    url: null,
  },
];
