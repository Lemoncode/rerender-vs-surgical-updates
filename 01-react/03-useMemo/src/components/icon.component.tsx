interface Props {
  name: string;
  className: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<Props> = (props) => {
  const { name, className, style } = props;
  return (
    <span style={style} className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
};
