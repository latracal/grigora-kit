import { __ } from '@wordpress/i18n';
import {render, unmountComponentAtNode} from '@wordpress/element';
import {useState} from '@wordpress/element';
import { Path, SVG, TextControl, Popover, Button } from '@wordpress/components';
import {openModal, closeModal} from './modal';


function GrigoraPatterns(){

    const [ category, setCategory ] = useState('All');

    const categories = [
        {name: 'All', count: 61, active: true },
        {name: 'About', count: 1},
        {name: 'Contact Us', count: 31},
        {name: 'Clients', count: 1},
        {name: 'Hero', count: 51},
        {name: 'Images', count: 6},
        {name: 'Statistics', count: 1},
        {name: 'Text', count: 1},
    ]

    const patterns = [
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
        {
            name: "Advaneed Lists",
            thumbnail: "",
            categories: ["Lists"],
            preview: "",
            assets: [],
        },
    ]

    return(
        <>
        <div className="header-g">
            <div className="left">
                <img src={grigora_kit_blocks_params.svg_icon}></img>
                {__('Grigora Patterns', 'grigora-kit')}
            </div>
            <div className="center">{__('Choose a Pattern', 'grigora-kit')}</div>
            <div className="right">
                <div className="close" onClick={(e) => {closeModal();e.stopPropagation();}}>
                <SVG xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <Path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </SVG>
                </div>
            </div>
        </div>
        <div className="body">
            <div className="sidebar">
                <div className='title'>
                    {__('Categories', 'grigora-kit')}
                </div>
                <div className='categories'>
                    {categories.map((e) =>
                        <div className={`select-category ${e.name === category ? `active`: ``}`} 
                            onClick={()=>{setCategory(e.name)}}
                        >
                            <div className='name'>
                                {e.name}
                            </div>
                            <div className='count'>
                                {e.count}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="patterns">
                {patterns.map((e) =>
                        <div className={`select-pattern`} 
                        >
                            <div className='thumbnail'>
                                <img src={e.thumbnail} />
                            </div>
                            <div className='overlay'>
                                <div className='import'>Import</div>
                                <a className='preview' href={e.preview} target="_blank">Preview</a>
                            </div>
                        </div>
                    )}
            </div>
        </div>
        </>
    )
}

export default GrigoraPatterns;