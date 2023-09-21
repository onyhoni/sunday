import React, { useState } from "react";

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return [openModal, closeModal, isOpen];
}
