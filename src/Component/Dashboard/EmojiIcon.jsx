const EmojiIcon = ({ name, size = 18, styles }) => {
  return (
    <span
      role="img"
      aria-label={name}
      style={{
        fontSize: size,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        ...styles
      }}
    >
      {name}
    </span>
  );
};

export default EmojiIcon;
