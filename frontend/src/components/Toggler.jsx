import { forwardRef, useImperativeHandle, useState } from "react";

const Toggler = ({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  useImperativeHandle(refs, () => {
    return {
      toggleVisible: () => {
        setVisible(!visible);
      },
    };
  });

  return (
    <div>
      <button style={hideWhenVisible} onClick={() => setVisible(!visible)}>
        {buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {children}
        <button style={showWhenVisible} onClick={() => setVisible(!visible)}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default forwardRef(Toggler);
