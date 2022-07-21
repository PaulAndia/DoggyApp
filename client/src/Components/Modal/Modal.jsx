import styles from './Modal.module.css'

export function Modal({openModal, onClose}) {
    if(!openModal) return null;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h3>DOG CREATED SUCCESFULLY</h3>
                <div className={styles.img}></div>
                <div className={styles.btnCerrar}>
                    <p  onClick={onClose}>Close</p>
                </div>
            </div>
        </div>
    )
}