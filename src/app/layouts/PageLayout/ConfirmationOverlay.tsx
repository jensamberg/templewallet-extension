import * as React from "react";
import classNames from "clsx";
import CSSTransition from "react-transition-group/CSSTransition";
import { useThanosClient } from "lib/thanos/front";
import Portal from "lib/ui/Portal";
import DocBg from "app/a11y/DocBg";
import InternalConfiramtion from "app/templates/InternalConfiramtion";

const ConfirmationOverlay: React.FC = () => {
  const {
    confirmation,
    resetConfirmation,
    confirmInternal,
  } = useThanosClient();
  const displayed = Boolean(confirmation);

  React.useLayoutEffect(() => {
    if (displayed) {
      const x = window.scrollX;
      const y = window.scrollY;
      document.body.classList.add("no-scrollbar", "overscroll-y-none");

      return () => {
        window.scrollTo(x, y);
        document.body.classList.remove("no-scrollbar", "overscroll-y-none");
      };
    }
  }, [displayed]);

  const handleConfirm = React.useCallback(
    async (confirmed: boolean) => {
      if (confirmation) {
        await confirmInternal(confirmation.id, confirmed);
      }
      resetConfirmation();
    },
    [confirmation, confirmInternal, resetConfirmation]
  );

  return (
    <>
      {displayed && <DocBg bgClassName="bg-primary-white" />}

      <Portal>
        <CSSTransition
          in={displayed}
          timeout={200}
          classNames={{
            enter: "opacity-0",
            enterActive: classNames(
              "opacity-100",
              "transition ease-out duration-200"
            ),
            exit: classNames("opacity-0", "transition ease-in duration-200"),
          }}
          unmountOnExit
        >
          <div className="fixed z-50 inset-0 overflow-y-auto bg-primary-white">
            {confirmation && (
              <InternalConfiramtion
                payload={confirmation.payload}
                onConfirm={handleConfirm}
              />
            )}
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default ConfirmationOverlay;
