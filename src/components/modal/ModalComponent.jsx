import { Modal } from "reactstrap";

const ModalComponent = (props) => {
  const { modal, children, toggle, customStyle } = props;
  return (
    <Modal isOpen={modal} className={`modal-dialog modal-dialog-centered ${customStyle}`}>
      <div className="modal-content">
        <div className="modal-header bg-transparent">
          <button type="button" className="btn-close" onClick={toggle}></button>
        </div>
        <div className="modal-body px-3 pb-4">{children}</div>
      </div>
    </Modal>
  );
};
export default ModalComponent;
