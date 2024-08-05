import { ChangeEvent, RefObject, forwardRef, useRef } from "react";

type LabelInputProps = {
  type: "text" | "password";
  label: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

const LabelInput = forwardRef(
  ({ type, label, onChange, disabled }: LabelInputProps, ref: any) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    const animation = (
      ref: RefObject<any>,
      key: string,
      duration: number,
      reverse: boolean
    ) => {
      if (ref.current) {
        ref.current.style.animation = animationKey(
          reverse ? `${key}-reverse` : key,
          duration
        );
      }
    };

    const animationKey = (key: string, duration: number) => {
      return `${key} ${duration}ms normal forwards`;
    };

    return (
      <div style={styles.main}>
        <label ref={labelRef} style={styles.placeholder}>
          {label}
        </label>
        <input
          disabled={disabled}
          ref={ref}
          style={styles.input}
          type={type}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value != "") {
              animation(labelRef, "placeholder", 150, false);
              animation(ref, "input", 150, false);
            } else {
              animation(labelRef, "placeholder", 150, true);
              animation(ref, "input", 150, true);
            }
          }}
        />
      </div>
    );
  }
);

export default LabelInput;

const styles = {
  main: {
    backgroundColor: "#f7f7f7",
    position: "relative",
    height: 40,
    width: 250,
    borderRadius: 5,
  } as React.CSSProperties,

  input: {
    paddingLeft: 5,
    outlineColor: "#bababa",
    border: "1px solid #d1d1d1",
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    borderRadius: 5,
  } as React.CSSProperties,

  placeholder: {
    position: "absolute",
    top: "30%",
    left: 5,
    fontSize: 13,
    color: "grey",
    zIndex: 1,
    userSelect: "none",
  } as React.CSSProperties,
};
