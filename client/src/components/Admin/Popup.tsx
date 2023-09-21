import Button from 'react-bootstrap/Button';

const Popup = (props: any) => {
  const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className='insidePopUpDiv'>
      <section className="modal-main">
        {props.children}
        <Button onClick={props.handleClose} variant="secondary" className='cancelBtnPupup'>Cancel</Button>
      </section>
      </div>
    </div>
  );
};

export default Popup;
