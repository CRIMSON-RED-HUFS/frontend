export function SoundTrack({ id, label, icon, value, onChange }) {
  return (
    <div className="sound-track">
      <span className="sound-track-icon" aria-hidden="true">
        {icon}
      </span>
      <label className="sound-track-name" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="sound-track-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

