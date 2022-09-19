import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { cloneBlock, store as blocksStore } from '@wordpress/blocks';


const AUTHORS_QUERY = {
	who: 'authors',
	per_page: -1,
	_fields: 'id,name',
	context: 'view',
};

export const getEntitiesInfo = ( entities ) => {
	const mapping = entities?.reduce(
		( accumulator, entity ) => {
			const { mapById, mapByName, names } = accumulator;
			mapById[ entity.id ] = entity;
			mapByName[ entity.name ] = entity;
			names.push( entity.name );
			return accumulator;
		},
		{ mapById: {}, mapByName: {}, names: [] }
	);
	return {
		entities,
		...mapping,
	};
};

export const usePostTypes = () => {
	const postTypes = useSelect( ( select ) => {
		const { getPostTypes } = select( coreStore );
		const excludedPostTypes = [ 'attachment' ];
		const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
			( { viewable, slug } ) =>
				viewable && ! excludedPostTypes.includes( slug )
		);
		return filteredPostTypes;
	}, [] );
	const postTypesTaxonomiesMap = useMemo( () => {
		if ( ! postTypes?.length ) return;
		return postTypes.reduce( ( accumulator, type ) => {
			accumulator[ type.slug ] = type.taxonomies;
			return accumulator;
		}, {} );
	}, [ postTypes ] );
	const postTypesSelectOptions = useMemo(
		() =>
			( postTypes || [] ).map( ( { labels, slug } ) => ( {
				label: labels.singular_name,
				value: slug,
			} ) ),
		[ postTypes ]
	);
	return { postTypesTaxonomiesMap, postTypesSelectOptions };
};

export const useTaxonomies = ( postType ) => {
	const taxonomies = useSelect(
		( select ) => {
			const { getTaxonomies } = select( coreStore );
			const filteredTaxonomies = getTaxonomies( {
				type: postType,
				per_page: -1,
				context: 'view',
			} );
			return filteredTaxonomies;
		},
		[ postType ]
	);
	return taxonomies;
};

export const useTaxonomiesInfo = ( postType ) => {
	const taxonomies = useTaxonomies( postType );
	const taxonomiesInfo = useSelect(
		( select ) => {
			const { getEntityRecords } = select( coreStore );
			const termsQuery = { context: 'view', per_page: 100 };
			const _taxonomiesInfo = taxonomies?.map( ( { slug, name } ) => {
				const _terms = getEntityRecords( 'taxonomy', slug, termsQuery );
				return {
					slug,
					name,
					terms: getEntitiesInfo( _terms ),
				};
			} );
			return _taxonomiesInfo;
		},
		[ taxonomies ]
	);
	return taxonomiesInfo;
};

export const useAuthors = () => {
    const authorsList = useSelect( ( select ) => {
        const { getUsers } = select( coreStore );
        return getUsers( AUTHORS_QUERY );
    }, [] );
    
    if ( ! authorsList ) {
        return null;
    }
    const authorsInfo = getEntitiesInfo( authorsList );

    return authorsInfo;
};


export const usePosts = ( postType ) => (
	useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const entityParams = [ 'postType', postType, { per_page: -1 } ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ postType ] )
);


