import {
	Button
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {render, unmountComponentAtNode} from '@wordpress/element';
import GrigoraPatterns from './patterns';


const openModal = () =>{
	var node = document.querySelector(".grigora-patterns-modal");

    if (!node) {
        node = document.createElement("div");
        node.className = "grigora-patterns-modal";
        document.body.appendChild(node);
    }
    render(<GrigoraPatterns />, node);
    document.body.classList.add("grigora-patterns-modal-open");
}

const closeModal = () =>{
	const node = document.querySelector(".grigora-patterns-modal");

    if (!node) {
        return
    }

    unmountComponentAtNode(node);
    document.body.classList.remove("grigora-patterns-modal-open");
}

export { openModal, closeModal };
