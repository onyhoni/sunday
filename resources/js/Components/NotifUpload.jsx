import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Modal from "./Modal";
import useModal from "@/Hooks/useModal";

export default function NotifUpload() {
    const [errorOpenModal, errorCloseModal, errorModal] = useModal();
    const { errorsFlash } = usePage().props;
    useEffect(() => {
        errorsFlash !== null && errorOpenModal(true);
    }, [errorsFlash]);
    return (
        <div>
            <Modal
                isOpen={errorModal}
                closeModal={errorCloseModal}
                size="max-w-screen-lg"
                className="bg-red-200"
            >
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Failed upload , Please cek again ..
                    </h2>
                    <ul className="space-y-2 text-gray-500 list-inside dark:text-gray-400">
                        {errorsFlash !== null &&
                            errorsFlash.map((error, index) => (
                                <li
                                    key={index}
                                    className="flex items-center w-full gap-x-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-red-500"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <span>{error}</span>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="flex justify-end mt-10">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={errorCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
