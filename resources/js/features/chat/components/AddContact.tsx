import { ChevronLeft } from 'lucide-react';
import EmailField from '@/features/login/components/EmailField';
import useAddContact from '../hooks/useAddContact';

const AddContact = () => {
    const {
        errors,
        handleAddContact,
        handleSubmit,
        isSubmitting,
        register,
        setShowAddContact,
    } = useAddContact();

    const handleBack = () => {
        setShowAddContact(false);
    };

    return (
        <div className="relative flex h-screen w-full flex-col border-r-2 p-4 md:w-80">
            <div className="flex items-center gap-1">
                <button className="cursor-pointer" onClick={handleBack}>
                    <ChevronLeft size={28} />
                </button>
                <h1 className="text-2xl font-bold">Add Contact</h1>
            </div>
            <form onSubmit={handleSubmit(handleAddContact)} className="mt-25">
                <EmailField
                    {...register('email')}
                    error={errors.email}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full cursor-pointer border-2 py-2 font-bold"
                >
                    {isSubmitting ? 'Wait...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddContact;
