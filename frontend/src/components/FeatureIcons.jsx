const items = [
  "Pixlr Express",
  "Remove bg",
  "Pixlr Designer",
  "Pixlr Editor",
  "Batch Editor",
];

export default function FeatureIcons() {
  return (
    <div className="features">
      {items.map((item) => (
        <div key={item} className="feature">
          <div className="icon" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
