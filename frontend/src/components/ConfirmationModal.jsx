import React, { useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";

function ConfirmationModal({
  confirmationModalOpen,
  setConfirmationModalOpen,
}) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setConfirmationModalOpen(false);
    }, 1500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [confirmationModalOpen]);

  return (
    <ReactModal
      isOpen={confirmationModalOpen}
      onRequestClose={() => setConfirmationModalOpen(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          height: "fit-content",
          width: "fit-content",
          maxWidth: "90vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        },
      }}
    >
      <p className="text-2xl text-[#257492] font-bold">
        Tu es inscrit <br /> C'est parti pour l'aventure
      </p>
    </ReactModal>
  );
}

ConfirmationModal.propTypes = {
  confirmationModalOpen: PropTypes.bool.isRequired,
  setConfirmationModalOpen: PropTypes.func.isRequired,
};

export default ConfirmationModal;
