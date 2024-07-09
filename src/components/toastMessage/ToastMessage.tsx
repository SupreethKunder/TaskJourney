import * as Toast from '@radix-ui/react-toast';
import styles from './styles.module.css';
import { RiCloseFill } from 'react-icons/ri';
import { MdError, MdWarning, MdCloudDone } from 'react-icons/md';
import { useEffect, useState } from 'react';

interface RadixApiToastProps {
    type: 'error' | 'warning' | 'success' | 'pending' | 'idle';
    title: string;
    message: string | string[];
    renderToast: boolean;
    handleToast: (arg0: boolean) => void;
    duration?: number;
}

export default function ToastMessage({
    type,
    title,
    message,
    renderToast,
    handleToast,
    duration = 10000,
}: RadixApiToastProps) {
    const [isOpen, setIsOpen] = useState<boolean>(renderToast);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isOpen) {
            timeout = setTimeout(() => {
                setIsOpen(false);
                handleToast(false);
            }, duration);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isOpen]);

    return (
        <>
            <Toast.Root
                className={styles.toast_root}
                open={isOpen}
                onOpenChange={(value) => {
                    setIsOpen(value);
                    handleToast(value);
                }}
                duration={duration}
            >
                <Toast.Title className={styles.toast_title}>
                    {type === 'error' && <MdError color="#f52c1d" className={styles.toast_icon} />}
                    {type === 'warning' && <MdWarning color="#ffcc00" className={styles.toast_icon} />}
                    {type === 'success' && <MdCloudDone color="#00ba1f" className={styles.toast_icon} />}
                    {type === 'pending' && null}
                    {type === 'idle' && null}
                    {title}
                </Toast.Title>
                <Toast.Description className={styles.toast_description}>{message}</Toast.Description>
                <Toast.Close aria-label="Close" className={styles.toast_close}>
                    <span aria-hidden>
                        <RiCloseFill />
                    </span>
                </Toast.Close>
            </Toast.Root>
            <Toast.Viewport className={styles.toast_viewport} />
        </>
    );
}