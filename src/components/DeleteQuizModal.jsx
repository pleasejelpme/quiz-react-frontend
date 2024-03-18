import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const DeleteQuizModal = ({ quizTitle, showModal, setShowModal, setDeleteQuizModal }) => {
  const handleDeleteButton = () => {
    setDeleteQuizModal(true)
    setShowModal(false)
  }

  return (
    <>
      <Modal
        data-bs-theme='dark'
        className='text-light'
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Body>
          <h5>You are about to delete {quizTitle}!</h5>
          Are you sure you want to delete it?
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='outline-primary' onClick={() => setShowModal(false)}>Go back</Button>
          <Button variant='danger' onClick={handleDeleteButton}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
