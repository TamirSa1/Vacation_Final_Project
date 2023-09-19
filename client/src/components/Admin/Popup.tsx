import Button from 'react-bootstrap/Button';

const Popup = (props: any) => {
  const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <Button onClick={props.handleClose} variant="secondary">Cancel</Button>
      </section>
    </div>
  );
};

export default Popup;
