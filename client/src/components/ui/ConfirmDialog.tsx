import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    cancelText?: string | null;
    type?: 'danger' | 'warning' | 'info' | 'success';
    isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    isLoading = false
}) => {
    const getIcon = () => {
        switch (type) {
            case 'danger':
            case 'warning':
                return <AlertTriangle className={`w-12 h-12 ${type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />;
            case 'success':
                return <CheckCircle className="w-12 h-12 text-green-500" />;
            case 'info':
            default:
                return <Info className="w-12 h-12 text-blue-500" />;
        }
    };

    const getConfirmButtonVariant = () => {
        switch (type) {
            case 'danger': return 'danger';
            case 'success': return 'primary'; // Assuming primary is suitable for success or add 'success' variant to Button
            default: return 'primary';
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            width="max-w-sm"
        >
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-50' :
                        type === 'warning' ? 'bg-yellow-50' :
                            type === 'success' ? 'bg-green-50' : 'bg-blue-50'
                        }`}>
                        {getIcon()}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex space-x-3 justify-center">
                    {cancelText && (
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full"
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        variant={getConfirmButtonVariant() as any}
                        onClick={onConfirm}
                        isLoading={isLoading}
                        className="w-full"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
